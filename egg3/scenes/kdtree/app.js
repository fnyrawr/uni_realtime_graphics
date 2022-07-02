import {Scene2D} from "../../core/scene.js";
import KdTreeDemo from "./kdtreedemo.js";


class KdTree extends Scene2D {

    constructor() {
        super();
    }

    _canvasClickListener = (e) => {
        if (this._kdTreeDemo === undefined) return;
        let rect = this.ctx.canvas.getBoundingClientRect();
        this._kdTreeDemo.selectNearestAndSwapColor(e.clientX - rect.left, e.clientY - rect.top);
    }

    load(appRuntime) {
        super.load(appRuntime);
        this._kdTreeDemo = new KdTreeDemo(this.ctx.canvas.width, this.ctx.canvas.height);

        this.ctx.canvas.addEventListener('click', this._canvasClickListener);
    }

    unload() {
        this.ctx.canvas.removeEventListener('click', this._canvasClickListener);
        super.unload();
    }

    update(deltaTime) {
        super.update(deltaTime);
        if (this._kdTreeDemo !== undefined) this._kdTreeDemo.update();
    }

    render() {
        super.render();
        if (this._kdTreeDemo !== undefined) this._kdTreeDemo.render(this.ctx);
    }
}

export default KdTree;