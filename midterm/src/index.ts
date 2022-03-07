import * as PIXI from 'pixi.js' // import PIXI
import { Model } from './model/model' // Import model
import { guiSetup } from './controllers/gui'; // Import GUI
import { gsap } from "gsap"; // Import GSAP
import { lerp, easeIn, easeOut, easeinOutSine } from "./utils/easing"; // Import timeline effect functions
import { getRandomFromRange } from "./utils/randomizing"; // import a convenient random-range function
import { BranchEyes } from "./views/branch_eyes"
import { TrapezoidNose } from "./views/trapezoid_nose"

// store app in variable to tinker with later
let global_app: PIXI.Application;

// create model
let mModel = new Model();

// create gsap timeline
let tl = gsap.timeline();

// Pixi Containers
let rainbow_container = new PIXI.Container();
rainbow_container.interactive = true;
rainbow_container.x = innerWidth / 2;
rainbow_container.y = (3 / 5) * innerHeight + 75;

let rainbow_outline_container = new PIXI.Container(); // needed for content removal (see function update())

let left_brancheye_container = new PIXI.Container();
left_brancheye_container.interactive = true;

let right_brancheye_container = new PIXI.Container();
right_brancheye_container.interactive = true;

let nose_container = new PIXI.Container();
nose_container.interactive = true;

//preload
const load = (app: PIXI.Application) => {
    return new Promise<void>((resolve) => {
        app.loader.add('rainbow', 'assets/confetti_rainbow.png')
        .add('rainbow_outline', 'assets/rainbow_outline.png')
        .load(() => {
            resolve();
        });
    });
};

