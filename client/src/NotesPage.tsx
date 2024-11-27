import React, { useState, useEffect, useRef } from "react";
import profileIcon from "./images/profile-icon.jpg";
import "./NotesPage.css";
import { useLocation } from "react-router-dom";

interface Note {
  id: number;
  title: string;
  content: string;
}

const NotesPage: React.FC = () => {
  const location = useLocation(); // Access the passed label name of notes
  const labelName = location.state?.labelName || "Default Label";
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  /* Variables for managing notes and sidebar. */
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [currentTitle, setCurrentTitle] = useState("");
  const [currentContent, setCurrentContent] = useState("");

  /* Variables for popups and their positioning. */
  const [showOptionsPopup, setShowOptionsPopup] = useState<number | null>(null);
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });
  const [showRenamePopup, setShowRenamePopup] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [newTitle, setNewTitle] = useState("");

  /* Ref for handling clicking outside popups to close them. */
  const popupRef = useRef<HTMLDivElement | null>(null);

  /* Close the options popup when clicking outside it. */
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        setShowOptionsPopup(null);
      }
    };

    if (showOptionsPopup !== null) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showOptionsPopup]);

  /* Toggle the sidebar's open/close state. */
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  /* Create a new note with a default title and content. */
  const createNewNote = () => {
    const newNote: Note = {
      id: Date.now(),
      title: "Untitled Note",
      content: "",
    };
    setNotes([...notes, newNote]);
    setSelectedNote(newNote);
    setCurrentTitle("Untitled Note");
    setCurrentContent("");
  };

   /* Select a specific note and load its title and content into the editor. */
  const selectNote = (note: Note) => {
    setSelectedNote(note);
    setCurrentTitle(note.title);
    setCurrentContent(note.content);
  };

  /* Save the changes made to the selected note. */
  const handleSave = () => {
    if (selectedNote) {
      const updatedNotes = notes.map((note) =>
        note.id === selectedNote.id
          ? { ...note, title: currentTitle, content: currentContent }
          : note
      );
      setNotes(updatedNotes);
      setSelectedNote({ ...selectedNote, title: currentTitle, content: currentContent });
      alert("Note saved successfully!");
    }
  };

  /* Open the rename/delete popup for a specific note and position it next to the button. */
  const handleOptionsClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    noteId: number
  ) => {
    e.stopPropagation();
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    setPopupPosition({
      top: rect.top + window.scrollY,
      left: rect.left + window.scrollX + 30,
    });
    setShowOptionsPopup(noteId);
  };

  /* Rename the selected note with the title entered in the Rename popup. */
  const handleRename = () => {
    if (selectedNote && newTitle.trim()) {
      const updatedNotes = notes.map((note) =>
        note.id === selectedNote.id ? { ...note, title: newTitle } : note
      );
      setNotes(updatedNotes);
      setSelectedNote({ ...selectedNote, title: newTitle });
      setShowRenamePopup(false);
    }
  };

  /* Delete the selected note and reset the editor state. */
  const handleDelete = () => {
    if (selectedNote) {
      const updatedNotes = notes.filter((note) => note.id !== selectedNote.id);
      setNotes(updatedNotes);
      setSelectedNote(null);
      setCurrentTitle("");
      setCurrentContent("");
      setShowDeletePopup(false);
    }
  };

  return (
    <div className="notesPageContainer">
      <div className="mainContent">
        {/* Top Navigation Bar with calendar and notes tab */}
        <div className="topNav">
          {isSidebarOpen ? (
            <button onClick={toggleSidebar} className="sidebarToggle">
              &larr;
            </button>
          ) : (
            <button onClick={toggleSidebar} className="sidebarToggle">
              &rarr;
            </button>
          )}
          <div className="tabs">
            <button className="tab">Calendar</button>
            <button className="tab activeTab">Notes</button>
          </div>
          <div className="rightControls">
          <img src={profileIcon} alt="Profile" className="profileIcon" />
            <button
              className="saveButton"
              onClick={handleSave}
              disabled={!selectedNote}
            >
              SAVE
            </button>
          </div>
        </div>

        {/* Main Editor Area */}
        <div className="editorContainer">
          {/* Sidebar */}
          {isSidebarOpen && (
            <div className="sidebar">
            <div className="sidebarHeader">
              <span className="labelTitle">{labelName}</span>
            </div>
              <div className="noteList">
                {notes.map((note) => (
                  <div
                    key={note.id}
                    className={`noteItem ${
                      selectedNote?.id === note.id ? "selected" : ""
                    }`}
                    onClick={() => selectNote(note)}
                  >
                    <span className="noteTitle">{note.title}</span>
                    <button
                      className="optionsButton"
                      onClick={(e) => handleOptionsClick(e, note.id)}
                    ></button>
                    {showOptionsPopup === note.id && (
                      <div
                        className="optionsPopup"
                        ref={popupRef}
                        style={{
                          top: popupPosition.top,
                          left: popupPosition.left,
                        }}
                      >
                        <button
                          onClick={() => {
                            setShowRenamePopup(true);
                            setShowOptionsPopup(null);
                          }}
                          className="renameButton"
                        >
                          Rename
                        </button>
                        <button
                          onClick={() => {
                            setShowDeletePopup(true);
                            setShowOptionsPopup(null);
                          }}
                          className="deleteButton"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <button className="newNoteButton" onClick={createNewNote}>
                New note <span className="plusIcon">+</span>
              </button>
            </div>
          )}

          {/* Editor */}
          <div className="editor">
            <input
              type="text"
              className="titleInput"
              placeholder="Title"
              value={currentTitle}
              onChange={(e) => setCurrentTitle(e.target.value)}
              disabled={!selectedNote}
            />
            <textarea
              className="noteContent"
              placeholder="(Content - can start typing here)"
              value={currentContent}
              onChange={(e) => setCurrentContent(e.target.value)}
              disabled={!selectedNote}
            ></textarea>
          </div>
        </div>
      </div>

      {/* Rename Popup */}
      {showRenamePopup && (
        <div className="popupOverlay" onClick={() => setShowRenamePopup(false)}>
          <div
            className="popupContent"
            onClick={(e) => e.stopPropagation()}
          >
            <h3>Enter new name:</h3>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="popupInput"
            />
            <div className="popupButtons">
              <button
                onClick={() => setShowRenamePopup(false)}
                className="cancelButton"
              >
                Cancel
              </button>
              <button onClick={handleRename} className="confirmButton">
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Popup */}
      {showDeletePopup && (
        <div className="popupOverlay" onClick={() => setShowDeletePopup(false)}>
          <div
            className="popupContent"
            onClick={(e) => e.stopPropagation()}
          >
            <h3>Are you sure you want to delete this note?</h3>
            <div className="popupButtons">
              <button
                onClick={() => setShowDeletePopup(false)}
                className="cancelButton"
              >
                Cancel
              </button>
              <button onClick={handleDelete} className="deleteConfirmButton">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotesPage;
