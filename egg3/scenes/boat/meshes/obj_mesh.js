import {Mesh} from "../../../core/mesh.js"

class OBJMesh extends Mesh{
    constructor(gl, data) {
        let rawVertices = []
        let vertIndices = []
        let texIndices = []
        let normIndices = []
        let rawNormals = []
        let rawTexCoords = []
        let meshScale = 1/300

        const dataArray = data.match(/[^\s]+/g)
        for (let i = 0; i < dataArray.length; i++) {
            if (dataArray[i] === "mtllib") {
                for (let j = i; j < dataArray.length; j++) {
                    // vertices
                    if (dataArray[j] === 'v') {
                        rawVertices.push(parseFloat(dataArray[j + 1]) * meshScale, parseFloat(dataArray[j + 2]) * meshScale, parseFloat(dataArray[j + 3]) * meshScale)
                        j += 3
                    // normals (unordered)
                    } else if (dataArray[j] === 'vn') {
                        rawNormals.push(parseFloat(dataArray[j + 1]), parseFloat(dataArray[j + 2]), parseFloat(dataArray[j + 3]))
                        j += 3
                    // texCoords (unordered)
                    } else if (dataArray[j] === 'vt') {
                        rawTexCoords.push(parseFloat(dataArray[j + 1]), parseFloat(dataArray[j + 2]))
                        j += 2
                    // indices
                    // f v1/vt1/vn1 v2/vt2/vn2 v3/vt3/vn3
                    } else if (dataArray[j] === 'f') {
                        for (let k = 1; k < 4; k++) {
                            const is = dataArray[j + k].split('/')
                            vertIndices.push(parseInt(is[0])-1)
                            texIndices.push(parseInt(is[1])-1)
                            normIndices.push(parseInt(is[2])-1)
                        }
                        j += 3
                    }
                }
                break
            }
        }

        // sorting values to the correct orders
        let vertices = []
        let normals = []
        let texCoords = []
        let faceCount = vertIndices.length/3
        for(let i = 0; i < faceCount; i++) {
            let index = i*3
            vertices.push(vertIndices[index], vertIndices[index+1], vertIndices[index+2])
            normals.push(rawNormals[index], rawNormals[index+1], rawNormals[index+2])
            texCoords.push(rawTexCoords[index], rawTexCoords[index+1], rawTexCoords[index+2])
        }

        super(gl, {
            positions: rawVertices,
            indices: vertIndices,
            normals: normals,
            textureCoords: texCoords,
            primitiveType: gl.TRIANGLES
        })
    }
}

function loadOBJMesh(gl, file_path, callback) {
    fetch(file_path)
        .then(response => response.text())
        .then(data => callback(new OBJMesh(gl, data)));
}

export {OBJMesh, loadOBJMesh};