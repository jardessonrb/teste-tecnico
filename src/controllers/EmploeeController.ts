import { Request, Response } from "express";
import { validation } from "../types/validation";
import EmploeeValidator from "../validators/EmploeeValidator";
import { ErrorServer, ErrorValidation, SuccessResponse } from "../types/responses";
import EmploeeService from "../service/EmploeeService";
import { cleanCPF } from "../validators/validations/validationCPF";

class EmploeeController{
  async createEmploee(request: Request, response: Response): Promise<Response> {
    const { name, cpf, email, password, avatar, biography, type } = request.body;

    const validation: validation = await EmploeeValidator.createValidation(request.body);
    if(!validation.isValid){
      const res: ErrorValidation = {message: "Campos invalidos", type: "error validation", errors: validation.errors};
      return response.status(403).json(res);
    }

    try {
      const cpfClean = cleanCPF(cpf);
      const emploee = await EmploeeService.findEmploeeByCPFAndEmail(cpfClean, email);
      if(emploee){
        const errors = [];
        if(emploee.email == email){
          errors.push("Esse email já pertence a um usuario")
        }
        if(emploee.cpf == cpfClean){
          errors.push("Usuário já cadastrado com esse CPF")
        }
        const res: ErrorValidation = {message: "Erro ao cadastrar usuario", type: "error validation", errors};
        return response.status(403).json(res);
      }

      const emploeeCreated = await EmploeeService.createEmploee({
        name,
        cpf: cpfClean,
        email,
        password,
        avatar,
        biography,
        type
      })
      const res: SuccessResponse = {message: "Funcionario criado com sucesso", type: "success", body: emploeeCreated};
      return response.status(200).json(res);

    } catch (error) {
      const res: ErrorServer = {message: "Erro no servidor", type: "error server", errors: []};
      return response.status(403).json(res);
    }
  }
}

export default new EmploeeController();
