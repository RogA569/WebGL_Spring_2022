import {
	Mesh,
	Renderer,
	PointLight,
	TorusGeometry,
	MeshToonMaterial,
	Group,
	Material,
	RepeatWrapping,
	MeshBasicMaterial,
	WebGLRenderer,
	Clock,
	Vector2
} from 'three';
import { BaseView } from "./BaseView";
import { gsap } from "gsap";
import sound from '../assets/audio/narration_2.mp3';

export class ViewTwo extends BaseView {

	light: PointLight;
	tl: any;
	start_tl: boolean;
	torus: Mesh;
	audio_elem: HTMLAudioElement;

	constructor(model: any, renderer: WebGLRenderer){
		super(model, renderer);

		this.light = new PointLight(0xFFFFFF, 1, 0);
		this.light.position.set(100, 200, 100);
		this.scene.add(this.light);

		this.tl = gsap.timeline();
		this.start_tl = false;

		const torusGeo = new TorusGeometry(5, 1, 30, 200);
		const torusMat = new MeshToonMaterial({ color: 0x38B8F9 });
		this.torus = new Mesh(torusGeo, torusMat);
		this.torus.position.set(0, -20, -10);
		this.scene.add(this.torus);

		this.audio_elem = document.createElement('audio');
		this.audio_elem.src = sound;
		// audio_elem.play();
	}

	update(clock: Clock, delta: number): void {
		// tl stuff
		if (this.start_tl) {
			this.tl.to(this.torus.position,
				{
					y: 0,
					duration: 9,
					ease: "elastic.out(1, 0.3)"
				}
			);
			this.tl.to(this.torus.rotation,
				{
					x: Math.PI,
					y: -Math.PI * 2,
					duration: 9,
					ease: "circ.inOut"
				}, "-=0.2"
			);
		}
	}
}

interface gltfMesh extends THREE.Object3D<THREE.Event> {
	material: THREE.Material;
}