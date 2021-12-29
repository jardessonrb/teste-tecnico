import { Request, Response } from "express";
import { Client } from "../models/Client";
import ClientService from "../service/ClientService";
import { ErrorServer, ErrorValidation, SuccessResponse } from "../types/responses";
import ClientValidator from "../validators/ClientValidator";
import { cleanCPF } from "../validators/validations/validationCPF";
import { cleanFoneClient } from "../validators/validations/validationFone";

class ClientController{
  async createClient(request: Request, response: Response): Promise<Response>{
    const { name, email, cpf, fone, avatar } = request.body;
    const foneClean = cleanFoneClient(fone);
    const cpfClean  = cleanCPF(cpf);
    const validation = await ClientValidator.createValidation({
      name,
      email,
      cpf: cpfClean,
      fone: foneClean,
      avatar
    });

    if(!validation.isValid){
      const res: ErrorValidation = {message: "Campos invalidos", type: "error validation", errors: validation.errors};
      return response.status(403).json(res);
    }

    try {
      const client = await ClientService.findClientByCPFAndEmail(cpfClean, email);
      if(client){
        const errors = [];
        if(client.email == email) errors.push("Email já cadastrado com cliente");
        if(client.cpf == cpfClean) errors.push("Cliente já cadastrado com esse CPF");

        const res: ErrorValidation = {message: "Campos invalidos", type: "error validation", errors};
        return response.status(403).json(res);
      }

      const clientCreated = await ClientService.createClient({
        name,
        email,
        cpf: cpfClean,
        fone: foneClean,
        avatar
      });

      const res: SuccessResponse = {message: "Cliente criado com sucesso", type: "success", body: clientCreated};
      return response.status(201).json(res);

    } catch (error) {
      const res: ErrorServer = {message: "Erro no servidor", type: "error server", errors: []};
      return response.status(500).json(res);
    }

  }
}

export default new ClientController();
