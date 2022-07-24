import Point2D from "./point2d.js";
import KdTree from "./kdtree.js";
import LinearSearch from "./linearsearch.js";

/*
 * JavaScript / Canvas teaching framework
 * (C)opyright Arnold Schwarz, arnold.schwarz@beuth-hochschule.de
 */


function drawKdTree(context, treeNode){

    if(treeNode.dim === 'x'){
        context.beginPath();
        context.strokeStyle = '#ff0000';
        context.moveTo(treeNode.point.x, treeNode.bbox.minY);
        context.lineTo(treeNode.point.x, treeNode.bbox.maxY);
        context.stroke();
    }else{
        context.beginPath();
        context.strokeStyle = '#00ff00';
        context.moveTo(treeNode.bbox.minX, treeNode.point.y);
        context.lineTo(treeNode.bbox.maxX, treeNode.point.y);
        context.stroke();
    }

    if(treeNode.leftChild !== undefined){
        drawKdTree(context, treeNode.leftChild);
    }

    if(treeNode.rightChild !== undefined){
        drawKdTree(context, treeNode.rightChild);
    }

}


class KdTreeDemo {

    constructor(width, height, numberOfPoints = 100, numberOfPointsToSelect= 10){
        this.width = width;
        this.height = height;
        this.numberOfPoints = numberOfPoints;
        this.numberOfPointsToSelect = numberOfPointsToSelect;
        this.points = [];
        this.pointsToSelect = [];
        this.linearSearch = undefined;
        this.kdTree = undefined;
        this.drawTree = false;
        this.reset();
    }

    selectNearestAndSwapColor(x, y){

        console.time('linear search');
        let nn1 = this.linearSearch.findNearestNeighbor(x, y);
        console.timeEnd('linear search');

        console.time('k-d Tree search');
        let nn2 = this.kdTree.findNearestNeighbor(x,y);
        console.timeEnd('k-d Tree search');

        console.assert(nn1 === nn2, 'the two founded objects are not identical');

        if (nn1.color === '#ff00ff') {
            nn1.color = '#000000';
            let index = this.pointsToSelect.indexOf(nn1);
            if (index > -1) {
                this.pointsToSelect.splice(index, 1);
            }
        }

    }

    reset(){
        
        this.points = []
        this.pointsToSelect = []
        
        for(let i = 0; i < this.numberOfPoints; i++){

            let point = new Point2D(
                Math.random() * this.width,
                Math.random() * this.height,
            );

            this.points.push(point);

            if (i < this.numberOfPointsToSelect){
                point.color = '#ff00ff';
                this.pointsToSelect.push(point);
            }

        }

        this.linearSearch = new LinearSearch(this.points);
        console.time("k-d Tree build");
        this.kdTree = new KdTree(this.points, this.width, this.height);
        console.timeEnd("k-d Tree build");

    }

    render(context) {

        for(let point of this.points) {
            point.render(context);
        }

        if(this.drawTree){
            drawKdTree(context, this.kdTree.root);
        }

    }

    update() {
        if(this.pointsToSelect.length === 0){
            this.reset();
        }
    }

}

export default KdTreeDemo