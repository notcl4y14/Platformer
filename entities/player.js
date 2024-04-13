let Player = class extends Entity {
	constructor (position, dimensions) {
		super(position, dimensions);

		this.velocity = new Vector(0, 0);
	};

	update () {
		let dirX = (input.isKeyDown("KeyD") - input.isKeyDown("KeyA"));
		let dirY = (input.isKeyDown("KeyS") - input.isKeyDown("KeyW"));
	
		this.position.x += dirX * 2.5;
		this.position.y += dirY * 2.5;
	};
};