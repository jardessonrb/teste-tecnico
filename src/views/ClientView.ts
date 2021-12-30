import { Client } from "../models/Client";
import { formatDate } from "./Utils";

class ClientView {

  clientView(client: Client){
    return {
      id: client.id,
      name: client.name,
      email: client.email,
      cpf: client.cpf,
      avatar: client.avatar,
      fone: client.fone,
      createdAt: formatDate(client.createdAt)
    }
  }

  clientsView(clients: Client[]){
    const clientsReturned = clients.map((client) => this.clientView(client));

    return clientsReturned;
  }

}

export default new ClientView();
