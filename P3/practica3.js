var game = function() {
	// Set up an instance of the Quintus engine and include
	// the Sprites, Scenes, Input and 2D module. The 2D module
	// includes the `TileLayer` class as well as the `2d` componet.
	var Q = window.Q = Quintus()
		.include("Sprites, Scenes, Input, 2D, Anim, Touch, UI, TMX, Audio")
		// Maximize this game to whatever the size of the browser is
		.setup({width:320, height:480})
		// And turn on default input controls and touch input (for UI)
		.controls().touch()
		.enableSound();




	/* --------------------------------------------------------------------------

								        MARIO

	   -------------------------------------------------------------------------- */
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
			this.add('2d, platformerControls, animation, tween');
			// Write event handlers to respond hook into behaviors.
			// hit.sprite is called everytime the player collides with a sprite
			this.on("hit.sprite",function(collision) {
				
				if(collision.obj.isA("Coin")) {
					collision.obj.trigger("picked");
				}

			});

			this.on("hitMario", "dead");

			// If the enemy gets hit on the top, destroy it
			// and give the user a "hop"
			this.on("bump.bottom",function(collision) {
				if(collision.obj.isA("Goomba")) {
					collision.obj.play("dieG");
					this.p.vy = -300;
					Q.audio.play('squish_enemy.mp3');
				}
				else if(collision.obj.isA("Bloopa")) {
					collision.obj.play("dieB");
					this.p.vy = -300;
					Q.audio.play('squish_enemy.mp3');
				}
			});


			/*this.on("jump", function() {
				Q.audio.play('jump_small.mp3');
			});*/

			this.on("animationM", function() {
				this.animate({ x: (this.p.x), y: (this.p.y - 60) }, 2, Q.Easing.Linear, {callback: this.taked });
			});

			

			
		},

		dead: function(){
			this.trigger("animationM");  // NO FUNCIONA
			this.play("dieM");
			if(Q.state.get("vidas") == 0){
				Q.stage().pause();
				Q.audio.stop();
				Q.audio.play('music_die.mp3');
				Q.stageScene('endGame',1);
			}else{
				Q.state.inc("vidas", -1);
				Q.state.set("monedas", 0);
	   			Q.stageScene('level1');
			}
			
		},

		step: function(p) {

			//reinicio del nivel
			if(this.p.y > 600){
				if(Q.state.get("vidas") == 0){
					Q.stage().pause();
					Q.audio.stop();
					Q.audio.play('music_die.mp3');
					Q.stageScene('endGame',1);
				}else{
					Q.state.inc("vidas", -1);
					Q.state.set("monedas", 0);
		   			Q.stageScene('level1');
				}	
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
		jump_right: { frames: [4], loop: false, rate:1, next: "stand_right", trigger: "jump" },
		jump_left: { frames: [18], loop: false, rate:1, next: "stand_left", trigger: "jump" },
		dieM: { frames: [12], rate:1, loop: false, trigger: "deadM" }
	});


	/* --------------------------------------------------------------------------

								        PRINCESA

	   -------------------------------------------------------------------------- */


	Q.Sprite.extend("Princess",{
	// the init constructor is called on creation
	init: function(p) {

		this._super(p, {
			sheet: "princess",
			//ssprite: "princess",
			//frame: 0,
			//vx: 0					
		});	

		this.add('2d');


		this.on("bump.left,bump.right,bump.bottom",function(collision) {
			if(collision.obj.isA("Mario")) {
				Q.stage().pause();
				Q.audio.stop();
				Q.audio.play('music_level_complete.mp3');
				Q.stageScene('wonGame',1);
				//collision.obj.destroy();
			}
		});

	},

	step: function(p) {
			
	} 	

	});


	/* --------------------------------------------------------------------------

								        ENEMIGOS

	   -------------------------------------------------------------------------- */


	Q.component("defaultEnemy", {
		added: function() {
			// Start the ammo out 1/2 filled
			this.entity.on("bump.left,bump.right,bump.bottom",function(collision) {
				if(collision.obj.isA("Mario")) {
					collision.obj.trigger("hitMario");
				}
			});

			this.entity.play("move");
		},

		extend: {

			dead: function(){
				this.destroy();
			}
		}
	});


    /* ---------------------------- GOOMBA --------------------------------- */

	Q.Sprite.extend("Goomba", {
		init: function(p) {
			this._super(p, {
				sheet: "goomba",
				sprite: "goomba",
				frame: 0,
				vx: 75
			});

			this.add('2d, aiBounce, animation, defaultEnemy');
			this.on("goombaD", "dead");

		},

		step: function(p) {
			
		} 	
	});

	Q.animations('goomba', {
		move: { frames: [1,0], rate: 1/2}, 
		dieG: { frames: [2], rate:1/2, loop: false, trigger: "goombaD"}
	});

	/* ---------------------------- BLOOPA --------------------------------- */

	Q.Sprite.extend("Bloopa", {
		init: function(p) {
			this._super(p, {
				sheet: "bloopa",
				sprite: "bloopa",
				frame: 0,
				vx: 0
			});

			this.add('2d, animation, defaultEnemy');
			this.on("bloopaD", "dead");

		},

		step: function(p) {
			if(this.p.vy == 0){
				this.p.vy = -Math.floor(Math.random() * (800 - 100) + 100);
			}
		}	
	});

	Q.animations('bloopa', {
		move: { frames: [1,0], rate: 1/2}, 
		dieB: { frames: [2], rate:1/2, loop: false, trigger: "bloopaD" }
	});


	/* --------------------------------------------------------------------------

								        MONEDAS

	   -------------------------------------------------------------------------- */


	Q.Sprite.extend("Coin", {
		init: function(p) {
			this._super(p, {
				sheet: "coin",
				sprite: "coin",
				frame: 2,
				gravity: 0
			});

			this.add('2d, animation, tween');

			this.on("picked", "animated");  //cuando Mario coja la moneda saltará este evento

			this.play("shine");				 
		},

		animated: function() {
			this.animate({ x: (this.p.x), y: (this.p.y - 60) }, 2, Q.Easing.Linear, {callback: this.taked }); //una vez animada la moneda llamo a la
		},																												  //función que la eliminará

		taked: function() {
			this.destroy();
			Q.audio.play('coin.mp3');
			Q.state.inc("monedas",1);

		}
	});


	Q.animations('coin', {
		shine: { frames: [2,1,0], rate: 1/3}
	});


	/* --------------------------------------------------------------------------

								        NIVEL

	   -------------------------------------------------------------------------- */


	Q.scene("level1",function(stage) {
		Q.stageTMX("level.tmx",stage);

		Q.audio.stop();
	 	Q.audio.play('music_main.mp3',{ loop: true });


	 	/* -------------------------------------------- Entidades ------------------------------------------------  */

		var mario = stage.insert(new Q.Mario({ x: 230, y: 430 })); //añadimos a mario
		var princess = stage.insert(new Q.Princess({ x: 2000, y: 430 }));

		var goomba = stage.insert(new Q.Goomba({ x: 1000, y: 300 }));

		var bloopa = stage.insert(new Q.Bloopa({ x: 500, y: 530 }));
		var bloopa = stage.insert(new Q.Bloopa({ x: 400, y: 530 }));
		var bloopa = stage.insert(new Q.Bloopa({ x: 300, y: 530 }));

		var coin1 = stage.insert(new Q.Coin({ x: 130, y: 460 }));
		var coin2 = stage.insert(new Q.Coin({ x: 120, y: 460 }));
		var coin3 = stage.insert(new Q.Coin({ x: 110, y: 460 }));
		var coin4 = stage.insert(new Q.Coin({ x: 100, y: 460 }));
		var coin5 = stage.insert(new Q.Coin({ x: 90, y: 460 }));

		/* ----------------------------------- Configuracion de la pantalla --------------------------------------- */


		stage.add("viewport").follow(mario,{ x: true, y: false }); //seguimos a mario
	 	stage.centerOn(150,380);	
	 	stage.viewport.offsetX=-100;
	});

	/* --------------------------------------------------------------------------

								    MENU PRINCIPAL

	   -------------------------------------------------------------------------- */

	Q.scene('mainTitle',function(stage) {
		var container = stage.insert(new Q.UI.Container({
			x: Q.width/2, y: Q.height/2, fill: "rgba(0,0,0,0.5)"
		}));
	
		var button = container.insert(new Q.UI.Button({ x: 0, y: 0,	asset: "mainTitle.png" }));
	
		button.on("click", function(){
			Q.clearStages();
			Q.state.reset({ monedas: 0, vidas: 3 });
			Q.stageScene('level1');
			Q.stageScene("HUD", 2);
		});

		// Expand the container to visibily fit it's contents
		// (with a padding of 20 pixels)
		container.fit(20);
	});

	/* --------------------------------------------------------------------------

								    MENU FINAL

	   -------------------------------------------------------------------------- */

	Q.scene('endGame',function(stage) {
		var container = stage.insert(new Q.UI.Container({
			x: Q.width/2, y: Q.height/2, fill: "rgba(0,0,0,0.5)"
		}));
	
		var button = container.insert(new Q.UI.Button({ x: 0, y: 0, fill: "#CCCCCC",
			label: "Play Again" }));
		var label = container.insert(new Q.UI.Text({ label: "Game Over", x:0 , y: -15 - button.p.h }));
		//var label = container.insert(new Q.UI.Text({x:10, y: -10 - button.p.h,
		//	label: stage.options.label }));
		// When the button is clicked, clear all the stages
		// and restart the game.
		button.on("click", function(){
			Q.clearStages();
			Q.state.reset({  monedas: 0, vidas: 3 });
			Q.stageScene('mainTitle');
			Q.stageScene("HUD", 2);
		});

		// Expand the container to visibily fit it's contents
		// (with a padding of 20 pixels)
		container.fit(20);
	});


	/* --------------------------------------------------------------------------

								    MENU VICTORIA

	   -------------------------------------------------------------------------- */

	Q.scene('wonGame',function(stage) {
	
		var container = stage.insert(new Q.UI.Container({
			x: Q.width/2, y: Q.height/2, fill: "rgba(0,0,0,0.5)"
		}));
		var button = container.insert(new Q.UI.Button({ x: 0, y: 0, fill: "#CCCCCC",
			label: "Play Again" }));
		var label = container.insert(new Q.UI.Text({ label: "You won!", x:0 , y: -15 - button.p.h }));
		//var label = container.insert(new Q.UI.Text({x:10, y: -10 - button.p.h,
		//	label: stage.options.label }));
		// When the button is clicked, clear all the stages
		// and restart the game.

		button.on("click", function(){
			Q.clearStages();
			Q.state.reset({ monedas: 0, vidas: 3 });
			Q.stageScene('mainTitle');
			Q.stageScene("HUD", 2);
		});

		// Expand the container to visibily fit it's contents
		// (with a padding of 20 pixels)
		container.fit(20);
	});


	/* --------------------------------------------------------------------------

								       HUD

	   -------------------------------------------------------------------------- */


	Q.scene("HUD",function(stage) {

		Q.UI.Text.extend("Monedas",{ 
	        init: function(p) {
	            this._super({
	                label: "Monedas: 0",
	                color: "black",
	                x: 80,
	                y: 0
	            });

	            Q.state.on("change.monedas",this,"incMonedas");
	        },

	        incMonedas: function(monedas) {
	            this.p.label = "Monedas: " + monedas;
	        }
		});

		Q.UI.Text.extend("Vidas",{ 
	        init: function(p) {
	            this._super({
	                label: "Vidas: 3",
	                color: "black",
	                x: 60,
	                y: 30
	            });

	            Q.state.on("change.vidas",this,"incVidas");
	        },

	        incVidas: function(vidas) {
	            this.p.label = "Vidas: " + vidas;
	        }
		});

	    var container = stage.insert(new Q.UI.Container({
	        x: 0, y: 0, fill: "rgba(0,0,0,0.5)"
	    }));

	    container.insert(new Q.Monedas());
	    container.insert(new Q.Vidas());

	});


	/* --------------------------------------------------------------------------

								    CARGA DEL NIVEL, 
								    DE LAS IMAGENES Y
								     DE LOS SONIDOS

	   -------------------------------------------------------------------------- */


	Q.loadTMX("level.tmx", function() {  //cargamos el nivel
		//Q.stageScene("level1");
		Q.stageScene("mainTitle");
	});


	Q.load(["mario_small.png", "mario_small.json", "goomba.png", "goomba.json", "bloopa.png", "bloopa.json", "princess.png", "coin.png", "coin.json", "mainTitle.png"], function() {
		Q.compileSheets("mario_small.png","mario_small.json");   //cargamos los sprites de mario
		Q.compileSheets("goomba.png","goomba.json"); // cargamos los sprites del goomba
		Q.compileSheets("bloopa.png","bloopa.json"); // cargamos los sprites del bloopa
		Q.compileSheets("coin.png","coin.json"); //cargamos los sprites de la moneda
		Q.sheet("princess","princess.png", { tilew: 30, tileh: 45 });
		Q.sheet("mainTitle","mainTitle.png");
	});

    Q.load(["music_die.mp3", "music_main.mp3", "jump_small.mp3", "squish_enemy.mp3", "coin.mp3", "music_level_complete.mp3"]);


};

window.addEventListener("load", game);  // llamamos al juego para empezar