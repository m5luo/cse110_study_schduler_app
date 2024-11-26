import { createEventServer, deleteEvent, getEvents } from "./event-utils";
import { Request, Response } from "express";
import { Event } from "./types";
import { Database } from "sqlite";


export function createEventEndpoints(app: any, db: Database) {
    
    app.post("/events", (req: Request, res: Response) =>{

        createEventServer(req, res, db);

    });

    app.delete("/events/:id", (req: Request, res: Response) => {

        deleteEvent(req, res, db);
 
    });
    
    app.get("/events", (req: Request, res: Response) => {

        getEvents(res, db);

    });
}