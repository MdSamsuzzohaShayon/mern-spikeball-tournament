const pointVal = 1;
function inputChange(updateTeam, team, game, isExtra, scoreType, e, setUpdateTeam, netID, oponent) {
    // console.log("Game of round - ", game);
    // console.log("game - ",game);
    // console.log("Score Type  - ",scoreType);
    console.log("Update team - ", updateTeam);
    // console.log("team - ", team);
    // console.log("Oponent team - ", oponent);
    // IF THERE IS NO VALUE FOR OPONENT - SET DEFAULT VALUE 
    // console.log("Is extra - ",isExtra);

    const findItem = updateTeam.find((elm, i) => elm.team.player1 === team.player1 && elm.team.player2 === team.player2 && elm.game === game);
    // IF THERE IS ANY EXTRA POINT EDIT ONLY POINT 
    if (isExtra) {
        // console.log("Extra");
        if (findItem) {
            // console.log("Find Item - ", findItem);
            // updateTeam.forEach((up, i) => {
            //     if (up.performanceID === id && up.game === game && scoreType === "point") {
            //         let point = pointVal + parseFloat(e.target.value);
            //         // let val = parseInt(e.target.value)                    ;
            //         // console.log(val);
            //         up.score.point = point;
            //         // console.log(point);
            //     };
            // });
        } else {
            // CREATE NEW ONE 
            // if (scoreType === "point") {
            //     let point = pointVal + parseFloat(e.target.value);
            //     // console.log("Point - ",e.target.value);
            //     setUpdateTeam(oldState => [...oldState, { performanceID: id, game, score: { point }, netID }]);
            // }
        }
    } else {
        // console.log("target- value - ", e.target.value === "");
        if (findItem) {
            // console.log("Find Item - ", findItem);
            updateTeam.forEach((up, i) => {
                if (up.game === game && scoreType === "score") {
                    if (up.team.player1 === team.player1 && up.team.player2 === team.player2) {
                        // let scr = e.target.value;
                        up.score.score = parseInt(e.target.value);
                    }
                    if (up.oponent.player1 === team.player1 && up.oponent.player2 === team.player2) {
                        up.oponentScore = parseInt(e.target.value);
                    }
                }
                // if (up.performanceID === id && up.game === game && scoreType === "point") {
                //     let point = null;
                //     e.target.checked || e.target.checked == "on" ? point = 1 : point = 0;
                //     up.score.point = point;
                // };
                // if (up.performanceID === id && up.game === game && scoreType === "pointDeferential") {
                //     let pd = e.target.value;
                //     if (pd === "" || pd === '') pd = '0-0';
                //     up.score.pointDeferential = pd;
                // }
            });
        } else {
            // console.log("new");
            // CREATE NEW ONE 
            if (scoreType === "point") {
                let point = null;
                e.target.checked || e.target.checked == "on" ? point = 1 : point = 0;
                // setUpdateTeam(oldState => [...oldState, { performanceID: id, game, score: { point }, netID }]);
            }
            if (scoreType === "pointDeferential") {
                // let pd = e.target.value;
                // if (pd === "" || pd === '') pd = '0-0';
                // setUpdateTeam(oldState => [...oldState, { performanceID: id, game, score: { pointDeferential: pd }, netID }]);
            }
            if (scoreType === "score") {
                let score = parseInt(e.target.value);
                // if(pd === "" || pd === '') pd = '0-0';
                let oponentScore = 0;
                const findOpnent = updateTeam.find((elm, i) => {
                    if (elm.oponent.player1 === team.player1 && elm.oponent.player2 === team.player2 && elm.game === game) {
                        return elm.oponentScore = score;;
                    }
                });
                // console.log("Find Oponent - ",findOpnent);
                if (findOpnent) oponentScore = findOpnent.score.score;

                // updateTeam.map(answer => {
                //     if (answer.id === id) return { id: id, value: e.target.value }
                //     return answer
                // });

                // updateTeam.map((up, i) => {
                //     if (up.oponent.player1 === team.player1 && up.oponent.player2 === team.player2 && up.game === game) {
                //         return up.oponentScore = score;
                //     }
                //     return up;
                // }
                // );

                setUpdateTeam(oldState => [...oldState, { team, game, score: { score }, netID, oponent, oponentScore }]);
            }
        }
    }



    /*
    const findItem = updateTeam.find((elm, i) => elm.performanceID === id && elm.game === game);
    if (isExtra) {
        if (findItem) {
            // console.log("Find Item - ", findItem);
            updateTeam.forEach((up, i) => {
                if (up.performanceID === id && up.game === game && scoreType === "point") {
                    let point = pointVal + parseFloat(e.target.value);
                    // let val = parseInt(e.target.value)                    ;
                    // console.log(val);
                    up.score.point = point;
                    // console.log(point);
                };
            });
        } else {
            // CREATE NEW ONE 
            if (scoreType === "point") {
                let point = pointVal + parseFloat(e.target.value);
                // console.log("Point - ",e.target.value);
                setUpdateTeam(oldState => [...oldState, { performanceID: id, game, score: { point }, netID }]);
            }
        }
    } else {
        // console.log("target- value - ", e.target.value === "");
        if (findItem) {
            // console.log("Find Item - ", findItem);
            updateTeam.forEach((up, i) => {
                if (up.performanceID === id && up.game === game && scoreType === "score") {
                    // let scr = e.target.value;
                    up.score.score = parseInt(e.target.value);
                }
                if (up.performanceID === id && up.game === game && scoreType === "point") {
                    let point = null;
                    e.target.checked || e.target.checked == "on" ? point = 1 : point = 0;
                    up.score.point = point;
                };
                if (up.performanceID === id && up.game === game && scoreType === "pointDeferential") {
                    let pd = e.target.value;
                    if (pd === "" || pd === '') pd = '0-0';
                    up.score.pointDeferential = pd;
                }
            });
        } else {
            // console.log("new");
            // CREATE NEW ONE 
            if (scoreType === "point") {
                let point = null;
                e.target.checked || e.target.checked == "on" ? point = 1 : point = 0;
                setUpdateTeam(oldState => [...oldState, { performanceID: id, game, score: { point }, netID }]);
            }
            if (scoreType === "pointDeferential") {
                let pd = e.target.value;
                if (pd === "" || pd === '') pd = '0-0';
                setUpdateTeam(oldState => [...oldState, { performanceID: id, game, score: { pointDeferential: pd }, netID }]);

            }
            if (scoreType === "score") {
                let score = parseInt(e.target.value);
                // if(pd === "" || pd === '') pd = '0-0';
                setUpdateTeam(oldState => [...oldState, { performanceID: id, game, score: { score }, netID }]);
            }
        }
    }
    */
}


export default inputChange;