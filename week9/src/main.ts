import './style.scss';
import * as THREE from 'three'; 1
import Stats from 'three/examples/jsm/libs/stats.module';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { ShaderMaterial } from 'three';

let renderer: THREE.WebGLRenderer;
let scene: THREE.Scene;
let camera: THREE.PerspectiveCamera;

let lightAmbient: THREE.AmbientLight;
let lightPoint: THREE.PointLight;

let controls: OrbitControls;
let stats: any;

let cube: THREE.Mesh;
let plane: THREE.Mesh;
let exampleModel: THREE.Group;
let exampleTexture: THREE.Texture;

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

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    renderer = new THREE.WebGLRenderer();
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const cubeGeometry = new THREE.DodecahedronGeometry();
    const cubeMaterial = new THREE.MeshPhongMaterial({color: 0xF08888});
    // cubeMaterial.wireframe = true;
    cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.castShadow = true;
    scene.add(cube);

    controls = new OrbitControls(camera, renderer.domElement);

    // Add a point light to add shadows
    // https://github.com/mrdoob/three.js/pull/14087#issuecomment-431003830
    const shadowIntensity = 0.25;

    lightPoint = new THREE.PointLight(0xffffff);
    lightPoint.position.set(-0.5, 0.5, 4);
    lightPoint.castShadow = true;
    lightPoint.intensity = shadowIntensity;
    scene.add(lightPoint);

    const lightPoint2 = lightPoint.clone();
    lightPoint2.intensity = 1 - shadowIntensity;
    lightPoint2.castShadow = false;
    scene.add(lightPoint2);

    // load a texture
    let textureMaterial: THREE.Material;
    new THREE.TextureLoader().load('./resources/textures/uv_grid_opengl.jpg', function (texture) {

        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        texture.anisotropy = renderer.capabilities.getMaxAnisotropy();

        exampleTexture = texture;

        textureMaterial = new THREE.MeshBasicMaterial({ map: texture });
        cube.material = textureMaterial;
    });

    const loader = new GLTFLoader().setPath('/resources/models/');
    loader.load('bunny.gltf', function (gltf) {
        exampleModel = gltf.scene;
        exampleModel.scale.set(.01,.01,.01);
        exampleModel.position.x = 2;

        const bunnyMat = new THREE.MeshLambertMaterial({color: 0x22ffff});

        interface gltfMesh extends THREE.Object3D<THREE.Event> {
            material: THREE.Material,
        }

        exampleModel.traverse((child: THREE.Object3D<THREE.Event>) => {
            console.log(child);
            console.log(child.type === "Mesh");
            if (child.type === "Mesh") {
                (child as gltfMesh).material = bunnyMat;
            }
        });
        scene.add(exampleModel);
    });


    // Add a plane
    const geometryPlane = new THREE.PlaneBufferGeometry(6, 6, 10, 10);

    const uniforms = {
        u_time: { type: 'f', value: 1.0 },
        u_resolution: { type: 'v2', value: new THREE.Vector2(800,800) },
        // u_mouse: { type: 'v2', value: new THREE.Vector2() },
    };

    shaderMat = new THREE.ShaderMaterial({
        uniforms: uniforms,
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
        side: THREE.DoubleSide,
    });

    plane = new THREE.Mesh(geometryPlane, shaderMat);
    plane.position.z = -2;
    plane.receiveShadow = true;
    scene.add(plane);

    // Init animation
    animate();
}

function initListeners() {
    window.addEventListener('resize', onWindowResize, false);

    window.addEventListener('keydown', (event) => {
        const { key } = event;

        switch (key) {
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

function animate() {
    requestAnimationFrame(() => {
        animate();
    });

    // if (exampleModel != undefined) {
    //     exampleModel.rotateX(0.01);
    //     exampleModel.rotateY(0.01);
    // }

    // if (exampleTexture) {
        
    // }

    if (stats) stats.update();

    if (controls) controls.update();

    renderer.render(scene, camera);
}

main();