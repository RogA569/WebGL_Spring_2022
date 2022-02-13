import * as PIXI from 'pixi.js'
// import * as Filters from 'pixi-filters'
import * as dat from 'dat.gui'

const load = (app: PIXI.Application) => {
    return new Promise<void>((resolve) => {
        app.loader.add('wood', 'assets/pexels-fwstudio-172292_edited.png').load(() => {
            resolve();
        });
    });
};

// let scene_one = new PIXI.Container();
// let scene_two = new PIXI.Container();

// let myButton = new PIXI.Graphics();
// myButton.interactive = true;
// myButton.buttonMode = true;

// let myButton2 = new PIXI.Graphics();
// myButton2.interactive = true;
// myButton2.buttonMode = true;

// enum SceneState {
//     first,
//     second
// }

// let model = {
//     scene: SceneState.first,
//     myButtonData: {
//         width: 200,
//         height: 100,
//         myButton1_color: "#0000FF",
//         myButton2_color: "#FF0000"
//     }
// }

const main = async () => {
    // Actual app
    let app = new PIXI.Application({antialias: true});

    // Display application properly
    document.body.style.margin = '0';
    app.renderer.view.style.position = 'absolute';
    app.renderer.view.style.display = 'block';

    // View size = windows
    app.renderer.resize(window.innerWidth, window.innerHeight);

    // Load assets
    await load(app);

    // app.stage.addChild(scene_one, scene_two);

    // let temp_color_one = '0x' + model.myButtonData.myButton1_color.slice(1);
    // let temp_color_two = '0x' + model.myButtonData.myButton2_color.slice(1);

    // myButton.beginFill(temp_color_one);
    // myButton.drawRoundedRect(100, 100, 200, 100, 15);

    // myButton.on("pointerdown", onClick1);
    // myButton.on("pointerup", offClick1);
    // myButton.on("pointerover", onHover1);
    // myButton.on("pointerout", offHover1);

    // myButton2.beginFill(temp_color_two);
    // myButton2.drawRoundedRect(100, 500, 200, 100, 15);

    // myButton2.on("pointerdown", onClick2);
    // myButton2.on("pointerup", offClick2);
    // myButton2.on("pointerover", onHover2);
    // myButton2.on("pointerout", offHover2);
    
    // scene_one.addChild(myButton);
    // scene_two.addChild(myButton2);

    let rectangles = [];

    let rectangle_width_ = 200;
    let rectangle_height_ = 50;
    let rectangle_x_ = innerWidth / 2 - rectangle_width_ / 2;
    let rectangle_y_ = innerHeight / 7.24

    for (let i = 0; i < 6; i++) {
        let rectangle = new PIXI.Sprite(app.loader.resources['wood'].texture);
        rectangle.width = rectangle_width_;
        rectangle.height = rectangle_height_;
        rectangle.x = rectangle_x_;
        rectangle.y = rectangle_y_;
        rectangle_y_ += 2 * rectangle_height_;
        app.stage.addChild(rectangle);

        rectangles.push(rectangle);
        console.log(rectangles);

    }

    // for (let rectangle in rectangles) {
        
    // }

    // Handle window resizing
    window.addEventListener('resize', (_e) => {
        app.renderer.resize(window.innerWidth, window.innerHeight);
        // rectangle.x = window.innerWidth / 2 - rectangle.width / 2;
        // rectangle.y = window.innerHeight / 7.24;
    });

    document.body.appendChild(app.view);

    const gui = new dat.GUI();
    // These three lines are our control/controllers
    // gui.add(model.myButtonData, "width", 0, 500);
    // gui.add(model.myButtonData, "height", 0, 300);
    // gui.addColor(model.myButtonData, "myButton1_color");
    // gui.addColor(model.myButtonData, "myButton2_color");

    let time = 0

    let context = {
        velocity: { x: 1, y: 1 },
        // sprite,
        time
    };

    app.ticker.add(update, context);
};

// Cannot be an arrow function. Arrow functions cannot have a 'this' parameter.
function update(this: any, delta: number) {

    // switch (model.scene) {
    //     case SceneState.first:
    //         scene_one.visible = true;
    //         scene_two.visible = false;
    //         break;
    //     case SceneState.second:
    //         scene_one.visible = false;
    //         scene_two.visible = true;
    // }

    this.time += delta * 0.05;
}

main();

// function onClick1() {
//     myButton.clear();
//     myButton.beginFill(0xFFFF00);
//     myButton.drawRoundedRect(100, 100, model.myButtonData.width, model.myButtonData.height, 15);
//     console.log("Clicked first");
//     model.scene = SceneState.second;
// }

// function onClick2() {
//     myButton.clear();
//     myButton.beginFill(0xFFaaaF);
//     myButton.drawRoundedRect(100, 500, model.myButtonData.width, model.myButtonData.height, 15);
//     console.log("Clicked second");
//     model.scene = SceneState.first;
// }

// function offClick1() {
//     myButton.clear();
//     myButton.beginFill(0xFF00FF);
//     myButton.drawRoundedRect(100, 100, model.myButtonData.width, model.myButtonData.height, 15);
// }

// function offClick2() {
//     myButton.clear();
//     myButton.beginFill(0xFF00FF);
//     myButton.drawRoundedRect(100, 500, model.myButtonData.width, model.myButtonData.height, 15);
// }

// function onHover1() {
//     myButton.clear();
//     // These next three lines (and the corresponding ones in the other callback functions)
//     // are our view
//     let temp_color = '0x' + model.myButtonData.myButton1_color.slice(1);
//     myButton.beginFill(temp_color);
//     myButton.drawRoundedRect(100, 100, model.myButtonData.width, model.myButtonData.height, 15);
// }

// function onHover2() {
//     myButton.clear();
//     // These next three lines (and the corresponding ones in the other callback functions)
//     // are our view
//     let temp_color = '0x' + model.myButtonData.myButton2_color.slice(1);
//     myButton.beginFill(temp_color);
//     myButton.drawRoundedRect(100, 500, model.myButtonData.width, model.myButtonData.height, 15);
// }

// function offHover1() {
//     myButton.clear();
//     // let temp_color = '0x' + model.myButtonData.color1.slice(1);
//     // myButton.beginFill(temp_color);
//     myButton.beginFill(0x0000FF);
//     myButton.drawRoundedRect(100, 100, model.myButtonData.width, model.myButtonData.height, 15);
// }

// function offHover2() {
//     myButton.clear();
//     // let temp_color = '0x' + model.myButtonData.color1.slice(1);
//     // myButton.beginFill(temp_color);
//     myButton.beginFill(0x0000FF);
//     myButton.drawRoundedRect(100, 500, model.myButtonData.width, model.myButtonData.height, 15);
// }