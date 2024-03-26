import React from 'react';


interface IWinningPointInputProps{
    defaultValue: number;
    roundNum: number;
    netID: string;
    handleScoreUpdate: (innerGN: number, netID: string, winningPoint: number | null,  score?: number, myTeam?: string[], opTeam?: string[])=> void; // innerGN = game number
}
function WinningPointInput({defaultValue, roundNum, netID, handleScoreUpdate}: IWinningPointInputProps) {
    const handleWinningPointChange=(e: React.SyntheticEvent)=>{
        const inputEl = e.target as HTMLInputElement;
        if (!inputEl.value || inputEl.value === '') return;
        const winningPoint = parseInt(inputEl.value, 10);

        handleScoreUpdate(null, netID, winningPoint);
    }
    return (
        <input
            type="text"
            className="form-control winning-point"
            defaultValue={defaultValue.toFixed(2)}
            onChange={handleWinningPointChange}
        />
    )
}

export default WinningPointInput;