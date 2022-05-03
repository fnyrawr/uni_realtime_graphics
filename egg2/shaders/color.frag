// input variables from vertex shader
varying vec4 fragColor;


void main() {

    // gl_FragColor is a shader builtin varibale and _must_ be written
	gl_FragColor = vec4(fragColor[0], fragColor[1], fragColor[2], fragColor[3]); // opaque white

}
