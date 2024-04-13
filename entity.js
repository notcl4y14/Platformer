let Entity = class {
	constructor (position, dimensions) {
		this.collider = new Collider(position, dimensions);
	};

	get position () {
		return this.collider.position;
	};
	get dimensions () {
		return this.collider.dimensions;
	};

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