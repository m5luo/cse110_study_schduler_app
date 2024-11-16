import { Event } from "./types";
import { Request, Response } from "express";
import { Database } from "sqlite";

export async function createEventServer(req: Request, res: Response, db: Database) {
  const { title, color, startTime, endTime, weekday } = req.body;

  if (!title || !color || !startTime || !endTime || !weekday) {
    return res.status(400).send({ error: "Missing required fields" });
  }

  try {
    await db.run('INSERT INTO events (title, color, startTime, endTime, weekday) VALUES (?, ?, ?, ?, ?);', [title, color, startTime, endTime, weekday]);
} catch (error) {
    return res.status(400).send({ error: `Expense could not be created, + ${error}` });
};

res.status(201).send({ title, color, startTime, endTime, weekday });
}

export async function deleteEvent(req: Request, res:Response, db:Database) {
  const eventID = req.params.title;
  const event = await db.get('SELECT * FROM events WHERE title = ?;', [eventID])

  if (!event) {
    return res.status(404).send({ error: "Expense not found" });
  }

  await db.run('DELETE FROM events WHERE title = ?;', [eventID])
  res.status(200).send({ message: "Expense deleted" });
}
export async function getEvents(res: Response, db: Database) {
    const events = await db.all('SELECT * FROM events')
    res.status(200).send({"data": events});
}