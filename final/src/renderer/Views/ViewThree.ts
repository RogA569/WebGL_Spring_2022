import {
	Mesh,
	Renderer,
	PointLight,
	SphereGeometry,
	MeshToonMaterial,
	TextureLoader,
	Material,
	PlaneBufferGeometry,
	DoubleSide,
	RepeatWrapping,
	MeshBasicMaterial,
	WebGLRenderer,
	Clock,
	Vector3
} from 'three';
import { BaseView } from "./BaseView";
import sound from '../assets/audio/narration_3.mp3';
import { gsap } from "gsap";
import pngTexture from "../assets/hello-world.png";

export class ViewThree extends BaseView {

	light: PointLight;
	tl: any;
	start_tl: boolean;
	earthSphere: Mesh;
	earthScale: Vector3;
	ticketPlane: Mesh;
	audio_elem: HTMLAudioElement;

	constructor(model: any, renderer: WebGLRenderer){
		super(model, renderer);

		this.light = new PointLight(0xFFFFFF, 1, 0);
		this.light.position.set(100, 0, 100);
		this.scene.add(this.light);

		this.tl = gsap.timeline();
		this.start_tl = false;

		const sphereGeo = new SphereGeometry(1, 64, 32);
		const texture = new TextureLoader().load(pngTexture);
		// const sphereMat = new MeshToonMaterial({map: texture});
		const sphereMat = new MeshToonMaterial({color: 0x00FF00});
		this.earthSphere = new Mesh(sphereGeo, sphereMat);
		this.earthScale = new Vector3(0, 0, 0);
		this.earthSphere.scale.set(this.earthScale.x, this.earthScale.y, this.earthScale.z);
		this.scene.add(this.earthSphere);

		const planeGeo = new PlaneBufferGeometry(0.9, 0.4, 10, 10);
		const planeMat = new MeshToonMaterial({
			color: 0xC7AD6D,
			side: DoubleSide,
		});
		this.ticketPlane = new Mesh(planeGeo, planeMat);
		this.ticketPlane.position.set(5, 5, 0.5);
		this.scene.add(this.ticketPlane);

		this.audio_elem = document.createElement('audio');
		this.audio_elem.src = sound;
		// audio_elem.play();
	}

	update(clock: Clock, delta: number): void {
		if (this.start_tl) {
			this.tl.to(this.earthScale,
				{
					x: 1,
					y: 1,
					z: 1,
					duration: 5,
					ease: "power3.out"
				}
			);
			this.tl.to(this.ticketPlane.position,
				{
					x: 0,
					y: 0,
					duration: 8,
					ease: "steps (20)"
				},
			);
			this.tl.to(this.ticketPlane.rotation,
				{
					x: Math.PI * 2,
					y: Math.PI * 4,
					duration: 5,
					ease: "rough ({ template: none.out, strength: 1, points: 20, taper: none, randomize: true, clamp: false})"
				}, "<"
			);
		}
		this.earthSphere.scale.set(this.earthScale.x, this.earthScale.y, this.earthScale.z);
		this.earthSphere.rotation.z += delta;
		this.light.position.x -= 20 * delta;
	}
}

interface gltfMesh extends THREE.Object3D<THREE.Event> {
	material: THREE.Material;
}