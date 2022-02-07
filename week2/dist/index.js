"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var PIXI = require("pixi.js");
var load = function (app) {
    return new Promise(function (resolve) {
        app.loader
            // .add('shader', 'assets/shader.frag')
            .load(function () {
            resolve();
        });
    });
};
var main = function () { return __awaiter(void 0, void 0, void 0, function () {
    function create_branches_eyes() {
        // Contains an instance of generated branches
        // with eyes in certain gaps between branches  
        var branches_eyes_container = new PIXI.Container();
        // Branches
        var branches = new PIXI.Graphics();
        branches.lineStyle(10, 0x691F00); // thick, brownish lines
        branches.moveTo(0, 0); // start of main branch
        branches.lineTo(50, 50); // (1) branching point
        branches.lineTo(98, 64); // (2) branching point
        branches.moveTo(50, 50);
        branches.lineTo(64, 98); // (2) branching point
        branches.lineTo(112, 112); // (3) branching point
        branches.moveTo(64, 98);
        branches.lineTo(78, 146); // (3) branching point
        branches.moveTo(98, 64);
        branches.lineTo(146, 78); // (3) branching point
        branches.moveTo(98, 64);
        branches.lineTo(112, 112); // (3) branching point
        branches.lineTo(126, 160); // (4) branching point
        branches.moveTo(112, 112);
        branches.lineTo(160, 126); // (4) branching point
        branches.moveTo(146, 78);
        branches.lineTo(160, 126); // (4) branching point
        branches.moveTo(146, 78);
        branches.lineTo(194, 92); // (4) branching point
        branches.moveTo(168, 83);
        branches.lineTo(182, 113); // extra branch for the last/most-recent (4) branching point
        branches.moveTo(78, 146);
        branches.lineTo(126, 160); // (4) branching point
        branches.moveTo(78, 146);
        branches.lineTo(92, 194); // (4) branching point
        branches.moveTo(85, 170);
        branches.lineTo(110, 180); // extra branch for the last/most-recent (4) branching point
        // Eyes
        var eyes = new PIXI.Graphics();
        eyes.lineStyle(1, 0x000000); // basic black lines
        eyes.beginFill(0x0A0A0A); // black fill to start
        // Eye 1: Outline w/ background fill
        eyes.moveTo(64 + 8, 98 + 8);
        eyes.lineTo(78 + 4, 146 - 5);
        eyes.lineTo(126 - 8, 160 - 8);
        eyes.lineTo(64 + 8, 98 + 8);
        // Eye 2: Outline w/ background fill
        eyes.moveTo(98 + 8, 64 + 8);
        eyes.lineTo(146 - 4, 78 + 5);
        eyes.lineTo(160 - 8, 126 - 8);
        eyes.lineTo(98 + 8, 64 + 8);
        // Eye 1: Arc for iris
        eyes.lineStyle(1, 0xFFFF00);
        eyes.beginFill(0xFFFF00);
        eyes.moveTo(64 + 8, 98 + 8);
        eyes.arc(87, 120, 17, 50 * (Math.PI / 180), 112 * (Math.PI / 180));
        eyes.lineTo(64 + 8, 98 + 8);
        // Eye 2: Arc for iris
        eyes.moveTo(98 + 8, 64 + 8);
        eyes.arc(121, 85, 17, 46 * (Math.PI / 180), 348 * (Math.PI / 180), true);
        // Eye 1: Ellipse for pupil
        eyes.lineStyle(1, 0x000000);
        eyes.beginFill(0x000000);
        eyes.drawEllipse(88, 123, 3, 1);
        // Eye 2: Ellipse for pupil
        eyes.drawEllipse(123, 88, 1, 3);
        branches_eyes_container.addChild(branches, eyes);
        return branches_eyes_container;
    }
    var app, center_angle_step, center_branches_eyes_containers, angle, branches_eyes_container, side_angle_step, top_branches_eyes_container, x, angle, branches_eyes_container, left_branches_eyes_container, y, angle, branches_eyes_container, bottom_branches_eyes_container, x, angle, branches_eyes_container, right_branches_eyes_container, y, angle, branches_eyes_container;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                app = new PIXI.Application({ antialias: true });
                // Display application properly
                document.body.style.margin = '0';
                app.renderer.view.style.position = 'absolute';
                app.renderer.view.style.display = 'block';
                app.renderer.resize(window.innerWidth, window.innerHeight); // view size = window
                app.renderer.backgroundColor = 0x000517;
                // Load assets
                return [4 /*yield*/, load(app)];
            case 1:
                // Load assets
                _a.sent();
                center_angle_step = 45;
                center_branches_eyes_containers = [];
                for (angle = 0; angle < 360; angle += center_angle_step) {
                    branches_eyes_container = create_branches_eyes();
                    branches_eyes_container.x = window.innerWidth / 2;
                    branches_eyes_container.y = window.innerHeight / 2;
                    branches_eyes_container.angle = angle;
                    app.stage.addChild(branches_eyes_container);
                    center_branches_eyes_containers.push(branches_eyes_container);
                }
                side_angle_step = 90;
                top_branches_eyes_container = new PIXI.Container();
                for (x = 0; x <= window.innerWidth; x += window.innerWidth / 5) {
                    for (angle = 0; angle <= 180; angle += side_angle_step) {
                        branches_eyes_container = create_branches_eyes();
                        branches_eyes_container.x = x;
                        branches_eyes_container.angle = angle;
                        top_branches_eyes_container.addChild(branches_eyes_container); // add to the general top branches_eyes container
                    }
                }
                app.stage.addChild(top_branches_eyes_container);
                left_branches_eyes_container = new PIXI.Container();
                for (y = 0; y <= window.innerHeight; y += window.innerHeight / 3) {
                    for (angle = 0; angle >= -180; angle -= side_angle_step) {
                        branches_eyes_container = create_branches_eyes();
                        branches_eyes_container.y = y;
                        branches_eyes_container.angle = angle;
                        left_branches_eyes_container.addChild(branches_eyes_container);
                    }
                }
                app.stage.addChild(left_branches_eyes_container);
                bottom_branches_eyes_container = new PIXI.Container();
                for (x = 0; x <= window.innerWidth; x += window.innerWidth / 5) {
                    for (angle = -180; angle <= 0; angle += side_angle_step) {
                        branches_eyes_container = create_branches_eyes();
                        branches_eyes_container.x = x;
                        branches_eyes_container.y = window.innerHeight;
                        branches_eyes_container.angle = angle;
                        bottom_branches_eyes_container.addChild(branches_eyes_container);
                    }
                }
                app.stage.addChild(bottom_branches_eyes_container);
                right_branches_eyes_container = new PIXI.Container();
                for (y = 0; y <= window.innerHeight; y += window.innerHeight / 3) {
                    for (angle = 180; angle >= 0; angle -= side_angle_step) {
                        branches_eyes_container = create_branches_eyes();
                        branches_eyes_container.x = window.innerWidth;
                        branches_eyes_container.y = y;
                        branches_eyes_container.angle = angle;
                        right_branches_eyes_container.addChild(branches_eyes_container);
                    }
                }
                app.stage.addChild(right_branches_eyes_container);
                // Handle window resizing
                window.addEventListener('resize', function (_e) {
                    app.renderer.resize(window.innerWidth, window.innerHeight);
                    // center_branches_eyes_containers.forEach(function(branches_eyes_container) {
                    // How do I type/annotate these two properties so that I don't get the red squiggly?
                    //   branches_eyes_container.x = window.innerWidth / 2;
                    //   branches_eyes_container.y = window.innerHeight / 2;
                    // });
                    // THIS METHOD DO WHAT THE CENTER_BRANCHES_EYES_CONTAINERS ARRAY DOES (POSITION THE BRANCHES RELATIVE TO THE WINDOW SIZE)
                    top_branches_eyes_container.x = 0;
                    top_branches_eyes_container.y = 0;
                    left_branches_eyes_container.x = 0;
                    left_branches_eyes_container.y = 0;
                    bottom_branches_eyes_container.x = 0;
                    bottom_branches_eyes_container.y = 0;
                    right_branches_eyes_container.x = 0;
                    right_branches_eyes_container.y = 0;
                });
                document.body.appendChild(app.view);
                return [2 /*return*/];
        }
    });
}); };
main();
