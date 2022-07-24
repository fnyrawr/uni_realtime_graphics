import {Material} from "../core/material.js"

class FullscreenEffectMaterial extends Material {

    constructor(glContext, loader) {
        super(loader.program(glContext, 'waves'))

        this._time = 0
        this._width = glContext.drawingBufferWidth
        this._height = glContext.drawingBufferHeight
    }

    bind() {
        super.bind()

        // set the shader uniform variables
        this._program.setUniform("time", this._time)
        this._program.setUniform("screenWidth", this._width)
        this._program.setUniform("screenHeight", this._height)

    }

    update(deltaTime) {
        this._time += deltaTime
    }

}

export default FullscreenEffectMaterial