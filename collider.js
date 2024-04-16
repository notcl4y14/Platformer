let Collider = function (position, size, pivot) {
	this.position = position;
	this.size = size;
	this.pivot = pivot || (() => new Vector(0, 0));

	////////////////////
	this.intersects = function (other) {
		let x1 = this.pivoted().x,
		    y1 = this.pivoted().y,
			w1 = this.size.width,
			h1 = this.size.height,
			x2 = other.pivoted().x,
		    y2 = other.pivoted().y,
			w2 = other.size.width,
			h2 = other.size.height;
		
		return x1 < x2 + w2 &&
			x2 < x1 + w1 &&
			y1 < y2 + h2 &&
			y2 < y1 + h1;
	};

	this.pivoted = function (x = this.position.x, y = this.position.y) {
		return {
			x: x - this.pivot().x,
			y: y - this.pivot().y
		};
	};
	////////////////////
	this.draw = function (fillColor = "rgba(0,0,255,0.2)", outlineColor = "#ffffff") {
		let pos = this.position;
		let {x, y} = this.pivoted(pos.x, pos.y);
		let width = this.size.width;
		let height = this.size.height;

		context.fillStyle = fillColor;
		context.fillRect(x, y, width, height);
		
		context.strokeStyle = outlineColor;
		context.strokeRect(x, y, width, height);

		context.beginPath();
		context.arc(pos.x, pos.y, 2, 0, 2*Math.PI);
		context.stroke();
		context.closePath();

		context.fillStyle = outlineColor;
		context.fillText(`${pos.x}; ${pos.y}`, pos.x, pos.y);

		context.moveTo(pos.x, pos.y);
		context.lineTo(pos.x + width, pos.y + height);
		context.stroke();
	};
};