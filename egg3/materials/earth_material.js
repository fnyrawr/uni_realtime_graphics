import {Material} from "../core/material.js"

class EarthMaterial extends Material{

    constructor(glContext,
                loader,
                nightTexture,
                dayTexture,
                oceanTexture,
                cloudTexture,
                cloudRotation=0) {
        super(loader.program(glContext, 'earth'))
        this.nightTexture = nightTexture
        this.dayTexture = dayTexture
        this.oceanTexture = oceanTexture
        this.cloudTexture = cloudTexture

        this.ambientColor = [0, 0, 0]
        this.diffuseColor = [0.8, 0.8, 0.8]
        this.specularColor = [1, 1, 1]
        this.shininess = 16
    }

    bind() {
        super.bind();
        this.program.setTexture('uSamplerNight', 0, this.nightTexture)
        this.program.setTexture('uSamplerDay', 1, this.dayTexture)
        this.program.setTexture('uSamplerOcean', 2, this.oceanTexture)
        this.program.setTexture('uSamplerCloud', 3, this.cloudTexture)

        this._program.setUniform("material.shininess", this.shininess)
    }

}

export default EarthMaterial;