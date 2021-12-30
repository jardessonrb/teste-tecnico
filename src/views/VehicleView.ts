import { Vehicle } from "../models/Vehicle";
import { formatDate } from "./Utils";

class VehicleView {

  vehicleView(vehicle: Vehicle){
    return {
      id: vehicle.id,
      model: vehicle.model,
      brand: vehicle.brand,
      year: vehicle.year,
      kilometer: vehicle.kilometer,
      color: vehicle.color,
      chassis: vehicle.chassis,
      status: vehicle.status,
      purchasePrice: vehicle.purchasePrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
      salePrince: vehicle.salePrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
      createdAt: formatDate(vehicle.createdAt)
    }
  }

  vehiclesView(vehicles: Vehicle[]){
    const vehcilesReturned = vehicles.map((vehicle) => this.vehicleView(vehicle));

    return vehcilesReturned;
  }

  vehicleSimplified(vehicle: Vehicle){
    return {
      id: vehicle.id,
      model: vehicle.model,
      brand: vehicle.brand,
      salePrice: vehicle.salePrice
    }
  }
}

export default new VehicleView();
