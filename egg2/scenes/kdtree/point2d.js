/*
 * JavaScript / Canvas teaching framework
 * (C)opyright Arnold Schwarz, arnold.schwarz@beuth-hochschule.de
 */

class Point2D{

    constructor(x, y, color='#000000') {
        this.x = x;
        this.y = y;
        this.color = color;
    }

    copy() {
        return new Point2D(this.x, this.y, this.color);
    }

    render(context) {
        context.fillStyle = this.color;
        context.fillRect(this.x-1, this.y-1, 3, 3);
    }

    update() {}
}

export default Point2D;