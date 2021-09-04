import React, { Component } from 'react';
import { withRouter } from "react-router";
import { hostname } from '../../utils/global';
import Point from './Point';


class Score extends Component {
    constructor(props) {
        super(props);
        this.is_mounted = false;
        this.state = {
            currentEventID: this.props.match.params.id,
            isLoading: false,
            round1: [],
            round2: [],
            round3: [],
            round4: [],
            allRank: [],
        }


        this.findRound = this.findRound.bind(this);
    }

    // ⛏️⛏️ GET ALL NETS FROM A ROUND ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖
    async findRound() {

        const requestOptions = {
            method: 'GET',
            headers: { "Content-Type": 'application/json' },
            credentials: "include"
        };

        this.setState({ isLoading: true });


        console.log(this.state.currentEventID);
        const response = await fetch(`${hostname}/api/round/ranking/${this.state.currentEventID}`, requestOptions);
        console.log("Get nets from round - ", response);
        const text = await response.text();
        const jsonRes = await JSON.parse(text);
        // console.log("JSON");
        // console.log(jsonRes);
        if (jsonRes.round1 && jsonRes.round1.length > 0) this.setState({ round1: jsonRes.round1 });
        if (jsonRes.round2 && jsonRes.round2.length > 0) this.setState({ round2: jsonRes.round2 });
        if (jsonRes.round3 && jsonRes.round3.length > 0) this.setState({ round3: jsonRes.round3 });
        if (jsonRes.round4 && jsonRes.round4.length > 0) this.setState({ round4: jsonRes.round4 });
        if (jsonRes.allPerformances && jsonRes.allPerformances.length > 0) this.setState({ allRank: jsonRes.allPerformances });

        // CHECK FOR INITIAL NET 
        this.setState({ isLoading: false });
    }





    // componentDidUpdate(){
    //     console.log(this.state.pp);
    // }






    componentDidMount() {
        this.is_mounted = true;
        this.findRound();
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
                        <Point roundNum={5} pp={this.state.allRank} />
                    </div>


                    <div className="row">
                        {this.state.round1 && this.state.round1.length > 1 && (
                            <div className="col-md-6">
                                <div className="roundwise-ranking">
                                    <h2 className="h2">Round 1</h2>
                                    <Point roundNum={1} pp={this.state.round1} />
                                </div>
                            </div>
                        )}
                        {this.state.round2 && this.state.round2.length > 1 && (
                            <div className="col-md-6">
                                <div className="roundwise-ranking">
                                    <h2 className="h2">Round 2</h2>
                                    <Point roundNum={2} pp={this.state.round2} />
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="row">
                        {this.state.round3 && this.state.round3.length > 1 && (
                            <div className="col-md-6">
                                <div className="roundwise-ranking">
                                    <h2 className="h2">Round 3</h2>
                                    <Point roundNum={3} pp={this.state.round3} />
                                </div>
                            </div>
                        )}

                        {this.state.round4 && this.state.round4.length > 1 && (
                            <div className="col-md-6">
                                <div className="roundwise-ranking">
                                    <h2 className="h2">Round 4</h2>
                                    <Point roundNum={4} pp={this.state.round4} />
                                </div>
                            </div>
                        )}

                    </div>
                </div>)}
            </div>
        )
    }
}

export default withRouter(Score);
