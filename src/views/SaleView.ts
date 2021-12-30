import { Sale } from "../models/Sale";
import ClientView from "./ClientView";
import EmploeeView from "./EmploeeView";
import { formatDate, formatPrice } from "./Utils";
import VehicleView from "./VehicleView";

class SaleView{
  saleView(sale: Sale){
    return {
      id: sale.id,
      valueSale: formatPrice(sale.valueSale),
      createdAt: formatDate(sale.createdAt)
    }
  }

  saleComplet(sale: any){
    const { Vehicle, Client, Emploee } = sale;
    return {
      id: sale.id,
      valueSale: formatPrice(sale.valueSale),
      createdAt: formatDate(sale.createdAt),
      vehicle: VehicleView.vehicleSimplified(Vehicle),
      client: ClientView.clientSimplified(Client),
      emploee: EmploeeView.emploeeSimplified(Emploee)
    }
  }

  salesByJoinView(sales: any[]){
    const salesReturneds = sales.map((sale) => this.saleComplet(sale));

    return salesReturneds;
  }

}

export default new SaleView();
