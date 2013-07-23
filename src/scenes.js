Crafty.scene('Game', function() {
	Crafty.viewport.mouselook(true);
	
	var Entities = [];
		
	Entities.push(Crafty.e('Unit').at(5, 5));
	Entities.push(Crafty.e('Unit').color('orange').at(10, 10));
	
	for (var i = 0; i < Entities.length; i++) {
		if (Entities[i].selected === true) {
			
		}
	}
	
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