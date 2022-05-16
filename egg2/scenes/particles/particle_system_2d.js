import {rand} from "../../utils.js";
import {Particle} from "./particle.js";

class ParticleSystem2D {

    /*
    * A particle system does the book keeping of particles.
    */
    constructor(config) {
        this._elapsedSpawnTime = 0
        this._spawnInterval = config.spawnInterval

        this._particleMaxCount = config.particleMaxCount
        this._particles = []
        this._countParticles = 0 // current spawned particle count
        this._spawnPosition = config.spawnPosition
        this._velocity = config.velocity
        this._size = config.size
        this._lifetime = config.lifetime
    }

    createParticles() {
        // if particle count less than max count spawn new
        if(this._countParticles < this._particleMaxCount) {
            let particle = new Particle({
                position : [rand.rand(this._spawnPosition[0], this._spawnPosition[1]),
                    rand.rand(this._spawnPosition[0], this._spawnPosition[1])],
                velocity : [rand.rand(this._velocity[0], this._velocity[1]),
                    rand.rand(this._velocity[0], this._velocity[1])],
                size: rand.rand(this._size[0], this._size[1]),
                lifetime: rand.rand(this._lifetime[0], this._lifetime[1])
            })
            this._particles.push(particle)
            this._countParticles += 1
        }

    }

    render(context) {
        for (let particle of this._particles) {
            particle.render(context)
        }
    }

    update(deltaTime) {
        this._elapsedSpawnTime += deltaTime;
        // create particle every spawnInterval
        if(this._elapsedSpawnTime >= this._spawnInterval) {
            this.createParticles()
            this._elapsedSpawnTime %= this._spawnInterval
        }

        // update the particles
        for (let particle of this._particles) {
            if(particle._elapsedLifetime < particle._lifetime) {
                particle.update(deltaTime)
            }
            else {
                // remove particles which exceeded their lifetime
                let index = this._particles.indexOf(particle)
                this._particles.splice(index, 1)
                this._countParticles -= 1
            }

        }

    }

}

export {ParticleSystem2D};