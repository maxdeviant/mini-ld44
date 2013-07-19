Crafty.c('Grid', {
	init: function() {
		this.attr({
			w: Game.map_grid.tile.width,
			h: Game.map_grid.tile.height
		})
	},
	//
	at: function(x, y) {
		if (x === undefined && y === undefined) {
			return {
				x: this.x / Game.map_grid.tile.width,
				y: y * this.y / Game.map_grid.tile.height
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
	},
});

Crafty.c('Block', {
	init: function() {
		this.requires('Actor, Color, Solid');
		this.color('black');
	},
});

Crafty.c('Unit', {
	init: function() {
		this.requires('Actor, Fourway, Color, Collision')
			.fourway(4) // Takes in speed as a param
			.color('red')
			.stopOnSolids();
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
	}
});