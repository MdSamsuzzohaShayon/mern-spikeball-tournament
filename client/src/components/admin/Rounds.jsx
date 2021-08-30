import React, { useState, useEffect } from 'react';
import Round124 from '../Round124';
import Round528 from '../Round528';
import Round9212 from '../Round9212';
import Round13215 from '../Round13215';
import { hostname } from '../../utils/global';

const Rounds = (props) => {
    const [activeItem, setActiveItem] = useState('r124');
    const [round, setRound] = useState(1);
    const [initialize, setInitialize] = useState(false);
    const [nets, setNets] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    // const [reassignToNet, setReassignToNet] = useState(false);

    const activeItemHandler = (e, item) => {
        e.preventDefault();
        // console.log(round);
        // console.log(item);
        setActiveItem(item);
        switch (item) {
            case "r124":
                setRound(1);
                // console.log("findAllNets round 1");
                findAllNets(1);
                break;
            case "r528":
                setRound(5);
                // console.log("findAllNets called from round 5");
                findAllNets(5);
                break;
            case "r9212":
                setRound(9);
                // console.log("findAllNets called from round 9");
                findAllNets(9);
                break;;
            case "r13215":
                setRound(13);
                // console.log("findAllNets called from round 13");
                findAllNets(13);
                break;
        }
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
        console.log("Get net - ", response);
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
        findAllNets(round);
    }, []);


    const updateFindNets = (update) => {
        // console.log("findAllNets from update event");
        if (update) findAllNets(round);
    }










    /* ⛏️⛏️ SHOW COMPONENT WITH CONDITIONS ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖  */
    const showTabContent = () => {
        switch (activeItem) {
            case "r124":
                if (isLoading) {
                    return (
                        <div className="text-center spinner-parent">
                            <div className="spinner-border text-danger spinner-child" role="status">
                            </div>
                        </div>
                    );
                } else {
                    return (<div className="tab-pane fade show active" >
                        <Round124
                            initialize={initialize}
                            nets={nets}
                            round={round}
                            updateNets={updateFindNets}
                            eventID={props.eventID} />
                    </div>);
                }
            case "r528":
                if (isLoading) {
                    return (
                        <div className="text-center spinner-parent">
                            <div className="spinner-border text-danger spinner-child" role="status">
                            </div>
                        </div>
                    );
                } else {

                    return (<div className="tab-pane fade show active" >
                        <Round528
                            initialize={initialize}
                            nets={nets}
                            round={round}
                            updateNets={updateFindNets}
                            eventID={props.eventID} />
                    </div>);
                }
            case "r9212":
                if (isLoading) {
                    return (
                        <div className="text-center spinner-parent">
                            <div className="spinner-border text-danger spinner-child" role="status">
                            </div>
                        </div>
                    );
                } else {
                    return (<div className="tab-pane fade show active" >
                        <Round9212 initialize={initialize}
                            nets={nets}
                            round={round}
                            updateNets={updateFindNets}
                            eventID={props.eventID} />
                    </div>);
                }
            case "r13215":
                if (isLoading) {
                    return (
                        <div className="text-center spinner-parent">
                            <div className="spinner-border text-danger spinner-child" role="status">
                            </div>
                        </div>
                    );
                } else {
                    return (<div className="tab-pane fade show active" ><Round13215 /> </div>);
                }
            default:
                return (<div className="tab-pane fade show active" >Event overview</div>);
        }
    }
    return (
        <div className="Rounds">
            <nav className="nav nav-pills">
                <a className="nav-link active" className={activeItem === "r124" ? "nav-link active" : "nav-link"} onClick={e => activeItemHandler(e, "r124")}>Round one to four</a>
                <a className="nav-link active" className={activeItem === "r528" ? "nav-link active" : "nav-link"} onClick={e => activeItemHandler(e, "r528")}>Round five to nine</a>
                <a className="nav-link active" className={activeItem === "r9212" ? "nav-link active" : "nav-link"} onClick={e => activeItemHandler(e, "r9212")}>Round ten to twelve</a>
                <a className="nav-link active" className={activeItem === "r13215" ? "nav-link active" : "nav-link"} onClick={e => activeItemHandler(e, "r13215")}>Round thirteen to fifteen</a>
                {/* <a className="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a> */}
            </nav>
            <div className="tab-content" >
                {showTabContent()}
            </div>
        </div>
    )
}


export default Rounds;
