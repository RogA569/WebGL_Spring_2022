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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.ViewOne = void 0;
var three_1 = require("three");
var BaseView_1 = require("./BaseView");
var narration_1_mp3_1 = __importDefault(require("../assets/audio/narration_1.mp3"));
var ViewOne = /** @class */ (function (_super) {
    __extends(ViewOne, _super);
    // plane: Mesh;
    function ViewOne(model, renderer, light) {
        var _this = _super.call(this, model, renderer, light) || this;
        _this.group = new three_1.Group();
        _this.scene.add(_this.group);
        var cubeGeometry = new three_1.BoxGeometry();
        var cubeMaterial = new three_1.MeshPhongMaterial({ color: 0xA8A9A1 });
        _this.cube = new three_1.Mesh(cubeGeometry, cubeMaterial);
        _this.cube.castShadow = true;
        // this.group.add(this.cube);	
        // decimal number (thetaLength) retrived from playing with GUI via this link:
        // https://threejs.org/docs/?q=sphere#api/en/geometries/SphereGeometry
        var sphereGeo = new three_1.SphereGeometry(1, 32, 32, 0, Math.PI * 2, Math.PI, 2.1865484868985);
        var sphereMat = new three_1.MeshToonMaterial({ color: 0xA8A9A1 });
        _this.golemShell = new three_1.Mesh(sphereGeo, sphereMat);
        _this.scene.add(_this.golemShell);
        // const geometryPlane = new PlaneBufferGeometry(6, 6, 10, 10);
        // const materialPlane = new MeshPhongMaterial({
        // 	color: 0x666666,
        // 	side: DoubleSide,
        // 	flatShading: true,
        // });
        // this.plane = new Mesh(geometryPlane, materialPlane)//this.shaderMat);
        // this.plane.position.z = -2;
        // this.plane.receiveShadow = true;
        // this.scene.add(this.plane);
        _this.audio_elem = document.createElement('audio');
        _this.audio_elem.src = narration_1_mp3_1["default"];
        _this.audio_elem.play();
        return _this;
    }
    ViewOne.prototype.update = function (clock, delta) {
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
    };
    return ViewOne;
}(BaseView_1.BaseView));
exports.ViewOne = ViewOne;
//# sourceMappingURL=ViewOne.js.map