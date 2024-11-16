import { Response } from 'express';
import { createEventEndpoints } from './event-endpoints';
import { Event } from './types';
import initDB from './createTables';

// import dotenv from 'dotenv';

//For env File 
// dotenv.config();

const express = require("express")
const cors = require("cors")

const app = express();
const port = 8080;

app.use(cors());
app.use(express.json());

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

(async () => {
    const db = await initDB();
   
    // Root endpoint to get test if the server is running
    app.get("/", (req: Request, res: Response) => {
      res.status(200).send({ "data": "Hello, TypeScript Express!" });
    });
   
    createEventEndpoints(app, db);
   })();