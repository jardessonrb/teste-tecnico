import { Request, Response, Router } from 'express';

const routes = Router();

routes.get("/", (request: Request, response: Response) => {
  return response.send("<h1 align=\"center\">Bem-Vindo(a) CARS</h1>");
});

export { routes };
