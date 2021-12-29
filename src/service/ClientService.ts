import { Op } from "sequelize";
import { Client } from "../models/Client";

class ClientService {
  async createClient(client): Promise<Client>{
    try {
      const clientCreated = await Client.create(client);
      return clientCreated;
    } catch (error) {
      throw new Error();
    }
  }

  async findClientByCPFAndEmail(cpf: string, email: string): Promise<Client>{
    try {
      const client = await Client.findOne({where: {[Op.or]: {cpf, email}}});
      return client;
    } catch (error) {
      throw new Error();
    }
  }
}

export default new ClientService();
