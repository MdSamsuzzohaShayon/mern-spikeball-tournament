// import { useParams } from 'react-router-dom';
import React, { Component } from 'react';
import { withRouter } from "react-router";
import { hostname } from '../../utils/global';
import Participants from '../participant/Participants';
import Rounds from '../round/Rounds'
import Score from "../score/Score";
import '../../style/EventAdmin.css';

export class EventAdmin extends Component {
    constructor(props) {
        super(props);
        this.is_mounted = false;
        this.state = {
            currentEventID: null,
            activeTab: 'event',
            currentEvent: {
                title: null,
                participants: [],
                Date: null
            },
            participants: "",
            isLoading: false
        };

        this.clickItemHandler = this.clickItemHandler.bind(this);
        this.showAllNavItem = this.showAllNavItem.bind(this);
        this.getSingleEvent = this.getSingleEvent.bind(this);
        this.updateEvent = this.updateEvent.bind(this);
    }


    componentDidMount() {
        this.is_mounted = true;
        this.setState({ currentEventID: this.props.match.params.id });
        // console.log("Auth - ",this.props.isAuthenticated);
        // console.log("ID - ",this.props.match.params.id);
        this.getSingleEvent(this.props.match.params.id);
    }







    // ⛏️⛏️ GET AN EVENT WITH DETAILS - AFTER GETTING SINGLE EVENT REDIRECT TO EVENT ADMIN ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖ 
    async getSingleEvent(id) {
        try {
            // console.log(id);
            // console.log(participants);
            this.setState({ isLoading: true });
            const response = await fetch(`${hostname}/api/event/${id}`, { method: "GET", credentials: "include" });
            console.log("Get single event [EventAdmin.jsx] - ", response);
            const text = await response.text();
            const jsonResponse = await JSON.parse(text);
            if (this.is_mounted) {
                this.setState({ currentEvent: jsonResponse.events });
                // console.log(jsonResponse);
            }
            this.setState({ isLoading: false });
        } catch (error) {
            console.log(error);
        }
    }





    // ⛏️⛏️ MAKE ALL VALUE AS DEFAULT ON UNMOUNT AN COMPONENT ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖
    clickItemHandler(e, params) {
        this.setState({ activeTab: params });
    }




    // ⛏️⛏️ FETCH EVERYTIME WEHN WE MADE CHANGE ON DATABASE ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖
    updateEvent = (update) => { if (update) this.getSingleEvent(this.state.currentEventID) };








    /* ⛏️⛏️ SHOW COMPONENT WITH CONDITIONS ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖  */
    showAllNavItem() {
        switch (this.state.activeTab) {
            case "event":
                if (this.state.isLoading) {
                    return (
                        <div className="text-center spinner-parent">
                            <div className="spinner-border text-danger spinner-child" role="status">
                            </div>
                        </div>
                    );
                } else {
                    return (<div className="tab-pane fade show active" >
                        <div className="row">
                            <div className="col">
                                <div class="card" >
                                    <div class="card-body">
                                        <h5 class="card-title">Total Participants</h5>
                                        <p class="card-text">{this.state.currentEvent.participants.length}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <div class="card" >
                                    <div class="card-body">
                                        <h5 class="card-title">Tournament date</h5>
                                        <p class="card-text">{`${new Date(this.state.currentEvent.date).getDay()}`}-{`${new Date(this.state.currentEvent.date).getMonth()}`}-{`${new Date(this.state.currentEvent.date).getFullYear()}`}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>);
                }
            case "participants":
                if (this.state.isLoading) {
                    return (
                        <div className="text-center spinner-parent">
                            <div className="spinner-border text-danger spinner-child" role="status">
                            </div>
                        </div>
                    );
                } else {
                    return (<div className="tab-pane fade show active" >
                        <Participants
                            event={this.state.currentEvent}
                            updateEvent={this.updateEvent}
                            participants={this.state.currentEvent.participants}
                            eventID={this.state.currentEventID}
                        />
                    </div>);
                }
            case "rounds":
                if (this.state.isLoading) {
                    return (
                        <div className="text-center spinner-parent">
                            <div className="spinner-border text-danger spinner-child" role="status">
                            </div>
                        </div>
                    );
                } else {
                    return (<div className="tab-pane fade show active" ><Rounds eventID={this.state.currentEventID} /></div>);
                }
            case "score":
                if (this.state.isLoading) {
                    return (
                        <div className="text-center spinner-parent">
                            <div className="spinner-border text-danger spinner-child" role="status">
                            </div>
                        </div>
                    );
                } else {
                    return (<div className="tab-pane fade show active score-board" ><Score admin={true} /></div>);
                }
            default:
                return (<div className="tab-pane fade show active" >Event overview</div>);
        }
    }





    // ⛏️⛏️ MAKE ALL VALUE AS DEFAULT ON UNMOUNT AN COMPONENT ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖
    componentWillUnmount() {
        this.is_mounted = false;
    }





    render() {
        console.log(this.state.currentEvent);
        if (this.state.currentEventID) {
            return (
                <div className="EventAdmin">
                    {/* Event admin ID: {this.state.currentEventID} */}
                    {console.log("Event -")}
                    <div className="Overview">
                        <div className="d-flex align-items-start dashboard-nav container-fluid">
                            <div className="nav nav-pills dashboard-nav-items bg-dark text-center">
                                <h3 className="text-secondary nav-link" >{this.state.currentEvent.title}</h3>
                                <br />
                                <button className={this.state.activeTab === "event" ? "nav-link active" : "nav-link"} onClick={e => this.clickItemHandler(e, "event")} >Events</button>
                                <button className={this.state.activeTab === "participants" ? "nav-link active" : "nav-link"} onClick={e => this.clickItemHandler(e, "participants")}  >Participants</button>
                                <button className={this.state.activeTab === "rounds" ? "nav-link active" : "nav-link"} onClick={e => this.clickItemHandler(e, "rounds")}  >Round</button>
                                <button className={this.state.activeTab === "score" ? "nav-link active" : "nav-link"} onClick={e => this.clickItemHandler(e, "score")}  >Score</button>
                            </div>
                            <div className="tab-content" >
                                {this.showAllNavItem()}
                            </div>
                        </div>
                        {/* <button className="btn btn-danger" onClick={handleLogout}>Logout</button> */}
                    </div>
                </div>
            );
        } else {
            return (
                <div className="EventAdmin">
                    No event id or incorrect event id
                </div>
            );
        }
    }
}

export default withRouter(EventAdmin);

