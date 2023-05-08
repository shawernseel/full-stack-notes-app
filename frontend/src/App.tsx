import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { Note as NoteModel } from './models/note';
import Note from './components/Note';
import styles from "./styles/NotesPage.module.css";

function App() {
  // [currState, funct to update val]
  // use state returns array with these vals that we destruct
  //const [clickCount, setClickCount] = useState(0); //typescript inferse type is number from init
  const [notes, setNotes] = useState<NoteModel[]>([]); //have to tell typescript type that it will be// [] init with empty array

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
    <Container> {/* bootstrap adds padding */}
      <Row xs={1} md={2} xl={3} className="g-4"> {/* g-4 predfined room */}
        {/* {JSON.stringify(notes) */}
        {notes.map(note => ( //for eac note object in array
          //we get note from note //we need a key for react
          <Col key={note._id}>
            <Note note={note} className={styles.note}/>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default App;
