import {
	Mesh,
	Renderer,
	BoxGeometry,
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

export class ViewFive extends BaseView {

	group: Group;
	cube: Mesh;

	constructor(model: any, renderer: WebGLRenderer){
		super(model, renderer);

		this.group = new Group();
		this.scene.add(this.group);

		const cubeGeometry = new BoxGeometry();
		const cubeMaterial = new MeshPhongMaterial({ color: 0xFF00FF });
		this.cube = new Mesh(cubeGeometry, cubeMaterial);
		this.cube.castShadow = true;

		this.group.add(this.cube);

		const mapSize = 1024; // Default 512
		const cameraNear = 0.5; // Default 0.5
		const cameraFar = 500; // Default 500
	}

	update(clock: Clock, delta: number): void {

		this.cube.rotation.x += 0.01;
		this.cube.rotation.y += 0.01;

		this.group.rotation.set(0, 0, this.model.groupAngle);
		this.group.position.set(this.model.groupX, this.model.groupY, 0);
	}
}

interface gltfMesh extends THREE.Object3D<THREE.Event> {
	material: THREE.Material;
}