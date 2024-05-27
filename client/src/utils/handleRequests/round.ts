import { hostname } from "../global";

export const getASingleRound = async (eventID: string, roundNum) => {
    try {
        setIsLoading(true);
        
        const response = await fetch(`${hostname}/api/round/get-single-round/${eventID}/${roundNum}`, {
            method: 'GET',
            headers: { "Content-Type": 'application/json' },
        });
        
        const jsonRes = await response.json();
        
        // Log the response for debugging
        console.log("Get nets from round - ", jsonRes);

        // Check and set performances
        if (jsonRes.performances && jsonRes.performances.length > 0) {
            setPerformances(jsonRes.performances);
        }

        // Check and set leftRound
        if (jsonRes.leftRound && jsonRes.leftRound.length > 0) {
            setLeftRound([...jsonRes.leftRound]);
        }

        // Check and set rounds
        if (jsonRes.findRound) {
            setRounds(jsonRes.findRound);

            // Check if nets exist in the round
            if (jsonRes.findRound.nets && jsonRes.findRound.nets.length > 0) {
                setRankPerformanceInNet(jsonRes.rankNets);
                setInitialize(false);
            } else {
                setInitialize(true);
            }
        } else {
            setRounds([]);
            setInitialize(true);
        }

    } catch (error) {
        console.error("Error fetching round data:", error);
    } finally {
        setIsLoading(false);
    }
};
