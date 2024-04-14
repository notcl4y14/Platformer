let Entity = class {
	constructor (position, dimensions) {
		this.collider = new Collider(position, dimensions);
		this.velocity = new Vector(0, 0);
	};

	////////////////////
	get position () {
		return this.collider.position;
	};
	get dimensions () {
		return this.collider.dimensions;
	};
	////////////////////
	separate (other) {
		// https://www.sololearn.com/en/compiler-playground/WPmcR2CPfaIU
		// line: 2029
		// let dw = (this.dimensions.width)/2 + (other.dimensions.width)/2;
		// let dh = (this.dimensions.height)/2 + (other.dimensions.height)/2;
		
		// let dx = this.position.x - other.position.x;
		// let dy = this.position.y - other.position.y;

		// let vx = dx > 0 ? dw - dx : -dw - dx;
		// let vy = dy > 0 ? dh - dy : -dh - dy;

		// if (Math.abs(dx) > Math.abs(dy)) {
		// 	this.position.x += vx;
		// } else {
		// 	this.position.y += vy;
		// }

		// if (this.position.x < other.position.x + other.dimensions.width / 2) {
		// 	this.position.x = other.position.x - this.dimensions.width;
		// } else if (this.position.x > other.position.x + other.dimensions.width / 2) {
		// 	this.position.x = other.position.x + other.dimensions.width;
		// }

		// else if (this.position.y < other.position.y + other.dimensions.height / 2) {
		// 	this.position.y = other.position.y - this.dimensions.height;
		// } else if (this.position.y > other.position.y + other.dimensions.height / 2) {
		// 	this.position.y = other.position.y + other.dimensions.height;
		// }

		let centerX = other.position.x + other.dimensions.width / 2;
		let centerY = other.position.y + other.dimensions.height / 2;

		let dx = this.position.x - centerX;
		let dy = this.position.y - centerY;

		// https://stackoverflow.com/a/22440044/22146374
		let x1 = Math.max(this.position.x, other.position.x);
		let y1 = Math.max(this.position.y, other.position.y);
		let x2 = Math.min(this.position.x + this.dimensions.width, other.position.x + other.dimensions.width);
		let y2 = Math.min(this.position.y + this.dimensions.height, other.position.y + other.dimensions.height);

		let interRect = {
			x: x1,
			y: y1,
			width: x2 - x1,
			height: y2 - y1
		};

		let vx = interRect.width * Math.sign(dx);
		let vy = interRect.height * Math.sign(dy);

		if (interRect.width < interRect.height) {
			this.position.x += vx;
			return new Vector(1, 0);
		} else {
			this.position.y += vy;
			return new Vector(0, 1);
		}
	};
	////////////////////
	update () {};
	draw () {
		this.collider.draw();

		let className = this.constructor.name;
		let x = this.position.x;
		let y = this.position.y;
		let height = this.dimensions.height;

		context.fillStyle = "#ffffff";
		context.fillText(className, x, y + height + 7);
	};
};