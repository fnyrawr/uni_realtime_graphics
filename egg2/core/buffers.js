
/*
 * Base class for gl buffers.
 */
class GLBuffer {
    constructor(gl, bufferType, dataType, data, numComponents) {
        this.gl = gl
        this.type = bufferType
        this.datatype = dataType
        this.numElems = data.length / numComponents
        this.numComps = numComponents

        // create the WebGL buffer object and copy the data
        this.buffer = gl.createBuffer()
        this.bind()
        gl.bufferData(this.type, data, gl.STATIC_DRAW)
        this.unbind()
    }

    bind()   { this.gl.bindBuffer(this.type, this.buffer) }
    unbind() { this.gl.bindBuffer(this.type, null) }

    numElements()   { return this.numElems }
    numComponents() { return this.numComps }
    dataType()      { return this.datatype }
}

/*
 * An attribute buffer can take arbitrary data for vertex attributes,
 * for example vec3 (xyz) for positions or vec4 (rgba) for colors.
 * It is up to the programmer to specify the layout.
 */
class AttributeBuffer extends GLBuffer {
    constructor(gl, dataType, data, numComponents) {

        // convert array to typed array if the user just provided a normal array
        if (!(data instanceof Float32Array))
            data = new Float32Array(data)

        // call base class constructor with
        // specialized setup
        super(gl, gl.ARRAY_BUFFER, dataType, data, numComponents);
    }
}

/*
 * An index buffer takes indices to reference attribute values
 * across attribute buffers.
 */
class IndexBuffer extends GLBuffer {
    constructor(gl, data) {

        // convert array to Uint16Array if necessary
        if (!(data instanceof Uint16Array))
            data = new Uint16Array(data)

        // call base class constructor with
        // specialized setup
        super(gl, gl.ELEMENT_ARRAY_BUFFER, gl.UNSIGNED_SHORT, data,1)
    }
}


export {AttributeBuffer, IndexBuffer};
