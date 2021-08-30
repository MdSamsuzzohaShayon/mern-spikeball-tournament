
const updatedPerformance = (pu, roundNum) => {
    // console.log(roundNum);
    if (roundNum == 1) {
        // console.log("Update performance");
        // console.log(pu);
        switch (pu.round) {
            case 1:
                let round1 = new Object();
                if (pu.score.point) round1.point = pu.score.point;
                if (pu.score.pointDeferential) round1.pointDeferential = pu.score.pointDeferential;
                // console.log(round1);
                return { round1 }
            case 2:
                let round2 = new Object();
                if (pu.score.point) round2.point = pu.score.point;
                if (pu.score.pointDeferential) round2.pointDeferential = pu.score.pointDeferential;
                return { round2 }
            case 3:
                let round3 = new Object();
                if (pu.score.point) round3.point = pu.score.point;
                if (pu.score.pointDeferential) round3.pointDeferential = pu.score.pointDeferential;
                return { round3 }
            case 4:
                let round4 = new Object();
                if (pu.score.point) round4.point = pu.score.point;
                if (pu.score.pointDeferential) round4.pointDeferential = pu.score.pointDeferential;
                return { round4 }
        }
    }else if(roundNum == 5){        
        switch (pu.round) {
            case 5:
                let round5 = new Object();
                if (pu.score.point) round5.point = pu.score.point;
                if (pu.score.pointDeferential) round5.pointDeferential = pu.score.pointDeferential;
                return { round5 }
            case 6:
                let round6 = new Object();
                if (pu.score.point) round6.point = pu.score.point;
                if (pu.score.pointDeferential) round6.pointDeferential = pu.score.pointDeferential;
                return { round6 }
            case 7:
                let round7 = new Object();
                if (pu.score.point) round7.point = pu.score.point;
                if (pu.score.pointDeferential) round7.pointDeferential = pu.score.pointDeferential;
                return { round7 }
            case 8:
                let round8 = new Object();
                if (pu.score.point) round8.point = pu.score.point;
                if (pu.score.pointDeferential) round8.pointDeferential = pu.score.pointDeferential;
                return { round8 }
        }
    }
}


module.exports = updatedPerformance;
