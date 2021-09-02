
const updatedPerformance = (pu, roundNum) => {
    // console.log(roundNum);
    // console.log(pu);
    if (roundNum == 1) {
        // console.log("Update performance");
        // console.log(pu);
        switch (pu.game) {
            case 1:
                let game1 = new Object();
                if (pu.score.point && pu.score.pointDeferential) {
                    game1.point = pu.score.point;
                    game1.pointDeferential = pu.score.pointDeferential;
                };
                return { game1 }
            case 2:
                let game2 = new Object();
                if (pu.score.point && pu.score.pointDeferential) {
                    game2.point = pu.score.point;
                    game2.pointDeferential = pu.score.pointDeferential;
                };
                return { game2 }
            case 3:
                let game3 = new Object();
                if (pu.score.point && pu.score.pointDeferential) {
                    game3.point = pu.score.point;
                    game3.pointDeferential = pu.score.pointDeferential;
                };
                return { game3 }
        }
    } else if (roundNum == 2) {
        switch (pu.game) {
            case 4:
                let game4 = new Object();
                if (pu.score.point) game4.point = pu.score.point;
                if (pu.score.pointDeferential) game4.pointDeferential = pu.score.pointDeferential;
                return { game4 }
            case 5:
                let game5 = new Object();
                if (pu.score.point) game5.point = pu.score.point;
                if (pu.score.pointDeferential) game5.pointDeferential = pu.score.pointDeferential;
                return { game5 }
            case 6:
                let game6 = new Object();
                if (pu.score.point) game6.point = pu.score.point;
                if (pu.score.pointDeferential) game6.pointDeferential = pu.score.pointDeferential;
                return { game6 }
        }
    } else if (roundNum == 3) {
        switch (pu.game) {
            case 7:
                let game7 = new Object();
                if (pu.score.point) game7.point = pu.score.point;
                if (pu.score.pointDeferential) game7.pointDeferential = pu.score.pointDeferential;
                return { game7 }
            case 8:
                let game8 = new Object();
                if (pu.score.point) game8.point = pu.score.point;
                if (pu.score.pointDeferential) game8.pointDeferential = pu.score.pointDeferential;
                return { game8 }
            case 9:
                let game9 = new Object();
                if (pu.score.point) game9.point = pu.score.point;
                if (pu.score.pointDeferential) game9.pointDeferential = pu.score.pointDeferential;
                return { game9 }
        }
    }
    else if (roundNum == 4) {
        switch (pu.game) {
            case 10:
                let game10 = new Object();
                if (pu.score.point) game10.point = pu.score.point;
                if (pu.score.pointDeferential) game10.pointDeferential = pu.score.pointDeferential;
                return { game10 }
            case 11:
                let game11 = new Object();
                if (pu.score.point) game11.point = pu.score.point;
                if (pu.score.pointDeferential) game11.pointDeferential = pu.score.pointDeferential;
                return { game11 }
            case 12:
                let game12 = new Object();
                if (pu.score.point) game12.point = pu.score.point;
                if (pu.score.pointDeferential) game12.pointDeferential = pu.score.pointDeferential;
                return { game12 }
        }
    } else if (roundNum == 5) {
        switch (pu.game) {
            case 13:
                let game13 = new Object();
                if (pu.score.point) game13.point = pu.score.point;
                if (pu.score.pointDeferential) game13.pointDeferential = pu.score.pointDeferential;
                return { game13 }
            case 14:
                let game14 = new Object();
                if (pu.score.point) game14.point = pu.score.point;
                if (pu.score.pointDeferential) game14.pointDeferential = pu.score.pointDeferential;
                return { game14 }
            case 15:
                let game15 = new Object();
                if (pu.score.point) game15.point = pu.score.point;
                if (pu.score.pointDeferential) game15.pointDeferential = pu.score.pointDeferential;
                return { game15 }
        }
    }
}


module.exports = updatedPerformance;
