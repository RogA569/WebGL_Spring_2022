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
exports.ViewThree = void 0;
var three_1 = require("three");
var BaseView_1 = require("./BaseView");
var narration_3_mp3_1 = __importDefault(require("../assets/audio/narration_3.mp3"));
var gsap_1 = require("gsap");
var hello_world_png_1 = __importDefault(require("../assets/hello-world.png"));
var ViewThree = /** @class */ (function (_super) {
    __extends(ViewThree, _super);
    function ViewThree(model, renderer) {
        var _this = _super.call(this, model, renderer) || this;
        _this.light = new three_1.PointLight(0xFFFFFF, 1, 0);
        _this.light.position.set(100, 0, 100);
        _this.scene.add(_this.light);
        _this.tl = gsap_1.gsap.timeline();
        _this.start_tl = false;
        var sphereGeo = new three_1.SphereGeometry(1, 64, 32);
        var texture = new three_1.TextureLoader().load(hello_world_png_1["default"]);
        // const sphereMat = new MeshToonMaterial({map: texture});
        var sphereMat = new three_1.MeshToonMaterial({ color: 0x00FF00 });
        _this.earthSphere = new three_1.Mesh(sphereGeo, sphereMat);
        _this.earthScale = new three_1.Vector3(0, 0, 0);
        _this.earthSphere.scale.set(_this.earthScale.x, _this.earthScale.y, _this.earthScale.z);
        _this.scene.add(_this.earthSphere);
        var planeGeo = new three_1.PlaneBufferGeometry(0.9, 0.4, 10, 10);
        var planeMat = new three_1.MeshToonMaterial({
            color: 0xC7AD6D,
            side: three_1.DoubleSide
        });
        _this.ticketPlane = new three_1.Mesh(planeGeo, planeMat);
        _this.ticketPlane.position.set(5, 5, 0.5);
        _this.scene.add(_this.ticketPlane);
        _this.audio_elem = document.createElement('audio');
        _this.audio_elem.src = narration_3_mp3_1["default"];
        return _this;
        // audio_elem.play();
    }
    ViewThree.prototype.update = function (clock, delta) {
        if (this.start_tl) {
            this.tl.to(this.earthScale, {
                x: 1,
                y: 1,
                z: 1,
                duration: 5,
                ease: "power3.out"
            });
            this.tl.to(this.ticketPlane.position, {
                x: 0,
                y: 0,
                duration: 8,
                ease: "steps (20)"
            });
            this.tl.to(this.ticketPlane.rotation, {
                x: Math.PI * 2,
                y: Math.PI * 4,
                duration: 5,
                ease: "rough ({ template: none.out, strength: 1, points: 20, taper: none, randomize: true, clamp: false})"
            }, "<");
        }
        this.earthSphere.scale.set(this.earthScale.x, this.earthScale.y, this.earthScale.z);
        this.earthSphere.rotation.z += delta;
        this.light.position.x -= 20 * delta;
    };
    return ViewThree;
}(BaseView_1.BaseView));
exports.ViewThree = ViewThree;
//# sourceMappingURL=ViewThree.js.map