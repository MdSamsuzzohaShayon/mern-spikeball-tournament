import React, { useState, useEffect } from 'react';
import { hostname } from '../../utils/global';
import { Modal, Button } from 'react-bootstrap';
// import { Link } from 'react-router-dom';
import Loader from '../elements/Loader';
// import {formattedDate} from '../../utils/helpers';
import EventRow from './EventRow';
import { handleRequestUnauthenticated } from '../../utils/auth';


const EventList = (props) => {

    const [show, setShow] = useState(false);
    const [event, setEvent] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    // ⛏️⛏️ CREATE AN EVENT 
    const createAnEvent = async () => {
        try {
            setIsLoading(true);
            const token = localStorage.getItem("token");
            // http://localhost:4000/api/admin/dashboard/participant
            const response = await fetch(`${hostname}/api/event`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `bearer ${token}`
                    
                },
                body: JSON.stringify(event)
            });
            handleRequestUnauthenticated(response);
            setEvent({});
            setShow(false);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
        }
        // console.log(event);
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        await createAnEvent();
        props.updateList(true);
    }
    const handleChange = (e) => {
        setEvent({
            ...event,
            [e.target.name]: e.target.value
        });
        // console.log(event);
    }

    const listenKeypress = async e => {
        // e.preventDefault();
        if (e.key === 'Enter' && !e.repeat) {
            console.log("Event - ", event);
            await createAnEvent();
            props.updateList(true);
        }
    }


    useEffect(() => {
        if (localStorage.getItem('token')) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }
    }, []);


    useEffect(() => {

        document.addEventListener('keydown', listenKeypress);
        return () => {
            document.removeEventListener('keydown', listenKeypress);
        }
    });

    return (
        <div className="EventList ml-2">
            <h2 className="h2">All EventList</h2>
            {isAuthenticated && (
                <div className="create-new-event mb-2 ">
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

            {props.isLoading || isLoading ? <Loader /> : (
                <table className="table">
                    <thead className="bg-dark text-light">
                        <tr>
                            <th scope="col">Title</th>
                            <th scope="col">Date</th>
                            <th scope="col">Details </th>
                            {isAuthenticated && props.pageFor !== 'home' && <th scope="col">Handle</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {props.eventList && props.eventList.map((pe, index) => (<EventRow key={index} event={pe} pageFor={props.pageFor} updateList={props.updateList} setIsLoading={setIsLoading} />)
                        )}
                    </tbody>
                </table>

            )}
        </div>
    )
}

export default EventList;
