import {Mesh} from "../../../core/mesh.js"


function lerp(a, b, t) {
    return a + t*(b-a)
}

class Grid extends Mesh {

    constructor(gl, uSamples, uSpace, vSamples, vSpace) {

        let color1 = [0.7  , 0.7  , 0.2  , 1.0]
        let color2 = [0.017, 0.392, 0.591, 1.0]

        let vertices = []
        let indices = []
        let colors = []

        for (let u=0; u<uSamples; u++) {
            for (let v=0; v<vSamples; v++) {
                // do not push arrays but the bare components
                let uRange = uSpace[1] - uSpace[0]
                let vRange = vSpace[1] - vSpace[0]
                vertices.push(uSpace[0] + ((u / uSamples) * uRange))
                vertices.push(vSpace[0] + ((v / vSamples) * vRange))
                vertices.push(0)
                // rgba lerp
                let t = u/uSamples
                colors.push(lerp(color1[0], color2[0], t))
                colors.push(lerp(color1[1], color2[1], t))
                colors.push(lerp(color1[2], color2[2], t))
                colors.push(lerp(color1[3], color2[3], t))
            }
        }

        for (let y=0; y<vSamples-1; y++) {
            for (let x=0; x<uSamples-1; x++) {
                let index = y*uSamples + x
                // triangle 1
                indices.push(index)
                indices.push(index+uSamples)
                indices.push(index+1)
                // triangle 2
                indices.push(index+1+uSamples)
                indices.push(index+1)
                indices.push(index+uSamples)
            }
        }

        super(gl, {
            positions: vertices,
            indices: indices,
            colors: colors,
            primitiveType: gl.TRIANGLES
        })

    }

}

export default Grid