export default `
	precision mediump float;

	varying vec3 vVertexPosition;
	varying vec3 vOriginalVertexPosition;
	varying vec2 vTextureCoord;

	uniform sampler2D uTexture;

	vec3 getNormal(vec3 pos, vec3 originalPos) {
		float diff = 0.25;
		vec3 neighbor1 = vec3(originalPos.x + diff, originalPos.y, originalPos.z);
		vec3 neighbor2 = vec3(originalPos.x, pos.y + diff, originalPos.z);
		vec3 tangent = (neighbor1 - pos);
		vec3 biTangent = (neighbor2 - pos);
		return normalize(cross(tangent, biTangent));
	}
	
	void main() {
		vec2 textureCoords = vec2(vTextureCoord.x, vTextureCoord.y);
		vec4 finalColor = texture2D(uTexture, textureCoords);

		vec3 normal = getNormal(vVertexPosition, vOriginalVertexPosition);
		vec3 lightPos = normalize(vec3(0.3, 0.3, 1.0));

		float light = smoothstep(0.45, 1.0, dot(normal, lightPos));
		float lightStrength = 0.35;
		float ambientLight = 1.0 - lightStrength;

		finalColor.rgb = finalColor.rgb * light * lightStrength + finalColor.rgb * ambientLight;
		finalColor = vec4(finalColor.rgb * finalColor.a, finalColor.a);

		gl_FragColor = finalColor;
	}
`;
