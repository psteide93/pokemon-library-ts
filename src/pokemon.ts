const queryString = window.location.search
const queryParams = new URLSearchParams(queryString)
const pokemonID: string | null = queryParams.get("pokemon")
const pokemon = document.querySelector(".pokemon")
const abilitiesContainer = document.querySelector(".ability-container")
import { capitalizeFirstLetter } from "./index"

type PokemonInfo = {
  name: string;
  sprites: {
    front_shiny: string;
  };
  abilities: []
}

type AbilityObject = {
  ability: {
    url: string;
  };
}



type FlavorText = {
  flavor_text: string;
  language: {
    name: string;
  };
}



fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonID}`)
  .then((response: Response) => response.json())
  .then((pokemonInfo: PokemonInfo) => {
    const pokemonDetails = document.createElement("div")
    pokemonDetails.classList.add("pokemon-details")
    pokemonDetails.innerHTML = `
    <figure>
      <img src="${pokemonInfo.sprites.front_shiny}" alt = "${pokemonInfo.name}" />
      <figcaption>${capitalizeFirstLetter(pokemonInfo.name)} </figcaption>
    </figure>`
    const spinner = document.querySelector(".spinner")
    if (spinner) {
      spinner.classList.add("hidden")
    }
    if (pokemon) {
      pokemon.append(pokemonDetails)
    }


    const abilityList = document.createElement("ul")
    abilityList.classList.add("abilities")
    pokemonInfo.abilities.forEach((abilityObject: AbilityObject) => {
      fetch(abilityObject.ability.url)
        .then(response => response.json())
        .then(abilityInfo => {
          const abilityText = abilityInfo.flavor_text_entries.find((flavor_text_entry: FlavorText) => flavor_text_entry.language.name = "en")
          const abilityListItem = document.createElement("li")
          abilityListItem.innerHTML = `
            <span class="ability-name">${capitalizeFirstLetter(abilityInfo.name)}</span>
            <span class"abiity-short-description">${abilityText.flavor_text}</span>
          `
          abilityList.append(abilityListItem)
        })

    })

    if (abilitiesContainer) {
      abilitiesContainer.append(abilityList)
    }


  })




