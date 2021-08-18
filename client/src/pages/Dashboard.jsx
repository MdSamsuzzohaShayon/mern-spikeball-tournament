/* ⛏️⛏️ SHOW ALL EVENTS, PARTICIPANT  ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖  */

import React, { Component } from 'react';
import { hostname } from '../utils/global';
import Events from '../components/admin/Events';
import Participants from '../components/admin/Participants';
import Overview from '../components/admin/Overview';
import "./Dashboard.css";

export class Dashboard extends Component {
    constructor(props) {
        super(props);


        this.state = {
            activeTab: "events",
            currentEvent: null,
            participants: "",
            eventList: []
        };

        this.getSingleEvent = this.getSingleEvent.bind(this);
        this.getAllEvents = this.getAllEvents.bind(this);
    }




    // ⛏️⛏️ FETCH ALL EVENTS ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖ 
    async getAllEvents() {
        try {
            const response = await fetch(`${hostname}/api/admin/dashboard/event`, { method: "GET", credentials: "include" });
            const text = await response.text();
            const jsonResponse = await JSON.parse(text);
            console.log("JSON - ", jsonResponse);
            this.setState({
                eventList: jsonResponse.events
            });
            // console.log("JSON - ", jsonResponse.events);
        } catch (error) {
            console.log(error);
        }
    }
    componentDidMount() {
        this.getAllEvents();
    }
    
    componentDidUpdate(){
        this.getAllEvents();
    }


    




    getSingleEvent(event) {
        this.setState({ currentEvent: event });
    }









    render() {
        if (this.state.currentEvent) {
            return (
                <div className="Dashboard">
                    <Overview event={this.state.currentEvent} />
                </div>
            )
        } else {
            return (
                <div className="Dashboard">
                    <div className="container">
                        <Events selectedEvent={this.getSingleEvent} eventList={this.state.eventList} />
                    </div>
                </div>
            )
        }
    }
}




export default Dashboard;
