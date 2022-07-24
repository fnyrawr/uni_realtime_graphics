import {Scene3D} from "../../core/scene.js";
import EarthMaterial from "../../materials/earth_material.js";
import textures from "../../core/textures.js";
import Sphere from "./meshes/sphere.js";
import {mat4, vec4, vec3, mat3} from "../../external_libs/gl-matrix.js";
import {Model} from "../../core/model.js";


class EarthScene extends Scene3D{

    constructor() {
        super();
        this._camera.lookAt(vec3.fromValues(1, 1, 1), vec3.fromValues(0, 0, 0))
        this.ambientLight = [0.25, 0.25, 0.25];
        this.light = {
            position: [... vec3.fromValues(5, 5, -5)],
            color: [1.0, 1.0, 1.0]
        };
        this.time = 0;

    }

    load(appRuntime) {
        super.load(appRuntime);

        let sphereMesh = new Sphere(this.gl, 50, 50)
        let degToRad = 0.0174533

        // basic surface sphere
        let basicSurfaceTransform = mat4.create();
        mat4.rotateX(basicSurfaceTransform, basicSurfaceTransform, 90 * degToRad)
        mat4.scale(basicSurfaceTransform, basicSurfaceTransform, vec3.fromValues(0.5, 0.5, 0.5));
        mat4.translate(basicSurfaceTransform, basicSurfaceTransform, vec3.fromValues(0, 0, 0));

        let earthMaterial = new EarthMaterial(this.gl, appRuntime.shaderLoader,
            textures.getTexture('earthNight'),
            textures.getTexture('earthDay'),
            textures.getTexture('earthOcean'),
            textures.getTexture('earthCloud'))
        this._sphere = new Model(sphereMesh, earthMaterial)
        this._sphere.transform = basicSurfaceTransform
        this._sphere._material.diffuseColor = [1, 1, 1]

        this._sceneObjects.push(this._sphere)

    }

    update(deltaTime) {
        super.update(deltaTime);

        this.time += deltaTime;
        let rotationAngle = deltaTime * Math.PI * 0.00007
        let rotationAngleLight = deltaTime * Math.PI * -0.000015
        let rotationMatrix = mat4.create()
        let rotationMatrixLight = mat4.create()
        mat4.identity(rotationMatrix)
        mat4.identity(rotationMatrixLight)
        mat4.rotateZ(rotationMatrix, rotationMatrix, rotationAngle)
        mat4.rotateZ(rotationMatrixLight, rotationMatrixLight, rotationAngleLight)

        vec3.transformMat4(this._camera.eye, this._camera.eye, rotationMatrix);
        vec3.transformMat4(this.light.position, this.light.position, rotationMatrixLight);
    }

    bind(model, program) {
        if(program.name === 'earth'){

            let modelViewMatrix = mat4.create()
            mat4.multiply(modelViewMatrix, this._camera.getViewMatrix(), model.globalTransform)

            // create normal matrix for lighting calculations
            let normalMatrix = mat3.create()
            mat3.fromMat4(normalMatrix, modelViewMatrix)
            mat3.invert(normalMatrix, normalMatrix)
            mat3.transpose(normalMatrix, normalMatrix)

            // create light position and transform it
            let lightPosition = []
            vec3.transformMat4(lightPosition, this.light.position, this._camera.getViewMatrix())

            // set uniforms
            program.setUniform("light.position", lightPosition)
            program.setUniform("normalMatrix", normalMatrix)
            program.setUniform("time", this.time)
        }
    }

}

export default EarthScene;