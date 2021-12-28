import { Request, Response, Router } from 'express';
import EmploeeController from './controllers/EmploeeController';
import VehicleController from './controllers/VehicleController';

const routes = Router();

routes.get("/", (request: Request, response: Response) => {
  return response.send("<h1 align=\"center\">Bem-Vindo(a) CARS</h1>");
});

routes.post("/emploee", EmploeeController.createEmploee);
routes.get("/emploee", EmploeeController.listEmploees);
routes.get("/emploee/:cpf", EmploeeController.findEmploeeByCPF);
routes.put("/emploee/:emploeeId", EmploeeController.updateEmploee);
routes.delete("/emploee/:emploeeId", EmploeeController.disconnectEmploeeCompany);

routes.post("/vehicle", VehicleController.createVehicle);
routes.get("/vehicle", VehicleController.listVehicles);
routes.get("/vehicle/:vehicleId", VehicleController.findVehicleById);
routes.put("/vehicle/:vehicleId", VehicleController.updateVehicle);


export { routes };
