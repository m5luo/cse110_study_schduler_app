import { Event } from "./types";
import { Request, Response } from "express";

export function createEventServer(req: Request, res: Response, events: Event[]) {
  const { title, color, startTime, endTime, weekday } = req.body;

  if (!title || !color || !startTime || !endTime) {
    return res.status(400).send({ error: "Missing required fields" });
  }

  const newEvent: Event = {
    title: title,
    color: color,
    startTime: startTime,
    endTime: endTime,
    weekday: weekday,
  };

  events.push(newEvent);
  res.status(201).send(newEvent);
}