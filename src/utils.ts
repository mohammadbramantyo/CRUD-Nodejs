import { IncomingMessage } from "http";
import { users } from "./data/db";
import { User } from "./models/user.model";

export function findUserById(id: number) {
    const user = users.find((user) => user.id === id);
    return user;
}

export function isUserValid(user: User) {
    return (
        typeof user.id === 'number' &&
        typeof user.name === 'string' &&
        typeof user.email === 'string' &&
        typeof user.dob === 'string'
    );
}

export function getRequestBody(req: IncomingMessage): Promise<string> {
    return new Promise((resolve, reject) => {
        try {
            let body: string = "";
            // Get the request body by chunk
            req.on("data", (chunk) => {
                // append the string version to the body
                body += chunk.toString();
            });

            req.on("end", () => {
                // send back the data
                resolve(body);
            });
        } catch (error) {
            reject(error);
        }
    });
}