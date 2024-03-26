import React from 'react';
import { IError, IParticipant } from '../../types';
import ParticipantRow from './ParticipantRow';

interface IParticipantListProps{
    participants: IParticipant[];
    updateEvent: (u: boolean)=> void;
    setErrorList: React.Dispatch<React.SetStateAction<IError[]>>;
}

function ParticipantList({participants, setErrorList, updateEvent}: IParticipantListProps) {
    return (
        <div className="table-responsive">
            <table className="table table-bordered table-hover participant-table">
                <thead className="bg-dark text-light">
                    <tr>
                        <th scope="col">SL</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Cell</th>
                        <th scope="col">Birthdate</th>
                        <th scope="col">Payment Amount</th>
                        <th scope="col">Payment Method</th>
                        <th scope="col">City</th>
                        <th scope="col">Handle</th>
                    </tr>
                </thead>
                <tbody>
                    {participants.map((p, i) => (
                        <ParticipantRow index={i} participant={p} key={i} setErrorList={setErrorList} updateEvent={updateEvent} />
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default ParticipantList;