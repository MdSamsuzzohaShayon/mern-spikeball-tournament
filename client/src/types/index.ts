/**
 * For MongoDB Model
 */

export interface IParticipant {
    _id: string;
    firstname: string;
    lastname: string;
    email?:string;
    cell?:string;
    birthdate?:string;
    payment_amount?:string;
    payment_method?:string;
    city?:string;
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

export interface IEvent {
    _id: string;
    title: string;
    date: string;
    participants: IParticipant[];
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

export interface IError{
    msg: string;
}