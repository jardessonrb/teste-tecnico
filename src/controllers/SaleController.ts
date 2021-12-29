import { Request, Response } from "express";
import ClientService from "../service/ClientService";
import EmploeeService from "../service/EmploeeService";
import SaleService from "../service/SaleService";
import VehicleService from "../service/VehicleService";
import { ErrorServer, ErrorValidation, SuccessResponse } from "../types/responses";
import SaleValidator from "../validators/SaleValidator";


class SaleController {
  async createSale(request: Request, response: Response): Promise<Response>{
    const { clientId, emploeeId, vehicleId } = request.body;
    const validation = await SaleValidator.createValidation({ clientId, emploeeId, vehicleId });

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

      const emploee =  await EmploeeService.findEmploeeById(emploeeId);
      if(!emploee){
        const res: ErrorValidation = {message: "Funcionario não encontrado", type: "error validation", errors: []};
        return response.status(403).json(res);
      }

      const vehicle =  await VehicleService.findVehicleById(vehicleId);
      if(!vehicle){
        const res: ErrorValidation = {message: "Veiculo não encontrado", type: "error validation", errors: []};
        return response.status(403).json(res);
      }

      if(vehicle.status !== "disponivel"){
        const res: ErrorValidation = {message: "Veiculo não disponivel para venda", type: "error validation", errors: []};
        return response.status(403).json(res);
      }

      const saleCreated = await SaleService.createSale({
        clientId,
        vehicleId,
        emploeeId,
        valueSale: vehicle.salePrice
      });

      const res: SuccessResponse = {message: "Venda realizada sucesso", type: "success", body: saleCreated};
      return response.status(201).json(res);
    } catch (error) {
      const res: ErrorServer = {message: "Erro no servidor", type: "error server", errors: []};
      return response.status(500).json(res);
    }

  }
}

export default new SaleController();
