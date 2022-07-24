import {AttributeBuffer, IndexBuffer} from "./buffers.js";

class Mesh {

    constructor(glContext, {positions, colors, normals, textureCoords, indices, primitiveType} = {}) {

        this._gl = glContext;
        this._primitiveType = primitiveType >= 0 ? primitiveType : glContext.TRIANGLES;

        if(positions) this._positions = new AttributeBuffer(glContext,
            glContext.FLOAT,
            positions,
            3   // xyz
        );

        if(colors) this._colors = new AttributeBuffer(glContext,
            glContext.FLOAT,
            colors,
            4   // rgba
        );

        if(normals) this._normals = new AttributeBuffer(glContext,
            glContext.FLOAT,
            normals,
            3   // xyz
        );

        if(textureCoords) this._textureCoords = new AttributeBuffer(glContext,
            glContext.FLOAT,
            textureCoords,
            2   // uv
        );

        if(indices) this._indices = new IndexBuffer(glContext, indices);

    }

    bind(program) {

        if (this._positions)        program.setAttribute('vertexPosition', this._positions);
        if (this._colors)           program.setAttribute('vertexColor', this._colors);
        if (this._normals)          program.setAttribute('vertexNormal', this._normals);
        if (this._textureCoords)    program.setAttribute('vertexTexcoords', this._textureCoords);

        this._indices ? this._indices.bind() : this._gl.bindBuffer(this._gl.ELEMENT_ARRAY_BUFFER, null);

    }

    render() {
        this._indices ?
            this._gl.drawElements(this._primitiveType, this._indices.numElements(), this._gl.UNSIGNED_SHORT, 0) :
            this._gl.drawArrays(this._primitiveType, 0, this._positions.numElements())
    }

}

export {Mesh};