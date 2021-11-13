/* ⛏️⛏️ SHOW ALL EVENTS, PARTICIPANT  ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖  */

import React, { Component } from 'react';
import { hostname } from '../utils/global';
import EventList from '../components/EventList';
import { Navigate } from 'react-router-dom';
import "../style/Dashboard.css";

export class Dashboard extends Component {
    constructor(props) {
        super(props);


        this.isMountedValue = false;
        this.state = {
            activeTab: "events",
            eventList: [],
            isLoading: false,
        };

        // this.getSingleEvent = this.getSingleEvent.bind(this);
        this.getAllEvents = this.getAllEvents.bind(this);
        this.updateList = this.updateList.bind(this);
    }





    // ⛏️⛏️ FETCH ALL EVENTS ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖ 
    async getAllEvents() {
        try {
            this.setState({ isLoading: true });
            const response = await fetch(`${hostname}/api/event`, { method: "GET", credentials: "include" });
            console.log("Get all events [Dashboard.jsx] - ", response);
            const text = await response.text();
            // console.log(text);
            const jsonResponse = await JSON.parse(text);
            // console.log(jsonResponse);
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
        // if (this.props.isAuthenticated) {
        // }
    }


    componentDidMount() {
        // console.log("Authenticated - ", this.props.isAuthenticated);
        // console.log("Local - ",localStorage.getItem('user'));
        // if(localStorage.getItem('user')){
        //     console.log(localStorage.getItem('user'));
        // }
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
        if(localStorage.getItem('user')){
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
        }else{
            return <Navigate to="/admin" />
        }
    }
}




export default Dashboard;
