let Grass = class extends Entity {
	constructor (position, size) {
		super(position, size);
		this.collider.pivot = () => {
			return new Vector(0, this.size.height)
		};
		
		this.animation_type = 0;
		this.animation_tick = 0;

		this.sprite = new Sprite([spr_grass], true, 0, false, Sprite.Mode.Stretch);
	};
	
	////////////////////
	onCollision_enter (other) {
		if (other instanceof Player) {
			this.animation_type = 1;
			this.animation_tick = 0;
		}
	};
	
	onCollision_leave (other) {
		if (other instanceof Player) {
			this.animation_type = 2;
			this.animation_tick = 0;
		}
	};
	////////////////////
	update () {
		if (this.animation_type == 1) {
			
			this.animation_tick++;
			this.size.height = this.origin_size.height / this.animation_tick;
			
			if (this.size.height < this.origin_size.height / 4) {
				this.animation_tick = 0;
				this.animation_type = 0;
				this.size.height = this.origin_size.height / 4;
			}

		} else if (this.animation_type == 2) {
		
			this.animation_tick++;
			this.size.height = (this.animation_tick + 2) * 2;
			
			if (this.size.height > this.origin_size.height) {
				this.animation_tick = 0;
				this.animation_type = 0;
				this.size.height = this.origin_size.height;
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