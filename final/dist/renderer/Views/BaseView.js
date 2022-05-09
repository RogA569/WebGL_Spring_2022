"use strict";
exports.__esModule = true;
exports.BaseView = void 0;
var three_1 = require("three");
var BaseView = /** @class */ (function () {
    function BaseView(model, renderer) {
        this.scene = new three_1.Scene();
        this.camera = new three_1.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.z = 5;
        this.renderer = renderer;
        this.model = model;
    }
    BaseView.prototype.update = function (clock, delta) { };
    BaseView.prototype.onWindowResize = function () {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    };
    return BaseView;
}());
exports.BaseView = BaseView;
//# sourceMappingURL=BaseView.js.map