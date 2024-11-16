import { Database } from "sqlite";
import { createTodoServer, deleteTodo, getTodoList, updateTodoItem } from "./todo-utils";
import { Request, Response } from "express";

export function createTodoEndpoints(app: any, db: Database) {
  // Create a new todolist
  app.post("/todolist", (req: Request, res: Response) => {
    createTodoServer(req, res, db);
  });

  // Delete a todo list item
  app.delete("/todolist/:id", (req: Request, res: Response) => {
    deleteTodo(req, res, db);
  });

  // Get all todo items
  app.get("/todolist", (req: Request, res: Response) => {
    getTodoList(req, res, db);
  });

  // Update a todo list item
  app.put("/todolist/:id", (req: Request, res: Response) => {
    updateTodoItem(req, res, db);
  });
}
