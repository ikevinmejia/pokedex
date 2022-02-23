// 1.  Seleccionar los elementos del html

/* const pokeCard = document.querySelector('[data-poke-card]');
const pokeName = document.querySelector('[data-poke-name]');
const pokeImg = document.querySelector('[data-poke-img]');
const pokeImgContainer = document.querySelector('[data-poke-img-container]');
const pokeID = document.querySelector('[data-poke-id');
const pokeTypes = document.querySelector('[data-poke-types]');
const pokeStats = document.querySelector('[data-poke-stats]'); */

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


// 2. Creando la functión de buscar pokemon

const pokemonContainer = document.querySelector('.pokemon-container');
const spinner = document.querySelector('#spinner');
const previous = document.querySelector('#previous');
const next = document.querySelector('#next');

let offset = 1;
let limit = 8;

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

function fetchPokemon(id) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
        .then(response => response.json())
        .then(data => {
            createPokemon(data);
            // console.log(data);
            spinner.style.display = "none";
        });
}

function fetchPokemons(offset, limit) {
    spinner.style.display = "block";
    for (let i = offset; i <= offset + limit; i++){
        fetchPokemon(i);
    }
}

function createPokemon(pokemon) {
    const flipCard = document.createElement('div');
    flipCard.classList.add('flip-card');

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

    searchPokemon(pokemon.name);
}

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

function removeChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

fetchPokemons(offset, limit)

function searchPokemon(pokemonName) {
    const input =  document.querySelector('.inputSearch').value.toString();
    const button = document.querySelector('.searchButton');

    const accion = () => {
        const pokemonFound = pokemonName.find(input);

        const pokemonFoundContainer = document.createElement('div');

        pokemonFoundContainer.innerText = pokemonFound;

    }
    button.addEventListener("click", accion);
}








