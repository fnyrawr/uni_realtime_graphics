class Particle {

    constructor(config) {
        this._position = config.position
        this._velocity = config.velocity
        this._size = config.size
        // TODO: define more properties, e.g. life time
    }

    update() {
        // integrate movement properties
        this._position[0] += this._velocity[0]
        this._position[1] += this._velocity[1]

        // TODO: integrate more properties, e.g. life time
    }

    render(context) {
        // TODO: use the canvas2d context API for more graphics

        // https://www.rapidtables.com/web/color/html-color-codes.html
        context.fillStyle = 'pink'
        context.fillRect(this._position[0], this._position[1], this._size, this._size)
    }

}

export {Particle};