import React, { useState, useEffect } from 'react';
import Round124 from '../Round124';
import Round528 from '../Round528';
import Round9212 from '../Round9212';
import Round13215 from '../Round13215';
import { hostname } from '../../utils/global';

const Rounds = (props) => {
    const [activeItem, setActiveItem] = useState('r124');
    const [initialize, setInitialize] = useState(false);
    const [nets, setNets] = useState([]);

    const activeItemHandler = (e, item) => {
        e.preventDefault();
        // console.log(item);
        setActiveItem(item);
    }




    const findAllNets = async () => {

        const requestOptions = {
            method: 'GET',
            headers: { "Content-Type": 'application/json' },
            credentials: "include"
        };
        // console.log(props.eventID);

        const response = await fetch(`${hostname}/api/event/get-net/${props.eventID}`, requestOptions);
        const text = await response.text();
        const jsonRes = await JSON.parse(text);
        // console.log("JSON - ", jsonRes);
        setNets(jsonRes.findNets);
        // ⛏️⛏️ CHECK FOR INITIAL NET ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖
        if (jsonRes.findNets.length < 1) {
            // console.log("JSON - ", jsonRes.findNets.length );
            setInitialize(true);
        } else {
            setInitialize(false);
        }
    }



    useEffect(() => {
        findAllNets();
    }, []);


    const updateFindNets = (update) => {
        if (update) findAllNets();
    }










    /* ⛏️⛏️ SHOW COMPONENT WITH CONDITIONS ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖  */
    const showAllNavItem = () => {
        switch (activeItem) {
            case "r124":
                return (<div className="tab-pane fade show active" >
                    <Round124
                        initialize={initialize}
                        nets={nets}
                        updateNets={updateFindNets}
                        eventID={props.eventID} />
                </div>);
            case "r528":
                return (<div className="tab-pane fade show active" > <Round528 /> </div>);
            case "r9212":
                return (<div className="tab-pane fade show active" ><Round9212 /> </div>);
            case "r13215":
                return (<div className="tab-pane fade show active" ><Round13215 /> </div>);
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
                {showAllNavItem()}
            </div>
        </div>
    )
}

export default Rounds;
