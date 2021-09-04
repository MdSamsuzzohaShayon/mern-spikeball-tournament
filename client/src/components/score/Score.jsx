import React, { useState, useEffect } from 'react';
import { hostname } from '../../utils/global';
import Point from '../event/Point';



const Score = (props) => {
    const [round1, setRound1] = useState([]);
    const [round2, setRound2] = useState([]);
    const [round3, setRound3] = useState([]);
    const [round4, setRound4] = useState([]);
    const [allRank, setAllRank] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    // const [reassignToNet, setReassignToNet] = useState(false);

    const activeItemHandler = (e, item) => {
        e.preventDefault();
        findRound();
    }







    // ⛏️⛏️ GET ALL NETS FROM A ROUND ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖
    const findRound = async () => {

        const requestOptions = {
            method: 'GET',
            headers: { "Content-Type": 'application/json' },
            credentials: "include"
        };
        // console.log(props.eventID);
        setIsLoading(true);
        // console.log("Loading - ",isLoading);
        // console.log(r);
        const response = await fetch(`${hostname}/api/round/ranking/${props.eventID}`, requestOptions);
        console.log("Get nets from round - ", response);
        const text = await response.text();
        const jsonRes = await JSON.parse(text);
        // console.log("JSON");
        // console.log(jsonRes);
        if (jsonRes.round1 && jsonRes.round1.length > 0) setRound1(jsonRes.round1);
        if (jsonRes.round2 && jsonRes.round2.length > 0) setRound2(jsonRes.round2);
        if (jsonRes.round3 && jsonRes.round3.length > 0) setRound3(jsonRes.round3);
        if (jsonRes.round4 && jsonRes.round4.length > 0) setRound4(jsonRes.round4);
        if (jsonRes.allPerformances && jsonRes.allPerformances.length > 0) setAllRank(jsonRes.allPerformances);

        // CHECK FOR INITIAL NET 
        // if (jsonRes.findRound) {
        //     setRounds(jsonRes.findRound);
        //     if (jsonRes.findRound.nets || jsonRes.findRound.nets.length < 1) {
        //         setInitialize(false);
        //     } else {
        //         setInitialize(true);
        //     }
        // } else {
        //     setRounds([]);
        //     setInitialize(true);
        // }

        setIsLoading(false);
    }



    useEffect(() => {
        findRound();
        console.log(round1);
        console.log(round2);
        console.log(round3);
        console.log(round4);
        console.log(allRank);
    }, []);













    return (
        <div className="Score">
            <div className="overall-ranking">
                <h2 className="h2">Overall Ranking</h2>
                <Point pp={round1} />
            </div>
        </div>
    )
}


export default Score;
