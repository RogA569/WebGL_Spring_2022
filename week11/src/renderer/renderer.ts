import './style.css';
import * as THREE from 'three';
import Stats from 'three/examples/jsm/libs/stats.module';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { DragControls } from 'three/examples/jsm/controls/DragControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { Raycaster, Shading } from 'three';

import vertexShader from '../../resources/shaders/shader.vert';
import fragmentShader from '../../resources/shaders/shader.frag';

import * as DAT from 'dat.gui';

let model = {
    gravitConstant: 2,
    scale: 1.5,
}

let renderer: THREE.WebGLRenderer;
let scene: THREE.Scene;
let camera: THREE.PerspectiveCamera;
let pointLight: THREE.PointLight;
let ambientLight: THREE.AmbientLight;
let clock: THREE.Clock;

let dragControls: DragControls;
let orbitControls: OrbitControls;
let stats: any;

let raycaster: THREE.Raycaster;
let pointerPosition: THREE.Vector2;

let shaderMat: THREE.ShaderMaterial;
let plane: THREE.Mesh;

let cookie: THREE.Group;
let cookies: THREE.Group[];
let randomPosition: THREE.Vector3;
let attractorPoint: THREE.Vector3;
let velocity: THREE.Vector3;
let acceleration: THREE.Vector3;

// for raycasting in function animate()
interface MeshObj extends THREE.Object3D<THREE.Event> {
    material: THREE.MeshPhongMaterial;
}
// for GLTFLoader's reference
interface gltfMesh extends THREE.Object3D<THREE.Event> {
    material: THREE.Material;
}

const loader = new GLTFLoader().setPath('../resources/models/');

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
    gui.add(model, 'gravitConstant', 1, 4);
    gui.add(model, 'scale', 0.1, 12, 0.5);
}

function initScene() {
    renderer = new THREE.WebGLRenderer();
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement);

    scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
	camera.position.set(0, 0, 60);
	renderer = renderer;

	const shadowIntensity = 0.25; // https://github.com/mrdoob/three.js/pull/14087#issuecomment-431003830
	pointLight = new THREE.PointLight(0xFFFFFF);
	pointLight.position.set(-0.5, 0.5, 35);
    pointLight.castShadow = true;
    pointLight.intensity = 1 - shadowIntensity;
    scene.add(pointLight);

    ambientLight = new THREE.AmbientLight(0xFFFFFF);
    ambientLight.intensity = shadowIntensity - .05;
    scene.add(ambientLight);

	clock = new THREE.Clock();

    orbitControls = new OrbitControls(camera, renderer.domElement);

    raycaster = new THREE.Raycaster();
    pointerPosition = new THREE.Vector2(0, 0);

    // Shader setup
	const uniforms = {
        u_time: { type: 'f', value: 1.0 },
        u_resolution: { type: 'v2', value: new THREE.Vector2(800,800) },
	};

	shaderMat = new THREE.ShaderMaterial({
		uniforms: uniforms,
		vertexShader: vertexShader,
		fragmentShader: fragmentShader,
		side: THREE.DoubleSide,
	})

	// Plane
	const geometryPlane = new THREE.PlaneBufferGeometry(6, 6, 10, 10);
	// const geometryPlane = new PlaneGeometry(5000, 5000);
    const materialPlane = new THREE.MeshPhongMaterial({ 
		color: 0x666666, 
		side: THREE.DoubleSide,
		flatShading: true		
	});
	plane = new THREE.Mesh(geometryPlane, materialPlane);
    plane.position.z = -200;
    plane.scale.set(150, 125, 1);
    plane.receiveShadow = true;
    scene.add(plane);

    // for the GLTFLoaders to refer to
    interface gltfMesh extends THREE.Object3D<THREE.Event> {
        material: THREE.Material;
    }

    // initialize some cookie values
    cookies = [];
    // use user-defined function getRandomNumInRange... defined further down this program
    randomPosition = new THREE.Vector3(getRandomNumInRange(25), getRandomNumInRange(25), getRandomNumInRange(25));

    // Init animation
    animate();
}

