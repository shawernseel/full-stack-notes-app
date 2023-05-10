import { Modal } from "react-bootstrap";

interface AddNoteDialogProps {
    onDismiss: () => void,
}

const AddNoteDialog = ({onDismiss}: AddNoteDialogProps) => {
    return ( 
        <Modal show onHide={onDismiss /* () => onDismiss() */}> {/* hardcode show to true unless onHide*/}
            <Modal.Header closeButton>
                <Modal.Title>
                    Add Note
                </Modal.Title>
            </Modal.Header>
        </Modal>
     );
}
 
export default AddNoteDialog;