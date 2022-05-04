"use strict";
const pokemonList = document.querySelector("ul");
const pokeAPIURL = "https://pokeapi.co/api/v2/pokemon?offset=151&limit=50";
fetch(pokeAPIURL)
    .then(response => response.json())
    .then(parsedResponse => {
    const urls = parsedResponse.results.map((pokemon) => pokemon.url);
    const fetches = urls.map((url) => fetch(url).then(response => response.json()));
    return Promise.all(fetches);
}).then(pokemon => {
    console.log(pokemon);
    pokemon.forEach((pokemon) => {
        const pokemonOption = document.createElement("div");
        pokemonOption.classList.add("pokemon-listing");
        pokemonOption.innerHTML = `
            <figure>
                <img src = "${pokemon.sprites.front_shiny}" alt = "${pokemon.name}"/>
                <figcaption><a href="pokemon.html?pokemon=${pokemon.id}">${pokemon.name}<a/></figcaption>
            </figure>

    `;
        if (pokemonList) {
            pokemonList.append(pokemonOption);
        }
    });
});
