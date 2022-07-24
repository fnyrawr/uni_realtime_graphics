// input variables from vertex shader
varying vec2 texcoords;
uniform sampler2D uSamplerBoat;

void main() {

	gl_FragColor = texture2D(uSamplerBoat, texcoords);

}
