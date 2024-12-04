// src/utils/todo-utils
import { API_BASE_URL } from "../constants";
import { Todo } from "../types/types";

// Fetch the list of todos
export const getTodos = async (token: string) => {
  const response = await fetch(`${API_BASE_URL}/todolist`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch todos");
  }

  const result = await response.json();
  console.log("Fetched todos:", result); // Log the result to check the structure
  return result.data;
};

// Create a new todo
export const createTodo = async (token: string, todo: Todo): Promise<Todo> => {
  const response = await fetch(`${API_BASE_URL}/todolist`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  });

  if (!response.ok) {
    throw new Error("Failed to create todo");
  }
  return response.json();
};

// Update an existing todo
export const updateTodo = async (token: string, id: any, completed: any) => {
  console.log("Sending Update Request:", { id, completed });
  const response = await fetch(`${API_BASE_URL}/todolist/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ completed }),
  });

  if (!response.ok) {
    throw new Error("Failed to update todo");
  }

  const data = await response.json();
  console.log("Todo updated:", data);
  return data;
};

// Delete a todo
export const deleteTodo = async (token: string, id: any) => {
  const response = await fetch(`${API_BASE_URL}/todolist/${id}`, {
    method: "DELETE", // Using DELETE method
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to delete todo");
  }

  const data = await response.json();
  console.log("Todo deleted:", data);
  return data;
};
