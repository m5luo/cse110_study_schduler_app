import { Request, Response } from "express";
import initDB from "./createTables";
import { createUserEndpoints } from "./user/user-endpoints";

export const express = require("express");
export const cors = require("cors");
export const jwt = require('jsonwebtoken');
export const bodyParser = require('body-parser');
export const bcrypt = require('bcryptjs'); 

export const app = express();
export const port = 8080;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// Start the server
app.listen(port, () => {
 console.log(`Server running at http://localhost:${port}`);
});

// Initialize the database and start the server
(async () => {
 const db = await initDB();

 // Root endpoint to get test if the server is running
 app.get("/", (req: Request, res: Response) => {
   res.send({ "data": "Hello, TypeScript Express!" });
   res.status(200);
 });

 createUserEndpoints(app, db);

})();