import { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { putUpdateUser } from '../services/UserService'
import { toast } from 'react-toastify';

const ModalEditNew = (props) => {

    const { show, handleClose, dataUserEdit, handleEditUserFormModal} = props
    const [name, setName] = useState('')
    const [job, setJob] = useState('')

    const handleEditUser = async () => {
        let res = await putUpdateUser(name, job)
        if (res && res.updatedAt) {
            // success 
            handleEditUserFormModal({
                first_name: name,
                id: dataUserEdit.id
            })

            handleClose()
            toast.success("Update user success!")
        }
    }

    useEffect(() => {
        if (show) {
            setName(dataUserEdit.first_name)
        }
    }, [dataUserEdit])

// console.log("check dataUserEdit", dataUserEdit);
    return (
        <>
            <Modal 
                show={show} 
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Edit a User</Modal.Title>
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
                <Button variant="primary" onClick={() => handleEditUser()}>
                    Confirm
                </Button>
            </Modal.Footer>
        </Modal >
        </>
    )
}

export default ModalEditNew