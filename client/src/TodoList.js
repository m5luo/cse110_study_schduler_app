// src/TodoList.js
import React, { useState } from 'react';
import './TodoList.css';

const TodoList = ({ isOpen, onClose }) => {
  const [todos, setTodos] = useState([
    { id: 1, text: 'ITEM 1', completed: false },
    { id: 2, text: 'ITEM 2', completed: false },
    { id: 3, text: 'ITEM 3', completed: false },
  ]);
  const [newTodo, setNewTodo] = useState('');

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }]);
      setNewTodo('');
    }
  };

  const handleToggle = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const handleDelete = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
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
              {todo.text}
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