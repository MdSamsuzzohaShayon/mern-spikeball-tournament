import React, { Component } from 'react';
import { withRouter } from "react-router";
import { hostname } from '../../utils/global';
import { totalPoint } from '../../utils/addTotalPoint';
import { totalDeferential } from '../../utils/pointDeferential';

class Event extends Component {
    constructor(props) {
        super(props);
        this.is_mounted = false;
        this.state = {
            currentEventID: null,
            isLoading: false,
            pp: []
        }


        this.getSingleEvent = this.getSingleEvent.bind(this);
        this.performanceList = this.performanceList.bind(this);
    }


    // ⛏️⛏️ GET ALL PERFORMANCE FROM AN EVENT ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖ 
    async getSingleEvent(id) {
        try {
            // console.log(id);
            // console.log(participants);
            this.setState({ isLoading: true });
            const response = await fetch(`${hostname}/api/event/get-performance/${id}`, { method: "GET", credentials: "include" });
            const text = await response.text();
            const jsonResponse = await JSON.parse(text);
            if (this.is_mounted) {
                this.setState({ currentEvent: jsonResponse.events });
                // console.log(jsonResponse);
                this.setState({ isLoading: false, pp: jsonResponse.rankingPerformance });

            }
        } catch (error) {
            console.log(error);
        }
    }



    // componentDidUpdate(){
    //     console.log(this.state.pp);
    // }


    performanceList() {
        return (
            <>
                <li className="list-group-item d-flex align-items-center justify-content-between bg-dark text-light" >
                    <div className="first-name">Ranking</div>
                    <div className="first-name">Name</div>
                    <div className="total-point">Total Point</div>
                    <div className="total-point">Total Deferential</div>
                </li>
                <ol className="list-group list-group-numbered">
                    {this.state.pp.map((p, i) => (
                        <li className="list-group-item d-flex align-items-center justify-content-between" key={i}>
                            <div className="first-name">{p.participant.firstname}</div>
                            <div className="total-point">{totalPoint(p)}</div>
                            <div className="total-point">{totalDeferential(p)}</div>
                        </li>
                    ))}
                </ol>
            </>
        );
    }


    componentDidMount() {
        this.is_mounted = true;
        this.setState({ currentEventID: this.props.match.params.id });
        this.getSingleEvent(this.props.match.params.id);
    }


    componentWillUnmount() {
        this.is_mounted = false;
    }




    render() {
        return (
            <div className="Event">
                {this.state.isLoading ? (<div className="text-center spinner-parent">
                    <div className="spinner-border text-danger spinner-child" role="status">
                    </div>
                </div>) : (<div className="display-event-details">
                    <div className="whole-ranking container">
                        <h2 className="h2">Overall ranking</h2>
                        <div className="performance-list">{this.performanceList()}</div>
                    </div>
                </div>)}
            </div>
        )
    }
}

export default withRouter(Event);
