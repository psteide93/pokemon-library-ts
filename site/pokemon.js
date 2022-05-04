"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const queryString = window.location.search;
const queryParams = new URLSearchParams(queryString);
const pokemonID = queryParams.get("pokemon");
const pokemon = document.querySelector(".pokemon");
const abilitiesContainer = document.querySelector(".ability-container");
const index_1 = require("./index");
fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonID}`)
    .then((response) => response.json())
    .then((pokemonInfo) => {
    const pokemonDetails = document.createElement("div");
    pokemonDetails.classList.add("pokemon-details");
    pokemonDetails.innerHTML = `
    <figure>
      <img src="${pokemonInfo.sprites.front_shiny}" alt = "${pokemonInfo.name}" />
      <figcaption>${(0, index_1.capitalizeFirstLetter)(pokemonInfo.name)} </figcaption>
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
            const abilityText = abilityInfo.flavor_text_entries.find((flavor_text_entry) => flavor_text_entry.language.name = "en");
            const abilityListItem = document.createElement("li");
            abilityListItem.innerHTML = `
            <span class="ability-name">${(0, index_1.capitalizeFirstLetter)(abilityInfo.name)}</span>
            <span class"abiity-short-description">${abilityText.flavor_text}</span>
          `;
            abilityList.append(abilityListItem);
        });
    });
    if (abilitiesContainer) {
        abilitiesContainer.append(abilityList);
    }
});
