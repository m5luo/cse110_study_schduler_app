import express, { Express, Request, Response , Application } from 'express';
//import { Response } from "express";
import cors from "cors";
import initDB from './createTables';
import { createNoteEndpoints } from "./notes/note-endpoints"; 
// import dotenv from 'dotenv';

//For env File 
// dotenv.config();

//const express = require("express");
//const cors = require("cors");

const app = express();
const port = 8080;

app.use(cors());
app.use(express.json());

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
 });

 // Initialize the database and start the server
(async () => {
  const db = await initDB();
  
  app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to Express & TypeScript Server');
  });
  
  createNoteEndpoints(app, db);
})();
