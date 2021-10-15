import React from "react";
import getDefaultValue from "./defaultValue";





// CHECK OWN OR LOSE 
const checkWon = (pointValue, firstname, lastname) => {
    // console.log("Point value", pointValue);
    // {getDefaultValue(one, scoreType, game, roundNum) >= 1 ? (<div className="p-rival got-point-name">{one.participant.firstname} {one.participant.lastname}  </div>) : (<div className="p-rival">{one.participant.firstname} {one.participant.lastname}  </div>)}
    if (pointValue === null) {
        return (<div className="p-rival">{firstname} {lastname}  </div>);
    } else if (pointValue === 0) {
        return (<div className="p-rival text-danger">{firstname} {lastname}  </div>);
    } else if (pointValue >= 1) {
        return (<div className="p-rival text-success">{firstname} {lastname}  </div>);
    }
}


const checkWonLoop = (pointValue, firstname, lastname, val) => {
    if (pointValue === null) {
        return (<div className="p-rival" key={val}>{firstname} {lastname}  </div>);
    } else if (pointValue === 0) {
        return (<div className="p-rival text-danger" key={val}>{firstname} {lastname}  </div>);
    } else if (pointValue >= 1) {
        return (<div className="p-rival text-success" key={val}>{firstname} {lastname}  </div>);
    }
}


// gor = GAME OF ROUND
// net.performance, 1, props.game[0], POINT, props.roundNum, getDefaultValue
// ⛏️⛏️ CHOOSING WHO WILL PLAY AGAINEST WHO ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖
const arrangingPerformer = (performer, gor, game, scoreType, roundNum) => {
    // console.log("Game of round - ", gor);



    // console.log("-------------------------------------------------------------------------");
    if (performer.length < 4) {

            {/* // <div className="player-name" key={j}>{p.participant.firstname} {p.participant.lastname}</div> */}
        return performer.map((p, j) => (<React.Fragment key={j}>
            {checkWon(getDefaultValue(p, scoreType, game, roundNum), p.participant.firstname, p.participant.lastname)}
        </React.Fragment>
        ));
    } else {
        if (gor === 1) {
            // console.log(performer);
            // console.log(performer[0].participant.firstname);            
            // console.log(performer[1].participant.firstname);            
            // console.log(performer[2].participant.firstname);            
            // console.log(performer[3].participant.firstname);  
            // (one, score, game, props.roundNum)
            // console.log("Game - ", game);          

            // p, scoreType, gameNum, roundNum
            // console.log("hello-----------", performer[0]);

            let one = performer[0], two = performer[1], three = performer[2], four = performer[3];
            // ONE & FOUR VS TWO & THREE 
            return (
                <div className="f-net d-flex flex-column text-center ">
                    <div className="two-participant team-1">
                        {/* {getDefaultValue(one, scoreType, game, roundNum) >= 1 ? (<div className="p-rival got-point-name">{one.participant.firstname} {one.participant.lastname}  </div>) : (<div className="p-rival no-point-name">{one.participant.firstname} {one.participant.lastname}  </div>)}
                        {getDefaultValue(four, scoreType, game, roundNum) >= 1 ? (<div className="p-rival got-point-name">{four.participant.firstname} {four.participant.lastname}  </div>) : (<div className="p-rival no-point-name">{four.participant.firstname} {four.participant.lastname}  </div>)} */}

                        {checkWon(getDefaultValue(one, scoreType, game, roundNum), one.participant.firstname, one.participant.lastname)}
                        {checkWon(getDefaultValue(four, scoreType, game, roundNum), four.participant.firstname, four.participant.lastname)}
                    </div>
                    <div className="vs text-uppercase">VS</div>
                    <div className="two-participant team-2">
                        {/* <div className="p-rival no-point-name">{performer[1].participant.firstname} {performer[1].participant.lastname}  </div>
                        <div className="p-rival no-point-name">{performer[2].participant.firstname} {performer[2].participant.lastname}  </div> */}


                        {checkWon(getDefaultValue(two, scoreType, game, roundNum), two.participant.firstname, two.participant.lastname)}
                        {checkWon(getDefaultValue(three, scoreType, game, roundNum), three.participant.firstname, three.participant.lastname)}
                    </div>
                </div>);
        } else if (gor === 2) {
            let one = performer[0], two = performer[1], three = performer[2], four = performer[3];
            // 1 & 2 VS 3 & 4 
            return (
                <div className="f-net d-flex flex-column text-center ">
                    <div className="two-participant team-1">
                        {checkWon(getDefaultValue(one, scoreType, game, roundNum), one.participant.firstname, one.participant.lastname)}
                        {checkWon(getDefaultValue(two, scoreType, game, roundNum), two.participant.firstname, two.participant.lastname)}
                    </div>
                    <div className="vs text-uppercase">VS</div>
                    <div className="two-participant team-2">
                        {checkWon(getDefaultValue(three, scoreType, game, roundNum), three.participant.firstname, three.participant.lastname)}
                        {checkWon(getDefaultValue(four, scoreType, game, roundNum), four.participant.firstname, four.participant.lastname)}
                    </div>
                </div>);
        } else if (gor === 3) {
            let one = performer[0], two = performer[1], three = performer[2], four = performer[3];
            // 1 & 3 VS 2 & 4 
            return (
                <div className="f-net d-flex flex-column text-center ">
                    <div className="two-participant team-1">
                        {checkWon(getDefaultValue(one, scoreType, game, roundNum), one.participant.firstname, one.participant.lastname)}
                        {checkWon(getDefaultValue(three, scoreType, game, roundNum), three.participant.firstname, three.participant.lastname)}
                    </div>
                    <div className="vs text-uppercase">VS</div>
                    <div className="two-participant team-2">
                        {checkWon(getDefaultValue(two, scoreType, game, roundNum), two.participant.firstname, two.participant.lastname)}
                        {checkWon(getDefaultValue(four, scoreType, game, roundNum), four.participant.firstname, four.participant.lastname)}
                    </div>
                </div>);
        } else if (gor === 4) {

            // THIS IS FOR AVERAGE 
            return (
                <div className="f-net d-flex flex-column text-center ">
                    <div className="p-rival">{performer[0].participant.firstname} {performer[0].participant.lastname}  </div>
                    <div className="p-rival">{performer[1].participant.firstname} {performer[1].participant.lastname}  </div>
                    <div className="p-rival">{performer[2].participant.firstname} {performer[2].participant.lastname}  </div>
                    <div className="p-rival">{performer[3].participant.firstname} {performer[3].participant.lastname}  </div>
                </div>);
        }
    }

}










export default arrangingPerformer;

