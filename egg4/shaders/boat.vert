// pipeline globals
uniform mat4 projectionMatrix;
uniform mat4 modelViewMatrix;

// input variables from attribute buffers
attribute vec3 vertexPosition;  // incoming vertex position
attribute vec2 vertexTexcoords;


varying vec2 texcoords;


void main() {

	gl_Position = projectionMatrix * modelViewMatrix * vec4(vertexPosition, 1.0);

	texcoords = vertexTexcoords;

}
