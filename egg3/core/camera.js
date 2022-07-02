import {vec3, mat4} from "../external_libs/gl-matrix.js";

const CAMERA_TYPE = Object.freeze({
    PERSPECTIVE: Symbol('perspective'),
    ORTHOGONAL: Symbol('orthogonal')
});

class Camera{

    constructor(cameraType=CAMERA_TYPE.PERSPECTIVE) {

        this.cameraType = cameraType;

        this.eye = vec3.fromValues(0, 0, 1);
        this.pov = vec3.fromValues(0, 0, 0);
        this.up = vec3.fromValues(0, 1, 0);

        this.fovy  = 45;
        this.znear = 0.01;
        this.zfar  = 100;
        this.orthoScale = 2;

    }

    getProjectionMatrix(glContext) {
        let os = this.orthoScale;
        let aspectRatio = glContext.drawingBufferWidth / glContext.drawingBufferHeight;
        return this.cameraType === CAMERA_TYPE.PERSPECTIVE ?
            mat4.perspective(mat4.create(), this.fovy, aspectRatio, this.znear, this.zfar) :
            mat4.ortho(mat4.create(), -aspectRatio * os, aspectRatio * os, -os, os, this.znear, this.zfar);
    }

    getViewMatrix() {
        return mat4.lookAt(
            mat4.create(),
            this.eye,
            this.pov,
            this.up
        );
    }

    lookAt(eye, pov, up= vec3.fromValues(0, 0, 1)) {
        this.eye = eye;
        this.pov = pov;
        this.up  = up;
    }

}


export {Camera, CAMERA_TYPE};


