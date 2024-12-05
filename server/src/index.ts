import { Response } from "express";
import { createUserEndpoints } from "./user/user-endpoints";
import { createEventEndpoints } from "./event/event-endpoints";
import { Event } from "./types";
import initDB from "./createTables";
import { createTodoEndpoints } from "./todolist/todo-endpoints";
import { createNoteEndpoints } from "./notes/note-endpoints";

// import dotenv from 'dotenv';

export const express = require("express");
export const cors = require("cors");
export const jwt = require("jsonwebtoken");
export const bodyParser = require("body-parser");
export const bcrypt = require("bcryptjs");

export const app = express();
export const port = 8080;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

(async () => {
  const db = await initDB();

  // Root endpoint to get test if the server is running
  app.get("/", (req: Request, res: Response) => {
    res.status(200).send({ data: "Hello, TypeScript Express!" });
  });

  createUserEndpoints(app, db);
  createEventEndpoints(app, db);
  createTodoEndpoints(app, db);
  createNoteEndpoints(app, db);
})();
