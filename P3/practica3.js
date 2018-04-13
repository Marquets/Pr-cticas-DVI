var game = function() {
	// Set up an instance of the Quintus engine and include
	// the Sprites, Scenes, Input and 2D module. The 2D module
	// includes the `TileLayer` class as well as the `2d` componet.
	var Q = window.Q = Quintus()
		.include("Sprites, Scenes, Input, 2D, Anim, Touch, UI")
		// Maximize this game to whatever the size of the browser is
		.setup({width:320, height:480})
		// And turn on default input controls and touch input (for UI)
		.controls().touch()
		.enableSound();

		
	Q.loadTMX("level.tmx", function() {
	 	Q.stageScene("startGame");
	});


	Q.scene("level1",function(stage) {
	 	Q.stageTMX("level.tmx",stage);

	 	//var mario = stage.insert(new Q.Mario({ x: 150, y: 380 }));

	 	stage.add("viewport");
	 	stage.centerOn(150,380);	
	 	//stage.viewport.offsetX=-100;			 
	});

};