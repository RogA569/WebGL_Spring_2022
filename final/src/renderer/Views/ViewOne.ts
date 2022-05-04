import {
	Mesh,
	Renderer,
	BoxGeometry,
	SphereGeometry,
	MeshPhongMaterial,
	MeshToonMaterial,
	AmbientLight,
	PointLight,
	Group,
	Material,
	RepeatWrapping,
	MeshBasicMaterial,
	WebGLRenderer,
	PlaneBufferGeometry,
	DoubleSide,
	Clock,
	ShaderMaterial,
	Vector2
} from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { BaseView } from "./BaseView";
import { gsap } from "gsap";

import sound from '../assets/audio/narration_1.mp3';


export class ViewOne extends BaseView{

	light: PointLight;
	golemShell: Mesh;
	tl: any;
	audio_elem: HTMLAudioElement;

	constructor(model: any, renderer: WebGLRenderer){
		super(model, renderer);

		this.light = new PointLight(0xFFFFFF, 1, 0);
		this.light.position.set(100, 200, 100);
		this.scene.add(this.light);	

		// decimal number (thetaLength) retrived from playing with GUI via this link:
		// https://threejs.org/docs/?q=sphere#api/en/geometries/SphereGeometry
		const sphereGeo = new SphereGeometry(1, 32, 16, 0, Math.PI * 2, 0, 2.1865484868985);
		const sphereMat = new MeshToonMaterial({color: 0xA8A9A1, side: DoubleSide});
		this.golemShell = new Mesh(sphereGeo, sphereMat);
		this.golemShell.position.set(-8, 0, 0);
		this.scene.add(this.golemShell);

		this.tl = gsap.timeline();

		// const geometryPlane = new PlaneBufferGeometry(6, 6, 10, 10);
		// const materialPlane = new MeshPhongMaterial({
		// 	color: 0x666666,
		// 	side: DoubleSide,
		// 	flatShading: true,
		// });

		// this.plane = new Mesh(geometryPlane, materialPlane)//this.shaderMat);
		// this.plane.position.z = -2;
		// this.plane.receiveShadow = true;
		// this.scene.add(this.plane);

		this.audio_elem = document.createElement('audio');
		this.audio_elem.src = sound;
		this.audio_elem.play();
	}

	update(clock: Clock, delta: number): void {
		this.tl.to(this.golemShell.rotation,
			{
				z: Math.PI,
				duration: 3,
				ease: "circ.out"
			}
		);
		this.tl.to(this.golemShell.position,
			{
				x: 0,
				duration: 3,
				ease: "circ.out"
			}, "<"
		);
	}
}

interface gltfMesh extends THREE.Object3D<THREE.Event> {
	material: THREE.Material;
}