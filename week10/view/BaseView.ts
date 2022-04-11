import { 
	Scene, 
	PerspectiveCamera, 
	WebGLRenderer, 
	Clock, 
	PointLight, 
	AmbientLight,
	PlaneBufferGeometry, 
	PlaneGeometry,
	MeshPhongMaterial, 
	DoubleSide, 
	Mesh,
	ShaderMaterial,
	Vector2
} from "three";

import vertexShader from '../resources/shaders/shader.vert?raw';
import fragmentShader from '../resources/shaders/shader.frag?raw';

export class BaseView {
	scene: Scene;
	camera: PerspectiveCamera;
	renderer: WebGLRenderer;
	pointLight: PointLight;
	ambientLight: AmbientLight;
	clock: Clock;
	plane: Mesh;
	shaderMat: ShaderMaterial ;

	model: any;

	constructor(model: any, renderer: WebGLRenderer) {
		this.scene = new Scene();
		this.camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
		this.camera.position.set(0, 0, 60);
		this.renderer = renderer;
		this.model = model;

		const shadowIntensity = 0.25; // https://github.com/mrdoob/three.js/pull/14087#issuecomment-431003830
		this.pointLight = new PointLight(0xFFFFFF);
		this.pointLight.position.set(-0.5, 0.5, 35);
	    this.pointLight.castShadow = true;
	    this.pointLight.intensity = 1 - shadowIntensity;
	    this.scene.add(this.pointLight);

	    this.ambientLight = new AmbientLight(0xFFFFFF);
	    this.ambientLight.intensity = shadowIntensity - .05;
	    this.scene.add(this.ambientLight);

		this.clock = new Clock();

		// Shader setup
		const uniforms = {
	        u_time: { type: 'f', value: 1.0 },
	        u_resolution: { type: 'v2', value: new Vector2(800,800) },
    	};

		this.shaderMat = new ShaderMaterial({
			uniforms: uniforms,
			vertexShader: vertexShader,
			fragmentShader: fragmentShader,
			side: DoubleSide,
		})

		// Plane
		const geometryPlane = new PlaneBufferGeometry(6, 6, 10, 10);
		// const geometryPlane = new PlaneGeometry(5000, 5000);
	    const materialPlane = new MeshPhongMaterial({ 
			color: 0x666666, 
			side: DoubleSide,
			flatShading: true		
		});
		this.plane = new Mesh(geometryPlane, materialPlane);
	    this.plane.position.z = -200;
	    this.plane.scale.set(150, 125, 1);
	    this.plane.receiveShadow = true;
	    this.scene.add(this.plane);
	}

	update(): void {
		let delta = this.clock.getDelta();

		const vertArray = this.plane.geometry.attributes.position;
		// console.log(vertArray)

		for (let i = 0; i < vertArray.count; i++) {
			vertArray.setZ(i, 
				Math.sin(this.clock.getElapsedTime()+i-vertArray.count/2)*10
				+ Math.cos(this.clock.getElapsedTime()-i)*10)
		}
		this.plane.geometry.attributes.position.needsUpdate = true;

		this.shaderMat.uniforms.u_time.value += delta;
	}
}