precision mediump float;

uniform float u_time;

varying vec2 UV;

void main(){
	UV = uv;
	vec4 mvPosition = modelViewMatrix*vec4(position,1.);
	mvPosition.y += sin(u_time+uv.x);
	gl_Position = projectionMatrix*mvPosition;
}