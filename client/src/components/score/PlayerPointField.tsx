import React from 'react'; // Import React
import getDefaultValue from '../../utils/defaultValue';
import { POINT } from '../../utils/global';
import { INet } from '../../types';


interface IPlayersPointFieldProps {
    net: INet;
    gameNum: number;
    gor: number;
}
const PlayersPointField = ({ net, gameNum, gor}: IPlayersPointFieldProps) => {

    const gameKey = `game${gameNum}`;
    // Define the nested function for returning JSX
    const returnPoint = (t1p1, t1p2, t2p1, t2p2) => {

        return (
            <div className="players-in-net">
                <div className="two-p-input two-p-input-1">
                    {t1p1[gameKey].point <= 0 ? <div className="text-danger"></div> : (<div className="text-success">{net.wp && net.wp.toFixed(2)}</div>)}
                    {t1p2[gameKey].point <= 0 ? <div className="text-danger"></div> : (<div className="text-success">{net.wp && net.wp.toFixed(2)}</div>)}
                </div>

                <div className="line"></div>

                <div className="two-p-input two-p-input-2 ">
                    {t2p1[gameKey].point <= 0 ? <div className="text-danger"></div> : (<div className="text-success">{net.wp && net.wp.toFixed(2)}</div>)}
                    {t2p2[gameKey].point <= 0 ? <div className="text-danger"></div> : (<div className="text-success">{net.wp && net.wp.toFixed(2)}</div>)}
                </div>
            </div>
        );
    }

    if (net.performance.length < 4) {
        return (
            <div className="net-less-four">
                {net.performance.map((p, j) => (
                    <div className="short-net-player" key={j}>
                        {!p[gameKey]?.point || p[gameKey]?.point <= 0 ? <div className="text-danger"></div> : (<div className="text-success">{net.wp && net.wp.toFixed(2)}</div>)}
                    </div>
                ))}
            </div>
        );
    } else {
        if (gor === 1) {
            // 1ST & 4TH VS 2ND  4TH 
            let one = net.performance[0], two = net.performance[1], three = net.performance[2], four = net.performance[3];
            return returnPoint(one, four, two, three);

        } else if (gor === 2) {
            let one = net.performance[0], two = net.performance[1], three = net.performance[2], four = net.performance[3];
            // 1ST & 2ND VS 3RD & 4TH 
            return returnPoint(one, two, three, four);
        } else if (gor === 3) {
            let one = net.performance[0], two = net.performance[1], three = net.performance[2], four = net.performance[3];
            // 1ST VS 3RD & 2ND VS 4TH 
            return returnPoint(one, three, two, four);
        }
    }
}

export default PlayersPointField; // Export the component