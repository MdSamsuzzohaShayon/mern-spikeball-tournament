// gor = GAME OF ROUND 
// ⛏️⛏️ INPUT FIELD FOR ALL PARTICIPANT OR PERFORMANCE  ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖
const allPerformers = (net, game, score, gor, handleInputChange, getDefaultValue, addExtra, showInput, props) => {
    // console.log(net.performance);
    // console.log("s - ", score);
    // console.log(props.round);
    // console.log("Game - ", game, props.game);


    if (score === "point") {
        if (net.performance.length < 4) {
            return net.performance.map((p, j) => (
                <div className="f-point d-flex flex-column" key={j}>
                    <div className="point-extra d-flex jusitify-content-center align-items-center">
                        <input
                            className="form-check-input not-mingle-point"
                            type="checkbox"
                            onChange={e => handleInputChange(e, p._id, game, score, net._id, false)}
                            defaultChecked={getDefaultValue(p, score, game, props.roundNum) >= 1 ? true : false}
                        />

                        {getDefaultValue(p, score, game, props.roundNum) >= 1 && (<div className="extra d-flex">
                            <img src='/icon/extra.svg' alt="img" onClick={e => addExtra(e, p._id, game, props.round)} className="extra-icon" />
                            <input type="text" style={{ display: showInput(p._id, game, props.round) }}
                                onChange={e => handleInputChange(e, p._id, game, score, net._id, true)} className="extra-input" />
                        </div>)}
                    </div>

                </div>
            ));
        } else {
            if (gor === 1) {
                // 1ST & 4TH VS 2ND  4TH 
                let one = net.performance[0], two = net.performance[1], three = net.performance[2], four = net.performance[3];
                return (<div className="f-point d-flex flex-column">
                    <div className="two-p-input two-p-input-1 d-flex flex-column justify-content-center">
                        <div className="point-extra d-flex jusitify-content-center align-items-center">
                            <input className="form-check-input" type="checkbox"
                                onChange={e => handleInputChange(e, {player1: one._id, player2: four._id}, game, score, net._id, false)}
                                defaultChecked={getDefaultValue(one, score, game, props.roundNum) >= 1 ? true : false} />

                            {getDefaultValue(one, score, game, props.roundNum) >= 1 && (<div className="extra d-flex">
                                <img src='/icon/extra.svg' alt="img" onClick={e => addExtra(e, one._id, game, props.round)} className="extra-icon" />
                                <input type="text" style={{ display: showInput(one._id, game, props.round) }}
                                    onChange={e => handleInputChange(e, one._id, game, score, net._id, true)} className="extra-input" />
                            </div>)}
                        </div>

                        <div className="point-extra d-flex jusitify-content-center align-items-center">
                            <input className="form-check-input" type="checkbox"
                                onChange={e => handleInputChange(e, four._id, game, score, net._id, false)}
                                defaultChecked={getDefaultValue(four, score, game, props.roundNum) >= 1 ? true : false} />

                            {getDefaultValue(four, score, game, props.roundNum) >= 1 && (<div className="extra d-flex">
                                <img src='/icon/extra.svg' alt="img" onClick={e => addExtra(e, four._id, game, props.round)} className="extra-icon" />
                                <input type="text" style={{ display: showInput(four._id, game, props.round) }}
                                    onChange={e => handleInputChange(e, four._id, game, score, net._id, true)} className="extra-input" />
                            </div>)}
                        </div>

                    </div>

                    <div className="line"></div>

                    <div className="two-p-input two-p-input-2  d-flex flex-column items-center justify-content-center">
                        <div className="point-extra d-flex jusitify-content-center align-items-center">
                            <input className="form-check-input" type="checkbox"
                                onChange={e => handleInputChange(e, two._id, game, score, net._id, false)}
                                defaultChecked={getDefaultValue(two, score, game, props.roundNum) >= 1 ? true : false} />

                            {getDefaultValue(two, score, game, props.roundNum) >= 1 && (<div className="extra d-flex">
                                <img src='/icon/extra.svg' alt="img" onClick={e => addExtra(e, two._id, game, props.round)} className="extra-icon" />
                                <input type="text" style={{ display: showInput(two._id, game, props.round) }}
                                    onChange={e => handleInputChange(e, two._id, game, score, net._id, true)} className="extra-input" />
                            </div>)}
                        </div>

                        <div className="point-extra d-flex jusitify-content-center align-items-center">
                            <input className="form-check-input" type="checkbox"
                                onChange={e => handleInputChange(e, three._id, game, score, net._id, false)}
                                defaultChecked={getDefaultValue(three, score, game, props.roundNum) >= 1 ? true : false} />

                            {getDefaultValue(three, score, game, props.roundNum) >= 1 && (<div className="extra d-flex">
                                <img src='/icon/extra.svg' alt="img" onClick={e => addExtra(e, three._id, game, props.round)} className="extra-icon" />
                                <input type="text" style={{ display: showInput(three._id, game, props.round) }}
                                    onChange={e => handleInputChange(e, three._id, game, score, net._id, true)} className="extra-input" />
                            </div>)}
                        </div>

                    </div>
                </div>);
            } else if (gor === 2) {
                let one = net.performance[0], two = net.performance[1], three = net.performance[2], four = net.performance[3];
                // 1ST VS 2ND & 3RD VS 4TH 
                return (<div className="f-point d-flex flex-column">
                    <div className="two-p-input two-p-input-2  d-flex flex-column items-center justify-content-center">
                        <div className="point-extra d-flex jusitify-content-center align-items-center">
                            <input className="form-check-input" type="checkbox"
                                onChange={e => handleInputChange(e, one._id, game, score, net._id, false)}
                                defaultChecked={getDefaultValue(one, score, game, props.roundNum) >= 1 ? true : false} />

                            {getDefaultValue(one, score, game, props.roundNum) >= 1 && (<div className="extra d-flex">
                                <img src='/icon/extra.svg' alt="img" onClick={e => addExtra(e, one._id, game, props.round)} className="extra-icon" />
                                <input type="text" style={{ display: showInput(one._id, game, props.round) }}
                                    onChange={e => handleInputChange(e, one._id, game, score, net._id, true)} className="extra-input" />
                            </div>)}
                        </div>

                        <div className="point-extra d-flex jusitify-content-center align-items-center">
                            <input className="form-check-input" type="checkbox"
                                onChange={e => handleInputChange(e, two._id, game, score, net._id, false)}
                                defaultChecked={getDefaultValue(two, score, game, props.roundNum) >= 1 ? true : false} />

                            {getDefaultValue(two, score, game, props.roundNum) >= 1 && (<div className="extra d-flex">
                                <img src='/icon/extra.svg' alt="img" onClick={e => addExtra(e, two._id, game, props.round)} className="extra-icon" />
                                <input type="text" style={{ display: showInput(two._id, game, props.round) }}
                                    onChange={e => handleInputChange(e, two._id, game, score, net._id, true)} className="extra-input" />
                            </div>)}
                        </div>

                    </div>


                    <div className="line"></div>


                    <div className="two-p-input two-p-input-2  d-flex flex-column items-center justify-content-center">
                        <div className="point-extra d-flex jusitify-content-center align-items-center">
                            <input className="form-check-input" type="checkbox"
                                onChange={e => handleInputChange(e, three._id, game, score, net._id, false)}
                                defaultChecked={getDefaultValue(three, score, game, props.roundNum) >= 1 ? true : false} />

                            {getDefaultValue(three, score, game, props.roundNum) >= 1 && (<div className="extra d-flex">
                                <img src='/icon/extra.svg' alt="img" onClick={e => addExtra(e, three._id, game, props.round)} className="extra-icon" />
                                <input type="text" style={{ display: showInput(three._id, game, props.round) }}
                                    onChange={e => handleInputChange(e, three._id, game, score, net._id, true)} className="extra-input" />
                            </div>)}
                        </div>

                        <div className="point-extra d-flex jusitify-content-center align-items-center">
                            <input className="form-check-input" type="checkbox"
                                onChange={e => handleInputChange(e, four._id, game, score, net._id, false)}
                                defaultChecked={getDefaultValue(four, score, game, props.roundNum) >= 1 ? true : false} />

                            {getDefaultValue(four, score, game, props.roundNum) >= 1 && (<div className="extra d-flex">
                                <img src='/icon/extra.svg' alt="img" onClick={e => addExtra(e, four._id, game, props.round)} className="extra-icon" />
                                <input type="text" style={{ display: showInput(four._id, game, props.round) }}
                                    onChange={e => handleInputChange(e, four._id, game, score, net._id, true)} className="extra-input" />
                            </div>)}
                        </div>

                    </div>


                </div>);
            } else if (gor === 3) {
                let one = net.performance[0], two = net.performance[1], three = net.performance[2], four = net.performance[3];
                // 1ST VS 3RD & 2ND VS 4TH 
                return (<div className="f-point d-flex flex-column">
                    <div className="two-p-input two-p-input-2  d-flex flex-column items-center justify-content-center">
                        <div className="point-extra d-flex jusitify-content-center align-items-center">
                            <input className="form-check-input" type="checkbox"
                                onChange={e => handleInputChange(e, one._id, game, score, net._id, false)}
                                defaultChecked={getDefaultValue(one, score, game, props.roundNum) >= 1 ? true : false} />

                            {getDefaultValue(one, score, game, props.roundNum) >= 1 && (<div className="extra d-flex">
                                <img src='/icon/extra.svg' alt="img" onClick={e => addExtra(e, one._id, game, props.round)} className="extra-icon" />
                                <input type="text" style={{ display: showInput(one._id, game, props.round) }}
                                    onChange={e => handleInputChange(e, one._id, game, score, net._id, true)} className="extra-input" />
                            </div>)}
                        </div>

                        <div className="point-extra d-flex jusitify-content-center align-items-center">
                            <input className="form-check-input" type="checkbox"
                                onChange={e => handleInputChange(e, three._id, game, score, net._id, false)}
                                defaultChecked={getDefaultValue(three, score, game, props.roundNum) >= 1 ? true : false} />

                            {getDefaultValue(three, score, game, props.roundNum) >= 1 && (<div className="extra d-flex">
                                <img src='/icon/extra.svg' alt="img" onClick={e => addExtra(e, three._id, game, props.round)} className="extra-icon" />
                                <input type="text" style={{ display: showInput(three._id, game, props.round) }}
                                    onChange={e => handleInputChange(e, three._id, game, score, net._id, true)} className="extra-input" />
                            </div>)}
                        </div>
                    </div>


                    <div className="line"></div>
                    <div className="two-p-input two-p-input-2  d-flex flex-column items-center justify-content-center">
                        <div className="point-extra d-flex jusitify-content-center align-items-center">
                            <input className="form-check-input" type="checkbox"
                                onChange={e => handleInputChange(e, two._id, game, score, net._id, false)}
                                defaultChecked={getDefaultValue(two, score, game, props.roundNum) >= 1 ? true : false} />

                            {getDefaultValue(two, score, game, props.roundNum) >= 1 && (<div className="extra d-flex">
                                <img src='/icon/extra.svg' alt="img" onClick={e => addExtra(e, two._id, game, props.round)} className="extra-icon" />
                                <input type="text" style={{ display: showInput(two._id, game, props.round) }}
                                    onChange={e => handleInputChange(e, two._id, game, score, net._id, true)} className="extra-input" />
                            </div>)}
                        </div>

                        <div className="point-extra d-flex jusitify-content-center align-items-center">
                            <input className="form-check-input" type="checkbox"
                                onChange={e => handleInputChange(e, four._id, game, score, net._id, false)}
                                defaultChecked={getDefaultValue(four, score, game, props.roundNum) >= 1 ? true : false} />

                            {getDefaultValue(four, score, game, props.roundNum) >= 1 && (<div className="extra d-flex">
                                <img src='/icon/extra.svg' alt="img" onClick={e => addExtra(e, four._id, game, props.round)} className="extra-icon" />
                                <input type="text" style={{ display: showInput(four._id, game, props.round) }}
                                    onChange={e => handleInputChange(e, four._id, game, score, net._id, true)} className="extra-input" />
                            </div>)}
                        </div>
                    </div>



                </div>);
            }
        }
    }
    if (score === "pointDeferential") {
        if (net.performance.length < 4) {
            return net.performance.map((p, j) => (
                <div className="f-point-differential d-flex flex-column align-items-center justify-content-center" key={j}>
                    <input
                        type="text"
                        className="form-control"
                        defaultValue={getDefaultValue(p, score, game, props.roundNum) !== "0-0" ? getDefaultValue(p, score, game, props.roundNum) : ""}
                        style={{ width: "80px" }} name={net.sl}
                        onChange={e => handleInputChange(e, p._id, game, score, net._id, false)} />
                </div>
            ));
        } else {
            if (gor >= 1) {
                return (<div className="f-point d-flex flex-column">
                    <div className="two-p-input two-p-i-1 d-flex flex-column align-items-center justify-content-center">
                        <input className="form-control" type="text"
                            onChange={e => handleInputChange(e, net.performance[0]._id, game, score, net._id, false)}
                            defaultValue={getDefaultValue(net.performance[0], score, game, props.roundNum) !== "0-0" ? getDefaultValue(net.performance[0], score, game, props.roundNum) : ""} />
                        <input className="form-control" type="text"
                            onChange={e => handleInputChange(e, net.performance[3]._id, game, score, net._id, false)}
                            defaultValue={getDefaultValue(net.performance[3], score, game, props.roundNum) !== "0-0" ? getDefaultValue(net.performance[3], score, game, props.roundNum) : ""} />
                    </div>
                    <div className="line"></div>

                    <div className="two-p-input two-p-i-2 d-flex flex-column align-items-center justify-content-center">
                        <input className="form-control" type="text"
                            onChange={e => handleInputChange(e, net.performance[1]._id, game, score, net._id, false)}
                            defaultValue={getDefaultValue(net.performance[1], score, game, props.roundNum) !== "0-0" ? getDefaultValue(net.performance[1], score, game, props.roundNum) : ""} />
                        <input className="form-control" type="text"
                            onChange={e => handleInputChange(e, net.performance[2]._id, game, score, net._id, false)}
                            defaultValue={getDefaultValue(net.performance[2], score, game, props.roundNum) !== "0-0" ? getDefaultValue(net.performance[2], score, game, props.roundNum) : ""} />
                    </div>
                </div>);
            } else if (gor === 2) {
                return (<div className="f-point d-flex flex-column">
                    <div className="two-p-input two-p-i-1 d-flex flex-column align-items-center justify-content-center">
                        <input className="form-control" type="text"
                            onChange={e => handleInputChange(e, net.performance[0]._id, game, score, net._id, false)}
                            defaultValue={getDefaultValue(net.performance[0], score, game, props.roundNum) !== "0-0" ? getDefaultValue(net.performance[0], score, game, props.roundNum) : ""} />
                        <input className="form-control" type="text"
                            onChange={e => handleInputChange(e, net.performance[1]._id, game, score, net._id, false)}
                            defaultValue={getDefaultValue(net.performance[1], score, game, props.roundNum) !== "0-0" ? getDefaultValue(net.performance[1], score, game, props.roundNum) : ""} />
                    </div>
                    <div className="line"></div>

                    <div className="two-p-input two-p-i-2 d-flex flex-column align-items-center justify-content-center">
                        <input className="form-control" type="text"
                            onChange={e => handleInputChange(e, net.performance[2]._id, game, score, net._id, false)}
                            defaultValue={getDefaultValue(net.performance[2], score, game, props.roundNum) !== "0-0" ? getDefaultValue(net.performance[2], score, game, props.roundNum) : ""} />
                        <input className="form-control" type="text"
                            onChange={e => handleInputChange(e, net.performance[3]._id, game, score, net._id, false)}
                            defaultValue={getDefaultValue(net.performance[3], score, game, props.roundNum) !== "0-0" ? getDefaultValue(net.performance[3], score, game, props.roundNum) : ""} />
                    </div>
                </div>);
            } else if (gor === 3) {
                return (<div className="f-point d-flex flex-column">
                    <div className="two-p-input two-p-i-1 d-flex flex-column align-items-center justify-content-center">
                        <input className="form-control" type="text"
                            onChange={e => handleInputChange(e, net.performance[0]._id, game, score, net._id, false)}
                            defaultValue={getDefaultValue(net.performance[0], score, game, props.roundNum) !== "0-0" ? getDefaultValue(net.performance[0], score, game, props.roundNum) : ""} />
                        <input className="form-control" type="text"
                            onChange={e => handleInputChange(e, net.performance[2]._id, game, score, net._id, false)}
                            defaultValue={getDefaultValue(net.performance[2], score, game, props.roundNum) !== "0-0" ? getDefaultValue(net.performance[2], score, game, props.roundNum) : ""} />
                    </div>
                    <div className="line"></div>

                    <div className="two-p-input two-p-i-2 d-flex flex-column align-items-center justify-content-center">
                        <input className="form-control" type="text"
                            onChange={e => handleInputChange(e, net.performance[1]._id, game, score, net._id, false)}
                            defaultValue={getDefaultValue(net.performance[1], score, game, props.roundNum) !== "0-0" ? getDefaultValue(net.performance[1], score, game, props.roundNum) : ""} />
                        <input className="form-control" type="text"
                            onChange={e => handleInputChange(e, net.performance[3]._id, game, score, net._id, false)}
                            defaultValue={getDefaultValue(net.performance[3], score, game, props.roundNum) !== "0-0" ? getDefaultValue(net.performance[3], score, game, props.roundNum) : ""} />
                    </div>
                </div>);
            }
        }
    }

    if (score === "score") {
        if (net.performance.length < 4) {
            return net.performance.map((p, j) => (
                <div className="f-point-differential d-flex flex-column align-items-center justify-content-center" key={j}>
                    <input
                        type="text"
                        className="form-control"
                        defaultValue={getDefaultValue(p, score, game, props.roundNum) !== "0-0" ? getDefaultValue(p, score, game, props.roundNum) : ""}
                        style={{ width: "80px" }} name={net.sl}
                        // onChange={e => handleInputChange(e, p._id, game, score, net._id, false)}
                        onChange={e => handleInputChange(e, null, game, score, net._id, false, null, p._id, true, null)} 
                        />
                </div>
            ));
        } else {
            if (gor >= 1) {
                // 1ST & 4TH VS 2ND & 4TH 
                const team1 = { player1: net.performance[0]._id, player2: net.performance[3]._id };
                const team2 = { player1: net.performance[1]._id, player2: net.performance[2]._id }
                return (<div className="f-point d-flex flex-column">
                    <div className="two-p-input two-p-i-1 d-flex flex-column align-items-center justify-content-center">
                        <input className="form-control" type="text"
                            onChange={e => handleInputChange(e, team1, game, score, net._id, false, team2, null, false, 1)}
                            defaultValue={getDefaultValue(net.performance[0], score, game, props.roundNum) !== "0-0" ? getDefaultValue(net.performance[0], score, game, props.roundNum) : ""} />
                        {/* <input className="form-control" type="text"
                            onChange={e => handleInputChange(e, net.performance[3]._id, game, score, net._id, false)}
                            defaultValue={getDefaultValue(net.performance[3], score, game, props.roundNum) !== "0-0" ? getDefaultValue(net.performance[3], score, game, props.roundNum) : ""} /> */}
                    </div>
                    <div className="line"></div>

                    <div className="two-p-input two-p-i-2 d-flex flex-column align-items-center justify-content-center">
                        <input className="form-control" type="text"
                            onChange={e => handleInputChange(e, team2, game, score, net._id, false, team1, null, false, 2)}
                            defaultValue={getDefaultValue(net.performance[1], score, game, props.roundNum) !== "0-0" ? getDefaultValue(net.performance[1], score, game, props.roundNum) : ""} />
                        {/* <input className="form-control" type="text"
                            onChange={e => handleInputChange(e, net.performance[2]._id, game, score, net._id, false)}
                            defaultValue={getDefaultValue(net.performance[2], score, game, props.roundNum) !== "0-0" ? getDefaultValue(net.performance[2], score, game, props.roundNum) : ""} /> */}
                    </div>
                </div>);
            } else if (gor === 2) {
                 // 1ST & 2ND VS 3RD & 4TH 
                const team1 = { player1: net.performance[0]._id, player2: net.performance[1]._id };
                const team2 = { player1: net.performance[2]._id, player2: net.performance[3]._id };
                return (<div className="f-point d-flex flex-column">
                    <div className="two-p-input two-p-i-1 d-flex flex-column align-items-center justify-content-center">
                        <input className="form-control" type="text"
                            onChange={e => handleInputChange(e, team1, game, score, net._id, false, team2, null, false, 1)}
                            defaultValue={getDefaultValue(net.performance[0], score, game, props.roundNum) !== "0-0" ? getDefaultValue(net.performance[0], score, game, props.roundNum) : ""} />
                        {/* <input className="form-control" type="text"
                            onChange={e => handleInputChange(e, net.performance[1]._id, game, score, net._id, false)}
                            defaultValue={getDefaultValue(net.performance[1], score, game, props.roundNum) !== "0-0" ? getDefaultValue(net.performance[1], score, game, props.roundNum) : ""} /> */}
                    </div>
                    <div className="line"></div>

                    <div className="two-p-input two-p-i-2 d-flex flex-column align-items-center justify-content-center">
                        <input className="form-control" type="text"
                            onChange={e => handleInputChange(e, team2, game, score, net._id, false, team1, null, false, 2)}
                            defaultValue={getDefaultValue(net.performance[2], score, game, props.roundNum) !== "0-0" ? getDefaultValue(net.performance[2], score, game, props.roundNum) : ""} />
                        {/* <input className="form-control" type="text"
                            onChange={e => handleInputChange(e, net.performance[3]._id, game, score, net._id, false)}
                            defaultValue={getDefaultValue(net.performance[3], score, game, props.roundNum) !== "0-0" ? getDefaultValue(net.performance[3], score, game, props.roundNum) : ""} /> */}
                    </div>
                </div>);
            } else if (gor === 3) {
                // 1ST & 3RD VS 2ND & 4TH 
                const team1 = { player1: net.performance[0]._id, player2: net.performance[2]._id};
                const team2 = { player1: net.performance[1]._id, player2: net.performance[3]._id};
                return (<div className="f-point d-flex flex-column">
                    <div className="two-p-input two-p-i-1 d-flex flex-column align-items-center justify-content-center">
                        <input className="form-control" type="text"
                            onChange={e => handleInputChange(e, team1, game, score, net._id, false, team2, null, false, 1)}
                            defaultValue={getDefaultValue(net.performance[0], score, game, props.roundNum) !== "0-0" ? getDefaultValue(net.performance[0], score, game, props.roundNum) : ""} />
                        {/* <input className="form-control" type="text"
                            onChange={e => handleInputChange(e, net.performance[2]._id, game, score, net._id, false)}
                            defaultValue={getDefaultValue(net.performance[2], score, game, props.roundNum) !== "0-0" ? getDefaultValue(net.performance[2], score, game, props.roundNum) : ""} /> */}
                    </div>
                    <div className="line"></div>

                    <div className="two-p-input two-p-i-2 d-flex flex-column align-items-center justify-content-center">
                        <input className="form-control" type="text"
                            onChange={e => handleInputChange(e, team2, game, score, net._id, false, team1, null, false, 2)}
                            defaultValue={getDefaultValue(net.performance[1], score, game, props.roundNum) !== "0-0" ? getDefaultValue(net.performance[1], score, game, props.roundNum) : ""} />
                        {/* <input className="form-control" type="text"
                            onChange={e => handleInputChange(e, net.performance[3]._id, game, score, net._id, false)}
                            defaultValue={getDefaultValue(net.performance[3], score, game, props.roundNum) !== "0-0" ? getDefaultValue(net.performance[3], score, game, props.roundNum) : ""} /> */}
                    </div>
                </div>);
            }
        }
    }


}




export default allPerformers;