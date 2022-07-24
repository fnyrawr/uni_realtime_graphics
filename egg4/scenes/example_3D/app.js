import {Scene3D} from "../../core/scene.js";
import {Mesh} from "../../core/mesh.js";
import BasicShaderMaterial from "../../materials/basic_shader_material.js";
import {Model} from "../../core/model.js";
import {mat4, vec3} from "../../external_libs/gl-matrix.js";


class ExampleExercise extends Scene3D{

    constructor() {
        super();
        this._model = undefined
    }

    load(appRuntime) {
        super.load(appRuntime);
        let testMesh = new Mesh(this.gl, {
            positions: [-0.2, -0.2, -0.2, 0.2, -0.2, -0.2, 0, -0.2, 0.2, 0, 0.3, 0],
            colors: [1.0, 0, 0, 1, 0, 1.0, 0, 1, 0, 0, 1.0, 1, 1, 1, 1, 1],
            indices: [0, 1, 2, 0, 3, 1, 1, 3, 2, 2, 3, 0],
            primitiveType: this.gl.TRIANGLES
        });
        let basicMaterial = new BasicShaderMaterial(this.gl, appRuntime.shaderLoader);
        this._model = new Model(testMesh, basicMaterial);
        this._sceneObjects.push(this._model);
    }

    update(deltaTime) {
        super.update(deltaTime);
        if (this._model === undefined) return;
        mat4.rotateX(this._model.transform, this._model.transform, deltaTime * 0.001);
        mat4.rotateY(this._model.transform, this._model.transform, deltaTime * 0.002);
        mat4.rotateZ(this._model.transform, this._model.transform, deltaTime * 0.0004);
    }

}

export default ExampleExercise;