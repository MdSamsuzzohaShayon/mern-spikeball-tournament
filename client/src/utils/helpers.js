export const checkNegativePD = (val, cls) => {
    // <div className="pd-item">{getDefaultValue(net.performance[0], score, game, props.roundNum)}</div>
    if (Math.sign(val) === -1) {
        return <div className={`pd-item text-danger no-pd ${cls}`}>{val}</div>
    } if (Math.sign(val) === 1) {
        return <div className={`pd-item text-success got-pd ${cls}`}>{val}</div>
    } else {
        return <div className={`pd-item text-primary ${cls}`}>{val}</div>
    }
}



export const checkNegativeP = (val, d_cls) => {
    // Math.sign(getDefaultValue(one, score, game, props.roundNum)) === -1 
    if (val === 0) {
        return <div className={`p-item text-danger no-p ${d_cls}`}></div>
    } else if (Math.sign(val) >= 1) {
        return <div className={`p-item text-success got-p ${d_cls}`}>{val}</div>
    } else {
        return <div className={`p-item ${d_cls}`}></div>
    }
}



export const tabKeyFocusChange=()=>{
    console.log("Tab key focus change");
    const scoreInputs = document.querySelectorAll('.input-score');
    const scoreInputsNoNet = document.querySelectorAll('.input-score-no-net');

    const firstGameInput = new Array();
    const secondGameInput = new Array();
    const thirdGameInput = new Array();
    // console.log(scoreInputs);
    let i = 0, chunk = 6;
    while (i < scoreInputs.length) {
        try {
            firstGameInput.push(scoreInputs[i], scoreInputs[i + 1]);
            secondGameInput.push(scoreInputs[i + 2], scoreInputs[i + 3]);
            thirdGameInput.push(scoreInputs[i + 4], scoreInputs[i + 5]);
        } catch (error) {
            console.log(error);
        }
        i += chunk;
    }

    const numOfGame = 3;
    const noNetDivider = scoreInputsNoNet.length / numOfGame;
    // const firstDivider = firstGameInput.length / numOfGame;
    // const secondDivider = secondGameInput.length / numOfGame;
    // const thirdDivider = thirdGameInput.length / numOfGame;
    // scoreInputsNoNet.forEach((scin, i)=>{
    //     scin.setAttribute("tabIndex", `${i + firstGameInput.length + secondGameInput.length + thirdGameInput.length + 1}`);
    // });
    firstGameInput.forEach((fgi, i) => {
        // fgi.setAttribute("id", `score-input-${i + 1}`);
        fgi.setAttribute("tabIndex", `${i + 1}`);
    });

    for (let i = 0; i < noNetDivider; i++) {
        scoreInputsNoNet[i].setAttribute('tabIndex', `${i + 1 + firstGameInput.length}`);
    }

    secondGameInput.forEach((sgi, i) => {
        sgi.setAttribute("tabIndex", `${i + 1 + firstGameInput.length + noNetDivider}`);
    });

    for (let i = 0; i < noNetDivider; i++) {
        scoreInputsNoNet[i + noNetDivider].setAttribute('tabIndex', `${i + 1 + firstGameInput.length + noNetDivider + secondGameInput.length}`);
    }

    thirdGameInput.forEach((tgi, i) => {
        tgi.setAttribute("tabIndex", `${i + 1 + firstGameInput.length + noNetDivider + secondGameInput.length + noNetDivider}`);
    });
    for (let i = 0; i < noNetDivider; i++) {
        scoreInputsNoNet[i + noNetDivider + noNetDivider].setAttribute('tabIndex', `${i + 1 + firstGameInput.length + noNetDivider + secondGameInput.length + noNetDivider + thirdGameInput.length}`);
    }
}
