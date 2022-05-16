import {Scene2D} from "../../core/scene.js";
import {ParticleSystem2D} from "./particle_system_2d.js";

class ParticleScene extends Scene2D {

    constructor() {
        super();
        this.particleSystem = undefined;
    }


    load(appRuntime) {
        super.load(appRuntime);

        // config for particles
        let pSystemConfig = {
            particleMaxCount : 100,
            spawnInterval    : 10,
            spawnPosition    : [-250, 250],
            velocity         : [0.25, 1],
            size             : [5, 15],
            lifetime         : [600, 3000], // at 60Hz 2sec - 10sec lifetime
        }
        // create particle system
        this.particleSystem = new ParticleSystem2D(pSystemConfig);
    }

    update(deltaTime) {
        super.update(deltaTime);
        if(this.particleSystem === undefined) return;
        // update particles
        this.particleSystem.update(deltaTime);
    }

    render() {
        super.render();
        this.particleSystem.render(this.ctx);
    }
}

export default ParticleScene;