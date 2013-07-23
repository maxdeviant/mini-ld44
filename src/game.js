Game = {
    map_grid: {
        width: 100,
        height: 64,
        tile: {
            width: 32,
            height: 32
        }
    },
    
    width: function() {
        return this.map_grid.width * this.map_grid.tile.width;
    },
    height: function() {
        return this.map_grid.height * this.map_grid.tile.height;
    },
    
    start: function() {
        Crafty.init($(document).width() - 50, $(document).height() - 50);
        Crafty.background('green');
		
		Crafty.scene('Loading');
    }
}

// Holds all entities currently in the game
var Entities = [];

// Deselects all entities
this.deselect = function(E) {
	if (E.length > 1) {
		for (var i = 0; i < E.length; i++) {
			E[i].selected = false;
		}
	}
}