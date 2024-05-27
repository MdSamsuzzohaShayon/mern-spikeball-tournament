import React from 'react';
import { IEvent, IParticipant } from '../../types';
import { formattedDate } from '../../utils/helpers';
import { Link } from 'react-router-dom';
import { hostname } from '../../utils/global';


interface IEventRowProps {
    event: IEvent;
    pageFor: string;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
    updateList: (boolean) => void;
}

function EventRow({ event, pageFor, setIsLoading, updateList }: IEventRowProps) {


    // ⛏️⛏️ DELETE AN EVENT 
    const deleteEvent = async (e, id) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            const token = localStorage.getItem("token");
            const response = await fetch(`${hostname}/api/event/${id}`, { method: "DELETE", headers: { "authorization": `bearer ${token}` } });
            updateList(true);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }

    }


    return (
        <tr >
            <th className='text-capitalize'>{event.title}</th>
            <td>{formattedDate(event.date)}</td>
            <td>{pageFor !== "home"
                ? <Link to={`/admin/dashboard/event/${event._id}`} className='text-white btn btn-primary'>Edit Details</Link>
                : <Link to={`/event/${event._id}`} className="btn btn-primary">View Details</Link>}</td>
            {pageFor !== "home" && <td><button className="btn btn-danger" onClick={e => deleteEvent(e, event._id)} >Delete</button></td>}
        </tr>
    )
}

export default EventRow;