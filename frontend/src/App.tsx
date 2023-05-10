import React, { useEffect, useState } from 'react';
//import logo from './logo.svg';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { Note as NoteModel } from './models/note';
import Note from './components/Note';
import styles from "./styles/NotesPage.module.css";
import styleUtils from "./styles/utils.module.css";
import * as NotesApi from "./network/notes_api"; //hides functs
import AddEditNoteDialog from './components/AddEditNoteDialog';
import { FaPlus } from "react-icons/fa";

function App() {
  // [currState, funct to update val]
  // use state returns array with these vals that we destruct to state and updatestate
  //const [clickCount, setClickCount] = useState(0); //typescript inferse type is number from init
  const [notes, setNotes] = useState<NoteModel[]>([]); //have to tell typescript type that it will be// [] init with empty array

  const [showAddNoteDialog, setShowAddNoteDialog] = useState(false);
  const [noteToEdit, setNoteToEdit] = useState<NoteModel | null>(null);

  //excecute side effects that don't update everytime
  useEffect(() => { //cannot be async so we put async in wrapper funct
    async function loadNotes() {
      try {
        //const response = await fetch("/api/notes", { method: "GET" }); //GET request
        //const notes = await response.json(); //json since backend sends a json
        const notes = await NotesApi.fetchNotes();
        setNotes(notes);
      } catch (error) {
        console.error(error);
        alert(error);
      }
    }
    loadNotes();
  }, []);//, [] makes it so that it only runs on initial render: -2nd arg monitors val so that change in val = update

  async function deleteNote(note: NoteModel) {
    try {
      await NotesApi.deleteNote(note._id);
      setNotes(notes.filter(existingNote => existingNote._id !== note._id));
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }

  return (
    <Container> {/* bootstrap adds padding */}
      <Button
        className={`mb-4 ${styleUtils.blockCenter} ${styleUtils.flexCenter}`}
        onClick={() => setShowAddNoteDialog(true)}>
        <FaPlus />
        Add new note
      </Button>
      <Row xs={1} md={2} xl={3} className="g-4"> {/* g-4 predfined room */}
        {/* {JSON.stringify(notes) */}
        {notes.map(note => ( //for eac note object in array
          //we get note from note //we need a key for react
          <Col key={note._id}>
            <Note
              note={note}
              className={styles.note}
              onNoteClicked={setNoteToEdit} //equivalent to (note) => setNoteToEdit(note)
              onDeleteNoteClicked={deleteNote} //deleteNote is a callback func
            />
          </Col>
        ))}
      </Row>
      {showAddNoteDialog && //conditional, will only draw if showAddNoteDialog is True
        //^ could have passed as property and it persists after we close dialog, but we want to clear dialog on close
        <AddEditNoteDialog
          onDismiss={() => setShowAddNoteDialog(false)}
          onNoteSaved={(newNote) => {
            setNotes([...notes, newNote]); //adds existing + new //is a usestate so rerender newNote
            setShowAddNoteDialog(false);
          }}
        />
      }
      {noteToEdit &&
        <AddEditNoteDialog
          noteToEdit={noteToEdit}
          onDismiss={() => setNoteToEdit(null)}
          onNoteSaved={(updatedNote) => {
            setNotes(notes.map(existingNote => existingNote._id === updatedNote._id ? updatedNote : existingNote));
            setNoteToEdit(null);
          }}
        />
      }
    </Container>
  );
}

export default App;
