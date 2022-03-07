import { Graphics } from "pixi.js"

export class BranchEyes {
	constructor() {
	}
	create_left_branches(start_x: number, start_y: number) {
		let branches = new Graphics();
		branches.interactive = true; // make interactive for mouse movement
		branches.lineStyle(10, 0x691F00); // thick, brownish lines

		branches.moveTo(start_x, start_y); // start position of branch
		branches.lineTo(start_x + 48, start_y + 14); // branching point
		branches.moveTo(start_x, start_y);
		branches.lineTo(start_x + 14, start_y + 48); // branching point
		branches.lineTo(start_x + 62, start_y + 62); // end of branch
		branches.moveTo(start_x + 48, start_y + 14);
		branches.lineTo(start_x + 62, start_y + 62); // end of branch
		
		return branches;
	}
	create_right_branches(start_x: number, start_y: number) {
		let branches = new Graphics();
		branches.interactive = true;
		branches.lineStyle(10, 0x691F00); // thick, brownish lines

		branches.moveTo(start_x, start_y); // start position of branch
		branches.lineTo(start_x - 48, start_y + 14); // branching point
		branches.moveTo(start_x, start_y);
		branches.lineTo(start_x - 14, start_y + 48); // branching point
		branches.lineTo(start_x - 62, start_y + 62); // end of branch
		branches.moveTo(start_x - 48, start_y + 14);
		branches.lineTo(start_x - 62, start_y + 62); // end of branch
		
		return branches;
	}
	create_left_eye(start_x: number, start_y: number) {
		let eye = new Graphics();
		eye.interactive = true;

	    // Arc for the iris
	    eye.lineStyle(1, 0xFFFF00); // yellow
	    eye.beginFill(0xFFFF00); // yellow
	    eye.moveTo(start_x + 7, start_y + 6);
	    // Math.PI / 180 used to convert from degrees to radians
	    eye.arc(start_x + 43, start_y + 35, 17, 50 * (Math.PI / 180), 112 * (Math.PI / 180));
	    eye.lineTo(start_x + 17, start_y + 43);
	    eye.lineTo(start_x + 7, start_y + 6);

	    // Ellipse for the pupil
	    eye.lineStyle(1, 0x000000); // black
	    eye.beginFill(0x000000); // black
	    eye.drawEllipse(start_x + 38, start_y + 35, 3, 1); // a very small, vertical ellipse

	    return eye
	}
	create_right_eye(start_x: number, start_y: number) {
		let eye = new Graphics();
		eye.interactive = true;

	    // Arc for the iris
	    eye.lineStyle(1, 0xFFFF00); // yellow
	    eye.beginFill(0xFFFF00); // yellow
	    eye.moveTo(start_x - 7, start_y + 6);
	    eye.lineTo(start_x - 17, start_y + 43);
	    // Math.PI / 180 used to convert from degrees to radians
	    eye.arc(start_x - 43, start_y + 35, 17, 50 * (Math.PI / 180), 112 * (Math.PI / 180));
	    eye.lineTo(start_x - 7, start_y + 6);

	    // Ellipse for the pupil
	    eye.lineStyle(1, 0x000000); // black
	    eye.beginFill(0x000000); // black
	    eye.drawEllipse(start_x - 34, start_y + 35, 3, 1); // a very small, vertical ellipse
	    
	    return eye
	}
	create_left_brancheye_outline() {
		// same as create_left_branches() but only the outline
		let outline = new Graphics();
		outline.beginFill(0, 0);
		outline.lineStyle(1, 0x0); // no colored, thick lines

		let start_x = innerWidth / 2 - 150;
		let start_y = innerHeight / 4;

		outline.moveTo(start_x, start_y); // start position of branch
		outline.lineTo(start_x + 48, start_y + 14); // branching point
		outline.moveTo(start_x, start_y);
		outline.lineTo(start_x + 14, start_y + 48); // branching point
		outline.lineTo(start_x + 62, start_y + 62); // end of branch
		outline.moveTo(start_x + 48, start_y + 14);
		outline.lineTo(start_x + 62, start_y + 62); // end of branch

		return outline
	}
	create_right_brancheye_outline() {
		// same as create_left_brancheye_outline() but for the right branches/eye

		let outline = new Graphics();
		outline.beginFill(0, 0);
		outline.lineStyle(1, 0x0); // no colored, thick lines

		let start_x = innerWidth / 2 + 150;
		let start_y = innerHeight / 4;

		outline.moveTo(start_x, start_y); // start position of branch
		outline.lineTo(start_x - 48, start_y + 14); // branching point
		outline.moveTo(start_x, start_y);
		outline.lineTo(start_x - 14, start_y + 48); // branching point
		outline.lineTo(start_x - 62, start_y + 62); // end of branch
		outline.moveTo(start_x - 48, start_y + 14);
		outline.lineTo(start_x - 62, start_y + 62); // end of branch

		return outline
	}
}