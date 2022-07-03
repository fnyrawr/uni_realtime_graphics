struct Material {
	float shininess;
};

struct Light {
	vec3 position;
};

uniform Material material;
uniform Light light;

uniform mat4 projectionMatrix;

uniform float time;

// textures
uniform sampler2D uSamplerNight;
uniform sampler2D uSamplerDay;
uniform sampler2D uSamplerOcean;
uniform sampler2D uSamplerCloud;

varying vec2 texcoords;
// interpolated coordinates in eye space
varying vec3 ecPosition;
varying vec3 ecNormal;

void main() {

	// find out which view direction to use
	vec3 viewDir = (projectionMatrix[2][3] == 0.0) ? vec3(0, 0, 1) : normalize(-ecPosition);

	// derived vectors for scalar products
	vec3 toLight = normalize(ecPosition - light.position);
	vec3 reflectLight = reflect(toLight, ecNormal);

	// scalar products for summands
	float nDotL = max(dot(toLight, normalize(ecNormal)), 0.0);
	float rDotV = max(dot(-reflectLight, viewDir), 0.0);
	float nDotV = max(0.0, dot(viewDir, ecNormal));
	float fresnel = pow(1.0-nDotV, 2.0);

	float spec = pow(rDotV, material.shininess);

	// textures
	vec3 worldDay = texture2D(uSamplerDay, texcoords).xyz;
	vec3 worldNight = texture2D(uSamplerNight, texcoords).xyz;
	// no channel packing, only x needed here
	float worldOcean = texture2D(uSamplerOcean, texcoords).x;

	// add 2 cloud layers
	float cloudLayer1 = texture2D(uSamplerCloud, 1.0-texcoords + vec2(time * 0.00001, 0.0)).x;
	float cloudLayer2 = texture2D(uSamplerCloud, texcoords + vec2(time * -0.000005, 0.0)).x;
	// make clouds more transparent
	float clouds = max(max(cloudLayer1, cloudLayer2), fresnel) * 0.5;
	vec3 cloudColor = mix(vec3(0.8, 0.8, 1.0), vec3(1.0), nDotL);

	// linear interpolate
	vec3 color = mix(worldDay, worldNight, nDotL);

	// shiny ocean
	color += worldOcean * spec;
	// add clouds
	color = mix(color, cloudColor, clouds);

	gl_FragColor = vec4(color, 1);
}
