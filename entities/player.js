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
	
		this.position.x += dirX * 4;
		
		if (jump) {
			this.velocity.y = -10;
		}

		// Applying velocity
		this.position.x += this.velocity.x;
		this.position.y += this.velocity.y;

		// Collision
		for (let i = 1; i < objects.length; i++) {
			if (!objects[i] instanceof Entity) return;

			if (this.collider.intersects(objects[i].collider)) {
				let pivot = this.separate(objects[i]);

				// Supposed to squish player on fall
				// if (this.velocity.y > 0){
				// 	this.dimensions.width += this.velocity.y / 10;
				// 	this.dimensions.height -= this.velocity.y / 10;
				// 	this.position.y += this.velocity.y / 10;
				// }

				if (pivot.x == 1) {
					this.velocity.x = 0;
				} else if (pivot.y == 1) {
					this.velocity.y = 0;
				}
			}
		}
	};
};