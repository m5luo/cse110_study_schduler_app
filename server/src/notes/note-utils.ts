import { Database } from "sqlite";
import { Request, Response } from 'express';
import { Note } from "../types";

export const createNote = async (req: Request, res: Response, db: Database) => {
    try {
        const { userId, title, content } = req.body;
        if (!userId || !title || !content) {
            return res.status(400).send({ error: "Missing required fields" });
        }

        const result = await db.run(
        `INSERT INTO notes (user_id, title, content) VALUES (?, ?, ?)`,
        [userId, title, content]
        );
        res.status(201).json({ noteId: result.lastID, message: "Note created successfully"});
    } catch (error) {
        return res.status(400).json({ error: `Note could not be created, + ${error}` })
    } 
};

export const getNotes = async (req: Request, res: Response, db: Database) => {
    try {
        const { userId } = req.params;
        if (!userId) {
            return res.status(400).send({ error: "Missing required fields" });
        }

        const result = await db.all(
        `SELECT * FROM notes WHERE user_id = ?`, [userId]
        );
        res.status(201).json(result);
    } catch (error) {
        return res.status(400).json({ error: `Failed to retrieve notes, + ${error}` })
    } 
};

export const updateNote = async (req: Request, res: Response, db: Database) => {
    try {
        const { noteId } = req.params;
        const { title, content } = req.body;
        if (!noteId || !title || !content) {
            return res.status(400).send({ error: "Missing required fields" });
        }

        const noteExists = await db.get(`SELECT * FROM notes WHERE note_id = ?`, [noteId]);
        if (!noteExists) {
            return res.status(404).send({ error: "Note not found" });
        }

        const result = await db.run(
            `UPDATE notes SET title = ?, content = ? WHERE note_id = ?`,
            [title, content, noteId]
            );
        res.status(201).json({ message: "Note updated successfully"});
    } catch (error) {
        return res.status(400).json({ error: `Failed to update note, + ${error}` })
    } 
};

export const deleteNote = async (req: Request, res: Response, db: Database) => {
    try {
        const { noteId } = req.params;
        if (!noteId) {
            return res.status(400).send({ error: "Missing required fields" });
        }
        
        const noteExists = await db.get(`SELECT * FROM notes WHERE note_id = ?`, [noteId]);
        if (!noteExists) {
            return res.status(404).send({ error: "Note not found" });
        }
        
        const result = await db.run(
        `DELETE FROM notes WHERE note_id = ?`, [noteId]
        );
        res.status(201).json({ message: "Note deleted successfully"});
    } catch (error) {
        return res.status(400).json({ error: `Failed to delete note, + ${error}` })
    } 
};
