let Particle = class extends Entity {
	constructor (position, size, sprite, velocity, time) {
		super(position, size);
		this.collider.pivot = () => {
			return new Vector(0, this.size.height)
		};

		this.sprite = sprite;
		this.velocity = velocity;
		this.time = time;

		this.ticks = 0;
	};

	////////////////////
	// onCollision_enter (other) {
	// 	if (other instanceof Block) {
	// 		this.separate(other);
	// 	}
	// }
	////////////////////
	update () {
		this.ticks++;

		this.position.x += this.velocity.x;
		this.position.y += this.velocity.y;

		if (this.ticks > this.time) {
			objects.splice(objects.indexOf(this));
		}
		
		// Collision
		for (let i = 0; i < objects.length; i++) {
			if (!(objects[i] instanceof Block)) continue;

			if (this.collider.intersects(objects[i].collider)) {
				this.separate(objects[i]);
			}
		}
	};

	draw () {
		this.sprite.draw(
			this.position.x,
			this.position.y,
			this.size.width,
			this.size.height,
			this.collider.pivot
		);
	};
};