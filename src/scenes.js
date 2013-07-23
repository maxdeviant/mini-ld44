Crafty.scene('Game', function() {
	Crafty.viewport.mouselook(true);
	
	Entities.push(Crafty.e('Unit').at(5, 5));
	Entities.push(Crafty.e('Unit').color('orange').at(10, 10));
	Entities.push(Crafty.e('Structure').at(20, 20));
	
	// Generate world
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