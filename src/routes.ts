import { Request, Response, Router } from 'express';
import EmploeeController from './controllers/EmploeeController';

const routes = Router();

routes.get("/", (request: Request, response: Response) => {
  return response.send("<h1 align=\"center\">Bem-Vindo(a) CARS</h1>");
});

routes.post("/emploee", EmploeeController.createEmploee);


export { routes };
