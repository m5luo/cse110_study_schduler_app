import React, { useState } from "react";
import LabelCard from "./labelCard";
import "./notesPage.css";

const NotesPage: React.FC = () => {
  // Mock data
  const [labels, setLabels] = useState([
    { id: 1, name: "CSE 103", count: 12 },
    { id: 2, name: "CSE 110", count: 18 },
    { id: 3, name: "HIGL 127", count: 16 },
    { id: 4, name: "PSYC 101", count: 14 },
  ]);

  const addNewLabel = () => {
    const newLabel = { id: labels.length + 1, name: `New Label ${labels.length + 1}`, count: 0 };
    setLabels([...labels, newLabel]);
  };

  return (
    <div className="notes-page">
      <header className="notes-header">
        <h1>Home - Notes</h1>
        <div className="tabs">
          <span className="tab">Calendar</span>
          <span className="tab active">Notes</span>
        </div>
      </header>

      <div className="notes-content">
        <aside className="labels-section">
          <div className="search-bar">
            <input type="text" placeholder="Search" />
            <button>Cancel</button>
          </div>

          {labels.map((label) => (
            <LabelCard key={label.id} label={label} />
          ))}

          <div className="add-label" onClick={addNewLabel}>
            <span>Add a new label</span>
            <button>+</button>
          </div>
        </aside>

        <main className="notes-preview">
          <div className="search-bar">
            <input type="text" placeholder="Search notes" />
            <button>Cancel</button>
          </div>

          <div className="note-example">
            <div className="note-preview">
              <p>Note Preview Title</p>
              <p>Note Preview Content</p>
            </div>
            <div className="note-title">
              <span>Example note title</span>
              <div className="note-label">CSE 110</div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default NotesPage;
