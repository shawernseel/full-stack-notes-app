import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Button } from 'react-bootstrap';
import { Note } from './models/note';

function App() {
  // [currState, funct to update val]
  // use state returns array with these vals that we destruct
  //const [clickCount, setClickCount] = useState(0); //typescript inferse type is number from init
  const [notes, setNotes] = useState<Note[]>([]); //have to tell typescript type that it will be// [] init with empty array

  //excecute side effects that don't update everytime
  useEffect(() => { //cannot be async so we put async in wrapper funct
    async function loadNotes() {
      try {
        const response = await fetch("/api/notes", { method: "GET" }); //GET request
        const notes = await response.json(); //json since backend sends a json
        setNotes(notes);
      } catch (error) {
        console.error(error);
        alert(error);
      }
    }
    loadNotes();
  }, []);//, [] makes it so that it only runs on initial render: -2nd arg monitors val so that change in val = update


  return (
    <div className="App">
      {JSON.stringify(notes)}
    </div>
  );
}

export default App;
