import {CONTEXT_TYPE} from "../utils.js";
import {mat3, mat4} from "../external_libs/gl-matrix.js";

class SceneObject {

    constructor(contextType) {
        this._mat = contextType === CONTEXT_TYPE.CTX_2D ? mat3 : mat4;
        this._transform = this._mat.create();
        this._globalTransform = this._transform;
        this._transformDirtFlag = true;
        this._children = [];
        this._parent = undefined;
    }

    get transform() {
        return this._transform;
    }

    set transform(transform) {
        if(this._mat.equals(this._transform, transform)) {
            return
        }
        this._transform = transform;
        this.transformDirtFlag = true;
    }

    get globalTransform(){
        if(!this._transformDirtFlag) return this._globalTransform;
        if(this._parent === undefined) return this._transform;
        this._mat.multiply(this._globalTransform, this._parent.globalTransform, this._transform);
        return this._globalTransform;
    }

    set transformDirtFlag(flag) {
        this._transformDirtFlag = flag;
        for(let child of this._children) {
            child.transformDirtFlag = true;
        }
    }

    get parent() {
        return this._parent;
    }

    set parent(parent) {
        this._parent = parent;
    }

    hasChildren() {
        return this._children.length > 0;
    }

    get children() {
        return this._children;
    }

    addChild(child) {
        this._children.append(child);
        child.parent = this;
    }

}

export {SceneObject}