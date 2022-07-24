uniform float time;
uniform float screenWidth;
uniform float screenHeight;

varying vec2 uv_coord;

const float PI = 3.14159265359;

// convert uv to polar coordinates
vec2 toPolar(vec2 uv) {
	float distance = length(uv * 2.0 - 1.0);
	float angle = (atan(uv.x - 0.5, uv.y - 0.5) + PI) / (2.0 * PI);
	return vec2(angle, distance);
}

// creates a spiral pattern in polar coordinate usage
float spiralPattern(vec2 uv) {
	return sin((uv.x * 0.5 * PI - uv.y * 0.5)*8.0+time*0.005)*2.0;
}

// creates a radial square pattern in polar coordinate usage
float squarePattern(vec2 uv) {
	vec2 squareUV = abs(fract(uv + 0.5) * 2.0 - 1.0)*2.0;
	return min(squareUV.x, squareUV.y);
}

// convert vec3 0 to 255 scale to vec3 0 to 1 scale
vec3 convToDec(vec3 val) {
	return vec3(val.x / 255.0, val.y / 255.0, val.z / 255.0);
}

void main() {

	// aspect ratio
	float aspectRatio = screenWidth / screenHeight;

	// uv coords in aspect ratio, centered
	vec2 uv = vec2(uv_coord.x * aspectRatio, uv_coord.y);
	uv.x += (1.0 - aspectRatio) * 0.5;

	// convert uv to polar coordinates, take the y and set to x to create circles
	uv.x = toPolar(uv).y * -1.0;

	// create inteferring waves as pattern, used as weight factor in lerp below
	float weight = sin(
		squarePattern(uv * 0.5) +
		spiralPattern(uv * 0.75)*0.75 -
		spiralPattern(uv*0.5)*0.5 +
		spiralPattern(uv)*0.5 -
		spiralPattern(uv*2.0)*2.0
	);
	// define colors
	vec3 color1 = convToDec(vec3(100.0, 181.0, 246.0));
	vec3 color2 = convToDec(vec3(66.0, 165.0, 245.0));
	// lerp colors with previous calculated pattern as weight factor
	vec3 outputColor = vec3(mix(color1, color2, weight));
	gl_FragColor = vec4(outputColor, 1.0);

}
