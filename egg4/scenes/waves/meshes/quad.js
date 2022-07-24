import {Mesh} from "../../../core/mesh.js"

class Quad extends Mesh {

    constructor(gl) {

        // check if width or height is bigger, then set ratio to adjust plane to screen size
        let width = 1
        let height = 1
        if(gl.drawingBufferWidth > gl.drawingBufferHeight) {
            width = gl.drawingBufferWidth / gl.drawingBufferHeight
        }
        else {
            height = gl.drawingBufferHeight / gl.drawingBufferWidth
        }

        let vertices = []
        let indices = []
        let texCoords = []

        vertices.push(-width, -height, 0)
        vertices.push(-width, height, 0)
        vertices.push(width, -height, 0)
        vertices.push(width, height, 0)

        indices.push(0, 1, 2, 3, 2, 1)

        texCoords.push(1, 0)
        texCoords.push(1, 1)
        texCoords.push(0, 0)
        texCoords.push(0, 1)

        super(gl, {
            positions: vertices,
            indices: indices,
            textureCoords: texCoords,
            primitiveType: gl.TRIANGLES
        })

    }

}

export default Quad