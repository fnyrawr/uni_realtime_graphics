import {SceneObject} from "./scene_object.js";
import {CONTEXT_TYPE} from "../utils.js";

class Model extends SceneObject{

    constructor(mesh, material) {
        super(CONTEXT_TYPE.CTX_3D);
        this._mesh = mesh;
        this._material = material;
    }

    get program() {
        return this._material.program;
    }

    render() {
        this._material.bind();
        this._mesh.bind(this.program);
        this._mesh.render();
    }

}

export {Model}