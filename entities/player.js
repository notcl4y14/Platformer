let Player = class extends Entity {
	constructor (position, size) {
		super(position, size);
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
			if (!(objects[i] instanceof Block)) continue;

			if (this.collider.intersects(objects[i].collider)) {
				let pivot = this.separate(objects[i]);

				// Supposed to squish player on fall
				// if (this.velocity.y > 0){
				// 	this.size.width += this.velocity.y / 10;
				// 	this.size.height -= this.velocity.y / 10;
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