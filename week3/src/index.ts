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

let rectangles: PIXI.Sprite[] = [];

const main = async () => {
    // Actual app
    let app = new PIXI.Application({backgroundColor: 0x2C2C2E});

    // Display application properly
    document.body.style.margin = '0';
    app.renderer.view.style.position = 'absolute';
    app.renderer.view.style.display = 'block';

    // View size = windows
    app.renderer.resize(window.innerWidth, window.innerHeight);

    // Load assets
    await load(app);

    let rectangle_width = 100;
    let rectangle_height = 15;
    let rectangle_x = 0;
    let rectangle_y = innerHeight / 30

    if (rectangles.length == 0) {
        for (let i = 0; i < 24; i++) {
            let rectangle = new PIXI.Sprite(app.loader.resources['wood'].texture);
            rectangle.width = rectangle_width;
            rectangle.height = rectangle_height;
            rectangle.x = rectangle_x;
            rectangle.y = rectangle_y;
            rectangle_y += 2 * rectangle_height;
            app.stage.addChild(rectangle);

            rectangles.push(rectangle);
        }
    }

    // Handle window resizing
    window.addEventListener('resize', (_e) => {
        app.renderer.resize(window.innerWidth, window.innerHeight);
        // rectangle.x = window.innerWidth / 2 - rectangle.width / 2;
        // rectangle.y = window.innerHeight / 7.24;
    });

    document.body.appendChild(app.view);

    const gui = new dat.GUI();

    let context = {
        velocity: { x: 1, y: 1 },
        // sprite,
    };

    app.ticker.add(update, context);
};

let total_dist_traveled = 0;
// Cannot be an arrow function. Arrow functions cannot have a 'this' parameter.
function update(this: any) {
    this.time = new Date();
    
    let dist_traveled = 0;
    let distance_per_day = innerWidth - rectangles[0].width;
    for (let rectangle in rectangles) {
        let indiv_rect_interval = distance_per_day / 60 ** 3;
        if (rectangles[rectangle].x <= innerWidth - rectangles[rectangle].width && dist_traveled == 0) {
            rectangles[rectangle].x  += indiv_rect_interval; // interval
            dist_traveled += indiv_rect_interval;
            total_dist_traveled += dist_traveled;
        }
    }

    if (Math.ceil(total_dist_traveled) >= distance_per_day * 24) {
        total_dist_traveled = 0;
        for (let rectangle in rectangles) {
            rectangles[rectangle].x = 0;
        }
    }
}


main();