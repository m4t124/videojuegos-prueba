# Videojuegos UGPS

Esta es una aplicación web que permite explorar y buscar videojuegos utilizando la API de RAWG. Los usuarios pueden ver
una lista de videojuegos, filtrados por género, plataforma, año, etc. Además, pueden acceder a detalles específicos de
cada videojuegos, como imágenes, traílers, logros y DLCs.

## Características

-Lista de videojuegos: Muestra una lista de videojuegos ordenados por puntuación de mayor a menor basado en Metacritic.

-Filtros avanzados: Permite filtrar videojuegos por género, plataforma, año, desarrolador y tags.

-Búsqueda: Permite buscar videojuegos por su nombre.

-Detalles del videojuego: Muestra información detallada de cada juego, incluyendo:
    -Imágenes.
    -Tráiler.
    -Logros.
    -DLCs.

Cabe mencionar que la API RAWG solo muestra el trailer del videojuego "Grand Theft Auto V" y "Rise of the Tomb Raider", los
cuales funcionan correctamente.

## Tecnologías utilizadas

-React: Biblioteca de JavaScript para construir la interfaz de usuario.

-React Router: Para manejar la navegación entre páginas. Esto permite navegar a traves de la aplicación, por ejemplo, al
ver los detalles de un videojuego, se puede seleccionar un DLC y se redigira a los detalles del DLC.

-RAWG API: API utilizada para obtener datos sobre videojuegos.

-Tailwind CSS: Para estilizar la aplicación. Elegi esta tecnología ya que permite crear
interfaces modernas y responsivas de manera rápida y eficiente.

## Instalación

Sigue estos pasos para instalar y ejecutar el proyecto en tu máquina local:

1. Clona el reposito:

### `git clone https://github.com/tu-usuario/tu-repositorio.git`

2. Navega al directorio del proyecto:

### `cd tu-repositorio`

3. Instala las dependecias:

### `npm install`

4. Crea un archivo .env en la raíz del proyecto y agrega tu clave de API RAWG:

Para utilizar la API, tienes que crearte una cuenta en RAWG y solicitar la API KEY [API RAWG](https://rawg.io/apidocs)

### `REACT_APP_RAWG_API_KEY=tu_clave_api_aqui`

5. Inicia la aplicación:

### `npm start`

6. Abre tu navegador y visita [http://localhost:3000](http://localhost:3000) para ver la aplicación en funcionamiento.

# Estructura del proyecto

src/ <br>
├── components/ <br>
│ ├── Filtros.js <br>
│ ├── GameCard.js  <br>
│ └── SearchBar.js  <br>
├── pages/ <br>
│ ├── GameDetalle.js  <br>
│ └── Home.js  <br>
├── services/ <br>
│ └── api.js  <br>
├── styles/ <br>
│ ├── GameCard.css  <br>
│ ├── GameDetalle.css  <br>
│ └── Home.css  <br>
├── App.js  <br>
└── index.js  <br>

## Notas

-Sobre el tema de los tráilers quise ocupar la API de Youtube para poder visualizarlos, me funciono pero
tuve problemas al dia siguiente ya que Google me bloqueba la API, asi que volvi a la tradicional.

-El videojuego "Soulcalibur (1998)" no contaba con imagen al iniciar el codigo, asi que añadi
manualmente la foto del videojuego en GameCard.js

# Autor

Matías Nicolas Morales Vergara
