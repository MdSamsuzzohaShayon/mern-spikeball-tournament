import { EXTRA_POINT, SCORE } from '../utils/global';



// e, game, scoreType, net._id, selectedTeam, shortNet, winningExtraPoint, setWinningExtraPoint
const handleExtraWinningPointChange = (e, game, scoreType, netID, teamIDList, shortNet, winningExtraPoint, setWinningExtraPoint) => {
    if (scoreType === EXTRA_POINT) {
        let extraPoint = parseFloat(e.target.value);
        if (isNaN(extraPoint)) extraPoint = 0;

        const findWinningTeam = winningExtraPoint.find((elm, i) => elm.teamIDList[0] === teamIDList[0] && elm.game === game && elm.netID === netID);
        if (findWinningTeam) {
            // UPDATE TEAM 
            winningExtraPoint.forEach((up, i) => {
                if (up.teamIDList[0] === teamIDList[0] && up.netID === netID && up.game === game) {
                    up.extraPoint = extraPoint;
                }
            });
        } else {
            // CREATE NEW TEAM 
            setWinningExtraPoint(oldState => [...oldState,
            {
                teamIDList,
                game,
                netID,
                extraPoint
            }]);

        }
    }
}



// e, game, net._id, scoreType, team1, team2, true, updateScore, setUpdatedScore
const handleScoreChange = (e, game, netID, scoreType, team, oponent, firstTeam, updateScore, setUpdatedScore, individual) => {
    // THIS IS NOT EXTRA POINT 
    if (scoreType === SCORE) {
        // console.log("Update team - ", updateScore);
        // console.log("-----------😱😱Score😱😱----------------");
        // console.log("Game of round - ", game);
        // console.log("Team - ",team);
        // console.log("Oponent team - ", oponent);
        // console.log("inputChange.js line 30 - ",updateScore);

        // A NET THAT HAS LESS THAN 4 PLAYERS 
        if (individual === true) {
            let score = parseInt(e.target.value);
            // console.log("Player with less than 4 player in a net - ", extraPlayerId);
            const findPerformance = updateScore.find((elm, i) => elm.team1.players[0] === team[0] && elm.game === game && elm.netID === netID);
            // console.log("find ", findPerformance);
            if (findPerformance) {
                // UPDATE TEAM 
                updateScore.forEach((up, i) => {
                    if (up.team1.players[0] === team[0] && up.netID === netID && up.game === game) {
                        up.score = score;
                    }
                });
            } else {
                // CREATE NEW TEAM 
                setUpdatedScore(oldState => [...oldState,
                {
                    team1:
                    {
                        players: [team[0]],
                        score
                    },
                    team2: null,
                    game,
                    netID
                }]);

            }
        } else {
            if (firstTeam === true) {
                const findTeam = updateScore.find((elm, i) => {
                    if (elm.team1 && elm.team2) {
                        if (elm.team1.players[0] === team[0] && elm.team1.players[1] === team[1] && elm.game === game && elm.netID === netID) {
                            return elm;
                        }
                    }
                    return null;
                });
                if (findTeam) {
                    // UPDATE TEAM 
                    updateScore.forEach((up, i) => {
                        if (up.netID === netID && up.game === game) {
                            if (up.team1.players[0] === team[0] && up.team1.players[1] === team[1]) {
                                // let scr = e.target.value;
                                up.team1.score = parseInt(e.target.value);
                            }
                        }
                        return;
                    });
                } else {
                    // CREATE NEW TEAM 

                    let score = parseInt(e.target.value);
                    // if(pd === "" || pd === '') pd = '0-0';
                    let oponentScore = null;
                    const findOpnent = updateScore.find((elm, i) => {
                        if (elm.team1 && elm.team2) {
                            if (elm.team2.players[0] === oponent[0] && elm.team2.players[1] === oponent[1] && elm.game === game) {
                                return elm;
                            }
                        }
                        return null;
                    });
                    if (findOpnent) oponentScore = findOpnent.team2.score;



                    setUpdatedScore(oldState => [...oldState,
                    {
                        team1:
                        {
                            players: [team[0], team[1]],
                            score
                        },
                        team2: {
                            players: [oponent[0], oponent[1]],
                            score: oponentScore,
                        },
                        game,
                        netID
                    }]);
                }
            } else {
                const findTeam = updateScore.find((elm, i) => {
                    if (elm.team1 && elm.team2) {
                        if (elm.team2.players[0] === team[0] && elm.team2.players[1] === team[1] && elm.game === game && elm.netID === netID) {
                            return elm;
                        }
                    }
                    return null;
                });
                if (findTeam) {
                    // UPDATE TEAM 
                    updateScore.forEach((up, i) => {
                        if (up.netID === netID && up.game === game) {
                            if (up.team2.players[0] === team[0] && up.team2.players[1] === team[1]) {
                                // let scr = e.target.value;
                                up.team2.score = parseInt(e.target.value);
                            }
                        }
                    });
                } else {
                    // CREATE NEW TEAM 
                    let score = parseInt(e.target.value);
                    // if(pd === "" || pd === '') pd = '0-0';
                    let oponentScore = null;
                    const findOpnent = updateScore.find((elm, i) => {
                        if (elm.team1 && elm.team2) {
                            if (elm.team2.players[0] === oponent[0] && elm.team2.players[1] === oponent[1] && elm.game === game) {
                                return elm;
                            }
                        }
                        return null;
                    });
                    if (findOpnent) oponentScore = findOpnent.team1.score;



                    setUpdatedScore(oldState => [...oldState,
                    {
                        team1:
                        {
                            players: [oponent[0], oponent[1]],
                            score: oponentScore
                        },
                        team2: {
                            players: [team[0], team[1]],
                            score,
                        },
                        game,
                        netID
                    }]);

                }
            }
        }
    }
}


export { handleScoreChange, handleExtraWinningPointChange };


