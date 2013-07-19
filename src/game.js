Game = {
    map_grid: {
        width: 100,
        height: 64,
        tile: {
            width: 20,
            height: 20
        }
    },
    
    width: function() {
        return this.map_grid.width * this.map_grid.tile.width;
    },
    height: function() {
        return this.map_grid.height * this.map_grid.tile.height;
    },
    
    start: function() {
        Crafty.init($(document).width() - 20, $(document).height() - 20);
        Crafty.background('green');
		
		Crafty.viewport.mouselook(true);
		
		Crafty.e('Unit').at(5, 5);
        
        for (var x = 0; x < Game.map_grid.width; x++) {
			for (var y = 0; y < Game.map_grid.height; y++) {
				var at_edge = x == 0 || x == Game.map_grid.width - 1 || y == 0 || y == Game.map_grid.height - 1;
				
				if (at_edge) {
					Crafty.e('Block').at(x, y);
				}
			}
		}
    }
}