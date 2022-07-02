uniform mat4 projectionMatrix;
uniform mat4 modelViewMatrix;
uniform mat3 normalMatrix;
 
attribute vec3 vertexPosition;
attribute vec3 vertexNormal;
attribute vec2 vertexTexcoords;

// eye coordinates for fragment phong
varying vec3 ecPosition;
varying vec3 ecNormal;
varying vec2 texcoords;


void main() {

	// calculate the vertex position in eye coordinates
	ecPosition = (modelViewMatrix * vec4(vertexPosition, 1.0)).xyz;

	// calculate the vertex normal in eye coordinates
	ecNormal = normalize(normalMatrix * vertexNormal);

	// vertex texcoords
	texcoords = vertexTexcoords;

	// clip the vertex as usual
	gl_Position = projectionMatrix * vec4(ecPosition, 1.0);
}