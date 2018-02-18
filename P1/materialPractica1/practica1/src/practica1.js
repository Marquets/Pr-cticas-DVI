/**
 * MemoryGame es la clase que representa nuestro juego. Contiene un array con la cartas del juego,
 * el número de cartas encontradas (para saber cuándo hemos terminado el juego) y un texto con el mensaje
 * que indica en qué estado se encuentra el juego
 */
var MemoryGame = MemoryGame || {};


/**
 * Constructora de MemoryGame
 */
MemoryGame = function(gs) {
	this.array_cartas = new Array();
	this.num_cartas = 0;
	this.mensaje = "Memory Game";
	this.sergrafico = gs;
	this.initGame(){
		var carta;
		var cartas_insert = 0;
		var array_aux = new Array();
		var sprites = ["8-ball", "potato", "dinosaur", "kronos","rocket","unicorn","guy","zeppelin"];
		var ball,potato,dinosaur,kronos,rocket,unicorn,guy,zeppelin = 0;
		while(cartas_insert < 15){
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
				if  ("kronos" < 2) {
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
			loop();
			/*if (this.array_cartas.includes(new MemoryGameCard(sprites[random])) {
				new
			}*/


		}
	}
	this.draw() {

	}
	this.loop() {

	}
	this.onClick() {

	}
}

};



/**
 * Constructora de las cartas del juego. Recibe como parámetro el nombre del sprite que representa la carta.
 * Dos cartas serán iguales si tienen el mismo sprite.
 * La carta puede guardar la posición que ocupa dentro del tablero para luego poder dibujarse
 * @param {string} id Nombre del sprite que representa la carta
 */
MemoryGameCard = function(id) {


};
