import {Scene2D} from "../../core/scene.js";
import {vec2} from "../../external_libs/gl-matrix.js";

class ExampleExercise extends Scene2D{

    constructor() {
        super();
        this.position = vec2.fromValues(0, 0);
        this.boxSize = vec2.fromValues(40,40);
        this.speed = 0.8;
        this.direction = vec2.random(vec2.create());
        this.canvasSize = vec2.fromValues(0,0);
    }

    load(appRuntime) {
        super.load(appRuntime);
        this.canvasSize[0] = this.ctx.canvas.width - this.boxSize[0];
        this.canvasSize[1] = this.ctx.canvas.height - this.boxSize[1];
    }

    update(deltaTime) {
        super.update(deltaTime);
        let deltaLength = deltaTime * this.speed;
        let newPos = vec2.add(vec2.create(), this.position, vec2.scale(vec2.create(), this.direction, deltaLength));
        if(newPos[0] <= 0 || newPos[0] >= this.canvasSize[0] || newPos[1] <= 0 || newPos[1] >= this.canvasSize[1]){
            this.direction = vec2.random(vec2.create());
            newPos = vec2.add(vec2.create(), this.position, vec2.scale(vec2.create(), this.direction, deltaLength));
            if(newPos[0] <= 0 || newPos[0] >= this.canvasSize[0]) this.direction[0]  =  -this.direction[0];
            if(newPos[1] <= 0 || newPos[1] >= this.canvasSize[1]) this.direction[1]  =  -this.direction[1];
            newPos = vec2.add(vec2.create(), this.position, vec2.scale(vec2.create(), this.direction, deltaLength));
        }
        this.position = newPos;
    }

    render() {
        super.render();
        this.ctx.fillStyle = 'red';
        this.ctx.fillRect(this.position[0], this.position[1], this.boxSize[0], this.boxSize[1]);
    }

}

export default ExampleExercise;