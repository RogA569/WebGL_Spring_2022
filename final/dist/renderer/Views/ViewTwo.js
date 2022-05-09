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
exports.ViewTwo = void 0;
var three_1 = require("three");
var BaseView_1 = require("./BaseView");
var gsap_1 = require("gsap");
var narration_2_mp3_1 = __importDefault(require("../assets/audio/narration_2.mp3"));
var ViewTwo = /** @class */ (function (_super) {
    __extends(ViewTwo, _super);
    function ViewTwo(model, renderer) {
        var _this = _super.call(this, model, renderer) || this;
        _this.light = new three_1.PointLight(0xFFFFFF, 1, 0);
        _this.light.position.set(100, 200, 100);
        _this.scene.add(_this.light);
        _this.tl = gsap_1.gsap.timeline();
        _this.start_tl = false;
        var torusGeo = new three_1.TorusGeometry(5, 1, 30, 200);
        var torusMat = new three_1.MeshToonMaterial({ color: 0x38B8F9 });
        _this.torus = new three_1.Mesh(torusGeo, torusMat);
        _this.torus.position.set(0, -20, -10);
        _this.scene.add(_this.torus);
        _this.audio_elem = document.createElement('audio');
        _this.audio_elem.src = narration_2_mp3_1["default"];
        return _this;
        // audio_elem.play();
    }
    ViewTwo.prototype.update = function (clock, delta) {
        // tl stuff
        if (this.start_tl) {
            this.tl.to(this.torus.position, {
                y: 0,
                duration: 9,
                ease: "elastic.out(1, 0.3)"
            });
            this.tl.to(this.torus.rotation, {
                x: Math.PI,
                y: -Math.PI * 2,
                duration: 9,
                ease: "circ.inOut"
            }, "-=0.2");
        }
    };
    return ViewTwo;
}(BaseView_1.BaseView));
exports.ViewTwo = ViewTwo;
//# sourceMappingURL=ViewTwo.js.map