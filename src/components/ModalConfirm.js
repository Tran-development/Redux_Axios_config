
import { Button, Modal } from 'react-bootstrap';
import { deleteUser } from '../services/UserService'
import { toast } from 'react-toastify';

const ModalConfirm = (props) => {

    const { show, handleClose, dataUserDelete, handleDeleteUserFromModal } = props


    const confirmDelete = async (id) => {
        const res = await deleteUser(dataUserDelete.id)
        // dung dau + o day. Vi de neu no la string thi convert sang number de so sanh k loi
        if (res && +res.statusCode === 204) {
            toast.success("delete user is succeed!")
            handleClose(true)
            handleDeleteUserFromModal(dataUserDelete)
        } else {
            toast.error("Failed, let try again!")
        }
        console.log("check res: ", res);
    }

    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Delete a user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="body-add-new">                       
                        Are you sure delete this user ? email = ${dataUserDelete.email}
                    </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={() => confirmDelete()}>
                    Confirm
                </Button>
            </Modal.Footer>
        </Modal >
        </>
    )
}

export default ModalConfirm