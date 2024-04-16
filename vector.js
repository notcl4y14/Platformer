let Vector = function (x, y) {
	this.x = x;
	this.y = y;

	this.set = Vector.set;
	this.clone = Vector.clone;
};

Vector.set = function(x, y) {
	this.x = x;
	this.y = y;
};

Vector.clone = function () {
	return new Vector(this.x, this.y);
}