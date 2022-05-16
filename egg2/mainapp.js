import {CONTEXT_TYPE, logger, dom} from "./utils.js";
import SceneRegistry from "./scenes/registry.js";
import {GuiController} from "./gui/gui.js";
import ShaderLoader from "./core/shader_loader.js";

class MainApp {

    constructor(sceneRegistry, shaderLoader) {
        this._sceneRegistry = sceneRegistry;
        this._shaderLoader =  shaderLoader;
        this._guiController = new GuiController(this);
        this._guiController.generalCtrls.exerciseOptions = this._sceneRegistry.sceneNames;
        this._activeScene = undefined;
        this._play = true;
        if(this._sceneRegistry.sceneNames.length > 0) this.runScene(this._sceneRegistry.sceneNames[0]);
    }

    stopActiveScene() {
        if(this._activeScene !== undefined){
            logger.log(`unload and stop currently running scene: ${this._activeScene.name}`);
            this._activeScene.instance.unload();
            this._activeScene = undefined;
        }
    }

    runScene(sceneName){
        this.stopActiveScene();
        logger.log(`run scene: ${sceneName}`);
        this._activeScene = {
            name: sceneName,
            instance: new (this._sceneRegistry.scene(sceneName))()
        }
        this._activeScene.instance.load(this._runtime)
    }

    get _runtime() {

        let ctx = undefined;
        let ctxType = '';

        return {

            getContext: (contextType) => {
                if(contextType === undefined){
                    if( ctx !== undefined) return ctx;
                    logger.fatal("a context type is required for the first call");
                }else if (contextType !== CONTEXT_TYPE.CTX_2D && contextType !== CONTEXT_TYPE.CTX_3D){
                    logger.fatal("invalid contextType")
                }else if (ctxType !== '' && ctxType !== contextType) {
                    logger.fatal("just on type of context can exists")
                }else if (ctx === undefined){
                    this._guiController.clearAllCanvases();
                    ctxType = contextType;
                    ctx = this._guiController.getCanvasContextAndShowCanvas(ctxType);
                }
                return ctx;
            },

            shaderLoader: this._shaderLoader,

        }
    }

    run(){

        // init
        let deltaTime = 0;
        let lastTime = 0;
        let fpsInfo = dom.byID("gui_stats_fps")
        let tmpLoopCounter = 0;

        let mainLoop = () => {

            // calculate delta time and store nowTime in lastTime afterwards
            let nowTime = performance.now();
            deltaTime = nowTime - lastTime;
            lastTime = nowTime;

            // calculate fps every 10 loops
            if(tmpLoopCounter === 10) {
                fpsInfo.textContent = Math.round(1000 / deltaTime).toString();
                tmpLoopCounter = 0;
            }
            tmpLoopCounter++;

            // init this._activeScene
            if(this._activeScene !== undefined && deltaTime !== nowTime) {
                this._activeScene.instance.update(deltaTime);
                this._activeScene.instance.render();
            }

            // let the browser do the fps thing
            requestAnimationFrame(() => {
                if (this._play) mainLoop();
            });
        }

        // start
        mainLoop();

    }

    pause() {
        this._play = false;
    }

    play() {
        this._play = true;
        this.run();
    }

    get activeScene() {
        return this._activeScene.name;
    }
}

window.addEventListener('load', function () {
    logger.info('page is loaded');
    logger.info('initialize scene registry');
    let sceneRegistry = new SceneRegistry();
    let shaderLoader = new ShaderLoader();
    sceneRegistry.initialize(() => {
        shaderLoader.initialize(() => {
            let app = new MainApp(sceneRegistry, shaderLoader);
            app.run();
        });
    });
});
