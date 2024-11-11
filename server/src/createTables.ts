import sqlite3 from "sqlite3";
import { open } from "sqlite";

const initDB = async () => {
 // Open the database connection
 const db = await open({
   filename: "database.sqlite",
   driver: sqlite3.Database,
 });
 // Create a "budget" table if it doesn't exist
 await db.exec(`
   CREATE TABLE IF NOT EXISTS users (
     user_id TEXT PRIMARY KEY,
     username TEXT NOT NULL,
     password TEXT NOT NULL
   );
 `);
 return db;
};

export default initDB;