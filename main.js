let canvas;
let context;
let ticks = 0;
let objects = [];

let init = function () {}

let loop = function () {
	update();
	draw();

	requestAnimationFrame(loop);
}

let update = function () {
	ticks += 1;
	objects.forEach((object) => object.update());
}

let draw = function () {
	context.fillStyle = "cornflowerblue";
	context.fillRect(0, 0, canvas.width, canvas.height);
	
	objects.forEach((object) => object.draw());
}

window.onload = function () {
	canvas = document.getElementById("canvas");
	context = canvas.getContext("2d");
	
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	init();
	loop();
}

window.onresize = function () {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
}