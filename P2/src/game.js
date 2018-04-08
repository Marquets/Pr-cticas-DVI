var sprites = {
 camarero: { sx: 513, sy: 0, w: 54, h: 64, frames: 1 },
 cliente: { sx: 513, sy: 67, w: 31, h: 35, frames: 1 },
 cliente1: { sx: 513, sy: 67, w: 31, h: 35, frames: 1 },
 cliente2: { sx: 513, sy: 67, w: 31, h: 35, frames: 1 },
 cliente3: { sx: 513, sy: 67, w: 31, h: 35, frames: 1 },
 empty_beer: { sx: 510, sy: 140, w: 26, h: 25, frames: 1 },
 beer: { sx: 513, sy: 103, w: 22, h: 28, frames: 1 },
 fondo: {sx: 0, sy: 479, w: 514, h: 481, frames: 1 }
};


var OBJECT_PLAYER = 1,
    OBJECT_PLAYER_PROJECTILE = 2,
    OBJECT_ENEMY = 4,
    OBJECT_ENEMY_PROJECTILE = 8,
    OBJECT_POWERUP = 16,
    OBJECT_BEER = 32,
    OBJECT_CLIENTE = 64,
    OBJECT_DEADZONE = 128;

var startGame = function() {
  var ua = navigator.userAgent.toLowerCase();

  // Only 1 row of stars
  /*if(ua.match(/android/)) {
    Game.setBoard(0,new Starfield(50,0.6,100,true));
  } else {
    Game.setBoard(0,new Starfield(20,0.4,100,true));
    Game.setBoard(1,new Starfield(50,0.6,100));
    Game.setBoard(2,new Starfield(100,1.0,50));
  }  */
  Game.setBoard(3,new TitleScreen("Tapper Root Beer", 
                                  "Press space to start playing",
                                  playGame));
};


var Pair = function(a,b) {
  this.x = a;
  this.y = b;
}



var pos_player_x = [325, 357, 389, 421];
var pos_player_y = [90, 185, 281, 377];

var pos_cliente_x = [111, 79, 47, 15];
var pos_cliente_y = [80, 175, 271, 367];


function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function generateRandomArray(min, max){
    var random = [];
    for(var i = 0;i<max ; i++){
        var temp = Math.floor(Math.random()*(max - min) + min);
        if(random.indexOf(temp) == -1){
            random.push(temp);
        }
        else
         i--;
    }
    return random;
}

var playGame = function() {
  var board = new GameBoard();
  board.add(new Fondo);
  board.add(new Player);
  board.add(new DeadZone(340,62,5,50));      //deadzone de la mesa superior derecha(donde se dibuja el cliente)  x: +15 de la pos del player, y: -28 de la pos del player
  board.add(new DeadZone(105,62,5,50));  //  deadzone de la mesa superior izquierda(donde se dibuja el cliente)  x: -6 de la pos del cliente, y: igual que en la derecha
  board.add(new DeadZone(372,157,5,50));      //deadzone de la mesa superior derecha(donde se dibuja el cliente)  x: +15 de la pos del player, y: -28 de la pos del player
  board.add(new DeadZone(73,157,5,50));  //  deadzone de la mesa superior izquierda(donde se dibuja el cliente)  x: -6 de la pos del cliente, y: igual que en la derecha
  board.add(new DeadZone(404,253,5,50));      //deadzone de la mesa superior derecha(donde se dibuja el cliente)  x: +15 de la pos del player, y: -28 de la pos del player
  board.add(new DeadZone(41,253,5,50));  //  deadzone de la mesa superior izquierda(donde se dibuja el cliente)  x: -6 de la pos del cliente, y: igual que en la derecha
  board.add(new DeadZone(436,349,5,50));      //deadzone de la mesa superior derecha(donde se dibuja el cliente)  x: +15 de la pos del player, y: -28 de la pos del player
  board.add(new DeadZone(9,349,5,50));  //  deadzone de la mesa superior izquierda(donde se dibuja el cliente)  x: -6 de la pos del cliente, y: igual que en la derecha
  board.add(new drawPuntos());
  var random = generateRandomArray(0, 4);
  var contClientes = 0;
  var pos = 0;

  for(var i = 0; i < 4; i++){
    pos = random[i];
    var numClientes =  getRandomArbitrary(1, 5);
    var velocidad =  getRandomArbitrary(30, 75);
    board.add(new Spawner(new Cliente(pos_cliente_x[pos],pos_cliente_y[pos],velocidad),3,6,i+3));
  }
  
  GameManager.startGameManager(12);
  Game.setBoard(3,board);
  
};

