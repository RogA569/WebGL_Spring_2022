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
var shader_vert_1 = __importDefault(require("./assets/shaders/shader.vert"));
var shader_frag_1 = __importDefault(require("./assets/shaders/shader.frag"));
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
    activeView: 0,
    vertexShader: shader_vert_1["default"],
    fragmentShader: shader_frag_1["default"]
};
var renderer;
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
var shaderMat;
function main() {
    // loadShaders()
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
    document.body.appendChild(renderer.domElement);
    viewOne = new ViewOne_1.ViewOne(model, renderer);
    viewTwo = new ViewTwo_1.ViewTwo(model, renderer);
    viewThree = new ViewThree_1.ViewThree(model, renderer);
    viewFour = new ViewFour_1.ViewFour(model, renderer);
    viewFive = new ViewFive_1.ViewFive(model, renderer);
    viewSix = new ViewSix_1.ViewSix(model, renderer);
    viewSeven = new ViewSeven_1.ViewSeven(model, renderer);
    viewEight = new ViewEight_1.ViewEight(model, renderer);
    views.push(viewOne, viewTwo, viewThree, viewFour, viewFive, viewSix, viewSeven, viewEight);
    console.log(model.activeView);
    var uniforms = {
        u_time: { type: 'f', value: 1.0 },
        u_resolution: { type: 'v2', value: new THREE.Vector2(800, 800) }
    };
    shaderMat = new THREE.ShaderMaterial({
        uniforms: uniforms,
        vertexShader: shader_vert_1["default"],
        fragmentShader: shader_frag_1["default"],
        side: THREE.DoubleSide
    });
    // Init animation
    animate();
}
function initListeners() {
    window.electronAPI.changePage(function (event, value) {
        // console.log(event)
        console.log(value);
        var prev_view = model.activeView;
        if (model.activeView % 2 == 0) {
            if (value == 1) {
                model.activeView = (model.activeView + 1) % views.length;
            }
        }
        else {
            if (value == -1) {
                model.activeView = (model.activeView + 1) % views.length;
            }
        }
        if (prev_view == 7) { // last "page"
            if (model.groupAngle < 0) {
                window.electronAPI.writeLEDStatus(0);
            }
            else {
                window.electronAPI.writeLEDStatus(1);
            }
        }
    });
    window.addEventListener('resize', onWindowResize, false);
    window.addEventListener('keydown', function (event) {
        var key = event.key;
        // console.log(key);
        switch (key) {
            case 'e':
                var win = window.open('', 'Canvas Image');
                var domElement = renderer.domElement;
                // Makse sure scene is rendered.
                switch (model.activeView) {
                    case 0:
                        renderer.render(viewOne.scene, viewOne.camera);
                        break;
                    case 1:
                        renderer.render(viewTwo.scene, viewTwo.camera);
                        break;
                    default:
                        break;
                }
                var src = domElement.toDataURL();
                if (!win)
                    return;
                win.document.write("<img src='".concat(src, "' width='").concat(domElement.width, "' height='").concat(domElement.height, "'>"));
                break;
            case 'ArrowRight':
                model.activeView = (model.activeView + 1) % views.length;
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
            // window.electronAPI.writeLEDBrightness((model.groupAngle + Math.PI) / (Math.PI*2))
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