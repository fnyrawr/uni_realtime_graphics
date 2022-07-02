import {Material} from "../core/material.js";

class BoatMaterial extends Material{

    constructor(glContext, loader, boatTexture) {
        super(loader.program(glContext, 'boat'));
        this.boatTexture = boatTexture;
    }

    bind() {
        super.bind();
        this.program.setTexture('uSamplerBoat', 0, this.boatTexture);
    }

}

export default BoatMaterial;