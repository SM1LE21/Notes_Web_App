import { useEffect, useState } from "react";
import { v4 as uuid } from 'uuid';
import "./App.css";
import Main from "./components/Main";
import SidebarNotes from "./components/SidebarNotes";

function App() {
  //Notes 
  const [notes, setNotes] = useState(
    localStorage.notes ? JSON.parse(localStorage.notes) : []
  );

  //The current Active Note that should be displayed in Main
  const [activeNote, setActiveNote] = useState(false);

  //useEffect hook to save the stringified notes in the localStorage
  useEffect(() => {
    // Convert the data to a JSON string
    const dataString = JSON.stringify(notes);
    //save local storage of browser 
    localStorage.setItem("notes", dataString);
  }, [notes]);

  //ADD Note 
  const onAddNote = () => {
    const newNote = {
      //we use uuid to give eacht node an individual ID
      id: uuid(),
      title: "Untitled Note",
      body: "",
      lastModified: Date.now(),
    };

    //We update our notes. We take the new notes and add it together with the rest of the notes with the SetNotes method. 
    setNotes([newNote, ...notes]);
    //set this note as active note
    setActiveNote(newNote.id);
  };

  //Loop through each item in the array. Only where it is true we still want to keep in the array. So we simply get rid of the current id
  const onDeleteNote = (noteId) => {
    setNotes(notes.filter(({ id }) => id !== noteId));
  };

  //gets note from Main.jsx and updates the note  
  //For each note we check if the current note id is equal to the note we are editing. 
  //If that is true we update it with our new object
  const onUpdateNote = (updatedNote) => {
    const updatedNotesArr = notes.map((note) => {
      if (note.id === updatedNote.id) {
        return updatedNote;
      }

      return note;
    });

    setNotes(updatedNotesArr);
  };

  //Get the current active note by searching the ID of the current active note
  const getActiveNote = () => {
    return notes.find(({ id }) => id === activeNote);
  };

  //The actual output of the App.jsx file
  return (
    <div className="App">
      <SidebarNotes
        notes={notes}
        onAddNote={onAddNote}
        onDeleteNote={onDeleteNote}
        activeNote={activeNote}
        setActiveNote={setActiveNote}
      />
      <Main activeNote={getActiveNote()} onUpdateNote={onUpdateNote} />
    </div>
  );
}

export default App;