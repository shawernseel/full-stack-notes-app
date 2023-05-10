import styles from "../styles/note.module.css";
import styleUtils from "../styles/utils.module.css";
import { Card } from "react-bootstrap";
import { Note as NoteModel } from "../models/note";
import { formateDate } from "../utils/formalDate";
import { MdDelete } from "react-icons/md";

//we need this for typescript
interface NoteProps {
    note: NoteModel,
    onNoteClicked: (note: NoteModel) => void, //callback forwards note to caller
    onDeleteNoteClicked: (note: NoteModel) => void, //callback func
    className?: string,
}

//when an argument changes, react updates compononent -acts like a usestate
const Note = ({ note, onNoteClicked, onDeleteNoteClicked, className }: NoteProps) => { //destructuring
    const {
        title,
        text,
        createdAt,
        updatedAt
    } = note; //unpacking note
    //will update every render put is okay cause its cheap
    let createdUpdatedText: string;
    if (updatedAt > createdAt) {
        createdUpdatedText = "Updated: " + formateDate(updatedAt);
    } else {
        createdUpdatedText = "Created: " + formateDate(createdAt);
    }

    //return ui drawn on screen
    return (
        <Card
            className={`${styles.noteCard} ${className}`/* backtick var as string */}
            onClick={() => onNoteClicked(note)}
        >
            <Card.Body className={styles.cardBody}>
                <Card.Title className={styleUtils.flexCenter}>
                    {title /*note.title*/}
                    <MdDelete
                        className="text-muted ms-auto"
                        //onclick callback so we know what note was clicked
                        onClick={(e) => { //takes mouse event e
                            onDeleteNoteClicked(note);
                            e.stopPropagation(); //uses up click so other click call doesnt run
                        }}
                    />
                </Card.Title>
                <Card.Text className={styles.cardText}>
                    {text}
                </Card.Text>
            </Card.Body>
            <Card.Footer className="text-muted">
                {createdUpdatedText}
            </Card.Footer>
        </Card>
    )
}

export default Note;