import * as PIXI from "pixi.js";

const main = async () => {
  // Actual app
  let app = new PIXI.Application();

  // Display application properly
  document.body.style.margin = '0';
  app.renderer.view.style.position = 'absolute';
  app.renderer.view.style.display = 'block';
  app.renderer.resize(window.innerWidth, window.innerHeight); // view size = window
  app.renderer.backgroundColor = 0x000517;

  function create_branches_eyes() {

    // Contains an instance of generated branches
    // with eyes in certain gaps between branches  
    let branches_eyes_container = new PIXI.Container();

    // Branches
    let branches = new PIXI.Graphics();
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
    let eyes = new PIXI.Graphics();
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

  // From the center
  let center_angle_step = 45; // angle step for loop that generates branches_eyes_containers from the center
  let center_branches_eyes_containers: object[] = []; // used for resizing the containers in the window.addEventListener function

  for (let angle = 0; angle < 360; angle += center_angle_step) {
    let branches_eyes_container = create_branches_eyes();
    branches_eyes_container.x = window.innerWidth / 2;
    branches_eyes_container.y = window.innerHeight / 2;
    branches_eyes_container.angle = angle;
    app.stage.addChild(branches_eyes_container);
    center_branches_eyes_containers.push(branches_eyes_container);
  }

  let side_angle_step = 90; // angle step for loop that generates branches_eyes_containers from the sides

  // From the top
  let top_branches_eyes_container = new PIXI.Container();
  for (let x = 0; x <= window.innerWidth; x += window.innerWidth / 5) {
    for (let angle = 0; angle <= 180; angle += side_angle_step) {
      let branches_eyes_container = create_branches_eyes();
      branches_eyes_container.x = x;
      branches_eyes_container.angle = angle;
      top_branches_eyes_container.addChild(branches_eyes_container); // add to the general top branches_eyes container
    }
  }
  app.stage.addChild(top_branches_eyes_container);

  // From the left
  let left_branches_eyes_container = new PIXI.Container();
  for (let y = 0; y <= window.innerHeight; y += window.innerHeight / 3) {
    for (let angle = 0; angle >= -180; angle -= side_angle_step) {
      let branches_eyes_container = create_branches_eyes();
      branches_eyes_container.y = y;
      branches_eyes_container.angle = angle;
      left_branches_eyes_container.addChild(branches_eyes_container);
    }
  }
  app.stage.addChild(left_branches_eyes_container);

  // From the bottom
  let bottom_branches_eyes_container = new PIXI.Container();
  for (let x = 0; x <= window.innerWidth; x += window.innerWidth / 5) {
    for (let angle = -180; angle <= 0; angle += side_angle_step) {
      let branches_eyes_container = create_branches_eyes();
      branches_eyes_container.x = x;
      branches_eyes_container.y = window.innerHeight;
      branches_eyes_container.angle = angle;
      bottom_branches_eyes_container.addChild(branches_eyes_container);
    }
  }
  app.stage.addChild(bottom_branches_eyes_container);

  // From the right
  let right_branches_eyes_container = new PIXI.Container();
  for (let y = 0; y <= window.innerHeight; y += window.innerHeight / 3) {
    for (let angle = 180; angle >= 0; angle -= side_angle_step) {
      let branches_eyes_container = create_branches_eyes();
      branches_eyes_container.x = window.innerWidth;
      branches_eyes_container.y = y;
      branches_eyes_container.angle = angle;
      right_branches_eyes_container.addChild(branches_eyes_container);
    }
  }
  app.stage.addChild(right_branches_eyes_container);


  // Handle window resizing
  window.addEventListener('resize', (_e) => {
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
};

main();