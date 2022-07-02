class Particle {

    constructor(config) {
        this._position = config.position
        this._velocity = config.velocity
        this._size = config.size
        this._lifetime = config.lifetime
        this._elapsedLifetime = 0
        this._lifetimeProgress = 0
    }

    update(deltaTime) {
        // integrate movement properties
        this._position[0] += this._velocity[0]*deltaTime
        this._position[1] += this._velocity[1]*deltaTime
        this._elapsedLifetime += deltaTime
        // lifetime progress 0 ... 1
        this._lifetimeProgress = this._elapsedLifetime / this._lifetime
    }

    render(context) {
        // progress: 0 ... 255
        let progress = this._lifetimeProgress*255
        // size: original size shrinking over lifetime to half of the size
        let size = this._size / (1 + this._lifetimeProgress)
        // gradient between yellow (start) and red (end) with alpha as fade out
        context.fillStyle = "rgba(255,"+(255-progress).toString()+",0,"+(1-this._lifetimeProgress)+")"
        context.fillRect(this._position[0], this._position[1], size, size)
    }

}

export {Particle};