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
		var carta = this.array_cartas[cardId];
		setInterval(function(){
			carta.flip();
		},1000);
		
		var length = this.array_cartas.length();

		var i = 0;
		var found = false;

		while(i < cardId && !found) {  //desde la carta 0 hasta la carta que he seleccionado
			if(this.array_cartas[i].estado == 1){ //si la carta está boca arriba
				if(carta.compareTo(this.array_cartas[i])){ //si tienen el mismo nombre
					carta.found();                  //se han encontrado las cartas
					this.array_cartas[i].found();
				}else{								//sino, es que no son iguales
					setInterval(function(){
						carta.flip();  
						this.array_cartas[i].flip();        
					},1000);		        //por lo que las doy la vuelta a las dos
					
				}

				found = true;
			}
			i++;
		}

		i = cardId + 1; 

		//si ya se encontró una carta previamente(found = true), no entrará en el while -> solo puede haber dos cartas boca arriba, la seleccionada y la anterior
		while(i < length && !found) {  //desde la siguiente carta a carId hasta la carta que he seleccionado
			if(this.array_cartas[i].estado == 1){ //si la carta está boca arriba
				if(carta.compareTo(this.array_cartas[i])){ //si tienen el mismo nombre
					carta.found();                  //se han encontrado las cartas
					this.array_cartas[i].found();
				}else{	
					setInterval(function(){							//sino, es que no son iguales
					carta.flip();                  //por lo que las doy la vuelta a las dos
					this.array_cartas[i].flip();
					},1000);
				}

				found = true;
			}
			i++;
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
		var that = this;
		if(that.estado == 1){ //si está boca arriba la pongo boca abajo
			that.estado = 0;
		}else{
			that.estado = 1; //sino, la pongo boca arriba pues estaba boca abajo
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
		var that = this;

		if(that.estado == 1){
			gs.draw(that.nombre, pos);
		}else if(that.estado == 0){
			gs.draw("back", pos);
		}
	}
}
