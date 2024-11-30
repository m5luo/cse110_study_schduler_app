import sqlite3 from "sqlite3";
import { open } from "sqlite";

const initDB = async () => {
 // Open the database connection
 const db = await open({
   filename: "database.sqlite",
   driver: sqlite3.Database,
 });
 // Create a "users" table if it doesn't exist
 await db.exec(`
   CREATE TABLE IF NOT EXISTS users (
     user_id INTEGER PRIMARY KEY,
     username TEXT NOT NULL UNIQUE,
     password TEXT NOT NULL,
     email TEXT NOT NULL
   );
 `);

 // Create a "events" table if it doesn't exist
 await db.exec(`
    CREATE TABLE IF NOT EXISTS events (
      id INTEGER PRIMARY KEY,
      title TEXT NOT NULL,
      startTime TEXT NOT NULL,
      endTime TEXT NOT NULL,
      weekday TEXT NOT NULL,
      user_id INT NOT NULL,
      FOREIGN KEY(user_id) REFERENCES users(user_id)
    );
  `);
 return db;
};

export default initDB;