import React, { useState } from 'react';
import { hostname } from '../../utils/global';
import { Button, Modal } from "react-bootstrap"

const Participants = (props) => {
    const [show, setShow] = useState(false);
    const [participant, setPartitipant] = useState({eventID:props.event._id, address: "",name: ""});
    
    
    const handleClose = () => setShow(false);
    const handleSaveParticipant = async (e) => {
        e.preventDefault();
        try {
            // http://localhost:4000/api/admin/dashboard/participant
            const response = await fetch(`${hostname}/api/admin/dashboard/participant`, {
                method: "POST",
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(participant)
            });
            console.log(response);
        } catch (error) {
            console.log(error);
        }
        setShow(false)
    };
    const handleShow = () => setShow(true);



    function handleChange(evt) {
        setPartitipant({
          ...participant,
          [evt.target.name]: evt.target.value
        });
      }


    const deleteParticipant = async (e, id) => {
        e.preventDefault();
        try {
            // http://localhost:4000/api/admin/dashboard/participant
            const response = await fetch(`${hostname}/api/admin/dashboard/participant/${id}`, {
                method: "DELETE",
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if (response.status === 200) {
                console.log(response);
            }
        } catch (error) {
            console.log(error);
        }
    }







    if (props.participants) {
        return (
            <div className="Participants">
                <h2 className="h2">{props.event.title}</h2>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">SL</th>
                            <th scope="col">Name</th>
                            <th scope="col">Address</th>
                            <th scope="col">Handle</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.participants.map((p, i) => (
                            <tr key={i}>
                                <td >{i + 1}</td>
                                <td>{p.name}</td>
                                <td>{p.address}</td>
                                <td><button className="btn btn-danger" onClick={e => deleteParticipant(e, p._id)}>Delete</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <h3 className="h3">Add participants for this events</h3>

                <Button variant="primary" onClick={handleShow}>
                    Add participants
                </Button>

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>{props.event.title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form>
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input type="text" className="form-control" id="name" name="name" onChange={handleChange} placeholder="Enter name" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="address">Address</label>
                                <input type="text" className="form-control" id="address" name="address" onChange={handleChange} placeholder="Eddress" />
                            </div>
                            <div className="form-group d-none">
                                <input type="text" className="form-control" id="emailID" value={props.event._id} readOnly name="eventID" />
                            </div>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleSaveParticipant}  >
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    } else {
        return (
            <div className="Participants">No Participants</div>
        );
    }
}

export default Participants;
