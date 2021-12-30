import { Client } from "../models/Client";
import { Emploee } from "../models/Emploee";
import { Sale } from "../models/Sale";
import { Vehicle } from "../models/Vehicle";
import { reserveVehicleStatus, vehicleStatus } from "../types/status";
import { validation } from "../types/validation";
import ReserveVehicleService from "./ReserveVehicleService";
import VehicleService from "./VehicleService";

class SaleService {
  async createSale(sale: any): Promise<Sale>{
    const { vehicleId } = sale;
    try {
      const saleCreated = await Sale.create(sale);
      await VehicleService.updateStatusVehicle(vehicleId, vehicleStatus.SOLD);
      return saleCreated;

    } catch (error) {
      throw new Error();
    }
  }

  async findAllSales(page: number, limit: number): Promise<Sale[]>{
    const offSet = (page - 1) * limit;
    limit = limit * page;
    try {
      const sales = await Sale.findAll({limit: limit, offset: offSet, include: [Vehicle, Client, Emploee]});
      return sales;
    } catch (error) {
      throw new Error();
    }
  }

  async findSalesByEmploee(emploeeId: string, page: number, limit: number): Promise<Sale[]>{
    const offSet = (page - 1) * limit;
    limit = limit * page;

    try {
      const sales = await Sale.findAll({limit: limit, offset: offSet, include: [Vehicle, Client, Emploee], where: {emploeeId}});
      return sales;
    } catch (error) {
      throw new Error();
    }
  }

  async validationSaleVehicle(vehicle: Vehicle, client: Client): Promise<validation>{
    if(vehicle.status === vehicleStatus.AVAILABLE){
      return {isValid: true, errors: []}
    }

    if(vehicle.status === vehicleStatus.SOLD){
      return {isValid: false, errors: ["Veiculo já foi vendido"]};
    }

    if(vehicle.status === vehicleStatus.RESERVED){
      const reserve = await ReserveVehicleService.findReserveVehicle(vehicle.id, reserveVehicleStatus.OPEN);
      if(reserve){
        const today = new Date();
        if(today > reserve.reserveExpiration){
          return {isValid: true, errors: ["Reserva expirada"]};
        }

        if(reserve.clientId !== client.id){
          return {isValid: false, errors: ["O carro possui uma reserva válida com outro cliente"]};
        }
      }
    }

    return {isValid: true, errors: []};
  }
}

export default new SaleService();
