let Block = class extends Entity {
	constructor (position, size) {
		super(position, size);

		this.spr_grass = spr_grass_block;
		this.spr_dirt = spr_dirt;
	};

	update () {};

	draw () {
		if (!this.spr_grass.complete) return;

		for (let i = 0; i < this.size.width / this.spr_grass.width; i++) {
			context.drawImage(this.spr_grass, this.position.x + i * this.spr_grass.width, this.position.y);
		}

		for (let i = 1; i < this.size.height / this.spr_dirt.height; i++) {
			for (let j = 0; j < this.size.width / this.spr_dirt.width; j++) {
				context.drawImage(this.spr_dirt, this.position.x + j * this.spr_dirt.width, this.position.y + i * this.spr_dirt.height);
			}
		}
	}
};