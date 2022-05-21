import KdNode from "./kdnode.js";
import BoundingBox from "./boundingbox.js";
import {distance, sortAndMedian} from "./kdutils.js";
import kdnode from "./kdnode.js";

/*
 * JavaScript / Canvas teaching framework
 * (C)opyright Arnold Schwarz, arnold.schwarz@beuth-hochschule.de
 */

let canvasWidth
let canvasHeight

/**
 * Function to build the kd tree
 * @param points - list of Point2D objects
 * @param dim - dimension 'x' or 'y'
 * @param parent - parent KdNode (undefined if root node)
 * @param isLeftChild - flag to indicate whether this becomes the left child of the parent object
 * @returns {KdNode}
 */
function buildKdTree(points, dim = 'x', parent, isLeftChild=true) {

    // reference: https://github.com/ubilabs/kd-tree-javascript/blob/master/kdTree.js

    // Note: We need to compute the bounding box for EACH new 'node'
    //       to be able to query correctly
    if(points.length === 0) return

    // Sort points and determine the median index
    let median = sortAndMedian(points, dim)

    // Calculate the new bounding box based on the parent node (if root, the canvas size is the size of the bounding box)
    // bounding box from parent left down to parent right up
    let bbox = new BoundingBox(0, 0, canvasWidth, canvasHeight)

    if(parent) {
        if (dim === 'x') {
            if (isLeftChild) {
                bbox = new BoundingBox(parent.bbox.minX, parent.bbox.minY, parent.bbox.maxX, parent.point.y)
            } else {
                bbox = new BoundingBox(parent.bbox.minX, parent.point.y, parent.bbox.maxX, parent.bbox.maxY)
            }
        } else {
            if (isLeftChild) {
                bbox = new BoundingBox(parent.bbox.minX, parent.bbox.minY, parent.point.x, parent.bbox.maxY)
            } else {
                bbox = new BoundingBox(parent.point.x, parent.bbox.minY, parent.bbox.maxX, parent.bbox.maxY)
            }
        }
    }

    // Create new node with median point, dimension flag and bounding box
    let node = new kdnode(points[median], dim, bbox, undefined, undefined)

    // Add the node to the parent node (respecting the child flag)
    if(parent) {
        if (isLeftChild) {
            parent.leftChild = node
        } else {
            parent.rightChild = node
        }
    }

    // Define next dimension flag
    dim = (dim === 'x') ? 'y' : 'x'

    // Create left and right subtrees (divide points for left and right)
    let leftPoints = points.slice(0, median)
    let rightPoints = points.slice(median + 1)
    if(leftPoints.length >= 0) buildKdTree(leftPoints, dim, node, true)
    if(rightPoints.length >= 0) buildKdTree(rightPoints, dim, node, false)

    return node

}


class KdTree{


    constructor(points, width, height) {
        canvasWidth = width;
        canvasHeight = height;
        this.points = points;
        this.root = buildKdTree(points);
    }

    findNearestNeighbor(x, y) {

        let query = {x: x, y: y};
        let closest = this.root;
        let closestDistance = distance(closest.point, query);

        function fnn(node, dim) {

            if( !node ) {
                return;
            }

            let dist = distance(node.point, query);
            if( dist < closestDistance ) {
                closestDistance = dist;
                closest = node;
            }

            let a, b;
            if ( query[dim] < node.point[dim]) {
                a = node.leftChild;
                b = node.rightChild;
            } else {
                a = node.rightChild;
                b = node.leftChild;
            }

            let nextDim = (dim === 'x') ? 'y' : 'x';

            if( a && a.bbox.distanceTo(query) < closestDistance) {
                fnn(a, nextDim);
            }

            if( b && b.bbox.distanceTo(query) < closestDistance) {
                fnn(b, nextDim);
            }

        }

        fnn(this.root, 'x')

        return closest.point;

    }

}

export default KdTree;