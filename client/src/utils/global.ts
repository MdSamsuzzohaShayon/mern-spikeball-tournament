const NODE_ENV: string = "development";
// const NODE_ENV: string = "production";

let hostname = "http://localhost:4000";

if (NODE_ENV === "production") {
   hostname = "https://youthspikersleague.com/api";
}


export const POINT: string = "point", POINT_DIFFERENTIAL: string = "pointDeferential", SCORE: string = "score", NO_SCORE: string = "noScore", EXTRA_POINT: string = "extraPoint";


export { hostname };