import React, { useState, useEffect } from 'react';
import { hostname } from '../utils/global';
import { Modal, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';


const EventList = (props) => {

    const [show, setShow] = useState(false);
    const [event, setEvent] = useState({});

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // http://localhost:4000/api/admin/dashboard/participant
            const response = await fetch(`${hostname}/api/admin/dashboard/event`, {
                method: "POST",
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(event)
            });
            console.log("Create Event - ", response);
            props.updateList(true);
        } catch (error) {
            console.log(error);
        }
        setShow(false);
        console.log(event);
    }


    const handleChange = (e) => {
        setEvent({
            ...event,
            [e.target.name]: e.target.value
        });
    }





    // ⛏️⛏️ DELETE AN EVENT ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖ 
    const deleteEvent = async (e, id) => {
        e.preventDefault();
        try {
            const response = await fetch(`${hostname}/api/admin/dashboard/event/${id}`, { method: "DELETE", credentials: "include" });
            props.updateList(true);
            console.log("Delete event - ", response);
        } catch (error) {
            console.log(error);
        }

    }








    return (
        <div className="EventList ml-2">
            <h2 className="h2">All EventList</h2>
            {props.isAuthenticated && (
                <div className="create-new-event mb-2">
                    <Button variant="primary" onClick={handleShow}>  Create new event</Button>
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>New Event</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <form>
                                <div className="form-group">
                                    <label htmlFor="title">Title</label>
                                    <input type="text" className="form-control" id="title" name="title" onChange={handleChange} placeholder="Enter title" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="date">Date</label>
                                    <input type="date" className="form-control" id="date" name="date" onChange={handleChange} />
                                </div>
                            </form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button variant="primary" onClick={handleSubmit}>
                                Save Changes
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            )}

            {props.isLoading ? (
                <div className="spinner-border text-danger text-center" role="status">
                </div>
            ) : (
                <table className="table">
                    <thead className="bg-dark text-light">
                        <tr>
                            <th scope="col">Title</th>
                            <th scope="col">Date</th>
                            <th scope="col">Details</th>
                            {props.isAuthenticated && <th scope="col">Handle</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {props.eventList.map((event, index) => (
                            <tr key={index}>
                                <th >{event.title}</th>
                                <td>{new Date(event.date).getFullYear() + '-' + (new Date(event.date).getMonth() + 1) + '-' + new Date(event.date).getDate()}</td>
                                <td>{props.isAuthenticated ? <Link to={`/admin/dashboard/event/${event._id}`} className='text-white btn btn-primary'>View Details</Link> : <button className="btn btn-primary">View Details Public</button>}</td>
                                {props.isAuthenticated && <td><button className="btn btn-danger" onClick={e => deleteEvent(e, event._id)} >Delete</button></td>}
                            </tr>)
                        )}
                    </tbody>
                </table>

            )}
        </div>
    )
}

export default EventList;