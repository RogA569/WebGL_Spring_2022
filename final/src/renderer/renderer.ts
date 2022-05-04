import './style.css';
import * as THREE from 'three';
import { Raycaster, ShaderMaterial, Shading, Vector2 } from 'three';
import Stats from 'three/examples/jsm/libs/stats.module';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import * as DAT from 'dat.gui';

import { BaseView } from './Views/BaseView';
import { ViewOne } from './Views/ViewOne';
import { ViewTwo } from './Views/ViewTwo';
import { ViewThree } from './Views/ViewThree';
import { ViewFour } from './Views/ViewFour';
import { ViewFive } from './Views/ViewFive';
import { ViewSix } from './Views/ViewSix';
import { ViewSeven } from './Views/ViewSeven';
import { ViewEight } from './Views/ViewEight';

let model = {
	groupX: 0,
	groupY: 0,
	groupAngle: 0,
	activeView: 0,
}

let renderer: THREE.WebGLRenderer;
let clock = new THREE.Clock();
let stats: any;
let viewOne: ViewOne;
let viewTwo: ViewTwo;
let viewThree: ViewThree;
let viewFour: ViewFour;
let viewFive: ViewFive;
let viewSix: ViewSix;
let viewSeven: ViewSeven;
let viewEight: ViewEight;
let views: BaseView[] = [];

function main() {
	initScene();
	initStats();
	initGUI();
	initListeners();
}

function initStats() {
	stats = new (Stats as any)();
	document.body.appendChild(stats.dom);
}

function initGUI() {
	const gui = new DAT.GUI();
}

function initScene() {

	renderer = new THREE.WebGLRenderer();
	renderer.shadowMap.enabled = true;
	renderer.shadowMap.type = THREE.PCFSoftShadowMap;
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(window.innerWidth, window.innerHeight);

	document.body.appendChild(renderer.domElement);

	viewOne = new ViewOne(model, renderer);
	viewTwo = new ViewTwo(model, renderer);
	viewThree = new ViewThree(model, renderer);
	viewFour = new ViewFour(model, renderer);
	viewFive = new ViewFive(model, renderer);
	viewSix = new ViewSix(model, renderer);
	viewSeven = new ViewSeven(model, renderer);
	viewEight = new ViewEight(model, renderer);

	views.push(viewOne, viewTwo, viewThree, viewFour, viewFive, viewSix, viewSeven, viewEight);

	// Init animation
	animate();
}

