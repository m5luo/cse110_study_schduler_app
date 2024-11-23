import { Database } from "sqlite";
import { generateAccessToken, authenticateToken, createUser, loginUser, updatePassword, sendResetPassEmail } from "./user-utils";
import { Request, Response } from 'express';
import { bcrypt } from "..";

export function createUserEndpoints(app: any, db: Database) {
    // Create a new user
    app.post('/register', (req: Request, res: Response) => {

        createUser(req, res, db);

    });

    // Get user
    app.post('/login', (req: Request, res: Response) => {

        loginUser(req, res, db);

    });

    app.post('/forgot-password', (req: Request, res: Response) => {

        sendResetPassEmail(req, res, db);

    });

    app.post('/reset-password', (req: Request, res: Response) => {

        updatePassword(req, res, db);

    });
}