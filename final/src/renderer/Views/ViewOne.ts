import {
	Mesh,
	Renderer,
	BoxGeometry,
	MeshPhongMaterial,
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
import * as path from "path";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { BaseView } from "./BaseView";

import modelPath from '../assets/models/exampleModel.gltf';

export class ViewOne extends BaseView{

	group: Group;
	cube: Mesh;
	// plane: Mesh;
	// exampleModel: Group;

	// lightAmbient: AmbientLight;
	// lightPoint: PointLight;

	// shaderMat: ShaderMaterial;

	constructor(model: any, renderer: WebGLRenderer){
		super(model, renderer);

		// this.exampleModel = new Group();
		this.group = new Group();
		this.scene.add(this.group);

		const cubeGeometry = new BoxGeometry();
		const cubeMaterial = new MeshPhongMaterial({ color: 0xf0bbbb });
		// cubeMaterial.wireframe = true;
		this.cube = new Mesh(cubeGeometry, cubeMaterial);
		this.cube.castShadow = true;

		this.group.add(this.cube);

		// const geometryPlane = new PlaneBufferGeometry(6, 6, 10, 10);
		// const materialPlane = new MeshPhongMaterial({
		// 	color: 0x666666,
		// 	side: DoubleSide,
		// 	flatShading: true,
		// });
		
		// const uniforms = {
		// 	u_time: { type: 'f', value: 1.0 },
		// 	u_resolution: { type: 'v2', value: new Vector2(800, 800) },
			// u_mouse: { type: 'v2', value: new THREE.Vector2() },
		// };
	
		// this.shaderMat = new ShaderMaterial({
		// 	uniforms: uniforms,
		// 	vertexShader: model.vertexShader,
		// 	fragmentShader: model.fragmentShader,
		// 	side: DoubleSide,
		// });

		// this.plane = new Mesh(geometryPlane, materialPlane)//this.shaderMat);
		// this.plane.position.z = -2;
		// this.plane.receiveShadow = true;
		// this.scene.add(this.plane);

		// this.lightAmbient = new AmbientLight(0x333333);
		// this.scene.add(this.lightAmbient);

		// this.lightPoint = new PointLight(0xffffff);
		// this.lightPoint.position.set(-0.5, 0.5, 4);
		// this.lightPoint.castShadow = true;
		// this.lightPoint.intensity = 0.25;
		// this.scene.add(this.lightPoint);

		const mapSize = 1024; // Default 512
		const cameraNear = 0.5; // Default 0.5
		const cameraFar = 500; // Default 500
		// this.lightPoint.shadow.mapSize.width = mapSize;
		// this.lightPoint.shadow.mapSize.height = mapSize;
		// this.lightPoint.shadow.camera.near = cameraNear;
		// this.lightPoint.shadow.camera.far = cameraFar;

		// const modelLoader = new GLTFLoader()
		// modelLoader.load(modelPath, (gltf) => {
		// 	this.exampleModel = gltf.scene;
		// 	// console.log(this.exampleModel);

		// 	this.exampleModel.scale.set(0.01, 0.01, 0.01);
		// 	this.exampleModel.position.x = 2;

		// 	this.exampleModel.traverse((child: THREE.Object3D<THREE.Event>) => {
		// 		// console.log(child);
		// 		// console.log(child.type === 'Mesh');
		// 		if (child.type === 'Mesh') {
		// 			(child as gltfMesh).material = new MeshPhongMaterial({color: 0xd90429});
		// 		}
		// 	});

		// 	this.group.add(this.exampleModel);
		// });
		// let audio_elem = <HTMLAudioElement> document.getElementById("narration_1");
		// const filePath = __dirname + './assets/audio/narration_1.mp3';
		// const audio_uri = createSongUri(filePath, 'audio/mp3');
		// let audio_elem = document.createElement('audio');
		// audio_elem.src = audio_uri;
		// audio_elem.crossOrigin = 'anonymous';
		// audio_elem.play()
		// 	.then(() => {
		// 		// Audio is playing.
		// 	})
		// 	.catch(error => {
		// 		console.log(error);
		// 	});
		// console.log(audio_elem);
	}

	update(clock: Clock, delta: number): void {

		// this.shaderMat.uniforms.u_time.value += delta;

		this.cube.rotation.x += 0.01;
		this.cube.rotation.y += 0.01;

		this.group.rotation.set(0, 0, this.model.groupAngle);
		this.group.position.set(this.model.groupX, this.model.groupY, 0);

		// const vertArray = this.plane.geometry.attributes.position;
		// for (let i = 0; i < vertArray.count; i++) {
		// 	vertArray.setZ(i, Math.sin(clock.getElapsedTime() + i - vertArray.count / 2) * 0.5 + Math.cos(clock.getElapsedTime() - i) * 0.5);
		// }
		// this.plane.geometry.attributes.position.needsUpdate = true;


		// if (this.exampleModel != undefined) {
		// 	this.exampleModel.rotateX(0.01);
		// 	this.exampleModel.rotateY(0.01);
		// }
	}
}

interface gltfMesh extends THREE.Object3D<THREE.Event> {
	material: THREE.Material;
}