import { Vehicle } from "../models/Vehicle";
import { vehicleStatus } from "../types/status";

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
      const vehicles = await Vehicle.findAll({where: {deleted: false}, limit: limit, offset: offSet});
      return vehicles;
    } catch (error) {
      throw new Error();
    }
  }

  async findVehicleById(id: string): Promise<Vehicle>{
    try {
      const vehicle = await Vehicle.findOne({where:{ id }});
      return vehicle;
    } catch (error) {
      return undefined;
    }
  }

  async updateVehicle(vehicle: any): Promise<void>{
    const { vehicleId, ...rest} = vehicle;
    try {
      await Vehicle.update(rest, {where: {id: vehicleId}});
    } catch (error) {
      throw new Error();
    }
  }

  async deleteVehicle(vehicleId: string): Promise<void>{
    try {
      const result = await Vehicle.update({deleted: true}, {where: {id: vehicleId}});
      return;
    } catch (error) {
      throw new Error();
    }
  }

  async findVehiclesByStatus(status: string, page: number, limit: number): Promise<Vehicle[]>{
    const offSet = (page - 1) * limit;
    limit = limit * page;

    try {
      const vehicles = await Vehicle.findAll({where: {status, deleted: false}, limit: limit, offset: offSet});
      return vehicles;
    } catch (error) {
      throw new Error();
    }
  }

  async sellVehicle(vehicleId: string): Promise<void> {
    try {
      await Vehicle.update({
        status: "vendido"
      }, {where: {id: vehicleId}});
      return;

    } catch (error) {
      throw new Error();
    }
  }

  async reserveVehicle(vehicleId: string): Promise<void> {
    try {
      await Vehicle.update({
        status: vehicleStatus.RESERVED
      }, {where: {id: vehicleId}});
      return;

    } catch (error) {
      throw new Error();
    }
  }

}

export default new VehicleService();
