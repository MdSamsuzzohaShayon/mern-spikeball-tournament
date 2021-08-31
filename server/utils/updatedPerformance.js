
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
    } else if (roundNum == 5) {
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
    } else if (roundNum == 9) {
        switch (pu.round) {
            case 9:
                let round9 = new Object();
                if (pu.score.point) round9.point = pu.score.point;
                if (pu.score.pointDeferential) round9.pointDeferential = pu.score.pointDeferential;
                return { round9 }
            case 10:
                let round10 = new Object();
                if (pu.score.point) round10.point = pu.score.point;
                if (pu.score.pointDeferential) round10.pointDeferential = pu.score.pointDeferential;
                return { round10 }
            case 11:
                let round11 = new Object();
                if (pu.score.point) round11.point = pu.score.point;
                if (pu.score.pointDeferential) round11.pointDeferential = pu.score.pointDeferential;
                return { round11 }
            case 12:
                let round12 = new Object();
                if (pu.score.point) round12.point = pu.score.point;
                if (pu.score.pointDeferential) round12.pointDeferential = pu.score.pointDeferential;
                return { round12 }
        }
    }
    else if (roundNum == 13) {
        switch (pu.round) {
            case 13:
                let round13 = new Object();
                if (pu.score.point) round13.point = pu.score.point;
                if (pu.score.pointDeferential) round13.pointDeferential = pu.score.pointDeferential;
                return { round13 }
            case 14:
                let round14 = new Object();
                if (pu.score.point) round14.point = pu.score.point;
                if (pu.score.pointDeferential) round14.pointDeferential = pu.score.pointDeferential;
                return { round14 }
            case 15:
                let round15 = new Object();
                if (pu.score.point) round15.point = pu.score.point;
                if (pu.score.pointDeferential) round15.pointDeferential = pu.score.pointDeferential;
                return { round15 }
        }
    }
}


module.exports = updatedPerformance;
