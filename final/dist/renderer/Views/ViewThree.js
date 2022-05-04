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
var ViewThree = /** @class */ (function (_super) {
    __extends(ViewThree, _super);
    function ViewThree(model, renderer, light) {
        var _this = _super.call(this, model, renderer, light) || this;
        _this.group = new three_1.Group();
        _this.scene.add(_this.group);
        var cubeGeometry = new three_1.BoxGeometry();
        var cubeMaterial = new three_1.MeshPhongMaterial({ color: 0xEB8B4D });
        _this.cube = new three_1.Mesh(cubeGeometry, cubeMaterial);
        _this.cube.castShadow = true;
        _this.group.add(_this.cube);
        _this.audio_elem = document.createElement('audio');
        _this.audio_elem.src = narration_3_mp3_1["default"];
        return _this;
        // audio_elem.play();
    }
    ViewThree.prototype.update = function (clock, delta) {
        this.cube.rotation.x += 0.01;
        this.cube.rotation.y += 0.01;
        this.group.rotation.set(0, 0, this.model.groupAngle);
        this.group.position.set(this.model.groupX, this.model.groupY, 0);
    };
    return ViewThree;
}(BaseView_1.BaseView));
exports.ViewThree = ViewThree;
//# sourceMappingURL=ViewThree.js.map