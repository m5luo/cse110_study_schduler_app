import { Event } from "../types";
import { Request, Response } from "express";
import { Database } from "sqlite";

const jwt = require('jsonwebtoken');

export function generateAccessToken(user_id: any) {
  return jwt.sign({ user_id: user_id }, process.env.TOKEN_SECRET, { expiresIn: process.env.RESET_TOKEN_EXPIRY });
}

export async function createEventServer(req: Request, res: Response, db: Database) {
  const userId = req.body.user_id;
  const { title, id, startTime, endTime, weekday } = req.body;

  if (!title || !id || !startTime || !endTime || !weekday) {
    return res.status(400).send({ error: "Missing required fields" });
  }

  try {
    // const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    // const user_id = decoded.userId.user_id;
    await db.run('INSERT INTO events (id, title, startTime, endTime, weekday, user_id) VALUES (?, ?, ?, ?, ?, ?);', [id, title, startTime, endTime, weekday, userId]);
  } catch (error) {
    return res.status(400).send({ error: `Event could not be created, + ${error}` });
  };

  res.status(201).send({ title, startTime, endTime, weekday });
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

export async function getEvents(req: Request, res: Response, db: Database) {
  const userId = req.body.user_id;

  const events = await db.all('SELECT * FROM events WHERE user_id = ?;', [userId])
  res.status(200).send({"data": events});
}