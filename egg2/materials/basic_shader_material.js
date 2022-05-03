import {Material} from "../core/material.js";

class BasicShaderMaterial extends Material{

    constructor(glContext, loader) {
        super(loader.program(glContext, 'color'));
    }

}

export default BasicShaderMaterial;