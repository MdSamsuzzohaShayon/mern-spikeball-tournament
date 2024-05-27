import React, { useState, useEffect } from 'react';
import SingleRound from './SingleRound';
import { hostname } from '../../utils/global';
import { checkRoundCompleted } from '../../utils/helpers';
import Loader from '../elements/Loader';
import "../../style/Rounds.css";
import { IPerformance, IRound } from '../../types';

interface IRoundsProps{
    eventID: string;
}

const Rounds = ({eventID}: IRoundsProps) => {
    const [roundNum, setRoundNum] = useState<number>(1);
    const [incomepleteMessage, setIncomepleteMessage] = useState<string | null>(null);
    const [initialize, setInitialize] = useState<boolean>(false);
    const [round, setRounds] = useState<IRound[]>([]);
    const [leftRound, setLeftRound] = useState([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [performances, setPerformances] = useState<IPerformance[]>([]);
    const [rankPerformanceInNet, setRankPerformanceInNet] = useState([]);
    const [incompleteErr, setIncompleteErr] = useState([]);

    const activeItemHandler = (e, item) => {
        e.preventDefault();


        // CHECK ALL GAMES IS BEEN COMPLETED 
        const { complete, incomplete } = checkRoundCompleted(roundNum, round.nets);

        if (item <= 5) {
            if (item > roundNum) {
                if (incomplete.length > 0) {
                    // CAN'T GO TO NEXT ROUND 
                    setIncompleteErr(incomplete);
                } else {
                    // SUCCESS - CAN GO TO NEXT ROUND 
                    setRoundNum(item);
                    findRound(item);
                }
            } else {
                setRoundNum(item);
                findRound(item);
            }
        }
    }


    const incompleteNetNoSMS = (netNo) => {
        // console.log(netNo);
        let sms = '';
        netNo.forEach(nn => sms = sms + " " + nn + ", ");
        return sms;
    }









    // ⛏️⛏️ GET ALL NETS FROM A ROUND ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖
    const findRound = async (r) => {

        try {
            const requestOptions = {
                method: 'GET',
                headers: { "Content-Type": 'application/json' },
            };
            setIsLoading(true);
            const response = await fetch(`${hostname}/api/round/get-single-round/${eventID}/${r}`, requestOptions);
            console.log("Get nets from round - ", response);
            const text = await response.text();
            const jsonRes = await JSON.parse(text);
            if (jsonRes.performances.length > 0) {
                setPerformances(jsonRes.performances);
            }
            if (jsonRes.leftRound && jsonRes.leftRound.length > 0) {
                setLeftRound([...jsonRes.leftRound]);
            }
            // CHECK FOR INITIAL NET 
            if (jsonRes.findRound || jsonRes.findRound !== null) {
                setRounds(jsonRes.findRound);
                if (jsonRes.findRound.nets || jsonRes.findRound.nets.length > 0) {
                    setRankPerformanceInNet(jsonRes.rankNets);
                    setInitialize(false);
                } else {
                    setInitialize(true);
                }
            } else {
                setRounds([]);
                setInitialize(true);
            }

        } catch (error) {
            console.log(error);
        }finally{
            setIsLoading(false);
        }

    }



    const refetchFunc=async ()=>{
        // await findRound(roundNum);
    }


    useEffect(() => {
        findRound(roundNum);
    }, []);



    useEffect(() => {
        // ERROR MESSAGE WILL DISAPPAIR AFTER 3 SECOND 
        let timer;
        if (incompleteErr.length > 0) {
            setIncomepleteMessage(`Please complete all games in net ${incompleteNetNoSMS(incompleteErr)} to go to next round`);
            timer = setTimeout(() => {
                setIncompleteErr([]);
                setIncomepleteMessage(null);
            }, 3000);
        }
        return () => clearTimeout(timer);
    }, [incompleteErr]);



    const updateFindNets = (update) => {
        if (update) findRound(roundNum);
    }


    /* ⛏️⛏️ SHOW COMPONENT WITH CONDITIONS ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖  */
    const showTabContent = () => {
        switch (roundNum) {
            case 1:
                if (isLoading) {
                    return <Loader />;
                } else {
                    return (<div className="tab-pane fade show active" >
                        <SingleRound
                            incomepleteMessage={incomepleteMessage}
                            initialize={initialize}
                            activeItemHandler={activeItemHandler}
                            performances={performances}
                            round={round}
                            rankPerformanceInNet={rankPerformanceInNet}
                            roundNum={roundNum}
                            updateNets={updateFindNets}
                            leftRound={leftRound}
                            game={[1, 2, 3]}
                            refetchFunc={refetchFunc}
                            eventID={eventID} />
                    </div>);
                }
            case 2:
                if (isLoading) {
                    return <Loader />;
                } else {

                    return (<div className="tab-pane fade show active" >
                        <SingleRound
                            incomepleteMessage={incomepleteMessage}
                            initialize={initialize}
                            activeItemHandler={activeItemHandler}
                            performances={performances}
                            round={round}
                            rankPerformanceInNet={rankPerformanceInNet}
                            roundNum={roundNum}
                            updateNets={updateFindNets}
                            leftRound={leftRound}
                            game={[4, 5, 6]}
                            refetchFunc={refetchFunc}
                            eventID={eventID} />
                    </div>);
                }
            case 3:
                if (isLoading) {
                    return <Loader />;
                } else {
                    return (<div className="tab-pane fade show active" >
                        <SingleRound
                            incomepleteMessage={incomepleteMessage}
                            initialize={initialize}
                            activeItemHandler={activeItemHandler}
                            performances={performances}
                            round={round}
                            rankPerformanceInNet={rankPerformanceInNet}
                            roundNum={roundNum}
                            updateNets={updateFindNets}
                            leftRound={leftRound}
                            game={[7, 8, 9]}
                            refetchFunc={refetchFunc}
                            eventID={eventID} />
                    </div>);
                }
            case 4:
                if (isLoading) {
                    return <Loader />;
                } else {
                    return (<div className="tab-pane fade show active" >
                        <SingleRound
                            incomepleteMessage={incomepleteMessage}
                            initialize={initialize}
                            activeItemHandler={activeItemHandler}
                            performances={performances}
                            round={round}
                            rankPerformanceInNet={rankPerformanceInNet}
                            roundNum={roundNum}
                            updateNets={updateFindNets}
                            leftRound={leftRound}
                            game={[10, 11, 12]}
                            refetchFunc={refetchFunc}
                            eventID={eventID} />
                    </div>);
                }
            case 5:
                if (isLoading) {
                    return <Loader />;
                } else {
                    return (<div className="tab-pane fade show active" >
                        <SingleRound
                            initialize={initialize}
                            activeItemHandler={activeItemHandler}
                            performances={performances}
                            round={round}
                            rankPerformanceInNet={rankPerformanceInNet}
                            roundNum={roundNum}
                            updateNets={updateFindNets}
                            leftRound={leftRound}
                            game={[13, 14, 15]}
                            refetchFunc={refetchFunc}
                            eventID={eventID} />
                    </div>);
                }
                case 6:
                if (isLoading) {
                    return <Loader />;
                } else {
                    return (<div className="tab-pane fade show active" >
                        <SingleRound
                            initialize={initialize}
                            activeItemHandler={activeItemHandler}
                            performances={performances}
                            round={round}
                            rankPerformanceInNet={rankPerformanceInNet}
                            roundNum={roundNum}
                            updateNets={updateFindNets}
                            leftRound={leftRound}
                            game={[16, 17, 18]}
                            eventID={eventID} />
                    </div>);
                }
            default:
                return (<div className="tab-pane fade show active" >Event overview</div>);
        }
    }
    return (
        <div className="Rounds">
            <nav className="nav nav-pills bg-dark">

                <a className={roundNum === 1 ? "nav-link active" : "nav-link"} onClick={e => activeItemHandler(e, 1)}>Round 1</a>
                <a className={roundNum === 2 ? "nav-link active" : "nav-link"} onClick={e => activeItemHandler(e, 2)}>Round 2</a>
                <a className={roundNum === 3 ? "nav-link active" : "nav-link"} onClick={e => activeItemHandler(e, 3)}>Round 3</a>
                <a className={roundNum === 4 ? "nav-link active" : "nav-link"} onClick={e => activeItemHandler(e, 4)}>Round 4</a>
                <a className={roundNum === 5 ? "nav-link active" : "nav-link"} onClick={e => activeItemHandler(e, 5)}>Round 5</a>

            </nav>
            <div className="tab-content" >
                {showTabContent()}
            </div>
        </div>
    )
}


export default Rounds;











