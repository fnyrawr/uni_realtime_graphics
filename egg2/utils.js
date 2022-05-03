const LOG_LEVEL = Object.freeze({
    LOG: 0,
    INFO: 1,
    WARN: 2,
    ERROR: 3
});

const logger = {

    _logLevel: 0,

    setLogLevel(level){
        this._logLevel = level
    },

    log(message){
        if (this._logLevel <= LOG_LEVEL.LOG) console.log(`%c${message}`, 'color: grey');
    },

    info(message){
        if (this._logLevel <= LOG_LEVEL.INFO) console.log(`%c${message}`, 'color: green');
    },

    warn(message){
        if (this._logLevel <= LOG_LEVEL.WARN) console.log(`%c${message}`, 'color: orange');
    },

    err(message){
        if (this._logLevel <= LOG_LEVEL.ERROR) console.log(`%c${message}`, 'color: red');
    },

    fatal(message){
        throw new Error(message);
    }

}

const linalg = {

    randomVector(dim) {
        let vec = [];
        for(let i; i < dim; i++){
            vec.push(Math.random() - 0.5);
        }
        return vec;
    }
}

const dom = {

    byID(id)  {
        return document.getElementById(id);
    }

}

const CONTEXT_TYPE = Object.freeze({
    CTX_2D: Symbol('2d'),
    CTX_3D: Symbol('webgl')
});

const rand = {

    rand(min, max) {
        return min + (max - min) * Math.random();
    }

}

export {logger, LOG_LEVEL, linalg, dom, CONTEXT_TYPE, rand}