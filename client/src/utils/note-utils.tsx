import { API_BASE_URL } from "../constants";
import { Note, noteCount } from "../types/types";

export const createNote = async (token: string, note: Note): Promise<Note> => {
  const response = await fetch(`${API_BASE_URL}/notes`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(note),
  });
  if (!response.ok) {
    throw new Error("Failed to create note");
  }
  return response.json();
};

export const fetchNoteByID = async (token: string, note: Note): Promise<noteCount> => {
    const response = await fetch(`${API_BASE_URL}/notes/${note.note_id}`, {
      method: "GET",
      headers: {
          "Authorization": `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch notes");
    }
  
    // Parsing the response to get the data
    let noteItem = response.json().then((jsonResponse) => {
      console.log("data in fetchEvents", jsonResponse);
      return jsonResponse.data;
    });
  
    console.log("response in fetchExpenses", noteItem);
    return noteItem;
  };

// Function to delete an expense in the backend. Method: DELETE
export const deleteNote = async (token: string, note: Note): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/notes/${note.note_id}`, {
    method: "DELETE",
    headers: {
        "Authorization": `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error("Failed to delete note");
  }
};

// Function to get all expenses from the backend. Method: GET
export const fetchNotes = async (token: string): Promise<Note[]> => {
  const response = await fetch(`${API_BASE_URL}/notes`, {
    method: "GET",
    headers: {
        "Authorization": `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch notes");
  }

  // Parsing the response to get the data
  let noteList = response.json().then((jsonResponse) => {
    console.log("data in fetchEvents", jsonResponse);
    return jsonResponse.data;
  });

  console.log("response in fetchExpenses", noteList);
  return noteList;
};

// Function to create an expense in the backend. Method: POST
export const updateNote = async (token: string, note: Note): Promise<Note> => {
    const response = await fetch(`${API_BASE_URL}/notes/${note.note_id}`, {
      method: "PUT",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    });
    if (!response.ok) {
      throw new Error("Failed to update note");
    }
    return response.json();
  };