// main function
const main = async () => {
    // Actual app
    let app = new PIXI.Application({antialias: true, backgroundColor: 0xFF7099});
    // BACKGROUND COLOR WILL BE #70FF82 AT THE TIMELINE END
    // app.renderer.backgroundColor = 0x70FF82
    // BACKGROUND COLOR WILL BE #390743 AT THE NEGATIVE MOMENT(S)
    // app.renderer.backgroundColor = 0x390743

    // Display application properly
    document.body.style.margin = '0';
    app.renderer.view.style.position = 'absolute';
    app.renderer.view.style.display = 'block';

    // View size = windows
    app.renderer.resize(window.innerWidth, window.innerHeight);

    // Load assets
    await load(app);

    // confetti rainbow created through Illustrator, used as a PIXI sprite 
    let rainbow = new PIXI.Sprite(app.loader.resources['rainbow'].texture)
    
    // This URL helped me realized how vital this line of code is for the sprite (in its container) rotation:
    // https://pixijs.io/examples/#/demos-basic/container.js
    rainbow.anchor.set(0.5, 0.5);

    // always starts in a random position on screen
    // rainbow.position.x = getRandomFromRange(0, innerWidth)
    // rainbow.position.y = getRandomFromRange(0, innerHeight)
    // rainbow.x = innerWidth / 2 - 190 - 50;
    // rainbow.y = (3 / 5) * innerHeight - 50;
    
    rainbow.interactive = true

    let rainbow_outline = new PIXI.Sprite(app.loader.resources['rainbow_outline'].texture);
    // move outline to static position
    rainbow_outline.x = innerWidth / 2 - 180;
    rainbow_outline.y = (3 / 5) * innerHeight;

   	rainbow_container.addChild(rainbow);
   	rainbow_outline_container.addChild(rainbow_outline);

    app.stage.addChild(rainbow_container, rainbow_outline_container) // add rainbow and outline to scene

    // a pair of branches_eyes from the class BranchEyes
    let branches_eyes_initialize = new BranchEyes();

    // left branch/eye
    // let left_brancheye_start_x = getRandomFromRange(0, innerWidth); // random x
    // let left_brancheye_start_y = getRandomFromRange(0, innerHeight); // random y
    let left_brancheye_start_x = innerWidth / 2 - 150;
    let left_brancheye_start_y = innerHeight / 4;
    
    // create branches/eyes and add to container
    left_brancheye_container.addChild(branches_eyes_initialize.create_left_branches(left_brancheye_start_x, left_brancheye_start_y), branches_eyes_initialize.create_left_eye(left_brancheye_start_x, left_brancheye_start_y));

    app.stage.addChild(left_brancheye_container, branches_eyes_initialize.create_left_brancheye_outline()); // add container + static outline to stage

    // right branch/eye
    // let right_brancheye_start_x = getRandomFromRange(0, innerWidth);
    // let right_brancheye_start_y = getRandomFromRange(0, innerHeight);
    let right_brancheye_start_x = innerWidth / 2 + 150;
    let right_brancheye_start_y = innerHeight / 4;

    // create branches/eyes and add to container
    right_brancheye_container.addChild(branches_eyes_initialize.create_right_branches(right_brancheye_start_x, right_brancheye_start_y), branches_eyes_initialize.create_right_eye(right_brancheye_start_x, right_brancheye_start_y));

    app.stage.addChild(right_brancheye_container, branches_eyes_initialize.create_right_brancheye_outline()); // add container + static outline to stage

    // a nose from the class TrapezoidNose
    let nose_initialize = new TrapezoidNose();

    // let nose_start_x = getRandomFromRange(0, innerWidth); // random x
    // let nose_start_y = getRandomFromRange(0, innerHeight); // random y
    let nose_start_x = innerWidth / 2 - 36;
    let nose_start_y = innerHeight / 2 - 17.5;

    // create nose and add to container
    nose_container.addChild(nose_initialize.createNose(nose_start_x, nose_start_y));

    app.stage.addChild(nose_container, nose_initialize.createNoseOutline()); // add container + static outline to stage

    // initialize stage interactivity and size bounds
    app.stage.interactive = true
    app.stage.hitArea = new PIXI.Polygon([
        0,0,
        window.innerWidth, 0,
        window.innerWidth, window.innerHeight,
        0, window.innerHeight
    ])

    app.stage.on('pointerdown', event => {
    	// send mouse position coordinates to mModel
        mModel.mousePos.set(event.data.global.x, event.data.global.y)
		// console.log(colors)
    })

    // Handle window resizing
    window.addEventListener('resize', (_e) => {
        app.renderer.resize(window.innerWidth, window.innerHeight);
        app.stage.hitArea = new PIXI.Polygon([
            0,0,
            window.innerWidth, 0,
            window.innerWidth, window.innerHeight,
            0, window.innerHeight
        ]);
    });

    // render to webpage
    document.body.appendChild(app.view);

    // Setups GUI with mModel and tl information from ".controllers/gui.ts"
    // guiSetup(mModel, tl);

    app.ticker.add(update);
    global_app = app;
};

// random "drift" values for each object (except rainbow)
let left_brancheye_drift_x = getRandomFromRange(-5, 0);
let left_brancheye_drift_y = getRandomFromRange(-5, 5);

let right_brancheye_drift_x = getRandomFromRange(0, 5);
let right_brancheye_drift_y = getRandomFromRange(-5, 5);

let nose_drift_x = getRandomFromRange(-5, 5);
let nose_drift_y = getRandomFromRange(-5, 5);

// Cannot be an arrow function. Arrow functions cannot have a 'this' parameter.
function update(delta: number) {
	if (rainbow_container.angle < 180) {
		rainbow_container.angle += 1;
	} else {
		//change background once rainbow in rotates 180 degrees
		global_app.renderer.backgroundColor = 0x70FF82;
		rainbow_outline_container.removeChildren();
	}

	// add drift
	left_brancheye_container.x += left_brancheye_drift_x;
	left_brancheye_container.y += left_brancheye_drift_y;

	// add drift
	right_brancheye_container.x += right_brancheye_drift_x;
	right_brancheye_container.y += right_brancheye_drift_y;

	// add drift
    nose_container.x += nose_drift_x;
    nose_container.y += nose_drift_y;
};

main();