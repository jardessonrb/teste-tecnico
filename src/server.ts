import 'dotenv/config';
import express from 'express';
import { routes } from './routes';

const portRunningServer = process.env.PORT || 3333;
const application = express();

application.use(express.json());
application.use(routes);
application.listen(portRunningServer, () => {
    console.log("Server running in port: ", portRunningServer);
});

