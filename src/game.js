Game = {
    map_grid: {
        width: 64,
        height: 32,
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
        Crafty.init(Game.width(), Game.height());
        Crafty.background('green');
		
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