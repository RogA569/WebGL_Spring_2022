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
Object.defineProperty(exports, "__esModule", { value: true });
const PIXI = require("pixi.js");
const load = (app) => {
    return new Promise((resolve) => {
        app.loader
            // .add('shader', 'assets/shader.frag')
            .load(() => {
            resolve();
        });
    });
};
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    // Actual app
    let app = new PIXI.Application({ antialias: true });
    // Display application properly
    document.body.style.margin = '0';
    app.renderer.view.style.position = 'absolute';
    app.renderer.view.style.display = 'block';
    // View size = windows
    app.renderer.resize(window.innerWidth, window.innerHeight);
    // Load assets
    yield load(app);
    // Contains an instance of generated branches
    // with eyes in certain gaps between branches  
    let branches_eyes_container = new PIXI.Container();
    // Branches
    let branches = new PIXI.Graphics();
    branches.lineStyle(4, 0x931F00); // thick, red-brownish lines
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
    branches.closePath();
    // Eyes
    let eyes = new PIXI.Graphics();
    eyes.lineStyle(1, 0x000000); // basic black lines
    eyes.beginFill(0x000000); // black fill to start
    // Eye 1
    // Outline w/ background fill
    eyes.moveTo(95, 129); // center between tertiary branches
    // Eye 2
    // Outline w/ background fill
    eyes.moveTo(129, 95); // center between tertiary branches
    branches_eyes_container.addChild(branches);
    // branches_eyes_container.addChild(branches, eyes);
    app.stage.addChild(branches_eyes_container);
    // Contains an instance of a generated leaf
    let leaf_container = new PIXI.Container();
    app.stage.addChild(leaf_container);
    // Handle window resizing
    window.addEventListener('resize', (_e) => {
        app.renderer.resize(window.innerWidth, window.innerHeight);
        branches_eyes_container.x = window.innerWidth;
        branches_eyes_container.y = window.innerHeight;
    });
    document.body.appendChild(app.view);
});
main();
//# sourceMappingURL=index.js.map