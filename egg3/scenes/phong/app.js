import {Scene3D} from "../../core/scene.js";
import BasicPhongMaterial from "../../materials/basic_phong_material.js";
import Sphere from "./meshes/sphere.js";
import {mat4, vec4, vec3, mat3} from "../../external_libs/gl-matrix.js";
import {Model} from "../../core/model.js";


class PhongScene extends Scene3D{

    constructor() {
        super();
        this._spheres = {
            red: undefined,
            green: undefined,
            blue: undefined
        }
        this._camera.lookAt(vec3.fromValues(1, 1, 1), vec3.fromValues(0, 0, 0));
        this.ambientLight = [0.25, 0.25, 0.25];
        this.light = {
            position: this._camera.eye,
            color: [1.0, 1.0, 1.0]
        };

    }

    load(appRuntime) {
        super.load(appRuntime);

        let sphereMesh = new Sphere(this.gl, 50, 50);

        // green sphere
        let greenSphereTransform = mat4.create();
        mat4.scale(greenSphereTransform, greenSphereTransform, vec3.fromValues(0.25, 0.25, 0.25));
        mat4.translate(greenSphereTransform, greenSphereTransform, vec3.fromValues(0, 0, 0));

        this._spheres.green = new Model(sphereMesh, new BasicPhongMaterial(this.gl, appRuntime.shaderLoader, [0, 0.4, 0], [0, 0.8, 0]))
        this._spheres.green.transform = greenSphereTransform
        this._spheres.green._material.diffuseColor = [0, 1, 0]

        this._sceneObjects.push(this._spheres.green)

        // red sphere
        let redSphereTransform = mat4.create();
        mat4.scale(redSphereTransform, redSphereTransform, vec3.fromValues(0.25, 0.5, 0.75));
        mat4.translate(redSphereTransform, redSphereTransform, vec3.fromValues(1, 1, -1));

        this._spheres.red = new Model(sphereMesh, new BasicPhongMaterial(this.gl, appRuntime.shaderLoader, [0, 0.4, 0], [0, 0.8, 0]))
        this._spheres.red.transform = redSphereTransform
        this._spheres.red._material.diffuseColor = [1, 0, 0]

        this._sceneObjects.push(this._spheres.red)

        // blue sphere
        let blueSphereTransform = mat4.create();
        mat4.scale(blueSphereTransform, blueSphereTransform, vec3.fromValues(0.75, 0.5, 0.25));
        mat4.translate(blueSphereTransform, blueSphereTransform, vec3.fromValues(-1, -1, 1));

        this._spheres.blue = new Model(sphereMesh, new BasicPhongMaterial(this.gl, appRuntime.shaderLoader, [0, 0.4, 0], [0, 0.8, 0]))
        this._spheres.blue.transform = blueSphereTransform
        this._spheres.blue._material.diffuseColor = [0, 0, 1]

        this._sceneObjects.push(this._spheres.blue)

    }

    update(deltaTime) {
        super.update(deltaTime);

        let rotationAngle = deltaTime * Math.PI * 0.0002;
        let rotationMatrix = mat4.create();
        mat4.identity(rotationMatrix);
        mat4.rotateZ(rotationMatrix, rotationMatrix, rotationAngle);

        vec3.transformMat4(this._camera.eye, this._camera.eye, rotationMatrix);
    }

    bind(model, program) {
        if(program.name === 'phong'){

            let modelViewMatrix = mat4.create();
            mat4.multiply(modelViewMatrix, this._camera.getViewMatrix(), model.globalTransform);

            // create normal matrix for lighting calculations
            let normalMatrix = mat3.create()
            mat3.fromMat4(normalMatrix, modelViewMatrix)
            mat3.invert(normalMatrix, normalMatrix)
            mat3.transpose(normalMatrix, normalMatrix)

            // create light position and transform it
            let lightPosition = vec4.fromValues(9, 1, 0, 1)
            vec4.multiply(lightPosition, lightPosition, normalMatrix)

            // set uniforms
            program.setUniform("light.position", [lightPosition[0], lightPosition[1], lightPosition[2]])
            program.setUniform("light.color", [1, 1, 1])
            program.setUniform("ambientLight", [0.1, 0.1, 0.1])
            program.setUniform("normalMatrix", normalMatrix)
        }
    }

}

export default PhongScene;