function initListeners() {

	window.electronAPI.changePage((event: any, value: any) => {
		// console.log(event)
		console.log(value)
		let prev_view = model.activeView; // capture current view before it changes
		if (model.activeView % 2 == 0) {
			if (value >= 0.5) {
				model.activeView = (model.activeView + 1) % views.length;
			}
		} else {
			if (value <= -0.5) {
				model.activeView = (model.activeView + 1) % views.length;
				if (prev_view == 7) { // user went back to the first page
					// last "page" / ending LED special interactions (red)
					window.electronAPI.writeLEDStatus(1);
				}
			}
		}

		// play view's narration/animation on a case-by-case basis
		switch (model.activeView) {
			case 0:
				viewEight.audio_elem.pause();
				viewEight.audio_elem.currentTime = 0;
				viewOne.audio_elem.play();
				viewOne.tl.restart();
				break;
			case 1:
				viewOne.audio_elem.pause();
				viewOne.audio_elem.currentTime = 0;
				viewTwo.audio_elem.play();
				viewTwo.start_tl = true;
				break;
			case 2:
				viewTwo.audio_elem.pause();
				viewTwo.audio_elem.currentTime = 0;
				viewThree.audio_elem.play();
				viewThree.start_tl = true;
				break;
			case 3:
				viewThree.audio_elem.pause();
				viewThree.audio_elem.currentTime = 0;
				viewFour.audio_elem.play();
				viewFour.start_tl = true;
				break;
			case 4:
				viewFour.audio_elem.pause();
				viewFour.audio_elem.currentTime = 0;
				viewFive.audio_elem.play();
				viewFive.start_tl = true;
				break;
			case 5:
				viewFive.audio_elem.pause();
				viewFive.audio_elem.currentTime = 0;
				viewSix.audio_elem.play();
				viewSix.start_tl = true;
				break;
			case 6:
				viewSix.audio_elem.pause();
				viewSix.audio_elem.currentTime = 0;
				viewSeven.audio_elem.play();
				viewSeven.start_tl = true;
				break;
			case 7:
				viewSeven.audio_elem.pause();
				viewSeven.audio_elem.currentTime = 0;
				viewEight.audio_elem.play();
				viewEight.start_tl = true;
				break;
			default:
				break;
		}
		// last "page" / ending LED special interactions (green)
		if (model.activeView == 7) {
			window.electronAPI.writeLEDStatus(0);
		}
		
	})

	window.addEventListener('resize', onWindowResize, false);

	window.addEventListener('keydown', (event) => {
		const { key } = event;
		// console.log(key);

		switch (key) {
			case 'ArrowRight':
				model.activeView = (model.activeView + 1) % views.length
				// Test Switch
				switch (model.activeView) {
					case 0:
						viewEight.audio_elem.pause();
						viewEight.audio_elem.currentTime = 0;
						viewOne.audio_elem.play();
						viewOne.tl.restart();
						break;
					case 1:
						viewOne.audio_elem.pause();
						viewOne.audio_elem.currentTime = 0;
						viewTwo.audio_elem.play();
						viewTwo.start_tl = true;
						break;
					case 2:
						viewTwo.audio_elem.pause();
						viewTwo.audio_elem.currentTime = 0;
						viewThree.audio_elem.play();
						viewThree.start_tl = true;
						break;
					case 3:
						viewThree.audio_elem.pause();
						viewThree.audio_elem.currentTime = 0;
						viewFour.audio_elem.play();
						viewFour.start_tl = true;
						break;
					case 4:
						viewFour.audio_elem.pause();
						viewFour.audio_elem.currentTime = 0;
						viewFive.audio_elem.play();
						viewFive.start_tl = true;
						break;
					case 5:
						viewFive.audio_elem.pause();
						viewFive.audio_elem.currentTime = 0;
						viewSix.audio_elem.play();
						viewSix.start_tl = true;
						break;
					case 6:
						viewSix.audio_elem.pause();
						viewSix.audio_elem.currentTime = 0;
						viewSeven.audio_elem.play();
						viewSeven.start_tl = true;
						break;
					case 7:
						viewSeven.audio_elem.pause();
						viewSeven.audio_elem.currentTime = 0;
						viewEight.audio_elem.play();
						viewEight.start_tl = true;
						break;
					default:
						break;
				}
				break;

			case 'ArrowLeft':
				model.activeView = (model.activeView - 1)
				if (model.activeView < 0) {
					model.activeView = views.length - 1;
				}
				break;

			default:
				break;
		}
	});
}

function onWindowResize() {
	viewOne.onWindowResize();
	viewTwo.onWindowResize();
}

function animate() {
	requestAnimationFrame(() => {
		animate();
	});

	let delta = clock.getDelta();

	switch (model.activeView) {
		case 0:
			viewOne.update(clock,delta);
			break;

		case 1:
			viewTwo.update(clock,delta);
			break;

		case 2:
			viewThree.update(clock,delta);
			break;

		case 3:
			viewFour.update(clock,delta);
			break;

		case 4:
			viewFive.update(clock,delta);
			break;

		case 5:
			viewSix.update(clock,delta);
			break;

		case 6:
			viewSeven.update(clock,delta);
			break;

		case 7:
			viewEight.update(clock,delta);
			break;

		default:
			break;
	}


	if (stats) stats.update();

	renderer.render(views[model.activeView].scene, views[model.activeView].camera);
}

main();


interface MeshObj extends THREE.Object3D<THREE.Event> {
	material: THREE.MeshPhongMaterial;
}

interface gltfMesh extends THREE.Object3D<THREE.Event> {
	material: THREE.Material;
}

interface ColorMaterial extends THREE.Material {
	color: THREE.Color;
}

export interface IElectronAPI {
	changePage: (callback: (event:any, value:any) => void) => void,
	writeLEDStatus: (onOff:1|0) => any
}

declare global {
	interface Window {
		electronAPI: IElectronAPI;
	}
}