/*
 * JavaScript / Canvas teaching framework
 * (C)opyright Arnold Schwarz, arnold.schwarz@beuth-hochschule.de
 */

/**
 * euclidean distance between the two points
 * @param p0
 * @param p1
 * @returns {number}
 */
function distance(p0, p1) {
    return Math.sqrt( (p0.x-p1.x)*(p0.x-p1.x) + (p0.y-p1.y)*(p0.y-p1.y) );
}


/**
 * Sorting the list with respect to the dimension flag and return the median index
 * @param points
 * @param dim
 * @returns {number}
 */
function sortAndMedian(points, dim = 'x') {

    points.sort( function(a,b) {
        return a[dim] - b[dim];
    });

    return Math.floor(points.length/2);

}

export {distance, sortAndMedian};