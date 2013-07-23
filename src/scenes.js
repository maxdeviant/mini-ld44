Crafty.scene('Game', function() {
	Crafty.viewport.mouselook(true);
	
	// Generate world
	for (var x = 0; x < Game.map_grid.width; x++) {
		for (var y = 0; y < Game.map_grid.height; y++) {
			var at_edge = x == 0 || x == Game.map_grid.width - 1 || y == 0 || y == Game.map_grid.height - 1;
			
			Crafty.e('Grass').at(x, y);
			
			if (at_edge) {
				Crafty.e('Block').at(x, y);
			}
		}
	}
	
	Entities.push(Crafty.e('Unit').at(5, 5));
	Entities.push(Crafty.e('Unit').at(10, 10));
	Entities.push(Crafty.e('Structure').at(20, 20));
});

Crafty.scene('Loading', function() {
	Crafty.load(['assets/terrain.png', 'assets/units.png', 'assets/structures.png'], function() {
		Crafty.sprite(32, 'assets/terrain.png', {
			spr_grass: [0, 0]
		});
		
		Crafty.sprite(32, 'assets/units.png', {
			spr_unit: [0, 0]
		}, 0, 2);

		Crafty.scene('Game');
	});
});