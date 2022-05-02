import { Clock, PerspectiveCamera, Renderer, Scene, WebGLRenderer, SpotLight } from "three"

export class BaseView {

	scene: Scene;
	camera: PerspectiveCamera;
	renderer: WebGLRenderer;
	light: SpotLight;

	model: any;

	constructor(model: any, renderer: WebGLRenderer) {
		this.scene = new Scene();
		this.camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
		this.camera.position.z = 5;
		this.renderer = renderer;
		this.model = model;

		const dist = 100;
		const coneAttenuation = .75;
		this.light = new SpotLight();
		this.light.distance = dist;
		this.light.penumbra = coneAttenuation
		this.light.position.set(0, 30, 0);
		this.scene.add(this.light);
	}

	update(clock: Clock, delta: number): void {}

	onWindowResize() {
		this.camera.aspect = window.innerWidth / window.innerHeight;
		this.camera.updateProjectionMatrix();
		this.renderer.setSize(window.innerWidth, window.innerHeight);
	}
}