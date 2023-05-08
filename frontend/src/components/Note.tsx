import styles from "../styles/note.module.css";
import { Card } from "react-bootstrap";
import { Note as NoteModel } from "../models/note";
import { formateDate } from "../utils/formalDate";

//we need this for typescript
interface NoteProps {
    note: NoteModel,
    className?: string,
}

//when an argument changes, react updates compononent -acts like a usestate
const Note = ({ note, className }: NoteProps) => { //destructuring
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
        <Card className={`${styles.noteCard} ${className}`}> {/* backtick var as string */}
            <Card.Body className={styles.cardBody}>
                <Card.Title>
                    { title /*note.title*/}
                </Card.Title>
                <Card.Text className = {styles.cardText}>
                    { text }
                </Card.Text>
            </Card.Body>
            <Card.Footer className="text-muted">
                {createdUpdatedText}
            </Card.Footer>
        </Card>
    )
}

export default Note;