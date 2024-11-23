import { Database } from "sqlite";
import { createNote, getNotes, updateNote, deleteNote } from "./note-utils";
import { Request, Response } from 'express';

export function createNoteEndpoints(app: any, db: Database) {

    // curl -X POST http://localhost:8080/notes -H 'Content-Type: application/json' -d '{"userId":1, "title":"Test", "content":"Sample"}'
   app.post("/notes", (req: Request, res: Response) => {

       createNote(req, res, db);

   });

    // curl -X GET http://localhost:8080/notes/1
   app.get("/notes/:userId", (req: Request, res: Response) => {

       getNotes(req, res, db);

   });

   // curl -X PUT http://localhost:8080/note/1 -H 'Content-Type: application/json' -d '{"title":"Edited", "content":"Sample"}'
   app.put("/note/:noteId", (req: Request, res: Response) => {

       updateNote(req, res, db);

   });

   // curl -X DELETE http://localhost:8080/note/1 
   app.delete("/note/:noteId", (req: Request, res: Response) => {
    
        deleteNote(req, res, db);

});

}