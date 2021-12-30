import { Request, Response } from "express";
import ClientService from "../service/ClientService";
import EmploeeService from "../service/EmploeeService";
import ReserveVehicleService from "../service/ReserveVehicleService";
import VehicleService from "../service/VehicleService";
import { ErrorServer, ErrorValidation, SuccessResponse } from "../types/responses";
import { reserveVehicleStatus, vehicleStatus } from "../types/status";
import ReserveVehicleValidator from "../validators/ReserveVehicleValidator";
import experationReserve from "../validators/validations/validationDateReserve";

class ReserveVehicleController{
  async createReserveVehicle(request: Request, response: Response): Promise<Response> {
    const { valueReserve, clientId, emploeeId, vehicleId, reserveDays } = request.body;
    const validation = await ReserveVehicleValidator.createValidation({
      valueReserve,
      clientId,
      emploeeId,
      vehicleId,
      reserveDays
    });

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

      const vehicle =  await VehicleService.findVehicleById(vehicleId);
      if(!vehicle){
        const res: ErrorValidation = {message: "Veiculo não encontrado", type: "error validation", errors: []};
        return response.status(403).json(res);
      }

      const emploee =  await EmploeeService.findEmploeeById(emploeeId);
      if(!emploee){
        const res: ErrorValidation = {message: "Funcionario não encontrado", type: "error validation", errors: []};
        return response.status(403).json(res);
      }

      if(vehicle.status !== vehicleStatus.AVAILABLE){
          const res: ErrorValidation = {message: "Veiculo não disponivel para reserva", type: "error validation", errors: []};
          return response.status(403).json(res);
      }

      const reserve = await ReserveVehicleService.createReserveVehicle({
        valueReserve,
        clientId,
        emploeeId,
        vehicleId,
        reserveExpiration: experationReserve(reserveDays),
        status: reserveVehicleStatus.OPEN
      })

      const res: SuccessResponse = {message: "Reserva criada com sucesso", type: "success", body: reserve};
      return response.status(201).json(res);

    } catch (error) {
      const res: ErrorServer = {message: "Erro no servidor", type: "error server", errors: []};
      return response.status(500).json(res);
    }
  }
}

export default new ReserveVehicleController();
