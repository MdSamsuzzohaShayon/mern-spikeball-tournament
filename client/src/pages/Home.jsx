import React, { Component } from 'react';
import { hostname } from '../utils/global';
import EventList from '../components/events/EventList';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            eventList: [],
            isAuthenticated: false,
            isLoading: false
        };
        this.getAllEvents = this.getAllEvents.bind(this);
        this.getEventID = this.getEventID.bind(this);
    }

    // ⛏️⛏️ FETCH ALL EVENTS ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖ 
    async getAllEvents() {
        try {
            const options = { method: "GET", headers: { "Content-Type": "application/json" } };
            this.setState({ isLoading: true });
            const response = await fetch(`${hostname}/api/event`, options);
            const text = await response.text();
            const jsonResponse = await JSON.parse(text);
            this.setState({
                eventList: jsonResponse.events,
                isLoading: false
            });
        } catch (error) {
            console.log(error);
        }
    }

    getEventID(id) {
        console.log("Event ID - ", id);
    }

    async componentDidMount() {
        this.getAllEvents();
    }

    render() {
        return (
            <div className="Home">
                <i className="bi bi-plus-lg"></i>


                
                <div className="container mt-3">
                    <EventList isLoading={this.state.isLoading}
                        pullEventID={this.getEventID}
                        eventList={this.state.eventList}
                        pageFor="home" />
                </div>
            </div>
        )
    }
}

export default Home;
