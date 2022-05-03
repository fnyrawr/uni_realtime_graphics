// pipeline globals
uniform mat4 projectionMatrix;
uniform mat4 modelViewMatrix;

// input variables from attribute buffers
attribute vec3 vertexPosition;  // incoming vertex position
attribute vec4 vertexColor;  // incoming vertex color

// output variables to fragment shader
varying vec4 fragColor;


void main() {

	// we pass the vertex color further down the pipeline to its fragments
	fragColor = vertexColor;

	// let opengl create sized points
	// gl_Points is a shader builtin varibale, but must not be written
	// it is also ignored if the primitive type is not POINTS
	gl_PointSize = 10.0;

	// project the vertices into the image plane of the camera.
	// because we are dealing with homogenuous 4x4 matrices, we need to convert
	// the vertex position to homogenuous form too
	// gl_Points is a shader builtin varibale and _must_ be written
	gl_Position = projectionMatrix * modelViewMatrix * vec4(vertexPosition, 1.0);
}
