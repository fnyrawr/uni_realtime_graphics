uniform mat4 projectionMatrix;
uniform mat4 modelViewMatrix;

attribute vec3 vertexPosition;
attribute vec2 vertexTexcoords;

varying vec4 fragColor;
varying vec2 uv_coord;

void main() {

	// texcoords
	uv_coord = vertexTexcoords;

	// we are dealing with homogenuous 4x4 matrices, so we need to convert
	// the vertex position to homogenuous form too
	gl_Position = projectionMatrix * modelViewMatrix * vec4(vertexPosition, 1.0);

}

