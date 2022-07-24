import {Material} from "../core/material.js";

class BasicPhongMaterial extends Material{

    constructor(glContext, loader, ambientColor=[0, 0, 0], diffuseColor=[0.8, 0.8, 0.8], specularColor=[0, 0, 0], shininess=32) {
        super(loader.program(glContext, 'phong'));
        this.ambientColor = ambientColor;
        this.diffuseColor = diffuseColor;
        this.specularColor = specularColor;
        this.shininess = shininess;
    }

    bind() {
        super.bind();

        // set uniforms
        this._program.setUniform("material.ambient", this.ambientColor)
        this._program.setUniform("material.diffuse", this.diffuseColor)
        this._program.setUniform("material.specular", this.specularColor)
        this._program.setUniform("material.shininess", this.shininess)

    }

}

export default BasicPhongMaterial;