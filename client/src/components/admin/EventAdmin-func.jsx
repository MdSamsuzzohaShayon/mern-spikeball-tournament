// import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import {useParams} from 'react-router-dom'
import { hostname } from '../../utils/global';
import Participants from '../participant/Participants';
import Rounds from '../round/Rounds';
import Score from "../score/Score";
import ExportField from '../export/ExportField';
import '../../style/EventAdmin.css';

function EventAdmin(props) {
    const params = useParams();
    let is_mounted = false;
    const [currentEventID, setCurrentEventID] = useState(null);
    const [activeTab, setActiveTab] = useState('event');
    const inintialEvent = { title: null, participants: [], Date: null };
    const [currentEvent, setCurrentEvent] = useState(inintialEvent);
    const [participants, setParticipants] = useState("");
    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {
        console.log("Event auth - ", props.isAuthenticated);
        // console.log("Event admin component mounted - ",this.props);
        // console.log("Event admin component mounted - ", this.props?.match?.params);
        // {this.state.currentEvent.title}
        is_mounted = true;
        setCurrentEventID(params.id);
        // await this.getSingleEvent(this.props.match.params.id);
        document.title = "Spikers Scramble - " + currentEvent.title;
        console.log(props);
    }, []);

    return(<div>
        ea
    </div>)

}
export default EventAdmin;

