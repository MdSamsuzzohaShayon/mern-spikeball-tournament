import React, { Component } from 'react';
import { withRouter } from "react-router";
import { hostname } from '../../utils/global';
import Round1 from './Round1';
import Round2 from './Round2';
import Round3 from './Round3';
import Round4 from './Round4';
import Round5 from './Round5';

import WholePerformance from './WholePerformance';

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
                </div>) : (<div className="display-event-details container">
                    <div className="whole-ranking">
                        <h2 className="h2">Overall ranking</h2>
                        <div className="performance-list"><WholePerformance pp={this.state.pp} /> </div>
                    </div>


                    <div className="row">
                        <div className="col-md-6">
                            <div className="roundwise-ranking">
                                <h2 className="h2">Round one to four ranking</h2>
                                <div className="performance-list"><Round1 pp={this.state.pp} /></div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="roundwise-ranking">
                                <h2 className="h2">Round five to eight ranking</h2>
                                <div className="performance-list"><Round2 pp={this.state.pp} /></div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="roundwise-ranking">
                                <h2 className="h2">Round nine to twelve ranking</h2>
                                <div className="performance-list"><Round3 pp={this.state.pp} /></div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="roundwise-ranking">
                                <h2 className="h2">Round thirteen to fifteen ranking</h2>
                                <div className="performance-list"><Round4 pp={this.state.pp} /></div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="roundwise-ranking">
                                <h2 className="h2">Round nine to twelve ranking</h2>
                                <div className="performance-list"><Round5 pp={this.state.pp} /></div>
                            </div>
                        </div>
                    </div>

                </div>)}
            </div>
        )
    }
}

export default withRouter(Event);
