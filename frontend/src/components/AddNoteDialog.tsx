import { Button, Form, Modal } from "react-bootstrap";

interface AddNoteDialogProps {
    onDismiss: () => void,
}

const AddNoteDialog = ({ onDismiss }: AddNoteDialogProps) => {
    return (
        <Modal show onHide={onDismiss /* () => onDismiss() */}> {/* hardcode show to true unless onHide (hoverover onHide for Modal description)*/}
            <Modal.Header closeButton>
                <Modal.Title>
                    Add Note
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form id="addNoteForm">
                    <Form.Group className="mb-3">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Title" //adds text title in field
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Text</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={5}
                            placeholder="Text"
                        />
                    </Form.Group>

                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button
                type="submit" //when clicked close
                form="addNoteForm"
                >
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default AddNoteDialog;