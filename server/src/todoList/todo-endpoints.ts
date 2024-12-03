import { Database } from "sqlite";
import { createTodoServer, deleteTodo, getTodoList, updateTodo } from "./todo-utils";
import { Request, Response } from "express";

const jwt = require("jsonwebtoken");
export function authenticateToken(req: Request, res: Response, next: any) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.send(401);

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    console.log(decoded);
    req.body.user_id = decoded.user_id;
    next();
  } catch (err) {
    res.status(400).json({ message: `${err}; Invalid or expired token` });
  }

  // jwt.verify(token, process.env.TOKEN_SECRET as string, (err: any, user: any) => {
  //   console.log(err)

  //   if (err) return res.send(403)

  //   req.body.user_id = user.userId;

  //   next()
  // })
}

export function createTodoEndpoints(app: any, db: Database) {
  // Create a new todolist
  app.post("/todolist", authenticateToken, (req: Request, res: Response) => {
    createTodoServer(req, res, db);
  });

  // Delete a todo list item
  app.delete("/todolist/:id", authenticateToken, (req: Request, res: Response) => {
    deleteTodo(req, res, db);
  });

  // Get all todo items
  app.get("/todolist", authenticateToken, (req: Request, res: Response) => {
    getTodoList(req, res, db);
  });

  // Update a todo list item
  app.put("/todolist/:id", authenticateToken, (req: Request, res: Response) => {
    updateTodo(req, res, db);
  });
}
