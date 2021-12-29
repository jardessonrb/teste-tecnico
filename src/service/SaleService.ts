import { Sale } from "../models/Sale";

class SaleService {
  async createSale(sale: any): Promise<Sale>{
    try {
      const saleCreated = await Sale.create(sale);
      return saleCreated;
    } catch (error) {
      throw new Error();
    }
  }
}

export default new SaleService();
