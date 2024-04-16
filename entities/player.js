let Player = class extends Entity {
	constructor (position, size) {
		super(position, size);

		this.canMove = true;
		this.speed = 4;
		this.sprintSpeed = 8;
		this.jumps = 0;
		this.jumpsMax = 2;
	};

	update () {
		let left = input.isKeyDown("KeyA");
		let right = input.isKeyDown("KeyD");
		let jump = input.isKeyPressed("Space");
		let sprint = input.isKeyDown("ShiftLeft");

		// Gravity
		this.velocity.y += 0.25;

		// Controls
		let dirX = (right - left);
	
		// this.position.x += dirX * (sprint ? this.sprintSpeed : this.speed);
		if (this.canMove)
			this.velocity.x = dirX * (sprint ? this.sprintSpeed : this.speed);
		
		if (jump && this.jumps < this.jumpsMax) {
			this.velocity.y = -7;
			this.jumps++;

			// for (let i = 0; i < 3; i++) {
			// 	let pos = this.position.clone();
			// 	pos.x += Math.floor(Math.random() * 2);
			// 	pos.y += this.size.height;
			// 	objects.push( new Particle(
			// 		pos,
			// 		{width: 32, height: 32},
			// 		new Sprite([spr_cloud],
			// 			true,
			// 			0,
			// 			false,
			// 			Sprite.Mode.Stretch
			// 		),
			// 		new Vector(Math.random() * 2 - 1, 1),
			// 		100
			// 	) );
			// }
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
					if (sprint) {
						this.velocity.x = (this.velocity.x / 2) * -1;
						this.velocity.y = -5;
						this.canMove = false;
						continue;
					}
					
					this.velocity.x = 0;
				} else if (pivot.y == 1) {
					this.velocity.y = 0;
					this.jumps = 0;
					this.canMove = true;
				}
			}
		}
	};
};