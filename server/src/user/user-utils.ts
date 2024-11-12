import { Request, Response } from "express";
import sqlite3 from "sqlite3";
import { open } from "sqlite";
import { bcrypt } from "..";

require("dotenv").config();

const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

export function generateAccessToken(username: any) {
    return jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
}

export function authenticateToken(req: Request, res: Response, next: any) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
  
    if (token == null) return res.send(401)
  
    jwt.verify(token, process.env.TOKEN_SECRET as string, (err: any, user: any) => {
      console.log(err)
  
      if (err) return res.send(403)
  
      req.body.data.user = user;
  
      next()
    })
}

// Test createUser from terminal by running the line below:
// curl -X POST http://localhost:8080/register -H 'Content-Type: application/json' -d '{"username":"testuser1","password":"test1pass"}'
// Should be able to see new user in database.sql with username "testuser1" and a hashed password

export async function createUser (req: Request, res: Response, db: any) {
    try {
        const hashedPassword = bcrypt.hashSync(req.body.password)
        await db.run('INSERT INTO users (username, password) VALUES (?,?)', [req.body.username, hashedPassword]);
        const token = generateAccessToken({ username: req.body.username });
        res.status(200).send({ "username":  req.body.username, "access_token":  token });
    } catch (error) {
        return res.status(400).send({ error: `User could not be created ${error}` });
    };
}


// Test loginUser from terminal by running the line below:
// curl -X POST http://localhost:8080/login -H 'Content-Type: application/json' -d '{"username":"testuser1","password":"test1pass"}'
// Should return message "User logged in!"

export async function loginUser (req: Request, res: Response, db: any) {
    try {
        let row = await db.get(`SELECT * FROM users WHERE username = ?`, [req.body.username]);
        const result = bcrypt.compareSync(req.body.password, row.password)
        if (!result) {
            return res.send("Incorrect password")
        }
        const token = generateAccessToken({ username: req.body.username });
        res.send("User logged in!")
        res.status(200).send({ "username":  req.body.username, "access_token":  token});
    } catch (error) {
        return res.status(400).send({ error: `User could not be logged in ${error}` });
    };
}