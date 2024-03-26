/**
 * For MongoDB Model
 */
export interface IParticipant {
    _id: string;
    firstname: string;
    lastname: string;
}

export interface IPerformance {
    _id: string;
    pre_rank: number;
    participant: IParticipant;
}
export interface INet {
    _id: string;
    performance:IPerformance[];
    sl: number;
    wp: number;
}


/**
 * Temporary data
 */


export interface ITeam {
    players: string[];
    score: number | null;
}


export interface IUpdateScore{
    game: number | string;
    wp: null | number; // winning point
    netID: string;
    team1: ITeam;
    team2: ITeam;
}