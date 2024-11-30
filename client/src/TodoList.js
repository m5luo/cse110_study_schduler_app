// src/TodoList.js
import React, { useEffect, useState } from 'react';
import './TodoList.css';
import { getTodos, createTodo, deleteTodo, updateTodo } from './todo-utils/todo-utils';

const TodoList = ({ isOpen, onClose }) => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  // fetch todolist items
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const todos = await getTodos(); // fetch todos from the backend
        console.log(todos);
        setTodos(todos);
      } catch (error) {
        console.error('Failed to fetch todos:', error);
      }
    };
    fetchTodos();
  }, []);

  // handle add new todo item
  const handleAddTodo = async () => {
    if (newTodo.trim()) {
      const newTodoItem = {
        id: Math.floor(Math.random() * 100).toString(),
        content: newTodo,
        completed: false,
      };
      try {
        const createdTodo = await createTodo(newTodoItem); // create todo in the backend
        const updatedTodo = await getTodos();
        setTodos(updatedTodo);
      } catch (error) {
        console.error('Failed to create todo:', error);
      }
    }
  };

  // handle todolist item checkbox
  const handleToggle = async (id) => {
    const updatedTodo = todos.find(todo => todo.id === id);  // Find the todo item by id
    const updatedCompleted = !updatedTodo.completed;  // Toggle the completed status
  
    try {
      await updateTodo(id, updatedCompleted);  // Call the updateTodo function
      setTodos(todos.map(todo =>
        todo.id === id ? { ...todo, completed: updatedCompleted } : todo  // Update the state
      ));
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  // handle deleting todolist item
  const handleDelete = async (id) => {
    try {
      await deleteTodo(id);  // Call the API to delete the todo
      setTodos(todos.filter(todo => todo.id !== id));  // Update the local state
    } catch (error) {
      console.error('Failed to delete todo:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="todo-sidebar">
      <div className="todo-header">
        <h2>WEEKLY TODO LIST 📋</h2>
        <button onClick={onClose} className="close-button">×</button>
      </div>

      <div className="todo-list">
        {todos.map(todo => (
          <div key={todo.id} className="todo-item">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleToggle(todo.id)}
              className="todo-checkbox"
            />
            <span className={todo.completed ? 'todo-text completed' : 'todo-text'}>
              {todo.content}
            </span>
            <button
              onClick={() => handleDelete(todo.id)}
              className="delete-todo-button"
            >
              🗑️
            </button>
          </div>
        ))}
      </div>

      <div className="new-todo-input">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="New Item"
          className="todo-input"
        />
        <button onClick={handleAddTodo} className="add-todo-button">
          +
        </button>
      </div>
    </div>
  );
};

export default TodoList;