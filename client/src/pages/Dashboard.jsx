/* ⛏️⛏️ SHOW ALL EVENTS, PARTICIPANT  ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖  */

import React, { Component } from 'react';
import { hostname } from '../utils/global';
import EventList from '../components/EventList';
import "./Dashboard.css";

export class Dashboard extends Component {
    constructor(props) {
        super(props);


        this.isMountedValue = false;
        this.state = {
            activeTab: "events",
            eventList: [],
            isLoading: false
        };

        // this.getSingleEvent = this.getSingleEvent.bind(this);
        this.getAllEvents = this.getAllEvents.bind(this);
        this.updateList = this.updateList.bind(this);
    }





    // ⛏️⛏️ FETCH ALL EVENTS ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖ 
    async getAllEvents() {
        if (this.props.isAuthenticated) {
            try {
                this.setState({ isLoading: true });
                const response = await fetch(`${hostname}/api/event`, { method: "GET", credentials: "include" });
                console.log("Get all events [Dashboard.jsx] - ", response);
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
        // console.log("Authenticated - ", this.props.isAuthenticated);
        this.isMountedValue = true;
        this.getAllEvents();

    }
    updateList = (update) => { if (update) this.getAllEvents() };
    // updateList = (update) => { if (update) this.getAllEvents() };




    // // PROBLEM WITH THIS 
    // https://www.newline.co/@dmitryrogozhny/using-componentdidupdate-in-react--f037b5aa
    // componentDidUpdate(prevProps, prevState) {
    //     // console.log("Prev props - ", prevProps);
    //     // console.log("Prev State - ", prevState);
    //     // console.log("Current State - ", this.state.currentEvent);
    //     // console.log("Current State event - ", prevState.currentEvent);
    //     // debugger;        
    //     // console.log("Dashboard Updating- ", this.props.isAuthenticated);
    //     if(prevProps.isAuthenticated !== this.props.isAuthenticated){
    //         this.getAllEvents(); // HERE THE PROBLEM IS INSIDE THIS FUNCTION STATE IS BEING UPDATING
    //     }
    // }



    componentWillUnmount() {
        this.isMountedValue = false;
        this.props.authValidation(false);
        // console.log("Unmounted- ", this.props.isAuthenticated);
        this.setState({
            currentEvent: null,
            eventList: []
        });
    }









    // GET SINGLE EVENT 













    render() {
        return (
            <div className="Dashboard">
                <div className="container">
                    <EventList
                        isLoading={this.state.isLoading}
                        updateList={this.updateList}
                        eventList={this.state.eventList}
                        isAuthenticated={this.props.isAuthenticated} />
                </div>
            </div>
        );
    }
}




export default Dashboard;
