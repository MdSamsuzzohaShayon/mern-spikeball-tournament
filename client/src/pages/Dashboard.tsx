/* ⛏️⛏️ SHOW ALL EVENTS, PARTICIPANT */

import React, { Component } from 'react';
import EventList from '../components/events/EventList';
import { Navigate } from 'react-router-dom';
import "../style/Dashboard.css";
import { Link } from 'react-router-dom';
import withNavigate from '../HOC/withNavigate';
import { getAllEvents } from '../utils/handleRequests/event';
import { IEvent } from '../types';


interface IDashboardState {
    activeTab: string;
    eventList: IEvent[];
    isLoading: boolean;
}

interface IDashboardProps {
    navigate: (path: string) => void;
    // Add other props here if necessary
}

export class Dashboard extends Component<IDashboardProps, IDashboardState> {
    private isMountedValue: boolean;

    constructor(props: IDashboardProps) {
        super(props);

        this.isMountedValue = false;
        this.state = {
            activeTab: "events",
            eventList: [],
            isLoading: false,
        };

        this.updateList = this.updateList.bind(this);
    }


    componentDidMount() {
        this.isMountedValue = true;
        // this.getAllEvents();
        (async ()=>{
            const eList = await getAllEvents();
            this.setState({eventList: eList});
        })()
    }

    async updateList(update: boolean) {
        if (update) {
            const eList = await getAllEvents();
            this.setState({eventList: eList});
        }
    }

    componentWillUnmount() {
        this.isMountedValue = false;
        this.setState({
            eventList: []
        });
    }

    render() {
        if (!localStorage.getItem('token')) return <Navigate to={"/admin"} />;
        
        return (
            <div className="Dashboard">
                <div className="container">
                    <br />
                    <Link className="btn btn-primary" to="/admin/list">Admin List</Link>
                    <br />
                    <br />
                    <EventList
                        isLoading={this.state.isLoading}
                        updateList={this.updateList}
                        eventList={this.state.eventList}
                        pageFor="dashboard" />
                </div>
            </div>
        );
    }
}

export default withNavigate(Dashboard);
