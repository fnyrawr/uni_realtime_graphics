struct Material {
	vec3 ambient;
	vec3 diffuse;
	vec3 specular;
	float shininess;
};

struct Light {
	vec3 position;
	vec3 color;
};

uniform Material material;
uniform Light light;
uniform vec3 ambientLight;

uniform mat4 projectionMatrix;

// interpolated coordinates in eye space
varying vec3 ecPosition;
varying vec3 ecNormal;


vec3 phong(vec3 p, vec3 v, vec3 n, vec3 lp, vec3 lc) {

	// derived vectors for scalar products
	vec3 toLight = normalize(lp - p);
	vec3 reflectLight = reflect(-toLight, n);

	// scalar products for summands
	float n_s = max(dot(toLight, n), 0.0);
	float r_v = max(dot(reflectLight, v), 0.0);

	// calculate the summands
	vec3 ambi = material.ambient * ambientLight;
	vec3 diff = material.diffuse * n_s * lc;
	vec3 spec = material.specular * pow(r_v, material.shininess) * lc;

	return  ambi + diff + spec; // phong sum

}

void main() {
	// find out which view direction to use
	vec3 viewDir = (projectionMatrix[2][3] == 0.0) ? vec3(0, 0, 1) : normalize(-ecPosition);

	// calculate illumination
	vec3 illum = phong(ecPosition, viewDir, normalize(ecNormal), light.position.xyz, light.color);

	gl_FragColor = vec4(illum, 1);
}
