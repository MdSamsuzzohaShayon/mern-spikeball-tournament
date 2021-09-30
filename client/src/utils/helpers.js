
// team1.player1, score, game, props.roundNum
// ⛏️⛏️ SETTING DEFAULT VALUE OF INPUT  ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖


// let r = 0;
// export const rankLoop = (net, i, rank) => {
//     // rank ++;
//     // console.log(rank);
//     // console.log("Called");
//     // r = r + 1;
//     return net.performance.map((p, pi) => {
//         // console.log("J - ", j);
//         rank++;
//         return rank;
//     });
//     // return <div>{i}</div>
// }










// gor = GAME OF ROUND
// ⛏️⛏️ CHOOSING WHO WILL PLAY AGAINEST WHO ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖
export const arrangingPerformer = (performer, gor) => {
    // console.log("Game of round - ",gor);



    // console.log("-------------------------------------------------------------------------");
    if (performer.length < 4) {

        return (
            <div>
                {performer.map((p, j) => (
                    <div className="player-name" key={j}>{p.participant.firstname} {p.participant.lastname}</div>
                ))
                }
            </div>);
    } else {
        if (gor === 1) {
            // console.log(performer[0]);
            // console.log(performer[0].participant.firstname);            
            // console.log(performer[1].participant.firstname);            
            // console.log(performer[2].participant.firstname);            
            // console.log(performer[3].participant.firstname);            
            return (
                <div className="f-net d-flex flex-column text-center justify-space-between">
                    <div className="two-participant">
                        <div className="p-rival">{performer[0].participant.firstname} {performer[0].participant.lastname}  </div>
                        <div className="p-rival">{performer[3].participant.firstname} {performer[3].participant.lastname}  </div>
                    </div>
                    <div className="vs text-uppercase">VS</div>
                    <div className="two-participant">
                        <div className="p-rival">{performer[1].participant.firstname} {performer[1].participant.lastname}  </div>
                        <div className="p-rival">{performer[2].participant.firstname} {performer[2].participant.lastname}  </div>
                    </div>
                </div>);
        } else if (gor === 2) {
            return (
                <div className="f-net d-flex flex-column text-center justify-space-between">
                    <div className="two-participant">
                        <div className="p-rival">{performer[0].participant.firstname} {performer[0].participant.lastname}  </div>
                        <div className="p-rival">{performer[1].participant.firstname} {performer[1].participant.lastname}  </div>
                    </div>
                    <div className="vs text-uppercase">VS</div>
                    <div className="two-participant">
                        <div className="p-rival">{performer[2].participant.firstname} {performer[2].participant.lastname}  </div>
                        <div className="p-rival">{performer[3].participant.firstname} {performer[3].participant.lastname}  </div>
                    </div>
                </div>);
        } else if (gor === 3) {
            return (
                <div className="f-net d-flex flex-column text-center justify-space-between">
                    <div className="two-participant">
                        <div className="p-rival">{performer[0].participant.firstname} {performer[0].participant.lastname}  </div>
                        <div className="p-rival">{performer[2].participant.firstname} {performer[2].participant.lastname}  </div>
                    </div>
                    <div className="vs text-uppercase">VS</div>
                    <div className="two-participant">
                        <div className="p-rival">{performer[1].participant.firstname} {performer[1].participant.lastname}  </div>
                        <div className="p-rival">{performer[3].participant.firstname} {performer[3].participant.lastname}  </div>
                    </div>
                </div>);
        } else if (gor === 4) {

            // THIS IS FOR AVERAGE 
            return (
                <div className="f-net d-flex flex-column text-center justify-space-between">
                    <div className="p-rival">{performer[0].participant.firstname} {performer[0].participant.lastname}  </div>
                    <div className="p-rival">{performer[1].participant.firstname} {performer[1].participant.lastname}  </div>
                    <div className="p-rival">{performer[2].participant.firstname} {performer[2].participant.lastname}  </div>
                    <div className="p-rival">{performer[3].participant.firstname} {performer[3].participant.lastname}  </div>
                </div>);
        }
    }

}



// ⛏️⛏️ CHOOSING WHO WILL PLAY AGAINEST WHO ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖
export const serializePerformer = (performer) => {
    // console.log("Game of round - ",gor);
    return (
        <div>
            {performer.map((p, j) => (
                <div className="player-name" key={j}>{p.participant.firstname} {p.participant.lastname}</div>
            ))
            }
        </div>);

}



export const checkNegativePD = (val, cls)=>{
    // <div className="pd-item">{getDefaultValue(net.performance[0], score, game, props.roundNum)}</div>
    if(Math.sign(val) === -1){
        return <div className={`pd-item text-danger no-pd ${cls}`}>{val}</div>
    }if(Math.sign(val)=== 1){
        return <div className={`pd-item text-success got-pd ${cls}`}>{val}</div>
    }else{
        return <div className={`pd-item text-primary ${cls}`}>{val}</div>
    }
}



export const checkNegativeP = (val, d_cls)=>{
    // Math.sign(getDefaultValue(one, score, game, props.roundNum)) === -1 
    if(val=== 0){
        return <div className={`p-item text-danger no-p ${d_cls}`}></div>
    }else if(Math.sign(val) >= 1){
        return <div className={`p-item text-success got-p ${d_cls}`}>{val}</div>
    }else{
        return <div className={`p-item ${d_cls}`}></div>
    }
}
