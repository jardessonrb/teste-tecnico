import { Request, Response } from "express";
import { Emploee } from "../database/models/Emploee";
import EmploeeValidator from "../validators/EmploeeValidator";

class EmploeeController{
  async createEmploee(request: Request, response: Response): Promise<Response> {
    const { name, cpf, email, password, avatar, biografy, type } = request.body;

    const { isValide, errors} = await EmploeeValidator.createValidation(request.body);
    if(!isValide){
      return response.status(403).json({message: "Campos invalidos", errors});
    }

    const emploeeCreated = await Emploee.create(request.body);

    console.log(request.body);

    return response.status(200).json(emploeeCreated);
  }
}

export default new EmploeeController();
