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

  async findClientById(clientId: string): Promise<Client>{
    try {
      const client = await Client.findOne({where: { id: clientId }});
      return client;
    } catch (error) {
      throw new Error();
    }
  }

  async findAllClients(page: number, limit: number): Promise<Client[]>{
    const offSet = (page - 1) * limit;
    limit = limit * page;

    try {
      const clients = await Client.findAll({limit: limit, offset: offSet});
      return clients;
    } catch (error) {
      throw new Error();
    }
  }

  async updateClient(client): Promise<void>{
    const { name, email, cpf, fone, id} = client;

    try {
      await Client.update({
        name,
        email,
        cpf,
        fone,
      }, {where: {id}});
    } catch (error) {
      throw new Error();
    }
  }
}

export default new ClientService();
