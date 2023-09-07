import React, { Component } from 'react';
import { hostname } from '../../utils/global';
import Point from './Point';
import Round from './Round';
import Loader from '../elements/Loader';
import withRouter from '../../HOC/withRouter';
import "../../style/Score.css";


class Score extends Component {
    constructor(props) {
        super(props);
        this.is_mounted = false;
        this.state = {
            currentEventID: this.props.params.id,
            isLoading: false,
            round1: [],
            round2: [],
            round3: [],
            round4: [],
            round5: [],
            round1NR: [],
            round2NR: [],
            round3NR: [],
            round4NR: [],
            round5NR: [],
            allRank: [],

            activeItem: 1,
            allRound: [],
            game: [1, 2, 3],

            accessToken: null
        }


        this.findRankingRound = this.findRankingRound.bind(this);
        this.showTabContent = this.showTabContent.bind(this);
        this.activeItemHandler = this.activeItemHandler.bind(this);
        this.findRound = this.findRound.bind(this);
    }


    // ⛏️⛏️ GET ALL NETS FROM A ROUND WITH RANKING ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖
    async findRankingRound() {
        try {
            const requestOptions = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.state.accessToken}`
                },
            };

            this.setState({ isLoading: true });
            const response = await fetch(`${hostname}/api/round/ranking/${this.state.currentEventID}`, requestOptions);
            console.log("Get nets from round with ranking - ", response);
            const text = await response.text();
            const jsonRes = await JSON.parse(text);
            if (jsonRes.round1 && jsonRes.round1.length > 0) this.setState({ round1: jsonRes.round1 });
            if (jsonRes.round2 && jsonRes.round2.length > 0) this.setState({ round2: jsonRes.round2 });
            if (jsonRes.round3 && jsonRes.round3.length > 0) this.setState({ round3: jsonRes.round3 });
            if (jsonRes.round4 && jsonRes.round4.length > 0) this.setState({ round4: jsonRes.round4 });
            if (jsonRes.round5 && jsonRes.round5.length > 0) this.setState({ round5: jsonRes.round5 });

            if (jsonRes.allPerformances && jsonRes.allPerformances.length > 0) this.setState({ allRank: jsonRes.allPerformances });

            // CHECK FOR INITIAL NET 
            this.setState({ isLoading: false });

        } catch (error) {
            console.log(error);
        }

    }

    // ⛏️⛏️ GET ALL NETS FROM A ROUND ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖
    findRound = async (r) => {
        try {
            const requestOptions = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.state.accessToken}`
                },
            };
            this.setState({ isLoading: true });

            const response = await fetch(`${hostname}/api/round/get-single-round/${this.state.currentEventID}/${r}`, requestOptions);
            console.log("Get nets from round - ", response);
            const text = await response.text();
            const jsonRes = await JSON.parse(text);

            // CHECK FOR INITIAL NET 
            if (jsonRes.findRound) {
                this.setState({ allRound: jsonRes.findRound })
            }
            this.setState({ isLoading: false });
        } catch (error) {
            console.log(error);
        }

    }

    componentDidMount() {
        this.is_mounted = true;
        this.findRankingRound();
        this.findRound(this.state.activeItem);
        const findAT = window.localStorage.getItem('accessToken');
        if (findAT) {
            this.setState({accessToken: findAT});
        }
    }


    componentWillUnmount() {
        this.is_mounted = false;
    }


    activeItemHandler(e, item) {
        e.preventDefault();
        if (!this.props.admin) {
            this.findRound(item);
        }
        this.setState({ activeItem: item })
        if (item === 1) {
            this.setState({ game: [1, 2, 3] });
        } else if (item === 2) {
            this.setState({ game: [4, 5, 6] });
        } else if (item === 3) {
            this.setState({ game: [7, 8, 9] });
        } else if (item === 4) {
            this.setState({ game: [10, 11, 12] });
        } else if (item === 5) {
            this.setState({ game: [13, 14, 15] });
        }
    }

    /* ⛏️⛏️ SHOW COMPONENT WITH CONDITIONS ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖  */
    showTabContent = () => {
        switch (this.state.activeItem) {
            case 1:
                if (this.state.isLoading) {
                    return <Loader />;
                } else {
                    return (<div className="tab-pane fade show active" >
                        <Round public={this.props.admin} roundNum={this.state.activeItem} pp={this.state.round1} round={this.state.allRound} game={this.state.game} />
                    </div>);
                }
            case 2:
                if (this.state.isLoading) {
                    return <Loader />;
                } else {

                    return (<div className="tab-pane fade show active" >
                        <Round public={this.props.admin} roundNum={this.state.activeItem} pp={this.state.round2} round={this.state.allRound} game={this.state.game} />
                    </div>);
                }
            case 3:
                if (this.state.isLoading) {
                    return <Loader />;
                } else {
                    return (<div className="tab-pane fade show active" >
                        <Round public={this.props.admin} roundNum={this.state.activeItem} pp={this.state.round3} round={this.state.allRound} game={this.state.game} />
                    </div>);
                }
            case 4:
                if (this.state.isLoading) {
                    return <Loader />;
                } else {
                    return (<div className="tab-pane fade show active" >
                        <Round public={this.props.admin} roundNum={this.state.activeItem} pp={this.state.round4} round={this.state.allRound} game={this.state.game} />
                    </div>);
                }
            case 5:
                if (this.state.isLoading) {
                    return <Loader />;
                } else {
                    return (<div className="tab-pane fade show active" >
                        <Round public={this.props.admin} roundNum={this.state.activeItem} pp={this.state.round5} round={this.state.allRound} game={this.state.game} />
                    </div>);
                }
            default:
                return (<div className="tab-pane fade show active" >Event overview</div>);
        }
    }

    render() {
        const one = 1, two = 2, three = 3, four = 4, five = 5;
        return (
            <div className="Score">
                <div className="container">
                    {this.state.isLoading ? <Loader /> : (<div className="display-event-details">
                        <div className="whole-ranking">
                            <h2 className="h2">Overall ranking</h2>
                            <Point roundNum={5} pp={this.state.allRank} roundwise={false} />
                        </div>

                        <nav className="nav nav-pills">
                            <a className={this.state.activeItem === one ? "nav-link active" : "nav-link"} onClick={e => this.activeItemHandler(e, one)}>Round 1</a>
                            <a className={this.state.activeItem === two ? "nav-link active" : "nav-link"} onClick={e => this.activeItemHandler(e, two)}>Round 2</a>
                            <a className={this.state.activeItem === three ? "nav-link active" : "nav-link"} onClick={e => this.activeItemHandler(e, three)}>Round 3</a>
                            <a className={this.state.activeItem === four ? "nav-link active" : "nav-link"} onClick={e => this.activeItemHandler(e, four)}>Round 4</a>
                            <a className={this.state.activeItem === five ? "nav-link active" : "nav-link"} onClick={e => this.activeItemHandler(e, five)}>Round 5</a>
                            {/* <a className="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a> */}
                        </nav>
                        <div className="tab-content" >
                            {this.showTabContent()}
                        </div>
                    </div>)}
                </div>
            </div>
        )
    }
}

export default withRouter(Score);
