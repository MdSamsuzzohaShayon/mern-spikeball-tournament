import React, { useState, useEffect, useRecoilState } from 'react';
import Participants from './Participants';
import {hostname} from '../../utils/global';

const Overview = (props) => {


    const [activeTab, setActiveTab] = useState("event");


    /* ⛏️⛏️ SHOW COMPONENT WITH CONDITIONS ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖  */
    function showAllNavItem() {
        switch (activeTab) {
            case "event":
                return (<div className="tab-pane fade show active" >Overview How Many Events, How Many Rounds, Score, Participants</div>);
            case "participants":
                return (<div className="tab-pane fade show active" ><Participants event={props.event} participants={props.event.participants} /></div>);
            case "rounds":
                return (<div className="tab-pane fade show active" >Rounds</div>);
            default:
                return (<div className="tab-pane fade show active" >Event overview</div>);
        }
    }

    function clickItemHandler(e, params) {
        setActiveTab(params);
    }




    return (
        <div className="Overview">
            <div className="d-flex align-items-start dashboard-nav container-fluid">
                <div className="nav flex-column  nav-pills dashboard-nav-items bg-dark">
                    <button className={activeTab === "event" ? "nav-link active" : "nav-link"} onClick={e => clickItemHandler(e, "event")} >Events</button>
                    <button className={activeTab === "participants" ? "nav-link active" : "nav-link"} onClick={e => clickItemHandler(e, "participants")}  >Participants</button>
                    <button className={activeTab === "rounds" ? "nav-link active" : "nav-link"} onClick={e => clickItemHandler(e, "rounds")}  >Round</button>
                    <button className="nav-link" >Settings</button>
                </div>
                <div className="tab-content" >
                    {showAllNavItem()}
                </div>
            </div>
            {/* <button className="btn btn-danger" onClick={handleLogout}>Logout</button> */}
        </div>
    )
}

export default Overview
