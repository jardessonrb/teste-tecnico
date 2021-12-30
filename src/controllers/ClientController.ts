import { Request, Response } from "express";
import ClientService from "../service/ClientService";
import { ErrorServer, ErrorValidation, SuccessResponse } from "../types/responses";
import ClientValidator from "../validators/ClientValidator";
import { cleanCPF } from "../validators/validations/validationCPF";
import { cleanFoneClient } from "../validators/validations/validationFone";
import { validationPagination } from "../validators/validations/validationPagination";
import ClientView from "../views/ClientView";

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

      const clientReturned = ClientView.clientView(clientCreated);
      const res: SuccessResponse = {message: "Cliente criado com sucesso", type: "success", body: clientReturned};
      return response.status(201).json(res);

    } catch (error) {
      const res: ErrorServer = {message: "Erro no servidor", type: "error server", errors: []};
      return response.status(500).json(res);
    }

  }

  async findClient(request: Request, response: Response): Promise<Response>{
    const { clientId } = request.params
    const validation = await ClientValidator.idValidation(clientId);
    if(!validation.isValid){
      const res: ErrorValidation = {message: "Campos invalidos", type: "error validation", errors: validation.errors};
      return response.status(403).json(res);
    }

    try {
      const client = await ClientService.findClientById(clientId);
      const clientReturned = ClientView.clientView(client);
      const res: SuccessResponse = {message: "Cliente buscado", type: "success", body: clientReturned};
      return response.status(200).json(res);

    } catch (error) {
      const res: ErrorServer = {message: "Erro no servidor", type: "error server", errors: []};
      return response.status(500).json(res);
    }
  }

  async listClients(request: Request, response: Response): Promise<Response>{
    const { page = 1, limit = 10 } = request.query;
    const validation = validationPagination(Number(page), Number(limit));

    try {
      const clients = await ClientService.findAllClients(validation.page, validation.limit);
      const clientsReturned = ClientView.clientsView(clients);
      const res: SuccessResponse = {message: "Cliente buscados pagina "+ validation.page, type: "success", body: clientsReturned};
      return response.status(200).json(res);

    } catch (error) {
      const res: ErrorServer = {message: "Erro no servidor", type: "error server", errors: []};
      return response.status(500).json(res);
    }
  }

  async updateClient(request: Request, response: Response): Promise<Response>{
    const { clientId } = request.params;
    const { name, email, cpf, fone } = request.body;

    const clientParams = {
      id: clientId,
      name,
      email,
      cpf: cleanCPF(cpf),
      fone: cleanFoneClient(fone)
    }

    const validation = await ClientValidator.updateValidation(clientParams);
    if(!validation.isValid){
      const res: ErrorValidation = {message: "Campos invalidos", type: "error validation", errors: validation.errors};
      return response.status(403).json(res);
    }

    try {
      const client = await ClientService.findClientById(clientId);
      if(!client){
        const res: ErrorValidation = {message: "Cliente não encontrado", type: "error validation", errors: []};
        return response.status(403).json(res);
      }

      await ClientService.updateClient(clientParams);
      const res: SuccessResponse = {message: "Cliente atualizado ", type: "success"};
      return response.status(200).json(res);

    } catch (error) {
      const res: ErrorServer = {message: "Erro no servidor", type: "error server", errors: []};
      return response.status(500).json(res);
    }
  }
}

export default new ClientController();
