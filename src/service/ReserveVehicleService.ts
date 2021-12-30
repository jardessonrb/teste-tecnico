import { ReserveVehicle } from "../models/ReserveVehicle";
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
}

export default new ReserveVehicleService();
