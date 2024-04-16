let Block = class extends Entity {
	constructor (position, dimensions) {
		super(position, dimensions);

		this.grass = new Image();
		this.dirt = new Image();
		this.grass.src = "assets/grass.png";
		this.dirt.src = "assets/dirt.png";
	};

	update () {};

	draw () {
		if (!this.grass.complete) return;

		for (let i = 0; i < this.dimensions.width / this.grass.width; i++) {
			context.drawImage(this.grass, this.position.x + i * this.grass.width, this.position.y);
		}

		for (let i = 1; i < this.dimensions.height / this.dirt.height; i++) {
			for (let j = 0; j < this.dimensions.width / this.dirt.width; j++) {
				context.drawImage(this.dirt, this.position.x + j * this.dirt.width, this.position.y + i * this.dirt.height);
			}
		}
	}
};