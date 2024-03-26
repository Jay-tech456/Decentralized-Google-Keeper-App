import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Note from "./components/Note";
import CreateArea from "./components/CreateArea";
import {can_backend} from "../../declarations/can_backend";

function App() {
  const [notes, setNotes] = useState([]);

  function addNote(newNote) {
    can_backend.createNote(newNote.title, newNote.content);
    setNotes(prevNotes => {
      return [...prevNotes, newNote];
    });
  }

  useEffect(() => { 

    console.log("Use Effect is triggered");
    fetchData(); 
  }, []); 


  async function fetchData(){ 
    const notesArray = await can_backend.readNotes(); 
    setNotes(notesArray); 
  }

  function deleteNote(id) {
    can_backend.removeNote(id); 
    setNotes(prevNotes => {
      return prevNotes.filter((noteItem, index) => {
        return index !== id;
      });
    });
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={index}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
