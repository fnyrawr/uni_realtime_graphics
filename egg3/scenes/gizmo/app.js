import {Scene3D} from "../../core/scene.js";
import BasicShaderMaterial from "../../materials/basic_shader_material.js";
import {Model} from "../../core/model.js";
import {mat4, vec3} from "../../external_libs/gl-matrix.js";
import {Gizmo} from "./gizmo.js";


class GizmoScene extends Scene3D{

    constructor() {
        super();
        this._model = undefined;
        this._camera.lookAt(vec3.fromValues(1.25, 2, 1.25), vec3.fromValues(0, 0, 0));
    }

    load(appRuntime) {
        super.load(appRuntime);

        let gizmo_mesh = new Gizmo(this.gl);
        let basicMaterial = new BasicShaderMaterial(this.gl, appRuntime.shaderLoader);

        this._gizmo = new Model(gizmo_mesh, basicMaterial);
        this._sceneObjects.push(this._gizmo);
    }

    update(deltaTime) {
        super.update(deltaTime);
        if (this._gizmo === undefined) return;
        mat4.rotateZ(this._gizmo.transform, this._gizmo.transform, deltaTime * 0.0004);
    }

}

export default GizmoScene;