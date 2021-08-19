import React, { useState } from 'react';
import { hostname } from '../../utils/global';
import { Button, Modal } from "react-bootstrap"

const Participants = (props) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    const [csvShow, setCsvShow] = useState(false);
    const handleCsvClose = () => setCsvShow(false);
    const handleCsvShow = () => setCsvShow(true);

    const [participant, setPartitipant] = useState({ eventID: props.event._id, firstname: "", lastname: "", email: "", cell: "", birthday: "", city: "" });
    const [selectedFile, setSelectedFile] = useState(null);



    // ⛏️⛏️ ADD A PARTICIPANT ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖ 
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
        setShow(false);
    };







    // ⛏️⛏️GETTING INPUT VALUE ON CHANGING ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖ 
    function handleChange(evt) {
        setPartitipant({
            ...participant,
            [evt.target.name]: evt.target.value
        });
    }

    // ⛏️⛏️DELETE PARTICIPANT ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖ 
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


    function handleCsvChange(e) {
        e.preventDefault();
        // console.log("E - ",  e.target.files[0]);
        setSelectedFile(e.target.files[0]);
    }

    async function submitCsvUpload(e) {
        e.preventDefault();
        // console.log(participant);
        try {
            const formData = new FormData();
            formData.append('eventID', props.event._id);
            formData.append('file', selectedFile);
            for (let k of formData.entries()){
                console.log(k);
            }
            // http://localhost:4000/api/admin/dashboard/participant
            const response = await fetch(`${hostname}/api/admin/dashboard/many-participant`, {
                method: "POST",
                credentials: 'include',
                body: formData
            });
            console.log(response);
        } catch (error) {
            console.log(error);
        }
        setCsvShow(false);
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
                                <td>{p.firstname + " " + p.lastname}</td>
                                <td>{p.city}</td>
                                <td><button className="btn btn-danger" onClick={e => deleteParticipant(e, p._id)}>Delete</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>


                <div className="upload-single-participant">
                    <h3 className="h3">Add participants for this events</h3>

                    <Button variant="primary" onClick={handleShow}>
                        Add participants
                    </Button>

                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>{props.event.title}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {/* // firstname,lastname,email,cell,birthdate,city, eventID */}
                            <form>
                                <div className="form-group">
                                    <label htmlFor="firstname">First Name</label>
                                    <input type="text" className="form-control" id="firstname" name="firstname" onChange={handleChange} placeholder="Enter Your First name" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="lastname">Last Name</label>
                                    <input type="text" className="form-control" id="lastname" name="lastname" onChange={handleChange} placeholder="Enter Your Last Name" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="firstname">Email</label>
                                    <input type="email" className="form-control" id="email" name="email" onChange={handleChange} placeholder="Enter Your Email" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="cell">Phone</label>
                                    <input type="text" className="form-control" id="cell" name="cell" onChange={handleChange} placeholder="Enter Your Phone Number" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="birthdate">Birthdate</label>
                                    <input type="date" className="form-control" id="birthdate" name="birthdate" onChange={handleChange} placeholder="Enter Your Birthdate" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="city">City</label>
                                    <input type="text" className="form-control" id="city" name="city" onChange={handleChange} placeholder="Enter Your City" />
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
                <div className="upload-multiple-participant">
                    <h3 className="h3">Add participants From CSV</h3>

                    <Button variant="primary" onClick={handleCsvShow}>
                        Add CSV
                    </Button>

                    <Modal show={csvShow} onHide={handleCsvClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>{props.event.title}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {/* // firstname,lastname,email,cell,birthdate,city, eventID */}
                            <form>
                                <div className="form-group">
                                    <label htmlFor="firstname">Upload CSV File</label>
                                    <input type="file" className="form-control" id="csvFile" name="csv-file" onChange={handleCsvChange} />
                                </div>
                                <div className="form-group d-none">
                                    <input type="text" className="form-control" id="csvFileEventID" value={props.event._id} readOnly name="eventID" />
                                </div>
                            </form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleCsvClose}>
                                Close
                            </Button>
                            <Button variant="primary" onClick={submitCsvUpload}  >
                                Save Changes
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </div>
        );
    } else {
        return (
            <div className="Participants">No Participants</div>
        );
    }
}

export default Participants;
