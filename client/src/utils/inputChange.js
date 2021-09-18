const pointVal = 1;
function inputChange(updatePerformance, id, game, isExtra, scoreType, e, setUpdatePerformance, netID) {
    const findItem = updatePerformance.find((elm, i) => elm.performanceID === id && elm.game === game);
    if (isExtra) {
        if (findItem) {
            // console.log("Find Item - ", findItem);
            updatePerformance.forEach((up, i) => {
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
                setUpdatePerformance(oldState => [...oldState, { performanceID: id, game, score: { point }, netID }]);
            }
        }
    } else {
        // console.log("target- value - ", e.target.value === "");
        if (findItem) {
            // console.log("Find Item - ", findItem);
            updatePerformance.forEach((up, i) => {
                if (up.performanceID === id && up.game === game && scoreType === "pointDeferential"){
                    let pd = e.target.value;
                    if(pd === "" || pd === '') pd = '0-0';
                    up.score.pointDeferential = pd;
                }
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
                let pd = e.target.value;
                if(pd === "" || pd === '') pd = '0-0';
                setUpdatePerformance(oldState => [...oldState, { performanceID: id, game, score: { pointDeferential: pd }, netID }]);

            }
        }
    }
}


export default inputChange;