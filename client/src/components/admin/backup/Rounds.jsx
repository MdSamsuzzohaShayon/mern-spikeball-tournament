import React, { useState, useEffect } from 'react';
import Round from './Round';
// import Round1 from './Round1';
// import Round2 from './Round2';
// import Round3 from './Round3';
// import Round4 from './Round4';
// import Round5 from './Round5';
import { hostname } from '../../utils/global';
import "./style/Rounds.css";



const Rounds = (props) => {
    const [activeItem, setActiveItem] = useState(1);
    // const [round, setRound] = useState(1);
    const [initialize, setInitialize] = useState(false);
    const [nets, setNets] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    // const [reassignToNet, setReassignToNet] = useState(false);

    const activeItemHandler = (e, item) => {
        e.preventDefault();
        // console.log(round);
        // console.log(item);
        setActiveItem(item);
        // setRound(item);
        // console.log("findAllNets round 1");
        findAllNets(item);
    }




    const findAllNets = async (r) => {

        const requestOptions = {
            method: 'GET',
            headers: { "Content-Type": 'application/json' },
            credentials: "include"
        };
        // console.log(props.eventID);
        setIsLoading(true);
        // console.log(r);
        const response = await fetch(`${hostname}/api/event/get-net/${props.eventID}/${r}`, requestOptions);
        const text = await response.text();
        const jsonRes = await JSON.parse(text);
        // console.log("Get net - ", response);
        // console.log(jsonRes);
        setNets(jsonRes.findNets);
        // ⛏️⛏️ CHECK FOR INITIAL NET ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖
        if (jsonRes.findNets.length < 1) {
            // console.log("JSON - ", jsonRes.findNets.length );
            setInitialize(true);
        } else {
            setInitialize(false);
        }
        setIsLoading(false);
        // console.log(round);
    }



    useEffect(() => {
        // console.log("findAllNets called from use effect");
        findAllNets(activeItem);
        console.log("Round - ", activeItem);
    }, []);


    const updateFindNets = (update) => {
        // console.log("findAllNets from update event");
        if (update) findAllNets(activeItem);
    }










    /* ⛏️⛏️ SHOW COMPONENT WITH CONDITIONS ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖  */
    const showTabContent = () => {
        switch (activeItem) {
            case 1:
                if (isLoading) {
                    return (
                        <div className="text-center spinner-parent">
                            <div className="spinner-border text-danger spinner-child" role="status">
                            </div>
                        </div>
                    );
                } else {
                    return (<div className="tab-pane fade show active" >
                        <Rounds
                            initialize={initialize}
                            nets={nets}
                            round={activeItem}
                            updateNets={updateFindNets}
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
                        <Round2
                            initialize={initialize}
                            nets={nets}
                            round={activeItem}
                            updateNets={updateFindNets}
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
                        <Round3
                            initialize={initialize}
                            nets={nets}
                            round={activeItem}
                            updateNets={updateFindNets}
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
                    return (<div className="tab-pane fade show active" ><Round4
                        initialize={initialize}
                        nets={nets}
                        round={activeItem}
                        updateNets={updateFindNets}
                        eventID={props.eventID}
                    /> </div>);
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
                    return (<div className="tab-pane fade show active" ><Round5
                        initialize={initialize}
                        nets={nets}
                        round={activeItem}
                        updateNets={updateFindNets}
                        eventID={props.eventID}
                    /> </div>);
                }
            default:
                return (<div className="tab-pane fade show active" >Event overview</div>);
        }
    }
    return (
        <div className="Rounds">
            <nav className="nav nav-pills">
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
