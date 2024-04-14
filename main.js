let input = new Input();
let canvas;
let context;
let ticks = 0;
let objects = [];

// let collider = new Collider({x: 10, y: 10}, {width: 50, height: 50});
// let ent = new Entity(new Vector(10, 10), {width: 50, height: 50});

let init = function () {
	objects.push( new Player(new Vector(10, 10), {width: 50, height: 50}) );
	objects.push( new Entity(new Vector(5, 500), {width: 200, height: 50}) );
};

let loop = function () {
	update();
	draw();

	requestAnimationFrame(loop);
};

let update = function () {
	ticks += 1;
	objects.forEach((object) => object.update());

	// let dirX = (input.isKeyDown("KeyD") - input.isKeyDown("KeyA"));
	// let dirY = (input.isKeyDown("KeyS") - input.isKeyDown("KeyW"));

	// ent.collider.position.x += dirX * 2.5;
	// ent.collider.position.y += dirY * 2.5;
};

let draw = function () {
	context.fillStyle = "cornflowerblue";
	context.fillRect(0, 0, canvas.width, canvas.height);
	
	objects.forEach((object) => object.draw());

	// ent.draw();
};

window.onload = function () {
	canvas = document.getElementById("canvas");
	context = canvas.getContext("2d");
	
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	init();
	loop();
};

window.onresize = function () {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
};