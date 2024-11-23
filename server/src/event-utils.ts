import { Event } from "./types";
import { Request, Response } from "express";
import { Database } from "sqlite";

export async function createEventServer(req: Request, res: Response, db: Database) {
  const { id, title, startTime, endTime, weekday } = req.body;

  if (!title || !id || !startTime || !endTime || !weekday) {
    return res.status(400).send({ error: "Missing required fields" });
  }

  try {
    await db.run('INSERT INTO events (id, title, startTime, endTime, weekday) VALUES (?, ?, ?, ?, ?);', [id, title, startTime, endTime, weekday]);
} catch (error) {
    return res.status(400).send({ error: `Event could not be created, + ${error}` });
};

res.status(201).send({ id, title, startTime, endTime, weekday });
}

export async function deleteEvent(req: Request, res:Response, db:Database) {
  const eventID = req.params.id;
  const event = await db.get('SELECT * FROM events WHERE id = ?;', [eventID])

  if (!event) {
    return res.status(404).send({ error: "Event not found" });
  }

  await db.run('DELETE FROM events WHERE id = ?;', [eventID])
  res.status(200).send({ message: "Event deleted" });
}
export async function getEvents(res: Response, db: Database) {
    const events = await db.all('SELECT * FROM events')
    res.status(200).send({"data": events});
}