let Collider = function (position, dimensions, pivot = {x: 0, y: 0}) {
	this.position = position;
	this.dimensions = dimensions;
	this.pivot = pivot;

	////////////////////
	this.intersects = function (other) {
		let x1 = this.position.x,
		    y1 = this.position.y,
			w1 = this.dimensions.width,
			h1 = this.dimensions.height,
			x2 = other.position.x,
		    y2 = other.position.y,
			w2 = other.dimensions.width,
			h2 = other.dimensions.height;
		
		return x1 < x2 + w2 &&
			x2 < x1 + w1 &&
			y1 < y2 + h2 &&
			y2 < y1 + h1;
	};

	this.pivoted = function (x, y) {
		return {
			x: x - this.pivot.x,
			y: y - this.pivot.y
		};
	};
	////////////////////
	this.draw = function (fillColor = "rgba(0,0,255,0.2)", outlineColor = "#ffffff") {
		let pos = this.position;
		let {x, y} = this.pivoted(pos.x, pos.y);
		let width = this.dimensions.width;
		let height = this.dimensions.height;

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