Crafty.c('Grid', {
	init: function() {
		this.attr({
			w: Game.map_grid.tile.width,
			h: Game.map_grid.tile.height
		})
	},
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

Crafty.c('Block', {
	init: function() {
		this.requires('2D, Canvas, Grid, Color');
		this.color('black');
	},
});