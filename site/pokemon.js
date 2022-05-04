"use strict";
const queryString = window.location.search;
const queryParams = new URLSearchParams(queryString);
const pokemonID = queryParams.get("pokemon");
const pokemon = document.querySelector(".pokemon");
fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonID}`)
    .then((response) => response.json())
    .then((pokemonInfo) => {
    const pokemonDetails = document.createElement("div");
    pokemonDetails.classList.add("pokemon.details");
    pokemonDetails.innerHTML = `
    <figure>
      <img src="${pokemonInfo.sprites.front_shiny}" alt = "${pokemonInfo.name}" />
      <figcaption>${pokemonInfo.name} </figcaption>
    </figure>`;
    const spinner = document.querySelector(".spinner");
    if (spinner) {
        spinner.classList.add("hidden");
    }
    if (pokemon) {
        pokemon.append(pokemonDetails);
    }
    const abilityList = document.createElement("ul");
    abilityList.classList.add("abilities");
    pokemonInfo.abilities.forEach((abilityObject) => {
        fetch(abilityObject.ability.url)
            .then(response => response.json())
            .then(abilityInfo => {
            console.log(abilityInfo);
            const abilityListItem = document.createElement("li");
            abilityListItem.innerHTML = `
            <span class="ability-name">${abilityInfo.name}</span>
            <span class"abiity-short-description">${2 + 2}</span>
          `;
        });
    });
});
