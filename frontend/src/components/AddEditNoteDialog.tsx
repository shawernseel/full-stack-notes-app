import { Button, Form, Modal } from "react-bootstrap";
import { Note } from "../models/note";
import { useForm } from "react-hook-form";
import { NoteInput } from "../network/notes_api";
import * as NotesApi from "../network/notes_api";

interface AddEditNoteDialogProps {
    noteToEdit?: Note,
    onDismiss: () => void, //callback
    onNoteSaved: (note: Note) => void, //callback when a note is saved: a function that does not return anything
}

const AddEditNoteDialog = ({ noteToEdit, onDismiss, onNoteSaved }: AddEditNoteDialogProps) => {
    //destructure, destructure again to get callbacks
    const { register, handleSubmit, formState : { errors, isSubmitting } } = useForm<NoteInput>({ //pass configuration
        defaultValues: {
            title: noteToEdit?.title || "", //field is blank if no noteToEdit
            text: noteToEdit?.text || "",
        }
    });

    async function onSubmit(input: NoteInput) { //type NoteInput
        try {
            let noteResponse: Note;
            if (noteToEdit) { //check if not undefined
                noteResponse = await NotesApi.updateNote(noteToEdit._id, input);
            } else {
                noteResponse = await NotesApi.createNote(input);
            }
            onNoteSaved(noteResponse); //call callback passing noteResponse (new note) to caller App.tsx
        } catch (error) {
            console.error(error); //logs error
            alert(error);
        }
    }

    return (
        <Modal show onHide={onDismiss /* () => onDismiss() */}> {/* hardcode show to true unless onHide (hoverover onHide for Modal description)*/}
            <Modal.Header closeButton>
                <Modal.Title>
                    {noteToEdit ? "Edit note" : "Add note"}
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form id="addEditNoteForm" onSubmit={handleSubmit(onSubmit) /*called at init */}>
                    <Form.Group className="mb-3">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Title" //adds text title in field
                            isInvalid={!!errors.title /* changes to bool */}
                            {...register("title", { required: "Required" }) 
                            /* destructs register into its single peices */
                            /* syntax for Required text field with no pop up */}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.title?.message}
                        </Form.Control.Feedback>

                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Text</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={5}
                            placeholder="Text"
                            {...register("text")}
                        />
                    </Form.Group>

                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button
                type="submit" //when clicked close
                form="addEditNoteForm"
                disabled={isSubmitting}
                >
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default AddEditNoteDialog;