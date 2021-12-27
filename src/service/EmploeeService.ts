import { Op } from "sequelize";
import { Emploee } from "../models/Emploee";

class EmploeeService{
  async createEmploee(emploee): Promise<Emploee>{
    try {
      const emploeeCreated = await Emploee.create(emploee);
      return emploeeCreated;
    } catch (error) {
      throw new Error();
    }
  }

  async findEmploeeByCPFAndEmail(cpf: string, email: string): Promise<Emploee>{
    try {
      const emploee = await Emploee.findOne({where:{ [Op.or]: {cpf, email}}});
      return emploee;
    } catch (error) {
      throw new Error();
    }
  }
}

export default new EmploeeService;
