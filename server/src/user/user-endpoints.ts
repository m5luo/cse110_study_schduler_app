import { Database } from "sqlite";
import { generateAccessToken, authenticateToken, createUser, loginUser } from "./user-utils";
import { Request, Response } from 'express';
import { bcrypt } from "..";

export function createUserEndpoints(app: any, db: Database) {
    // Create a new user
    app.post('/register', (req: Request, res: Response) => {

        createUser(req, res, db);

    });

    // Get user
    app.post('/login', (req: any, res: any) => {

        loginUser(req, res, db);

    });
}