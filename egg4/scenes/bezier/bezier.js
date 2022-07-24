import {vec2} from "../../external_libs/gl-matrix.js";

class Bezier{

    // 2b de Casteljau algorithm
    constructor(controlPoints, segments=1000) {
        this.controlPoints = controlPoints;
        this.segments = segments;
        this._progress = 0;

        // data arrays with points of lines
        this._x01Points = [];
        this._y01Points = [];
        this._x12Points = [];
        this._y12Points = [];
        this._x23Points = [];
        this._y23Points = [];
        this._x02Points = [];
        this._y02Points = [];
        this._x13Points = [];
        this._y13Points = [];
        this._xCurve = [];
        this._yCurve = [];

        this.calculateLines()
    }

    calculateLines() {
        for(let i = 0; i < this.segments; i++) {
            this._x01Points[i] = (1-i/this.segments) * this.controlPoints[1].position[0] + i/this.segments * this.controlPoints[0].position[0]
            this._y01Points[i] = (1-i/this.segments) * this.controlPoints[1].position[1] + i/this.segments * this.controlPoints[0].position[1]
            this._x12Points[i] = (1-i/this.segments) * this.controlPoints[0].position[0] + i/this.segments * this.controlPoints[2].position[0]
            this._y12Points[i] = (1-i/this.segments) * this.controlPoints[0].position[1] + i/this.segments * this.controlPoints[2].position[1]
            this._x23Points[i] = (1-i/this.segments) * this.controlPoints[2].position[0] + i/this.segments * this.controlPoints[3].position[0]
            this._y23Points[i] = (1-i/this.segments) * this.controlPoints[2].position[1] + i/this.segments * this.controlPoints[3].position[1]
            this._x02Points[i] = (1-i/this.segments) * this._x01Points[i] + i/this.segments * this._x12Points[i]
            this._y02Points[i] = (1-i/this.segments) * this._y01Points[i] + i/this.segments * this._y12Points[i]
            this._x13Points[i] = (1-i/this.segments) * this._x12Points[i] + i/this.segments * this._x23Points[i]
            this._y13Points[i] = (1-i/this.segments) * this._y12Points[i] + i/this.segments * this._y23Points[i]
            this._xCurve[i] = (1-i/this.segments) * this._x02Points[i] + i/this.segments * this._x13Points[i]
            this._yCurve[i] = (1-i/this.segments) * this._y02Points[i] + i/this.segments * this._y13Points[i]
        }
    }

    drawColorGradient(ctx, x0, y0, x1, y1, color0, color1) {
        // error handling to prevent stopping animation on endpoints
        if(x0 === undefined || y0 === undefined || x1 === undefined || y1 === undefined) return
        ctx.beginPath()
        let grad = ctx.createLinearGradient(x0, y0, x1, y1)
        grad.addColorStop(0, color0)
        grad.addColorStop(1, color1)
        ctx.strokeStyle = grad
        ctx.moveTo(x0, y0)
        ctx.lineTo(x1, y1)
        ctx.stroke()
    }

    update(deltaTime) {
        // Animation, segments = step count
        this._progress += 1
        if(this._progress > this.segments) this._progress = 0
        this.calculateLines()
    }

    render(ctx) {
        // render lines between control points
        ctx.lineWidth = 3
        this.drawColorGradient(ctx, this.controlPoints[1].position[0], this.controlPoints[1].position[1],
            this.controlPoints[0].position[0], this.controlPoints[0].position[1],
            'rgb(255, 0, 0)', 'rgb(0, 153, 0)')
        this.drawColorGradient(ctx, this.controlPoints[0].position[0], this.controlPoints[0].position[1],
            this.controlPoints[2].position[0], this.controlPoints[2].position[1],
            'rgb(0, 153, 0)', 'rgb(255, 0, 255)')
        this.drawColorGradient(ctx, this.controlPoints[2].position[0], this.controlPoints[2].position[1],
            this.controlPoints[3].position[0], this.controlPoints[3].position[1],
            'rgb(255, 0, 255)', 'rgb(51, 51, 255)')

        // render lines between lerp points
        this.drawColorGradient(ctx, this._x01Points[this._progress], this._y01Points[this._progress],
            this._x12Points[this._progress], this._y12Points[this._progress],
            'rgb(255, 0, 0)', 'rgb(0, 153, 0)')
        this.drawColorGradient(ctx, this._x12Points[this._progress], this._y12Points[this._progress],
            this._x23Points[this._progress], this._y23Points[this._progress],
            'rgb(0, 153, 0)', 'rgb(255, 0, 255)')
        this.drawColorGradient(ctx, this._x02Points[this._progress], this._y02Points[this._progress],
            this._x13Points[this._progress], this._y13Points[this._progress],
            'rgb(255, 0, 0)', 'rgb(51, 51, 255)')

        // render points
        ctx.fillStyle = 'rgb(255,0,0)'
        ctx.fillRect(this._x01Points[this._progress]-4, this._y01Points[this._progress]-4, 8, 8)
        ctx.fillStyle = 'rgb(0,153,0)'
        ctx.fillRect(this._x12Points[this._progress]-4, this._y12Points[this._progress]-4, 8, 8)
        ctx.fillStyle = 'rgb(255,0,255)'
        ctx.fillRect(this._x23Points[this._progress]-4, this._y23Points[this._progress]-4, 8, 8)
        ctx.fillStyle = 'rgb(255,0,0)'
        ctx.fillRect(this._x02Points[this._progress]-4, this._y02Points[this._progress]-4, 8, 8)
        ctx.fillStyle = 'rgb(51,51,255)'
        ctx.fillRect(this._x13Points[this._progress]-4, this._y13Points[this._progress]-4, 8, 8)

        ctx.beginPath()
        ctx.moveTo(this._xCurve[0], this._yCurve[0])
        // draw curve
        for(let i = 1; i < this.segments; i++) {
            ctx.lineTo(this._xCurve[i], this._yCurve[i])
        }
        ctx.stroke()

        // render current f(x) point
        ctx.fillStyle = 'rgb(255,255,255)'
        ctx.fillRect(this._xCurve[this._progress]-5, this._yCurve[this._progress]-5, 10, 10)
    }
}

export {Bezier};