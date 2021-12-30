import { ReserveVehicle } from '../models/ReserveVehicle';
import ClientView from './ClientView';
import EmploeeView from './EmploeeView';
import { formatDate, formatPrice } from './Utils';
import VehicleView from './VehicleView';
class ReserveVehicleView{

  reserveVehicleView(reserveVehcile: ReserveVehicle){
    return {
      id: reserveVehcile.id,
      valueReserve: formatPrice(reserveVehcile.valueReserve),
      createdAt: formatDate(reserveVehcile.createdAt),
      reserveExpiration: formatDate(reserveVehcile.reserveExpiration),
      status: reserveVehcile.status
    }
  }

  reserveComplet(reserveVehcile: any){
    const { Vehicle, Emploee, Client } = reserveVehcile;

    return {
      id: reserveVehcile.id,
      valueReserve: formatPrice(reserveVehcile.valueReserve),
      createdAt: formatDate(reserveVehcile.createdAt),
      reserveExpiration: formatDate(reserveVehcile.reserveExpiration),
      status: reserveVehcile.status,
      vehicle: VehicleView.vehicleSimplified(Vehicle),
      client: ClientView.clientSimplified(Client),
      emploee: EmploeeView.emploeeSimplified(Emploee)
    }

  }

  reservesByJoinView(reserves: any[]){
    const reserveReturned = reserves.map((reserve) => this.reserveComplet(reserve));

    return reserveReturned;
  }

}

export default new ReserveVehicleView();
