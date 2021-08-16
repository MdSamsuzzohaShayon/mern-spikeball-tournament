/* ⛏️⛏️ SHOW ALL EVENTS, PARTICIPANT  ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖  */

import React, { Component } from 'react';
import { hostname } from '../utils/global';
import Events from '../components/admin/Events';
import Participants from '../components/admin/Participants';
import "./Dashboard.css";

export class Dashboard extends Component {
    constructor(props) {
        super(props);


        this.state = {
            activeTab : "events",
            currentEvent: null,
            participants: ""
        };

        this.handleLogout = this.handleLogout.bind(this);
        this.clickItemHandler = this.clickItemHandler.bind(this);
        this.singleEvent = this.singleEvent.bind(this);
    }



    /* ⛏️⛏️ LOGOUT EVENT ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖  */
    async handleLogout() {

        try {
            const response = await fetch(`${hostname}/api/admin/logout`, {
                method: "GET",
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if (response.status === 200) {
                console.log(response);
                // const textRes = await response.text();
                // const jsonRes = await JSON.parse(textRes);
                this.props.authValidation(false);
            }
        } catch (error) {
            console.log(error);
        }

    }


    /* ⛏️⛏️ CHECK WHICH ITEM IS BEEN CLICKED ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖  */
    clickItemHandler = (e, params) => {
        e.preventDefault();
        // console.log("E - ", e);
        // console.log("Params - ", params);
        this.setState({ activeTab: params });
    }


    singleEvent(event){
        // console.log("E - ", event);
        this.setState({currentEvent: event, participants: event.participants, activeTab: "participants"});
    }



    /* ⛏️⛏️ SHOW COMPONENT WITH CONDITIONS ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖  */
    showAllNavItem() {
        switch (this.state.activeTab) {
            case "events":
                return (<div className="tab-pane fade show active" ><Events  getSingleEvent={this.singleEvent} /></div>);
            case "participants":
                return (<div className="tab-pane fade show active" ><Participants event={this.state.currentEvent} participants={this.state.participants} /></div>);
            case "rounds":
                return (<div className="tab-pane fade show active" >Rounds</div>);
            default:
                return (<div className="tab-pane fade show active" ><Events getSingleEvent={this.singleEvent}  /></div>);
        }
    }




    render() {
        return (
            <div className="Dashboard">
                <div className="d-flex align-items-start dashboard-nav container-fluid">
                    <div className="nav flex-column  nav-pills dashboard-nav-items bg-dark">
                        <button className={this.state.activeTab === "events" ? "nav-link active" : "nav-link" } onClick={e => this.clickItemHandler(e, "events")} >Events</button>
                        <button className={this.state.activeTab === "participants" ? "nav-link active" : "nav-link" } onClick={e => this.clickItemHandler(e, "participants")}  >Participants</button>
                        <button className={this.state.activeTab === "rounds" ? "nav-link active" : "nav-link" } onClick={e => this.clickItemHandler(e, "rounds")}  >Round</button>
                        <button className="nav-link" >Settings</button>
                    </div>
                    <div className="tab-content" >
                        {this.showAllNavItem()}
                    </div>
                </div>
                {/* <button className="btn btn-danger" onClick={this.handleLogout}>Logout</button> */}
            </div>
        )
    }
}




export default Dashboard;
