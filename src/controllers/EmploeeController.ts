import { Request, Response } from "express";
import { validation } from "../types/validation";
import { Emploee } from "../models/Emploee";
import EmploeeValidator from "../validators/EmploeeValidator";
import { ErrorValidation } from "../types/responses";

class EmploeeController{
  async createEmploee(request: Request, response: Response): Promise<Response> {
    const { name, cpf, email, password, avatar, biografy, type } = request.body;

    const validation: validation = await EmploeeValidator.createValidation(request.body);
    if(!validation.isValid){
      return response.status(403).json({message: "Campos invalidos", errors: validation.errors} as ErrorValidation);
    }

    const emploeeCreated = await Emploee.create(request.body);

    console.log(request.body);

    return response.status(200).json(emploeeCreated);
  }
}

export default new EmploeeController();
