import {CONTEXT_TYPE, dom, logger} from "../utils.js";

class GuiController{

    constructor(app) {
        this._app = app;
        this._guiContainer = dom.byID("gui_control_panel");

        this._generalCtrls = {
            sceneSelect: dom.byID("gui_general_exercise_select"),

            set exerciseOptions(options){
                this.sceneSelect.innerHTML = '';
                for (let sceneOption of options){
                    let option = document.createElement("option");
                    option.value = sceneOption;
                    option.text = sceneOption;
                    this.sceneSelect.appendChild(option);
                }
            },

            playButton: dom.byID("gui_general_btn_play"),

            reloadButton: dom.byID("gui_general_btn_reload"),
        }

        this._canvases = {};
        this._activeCanvas = '';

        this._elementCounter = 0;
        this._setupCanvases();
        this._createAndAppendListeners();
    }

    _createAndAppendListeners() {

        this.generalCtrls.sceneSelect.addEventListener("change", (event) => {
            let selectedOption = event.target.options[event.target.selectedIndex].value;
            this._app.runScene(selectedOption);
        });

        this.generalCtrls.playButton.addEventListener("click", (event) => {
            let playing = this.generalCtrls.playButton.innerHTML === 'pause';
            this.generalCtrls.playButton.innerHTML = playing ? 'play' : 'pause';
            if (playing) {
                this.generalCtrls.playButton.classList.remove('pressed-btn');
                this._app.pause();
            }else{
                this.generalCtrls.playButton.classList.add('pressed-btn');
                this._app.play();
            }
        });

        this.generalCtrls.reloadButton.addEventListener("click", (event) => {
            this._app.runScene(this._app.activeScene);
        });

    }

    _setupCanvases() {

        let canvasContainer = dom.byID("canvas-container");
        let width = canvasContainer.clientWidth;
        let height = canvasContainer.clientHeight;

        let canvas2D = dom.byID("canvas_2d");
        canvas2D.width = width;
        canvas2D.height = height;
        this._canvases[CONTEXT_TYPE.CTX_2D] = {
            elem: canvas2D,
            ctx: canvas2D.getContext('2d'),
            visible: false
        };

        let canvas3D = dom.byID("canvas_3d");
        canvas3D.width = width;
        canvas3D.height = height;
        let glOptions = {
            alpha     : true,
            depth     : true,
            antialias : true
        };

        let gl;
        try {
            gl = canvas3D.getContext('webgl', glOptions) || canvas3D.getContext('webgl2', glOptions);
        }
        catch (ex) {
            logger.fatal('could not create WebGL rendering context...', ex);
        }

        this._canvases[CONTEXT_TYPE.CTX_3D] = {
            elem: canvas3D,
            ctx: gl,
            visible: false
        }

    }

    getCanvasContextAndShowCanvas(contextType) {
        if(this._activeCanvas === contextType && this._activeCanvas !== '') return this._canvases[contextType].ctx;
        if(this._activeCanvas !== contextType && this._activeCanvas !== ''){
            this._canvases[this._activeCanvas].elem.classList.add("hide");
            this._canvases[this._activeCanvas].visible = false;
        }
        this._canvases[contextType].elem.classList.remove("hide");
        this._canvases[contextType].visible = true;
        this._activeCanvas = contextType;
        return this._canvases[contextType].ctx;
    }

    get generalCtrls(){
        return this._generalCtrls;
    }

    addSelect(label, selection){

        let select_id = label + `gui_select_${label}_${this._elementCounter++}`;

        let template = dom.byID("gui_select_template").content.cloneNode(true);

        let template_label = template.querySelector("label");
        template_label.setAttribute("for",select_id);
        template_label.innerHTML = `${label}:`;

        let template_select = template.querySelector("select");
        template_select.setAttribute("name",label);
        template_select.setAttribute("id", select_id);

        for (let selection_option of selection){
            let option = document.createElement("option");
            option.value = selection_option;
            option.text = selection_option;
            template_select.appendChild(option);
        }

        this._guiContainer.appendChild(template);

    }

    clearAllCanvases() {
        let canvas2D = this._canvases[CONTEXT_TYPE.CTX_2D];
        canvas2D.ctx.clearRect(0, 0, canvas2D.elem.width, canvas2D.elem.height);
    }

}

export {GuiController};