import {vec2} from "../../external_libs/gl-matrix.js";

class ControlPoint {

    constructor(position, size, color){
        this.position = position;
        this.size = size;
        this.color = color
    }

    render(ctx) {
        ctx.beginPath();
        ctx.arc(this.position[0], this.position[1], this.size, 0, 2 * Math.PI);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

}


class ControlPointHandler {

    constructor(ctx, controlPointSize=8) {
        this.ctx = ctx;
        this.canvasWidth = ctx.canvas.width;
        this.canvasHeight = ctx.canvas.height;
        this.controlPointSize = controlPointSize;
        let qw = this.canvasWidth / 4;
        let qh = this.canvasHeight / 4;
        this.controlPoints = [
            new ControlPoint(vec2.fromValues(qw * 2, qh), controlPointSize, 'green'),
            new ControlPoint(vec2.fromValues(qw, qh * 2), controlPointSize, 'red'),
            new ControlPoint(vec2.fromValues(qw * 3, qh * 2), controlPointSize, 'magenta'),
            new ControlPoint(vec2.fromValues( qw * 2, qh * 3), controlPointSize, 'blue'),
        ];

        this.setupMouseController(ctx);
    }

    setupMouseController(ctx) {

        let selectedPoint = undefined;

        function mousePosition(event) {
            let rect = ctx.canvas.getBoundingClientRect();
            return vec2.fromValues(event.clientX - rect.left, event.clientY - rect.top);
        }

        let mousedownListener = (e) => {
            let mousePos = mousePosition(e);

            for (let cp of this.controlPoints) {
                let dist = vec2.distance(mousePos, cp.position);
                if (dist < this.controlPointSize) {
                    selectedPoint = cp;
                }
            }
        }

        let mousemoveListener = (e) => {
            if (selectedPoint === undefined)return;

            selectedPoint.position = mousePosition(e);
        }

        let mouseupListener = (e) => {
            selectedPoint = undefined;
        }

        ctx.canvas.addEventListener('mousedown', mousedownListener);

        ctx.canvas.addEventListener('mousemove', mousemoveListener);

        ctx.canvas.addEventListener('mouseup', mouseupListener);

        this._eventListeners = [{type: 'mousedown', listener: mousedownListener},
            {type: 'mouseup', listener: mouseupListener},
            {type: 'mousemove', listener: mousemoveListener}];

    }

    render(ctx) {
        for (let cp of this.controlPoints) {
            cp.render(ctx);
        }
    }

    destroy() {
        for (let el of this._eventListeners) {
            this.ctx.canvas.removeEventListener(el.type, el.listener);
        }
    }

}

export {ControlPoint, ControlPointHandler};