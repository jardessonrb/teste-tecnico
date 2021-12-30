import { Client } from "../models/Client";
import { Emploee } from "../models/Emploee";
import { ReserveVehicle } from "../models/ReserveVehicle";
import { Vehicle } from "../models/Vehicle";
import VehicleService from "./VehicleService";

class ReserveVehicleService{

  async findReserveVehicle(vehicleId: string, status: string): Promise<ReserveVehicle>{
    try {
      const reserve = await ReserveVehicle.findOne({where: {vehicleId, status}});
      return reserve;
    } catch (error) {
      throw new Error();
    }
  }

  async createReserveVehicle(reserve: any): Promise<ReserveVehicle> {
    const { vehicleId } = reserve;
    try {
      const reserveCreated = await ReserveVehicle.create(reserve);
      await VehicleService.reserveVehicle(vehicleId);
      return reserveCreated;

    } catch (error) {
      throw new Error();
    }
  }

  async findReservesByEmploee(emploeeId: string, page: number, limit: number): Promise<ReserveVehicle[]>{
    const offSet = (page - 1) * limit;
    limit = limit * page;

    try {
      const reserves = await ReserveVehicle.findAll({limit: limit, offset: offSet, include: [Vehicle, Client, Emploee], where: {emploeeId}});
      return reserves;
    } catch (error) {
      throw new Error();
    }
  }
}

export default new ReserveVehicleService();
