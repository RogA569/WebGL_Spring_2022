import './style.css';
import * as THREE from 'three';
import { Raycaster, ShaderMaterial, Shading, Vector2 } from 'three';
import Stats from 'three/examples/jsm/libs/stats.module';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import * as DAT from 'dat.gui';

import vertexShader from './assets/shaders/shader.vert';
import fragmentShader from './assets/shaders/shader.frag';

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
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
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
let shaderMat: ShaderMaterial;

function main() {
    // loadShaders()
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

	console.log(model.activeView);

	const uniforms = {
		u_time: { type: 'f', value: 1.0 },
		u_resolution: { type: 'v2', value: new THREE.Vector2(800, 800) },
		// u_mouse: { type: 'v2', value: new THREE.Vector2() },
	};

	shaderMat = new THREE.ShaderMaterial({
		uniforms: uniforms,
		vertexShader: vertexShader,
		fragmentShader: fragmentShader,
		side: THREE.DoubleSide,
	});

	// Init animation
	animate();
}

function initListeners() {

	window.electronAPI.changePage((event: any, value: any) => {
		// console.log(event)
		console.log(value)
		let prev_view = model.activeView; // capture current view before it changes
		if (model.activeView % 2 == 0) {
			if (value == 1) {
				model.activeView = (model.activeView + 1) % views.length;
			}
		} else {
			if (value == -1) {
				model.activeView = (model.activeView + 1) % views.length;
				if (prev_view == 7) { // user went back to the first page
					// last "page" / ending LED special interactions (red)
					window.electronAPI.writeLEDStatus(1);
				}
			}
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
			case 'e':
				const win = window.open('', 'Canvas Image');

				const { domElement } = renderer;

				// Makse sure scene is rendered.
                switch (model.activeView) {
                    case 0:
                        renderer.render(viewOne.scene, viewOne.camera);
                        break;
            
                    case 1:
                        renderer.render(viewTwo.scene, viewTwo.camera);
                        break;
            
                    default:
                        break;
                }

				const src = domElement.toDataURL();

				if (!win) return;

				win.document.write(`<img src='${src}' width='${domElement.width}' height='${domElement.height}'>`);
				break;

			case 'ArrowRight':
				model.activeView = (model.activeView + 1) % views.length
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
			// window.electronAPI.writeLEDBrightness((model.groupAngle + Math.PI) / (Math.PI*2))
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
	// writeLEDBrightness: (brightness: number) => any
}

declare global {
	interface Window {
		electronAPI: IElectronAPI;
	}
}