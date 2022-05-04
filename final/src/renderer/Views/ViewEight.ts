import {
	Mesh,
	Renderer,
	PointLight,
	TorusKnotGeometry,
	SphereGeometry,
	TextureLoader,
	MeshPhongMaterial,
	Group,
	Material,
	RepeatWrapping,
	MeshBasicMaterial,
	WebGLRenderer,
	Clock,
	Vector2,
	SpotLight
} from 'three';
import { BaseView } from "./BaseView";
import { gsap } from "gsap";
import sound from '../assets/audio/narration_8.mp3';
import pngTexture from '../assets/hello-world.png';

export class ViewEight extends BaseView {

	lights: SpotLight[];
	tl: any;
	start_tl: boolean;
	torusKnot: Mesh;
	earthSphere: Mesh;
	audio_elem: HTMLAudioElement;

	constructor(model: any, renderer: WebGLRenderer){
		super(model, renderer);

		this.lights = [];

		this.tl = gsap.timeline();
		this.start_tl = false;

		for (let i = 0; i < 4; i++) {
			const dist = 100;
			const coneAttenuation = .75;
			let light = new SpotLight();
			light.distance = dist;
			light.intensity = 0;
			light.penumbra = coneAttenuation;
			light.position.set(0, 30 - i * 20, 6);
			this.scene.add(light);

			this.lights.push(light);
		}

		const torKnotGeo = new TorusKnotGeometry(10, 0.75, 100, 16);
		const torKnotMat = new MeshPhongMaterial({ color: 0x8D99AE });
		this.torusKnot = new Mesh(torKnotGeo, torKnotMat);
		this.torusKnot.position.set(0, 0, -20);
		this.scene.add(this.torusKnot);

		const sphereGeo = new SphereGeometry(4, 64, 32);
		const texture = new TextureLoader().load(pngTexture);
		const sphereMat = new MeshPhongMaterial({map: texture});
		this.earthSphere = new Mesh(sphereGeo, sphereMat);
		this.earthSphere.position.set(0, 0, -20);
		this.scene.add(this.earthSphere);

		this.audio_elem = document.createElement('audio');
		this.audio_elem.src = sound;
	}

	update(clock: Clock, delta: number): void {

		this.torusKnot.rotation.x += 0.01;
		this.torusKnot.rotation.y += 0.01;

		if (this.start_tl) {
			for (let i = 0; i < this.lights.length; i++) {
				this.tl.to(this.lights[i], 
					{
				 		intensity: 0.5,
				 		duration: 13,
				 		ease: "slow (0.7, 0.4, false)"
					}, `${i/2}`
				);
			}
		}
	}
}

interface gltfMesh extends THREE.Object3D<THREE.Event> {
	material: THREE.Material;
}