import { Request, Response } from "express";
import { Database } from "sqlite";
import { Todo } from "../types";

export async function createTodoServer(req: Request, res: Response, db: Database) {
  const { id, content, completed } = req.body;

  // check if content and id exists
  if (!content || !id) {
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

export async function updateTodo(req: Request, res: Response, db: Database) {
  console.log('Request body:', req.body);  // Log the body of the request to verify it contains the correct data
  console.log('Todo ID:', req.params.id);  // Log the todo ID from the URL

  const todoId = req.params.id;
  const completed  = req.body.completed;
  
  const todoItem = await db.get("SELECT * FROM todolist WHERE id = ?;", [todoId]);

  // Check if the todo item exists
  if (!todoItem) {
    return res.status(404).send({ error: "Todo Item not found" });
  }

  // Update the todo item with the new 'completed' status
  await db.run("UPDATE todolist SET completed = ? WHERE id = ?;", [completed, todoId]);

  // Respond with the updated todo item data
  res.status(200).send({ message: "Todo updated successfully", id: todoId, completed });
}

export async function getTodoList(req: Request, res: Response, db: Database) {
  const todoList = await db.all("SELECT * FROM todolist");
  res.status(200).send({ data: todoList });
}