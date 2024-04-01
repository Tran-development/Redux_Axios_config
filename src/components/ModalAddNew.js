import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { postCreateUser } from '../services/UserService'
import { toast } from 'react-toastify';

const ModalAddNew = (props) => {

    const { show, handleClose, handleUpdateTable } = props
    const [name, setName] = useState('')
    const [job, setJob] = useState('')

    const handleSaveUser = async () => {
        let res = await postCreateUser(name, job)
        if (res && res.id) {
            // success
            handleClose()
            setName('')
            setJob('')
            toast.success("Create a  new user is succeed!")
            handleUpdateTable({first_name: name, id: res.id})
        } else {
            toast.error("An error. Please check again!")
        }
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
                    <Modal.Title>Add New User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="body-add-new">                       
                            <div className="mb-3">
                                <label className='form-label'>Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter your name" 
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}    
                                />
                            </div>
                            <div className="mb-3">
                                <label className='form-label'>Job</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Your job" 
                                    value={job}
                                    onChange={(e) => setJob(e.target.value)} 
                                />
                            </div>  
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={() => handleSaveUser()}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal >
        </>
    )
}

export default ModalAddNew