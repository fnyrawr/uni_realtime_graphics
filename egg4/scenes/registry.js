import {logger} from "../utils.js";
import {Scene} from "../core/scene.js";

const SCENES = {
    'example 2D': './example_2D/app.js',
    'example 3D': './example_3D/app.js',
    'particle': './particles/app.js',
	'kdTree': './kdtree/app.js',
	'bezier': './bezier/app.js',
	'gizmo': './gizmo/app.js',
	'boat': './boat/app.js',
    'phong': './phong/app.js',
    'earth': './earth/app.js',
    'waves': './waves/app.js',
};

class Registry {

    constructor() {
        this._importedScenes = {};
        this._pendingImportCounter = Object.keys(SCENES).length;
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

        logger.info('Try to load all scenes (note: if not all scenes are installed, you may get error messages)');

        for (const sceneName in SCENES) {
            import(SCENES[sceneName]).then(
                (scene) => {
                    console.log(`instance of ${scene.default.prototype instanceof Scene}`);
                    logger.log(`load scene: ${sceneName}`);
                    this._importedScenes[sceneName] = scene.default;
                    decrementPendingImportCounter();
                }
            ).catch(
                (error) => {
                    logger.log(`scene is not installed: ${sceneName}| err: ${error}`);
                    decrementPendingImportCounter();
                }
            );
        }

    }

    get sceneNames() {
        return Object.keys(this._importedScenes);
    }

    get initialized() {
        return this._pendingImportCounter === 0;
    }

    scene(sceneName) {
        if (this._importedScenes[sceneName] === undefined) {
            logger.err(`scene: ${sceneName} is not installed!`);
            return;
        }
        return this._importedScenes[sceneName];
    }

}

export default Registry;