function initListeners() {
    window.addEventListener('resize', onWindowResize, false);

    window.addEventListener('pointermove', onPointerMove);

    window.addEventListener('keydown', (event) => {
        const { key } = event;

        // MAYBE IMPLEMENT A RESTART KEY EVENT HERE
        switch (key) {
            case ' ':
                if (cookies.length != 3) {
                    loader.load('cookie.gltf', function (gltf) {

                        const cookieMaterial = new THREE.MeshToonMaterial({color: 0x542919});

                        cookie = gltf.scene;

                        // can be changed with GUI
                        let cookieScale = model.scale;
                        cookie.scale.set(cookieScale, cookieScale, cookieScale);

                        if (cookies.length == 0) {                        
                            cookie.position.set(0, 0, 0);
                            // For gravitional attraction in function attraction(); only to first cookie created
                            attractorPoint = new THREE.Vector3(cookie.position.x, cookie.position.y, cookie.position.z);
                        } else {
                            // randomPosition for every cookie after first one; using user-defined function getRandomNumInRange... defined further down this program
                            randomPosition = new THREE.Vector3(getRandomNumInRange(50), getRandomNumInRange(50), getRandomNumInRange(50));
                            cookie.position.set(randomPosition.x, randomPosition.y, randomPosition.z);

                            velocity = new THREE.Vector3();
                            acceleration = new THREE.Vector3();
                        }

                        cookies.push(cookie);
                        scene.add(cookie);

                        cookie.traverse((child: THREE.Object3D<THREE.Event>) => {
                            if (child.type === "Mesh") {
                                let childNameSliced = child.name.slice(0, 4);
                                if (childNameSliced === "Cone") {
                                    (child as gltfMesh).material = cookieMaterial;
                                }
                            }
                        });
                    });
                }
                break;
            case 'ArrowLeft':
                if (cookies.length > 0) {
                    cookies[0].position.x -= 0.1;
                    attractorPoint.setX(cookies[0].position.x);
                }
                break;
            case 'ArrowRight':
                if (cookies.length > 0) {
                    cookies[0].position.x += 0.1;
                    attractorPoint.setX(cookies[0].position.x);
                }
                break;
            case 'ArrowUp':
                if (cookies.length > 0) {
                    cookies[0].position.y += 0.1;
                    attractorPoint.setY(cookies[0].position.y);
                }
                break;
            case 'ArrowDown':
                if (cookies.length > 0) {
                    cookies[0].position.y -= 0.1;
                    attractorPoint.setY(cookies[0].position.y);
                }
                break;
            case 'e':
                const win = window.open('', 'Canvas Image');

                const { domElement } = renderer;

                // Makse sure scene is rendered.
                renderer.render(scene, camera);

                const src = domElement.toDataURL();

                if (!win) return;

                win.document.write(`<img src='${src}' width='${domElement.width}' height='${domElement.height}'>`);
                break;

            default:
                break;
        }
    });
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function onPointerMove(event: PointerEvent) {
    pointerPosition.x = (event.clientX / window.innerWidth) * 2 - 1;
    pointerPosition.y = -(event.clientY / window.innerHeight) * 2 + 1;
}

// The majority of this function's design is based on a Coding Train video I watched (p5.js --> three.js)
// https://www.youtube.com/watch?v=OAcXnzRNiCY
function attraction(target: THREE.Vector3, cookie: THREE.Object3D) { // target => attractorPoint
    let force = target.sub(cookie.position);

    // calculate distance squared, but only after contraining the force's magnitude
    let distanceSquared = force.clampLength(1, 4).lengthSq();
    
    const gravitConstant = model.gravitConstant;
    let forceLength = gravitConstant / distanceSquared;
    force.setLength(forceLength);
    acceleration.add(force);
}

// function from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random#getting_a_random_number_between_two_values
function getRandomNumInRange(minOrMax: number, max?: number) {
    // this link helped me out with optional parameters:
    // https://www.typescripttutorial.net/typescript-tutorial/typescript-optional-parameters/
    if (typeof max !== 'undefined') {
        return Math.random() * (max - minOrMax) + minOrMax;
    }
    return Math.random() * (minOrMax);
}

function animate() {
    requestAnimationFrame(() => {
        animate();
    });

    let delta = clock.getDelta();

	const vertArray = plane.geometry.attributes.position;
	// console.log(vertArray)

	for (let i = 0; i < vertArray.count; i++) {
		vertArray.setZ(i, 
			Math.sin(clock.getElapsedTime()+i-vertArray.count/2)*10
			+ Math.cos(clock.getElapsedTime()-i)*10)
	}
	plane.geometry.attributes.position.needsUpdate = true;

	shaderMat.uniforms.u_time.value += delta;
    
    // Attraction; this link to Coding Train code assisted me in implementation:
    // https://github.com/CodingTrain/website/blob/main/CodingChallenges/CC_056_attraction_repulsion/P5/particle.js
    if (cookies.length > 0) {
        attractorPoint.set(cookies[0].position.x, cookies[0].position.y, cookies[0].position.z);
        for (let cookieIndex = 1; cookieIndex < cookies.length; cookieIndex++) {
            attraction(attractorPoint, cookies[cookieIndex]);
            velocity.add(acceleration);
            velocity.clampLength(0, 7);
            if (velocity.length() == 7) {
                window.electronAPI.writeLEDStatus(1);
            } else {
                window.electronAPI.writeLEDStatus(0);
            }
            cookies[cookieIndex].position.add(velocity);
            acceleration = new THREE.Vector3(0, 0, 0);
        }
    }

    raycaster.setFromCamera(pointerPosition, camera);

    if (stats) stats.update();

    renderer.render(scene, camera);
}

main();

export interface IElectronAPI {
    handleBackground: (callback: (event: any, value: any) => void) => void;
    writeLEDStatus: (onOff:1|0) => any
}

declare global {
    interface Window {
        electronAPI: IElectronAPI;
    }
}