import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

const ModalElement = (props) => {

    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);
        
    };
    const handleShow = () => {
        setShow(true);
    };

    return (
        <div className='ModalElement'>
            <Button variant={props.btnColor} onClick={handleShow}>
                {props.openBtn}
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{props.modalTitle}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{props.modalBody}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        {props.failureBtn}
                    </Button>
                    <Button variant="primary" onClick={props.successModal}>
                        {props.successBtn}
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default ModalElement;
