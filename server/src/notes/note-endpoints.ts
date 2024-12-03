import { Database } from "sqlite";
import { createNote, getNotes, updateNote, deleteNote, getNotesByID, getNoteCountByID } from "./note-utils";
import { Request, Response } from 'express';

const jwt = require('jsonwebtoken');

export function authenticateToken(req: Request, res: Response, next: any) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
  
    if (token == null) return res.send(401)
    
    try {
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);

        req.body.user_id = decoded.user_id;

        next()

    } catch (err) {
        res.status(400).json({ message: `${err}; Invalid or expired token` });
    }
}

export function createNoteEndpoints(app: any, db: Database) {

    // curl -X POST http://localhost:8080/notes -H 'Content-Type: application/json' -d '{"userId":1, "title":"Test", "content":"Sample"}'
   app.post("/notes", authenticateToken, (req: Request, res: Response) => {

       createNote(req, res, db);

   });

    // curl -X GET http://localhost:8080/notes
   app.get("/notes", authenticateToken, (req: Request, res: Response) => {

       getNotes(req, res, db);

   });

    // curl -X GET http://localhost:8080/notes/1
    app.get("/notes/:note_id", authenticateToken, (req: Request, res: Response) => {

        getNoteCountByID(req, res, db); 

    });

   // curl -X PUT http://localhost:8080/note/1 -H 'Content-Type: application/json' -d '{"title":"Edited", "content":"Sample"}'
   app.put("/notes/:note_id", authenticateToken, (req: Request, res: Response) => {

       updateNote(req, res, db);

   });

   // curl -X DELETE http://localhost:8080/note/2
   app.delete("/notes/:note_id", authenticateToken, (req: Request, res: Response) => {
    
        deleteNote(req, res, db);

});

}