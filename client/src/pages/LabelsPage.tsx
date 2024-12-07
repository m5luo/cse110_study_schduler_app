import React, { useState } from "react";
import "../style/LabelsPage.css";
import Navbar from "./Navbar";

// Created the Labels page of our app, making a simple, functional UI  

interface Label {
  id: number;
  name: string;
}

const LabelsPage: React.FC = () => {
  const [labels, setLabels] = useState<Label[]>([]);
  const [newLabelName, setNewLabelName] = useState("");
  const [selectedLabel, setSelectedLabel] = useState<Label | null>(null);

  // Add a new label
  const addLabel = () => {
    if (newLabelName.trim() === "") return;
    const newLabel = { id: Date.now(), name: newLabelName };
    setLabels([...labels, newLabel]);
    setNewLabelName("");
  };

  // Delete a label
  const deleteLabel = (id: number) => {
    setLabels(labels.filter((label) => label.id !== id));
    if (selectedLabel?.id === id) setSelectedLabel(null);
  };

  return (
    <div className="labelsPage">
      <Navbar />
      <div className="labelsPageContainer">
        {/* Sidebar for labels */}
        <div className="sidebar">
          <div className="sidebarHeader">Labels</div>
          <div className="labelList">
            {labels.map((label) => (
              <div
                key={label.id}
                className={`labelItem ${
                  selectedLabel?.id === label.id ? "selected" : ""
                }`}
                onClick={() => setSelectedLabel(label)}
              >
                {label.name}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteLabel(label.id);
                  }}
                  className="deleteLabelButton"
                >
                  ×
                </button>
              </div>
            ))}
            <div className="addLabel">
              <input
                type="text"
                value={newLabelName}
                onChange={(e) => setNewLabelName(e.target.value)}
                placeholder="Add a new label"
                className="newLabelInput"
              />
              <button onClick={addLabel} className="addButton">
                +
              </button>
            </div>
          </div>
        </div>

        {/* Main content for notes */}
        <div className="mainContent">
          {selectedLabel ? (
            <div className="selectedLabelContent">
              <h2>{selectedLabel.name}</h2>
              <p>No notes yet.</p>
              <button className="addNoteButton">
                Add Note to {selectedLabel.name}
              </button>
            </div>
          ) : (
            <div className="noLabelSelected">
              <h2>Select a label to view or add notes</h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LabelsPage;