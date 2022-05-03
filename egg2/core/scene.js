import {CONTEXT_TYPE, logger} from "../utils.js";
import {Renderer2D, Renderer3D} from "./renderer.js";
import {Camera, CAMERA_TYPE} from "./camera.js";


class Scene {

    constructor(contextType) {
        if(!contextType in CONTEXT_TYPE) logger.fatal("contextType must match the definition in util.CONTEXT_TYPES")
        this._ctxType = contextType;
        this._context = undefined;
        this._renderer = contextType === CONTEXT_TYPE.CTX_2D ? new Renderer2D() : new Renderer3D();
        this._sceneObjects = [];
    }

    get ctx(){
        if(this._ctxType !== CONTEXT_TYPE.CTX_2D) logger.fatal('ctx is not available for scenes with contextType: CTX_3D');
        return this._context
    }

    get gl(){
        if(this._ctxType !== CONTEXT_TYPE.CTX_3D) logger.fatal('gl is not available for scenes with contextType: CTX_2D');
        return this._context
    }

    get sceneObjects() {
        return this._sceneObjects;
    }

    load(appRuntime){
        this._context = appRuntime.getContext(this._ctxType);
    }

    unload(){

    }

    update(deltaTime){

    }

    render(){
        this._renderer.render(this._context, this);
    }

}

class Scene2D extends Scene {

    constructor() {
        super(CONTEXT_TYPE.CTX_2D);
    }

}

class Scene3D extends Scene {

    constructor() {
        super(CONTEXT_TYPE.CTX_3D);
        this._camera = new Camera(CAMERA_TYPE.PERSPECTIVE);
    }

    get camera() {
        return this._camera;
    }

    set camera(camera) {
        this._camera = camera;
    }

    bind(program) {

    }

}

export {Scene, Scene2D, Scene3D};