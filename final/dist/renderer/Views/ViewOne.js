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
var gsap_1 = require("gsap");
var narration_1_mp3_1 = __importDefault(require("../assets/audio/narration_1.mp3"));
var ViewOne = /** @class */ (function (_super) {
    __extends(ViewOne, _super);
    function ViewOne(model, renderer) {
        var _this = _super.call(this, model, renderer) || this;
        _this.light = new three_1.PointLight(0xFFFFFF, 1, 0);
        _this.light.position.set(100, 200, 100);
        _this.scene.add(_this.light);
        // decimal number (thetaLength) retrived from playing with GUI via this link:
        // https://threejs.org/docs/?q=sphere#api/en/geometries/SphereGeometry
        var sphereGeo = new three_1.SphereGeometry(1, 32, 16, 0, Math.PI * 2, 0, 2.1865484868985);
        var sphereMat = new three_1.MeshToonMaterial({ color: 0xA8A9A1, side: three_1.DoubleSide });
        _this.golemShell = new three_1.Mesh(sphereGeo, sphereMat);
        _this.golemShell.position.set(-8, 0, 0);
        _this.scene.add(_this.golemShell);
        _this.tl = gsap_1.gsap.timeline();
        _this.audio_elem = document.createElement('audio');
        _this.audio_elem.src = narration_1_mp3_1["default"];
        _this.audio_elem.play();
        return _this;
    }
    ViewOne.prototype.update = function (clock, delta) {
        this.tl.to(this.golemShell.rotation, {
            z: Math.PI,
            duration: 3,
            ease: "circ.out"
        });
        this.tl.to(this.golemShell.position, {
            x: 0,
            duration: 3,
            ease: "circ.out"
        }, "<");
    };
    return ViewOne;
}(BaseView_1.BaseView));
exports.ViewOne = ViewOne;
//# sourceMappingURL=ViewOne.js.map