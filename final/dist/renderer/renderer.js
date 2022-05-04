"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
require("./style.css");
var THREE = __importStar(require("three"));
var stats_module_1 = __importDefault(require("three/examples/jsm/libs/stats.module"));
var DAT = __importStar(require("dat.gui"));
var ViewOne_1 = require("./Views/ViewOne");
var ViewTwo_1 = require("./Views/ViewTwo");
var ViewThree_1 = require("./Views/ViewThree");
var ViewFour_1 = require("./Views/ViewFour");
var ViewFive_1 = require("./Views/ViewFive");
var ViewSix_1 = require("./Views/ViewSix");
var ViewSeven_1 = require("./Views/ViewSeven");
var ViewEight_1 = require("./Views/ViewEight");
var model = {
    groupX: 0,
    groupY: 0,
    groupAngle: 0,
    activeView: 0
};
var renderer;
var light;
var clock = new THREE.Clock();
var stats;
var viewOne;
var viewTwo;
var viewThree;
var viewFour;
var viewFive;
var viewSix;
var viewSeven;
var viewEight;
var views = [];
function main() {
    initScene();
    initStats();
    initGUI();
    initListeners();
}
function initStats() {
    stats = new stats_module_1["default"]();
    document.body.appendChild(stats.dom);
}
function initGUI() {
    var gui = new DAT.GUI();
}
function initScene() {
    renderer = new THREE.WebGLRenderer();
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    var light = new THREE.PointLight(0xFFFFFF, 1, 0);
    light.position.set(100, 200, 100);
    document.body.appendChild(renderer.domElement);
    viewOne = new ViewOne_1.ViewOne(model, renderer, light);
    viewTwo = new ViewTwo_1.ViewTwo(model, renderer, light);
    viewThree = new ViewThree_1.ViewThree(model, renderer, light);
    viewFour = new ViewFour_1.ViewFour(model, renderer, light);
    viewFive = new ViewFive_1.ViewFive(model, renderer, light);
    viewSix = new ViewSix_1.ViewSix(model, renderer, light);
    viewSeven = new ViewSeven_1.ViewSeven(model, renderer, light);
    viewEight = new ViewEight_1.ViewEight(model, renderer, light);
    views.push(viewOne, viewTwo, viewThree, viewFour, viewFive, viewSix, viewSeven, viewEight);
    // Init animation
    animate();
}
function initListeners() {
    window.electronAPI.changePage(function (event, value) {
        // console.log(event)
        console.log(value);
        var prev_view = model.activeView; // capture current view before it changes
        if (model.activeView % 2 == 0) {
            if (value >= 0.5) {
                model.activeView = (model.activeView + 1) % views.length;
            }
        }
        else {
            if (value <= -0.5) {
                model.activeView = (model.activeView + 1) % views.length;
                if (prev_view == 7) { // user went back to the first page
                    // last "page" / ending LED special interactions (red)
                    window.electronAPI.writeLEDStatus(1);
                }
            }
        }
        // play view's narration/animation on a case-by-case basis
        switch (model.activeView) {
            case 0:
                viewEight.audio_elem.pause();
                viewEight.audio_elem.currentTime = 0;
                viewOne.audio_elem.play();
                break;
            case 1:
                viewOne.audio_elem.pause();
                viewOne.audio_elem.currentTime = 0;
                viewTwo.audio_elem.play();
                break;
            case 2:
                viewTwo.audio_elem.pause();
                viewTwo.audio_elem.currentTime = 0;
                viewThree.audio_elem.play();
                break;
            case 3:
                viewThree.audio_elem.pause();
                viewThree.audio_elem.currentTime = 0;
                viewFour.audio_elem.play();
                break;
            case 4:
                viewFour.audio_elem.pause();
                viewFour.audio_elem.currentTime = 0;
                viewFive.audio_elem.play();
                viewFive.start_tl = true;
                break;
            case 5:
                viewFive.audio_elem.pause();
                viewFive.audio_elem.currentTime = 0;
                viewSix.audio_elem.play();
                viewSix.start_tl = true;
                break;
            case 6:
                viewSix.audio_elem.pause();
                viewSix.audio_elem.currentTime = 0;
                viewSeven.audio_elem.play();
                viewSeven.start_tl = true;
                break;
            case 7:
                viewSeven.audio_elem.pause();
                viewSeven.audio_elem.currentTime = 0;
                viewEight.audio_elem.play();
                viewEight.start_tl = true;
                break;
            default:
                break;
        }
        // last "page" / ending LED special interactions (green)
        if (model.activeView == 7) {
            window.electronAPI.writeLEDStatus(0);
        }
    });
    window.addEventListener('resize', onWindowResize, false);
    window.addEventListener('keydown', function (event) {
        var key = event.key;
        // console.log(key);
        switch (key) {
            case 'ArrowRight':
                model.activeView = (model.activeView + 1) % views.length;
                // Test Switch
                switch (model.activeView) {
                    case 0:
                        viewEight.audio_elem.pause();
                        viewEight.audio_elem.currentTime = 0;
                        viewOne.audio_elem.play();
                        break;
                    case 1:
                        viewOne.audio_elem.pause();
                        viewOne.audio_elem.currentTime = 0;
                        viewTwo.audio_elem.play();
                        break;
                    case 2:
                        viewTwo.audio_elem.pause();
                        viewTwo.audio_elem.currentTime = 0;
                        viewThree.audio_elem.play();
                        break;
                    case 3:
                        viewThree.audio_elem.pause();
                        viewThree.audio_elem.currentTime = 0;
                        viewFour.audio_elem.play();
                        break;
                    case 4:
                        viewFour.audio_elem.pause();
                        viewFour.audio_elem.currentTime = 0;
                        viewFive.audio_elem.play();
                        viewFive.start_tl = true;
                        break;
                    case 5:
                        viewFive.audio_elem.pause();
                        viewFive.audio_elem.currentTime = 0;
                        viewSix.audio_elem.play();
                        viewSix.start_tl = true;
                        break;
                    case 6:
                        viewSix.audio_elem.pause();
                        viewSix.audio_elem.currentTime = 0;
                        viewSeven.audio_elem.play();
                        viewSeven.start_tl = true;
                        break;
                    case 7:
                        viewSeven.audio_elem.pause();
                        viewSeven.audio_elem.currentTime = 0;
                        viewEight.audio_elem.play();
                        viewEight.start_tl = true;
                        break;
                    default:
                        break;
                }
                break;
            case 'ArrowLeft':
                model.activeView = (model.activeView - 1);
                if (model.activeView < 0) {
                    model.activeView = views.length - 1;
                }
                break;
            default:
                break;
        }
    });
}
function onWindowResize() {
    viewOne.onWindowResize();
    viewTwo.onWindowResize();
}
function animate() {
    requestAnimationFrame(function () {
        animate();
    });
    var delta = clock.getDelta();
    switch (model.activeView) {
        case 0:
            viewOne.update(clock, delta);
            break;
        case 1:
            viewTwo.update(clock, delta);
            break;
        case 2:
            viewThree.update(clock, delta);
            break;
        case 3:
            viewFour.update(clock, delta);
            break;
        case 4:
            viewFive.update(clock, delta);
            break;
        case 5:
            viewSix.update(clock, delta);
            break;
        case 6:
            viewSeven.update(clock, delta);
            break;
        case 7:
            viewEight.update(clock, delta);
            break;
        default:
            break;
    }
    if (stats)
        stats.update();
    renderer.render(views[model.activeView].scene, views[model.activeView].camera);
}
main();
//# sourceMappingURL=renderer.js.map