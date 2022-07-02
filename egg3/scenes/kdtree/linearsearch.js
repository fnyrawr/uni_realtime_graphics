import {distance} from "./kdutils.js";

/*
 * JavaScript / Canvas teaching framework
 * (C)opyright Arnold Schwarz, arnold.schwarz@beuth-hochschule.de
 */

class LinearSearch {

    constructor(points){
        this.points = points;
    }

    findNearestNeighbor(x, y) {

        let query = {x: x, y: y};
        let closest = this.points[0];
        let closestDistance = distance(closest, query);

        for (let pt of this.points){
            let dist = distance(pt, query);
            if (dist < closestDistance){
                closestDistance = dist;
                closest = pt;
            }
        }

        return closest;
    }
}

export default LinearSearch;