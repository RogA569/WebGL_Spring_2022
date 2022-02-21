import * as PIXI from 'pixi.js'
import { Model } from './model/model'
import { guiSetup } from './controllers/gui';
import { gsap } from "gsap";
import { lerp, easeIn, easeOut, easeinOutSine } from "./utils/easing";

let mModel = new Model();

let tl = gsap.timeline({repeat: -1, yoyo: true});

let bottom_right_graphs: Array<PIXI.Graphics> = []
let bottom_right_sizes: Array<any> = []

let bottom_left_graphs: Array<PIXI.Graphics> = []
let bottom_left_sizes: Array<any> = []

let top_right_graphs: Array<PIXI.Graphics> = []
let top_right_sizes: Array<any> = []

let top_left_graphs: Array<PIXI.Graphics> = []
let top_left_sizes: Array<any> = []

// const load = (app: PIXI.Application) => {
//     return new Promise<void>((resolve) => {
//         app.loader.add('world1', 'assets/hello-world.png').load(() => {
//             resolve();
//         });
//     });
// };

const main = async () => {
    // Actual app
    let app = new PIXI.Application({antialias: true});

    // Display application properly
    document.body.style.margin = '0';
    app.renderer.view.style.position = 'absolute';
    app.renderer.view.style.display = 'block';

    // View size = windows
    app.renderer.resize(window.innerWidth, window.innerHeight);

    //// Load assets
    // await load(app);

    // 100 lines in total (50 on top, 50 on bottom)

    // top left
	for (let i = 0; i < 77; i++) {
		const element = new PIXI.Graphics();
		
		// element.x = 0
		// element.y = 0

		element.x = window.innerWidth / 2 - 5
		element.y = window.innerHeight / 2
	
		element.x -= 10 * i

		top_left_graphs.push(element)
		app.stage.addChild(element)

		top_left_sizes[i] = {
			value: 0
		};
	}

	// top right
	for (let i = 0; i < 77; i++) {
		const element = new PIXI.Graphics();
		
		// element.x = 0
		// element.y = 0

		element.x = window.innerWidth / 2 + 5
		element.y = window.innerHeight / 2
	
		element.x += 10 * i

		top_right_graphs.push(element)
		app.stage.addChild(element)

		top_right_sizes[i] = {
			value: 0
		};
	}

	// bottom left
	for (let i = 0; i < 77; i++) {
		const element = new PIXI.Graphics();
		
		// element.x = 0
		// element.y = 0

		element.x = window.innerWidth / 2 - 5
		element.y = window.innerHeight / 2
	
		element.x -= 10 * i

		bottom_left_graphs.push(element)
		app.stage.addChild(element)

		bottom_left_sizes[i] = {
			value: 0
		};
	}

	// bottom right
	for (let i = 0; i < 77; i++) {
		const element = new PIXI.Graphics();

		element.x = window.innerWidth / 2 + 5
		element.y = window.innerHeight / 2
	
		element.x += 10 * i

		bottom_right_graphs.push(element)
		app.stage.addChild(element)

		bottom_right_sizes[i] = {
			value: 0
		};
	}

    app.stage.interactive = true
    app.stage.hitArea = new PIXI.Polygon([
        0,0,
        window.innerWidth, 0,
        window.innerWidth, window.innerHeight,
        0, window.innerHeight
    ])

    app.stage.on('pointerdown', event => {
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

    document.body.appendChild(app.view);

    guiSetup(mModel, tl);

    // top left (original)
	top_left_sizes.forEach((size, i) => {
		tl.to(size,
		{
			value: -265 + (Math.sqrt(i) * 37),
			duration: 0.025
		},)
	})

	// top right (original)
	top_right_sizes.forEach((size, i) => {
		tl.to(size,
		{
			value: -270 + (Math.sqrt(i) * 37),
			duration: 0.025
		},)
	})

	// bottom left (original)
	bottom_left_sizes.forEach((size, i) => {
		tl.to(size,
		{
			value: 270 - (Math.sqrt(i) * 37),
			duration: 0.025
		},)
	})

    // bottom right (original)
	bottom_right_sizes.forEach((size, i) => {
		tl.to(size,
		{
			value: 265 - (Math.sqrt(i) * 37),
			duration: 0.025
		},)
	})

	// top left (remixed)
	top_left_sizes.forEach((size, i) => {
		tl.to(size,
		{
			value: easeinOutSine(i) * -300,
			duration: 0.025
		},)
	})

	// top right (remixed)
	top_right_sizes.forEach((size, i) => {
		tl.to(size,
		{
			value: easeinOutSine(i) * -300,
			duration: 0.025
		},)
	})

	// bottom left (remixed)
	bottom_left_sizes.forEach((size, i) => {
		tl.to(size,
		{
			value: easeinOutSine(i) * 300,
			duration: 0.025
		},)
	})

	// bottom right (remixed)
	bottom_right_sizes.forEach((size, i) => {
		tl.to(size,
		{
			value: easeinOutSine(i) * 300,
			duration: 0.025
		},)
	})

    app.ticker.add(update);
};

// Cannot be an arrow function. Arrow functions cannot have a 'this' parameter.
function update(delta: number) {

    mModel.elapsedTime += delta;

	// top left (original)
	top_left_graphs.forEach((graph, i) => {
		graph.clear()
		graph.beginFill(0xffffff)
		graph.lineStyle(5, 0x4900B8)
		graph.lineTo(0, lerp(0, top_left_sizes[i].value, easeIn(1.19)))
	})

	// top right (original)
	top_right_graphs.forEach((graph, i) => {
		graph.clear()
		graph.beginFill(0xffffff)
		graph.lineStyle(5, 0x4900B8)
		graph.lineTo(0, lerp(0, top_right_sizes[i].value, easeIn(1.19)))
	})

	// bottom left (original)
	bottom_left_graphs.forEach((graph, i) => {
		graph.clear()
		graph.beginFill(0xffffff)
		graph.lineStyle(5, 0x4900B8)
		graph.lineTo(0, lerp(0, bottom_left_sizes[i].value, easeIn(1.19)))
	})

    // bottom right (original)
	bottom_right_graphs.forEach((graph, i) => {
		graph.clear()
		graph.beginFill(0xffffff)
		graph.lineStyle(5, 0x4900B8)
		graph.lineTo(0, lerp(0, bottom_right_sizes[i].value, easeIn(1.19)))
	})

	// top left (remixed)
	top_left_graphs.forEach((graph, i) => {
		graph.clear()
		graph.beginFill(0xffffff)
		graph.lineStyle(5, 0x4900B8)
		graph.lineTo(0, top_left_sizes[i].value)
	})

	// top right (remixed)
	top_right_graphs.forEach((graph, i) => {
		graph.clear()
		graph.beginFill(0xffffff)
		graph.lineStyle(5, 0x4900B8)
		graph.lineTo(0, top_right_sizes[i].value)
	})

	// bottom left (remixed)
	bottom_left_graphs.forEach((graph, i) => {
		graph.clear()
		graph.beginFill(0xffffff)
		graph.lineStyle(5, 0x4900B8)
		graph.lineTo(0, bottom_left_sizes[i].value)
	})

	// bottom right (remixed)
	bottom_right_graphs.forEach((graph, i) => {
		graph.clear()
		graph.beginFill(0xffffff)
		graph.lineStyle(5, 0x4900B8)
		graph.lineTo(0, bottom_right_sizes[i].value)
	})
};

main();