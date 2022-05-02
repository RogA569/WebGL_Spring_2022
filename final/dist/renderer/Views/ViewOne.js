"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.ViewOne = void 0;
var three_1 = require("three");
var BaseView_1 = require("./BaseView");
var ViewOne = /** @class */ (function (_super) {
    __extends(ViewOne, _super);
    // plane: Mesh;
    // exampleModel: Group;
    // lightAmbient: AmbientLight;
    // lightPoint: PointLight;
    // shaderMat: ShaderMaterial;
    function ViewOne(model, renderer) {
        var _this = _super.call(this, model, renderer) || this;
        // this.exampleModel = new Group();
        _this.group = new three_1.Group();
        _this.scene.add(_this.group);
        var cubeGeometry = new three_1.BoxGeometry();
        var cubeMaterial = new three_1.MeshPhongMaterial({ color: 0xf0bbbb });
        // cubeMaterial.wireframe = true;
        _this.cube = new three_1.Mesh(cubeGeometry, cubeMaterial);
        _this.cube.castShadow = true;
        _this.group.add(_this.cube);
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
        var mapSize = 1024; // Default 512
        var cameraNear = 0.5; // Default 0.5
        var cameraFar = 500; // Default 500
        return _this;
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
    ViewOne.prototype.update = function (clock, delta) {
        // this.shaderMat.uniforms.u_time.value += delta;
        this.cube.rotation.x += 0.01;
        this.cube.rotation.y += 0.01;
        // group.rotateZ(delta);
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
    };
    return ViewOne;
}(BaseView_1.BaseView));
exports.ViewOne = ViewOne;
//# sourceMappingURL=ViewOne.js.map