import { Request, Response } from "express";
import sqlite3 from "sqlite3";
import { open } from "sqlite";
import { bcrypt } from "..";
import { User } from "../types";

require("dotenv").config();

const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

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
        await db.run('INSERT INTO users (username, password, email) VALUES (?,?,?)', [req.body.username, hashedPassword, req.body.email]);
        const token = generateAccessToken({ username: req.body.username });
        let row = await db.get(`SELECT * FROM users WHERE username = ?`, [req.body.username]);
        res.status(200).send({ "user_id": row.user_id, "username":  req.body.username, "access_token":  token });
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
            return res.send({ error: `Password incorrect` })
        }
        const token = generateAccessToken({ username: req.body.username });
        // res.send("User logged in!")
        res.status(200).send({ "user_id": row.user_id, "username":  req.body.username, "access_token":  token});
    } catch (error) {
        return res.status(400).send({ error: `User could not be logged in ${error}` });
    };
}

// Test loginUser from terminal by running the line below:
// curl -X POST http://localhost:8080/forgot-password -H 'Content-Type: application/json' -d '{"email":"<your-email>"}'
// Should send email

export async function sendResetPassEmail (req: Request, res: Response, db: any) {
    const { email } = req.body;

    try {
        let userId  = await db.get(`SELECT user_id FROM users WHERE email = ?`, [email]);

        if (!userId) {
            return res.status(404).json({ message: 'User not found' });
        }
    
        // Generate JWT token
        const token = jwt.sign({ userId: userId }, process.env.TOKEN_SECRET, { expiresIn: process.env.RESET_TOKEN_EXPIRY });
    
        // Send email
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });
    
        const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;
        const mailOptions = {
            from: process.env.SMTP_USER,
            to: email,
            subject: 'Password Reset',
            text: `Click here to reset your password: ${resetLink}`,
        };
    
        transporter.sendMail(mailOptions, (err: any, info: any) => {
            if (err) {
                return res.status(500).json({ message: `${err}` });
            }
            res.status(200).json({ message: 'Password reset link sent' });
        });
    } catch (error) {
        return res.status(400).send({ error: `Received ${error} when sending email` });
    };
}

// Test loginUser from terminal by running the line below:
// curl -X POST http://localhost:8080/reset-password -H 'Content-Type: application/json' -d '{ "token": "<reset_token>", "newPassword": "<new-password>" }'
// Should send email

export async function updatePassword (req: Request, res: Response, db: any) {
    const { token, newPassword } = req.body;

    console.log(token);

    try {
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);

        console.log(decoded.userId.user_id)

        // Hash the new password
        const hashedPassword = bcrypt.hashSync(newPassword);

        await db.run('UPDATE users SET password = ? WHERE user_id = ?', [hashedPassword, decoded.userId.user_id]);
        res.status(200).json({ message: 'Password updated successfully' });
    } catch (err) {
        res.status(400).json({ message: `${err}; Invalid or expired token` });
    }
}