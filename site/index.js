"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.capitalizeFirstLetter = exports.parseJSON = void 0;
const pokemonList = document.querySelector("ul");
const pokeAPIURL = "https://pokeapi.co/api/v2/pokemon?offset=151&limit=50";
fetch(pokeAPIURL)
    .then(parseJSON)
    .then(pokemonFetcher)
    .then((pokemon) => {
    hideSpinner();
    pokemon.forEach((pokemon) => {
        createPokemonListing(pokemon);
    });
}).catch(error => {
    console.error(error.message);
});
function pokemonFetcher(parsedResponse) {
    const urls = parsedResponse.results.map((pokemon) => pokemon.url);
    const fetches = urls.map((url) => fetch(url).then(parseJSON));
    return Promise.all(fetches);
}
function createPokemonListing(pokemon) {
    const pokemonOption = document.createElement("li");
    pokemonOption.classList.add("pokemon-listing");
    pokemonOption.innerHTML = `
        <figure>
            <img src = "${pokemon.sprites.front_shiny}" alt = "${pokemon.name}"/>
                <figcaption>
                    <a href="pokemon.html?pokemon=${pokemon.id}">${capitalizeFirstLetter(pokemon.name)}<a/>
                </figcaption>
        </figure>

`;
    if (pokemonList) {
        pokemonList.append(pokemonOption);
    }
    return pokemonList;
}
function hideSpinner() {
    const spinner = document.querySelector(".spinner");
    if (spinner) {
        spinner.classList.add("hidden");
    }
}
function parseJSON(response) {
    return response.json();
}
exports.parseJSON = parseJSON;
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
exports.capitalizeFirstLetter = capitalizeFirstLetter;
