import {Mesh} from "../../core/mesh.js";

/*
 * A gizmo is a mesh representing an axis pivot.
 */
class Gizmo extends Mesh {

    constructor(gl) {

        // the origin and the three unit axes
        let vertices = [    // POINT
            0, 0, 0,        // 0
            1, 0, 0,        // 1
            0, 1, 0,        // 2
            0, 0, 1         // 3
        ]

        let colors = [      // RGBA
            1, 1, 1, 1,     // white
            1, 0, 0, 1,     // red
            0, 1, 0, 1,     // green
            0, 0, 1, 1      // blue
        ]

        let indices = [     // LINES
            0, 1,           // 0 - 1
            0, 2,           // 0 - 2
            0, 3            // 0 - 3
        ]

        super(gl, {
            positions: vertices,
            colors: colors,
            indices: indices,
            primitiveType: gl.LINES
        })
    }
}

export {Gizmo};