import {
	Mesh,
	Renderer,
	PointLight,
	CapsuleGeometry,
	MeshPhongMaterial,
	Group,
	Material,
	RepeatWrapping,
	MeshBasicMaterial,
	WebGLRenderer,
	Clock,
	Vector2
} from 'three';
import { BaseView } from "./BaseView";
import sound from '../assets/audio/narration_4.mp3';
import { gsap } from "gsap";

export class ViewFour extends BaseView {

	light: PointLight;
	tl: any;
	start_tl: boolean;
	redCapsule: Mesh;
	blueCapsule: Mesh;
	audio_elem: HTMLAudioElement;

	constructor(model: any, renderer: WebGLRenderer){
		super(model, renderer);

		this.light = new PointLight(0xFFFFFF, 1, 0);
		this.light.position.set(100, 200, 100);
		this.scene.add(this.light);

		this.tl = gsap.timeline();
		this.start_tl = false;

		const capsuleGeo = new CapsuleGeometry(0.65, 1.2, 4, 8);
		const redCapsuleMat = new MeshPhongMaterial({color: 0xFF0000});
		const blueCapsuleMat = new MeshPhongMaterial({color: 0x0000FF});

		this.redCapsule = new Mesh(capsuleGeo, redCapsuleMat);
		this.redCapsule.position.set(5, -5, 0);
		this.blueCapsule = new Mesh(capsuleGeo, blueCapsuleMat);
		this.blueCapsule.position.set(-5, -5, 0);
		
		this.scene.add(this.redCapsule, this.blueCapsule);

		this.audio_elem = document.createElement('audio');
		this.audio_elem.src = sound;
		// audio_elem.play();
	}

	update(clock: Clock, delta: number): void {
		if (this.start_tl) {
			this.tl.to(this.redCapsule.position,
				{
					x: 0,
					y: 0,
					duration: 4,
					ease: "sine.inOut"
				},
			);
			this.tl.to(this.redCapsule.position,
				{
					x: -5,
					y: -5,
					duration: 4,
					ease: "sine.inOut"
				},
			);
			this.tl.to(this.blueCapsule.position,
				{
					x: 0,
					y: 0,
					duration: 4,
					ease: "sine.inOut"
				},
			);
			this.tl.to(this.blueCapsule.position,
				{
					x: 5,
					y: -5,
					duration: 4,
					ease: "sine.inOut"
				},
			);
			this.redCapsule.rotation.z += delta;
			this.blueCapsule.rotation.z += delta;
		}
	}
}

interface gltfMesh extends THREE.Object3D<THREE.Event> {
	material: THREE.Material;
}