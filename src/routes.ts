import { Response, Router } from 'express';
import Auth from './auth/Auth';
import multer from 'multer';
import ClientController from './controllers/ClientController';
import EmploeeController from './controllers/EmploeeController';
import ReserveVehicleController from './controllers/ReserveVehicleController';
import SaleController from './controllers/SaleController';
import VehicleController from './controllers/VehicleController';
import uploadconfig from './uploadconfig';

const routes = Router();
const uploadAvatarEmploee = multer(uploadconfig);

routes.get("/", (_, response: Response) => {
  return response.send("<h1 align=\"center\">Bem-Vindo(a) CARS</h1>");
});

routes.post("/emploee", uploadAvatarEmploee.array("images"), EmploeeController.createEmploee);
routes.get("/emploee", Auth.access, EmploeeController.listEmploees);
routes.get("/emploee/login", EmploeeController.login);
routes.get("/emploee/:cpf", EmploeeController.findEmploeeByCPF);
routes.put("/emploee/:emploeeId",  Auth.access, EmploeeController.updateEmploee);
routes.delete("/emploee/:emploeeId", Auth.access, EmploeeController.disconnectEmploeeCompany);

routes.post("/vehicle", VehicleController.createVehicle);
routes.get("/vehicle", VehicleController.listVehicles);
routes.get("/vehicle/:vehicleId", VehicleController.findVehicleById);
routes.put("/vehicle/:vehicleId",  Auth.access, VehicleController.updateVehicle);
routes.delete("/vehicle/:vehicleId",  Auth.access, VehicleController.deleteVehicle);
routes.get("/vehicle/status/:status", VehicleController.findVehiclesByStatus);

routes.post("/client", ClientController.createClient);
routes.get("/client/:clientId", ClientController.findClient);
routes.get("/client", ClientController.listClients);
routes.put("/client/:clientId", ClientController.updateClient);

routes.post("/sale", SaleController.createSale);
routes.get("/sale", SaleController.listSales);
routes.get("/sale/emploee/:emploeeId", SaleController.findSalesByEmploee);

routes.post("/reserve", ReserveVehicleController.createReserveVehicle);
routes.get("/reserve/emploee/:emploeeId", ReserveVehicleController.listReservesVehiclesByEmploee);
routes.get("/reserve", ReserveVehicleController.listReserves);
routes.patch("/reserve/:reserveId", ReserveVehicleController.closeReserve);

export { routes };
