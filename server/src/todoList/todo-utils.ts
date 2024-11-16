import { Request, Response } from "express";
import { Database } from "sqlite";
import { Todo } from "../types";

export async function createTodoServer(req: Request, res: Response, db: Database) {
  const { id, content, completed } = req.body;

  if (!content) {
    return res.status(400).send({ error: "Missing required field: content" });
  }

  try {
    await db.run("INSERT INTO todolist (id, content, completed) VALUES (?, ?, ?);", [id, content, completed]);
  } catch (error) {
    return res.status(400).send({ error: `Todo item could not be created, + ${error}` });
  }

  res.status(201).send({ content, completed });
}

export async function deleteTodo(req: Request, res: Response, db: Database) {
  const todoId = req.params.id;
  const todoItem = await db.get("SELECT * FROM todolist WHERE id = ?;", [todoId]);

  // check if todo item exists
  if (!todoItem) {
    return res.status(404).send({ error: "Todo Item not found" });
  }

  await db.run("DELETE FROM todolist WHERE id = ?;", [todoId]);
  res.status(200).send({ message: "Todo Item deleted" });
}

export async function updateTodoItem(req: Request, res: Response, db: Database) {
  const todoId = req.params.id;
  const todoItem = await db.get("SELECT * FROM todolist WHERE id = ?;", [todoId]);
  const { content, completed } = req.body;

  // check if todo item exists
  if (!todoItem) {
    return res.status(404).send({ error: "Todo Item not found" });
  }

  if (content === undefined || completed === undefined) {
    return res.status(400).send({ message: "No fields to update provided." });
  }
}
export async function getTodoList(req: Request, res: Response, db: Database) {
  const todoList = await db.all("SELECT * FROM todolist");
  res.status(200).send({ data: todoList });
}
