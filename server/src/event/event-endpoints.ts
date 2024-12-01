import { createEventServer, deleteEvent, getEvents } from "./event-utils";
import { Request, Response } from "express";
import { Event } from "../types";
import { Database } from "sqlite";

const jwt = require('jsonwebtoken');

export function authenticateToken(req: Request, res: Response, next: any) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
  
    if (token == null) return res.send(401)
    
    try {
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);

        console.log(decoded)

        req.body.user_id = decoded.user_id;

        next()

    } catch (err) {
        res.status(400).json({ message: `${err}; Invalid or expired token` });
    }
}

export function createEventEndpoints(app: any, db: Database) {
    
    app.post("/events", authenticateToken, (req: Request, res: Response) =>{

        createEventServer(req, res, db);

    });

    app.delete("/events/:id", authenticateToken, (req: Request, res: Response) => {

        deleteEvent(req, res, db);
 
    });
    
    app.get("/events", authenticateToken, (req: Request, res: Response) => {

        getEvents(req, res, db);

    });
}