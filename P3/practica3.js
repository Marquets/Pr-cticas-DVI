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
			this.add('2d, platformerControls, animation');
			// Write event handlers to respond hook into behaviors.
			// hit.sprite is called everytime the player collides with a sprite
			/*this.on("hit.sprite",function(collision) {
				// Check the collision, if it's the Tower, you win!
				
			});*/

		},

		step: function(p) {

			//reinicio del nivel
			if(this.p.y > 600){
				Q.stageScene('level1');
			}

			// animación del movimiento

			if(this.p.vx > 0) {
				this.play("run_right");
			} else if(this.p.vx < 0) {				
				this.play("run_left");
			} else {
				this.play("stand_" + this.p.direction);
			}

			//animación del salto

			if (this.p.vy < 0){         //si salto
		    	if (this.p.direction == 'right') {	 //si estoy moviendome a la derecha
				this.play("jump_right");
				}
				if (this.p.direction == 'left') {	 //si estoy moviendome a la izquierda
					this.play("jump_left");
				}
		    }


		}
	});


	Q.animations('mario', {
		run_right: { frames: [3,2,1], rate: 1/6, loop:false}, 
		run_left: { frames: [17,16,15], rate:1/6, loop:false},
		stand_right: { frames: [0] },
		stand_left: { frames: [14] },
		jump_right: { frames: [4], loop: false, rate:1, next: "stand_right" },
		jump_left: { frames: [18], loop: false, rate:1, next: "stand_left" },
		dieM: { frames: [12], rate:1, loop: false, trigger: "deadM" }
	});


	Q.Sprite.extend("Goomba", {
		init: function(p) {
			this._super(p, {
				sheet: "goomba",
				sprite: "goomba",
				frame: 0,
				vx: 75
			});

			this.add('2d, aiBounce, animation');

			this.on("bump.left,bump.right,bump.bottom",function(collision) {
				if(collision.obj.isA("Mario")) {
					Q.stageScene("level1");
					collision.obj.destroy();
				}
			});
			// If the enemy gets hit on the top, destroy it
			// and give the user a "hop"
			this.on("bump.top",function(collision) {
				if(collision.obj.isA("Mario")) {
					this.play("dieG");
					collision.obj.p.vy = -300;
				}
			});

			this.on("goombaD", function() {
				//una vez que termine la animacion del goomba aplastado destruimos al goomba
				this.destroy();
			});

			this.play("move");

		},

		step: function(p) {
			
		} 	
	});

	Q.animations('goomba', {
		move: { frames: [1,0], rate: 1/2}, 
		dieG: { frames: [2], rate:1/2, loop: false, trigger: "goombaD"}
	});

	Q.Sprite.extend("Bloopa", {
		init: function(p) {
			this._super(p, {
				sheet: "bloopa",
				sprite: "bloopa",
				frame: 0,
				vx: 0
			});

			this.add('2d, animation');

			this.on("bump.left,bump.right,bump.bottom",function(collision) {
				if(collision.obj.isA("Mario")) {
					Q.stageScene("level1");
					collision.obj.destroy();
				}
			});
			// If the enemy gets hit on the top, destroy it
			// and give the user a "hop"
			this.on("bump.top",function(collision) {
				if(collision.obj.isA("Mario")) {
					this.play("dieB");
					collision.obj.p.vy = -300;
				}
			});

			this.on("bloopaD",function(collision) {
				this.destroy();
			});

			this.play("move");

		},

		step: function(p) {
			if(this.p.vy == 0){
				this.p.vy = -Math.floor(Math.random() * (800 - 100) + 100);
				//this.play("move");
			}
		}	
	});

	Q.animations('bloopa', {
		move: { frames: [1,0], rate: 1/2}, 
		dieB: { frames: [2], rate:1/2, loop: false, trigger: "bloopaD" }
	});

	Q.scene("level1",function(stage) {
		Q.stageTMX("level.tmx",stage);

		var mario = stage.insert(new Q.Mario({ x: 200, y: 530 })); //añadimos a mario

		var goomba = stage.insert(new Q.Goomba({ x: 1000, y: 300 }));

		var bloopa = stage.insert(new Q.Bloopa({ x: 500, y: 530 }));
		var bloopa = stage.insert(new Q.Bloopa({ x: 400, y: 530 }));
		var bloopa = stage.insert(new Q.Bloopa({ x: 300, y: 530 }));

		stage.add("viewport").follow(mario,{ x: true, y: false }); //seguimos a mario
	 	stage.centerOn(150,380);	
	 	stage.viewport.offsetX=-100;
	});

	Q.loadTMX("level.tmx", function() {  //cargamos el nivel
		Q.stageScene("level1");
	});


	Q.load(["mario_small.png", "mario_small.json", "goomba.png", "goomba.json", "bloopa.png", "bloopa.json"], function() {
		Q.compileSheets("mario_small.png","mario_small.json");   //cargamos los sprites de mario
		Q.compileSheets("goomba.png","goomba.json"); // cargamos los sprite del goomba
		Q.compileSheets("bloopa.png","bloopa.json"); // cargamos los sprite del goomba
    });


};

window.addEventListener("load", game);  // llamamos al juego para empezar