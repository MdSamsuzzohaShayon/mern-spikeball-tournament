const NODE_ENV: string = "development";
// const NODE_ENV: string = "production";

let hostname = "http://localhost:4000";

if (NODE_ENV === "production") {
   hostname = "https://api.youthspikersleague.com";
}


export const POINT = "point", POINT_DIFFERENTIAL = "pointDeferential", SCORE = "score", NO_SCORE = "noScore", EXTRA_POINT = "extraPoint";


export { hostname };