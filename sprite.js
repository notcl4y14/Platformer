let Sprite = class {
	constructor (frames = [], pause = true, interval = 4, loop = false, mode = Sprite.Mode.None) {
		this.frames = frames;
		this.pause = pause;
		this.interval = interval;
		this.mode = mode;

		this.tick = 0;
		this.frameIndex = 0;
	};
	
	////////////////////
	static Mode = {
		None: 0,
		Stretch: 1,
		Mapped: 2,
	};
	////////////////////
	getFrame () {
		return this.frames[this.frameIndex];
	};
	////////////////////
	update () {
		if (this.pause) return;

		this.tick++;
		if (this.tick > this.interval) {
			this.tick = 0;
			this.frameIndex++;
		}

		if (this.frameIndex > this.frames.length) {
			this.frameIndex = 0;

			if (!this.loop) {
				this.pause = true;
			}
		}
	};
	draw (x = 0, y = 0, width = 0, height = 0, pivot = () => { return new Vector(0, 0) }, mode = this.mode) {
		let frame = this.getFrame();

		x = x - pivot().x;
		y = y - pivot().y;
		width = width || frame.width;
		height = height || frame.height;
		
		switch (mode) {
			case Sprite.Mode.None:
				context.drawImage(frame, x, y);
				break;
			case Sprite.Mode.Stretch:

				// console.log(frame, x, y, width, height);
				// debugger;
				context.drawImage(frame, x, y, width, height);
				break;
			case Sprite.Mode.Mapped:
				
				for (let i = 0; i < width / frame.width; i++) {
					for (let j = 0; j < height / frame.height; j++) {
						let _x = x + i * frame.width;
						let _y = y + j * frame.height;

						context.drawImage(frame, _x, _y, frame.width, frame.height);
					}
				}

				break;
		}
	};
}