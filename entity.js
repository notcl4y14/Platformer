let Entity = class {
	constructor (position, size) {
		this.collider = new Collider(position, size);
		this.velocity = new Vector(0, 0);

		this.origin_position = position.clone();
		this.origin_size = { width: size.width, height: size.height };
		this.collisions = [];
	};

	////////////////////
	get position () {
		return this.collider.position;
	};
	get size () {
		return this.collider.size;
	};
	////////////////////
	separate (other) {
		// https://www.sololearn.com/en/compiler-playground/WPmcR2CPfaIU
		// line: 2029

		let centerX = other.position.x + other.size.width / 2;
		let centerY = other.position.y + other.size.height / 2;

		let dx = this.position.x - centerX;
		let dy = this.position.y - centerY;

		// https://stackoverflow.com/a/22440044/22146374
		let x1 = Math.max(this.position.x, other.position.x);
		let y1 = Math.max(this.position.y, other.position.y);
		let x2 = Math.min(this.position.x + this.size.width, other.position.x + other.size.width);
		let y2 = Math.min(this.position.y + this.size.height, other.position.y + other.size.height);

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
	onCollision_enter (other) {};
	onCollision_leave (other) {};
	////////////////////
	update () {};
	draw () {
		this.collider.draw();

		let className = this.constructor.name;
		let x = this.position.x;
		let y = this.position.y;
		let height = this.size.height;

		context.fillStyle = "#ffffff";
		context.fillText(className, x, y + height + 7);
	};
};