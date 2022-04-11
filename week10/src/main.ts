import './style.scss';
import * as THREE from 'three';
import Stats from 'three/examples/jsm/libs/stats.module';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { DragControls } from 'three/examples/jsm/controls/DragControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { Raycaster, Shading } from 'three';
import { BaseView } from '../view/BaseView';

import * as DAT from 'dat.gui';

let model = {
    gravitConstant: 2,
    scale: 1.5,
}

let renderer: THREE.WebGLRenderer;
let clock = new THREE.Clock();

let dragControls: DragControls;
let orbitControls: OrbitControls;
let stats: any;

let raycaster: THREE.Raycaster;
let pointerPosition: THREE.Vector2;

let cookie: THREE.Group;
let cookies: THREE.Group[];
let randomPosition: THREE.Vector3;
let attractorPoint: THREE.Vector3;
let velocity: THREE.Vector3;
let acceleration: THREE.Vector3;

let baseView: BaseView;

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

    baseView = new BaseView(model, renderer);

    // dragControls = new DragControls(baseView.scene.children, baseView.camera, renderer.domElement);
    orbitControls = new OrbitControls(baseView.camera, renderer.domElement);

    raycaster = new THREE.Raycaster();
    pointerPosition = new THREE.Vector2(0, 0);

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
                        baseView.scene.add(cookie);

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
                renderer.render(baseView.scene, baseView.camera);

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
    baseView.camera.aspect = window.innerWidth / window.innerHeight;
    baseView.camera.updateProjectionMatrix();
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
    
    // Attraction; this link to Coding Train code assisted me in implementation:
    // https://github.com/CodingTrain/website/blob/main/CodingChallenges/CC_056_attraction_repulsion/P5/particle.js
    if (cookies.length > 0) {
        attractorPoint.set(cookies[0].position.x, cookies[0].position.y, cookies[0].position.z);
        for (let cookieIndex = 1; cookieIndex < cookies.length; cookieIndex++) {
            attraction(attractorPoint, cookies[cookieIndex]);
            velocity.add(acceleration);
            velocity.clampLength(0, 7);
            if (velocity.length() == 7) {
                console.log("Point!")
            }
            cookies[cookieIndex].position.add(velocity);
            acceleration = new THREE.Vector3(0, 0, 0);
        }
    }

    raycaster.setFromCamera(pointerPosition, baseView.camera);

    if (stats) stats.update();

    renderer.render(baseView.scene, baseView.camera);
    if (baseView) baseView.update();
}

main();
