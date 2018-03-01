/**
 * MemoryGame es la clase que representa nuestro juego. Contiene un array con la cartas del juego,
 * el número de cartas encontradas (para saber cuándo hemos terminado el juego) y un texto con el mensaje
 * que indica en qué estado se encuentra el juego
 */
var MemoryGame = MemoryGame || {};


/**
 * Constructora de MemoryGameç

 */

MemoryGame = function(gs) {
	this.array_cartas = new Array();
	this.num_cartas = 0;
	this.mensaje = "Memory Game";
	this.sergrafico = gs;

	this.carta_a_comparar= null;
	this.parejas_found = 0;

	this.initGame = function(){
		var carta;
		var cartas_insert = 0;
		var array_aux = new Array();
		var sprites = ["8-ball", "potato", "dinosaur", "kronos","rocket","unicorn","guy","zeppelin"];
		var ball = 0;
		var potato = 0;
		var dinosaur = 0;
		var kronos = 0;
		var rocket = 0;
		var unicorn = 0;
		var guy = 0;
		var zeppelin = 0;
		while(cartas_insert < 16){

			var random = Math.floor(Math.random()*8);
			switch (sprites[random]) {
				case "8-ball" :
				if (ball < 2) {
					 carta = new MemoryGameCard("8-ball");
					 this.array_cartas[cartas_insert] = carta;
					 ball++;
					 cartas_insert++;
				}
				break;
				case "potato" :
				if (potato < 2) {
					 carta = new MemoryGameCard("potato");
					 this.array_cartas[cartas_insert] = carta;
					 potato++;
					 cartas_insert++;
					 
				}
				break;
				case "dinosaur" :
				if (dinosaur < 2) {
					 carta = new MemoryGameCard("dinosaur");
					 this.array_cartas[cartas_insert] = carta;
					 dinosaur++;
					 cartas_insert++;
				}
				break;
				case "kronos" :
				if  ( kronos < 2) {
					 carta = new MemoryGameCard("kronos");
					 this.array_cartas[cartas_insert] = carta;
					 kronos++;
					 cartas_insert++;
					 
				}
				break;
				case "rocket" :
				if (rocket < 2) {
					 carta = new MemoryGameCard("rocket");
					 this.array_cartas[cartas_insert] = carta;
					 rocket++;
					 cartas_insert++;
					 
				}
				break;
				case "unicorn" :
				if (unicorn < 2) {
					 carta = new MemoryGameCard("unicorn");
					 this.array_cartas[cartas_insert] = carta;
					 unicorn++;
					 cartas_insert++;
				}
				break;
				case "guy" :
				if (guy < 2) {
					 carta = new MemoryGameCard("guy");
					 this.array_cartas[cartas_insert] = carta;
					 guy++;
					 cartas_insert++;
					
				}
				break;
				case "zeppelin" :

				if (zeppelin < 2) {
					 carta = new MemoryGameCard("zeppelin");
					 this.array_cartas[cartas_insert] = carta;
					 zeppelin++; 
					 cartas_insert++;
				}
				break;
				default:
			}
			
			//if (this.array_cartas.includes(new MemoryGameCard(sprites[random])) {
			//	new
			//} 

			
		}
	this.loop();
	}



	this.draw = function(){
		this.sergrafico.drawMessage(this.mensaje);
		for (var i = this.array_cartas.length - 1; i >= 0; i--) {
			//CustomGraphicServer.draw(this.array_cartas[i], i);
			this.array_cartas[i].draw(this.sergrafico,i);
		}


	}
	this.loop = function() {
		//while(1) {
			var that = this;
			setInterval(function (){    // se puede hacer tambien: setInterval(this.draw.bind(this),16)
				that.draw();
			},16);
		//}
	}
	this.onClick = function(cardId) {

		var that = this;
		if(this.array_cartas[cardId].estado == 0){
			this.array_cartas[cardId].flip();

			if(this.carta_a_comparar === null){
				this.carta_a_comparar = this.array_cartas[cardId];
			}else{
				if(this.carta_a_comparar.compareTo(that.array_cartas[cardId])){
						this.carta_a_comparar.found();        //por lo que las doy la vuelta a las dos
						this.array_cartas[cardId].found();
						this.carta_a_comparar = null;
						this.parejas_found++;
						
						if(this.parejas_found < 8){
							this.mensaje = "Match found!!";
						}else{
							this.mensaje = "You win!!";
						}
					}else{

						this.mensaje = "Try again";
						setTimeout(function(){
							that.carta_a_comparar.flip();        //por lo que las doy la vuelta a las dos
							that.array_cartas[cardId].flip();
							that.carta_a_comparar = null;
							
						},1000);
					}
			}
		}		
	}
}




/**
 * Constructora de las cartas del juego. Recibe como parámetro el nombre del sprite que representa la carta.
 * Dos cartas serán iguales si tienen el mismo sprite.
 * La carta puede guardar la posición que ocupa dentro del tablero para luego poder dibujarse
 * @param {string} id Nombre del sprite que representa la carta
 */
MemoryGameCard = function(id) {
	this.nombre = id;
	this.estado = 0;  //0 -> boca abajo | 1 -> boca arriba | 2 -> encomntrada
	this.flip = function(){
		if(this.estado == 1){ //si está boca arriba la pongo boca abajo
			this.estado = 0;
		}else{
			this.estado = 1; //sino, la pongo boca arriba pues estaba boca abajo
		}
	}
	this.found = function(){
		this.estado = 2;
	}

	this.compareTo = function(otherCard){
		if(this.nombre == otherCard.nombre){
			return true;
		}else{
			return false;
		}
	}

	this.draw = function(gs, pos){
		
		if(this.estado == 1 || this.estado == 2){
			gs.draw(this.nombre, pos);
		}else if(this.estado == 0){
			gs.draw("back", pos);
		}
	}
}
