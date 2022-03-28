import './style.scss';
import * as THREE from 'three'; 1
import Stats from 'three/examples/jsm/libs/stats.module';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { ShaderMaterial } from 'three';

let renderer: THREE.WebGLRenderer;
let scene: THREE.Scene;
let camera: THREE.PerspectiveCamera;

let lightAmbient: THREE.AmbientLight;
let lightPoint: THREE.PointLight;

let controls: OrbitControls;
let stats: any;

let cylinder1: THREE.Mesh; // main body of hot sauce bottle
let cone: THREE.Mesh; // hot sauce bottleneck
let cylinder2: THREE.Mesh; // cap of the hot sauce bottle
let toothpickContainerModel: THREE.Group; // toothpick container
let styrofoamContainerModel: THREE.Group; // a half of a styrofoam container
let pupusaModel: THREE.Group; // pupusa
let plane: THREE.Mesh;

import vertexShader from '../resources/shaders/shader.vert?raw';
import fragmentShader from '../resources/shaders/shader.frag?raw';
let shaderMat: ShaderMaterial;

function main() {
    initScene();
    initStats();
    initListeners();
}

function initStats() {
    stats = new (Stats as any)();
    document.body.appendChild(stats.dom);
}

function initScene() {

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x00FF00);

    // (Unused) Scene with a set background; Credit to brgfx for the image
    // Direct Link: https://www.freepik.com/free-vector/modern-kitchen-interior-with-furniture_16462186.htm
    // Attribution Link: https://www.freepik.com/vectors/kitchen-cartoon <Kitchen cartoon vector created by brgfx>
    // scene.background = backgroundTexture;

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    renderer = new THREE.WebGLRenderer();
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);


    controls = new OrbitControls(camera, renderer.domElement);

    // Add a point light to add shadows
    // https://github.com/mrdoob/three.js/pull/14087#issuecomment-431003830
    const shadowIntensity = 0.25;

    lightPoint = new THREE.PointLight(0xffffff);
    lightPoint.position.set(-0.5, 0.5, 4);
    lightPoint.castShadow = true;
    lightPoint.intensity = shadowIntensity;
    scene.add(lightPoint);

    lightAmbient = new THREE.AmbientLight(0xffffff);
    lightAmbient.intensity = 0.12;
    scene.add(lightAmbient);

    // Hot sauce bottle
    const cylinderRadialSegments = 64; // both cylinders (main body / bottle cap) use this
    const cylinderMaterial = new THREE.MeshToonMaterial({color: 0xFF0000}); // both cylinders (main body / bottle cap) use this

    // main body
    const cylinder1Radius = 0.5;
    const cylinder1Height = 1.5;
    const cylinder1Geometry = new THREE.CylinderGeometry(cylinder1Radius, cylinder1Radius, cylinder1Height, cylinderRadialSegments);
    cylinder1 = new THREE.Mesh(cylinder1Geometry, cylinderMaterial);
    cylinder1.position.y = 0.42;
    scene.add(cylinder1);

    // bottle neck
    const coneRadius = 0.5;
    const coneHeight = 1.5;
    const coneRadialSegments = 64;
    const coneGeometry = new THREE.ConeGeometry(coneRadius, coneHeight, coneRadialSegments);
    const coneMaterial = new THREE.MeshToonMaterial({color: 0xFFCB05});
    coneMaterial.transparent = true; // to allow opacity changes
    coneMaterial.opacity = 0.7; // from base Material class
    const cone = new THREE.Mesh(coneGeometry, coneMaterial);
    cone.position.y = 1.91;
    scene.add(cone);

    // for the GLTFLoaders to refer to
    interface gltfMesh extends THREE.Object3D<THREE.Event> {
        material: THREE.Material;
    }

    // load toothpick container
    const loader1 = new GLTFLoader().setPath('/resources/models/');
    loader1.load('toothpick_container.gltf', function (gltf) {
        toothpickContainerModel = gltf.scene;
        toothpickContainerModel.scale.set(.005, .005, .005);
        toothpickContainerModel.position.set(0, -0.31, -1.5);

        const toothpickContainerMaterial = new THREE.MeshToonMaterial({color: 0xEDEABC});
        const toothpickContainTopMaterial = new THREE.MeshToonMaterial({color: 0xCAFFBC});
        const toothpickContainOpeningMaterial = new THREE.MeshToonMaterial({color: 0x252525});

        toothpickContainerModel.traverse((child: THREE.Object3D<THREE.Event>) => {
            // console.log(child);
            if (child.type === "Mesh") {
                if (child.name === "Cylinder") {
                    (child as gltfMesh).material = toothpickContainerMaterial;
                }
                else if (child.name === "Sphere") {
                    (child as gltfMesh).material = toothpickContainTopMaterial;
                }
                else if (child.name === "Rectangle") {
                    (child as gltfMesh).material = toothpickContainOpeningMaterial;
                }
            }
        });
        scene.add(toothpickContainerModel);
    });

    // load styrofoam container
    const loader2 = new GLTFLoader().setPath('resources/models/');
    loader2.load('styrofoam_container.gltf', function (gltf) {
        let styrofoamContainerModels = [];
        const styrofoamContainerMaterial = new THREE.MeshToonMaterial({color: 0xF1F1F1, side: THREE.DoubleSide});

        styrofoamContainerModel = gltf.scene;
        styrofoamContainerModel.scale.set(.2, .2, .2);
        styrofoamContainerModel.position.x = -4.53;
        styrofoamContainerModels.push(styrofoamContainerModel);

        const styrofoamContainerModel2 = styrofoamContainerModel.clone();
        // console.log(styrofoamContainerModel2);
        styrofoamContainerModel2.position.x = 0;
        styrofoamContainerModels.push(styrofoamContainerModel2);

        for (let model = 0; model < 2; model++) {
            styrofoamContainerModels[model].traverse((child: THREE.Object3D<THREE.Event>) => {
                // console.log(child);
                if (child.type === "Mesh") {
                    if (child.name === "Cube_2") {
                        (child as gltfMesh).material = styrofoamContainerMaterial;
                    }
                }
            });
        }
        scene.add(styrofoamContainerModel, styrofoamContainerModel2);
    });

    // load pupusa
    const loader3 = new GLTFLoader().setPath('resources/models/');
    loader3.load('pupusa.gltf', function (gltf) {
        let pupusaModels = [];
        const pupusaMaterial = new THREE.MeshToonMaterial({color: 0xCEA064});

        pupusaModel = gltf.scene;
        pupusaModel.scale.set(.022, .022, .022);
        pupusaModel.position.set(-0.17, -0.24, 0.63);
        pupusaModels.push(pupusaModel);

        const pupusaModel2 = pupusaModel.clone();
        pupusaModel2.position.x = 1.6;
        pupusaModel2.position.y = -0.2;
        pupusaModel2.rotation.z = -0.08;
        pupusaModels.push(pupusaModel2);

        for (let model = 0; model < 2; model++) {
            pupusaModels[model].traverse((child: THREE.Object3D<THREE.Event>) => {
                console.log(child);
                if (child.type === "Mesh") {
                    if (child.name === "Sphere") {
                        (child as gltfMesh).material = pupusaMaterial;
                    }
                }
            });
        }
        scene.add(pupusaModel, pupusaModel2);
    });

    // Init animation
    animate();
}

function initListeners() {
    window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    requestAnimationFrame(() => {
        animate();
    });

    if (stats) stats.update();

    if (controls) controls.update();

    renderer.render(scene, camera);
}

main();