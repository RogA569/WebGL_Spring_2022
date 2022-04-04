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
    gui.add(model, 'gravitConstant', 1, 5);
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
    velocity = new THREE.Vector3();
    acceleration = new THREE.Vector3();
    // use user-defined function getRandomNumInRange(min, max)... defined further down this program
    randomPosition = new THREE.Vector3(getRandomNumInRange(0, 25), getRandomNumInRange(0, 25), getRandomNumInRange(0, 25));

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
                loader.load('cookie.gltf', function (gltf) {

                    const cookieMaterial = new THREE.MeshToonMaterial({color: 0x542919});

                    cookie = gltf.scene;

                    // set to a random position
                    cookie.position.set(randomPosition.x, randomPosition.y, randomPosition.z);
                    // shuffle randomPosition for the next time a cookie is created
                    randomPosition = new THREE.Vector3(getRandomNumInRange(0, 50), getRandomNumInRange(0, 50), getRandomNumInRange(0, 50));

                    // can be changed with GUI
                    let cookieScale = model.scale;
                    cookie.scale.set(cookieScale, cookieScale, cookieScale);

                    if (cookies.length == 0) {                        
                        // For gravitional attraction in function attraction(); only to first cookie created
                        attractorPoint = new THREE.Vector3(cookie.position.x, cookie.position.y, cookie.position.z);
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
function attraction(target: THREE.Vector3) { // target is a cookie's attractorPoint (relative to the other cookies)
    for (let cookieIndex = 1; cookieIndex < cookies.length; cookieIndex++) {
        let force = target.sub(cookies[cookieIndex].position);

        // calculate distance squared, but only after contraining the force's magnitude
        let distanceSquared = force.clampLength(0, 5).lengthSq();
        
        const gravitConstant = model.gravitConstant;
        let forceLength = gravitConstant / distanceSquared;
        force.setLength(forceLength);
        acceleration = force;
    }
}

// function from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random#getting_a_random_number_between_two_values
function getRandomNumInRange(min: number, max: number) {
    return Math.random() * (max - min) + min;
}

function animate() {
    requestAnimationFrame(() => {
        animate();
    });

    let delta = clock.getDelta();
    
    // Attraction
    if (cookies) {
        for (let cookieIndex = 1; cookieIndex < cookies.length; cookieIndex++) {
            attraction(attractorPoint);
            cookies[cookieIndex].position.add(velocity);
            velocity.add(acceleration);
        }
    }

    raycaster.setFromCamera(pointerPosition, baseView.camera);

    if (stats) stats.update();

    renderer.render(baseView.scene, baseView.camera);
    if (baseView) baseView.update();
}

main();
