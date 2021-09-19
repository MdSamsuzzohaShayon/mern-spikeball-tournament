import React, { useState, useEffect } from 'react';
import Point from './Point';
import RoundTable from './RoundTable';

function Round(props) {

    // console.log("Props - ",props);
    // if()
    // useEffect(() => {
    //     console.log("Component did mount [Round.jsx]");
        
    // }, []);

    return (
        <div className="Round">
            <div className="row">
                {props.pp && props.pp.length > 1 && (
                    <div className="col-md-6">
                        <div className="roundwise-ranking">
                            <h2 className="h2">Round {props.roundNum}</h2>
                            <Point roundNum={1} pp={props.pp} />
                        </div>
                    </div>
                )}
            </div>
            {!props.public && (<div className="row">
                Who is playing againest who
                <RoundTable game={props.game} round={props.round} roundNum={props.roundNum} />
            </div>)}


        </div>
    )
}

export default Round;
