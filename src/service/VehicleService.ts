import { Vehicle } from "../models/Vehicle";

class VehicleService {
  async createVehicle(vehicle): Promise<Vehicle>{
    console.log(vehicle)
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

}

export default new VehicleService();
