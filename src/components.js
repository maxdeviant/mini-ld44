Crafty.c('Grid', {
	init: function() {
		this.attr({
			w: Game.map_grid.tile.width,
			h: Game.map_grid.tile.height
		});
	},
	at: function(x, y) {
		if (x === undefined && y === undefined) {
			return {
				x: this.x / Game.map_grid.tile.width,
				y: this.y / Game.map_grid.tile.height
			}
		} else {
			this.attr({
				x: x * Game.map_grid.tile.width,
				y: y * Game.map_grid.tile.height
			});
			
			return this;
		}
	}
});

Crafty.c('Actor', {
	init: function() {
		this.requires('2D, Canvas, Grid');
		this.attr({
			//selected: false
			x: 32,
			y: 32
		});
	},
});

Crafty.c('Block', {
	init: function() {
		this.requires('Actor, Color, Solid');
		this.color('black');
	},
});

Crafty.c('Grass', {
	init: function() {
		this.requires('Actor, spr_grass');
	}
});

Crafty.c('Unit', {
	init: function() {
		this.requires('Actor, Fourway, Color, Collision, MoveTo, spr_unit, SpriteAnimation')
			.addComponent('Mouse')
			//.fourway(4) // Takes in speed as a param
			.animate('UnitMovingUp', 1, 0, 2)
			.animate('UnitMovingRight', 3, 0, 2)
			.animate('UnitMovingDown', 0, 0, 2)
			.animate('UnitMovingLeft', 2, 0, 2)
			.stopOnSolids()
			.selectable();
		
		var animation_speed = 8;
		this.bind('NewDirection', function(data) {
			if (data.x > 0) {
				this.animate('UnitMovingRight', animation_speed, -1)
			} else if (data.x < 0) {
				this.animate('UnitMovingLeft', animation_speed, -1)
			} else if (data.y > 0) {
				this.animate('UnitMovingDown', animation_speed, -1)
			} else if (data.y < 0) {
				this.animate('UnitMovingUp', animation_speed, -1)
			} else {
				this.stop();
			}
		});
	},
	// Stop movement upon collision with a solid entity
	stopOnSolids: function() {
		this.onHit('Solid', this.stopMovement);
		
		return this;
	},
	stopMovement: function() {
		this._speed = 0;
		if (this._movement) {
			this.x -= this._movement.x;
			this.y -= this._movement.y;
		}
	},
	selectable: function() {
		this.bind('Click', function() {
			deselect(Entities);
			this.selected = true;
		});
	},
});

Crafty.c('Structure', {
	init: function() {
		this.requires('Actor, Color, Collision, Solid')
		.addComponent('Mouse')
		.color('blue')
		.selectable();
		this.attr({
			w: 128,
			h: 64
		});
	},
	selectable: function() {
		this.bind('Click', function() {
			deselect(Entities);
			this.selected = true;
		});
	},
});

// MoveTo by Sren Bramer Schmidt (http://github.com/sorenbs/MoveTo)
// Modified ever so slighty to fit my needs
Crafty.c('MoveTo', {
	_speed: 4,

	_onmousedown: function (e) {
		if (this.disregardMouseInput) {
			return;
		}
		if (this.selected && e.mouseButton == Crafty.mouseButtons.RIGHT) {
			// clear any existing EnterFrame handlers
			this._stopMoving();
	
			this._target = { x: e.realX, y: e.realY };
			this.bind("EnterFrame", this._enterFrame);
		} else if (e.mouseButton == Crafty.mouseButtons.LEFT) {
			deselect(Entities);
		}
	},

	_stopMoving: function () {
		this._target = undefined;
		this.unbind("EnterFrame", this._enterFrame);
	},

	_enterFrame: function () {
		if (this.disableControls || !this._target) {
			return;
		}

		// target (almost) reached - jump the last part.
		// We could be more fancy (circular check instead of square), but don't want to pay the sqrt penalty each frame.
		if (Math.abs(this._target.x - this.x) < this._speed && Math.abs(this._target.y - this.y) < this._speed) {
			var prev_pos = {
				x: this.x,
				y: this.y
			};
			
			this.x = this._target.x;
			this.y = this._target.y;

			this._stopMoving();

			this.trigger('Moved', prev_pos);
			this.trigger('NewDirection', { x: 0, y: 0 });
			return;
		};

		// Pixels to move are calculated from location and target every frame to handle the case when something else (IE, collision detection logic) changes our position.
		// Some cleaver optimization could probably eliminate the sqrt cost...
		var dx = this._target.x - this.x, dy = this._target.y - this.y, oldX = this.x, oldY = this.y,
		movX = (dx * this._speed) / (Math.sqrt(dx * dx + dy * dy)),
		movY = (dy * this._speed) / (Math.sqrt(dx * dx + dy * dy));

		// Triggered when direction changes - either because of a mouse click, or something external
		if (Math.abs(movX - this.oldDirection.x) > 0.1 || Math.abs(movY - this.oldDirection.y) > 0.1) {
			this.trigger("NewDirection", { x: movX, y: movY })
		}
		this.oldDirection = { x: movX, y: movY };

		// Moved triggered twice to allow for better collision logic (like moving along diagonal walls)
		this.x += movX;
		this.trigger('Moved', { x: oldX, y: this.y });
		this.y += movY;
		this.trigger('Moved', { x: this.x, y: oldY });
	},

	moveTo: function (speed) {
		this._speed = speed;
		return this;
	},

	init: function () {
		this.requires("Mouse");
		this.oldDirection = { x: 0, y: 0 }

		Crafty.addEvent(this, Crafty.stage.elem, "mousedown", this._onmousedown);
	}
});