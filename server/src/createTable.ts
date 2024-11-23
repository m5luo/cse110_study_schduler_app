import sqlite3 from "sqlite3";
import { open } from "sqlite";

const initDB = async () => {
  // Open the database connection
  const db = await open({
    filename: "database.sqlite",
    driver: sqlite3.Database,
  });

  // Create the "todoList" table if it doesn't exist
  await db.exec(`
    CREATE TABLE IF NOT EXISTS todolist (
      id TEXT PRIMARY KEY,
      content TEXT NOT NULL,
      completed INTEGER NOT NULL DEFAULT 0
    );
  `);

  return db;
};

export default initDB;
