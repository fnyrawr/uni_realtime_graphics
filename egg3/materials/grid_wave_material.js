import {Material} from "../core/material.js";

class GridWaveMaterial extends Material {

    constructor(glContext, loader) {
        super(loader.program(glContext, 'grid'))

        this._time = 0
        this._rotation = 230
        this._waveFrequency = 7.5
        this._waveSpeed = 0.0025
        this._waveAmplitude = 0.05
    }

    bind() {
        super.bind()

        // 1 degree is about 0.0174533 radians
        let degToRad = 0.0174533
        let angle = this._rotation * degToRad

        // direction vector from angle
        this.directionX = Math.sin(angle)
        this.directionY = Math.cos(angle)

        // set the shader uniform variables
        this._program.setUniform("time", this._time)
        this._program.setUniform("directionX", this.directionX)
        this._program.setUniform("directionY", this.directionY)
        this._program.setUniform("waveFrequency", this._waveFrequency)
        this._program.setUniform("waveSpeed", this._waveSpeed)
        this._program.setUniform("waveAmplitude", this._waveAmplitude)

        this._program.setUniform("lightDir", [1, 1, 1])
        this._program.setUniform("lightColor", [1, 1, 1])
        this._program.setUniform("ambient", [0.5, 0.5, 0.5])
        this._program.setUniform("cameraPos", [1.25, 2, 1.25]) // copied from app.js

    }

    update(deltaTime) {
        this._time += deltaTime
        this._rotation += deltaTime * 0.005
    }

    // for boat position
    getHeightAtPos(x, y) {
        return Math.sin((x*this.directionX + y*this.directionY) * this._waveFrequency + this._time * this._waveSpeed) * this._waveAmplitude
    }

    // get waves rotation
    getWavesRotation(x, y) {
        return ((x*this.directionX + y*this.directionY) * this._waveFrequency + this._time * this._waveSpeed) * 2 - 1
    }

    // get time
    getTime() {
        return this._time * this._waveSpeed
    }

}

export default GridWaveMaterial