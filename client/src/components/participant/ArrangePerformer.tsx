import React from 'react';
import { IPerformance } from '../../types';

interface IArrangePerformer {
    performer: IPerformance[];
    gor: number;
    gameNum: number;
}

const ArrangePerformer: React.FC<IArrangePerformer> = ({ performer, gor, gameNum }) => {
    const gameKey = `game${gameNum}`;

    const getParticipantClass = (score1: number, score2: number, isTeam1: boolean): string => {
        if (score1 > score2) {
            return isTeam1 ? 'text-success' : 'text-danger';
        } else if (score1 < score2) {
            return isTeam1 ? 'text-danger' : 'text-success';
        }
        return '';
    };

    const renderPerformer = (team1: IPerformance[], team2: IPerformance[]) => {
        const team1Score = team1[0][gameKey]?.score || 0;
        const team2Score = team2[0][gameKey]?.score || 0;

        const team1Class = getParticipantClass(team1Score, team2Score, true);
        const team2Class = getParticipantClass(team1Score, team2Score, false);

        return (
            <div className="f-net d-flex flex-column text-center">
                <div className="two-participant team-1">
                    {team1.map((player, index) => (
                        <div key={index} className={`p-rival ${team1Class}`}>
                            {player.participant.firstname} {player.participant.lastname}
                        </div>
                    ))}
                </div>
                <div className="vs text-uppercase">VS</div>
                <div className="two-participant team-2">
                    {team2.map((player, index) => (
                        <div key={index} className={`p-rival ${team2Class}`}>
                            {player.participant.firstname} {player.participant.lastname}
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    const renderShortNetPlayers = () => {
        return (
            <div className="net-less-four">
                {performer.map((p, j) => (
                    <div key={j} className="short-net-player">
                        <div className={`p-rival ${p[gameKey]?.point > 0 ? 'text-success' : ''}`}>
                            {p.participant.firstname} {p.participant.lastname}
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    if (performer.length < 4) {
        return renderShortNetPlayers();
    }

    const [one, two, three, four] = performer;

    switch (gor) {
        case 1:
            return renderPerformer([one, four], [two, three]);
        case 2:
            return renderPerformer([one, two], [three, four]);
        case 3:
            return renderPerformer([one, three], [two, four]);
        default:
            return null;
    }
};

export default ArrangePerformer;
