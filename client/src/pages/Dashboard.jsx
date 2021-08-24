/* ⛏️⛏️ SHOW ALL EVENTS, PARTICIPANT  ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖  */

import React, { Component } from 'react';
import { hostname } from '../utils/global';
import EventList from '../components/EventList';
import Overview from '../components/admin/Overview';
import "./Dashboard.css";

export class Dashboard extends Component {
    constructor(props) {
        super(props);


        this.isMountedValue = false;
        this.state = {
            activeTab: "events",
            currentEvent: null,
            participants: "",
            currentEventID: null,
            eventList: [],
            isLoading: false
        };

        // this.getSingleEvent = this.getSingleEvent.bind(this);
        this.getAllEvents = this.getAllEvents.bind(this);
        this.getEventID = this.getEventID.bind(this);
        this.getSingleEvent = this.getSingleEvent.bind(this);
    }



    // ⛏️⛏️ GET AN EVENT WITH DETAILS ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖ 
    async getSingleEvent() {
        if(this.props.isAuthenticated){
            try {
                // console.log(id);
                // console.log(participants);
                const response = await fetch(`${hostname}/api/admin/dashboard/event/${this.state.currentEventID}`, { method: "GET", credentials: "include" });
                const text = await response.text();
                const jsonResponse = await JSON.parse(text);
                if (this.isMountedValue) {
                    this.setState({ currentEvent: jsonResponse.events });
                }
            } catch (error) {
                console.log(error);
            }
        }
    }



    getEventID(id) {
        this.setState({ currentEventID: id });
        this.getSingleEvent();
    }



    // ⛏️⛏️ FETCH ALL EVENTS ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖ 
    async getAllEvents() {
        if(this.props.isAuthenticated){
            try {
                this.setState({isLoading: true});
                const response = await fetch(`${hostname}/api/event`, { method: "GET", credentials: "include" });
                const text = await response.text();
                const jsonResponse = await JSON.parse(text);
                if (this.isMountedValue) {
                    this.setState({
                        eventList: jsonResponse.events,
                        isLoading: false
                    });
                }
    
                // console.log("JSON - ", jsonResponse.events);
            } catch (error) {
                console.log(error);
            }
        }
    }
    componentDidMount() {
        console.log("Authenticated - ", this.props.isAuthenticated);
        this.isMountedValue = true;
        this.getAllEvents();

    }



    // // PROBLEM WITH THIS 
    // https://www.newline.co/@dmitryrogozhny/using-componentdidupdate-in-react--f037b5aa
    componentDidUpdate(prevProps, prevState) {
        // console.log("Prev props - ", prevProps);
        // console.log("Prev State - ", prevState);
        // console.log("Current State - ", this.state.currentEvent);
        // console.log("Current State event - ", prevState.currentEvent);
        // debugger;        
        // console.log("Dashboard Updating- ", this.props.isAuthenticated);
        if(prevProps.isAuthenticated !== this.props.isAuthenticated){
            this.getAllEvents(); // HERE THE PROBLEM IS INSIDE THIS FUNCTION STATE IS BEING UPDATING
        }
        if( prevState.currentEventID !== this.state.currentEventID){
            this.getSingleEvent();
        }
    }



    componentWillUnmount() {
        this.isMountedValue = false;
        this.props.authValidation(false);
        // console.log("Unmounted- ", this.props.isAuthenticated);
        this.setState({
            currentEvent: null,
            participants: "",
            currentEventID: null,
            eventList: []
        });
    }









    // GET SINGLE EVENT 













    render() {
        if (this.state.currentEvent) {
            return (
                <div className="Dashboard">
                    <Overview event={this.state.currentEvent} />
                </div>
            );
        } else {
            return (
                <div className="Dashboard">
                    <div className="container">
                        <EventList isLoading={this.state.isLoading} pullEventID={this.getEventID} eventList={this.state.eventList} isAuthenticated={this.props.isAuthenticated} />
                    </div>
                </div>
            );
        }
    }
}




export default Dashboard;
