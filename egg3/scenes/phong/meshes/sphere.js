import {Mesh} from "../../../core/mesh.js";

let _sphereCache = {}

class Sphere extends Mesh {

    constructor(gl, numLatitudes, numLongitudes) {

        // check if we have already created sphere with the dimensions
        let key = '' + numLatitudes + '' + numLongitudes
        if (!_sphereCache[key]) {

            console.log(`creating a new unit sphere mesh with resolution (${numLatitudes}, ${numLongitudes}).`)

            let coords = []
            let texcoords = []
            let normals = []
            let indices = []

            // generate the attributes
            for (let latitude = 0; latitude <= numLatitudes; ++latitude) {
                let theta = latitude * Math.PI / numLatitudes
                let sinTheta = Math.sin(theta)
                let cosTheta = Math.cos(theta)

                for (let longitude = 0; longitude <= numLongitudes; ++longitude) {
                    let phi = longitude * 2 * Math.PI / numLongitudes
                    let cosPhi = Math.cos(phi)
                    let sinPhi = Math.sin(phi)
                    let x = cosPhi * sinTheta
                    let y = cosTheta
                    let z = sinPhi * sinTheta
                    coords.push(x)
                    coords.push(y)
                    coords.push(z)
                    normals.push(x)
                    normals.push(y)
                    normals.push(z)
                    texcoords.push(1 - longitude / numLongitudes) // u
                    texcoords.push(1 - latitude  / numLatitudes)  // v

                }
            }

            // generate the indices
            for (let latitude  = 0; latitude  < numLatitudes;  ++latitude)
                for (let longitude = 0; longitude < numLongitudes; ++longitude) {

                    let first  = latitude * (numLongitudes + 1) + longitude
                    let second = first + numLongitudes + 1

                    // indices.push(first)
                    // indices.push(second)
                    // indices.push(first + 1)

                    // indices.push(second)
                    // indices.push(second + 1)
                    // indices.push(first + 1)


                    indices.push(second)
                    indices.push(first)
                    indices.push(first + 1)

                    indices.push(second + 1)
                    indices.push(second)
                    indices.push(first + 1)
                }

            _sphereCache[key] = {
                positions: coords,
                textureCoords: texcoords,
                normals: normals,
                indices: indices,
                primitiveType: gl.TRIANGLES
            }
        }

        super(gl, _sphereCache[key]);

    }
}


export default Sphere
