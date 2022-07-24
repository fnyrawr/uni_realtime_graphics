
uniform mat4 projectionMatrix;
uniform mat4 modelViewMatrix;
uniform float time;
uniform float directionX;
uniform float directionY;
uniform float waveFrequency;
uniform float waveSpeed;
uniform float waveAmplitude;

attribute vec3 vertexPosition;
attribute vec4 vertexColor;

varying vec4 fragColor;
varying vec2 uv_coord;
varying vec3 worldPos;

vec3 parametricSurface(vec2 uv) {

	// Animation
	float height = sin((uv.x*directionX + uv.y*directionY) * waveFrequency + time * waveSpeed) * waveAmplitude;

	/*
	// Boat's wave animation for testing
	float radial = length(uv);
	float falloff = pow(clamp(1.0 - radial, 0.0, 1.0), 1.75);
	height += sin(radial * 20.0 + time * waveSpeed) * waveAmplitude*0.95*falloff;
	*/

    return vec3(uv, height);

}

void main() {

	// we pass the vertex color to its fragments
	fragColor = vertexColor;
	uv_coord = vertexPosition.xy;

	// let opengl create sized points
	gl_PointSize = 5.0;

    vec3 newVertexPosition = parametricSurface(vertexPosition.xy);

	// don't need a model matrix because our plane is not transformed
	worldPos = newVertexPosition;

	// we are dealing with homogenuous 4x4 matrices, so we need to convert
	// the vertex position to homogenuous form too
	gl_Position = projectionMatrix * modelViewMatrix * vec4(newVertexPosition, 1.0);

}

