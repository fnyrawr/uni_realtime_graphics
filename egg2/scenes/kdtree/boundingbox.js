/*
 * JavaScript / Canvas teaching framework
 * (C)opyright Arnold Schwarz, arnold.schwarz@beuth-hochschule.de
 */

class BoundingBox{

    constructor(minX, minY, maxX, maxY) {
        this.minX = minX;
        this.minY = minY;
        this.maxX = maxX;
        this.maxY = maxY;
    }

    /**
     * euclidean distance from point to closest point on this axis-aligned rectangle
     *
     * @param point
     * @returns {number}
     */
    distanceTo(point) {
        let dx = 0.0, dy = 0.0;
        if (point.x < this.minX) {
            dx = point.x - this.minX;
        } else if (point.x > this.maxX) {
            dx = point.x - this.maxX;
        }

        if (point.y < this.minY) {
            dy = point.y - this.minY;
        } else if (point.y > this.maxY) {
            dy = point.y - this.maxY;
        }

        return Math.sqrt(dx*dx + dy*dy);
    };

    /**
     * Create a copy of this BoundingBox
     * @returns {BoundingBox}
     */
    copy(){
        return new BoundingBox(
            this.minX,
            this.minY,
            this.maxX,
            this.maxY
        )
    }

}

export default BoundingBox;