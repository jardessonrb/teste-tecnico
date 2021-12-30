import { Request, response, Response } from "express";
import { validation } from "../types/validation";
import EmploeeValidator from "../validators/EmploeeValidator";
import { ErrorServer, ErrorValidation, NotResult, SuccessResponse } from "../types/responses";
import EmploeeService from "../service/EmploeeService";
import { cleanCPF } from "../validators/validations/validationCPF";
import { validationPagination } from "../validators/validations/validationPagination";

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
        offCompany: false,
        type
      })
      const res: SuccessResponse = {message: "Funcionario criado com sucesso", type: "success", body: emploeeCreated};
      return response.status(201).json(res);

    } catch (error) {
      const res: ErrorServer = {message: "Erro no servidor", type: "error server", errors: []};
      return response.status(500).json(res);
    }
  }

  async listEmploees(request: Request, response: Response): Promise<Response> {
    const { page = 1, limit = 10 } = request.query;
    const pagination = validationPagination(Number(page), Number(limit));

    try {
      const emploees = await EmploeeService.findAllEmploees(Number(pagination.page), Number(pagination.limit));
      const res: SuccessResponse = {message: "Lista de funcionarios pagina "+page, type: "success", body: emploees};
      return response.status(200).json(res);

    } catch (error) {
      const res: ErrorServer = {message: "Erro no servidor", type: "error server", errors: []};
      return response.status(403).json(res);
    }
  }

  async findEmploeeByCPF(request: Request, response: Response): Promise<Response> {
    const { cpf } = request.params;
    const validation = await EmploeeValidator.cpfValidation(cpf);
    if(!validation.isValid){
      const res: ErrorValidation = {message: "Campo inválido", type: "error validation", errors: validation.errors};
      return response.status(403).json(res);
    }

    try {
      const cpfClean = cleanCPF(cpf);
      const emploee = await EmploeeService.findEmploeeByCPF(cpfClean);
      if(emploee){
        const res: SuccessResponse = {message: "Funcionário buscado por CPF", type: "success", body: emploee};
        return response.status(200).json(res);
      }
      const res: NotResult = {message: "Nenhum funcionário corresponde a sua busca", type: "not result"};
      return response.status(404).json(res);

    } catch (error) {
      const res: ErrorServer = {message: "Erro no servidor", type: "error server", errors: []};
      return response.status(500).json(res);
    }
  }

  async updateEmploee(request: Request, response: Response): Promise<Response> {
    const { name, password, email, biography } = request.body;
    const { emploeeId } = request.params;
    const emploeeUpdate = { name, password, email, biography, emploeeId}

    const validation: validation = await EmploeeValidator.updateValidation(emploeeUpdate);
    if(!validation.isValid){
      const res: ErrorValidation = {message: "Campos inválidos", type: "error validation", errors: validation.errors};
      return response.status(403).json(res);
    }

    try {
      const emploee = await EmploeeService.findEmploeeById(emploeeId);
      if(!emploee){
        const res: NotResult = {message: "Nenhum funcionário corresponde ao identificador", type: "not result"};
        return response.status(404).json(res);
      }

      await EmploeeService.updateEmploee(emploeeUpdate);
      const res: SuccessResponse = {message: "Funcionário atualizado com sucesso", type: "success"};
      return response.status(200).json(res);

    } catch (error) {
      const res: ErrorServer = {message: "Erro no servidor", type: "error server", errors: []};
      return response.status(500).json(res);
    }
  }

  async disconnectEmploeeCompany(request: Request, response: Response): Promise<Response> {
    const { emploeeId } = request.params;
    const validation = await EmploeeValidator.idValidation(emploeeId);
    if(!validation.isValid){
      const res: ErrorValidation = {message: "Campo inválido", type: "error validation", errors: validation.errors};
      return response.status(403).json(res);
    }

    try {
      await EmploeeService.excludeEmploeeOfCompany(emploeeId);
      const res: SuccessResponse = {message: "Funcionário excluído com sucesso", type: "success"};
      return response.status(202).json(res);
    } catch (error) {
      const res: ErrorServer = {message: "Erro no servidor", type: "error server", errors: []};
      return response.status(500).json(res);
    }
  }

  async login(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;
    const validation = await EmploeeValidator.loginValidation({email, password});
    if(!validation.isValid){
      const res: ErrorValidation = {message: "Campos inválidos", type: "error validation", errors: validation.errors};
      return response.status(403).json(res);
    }

    try {
      const emploee = await EmploeeService.findEmploeeByEmailAndPassword(email, password);
      if(!emploee){
        const res: ErrorValidation = {message: "Login não permitido", type: "error validation", errors: []};
        return response.status(403).json(res);
      }

      const res: SuccessResponse = {message: "Funcionário logado com sucesso", type: "success", body: emploee};
      return response.status(200).json(res);

    } catch (error) {
      const res: ErrorServer = {message: "Erro no servidor", type: "error server", errors: []};
      return response.status(500).json(res);
    }
  }

}

export default new EmploeeController();
