import { Request, Response } from "express";
import VehicleService from "../service/VehicleService";
import { ErrorServer, ErrorValidation, SuccessResponse } from "../types/responses";
import VehicleValidator from "../validators/VehicleValidator";

class VehicleController {
  async createVehicle(request: Request, response: Response): Promise<Response> {
    const { brand, model, year, kilometer, color, chassis, purchasePrice, salePrice, type } = request.body;
    console.log(parseFloat(salePrice));
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
}

export default new VehicleController();
