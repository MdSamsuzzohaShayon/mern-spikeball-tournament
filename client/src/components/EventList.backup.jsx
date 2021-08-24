import React, {useState} from 'react';

function EventList(props) {

    // const [isAuthenticated, setIsAuthenticated] = useState(false);
    const handleEventID=(e, eventID)=>{
        console.log("id - ", eventID);
    }
    
    const deleteEvent=(e, eventID)=>{
        console.log("id - ", eventID);
    }

    return (
        <div className="EventList">
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
                            <td >{event.title}</td>
                            <td>{new Date(event.date).getFullYear() + '-' + (new Date(event.date).getMonth() + 1) + '-' + new Date(event.date).getDate()}</td>
                            <td><button className="btn btn-primary" onClick={e => handleEventID(e, event._id)} >View Details</button></td>
                            {props.isAuthenticated && <td><button className="btn btn-danger" onClick={e => deleteEvent(e, event._id)} >Delete</button></td>}
                        </tr>)
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default EventList;
