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
let spr_grass_block = new Image();
let spr_dirt = new Image();
let spr_grass = new Image();
let spr_cloud = new Image();
spr_vignette.src = "assets/vignette7.png";
spr_sky.src = "assets/sky.png";
spr_sky_rain.src = "assets/sky_rain.png";
spr_grass_block.src = "assets/grass_block.png";
spr_dirt.src = "assets/dirt.png";
spr_grass.src = "assets/grass.png";
spr_cloud.src = "assets/cloud.png";

let init = function () {
	objects.push( new Player(new Vector(200, 200), {width: 32, height: 64}) );
	objects.push( new Block(new Vector(0*gridW, 15*gridH), {width: 43*gridW, height: 5*gridH}) );
	objects.push( new Block(new Vector(0*gridW, 0*gridH), {width: 3*gridW, height: 15*gridH}) );
	objects.push( new Block(new Vector(20*gridW, 12*gridH), {width: 3*gridW, height: 1*gridH}) );
	objects.push( new Block(new Vector(18*gridW, 14*gridH + 28), {width: 3*gridW, height: 0.2*gridH}) );

	for (let i = 0; i < 4; i++) {
		objects.push( new Grass(new Vector((10 + i) * gridW, 15 * gridH), {width: 1*gridW, height: 1*gridH}) );
	}
	objects.push( new Grass(new Vector(4*gridW, 15*gridH), {width: 1*gridW, height: 1*gridH}) );
	objects.push( new Grass(new Vector(14*gridW, 15*gridH), {width: 1*gridW, height: 1*gridH}) );
	objects.push( new Grass(new Vector(25*gridW, 15*gridH), {width: 1*gridW, height: 1*gridH}) );
};

let loop = function () {
	update();
	draw();

	requestAnimationFrame(loop);
};

let update = function () {
	ticks += 1;
	objects.forEach((object) => {
		objects.forEach((object2) => {
			if (object != object2) {
				if (object.collider.intersects(object2.collider)) {
					if (!object.collisions.includes(object2)) {
						object.onCollision_enter(object2);
						object.collisions.push(object2);
					}
				} else if (!object.collider.intersects(object2.collider) && object.collisions.includes(object2)) {
					object.onCollision_leave(object2);
					object.collisions.splice(object.collisions.indexOf(object2), 1);
				}
			}
		})
		object.update()
	});
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
				if (!objects[0].collider.intersects(new Entity(
					new Vector(x * gridW, y * gridH),
					{ width: gridW, height: gridH }
				).collider)) continue;

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