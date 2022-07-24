import {Scene} from "../../core/scene.js";
import {Model} from "../../core/model.js";
import {mat4, vec3} from "../../external_libs/gl-matrix.js";
import Quad from "./meshes/quad.js";
import fullscreen_effect_material from "../../materials/fullscreen_effect_material.js";
import {CONTEXT_TYPE} from "../../utils.js";
import {Camera, CAMERA_TYPE} from "../../core/camera.js";
import textures from "../../core/textures.js";

class ExampleExercise extends Scene {

    constructor() {
        // orthogonal camera (no perspective for fullscreen)
        super(CONTEXT_TYPE.CTX_3D)
        this._camera = new Camera(CAMERA_TYPE.ORTHOGONAL)
        this._camera.orthoScale = 1

        // needs a minimal value vor y to display the plane, maybe bug in framework or something
        this._camera.lookAt(vec3.fromValues(0, 0.0000000000000000000000000000000000001, -1), vec3.fromValues(0, 0, 0))
    }

    get camera() {
        return this._camera;
    }

    set camera(camera) {
        this._camera = camera;
    }

    bind(model, program) {

    }

    load(appRuntime) {
        super.load(appRuntime)

        let fullscreen_quad = new Quad(this.gl)
        this._fullscreenEffectMaterial = new fullscreen_effect_material(this.gl, appRuntime.shaderLoader)

        this._fullscreenQuad = new Model(fullscreen_quad, this._fullscreenEffectMaterial)
        this._sceneObjects.push(this._fullscreenQuad)

    }

    update(deltaTime) {
        super.update(deltaTime)

        this._fullscreenEffectMaterial.update(deltaTime)
    }

}

export default ExampleExercise;