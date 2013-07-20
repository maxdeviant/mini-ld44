Crafty.scene('Game', function() {
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
});

Crafty.scene('Loading', function() {
	
});