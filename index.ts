import { ServerResponse, IncomingMessage } from "http";
import http from 'http';
import { userRoutes } from "./src/routes/user.route";


const PORT = process.env.PORT || 8080;

const server = http.createServer((req:IncomingMessage, res:ServerResponse) => {
    userRoutes(req,res);
  });


server.listen(PORT, () => console.log(`server listening on port: ${PORT}`));