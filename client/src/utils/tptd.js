import { round1Total, round2Total, round3Total, round4Total } from './addTotalPoint';
import { round1TD, round2TD, round3TD, round4TD } from './pointDeferential';

export const getTotalPointOfARound = (p, rn) => {
    // console.log(p);
    // console.log(rn);
    if (rn === 2) {
        return round1Total(p);
    } else if (rn === 3) {
        return round1Total(p) + round2Total(p);
    } else if (rn === 4) {
        return round1Total(p) + round2Total(p) + round3Total(p);
    } else if (rn === 5) {
        return round1Total(p) + round2Total(p) + round3Total(p) + round4Total(p);
    }
}


export const getTotalPointDifferentialOfARound = (p, rn) => {
    // console.log(p);
    // console.log(rn);
    if (rn === 2) {
        return round1TD(p);
    } else if (rn === 3) {
        return round1TD(p) + round2TD(p);
    } else if (rn === 4) {
        return round1TD(p) + round2TD(p) + round3TD(p);
    } else if (rn === 5) {
        return round1TD(p) + round2TD(p) + round3TD(p) + round4TD(p);
    }
}
