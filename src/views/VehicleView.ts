import { Vehicle } from "../models/Vehicle";
import { formatDate, formatPrice } from "./Utils";

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
      purchasePrice: formatPrice(vehicle.purchasePrice),
      salePrince: formatPrice(vehicle.salePrice),
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
      salePrice: formatPrice(vehicle.salePrice)
    }
  }
}

export default new VehicleView();
