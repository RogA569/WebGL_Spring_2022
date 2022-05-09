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
exports.ViewSix = void 0;
var three_1 = require("three");
var BaseView_1 = require("./BaseView");
var narration_6_mp3_1 = __importDefault(require("../assets/audio/narration_6.mp3"));
var hello_world_png_1 = __importDefault(require("../assets/hello-world.png"));
var gsap_1 = require("gsap");
var ViewSix = /** @class */ (function (_super) {
    __extends(ViewSix, _super);
    function ViewSix(model, renderer) {
        var _this = _super.call(this, model, renderer) || this;
        _this.lights = [];
        _this.tl = gsap_1.gsap.timeline();
        _this.start_tl = false;
        for (var i = 0; i < 2; i++) {
            var dist = 100;
            var coneAttenuation = .75;
            var light = new three_1.SpotLight();
            light.distance = dist;
            light.intensity = 0;
            light.penumbra = coneAttenuation;
            light.position.set(0, 30 - i * 20, 6);
            _this.scene.add(light);
            _this.lights.push(light);
        }
        var torKnotGeo = new three_1.TorusKnotGeometry(10, 0.75, 100, 16);
        var torKnotMat = new three_1.MeshPhongMaterial({ color: 0x8D99AE });
        _this.torusKnot = new three_1.Mesh(torKnotGeo, torKnotMat);
        _this.torusKnot.position.set(0, 0, -20);
        _this.scene.add(_this.torusKnot);
        var sphereGeo = new three_1.SphereGeometry(4, 64, 32);
        var texture = new three_1.TextureLoader().load(hello_world_png_1["default"]);
        var sphereMat = new three_1.MeshPhongMaterial({ map: texture });
        _this.earthSphere = new three_1.Mesh(sphereGeo, sphereMat);
        _this.earthSphere.position.set(0, 0, -20);
        _this.scene.add(_this.earthSphere);
        _this.audio_elem = document.createElement('audio');
        _this.audio_elem.src = narration_6_mp3_1["default"];
        return _this;
    }
    ViewSix.prototype.update = function (clock, delta) {
        this.torusKnot.rotation.x += 0.01;
        this.torusKnot.rotation.y += 0.01;
        if (this.start_tl) {
            for (var i = 0; i < this.lights.length; i++) {
                this.tl.to(this.lights[i], {
                    intensity: 0.15,
                    duration: 11,
                    ease: "slow (0.7, 0.4, false)"
                }, "".concat(i / 2));
            }
        }
    };
    return ViewSix;
}(BaseView_1.BaseView));
exports.ViewSix = ViewSix;
//# sourceMappingURL=ViewSix.js.map