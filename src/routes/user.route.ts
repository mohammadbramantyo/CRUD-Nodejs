import { IncomingMessage, ServerResponse } from "http";
import { createUser, deleteUser, getAllUSer, getUserById, updateUser } from "../controllers/user.controller";
import { parse } from "url";


export const userRoutes =async (req:IncomingMessage, res:ServerResponse) => {
    const { pathname, query } = parse(req.url!, true);

    if (pathname === "/users" && req.method === "GET"){
        getAllUSer(req, res);
    } else if (pathname === "/user" && req.method === "POST"){
        createUser(req, res);
    } else if (pathname?.match(/\/user\/([0-9]+)/) && req.method === "GET"){
        getUserById(req, res);
    } else if (pathname?.match(/\/user\/([0-9]+)/) && req.method === "PUT"){
        updateUser(req, res);
    } else if (pathname?.match(/\/user\/([0-9]+)/) && req.method === "DELETE"){
        deleteUser(req,res);
    }

    else{
        res.writeHead(500, { "Content-Type": "application/json" });        
        res.end(JSON.stringify({error:"This Path doesn't Exist"}));
    }
}