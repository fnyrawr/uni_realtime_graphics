import Texture from './texture.js'

// all to be loaded textures info
let _textureInfos = {
    'earthOcean'  : { path: '../../textures/earth_water.jpg',   texture: undefined },
    'earthNight'  : { path: '../../textures/earth_night.jpg',   texture: undefined },
    'earthDay'    : { path: '../../textures/earth_day.jpg',   texture: undefined },
    'earthCloud'  : { path: '../../textures/earth_cloud.jpg',   texture: undefined },
    'boat'  : { path: '../../textures/pirate_ship.png',   texture: undefined },
}

const NUM_TEXTURES = Object.keys(_textureInfos).length
let _numLoaded = 0
let _onLoadedCallback = () => {}


let _onLoadedTexture = function() {
    if (++_numLoaded === NUM_TEXTURES)
        _onLoadedCallback()
}

let _loadTexture = function(gl, name) {
    _textureInfos[name].texture = new Texture(gl, {
        name     : name,
        path     : _textureInfos[name].path,
        onLoaded : _onLoadedTexture
    })
}

let textureLoader = {

    load: function(gl, onLoaded) {
        _onLoadedCallback = onLoaded
        for (let texture in _textureInfos)
            _loadTexture(gl, texture)
    },

    getTexture(name) {
        return _textureInfos[name].texture
    }
}


export default textureLoader
