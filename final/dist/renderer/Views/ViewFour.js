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
exports.ViewFour = void 0;
var three_1 = require("three");
var BaseView_1 = require("./BaseView");
var narration_4_mp3_1 = __importDefault(require("../assets/audio/narration_4.mp3"));
var gsap_1 = require("gsap");
var ViewFour = /** @class */ (function (_super) {
    __extends(ViewFour, _super);
    function ViewFour(model, renderer) {
        var _this = _super.call(this, model, renderer) || this;
        _this.light = new three_1.PointLight(0xFFFFFF, 1, 0);
        _this.light.position.set(100, 200, 100);
        _this.scene.add(_this.light);
        _this.tl = gsap_1.gsap.timeline();
        _this.start_tl = false;
        var capsuleGeo = new three_1.CapsuleGeometry(0.65, 1.2, 4, 8);
        var redCapsuleMat = new three_1.MeshPhongMaterial({ color: 0xFF0000 });
        var blueCapsuleMat = new three_1.MeshPhongMaterial({ color: 0x0000FF });
        _this.redCapsule = new three_1.Mesh(capsuleGeo, redCapsuleMat);
        _this.redCapsule.position.set(5, -5, 0);
        _this.blueCapsule = new three_1.Mesh(capsuleGeo, blueCapsuleMat);
        _this.blueCapsule.position.set(-5, -5, 0);
        _this.scene.add(_this.redCapsule, _this.blueCapsule);
        _this.audio_elem = document.createElement('audio');
        _this.audio_elem.src = narration_4_mp3_1["default"];
        return _this;
        // audio_elem.play();
    }
    ViewFour.prototype.update = function (clock, delta) {
        if (this.start_tl) {
            this.tl.to(this.redCapsule.position, {
                x: 0,
                y: 0,
                duration: 4,
                ease: "sine.inOut"
            });
            this.tl.to(this.redCapsule.position, {
                x: -5,
                y: -5,
                duration: 4,
                ease: "sine.inOut"
            });
            this.tl.to(this.blueCapsule.position, {
                x: 0,
                y: 0,
                duration: 4,
                ease: "sine.inOut"
            });
            this.tl.to(this.blueCapsule.position, {
                x: 5,
                y: -5,
                duration: 4,
                ease: "sine.inOut"
            });
            this.redCapsule.rotation.z += delta;
            this.blueCapsule.rotation.z += delta;
        }
    };
    return ViewFour;
}(BaseView_1.BaseView));
exports.ViewFour = ViewFour;
//# sourceMappingURL=ViewFour.js.map