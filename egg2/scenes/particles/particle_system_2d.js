import {rand} from "../../utils.js";
import {Particle} from "./particle.js";

class ParticleSystem2D {

    /*
    * A particle system does the book keeping of particles.
    */
    constructor(config) {
        this._particles = [];
    }

    createParticles() {
        // TODO: implement better creation
        for (let i=0; i<100; ++i) {
            let particle = new Particle({
                position : [0, 0],
                velocity : [rand.rand(-10, 10), rand.rand(-10, 10)],
                size     : 5
            })
            this._particles.push(particle)
        }
    }

    render(context) {
        for (let particle of this._particles) {
            particle.render(context)
        }
    }

    update(deltaTime) {
        // update the particles
        for (let particle of this._particles) {
            particle.update()
        }

        // TODO: more logic over the particles if necessary
    }

}

export {ParticleSystem2D};