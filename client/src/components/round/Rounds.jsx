import React, { useState, useEffect } from 'react';
import SingleRound from './SingleRound';
import { hostname } from '../../utils/global';
import "../../style/Rounds.css";



const Rounds = (props) => {
    const [activeItem, setActiveItem] = useState(1);
    // const [round, setRound] = useState(1);
    const [initialize, setInitialize] = useState(false);
    const [round, setRounds] = useState([]);
    const [leftRound, setLeftRound] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    // const [reassignToNet, setReassignToNet] = useState(false);

    const activeItemHandler = (e, item) => {
        e.preventDefault();
        // console.log(round);
        // console.log(item);
        setActiveItem(item);
        // setRound(item);
        // console.log("findRound round 1");
        findRound(item);
    }







    // ⛏️⛏️ GET ALL NETS FROM A ROUND ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖
    const findRound = async (r) => {

        try {
            const requestOptions = {
                method: 'GET',
                headers: { "Content-Type": 'application/json' },
                credentials: "include"
            };
            // console.log(props.eventID);
            setIsLoading(true);
            // console.log("Loading - ",isLoading);
            // console.log(r);
            const response = await fetch(`${hostname}/api/round/get-single-round/${props.eventID}/${r}`, requestOptions);
            console.log("Get nets from round - ", response);
            const text = await response.text();
            const jsonRes = await JSON.parse(text);
            // console.log("JSON");
            // console.log(jsonRes);
            if (jsonRes.leftRound && jsonRes.leftRound.length > 0) {
                setLeftRound([...jsonRes.leftRound]);
            }
            // CHECK FOR INITIAL NET 
            if (jsonRes.findRound) {
                setRounds(jsonRes.findRound);
                if (jsonRes.findRound.nets || jsonRes.findRound.nets.length < 1) {
                    setInitialize(false);
                } else {
                    setInitialize(true);
                }
            } else {
                setRounds([]);
                setInitialize(true);
            }

            setIsLoading(false);
            // console.log("Loading - ",isLoading);
        } catch (error) {
            console.log(error);
        }

    }





    useEffect(() => {
        // console.log("findRound called from use effect");
        findRound(activeItem);
        // console.log("Round - ", activeItem);


        // const netTeam = document.querySelectorAll('.f-net');



        // UNMOUNT 
        // return () => {
        //     // // console.log("Rounds Component Unmount");
        //     // setActiveItem(1);
        //     // // const [round, setRound] = useState(1);
        //     // setInitialize(false);
        //     // setRounds([]);
        //     // setLeftRound([]);
        //     // setIsLoading(false);
        // }
    }, []);


    const updateFindNets = (update) => {
        // console.log("findRound from update event");
        if (update) findRound(activeItem);
    }








    /* ⛏️⛏️ SHOW COMPONENT WITH CONDITIONS ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖  */
    const showTabContent = () => {
        // console.log("Loading - ", isLoading);
        switch (activeItem) {
            case 1:
                if (isLoading) {
                    // console.log("Loading (true) - ", isLoading);
                    return (
                        <div className="text-center spinner-parent">
                            <div className="spinner-border text-danger spinner-child" role="status">
                            </div>
                        </div>
                    );
                } else {
                    // console.log("Loading(false) - ", isLoading);
                    return (<div className="tab-pane fade show active" >
                        {/* <Round1
                            initialize={initialize}
                            round={round}
                            roundNum={activeItem}
                            updateNets={updateFindNets}
                            game={[1, 2, 3]}
                            eventID={props.eventID} /> */}
                        <SingleRound
                            initialize={initialize}
                            round={round}
                            roundNum={activeItem}
                            updateNets={updateFindNets}
                            leftRound={leftRound}
                            game={[1, 2, 3]}
                            eventID={props.eventID} />
                    </div>);
                }
            case 2:
                if (isLoading) {
                    return (
                        <div className="text-center spinner-parent">
                            <div className="spinner-border text-danger spinner-child" role="status">
                            </div>
                        </div>
                    );
                } else {

                    return (<div className="tab-pane fade show active" >
                        <SingleRound
                            initialize={initialize}
                            round={round}
                            roundNum={activeItem}
                            updateNets={updateFindNets}
                            leftRound={leftRound}
                            game={[4, 5, 6]}
                            eventID={props.eventID} />
                    </div>);
                }
            case 3:
                if (isLoading) {
                    return (
                        <div className="text-center spinner-parent">
                            <div className="spinner-border text-danger spinner-child" role="status">
                            </div>
                        </div>
                    );
                } else {
                    return (<div className="tab-pane fade show active" >
                        <SingleRound
                            initialize={initialize}
                            round={round}
                            roundNum={activeItem}
                            updateNets={updateFindNets}
                            leftRound={leftRound}
                            game={[7, 8, 9]}
                            eventID={props.eventID} />
                    </div>);
                }
            case 4:
                if (isLoading) {
                    return (
                        <div className="text-center spinner-parent">
                            <div className="spinner-border text-danger spinner-child" role="status">
                            </div>
                        </div>
                    );
                } else {
                    return (<div className="tab-pane fade show active" >
                        <SingleRound
                            initialize={initialize}
                            round={round}
                            roundNum={activeItem}
                            updateNets={updateFindNets}
                            leftRound={leftRound}
                            game={[10, 11, 12]}
                            eventID={props.eventID} />
                    </div>);
                }
            case 5:
                if (isLoading) {
                    return (
                        <div className="text-center spinner-parent">
                            <div className="spinner-border text-danger spinner-child" role="status">
                            </div>
                        </div>
                    );
                } else {
                    return (<div className="tab-pane fade show active" >
                        <SingleRound
                            initialize={initialize}
                            round={round}
                            roundNum={activeItem}
                            updateNets={updateFindNets}
                            leftRound={leftRound}
                            game={[13, 14, 15]}
                            eventID={props.eventID} />
                    </div>);
                }
            default:
                return (<div className="tab-pane fade show active" >Event overview</div>);
        }
    }
    return (
        <div className="Rounds">
            <nav className="nav nav-pills bg-dark">
                <a className="nav-link active" className={activeItem === 1 ? "nav-link active" : "nav-link"} onClick={e => activeItemHandler(e, 1)}>Round 1</a>
                <a className="nav-link active" className={activeItem === 2 ? "nav-link active" : "nav-link"} onClick={e => activeItemHandler(e, 2)}>Round 2</a>
                <a className="nav-link active" className={activeItem === 3 ? "nav-link active" : "nav-link"} onClick={e => activeItemHandler(e, 3)}>Round 3</a>
                <a className="nav-link active" className={activeItem === 4 ? "nav-link active" : "nav-link"} onClick={e => activeItemHandler(e, 4)}>Round 4</a>
                <a className="nav-link active" className={activeItem === 5 ? "nav-link active" : "nav-link"} onClick={e => activeItemHandler(e, 5)}>Round 5</a>
                {/* <a className="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a> */}
            </nav>
            <div className="tab-content" >
                {showTabContent()}
            </div>
        </div>
    )
}


export default Rounds;
