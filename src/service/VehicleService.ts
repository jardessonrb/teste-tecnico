import { Vehicle } from "../models/Vehicle";

class VehicleService {
  async createVehicle(vehicle): Promise<Vehicle>{
    try {
      const vehicleCreated = await Vehicle.create(vehicle);
      return vehicleCreated;
    } catch (error) {
      throw new Error();
    }
  }

  async findVehicleByChassis(chassis: string): Promise<Vehicle>{
    try {
      const vehicle = await Vehicle.findOne({where:{ chassis }});
      return vehicle;
    } catch (error) {
      return undefined;
    }
  }

  async findAllVehicles(page: number, limit: number): Promise<Vehicle[]>{
    const offSet = (page - 1) * limit;
    limit = limit * page;

    try {
      const vehicles = await Vehicle.findAll({limit: limit, offset: offSet});
      return vehicles;
    } catch (error) {
      throw new Error();
    }
  }

}

export default new VehicleService();
