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
        Crafty.init($(document).width() - 50, $(document).height() - 50);
        Crafty.background('green');
		
		Crafty.scene('Game');
    }
}

var Entities = [];

this.deselect = function(E) {
	if (E.length > 1) {
		for (var i = 0; i < E.length; i++) {
			E[i].selected = false;
		}
	}
}