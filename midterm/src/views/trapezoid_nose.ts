import { Graphics } from "pixi.js"

export class TrapezoidNose {
	constructor() {
	}
	createNose(start_x: number, start_y: number) {
		let nose = new Graphics();
		nose.interactive = true; // make nose interactive for mouse movement
		nose.beginFill(0x000000); // black

		nose.moveTo(start_x, start_y); // start position
		nose.lineTo(start_x + 72, start_y);
		nose.quadraticCurveTo(start_x + 75, start_y, start_x + 75, start_y + 3);
		nose.quadraticCurveTo(start_x + 60, start_y + 37, start_x + 55, start_y + 35);
		nose.quadraticCurveTo(start_x + 24, start_y + 36, start_x + 20, start_y + 34);
		nose.quadraticCurveTo(start_x - 3, start_y + 2, start_x + 3, start_y);

		return nose
	}
	createNoseOutline() {
		// same as createNose() but only outline is created (no Fill)
		let outline = new Graphics();
		outline.beginFill(0, 0);
		outline.lineStyle(1, 0x0);

		let start_x = innerWidth / 2 - 36;
		let start_y = innerHeight / 2 - 17.5;

		outline.moveTo(start_x, start_y); // start position
		outline.lineTo(start_x + 72, start_y);
		outline.quadraticCurveTo(start_x + 75, start_y, start_x + 75, start_y + 3);
		outline.quadraticCurveTo(start_x + 60, start_y + 37, start_x + 55, start_y + 35);
		outline.quadraticCurveTo(start_x + 24, start_y + 36, start_x + 20, start_y + 34);
		outline.quadraticCurveTo(start_x - 3, start_y + 2, start_x + 3, start_y);		

		return outline
	}
}