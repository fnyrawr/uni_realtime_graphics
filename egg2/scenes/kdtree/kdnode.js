/*
 * JavaScript / Canvas teaching framework
 * (C)opyright Arnold Schwarz, arnold.schwarz@beuth-hochschule.de
 */

class KdNode {

    /**
     * kd Tree node
     *
     * @param point - to store in the node
     * @param dim - kd Tree dimension ('x' or 'y')
     * @param bbox - respective BoundingBox
     * @param leftChild - left Child Node
     * @param rightChild - right Child Node
     */
    constructor(point, dim, bbox, leftChild, rightChild) {

        this.point = point;
        this.dim = dim;
        this.bbox = bbox;

        this.leftChild = leftChild;
        this.rightChild = rightChild;

    }

}

export default KdNode;