import React, { useState, useEffect } from 'react';
import { hostname } from '../../utils/global';


const Events = (props) => {
    const [eventList, setEventList] = useState([]);


    // ⛏️⛏️ FETCH ALL EVENTS ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖ 
    const getAllEvents = async () => {
        try {
            const response = await fetch(`${hostname}/api/admin/dashboard/event`, { method: "GET", credentials: "include" });
            const text = await response.text();
            const jsonResponse = await JSON.parse(text);
            setEventList(jsonResponse.events);
            // console.log("JSON - ", jsonResponse.events);
            // console.log(eventList);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getAllEvents();
    }, [eventList.length]);




    // ⛏️⛏️ GET ALL  PARTICIPANT AND SET VALUE TO PARENT COMPONENT ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖ 
    const getParticipants = async (e, id) => {
        e.preventDefault();
        try {            
            // console.log(id);
            // console.log(participants);
            const response = await fetch(`${hostname}/api/admin/dashboard/event/${id}`, { method: "GET", credentials: "include" });
            const text = await response.text();
            const jsonResponse = await JSON.parse(text);
            // https://stackoverflow.com/questions/35537229/how-can-i-update-the-parents-state-in-react
            props.getSingleEvent(jsonResponse.events);
            // console.log(props.singleEvent());

        } catch (error) {
            console.log(error);
        }
    }



    // ⛏️⛏️ GET ALL  PARTICIPANT AND SET VALUE TO PARENT COMPONENT ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖ 
    const deleteEvent= async (e, id)=>{
        e.preventDefault();
        // API NOT MADE YET 
        console.log("Delete event - ", id);
    }

    return (
        <div className="Events ml-2">
            <h2 className="h2">All Events</h2>
            <table className="table">
                <thead className="bg-dark text-light">
                    <tr>
                        <th scope="col">Title</th>
                        <th scope="col">Date</th>
                        <th scope="col">Participants</th>
                        <th scope="col">Handle</th>
                    </tr>
                </thead>
                <tbody>

                    {eventList.map((event, index) => (
                        <tr key={index}>
                            <th >{event.title}</th>
                            <td>{ new Date(event.date).getFullYear()+'-' + (new Date(event.date).getMonth()+1) + '-'+ new Date(event.date).getDate()}</td>
                            <td><button className="btn btn-primary" onClick={e => getParticipants(e, event._id)} >Participants</button></td>
                            <td><button className="btn btn-danger" onClick={e => deleteEvent(e, event._id)} >Delete</button></td>
                        </tr>)
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default Events;
