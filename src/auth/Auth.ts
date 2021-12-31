import { NextFunction, Request, Response } from "express";
import 'dotenv/config';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { ErrorValidation } from "../types/responses";
import { emploeeType } from "../types/status";
class Auth{
  access(request: Request, response: Response, next: NextFunction){
    const { token } = request.body;
    if(!token){
      const res: ErrorValidation = {message: "Sem autenticação", type: "error validation", errors: ["Sem autenticação"]};
      return response.status(401).json(res);
    }

    jwt.verify(token, process.env.KEY, (error, decoded: JwtPayload) => {
      if(error){
        if(error.name === "TokenExpiredError"){
          const res: ErrorValidation = {message: "Sessão expirada", type: "error validation", errors: ["Sessão expirada"]};
          return response.status(401).json(res);
        }

        const res: ErrorValidation = {message: "Erro de autenticação", type: "error validation", errors: ["Erro de autenticação"]};
        return response.status(401).json(res);
      }

      if(decoded){
        const emploeeAccess = decoded.emploeeAccess;
        if(emploeeAccess === emploeeType.ADMINISTRATOR){
          next();
        }else{
          const res: ErrorValidation = {message: "Acesso negado para funcionario", type: "error validation", errors: ["Acesso negado"]};
          return response.status(401).json(res);
        }
      }
    });
  }

  token(emploeeId: string, emploeeAccess: string): string{
    return jwt.sign({emploeeId, emploeeAccess}, process.env.KEY, { expiresIn: 54000000})
  }

}
export default new Auth();
