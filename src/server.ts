import 'dotenv/config';
import express from 'express';
import path from 'path';
import { routes } from './routes';

const portRunningServer = process.env.PORT || 3333;
const application = express();

application.use(express.json());
application.use(routes);

routes.use("/public", express.static(path.join(__dirname, 'public')));
application.listen(portRunningServer, () => {
    console.log("Server running in port: ", portRunningServer);
});

