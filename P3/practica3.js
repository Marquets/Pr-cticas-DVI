var game = function() {
	// Set up an instance of the Quintus engine and include
	// the Sprites, Scenes, Input and 2D module. The 2D module
	// includes the `TileLayer` class as well as the `2d` componet.
	var Q = window.Q = Quintus()
		.include("Sprites, Scenes, Input, 2D, Anim, Touch, UI, TMX")
		// Maximize this game to whatever the size of the browser is
		.setup({width:320, height:480})
		// And turn on default input controls and touch input (for UI)
		.controls().touch();
		//.enableSound();




	// ## Player Sprite
	// The very basic player sprite, this is just a normal sprite
	// using the player sprite sheet with default controls added to it.
	Q.Sprite.extend("Mario",{
		// the init constructor is called on creation
		init: function(p) {
			// You can call the parent's constructor with this._super(..)
			this._super(p, {
				sheet: "marioR",
				sprite: "mario",
				frame: 0,					//inicializamos a mario
				dead: false,
				win: false
			});	

			// Add in pre-made components to get up and running quickly
			// The `2d` component adds in default 2d collision detection
			// and kinetics (velocity, gravity)
			// The `platformerControls` makes the player controllable by the
			// default input actions (left, right to move, up or action to jump)
			// It also checks to make sure the player is on a horizontal surface before
			// letting them jump.
			this.add('2d, platformerControls');
			// Write event handlers to respond hook into behaviors.
			// hit.sprite is called everytime the player collides with a sprite
			this.on("hit.sprite",function(collision) {
			// Check the collision, if it's the Tower, you win!
				
			});
		}
	});


	Q.scene("level1",function(stage) {
		Q.stageTMX("level.tmx",stage);

		var mario = stage.insert(new Q.Mario({ x: 150, y: 380 })); //añadimos a mario

		stage.add("viewport").follow(mario,{ x: true, y: false }); //seguimos a mario
	 	stage.centerOn(150,380);	
	 	stage.viewport.offsetX=-100;
	});

	Q.loadTMX("level.tmx", function() {  //cargamos el nivel
		Q.stageScene("level1");
	});


	Q.load(["mario_small.png", "mario_small.json"], function() {
		Q.compileSheets("mario_small.png","mario_small.json");   //cargamos los sprites de mario
    });


};

window.addEventListener("load", game);  // llamamos al juego para empezar