const pointVal = 1;
// inputChange(netID, game, scoreType, isExtra, team, oponent, updateTeam, setUpdateTeam);
// function inputChange(updateTeam, team, game, isExtra, scoreType, e, setUpdateTeam, netID, oponent) {
function inputChange(e, netID, game, scoreType, isExtra, team, oponent, updateTeam, setUpdateTeam, extraPlayer, individual, teamNum) {
    // ONE RECORD FOR ONE NET 

    // console.log("Game of round - ", game);
    // console.log("game - ",game);
    // console.log("Score Type  - ",scoreType);
    console.log("Update team - ", updateTeam);
    // console.log("team 1 - ", team1);
    // console.log("team 2 - ", team2);
    // console.log("Team Num - ", teamNum);
    // console.log("Oponent team - ", oponent);
    // IF THERE IS NO VALUE FOR OPONENT - SET DEFAULT VALUE 
    // console.log("Is extra - ",isExtra);
    if (teamNum === 1) {
        const findTeam = updateTeam.find((elm, i) => elm.team1.player1 === team.player1 && elm.team1.player2 === team.player2 && elm.game === game && elm.netID === netID);
        if (findTeam) {
            // UPDATE TEAM 
            updateTeam.forEach((up, i) => {
                if (up.netID === netID && up.game === game && scoreType === "score") {
                    if (up.team1.player1 === team.player1 && up.team1.player2 === team.player2) {
                        // let scr = e.target.value;
                        up.team1.score = parseInt(e.target.value);
                    }
                }
            });
        } else {
            // CREATE NEW TEAM 
            if (scoreType === "score") {
                let score = parseInt(e.target.value);
                // if(pd === "" || pd === '') pd = '0-0';
                let oponentScore = 0;
                const findOpnent = updateTeam.find((elm, i) => {
                    if (elm.team2.player1 === oponent.player1 && elm.team2.player2 === oponent.player2 && elm.game === game) {
                        return elm.team2.score = score;
                    }
                });
                if (findOpnent) oponentScore = findOpnent.team2.score;



                setUpdateTeam(oldState => [...oldState,
                {
                    team1:
                    {
                        player1: team.player1,
                        player2: team.player2,
                        score
                    },
                    team2: {
                        player1: oponent.player1,
                        player2: oponent.player2,
                        score: oponentScore,
                    },
                    extraPoint: [],
                    game,
                    netID
                }]);
            }
        }
    } else if (teamNum === 2) {
        const findTeam = updateTeam.find((elm, i) => elm.team2.player1 === team.player1 && elm.team2.player2 === team.player2 && elm.game === game && elm.netID === netID);
        if (findTeam) {
            // UPDATE TEAM 
            updateTeam.forEach((up, i) => {
                if (up.netID === netID && up.game === game && scoreType === "score") {
                    if (up.team2.player1 === team.player1 && up.team2.player2 === team.player2) {
                        // let scr = e.target.value;
                        up.team2.score = parseInt(e.target.value);
                    }
                }
            });
        } else {
            // CREATE NEW TEAM 
            if (scoreType === "score") {
                let score = parseInt(e.target.value);
                // if(pd === "" || pd === '') pd = '0-0';
                let oponentScore = 0;
                const findOpnent = updateTeam.find((elm, i) => {
                    if (elm.team2.player1 === oponent.player1 && elm.team2.player2 === oponent.player2 && elm.game === game) {
                        return elm.team2.score = score;
                    }
                });
                if (findOpnent) oponentScore = findOpnent.team1.score;



                setUpdateTeam(oldState => [...oldState,
                {
                    team1:
                    {
                        player1: oponent.player1,
                        player2: oponent.player2,
                        score
                    },
                    team2: {
                        player1: team.player1,
                        player2: team.player2,
                        score: oponentScore,
                    },
                    extraPoint: [],
                    game,
                    netID
                }]);
            }
        }
    }







}


export default inputChange;