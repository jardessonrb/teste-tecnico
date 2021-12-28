import { Request, Response } from "express";
import VehicleService from "../service/VehicleService";
import { ErrorServer, ErrorValidation, NotResult, SuccessResponse } from "../types/responses";
import VehicleValidator from "../validators/VehicleValidator";

class VehicleController {
  async createVehicle(request: Request, response: Response): Promise<Response> {
    const { brand, model, year, kilometer, color, chassis, purchasePrice, salePrice, type } = request.body;
    const validation = await VehicleValidator.createValidation(request.body);
    if(!validation.isValid){
      const res: ErrorValidation = {message: "Campos invalidos", type: "error validation", errors: validation.errors};
      return response.status(403).json(res);
    }

    try {
      const vehicle = await VehicleService.findVehicleByChassis(chassis);
      if(vehicle){
        const res: ErrorValidation = {message: "Veiculo já existente com esse chassis", type: "error validation", errors: []};
        return response.status(403).json(res);
      }

      const vehicleCreated = await VehicleService.createVehicle({
        brand,
        model,
        year,
        kilometer,
        color,
        chassis,
        purchasePrice: parseFloat(purchasePrice),
        salePrice: parseFloat(salePrice),
        type,
        status: "disponivel"
      });

      const res: SuccessResponse = {message: "Funcionario criado com sucesso", type: "success", body: vehicleCreated};
      return response.status(200).json(res);
    } catch (error) {
      const res: ErrorServer = {message: "Erro no servidor", type: "error server", errors: []};
      return response.status(500).json(res);
    }
  }

  async listVehicles(request: Request, response: Response): Promise<Response> {
    const { page = 1, limit = 10 } = request.query;

    try {
      const vehicles = await VehicleService.findAllVehicles(Number(page), Number(limit));
      const res: SuccessResponse = {message: "Lista de carros pagina "+page, type: "success", body: vehicles};
      return response.status(200).json(res);

    } catch (error) {
      const res: ErrorServer = {message: "Erro no servidor", type: "error server", errors: []};
      return response.status(403).json(res);
    }
  }

  async findVehicleById(request: Request, response: Response): Promise<Response> {
    const { vehicleId } = request.params;
    const validation = await VehicleValidator.idValidation(vehicleId);
    if(!validation.isValid){
      const res: ErrorValidation = {message: "Campo inválido", type: "error validation", errors: validation.errors};
      return response.status(403).json(res);
    }

    try {
      const vehicle = await VehicleService.findVehicleById(vehicleId);
      if(vehicle){
        const res: SuccessResponse = {message: "Veiculo buscado", type: "success", body: vehicle};
        return response.status(200).json(res);
      }
      const res: NotResult = {message: "Nenhum veiculo corresponde a sua busca", type: "not result"};
      return response.status(404).json(res);

    } catch (error) {
      const res: ErrorServer = {message: "Erro no servidor", type: "error server", errors: []};
      return response.status(500).json(res);
    }
  }

  async updateVehicle(request: Request, response: Response): Promise<Response> {
    const { vehicleId } = request.params;
    request.body.vehicleId = vehicleId;

    const validation = await VehicleValidator.updateValidation(request.body);
    if(!validation.isValid){
      const res: ErrorValidation = {message: "Campos invalidos", type: "error validation", errors: validation.errors};
      return response.status(403).json(res);
    }

    try {
      await VehicleService.updateVehicle(request.body);
      const res: SuccessResponse = {message: "Veiculo atualizado com sucesso", type: "success"};
      return response.status(200).json(res);

    } catch (error) {
      const res: ErrorServer = {message: "Erro no servidor", type: "error server", errors: []};
      return response.status(500).json(res);
    }

  }
}

export default new VehicleController();
