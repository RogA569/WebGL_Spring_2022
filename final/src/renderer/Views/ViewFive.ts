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
import sound from '../assets/audio/narration_5.mp3';
import pngTexture from '../assets/hello-world.png';

export class ViewFive extends BaseView {

	light: SpotLight;
	tl: any;
	start_tl: boolean;
	torusKnot: Mesh;
	earthSphere: Mesh;
	audio_elem: HTMLAudioElement;

	constructor(model: any, renderer: WebGLRenderer){
		super(model, renderer);

		const dist = 100;
		const coneAttenuation = .75;
		this.light = new SpotLight();
		this.light.distance = dist;
		this.light.intensity = 0;
		this.light.penumbra = coneAttenuation;
		this.light.position.set(0, 30, 6);
		this.scene.add(this.light);

		this.tl = gsap.timeline();
		this.start_tl = false;

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
			this.tl.to(this.light, 
				{
			 		intensity: 0.1,
			 		duration: 10,
			 		ease: "slow (0.7, 0.4, false)"
				}
			);
		}
	}
}

interface gltfMesh extends THREE.Object3D<THREE.Event> {
	material: THREE.Material;
}