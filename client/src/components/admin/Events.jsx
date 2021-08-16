import React, { useState, useEffect } from 'react';
import { hostname } from '../../utils/global';


const Events = (props) => {
    // ⛏️⛏️ GET ALL EVENTS WITH DETAILS ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖ 
    const getSingleEvent = async (e, id)=>{
        e.preventDefault();
        try {            
            // console.log(id);
            // console.log(participants);
            const response = await fetch(`${hostname}/api/admin/dashboard/event/${id}`, { method: "GET", credentials: "include" });
            const text = await response.text();
            const jsonResponse = await JSON.parse(text);
            // console.log(jsonResponse);
            props.selectedEvent(jsonResponse)
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
                        <th scope="col">Details</th>
                        <th scope="col">Handle</th>
                    </tr>
                </thead>
                <tbody>

                    {props.eventList.map((event, index) => (
                        <tr key={index}>
                            <th >{event.title}</th>
                            <td>{ new Date(event.date).getFullYear()+'-' + (new Date(event.date).getMonth()+1) + '-'+ new Date(event.date).getDate()}</td>
                            <td><button className="btn btn-primary" onClick={e => getSingleEvent(e, event._id)} >View Details</button></td>
                            <td><button className="btn btn-danger" onClick={e => deleteEvent(e, event._id)} >Delete</button></td>
                        </tr>)
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default Events;
