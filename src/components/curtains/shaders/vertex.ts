export default `
	precision mediump float;

	attribute vec3 aVertexPosition;
	attribute vec2 aTextureCoord;

	uniform mat4 uMVMatrix;
	uniform mat4 uPMatrix;

	varying vec3 vVertexPosition;
	varying vec3 vOriginalVertexPosition;
	varying vec2 vTextureCoord;

	uniform float uTime;
	uniform float uMovScaleLeft;
	uniform float uMovScaleRight;

	void main() {

		vec3 vertexPosition = aVertexPosition;

		float yCoordRatio = vertexPosition.y - .0;

		float xOffsetLeft = distance(vec2(vertexPosition.x, 1.5), vec2(vertexPosition.y, 0)); 
		float xOffsetRight = distance(-vec2(vertexPosition.x, 1.5), vec2(vertexPosition.y, 0));
		float zOffset = distance(vec2(vertexPosition.z, 1.9), vec2(vertexPosition.y, 0));

		float xMovementLeft = uMovScaleLeft * cos(30. * ((1. / (cos(xOffsetLeft) - 2.)) - uTime * 0.001));
		float xMovementRight = uMovScaleRight * cos(40. * ((1. / (cos(xOffsetRight) - 2.)) - uTime * 0.0005));
		float zMovement = 1. * cos(35. * ((1. / (cos(zOffset) - 2.)) - uTime * 0.0005));
		float yAttenuation = -.4 * vertexPosition.y;
		yAttenuation = clamp(yAttenuation, 0., 1.);

		float windEffect = yCoordRatio * (xMovementLeft + xMovementRight + zMovement) * yAttenuation;
		float xDisplacement = abs(yCoordRatio) * sign(vertexPosition.x);

		vertexPosition.z +=  windEffect / 30.0;
		vertexPosition.x +=  windEffect * 1.5 * xDisplacement / 240.0;

		gl_Position = uPMatrix * uMVMatrix * vec4(vertexPosition, 1.0);

		vTextureCoord = aTextureCoord;
		vVertexPosition = vertexPosition;
		vOriginalVertexPosition = aVertexPosition;
	}
`;