// ----------------------------------------- BACKGROUND ----------------------------------------------

var Fondo = function(){
  this.setup("fondo");
  this.x = 0;
  this.y = 0; 
};

Fondo.prototype = new Sprite();

Fondo.prototype.step = function(dt) {
}


// ----------------------------------------- PLAYER ----------------------------------------------

var Player = function(){
  this.setup("camarero", {reloadTime: 0.2, reloadTimeBeer: 0.4});
  this.x = 325;
  this.y = 90;
  this.reload = this.reloadTime;
  this.reloadBeer = this.reloadTimeBeer;
  this.step = function(dt) {
    
    this.reload-=dt;
    this.reloadBeer-=dt;
    if(this.reload < 0) {
      this.reload = this.reloadTime;
      if(Game.keys['abajo']) {

        if(this.posArray < 3){
          this.posArray++;
          this.x =  pos_player_x[this.posArray];
          this.y =  pos_player_y[this.posArray];
        }else{
          this.posArray = 0;
          this.x =  pos_player_x[this.posArray];
          this.y =  pos_player_y[this.posArray];
        }

      }
      else if(Game.keys['arriba']) {

        if(this.posArray > 0){
          this.posArray--;
          this.x =  pos_player_x[this.posArray];
          this.y =  pos_player_y[this.posArray];
        }else{
          this.posArray = 3;
          this.x =  pos_player_x[this.posArray];
          this.y =  pos_player_y[this.posArray];
        }
      }         
      else if(Game.keys['espacio'] && this.reloadBeer < 0) {  //&& this.reloadBeer < 0)
         this.reloadBeer = this.reloadTimeBeer;

         this.board.add(new Beer(this.x - 10,this.y + 8));
      }   
      
    }

  };
};
    
Player.prototype = new Sprite();
Player.prototype.type = OBJECT_PLAYER;


/*------------------------ PUNTOS ---------------------------------*/

var Puntos = new function(){
  this.puntos = 0;

  this.setScore = function(puntos){
    this.puntos += puntos;
  }

  this.resetScore = function(){
    this.puntos = 0;
  }

};


var drawPuntos = function(){
  this.draw = function(ctx){
    ctx.font = "20px";
    ctx.fillStyle = "white";
    ctx.fillText("Puntuación: " + Puntos.puntos.toString(),30,25);
  };
};

drawPuntos.prototype = new Sprite();
drawPuntos.prototype.step = function(dt)  {  
};

// ----------------------------------------- DEAD ZONE ----------------------------------------------

var DeadZone = function(x, y, w, h){

  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;


  this.draw = function(ctx){
    //ctx.fillStyle = "lightblue";
    //ctx.fillRect(this.x, this.y, this.w, this.h);
    
  };

};
DeadZone.prototype = new Sprite();
DeadZone.prototype.type = OBJECT_DEADZONE;

DeadZone.prototype.step = function(dt)  {
     
};

// ----------------------------------------- GLASS ----------------------------------------------

var Glass = function(x,y){
 this.setup('empty_beer',{ vx: -70});
  this.x = x;
  this.y = y;

};
Glass.prototype = new Sprite();

Glass.prototype.step = function(dt)  {
  this.x -= this.vx * dt;

  var collision = this.board.collide(this,OBJECT_DEADZONE);
  var collisionP = this.board.collide(this,OBJECT_PLAYER);

  if(collisionP) {
    this.board.remove(this);
    GameManager.restaJarrasVacias();
    GameManager.checkWin();
        
  }
  else if(collision) {
    this.board.remove(this);
    GameManager.loose();
        
  }

 
};

