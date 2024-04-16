let input = new Input();
let canvas;
let context;
let ticks = 0;
let objects = [];

let settings = {
	draw_grid: false,
	vignette: true,
	sky_rain: false,
};

let gridW = 32;
let gridH = 32;

let spr_vignette = new Image();
let spr_sky = new Image();
let spr_sky_rain = new Image();
spr_vignette.src = "assets/vignette7.png";
spr_sky.src = "assets/sky.png";
spr_sky_rain.src = "assets/sky_rain.png";

let init = function () {
	objects.push( new Player(new Vector(200, 200), {width: 50, height: 50}) );
	objects.push( new Block(new Vector(0*gridW, 15*gridH), {width: 43*gridW, height: 5*gridH}) );
	objects.push( new Block(new Vector(0*gridW, 0*gridH), {width: 3*gridW, height: 15*gridH}) );
	objects.push( new Block(new Vector(20*gridW, 12*gridH), {width: 3*gridW, height: 1*gridH}) );
};

let loop = function () {
	update();
	draw();

	requestAnimationFrame(loop);
};

let update = function () {
	ticks += 1;
	objects.forEach((object) => object.update());
};

let draw = function () {
	context.fillStyle = "cornflowerblue";
	context.fillRect(0, 0, canvas.width, canvas.height);
	
	if (!settings.sky_rain && spr_sky.complete)
		context.drawImage(spr_sky, 0, 0, canvas.width, canvas.height);
	if (settings.sky_rain && spr_sky_rain.complete)
		context.drawImage(spr_sky_rain, 0, 0, canvas.width, canvas.height);
	
	objects.forEach((object) => object.draw());

	if (settings.vignette && spr_vignette.complete)
		context.drawImage(spr_vignette, 0, 0, canvas.width, canvas.height);

	  //////////////////
	 // Drawing Grid //
	//////////////////
		if (!settings.draw_grid) return;
		
		// By X-axis
		for (let i = 0; i < canvas.width / gridW; i++) {
			context.strokeStyle = "rgba(255,255,255,0.2)";
			context.beginPath();
			context.moveTo(i*gridW, 0);
			context.lineTo(i*gridW, canvas.height);
			context.closePath();
			context.stroke();
		}
		
		// By Y-axis
		for (let i = 0; i < canvas.height / gridH; i++) {
			context.strokeStyle = "rgba(255,255,255,0.2)";
			context.beginPath();
			context.moveTo(0, i*gridH);
			context.lineTo(canvas.width, i*gridH);
			context.closePath();
			context.stroke();
		}

		// Drawing grid that the player intersects with
		for (let x = 0; x < canvas.width / gridW; x++) {
			for (let y = 0; y < canvas.height / gridH; y++) {
				if (!objects[0].collider.intersects({
					position: new Vector(x * gridW, y * gridH),
					dimensions: { width: gridW, height: gridH }
				})) continue;

				context.strokeStyle = "rgba(255,255,255,1)";
				context.strokeRect(
					x * gridW,
					y * gridH,
					gridW,
					gridH
				);
			}
		}
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