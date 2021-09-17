function inputChange(updatePerformance, id, game, isExtra, scoreType, e, setUpdatePerformance, netID) {
    const findItem = updatePerformance.find((elm, i) => elm.performanceID === id && elm.game === game);
    if (isExtra) {
        if (findItem) {
            // console.log("Find Item - ", findItem);
            updatePerformance.forEach((up, i) => {
                if (up.performanceID === id && up.game === game && scoreType === "point") {
                    let point = 1 + e.target.value;
                    // let val = parseInt(e.target.value)                    ;
                    // console.log(val);
                    up.score.point = point;
                    // console.log(point);
                };
            });
        } else {
            // CREATE NEW ONE 
            if (scoreType === "point") {
                let point = 1 + e.target.value;
                // console.log(point);
                setUpdatePerformance(oldState => [...oldState, { performanceID: id, game, score: { point }, netID }]);
            }
        }
    } else {
        if (findItem) {
            // console.log("Find Item - ", findItem);
            updatePerformance.forEach((up, i) => {
                if (up.performanceID === id && up.game === game && scoreType === "pointDeferential")
                    up.score.pointDeferential = e.target.value;
                if (up.performanceID === id && up.game === game && scoreType === "point") {
                    let point = null;
                    e.target.checked || e.target.checked == "on" ? point = 1 : point = 0;
                    up.score.point = point;
                };
            });
        } else {
            // CREATE NEW ONE 
            if (scoreType === "point") {
                let point = null;
                e.target.checked || e.target.checked == "on" ? point = 1 : point = 0;
                setUpdatePerformance(oldState => [...oldState, { performanceID: id, game, score: { point }, netID }]);
            }
            if (scoreType === "pointDeferential") {
                setUpdatePerformance(oldState => [...oldState, { performanceID: id, game, score: { pointDeferential: e.target.value }, netID }]);

            }
        }
    }
}


export default inputChange;