import { Database } from "sqlite";
import { Request, Response } from 'express';
import { Note } from "../types";

export const createNote = async (req: Request, res: Response, db: Database) => {
    const userId = req.body.user_id;

    try {
        const {note_id, title, content } = req.body;
        if (!note_id || !title || !content) {
            return res.status(400).send({ error: "Missing required fields" });
        }

        const result = await db.run(
            `INSERT INTO notes (note_id, user_id, title, content) VALUES (?, ?, ?, ?)`, [note_id, userId, title, content]
        );
        res.status(201).json({ note_id, title, content, message: "Note created successfully"});
    } catch (error) {
        return res.status(400).json({ error: `Note could not be created, + ${error}` })
    } 
};

export const getNotes = async (req: Request, res: Response, db: Database) => {
    const userId = req.body.user_id;
    try {
        // // const { userId } = req.params;
        // if (!userId) {
        //     return res.status(400).send({ error: "Missing required fields" });
        // }

        const notes = await db.all(
            `SELECT * FROM notes WHERE user_id = ?`, [userId]
        );
        res.status(201).json({ "data": notes });
    } catch (error) {
        return res.status(400).json({ error: `Failed to retrieve notes, + ${error}` })
    } 
};

export const getNotesByID = async (req: Request, res: Response, db: Database) => {
    const userId = req.body.user_id;
    try {
        const { note_id } = req.params;
        if (!note_id) {
            return res.status(400).send({ error: "Missing required fields" });
        }

        const note = await db.get(
            `SELECT * FROM notes WHERE user_id = ? AND note_id = ?`, [userId, note_id]
        );
        res.status(201).json({ "data": note });
    } catch (error) {
        return res.status(400).json({ error: `Failed to retrieve notes, + ${error}` })
    } 
};

export const getNoteCountByID = async (req: Request, res: Response, db: Database) => {
    const userId = req.body.user_id;
    try {
        const { note_id } = req.params;
        if (!note_id) {
            return res.status(400).send({ error: "Missing required fields" });
        }

        const num = await db.get(
            `SELECT COUNT(*) AS count FROM notes WHERE user_id = ? AND note_id = ?`, [userId, note_id]
        );
        res.status(201).json({ "data": num });
    } catch (error) {
        return res.status(400).json({ error: `Failed to retrieve notes, + ${error}` })
    } 
};

export const updateNote = async (req: Request, res: Response, db: Database) => {
    // const userId = req.body.user_id;
    try {
        const { note_id } = req.params;
        const { title, content } = req.body;
        if (!note_id || !title || !content) {
            return res.status(400).send({ error: "Missing required fields" });
        }

        const noteExists = await db.get(`SELECT * FROM notes WHERE note_id = ?`, [note_id]);
        if (!noteExists) {
            return res.status(404).send({ error: "Note not found" });
        }

        const result = await db.run(
            `UPDATE notes SET title = ?, content = ? WHERE note_id = ?`, [title, content, note_id]
            );
        res.status(201).json({ note_id, title, content, message: "Note updated successfully"});
    } catch (error) {
        return res.status(400).json({ error: `Failed to update note, + ${error}` })
    } 
};

export const deleteNote = async (req: Request, res: Response, db: Database) => {
    // const userId = req.body.user_id;
    try {
        const { note_id } = req.params;
        if (!note_id) {
            return res.status(400).send({ error: "Missing required fields" });
        }
        
        const noteExists = await db.get(`SELECT * FROM notes WHERE note_id = ?`, [note_id]);
        if (!noteExists) {
            return res.status(404).send({ error: "Note not found" });
        }
        
        const result = await db.run(`DELETE FROM notes WHERE note_id = ?`, [note_id]
        );
        res.status(201).json({ message: "Note deleted successfully"});
    } catch (error) {
        return res.status(400).json({ error: `Failed to delete note, + ${error}` })
    } 
};
