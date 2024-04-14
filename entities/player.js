let Player = class extends Entity {
	constructor (position, dimensions) {
		super(position, dimensions);
	};

	update () {
		let left = input.isKeyDown("KeyA");
		let right = input.isKeyDown("KeyD");
		let jump = input.isKeyPressed("Space");

		// Gravity
		this.velocity.y += 0.25;

		// Controls
		let dirX = (right - left);
	
		this.position.x += dirX * 2.5;
		
		if (jump) {
			this.velocity.y = -5;
		}

		// Applying velocity
		this.position.x += this.velocity.x;
		this.position.y += this.velocity.y;

		// Collision
		if (this.collider.intersects(objects[1].collider)) {
			let pivot = this.separate(objects[1]);

			if (pivot.x == 1) {
				this.velocity.x = 0;
			} else if (pivot.y == 1) {
				this.velocity.y = 0;
			}
		}
	};
};