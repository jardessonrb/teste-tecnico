import { ReserveVehicle } from "../models/ReserveVehicle";

class ReserveVehicleService{

  async findReserveVehicle(vehicleId: string, status: string): Promise<ReserveVehicle>{
    try {
      const reserve = await ReserveVehicle.findOne({where: {vehicleId, status}});
      return reserve;
    } catch (error) {
      throw new Error();
    }
  }

}

export default new ReserveVehicleService();