// ----------------------------------------- BEER ----------------------------------------------

var Beer = function(x,y){
 this.setup('beer',{ vx: -70, reloadBeer: 0, reloadTimeBeer: 0.75});
  this.x = x;
  this.y = y;

};
Beer.prototype = new Sprite();
Beer.prototype.type = OBJECT_BEER;

Beer.prototype.step = function(dt)  {
  this.x += this.vx * dt;
  var collision = this.board.collide(this,OBJECT_CLIENTE);
  if(collision) {
    //collision.hit(this.damage);
    collision.hit();
    this.board.remove(this);
    this.board.add(new Glass(this.x, this.y));
    GameManager.aumentarJarrasVacias();
    
  }

  var collision2 = this.board.collide(this,OBJECT_DEADZONE);
  if(collision2) {
    this.board.remove(this);    
    GameManager.loose();
  }
   
};

// ----------------------------------------- CLIENTE ----------------------------------------------

var Cliente = function(x,y,z){
 this.setup('cliente',{ vx: z});
  this.x = x;
  this.y = y;

};
Cliente.prototype = new Sprite();
Cliente.prototype.type = OBJECT_CLIENTE;

Cliente.prototype.step = function(dt)  {
  this.x += this.vx * dt;

  var collision2 = this.board.collide(this,OBJECT_DEADZONE);   //si funciona
  if(collision2) {
    //collision.hit(this.damage);
    this.board.remove(this);
    GameManager.loose();
  }
   
};

Cliente.prototype.hit = function(dt)  {
    GameManager.restarClientes();
    this.board.remove(this);

};



/*--------------------SPAWNER-----------------------*/
// lógica para crear clientes en una determinada barra del bar



var Spawner = function(cliente,numClientes,frecuencia,delay) {

  this.instancia = cliente;
  this.num = numClientes;
  this.freqTime = frecuencia;
  this.delay = delay;
  
  
};


Spawner.prototype.draw = function(ctx) {}

Spawner.prototype.step = function(dt)  {

    this.delay -= dt;
   
    if (this.delay <= 0 && this.num > 0) {
      client = Object.create(this.instancia);

        this.board.add(client);
        
      this.delay = this.freqTime;
      if (this.delay <= 0) {
        client = Object.create(this.instancia);

        this.board.add(client);
        this.delay = this.freqTime;
        
      }
      this.num--;

    }

}



/*------------------------ GAME MANAGER ---------------------------------*/

var GameManager = new function(){
    this.numJarrasVacias = 0;
    this.totalClientes = 0;
    
    this.startGameManager = function(numClientes) {
      this.totalClientes = numClientes;
    }

    this.aumentarJarrasVacias = function(){
      this.numJarrasVacias++;
      Puntos.setScore(50);
    };

    this.checkWin = function(){
      if(this.numJarrasVacias == 0 && this.totalClientes == 0){
        winGame();
      }
    }

    this.restaJarrasVacias = function(){
       this.numJarrasVacias--;
      
       Puntos.setScore(100);
    };

    this.loose = function(){
      loseGame();
    }
    this.restarClientes = function(){
      this.totalClientes--;
    };
   
  
    this.reset = function() {
      this.totalClientes = 0;
      this.numJarrasVacias = 0;
      Puntos.resetScore();
    }
  };

// ----------------------------------------------------------------------------------------

var winGame = function() {
    Game.setBoard(3,new TitleScreen("You win!", 
                    "Puntuación: " + Puntos.puntos.toString() + ", Press space to play again",
                                  playGame));
    Puntos.resetScore();
};

var loseGame = function() {

  Game.setBoard(3,new TitleScreen("You lose!", 
                    "Puntuación: " + Puntos.puntos.toLocaleString() + ", Press space to play again",
                                  playGame));
  Puntos.resetScore();
};

window.addEventListener("load", function() {
  Game.initialize("game",sprites,startGame);
});
