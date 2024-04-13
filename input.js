let Input = function () {
	this.keys = {};
	this.mouse = {};
	
	this.mouseX = 0;
	this.mouseY = 0;

	////////////////////
	window.onkeydown = (key) => {
		if (!this.keys[key.code]) {
			this.keys[key.code] = new Key(key.code, false);
		};

		this.keys[key.code].press();
	};

	window.onkeyup = (key) => {
		if (!this.keys[key.code]) {
			return;
		}

		this.keys[key.code].unpress();
	};

	window.onmousedown = (mouse) => {
		if (!this.mouse[mouse.button]) {
			this.mouse[mouse.button] = new MouseButton(mouse.button, false);
		};

		this.mouse[mouse.button].press();
	};

	window.onmouseup = (mouse) => {
		if (!this.mouse[mouse.button]) {
			return;
		}
		
		this.mouse[mouse.button].unpress();
	};

	window.onmousemove = (mouse) => {
		this.mouseX = mouse.x;
		this.mouseY = mouse.y;
	};
	////////////////////
	this.isKeyDown = function (key) {
		if (!this.keys[key]) return false;
		return this.keys[key].down;
	};

	this.isKeyUp = function (key) {
		if (!this.keys[key]) return true;
		return !this.keys[key].down;
	};

	this.isKeyPressed = function (key) {
		if (!this.keys[key]) return false;
		return this.keys[key].down && this.keys[key].held <= 1;
	};

	this.isMouseDown = function (button) {
		if (!this.mouse[button]) return false;
		return this.mouse[button].down;
	};

	this.isMouseUp = function (button) {
		if (!this.mouse[button]) return false;
		return !this.mouse[button].down;
	};

	this.isMouseClicked = function (button) {
		if (!this.mouse[button]) return false;
		return this.mouse[button].down && this.mouse[button].held <= 1;
	};
};

let Key = function (code, down = false) {
	this.code = code;
	this.down = down;
	this.held = 0;
	
	////////////////////
	this.press = async function () {
		this.down = true;
		this.press_count();
	};

	this.press_count = function () {
		if (!this.down) return;
		this.held++;
		window.requestAnimationFrame(
			() => this.press_count()
		);
	};

	this.unpress = function () {
		this.down = false;
		this.held = 0;
	};
};

let MouseButton = function (button, down = false) {
	this.button = button;
	this.down = down;
	this.held = 0;
	
	////////////////////
	this.press = async function () {
		this.down = true;
		this.press_count();
	};

	this.press_count = function () {
		if (!this.down) return;
		this.held++;
		window.requestAnimationFrame(
			() => this.press_count()
		);
	};

	this.unpress = function () {
		this.down = false;
		this.held = 0;
	};
};