import { IncomingMessage, ServerResponse } from "http";
import { users } from "../data/db"
import { User } from "../models/user.model";
import { parse } from "url";
import { findUserById, getRequestBody, isUserValid } from "../utils";


export function getAllUSer(req: IncomingMessage, res: ServerResponse) {
    console.log('GET /users');

    try {
        const userList: User[] = users;
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(userList));
    } catch (error) {
        console.error('Error fetching user data:', error);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Failed to fetch user data' }));
    }
}

export function getUserById(req: IncomingMessage, res: ServerResponse) {
    console.log("GET /user/id");

    try {
        const { pathname } = parse(req.url!, true);

        const stringId = pathname!.split("/")[2];
        const id: number = parseInt(stringId);
    
        const user = findUserById(id);
    
        // Check if user exist
        if (user) {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(user));
        } else {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: "User Not Found" }));
        } 

    } catch (error) {
        console.error('Error fetching user data:', error);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Failed to fetch user data' }));
    }

    
}

export async function createUser(req: IncomingMessage, res: ServerResponse) {
    console.log("POST /user");
    
    try {
        // Get the request body by chunk
        const userData: string = await getRequestBody(req);
        const newUser: User = JSON.parse(userData);
        
        // Validate input
        if(!isUserValid(newUser)){
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: "Invalid User Data " }))
        }
        // Check if the id already used
        else if (findUserById(newUser.id)) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: "User with this Id Already Exist" }));
        } 
        else {
            // Add User to database
            users.push(newUser);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(newUser));

        }

    } catch (error) {
        console.log('Error adding user data:', error);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Failed to add user data' }));
    }

}

export async function updateUser(req: IncomingMessage, res: ServerResponse) {
    console.log("PUT /user/id");

    try {
        const { pathname } = parse(req.url!, true);
    
        // Get id from path
        const stringId = pathname!.split("/")[2];
        const id: number = parseInt(stringId);
        
        // Get the request body and the updated user
        const userData: string = await getRequestBody(req);
        const updatedUser: User = JSON.parse(userData);
    
        // Validate input
        if(!isUserValid(updatedUser)){
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: "Invalid User Data " }))
        }
        // Check if the id exist
        else if (!findUserById(updatedUser.id)) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: `User with this Id Doesn't Exist` }));
        } 
        else {
            // Update user
            const userIndex:number = users.findIndex((user)=> user.id === id);
            users[userIndex] = updatedUser;
    
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(updatedUser));
    
        }
    } catch (error) {
        console.log('Error updating user data:', error);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Failed to update user data' }));
    }

}

export function deleteUser(req:IncomingMessage, res:ServerResponse){
    console.log("DELETE /user/id");

    try {
        const { pathname } = parse(req.url!, true);
    
        // Get user id from path
        const stringId = pathname!.split("/")[2];
        const id: number = parseInt(stringId);
    
        const user = findUserById(id);
    
        // Check if user exist
        if (user) {
            // Delete user with id == id
            users.splice(
                users.findIndex((u)=>{
                    u.id == user.id
                })
    
            )
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(users));
        } else {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: "User Not Found" }));
        }
    } catch (error) {
        console.log('Error deleting user data:', error);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Failed to delete user data' }));
    }
}