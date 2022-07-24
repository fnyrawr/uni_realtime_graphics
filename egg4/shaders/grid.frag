uniform vec3 lightDir;
uniform vec3 lightColor;
uniform vec3 ambient;
uniform vec3 cameraPos;
uniform float time;
uniform float directionX;
uniform float directionY;
uniform float waveFrequency;
uniform float waveSpeed;
uniform float waveAmplitude;

varying vec4 fragColor;
varying vec2 uv_coord;
varying vec3 worldNormal;
varying vec3 worldPos;

vec3 phong(vec3 v, vec3 n, vec3 ld, vec3 lc) {

	// derived vectors for scalar products
	// sunlight is a directional light, so no position is needed here
	vec3 toLight = normalize(ld);
	vec3 reflectLight = reflect(-toLight, n);

	// scalar products for summands
	float nDotS = max(dot(toLight, n), 0.0);
	float rDotV = max(dot(reflectLight, v), 0.0);

	// calculate the summands
	vec3 diff = fragColor.rgb * nDotS * lc;
	vec3 spec = 1.0 * pow(rDotV, 32.0) * lc;

	return  diff + spec; // phong sum

}

// normal calculation in fragment shader for better results
vec3 parametricNormal(vec2 uv) {

	float waveFunction = (uv.x*directionX + uv.y*directionY) * waveFrequency + time * waveSpeed;
	float direction = abs(sin(waveFunction)) * 0.5 + 0.5;
	float weight = cos(waveFunction) * 0.5; // * waveAmplitude
	vec3 normal = vec3(directionX, 0.0, directionY) * weight;
	normal.y = 1.0-abs(weight);

	return normal;

}

void main() {

	vec3 normal = parametricNormal(uv_coord);
	vec3 viewDirection = normalize(cameraPos - worldPos);
	vec4 color = fragColor;
	float grid = floor(fract(uv_coord.x * 5.0) + 0.5) + floor(fract(uv_coord.y * 5.0) + 0.5);
	color.rgb += mod(grid, 2.0) * 0.1;
	vec3 outputColor = ambient * color.rgb;
	outputColor += phong(viewDirection, normal, lightDir, lightColor) * color.rgb;
	gl_FragColor = vec4(outputColor, 1.0);

}
