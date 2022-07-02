import {logger} from "../utils.js";
import {Program, SHADER_TYPE} from "./program.js";

const DEFAULT_SHADERS = Object.freeze({
    "color": {
        VERTEX: '../shaders/color.vert', FRAGMENT: '../shaders/color.frag'
    },
    "grid": {
        VERTEX: '../shaders/grid.vert', FRAGMENT: '../shaders/grid.frag'
    },
    "phong": {
        VERTEX: '../shaders/phong.vert', FRAGMENT: '../shaders/phong.frag'
    },
    "boat": {
        VERTEX: '../shaders/boat.vert', FRAGMENT: '../shaders/boat.frag'
    }
});

// automatically prepended precision header for all fragment shaders
const PRECISION_HEADER = `
    #if GL_FRAGMENT_PRECISION_HIGH == 1
        // highp is supported
        precision highp int;
        precision highp float;
    #else
        // high is not supported
        precision mediump int;
        precision mediump float;
    #endif
`

class ShaderLoader {

    constructor() {
        this._importedShaders = {};
        this._programs = {}
        this._pendingImportCounter = Object.keys(DEFAULT_SHADERS).length;
    }

    initialize(callback) {

        if (this.initialized) {
            callback();
            return;
        }

        let decrementPendingImportCounter = () => {
            this._pendingImportCounter--;
            if (this.initialized) {
                callback();
            }
        };

        logger.info('Try to load all default shaders (note: if not all shaders are installed, you may get error messages)');

        for (const shaderName in DEFAULT_SHADERS) {
            let shaderInfo = DEFAULT_SHADERS[shaderName];
            let shaders = {
                errorFlag: false
            }

            for (const shaderType in SHADER_TYPE) {
                if(!shaderInfo[shaderType]) continue;
                fetch(shaderInfo[shaderType]).then(
                    (response) => {
                        response.text().then((shader) => {
                            logger.log(`load shader: ${shaderName}`);
                            shaders[shaderType] = shaderType === 'FRAGMENT' ? PRECISION_HEADER + shader : shader;
                            decrementPendingImportCounter();
                        }).catch(
                            (error) => {
                                shaders.errorFlag = true;
                                logger.log(`shader is not readable: ${shaderName}| err: ${error}`);
                                decrementPendingImportCounter();
                            }
                        );
                    }
                ).catch(
                    (error) => {
                        shaders.errorFlag = true;
                        logger.log(`shader is not installed: ${shaderName}| err: ${error}`);
                        decrementPendingImportCounter();
                    }
                );
            }

            this._importedShaders[shaderName] = shaders

        }

    }

    get shaderNames() {
        return Object.keys(this._importedShaders);
    }

    get initialized() {
        return this._pendingImportCounter === 0;
    }

    program(glContext, shaderName){
        if(!this._importedShaders[shaderName]) logger.fatal(`shader: ${shaderName} is not loaded/imported`);
        if(this._importedShaders[shaderName].errorFlag) logger.fatal(`shader: ${shaderName} is not loaded/imported`);
        if(!this._programs[shaderName]){
            this._programs[shaderName] = new Program(glContext, shaderName, this._importedShaders[shaderName]);
        }
        return this._programs[shaderName];
    }

}

export default ShaderLoader;