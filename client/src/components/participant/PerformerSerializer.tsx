import React from 'react';
import { IPerformance } from '../../types';

interface IPerformerSerializerProps{
    performers: IPerformance[]
}

const PerformerSerializer = ({ performers }: IPerformerSerializerProps) => {
    if (performers.length < 4) {
        return (
            <div className="net-less-four-total">
                {performers.map((p, j) => (
                    <div className="player-name player-sl short-net-player" key={j}>{p.participant.firstname} {p.participant.lastname} {p.pre_rank}</div>
                ))}
            </div>
        );
    } else {
        return (
            <div className="players-in-net-total">
                {performers.map((p, j) => (
                    <div className="player-name player-sl" key={j}>{p.participant.firstname} {p.participant.lastname}</div>
                ))}
            </div>
        );
    }
}

export default PerformerSerializer;