// diccionario del color de cada tipo de pokemon
const typesColors = {
    electric: '#FFEA70',
    normal: '#B09398',
    fire: '#FF675C',
    water: '#0596C7',
    ice: '#AFEAFD',
    rock: '#999799',
    flying: '#7AE7C7',
    grass: '#4A9681',
    psychic: '#FFC6D9',
    ghost: '#561D25',
    bug: '#A2FAA3',
    poison: '#795663',
    ground: '#D2B074',
    dragon: '#DA627D',
    steel: '#1D8A99',
    fighting: '#2F2F2F',
    default: '#2A1A1F',
};

// Seleccionando elementos HTML

const pokemonContainer = document.querySelector('.pokemon-container');
const spinner = document.querySelector('#spinner');
const previous = document.querySelector('#previous');
const next = document.querySelector('#next');

// valores de inicio y limite para validación del número de tarjetas que se muestran en el DOM

let offset = 1;
let limit = 8;

// Creando eventos para adelantar y retroceder

previous.addEventListener('click', () => {
    if (offset != 1) {
        offset -= 9;
        removeChildNodes(pokemonContainer);
        fetchPokemons(offset, limit);
    }
});

next.addEventListener('click', () =>{
    offset += 9;
    removeChildNodes(pokemonContainer);
    fetchPokemons(offset, limit);
});

// Conexión al API

function fetchPokemon(id) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
    .then(response => response.json())
    .then(data => {
        createPokemon(data);
        // console.log(data);
        spinner.style.display = "none";
    });
}

// función para mostrar 9 tarjetas en pantalla

function fetchPokemons(offset, limit) {
    spinner.style.display = "block";
    for (let i = offset; i <= offset + limit; i++){
        fetchPokemon(i);
    }
}

//  Creando la functión de crear pokemon

function createPokemon(pokemon) {
    // creación de la flipcard
    const flipCard = document.createElement('div');
    flipCard.classList.add('flip-card');

    // creación del card container (card y flipcard)

    const cardContainer = document.createElement('div');
    cardContainer.classList.add('card-container');

    flipCard.append(cardContainer);

    // Creación de una card (div) con la clase 'pokemon-block'
    const card = document.createElement('div');
    card.classList.add('pokemon-block');

    // Creación del contenedor de la imagen con la clase 'img-container'
    const spriteContainer = document.createElement('div');
    spriteContainer.classList.add('img-container');

    // Creación del elemento imagen añadiendo la propiedad 'src' en ruta de obtener la imagen del API
    const sprite = document.createElement('img');
    sprite.classList.add = "sprite";

    // imagenes en pixel art
    // sprite.src = pokemon.sprites.front_default;

    sprite.src = pokemon.sprites.other.home.front_default;
    sprite.style.width = "100px"

    // Al contendor de la imagen se le agrega la imagen: div > img
    spriteContainer.appendChild(sprite);

    // Creación de un elemento parrafo para agregar el número del Pokemon, este es seteado a un String con la función toString() y a su vez se añade un número de 3 cifras; es decir, si se obtiene el id de Bulbasor aparecerá asi: 001.
    const number = document.createElement('p');
    number.textContent = `#${pokemon.id.toString().padStart(3,0)}`;

    // Creación de un elemento parrafo que contiene el nombre del pokemon, se le agrega la clase 'name' y a su vez se obtiene este dato desde el API
    const name = document.createElement('p');
    name.classList.add('name');
    name.textContent = pokemon.name;

    /* types(pokemon.types); */

    // Con el siguiente bloque de codigo se generan los tipos y se colorean según su indicación
    const typesContainer = document.createElement('div');
    typesContainer.classList.add('types-container');

    for (let i = 0; i < pokemon.types.length; i++) {
        const element = pokemon.types[i];

        const type = document.createElement('p');
        type.textContent = element.type.name;
        type.style.color = typesColors[element.type.name];
        typesContainer.append(type);
    }

    // se agrega al contenedor card como hijos el contenedor de la imagen, el numero y nombre.
    card.append(spriteContainer, number, name, typesContainer);

    const cardBack = document.createElement('div');
    cardBack.classList.add('pokemon-block-back');

    cardBack.append(progressBars(pokemon.stats));

    cardContainer.append(card, cardBack)

    // al elemento pokemon container se le agrega el contenedor flipcard
    pokemonContainer.append(flipCard);

    searchPokemon(pokemon);
}

// creación de la barra de progreso e la flip card o stats

function progressBars(stats) {
    const statsContainer = document.createElement("div");
    statsContainer.classList.add("stats-container");

  for (let i = 0; i < 4; i++) {
    const stat = stats[i];

    const statPercent = stat.base_stat / 2 + "%";
    const statContainer = document.createElement("stat-container");
    statContainer.classList.add("stat-container");

    const statName = document.createElement("p");
    statName.textContent = stat.stat.name;

    const progress = document.createElement("div");
    progress.classList.add("progress");

    const progressBar = document.createElement("div");
    progressBar.classList.add("progress-bar");
    progressBar.setAttribute("aria-valuenow", stat.base_stat);
    progressBar.setAttribute("aria-valuemin", 0);
    progressBar.setAttribute("aria-valuemax", 200);
    progressBar.style.width = statPercent;

    progressBar.textContent = stat.base_stat;

    progress.appendChild(progressBar);
    statContainer.appendChild(statName);
    statContainer.appendChild(progress);

    statsContainer.appendChild(statContainer);
  }

  return statsContainer;
}

// función para quitar de pantalla las anteriores cards

function removeChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

// invocación de la función para mostrar 9 cards

fetchPokemons(offset, limit)

// ------ función del problema -------
// 1. Se supone que debe recibir el input
// 2. Este se pasa como argumento al array de objetos para buscar el nombre del pokemon ingresado
// 3. Guardarlo en la variable "pokemonFound"
// 4. Para posteriormente añadirlo al DOM solo mostrando el nombre en una card. (Aun no doy estilos.)

/* function searchPokemon(pokemonName) {
    const input =  document.querySelector('.inputSearch').value.toString();
    const button = document.querySelector('.searchButton');
    const pokemonFoundContainer = document.createElement('div');
    const newPokemon = document.createElement('p');

    const accion = () => {
        const pokemonFound = pokemonName.find(function (params) {
            return params.name === input
        });
        pokemonFoundContainer.append(newPokemon);

        newPokemon.innerText = pokemonFound;

    }
    button.addEventListener("click", accion);
} */

function searchPokemon() {
	const input = document.querySelector('.inputSearch')
	const button = document.querySelector('.searchButton')

	const accion = () => {
		fetchPokemon(input.value)
		// console.log(input.value)
		// const pokemonFound = pokemonName.find(input)
		// const pokemonFoundContainer = document.createElement('div')

		// pokemonFoundContainer.innerText = pokemonFound
	}
	button.addEventListener('click', accion)
}

