// input variables from vertex shader
varying vec4 fragColor;
varying vec3 fragNormal;
varying vec2 fragTexcoords;

uniform vec4 color;

void main() {

	float fakeLight = max(dot(normalize(fragNormal), normalize(vec3(1,-1,1))), 0.0);
	fakeLight = fakeLight*0.5 + 0.5;
	vec3 outputColor = color.rgb * fakeLight;
	float alpha = color.a;

    // gl_FragColor is a shader builtin varibale and _must_ be written
	// gl_FragColor = vec4(fragColor[0], fragColor[1], fragColor[2], fragColor[3]); // opaque white
	gl_FragColor = vec4(outputColor, alpha);

}
