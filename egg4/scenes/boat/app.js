import {Scene3D} from "../../core/scene.js";
import {Model} from "../../core/model.js";
import {mat4, vec3} from "../../external_libs/gl-matrix.js";
import Grid from "./meshes/grid.js";
import {loadOBJMesh} from "./meshes/obj_mesh.js";
import GridWaveMaterial from "../../materials/grid_wave_material.js";
import BoatMaterial from "../../materials/boat_material.js";
import textures from "../../core/textures.js";

class ExampleExercise extends Scene3D {

    constructor() {
        super()
        this._camera.lookAt(vec3.fromValues(1.25, 2, 1.25), vec3.fromValues(0, 0, 0))
    }

    load(appRuntime) {
        super.load(appRuntime)

        let waves_grid = new Grid(this.gl, 30, [-1, 1], 30, [-1, 1])
        let boatMaterial = new BoatMaterial(this.gl, appRuntime.shaderLoader, textures.getTexture('boat'))
        this._gridWaveMaterial = new GridWaveMaterial(this.gl, appRuntime.shaderLoader)

        this._waves = new Model(waves_grid, this._gridWaveMaterial)
        this._sceneObjects.push(this._waves)

        loadOBJMesh(this.gl, './scenes/boat/data/pirates_ship_tri.obj', (objMesh) => {
            this._ship = new Model(objMesh, boatMaterial)
            this._sceneObjects.push(this._ship)
        })

    }

    update(deltaTime) {
        super.update(deltaTime)

        this._gridWaveMaterial.update(deltaTime)
        let boatHeight = this._gridWaveMaterial.getHeightAtPos(0, 0)
        let degToRad = 0.0174533

        if (this._ship === undefined) return
        this._ship.transform = mat4.create()
        mat4.rotateX(this._ship.transform, this._ship.transform, 90*degToRad)
        mat4.rotateY(this._ship.transform, this._ship.transform, -(this._gridWaveMaterial.getWavesRotation(0, 0)+135)*degToRad)
        mat4.rotateZ(this._ship.transform, this._ship.transform, Math.sin(this._gridWaveMaterial.getTime()) * 10 * degToRad)
        mat4.translate(this._ship.transform, this._ship.transform, [0, boatHeight, 0])
    }

}

export default ExampleExercise;