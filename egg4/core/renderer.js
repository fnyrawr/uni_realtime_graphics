import {Model} from "./model.js";
import {mat4} from "../external_libs/gl-matrix.js";

class Renderer {
    constructor() {
        this.clearColor = [50,50,50]
    }
}

class Renderer2D extends Renderer{

    render(context, scene){
        let canvas = context.canvas;
        context.fillStyle = 'rgb(' + this.clearColor.join() + ')';
        context.fillRect(0, 0, canvas.width, canvas.height);
    }

}

class Renderer3D extends Renderer{

    clear(gl) {

        gl.clearColor(this.clearColor[0]/255.0, this.clearColor[1]/255.0, this.clearColor[2]/255.0, 1.0)
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
        // set up depth test to discard occluded fragments
        gl.enable(gl.DEPTH_TEST)
        gl.depthFunc(gl.LESS)

        // only show front geometry
        gl.enable(gl.CULL_FACE)
        gl.cullFace(gl.BACK)

        gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight)

    }

    render(gl, scene){

        this.clear(gl);

        let projectionMatrix = scene.camera.getProjectionMatrix(gl);
        let viewMatrix = scene.camera.getViewMatrix();
        let modelViewMatrix = mat4.create();

        function renderSceneGraph(graph) {

            for (let sceneObject of graph) {

                if (sceneObject instanceof Model || sceneObject.prototype instanceof Model){

                    let model = sceneObject;

                    mat4.multiply(modelViewMatrix, viewMatrix, model.globalTransform);

                    let program = model.program;

                    program.bind()

                    program.setUniform("projectionMatrix", projectionMatrix);
                    program.setUniform("modelViewMatrix", modelViewMatrix);

                    scene.bind(model, program);

                    model.render();

                    program.unsetAttributes();

                }

                if (sceneObject.hasChildren()){
                    renderSceneGraph(sceneObject.children);
                }

            }

        }

        renderSceneGraph(scene.sceneObjects);

    }

}

export {Renderer2D, Renderer3D};