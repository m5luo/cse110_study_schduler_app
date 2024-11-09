import { createEventServer } from "./createEvent";
import { Request, Response } from "express";
import { Event } from "./types";

export function createEventEndpoints(app: any, events: Event[]) {
    app.post("/events", (req: Request, res: Response) =>{

        createEventServer(req, res, events);

    });
}