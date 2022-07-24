import {Scene2D} from "../../core/scene.js";
import {ControlPointHandler} from "./control_point.js";
import {Bezier} from "./bezier.js";


class BezierCurve extends Scene2D {

    constructor() {
        super();
    }


    load(appRuntime) {
        super.load(appRuntime);
        this.ctrlPtsHandler = new ControlPointHandler(this.ctx);
        this.bezier = new Bezier(this.ctrlPtsHandler.controlPoints, 100);
    }

    unload() {
        this.ctrlPtsHandler.destroy();
        super.unload();
    }

    update(deltaTime) {
        super.update(deltaTime);
        if(this.bezier) this.bezier.update(deltaTime);
    }

    render() {
        super.render();
        this.ctrlPtsHandler.render(this.ctx);
        this.bezier.render(this.ctx);
    }
}

export default BezierCurve;