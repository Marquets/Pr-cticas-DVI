En esta práctica se han implementado las siguientes mecánicas:

1) Carga del objeto Quintus

En un primer lugar creamos un objeto Quintus para representar la pantalla principal del juego y activamos
los controles por defecto de teclado y los eventos de touch.

2) Carga del nivel TMX

Cargamos el nivel TMX del material adicional. Luego creamos una escena (level1) y cargamos en ella el mapa.

3) Mario en escena

Creamos un Sprite llamado Mario para representar al jugador. Usamos la hoja desprites llamada mario_small. Añadimos a la escena a Mario con los componentes 2d y platformerControls (necesitarás añadir el módulo 2D). El viewport de la escena lo configuramos para que siga a Mario. 

4) Goomba

Creamos un Sprite Goomba para representar al primero de los enemigos de Mario. Añadimos las colisiones de Mario con los Goomba. 

5) Bloopa

Creamos un Sprite Bloopa para representar otro enemigo. Mario muere
si colisiona lateralmente (o por debajo) con Bloopa pero muere Bloopa si Mario salta encima de él. Este enemigo siempre está saltando en una determinada posición. Juega con la velocidad en la dirección Y y el factor de gravedad de Bloopa para conseguir este comportamiento.

6) Fin de juego al morir

Si Mario muere, es el fin del juego y aparece una ventana con el fin de la partida. Aparece en pantalla el boton“Play Again”  para volver a cargarse la escena de inicio. 

7) Fin de juego al ganar

Creamos un nuevo Sprite llamado Princess para representar la meta del juego. Lo colocamos al final del mapa y si Mario colisiona con la princesa, hemo ganado el juego. 

8) Menú de inicio

Creamos la escena para el menú de inicio. Tras ganar o perder volvemos al menú de inicio.

9) Animaciones

Hemos añadido animaciones para que tanto Mario como los enemigos utilicen las animaciones adecuadas. Para Mario ten en
cuenta que el componente platformerControls da información de la dirección en la que está mirando y que lanza eventos sobre cuando salta y cuando llega al suelo.

10) Monedas

Mario puede recoger monedas a medida que colisiona con ellas en el escenario.
Al cogerlas, la moneda sale hacia arriba y luego desaparece.


