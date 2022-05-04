const pokemonList = document.querySelector<HTMLUListElement>("ul");

const pokeAPIURL = "https://pokeapi.co/api/v2/pokemon?offset=151&limit=50";


type Pokemon = {
  name: string;
  url: string;
};

type PokemonObject = {
  name: string;
  sprites: {
    front_shiny: string;
  };
  id: number;
};

type ParsedResponse = 
{
    results: [];
}

fetch(pokeAPIURL)
  .then(parseJSON)
  .then(pokemonFetcher)
  .then((pokemon) => {
    hideSpinner()
    pokemon.forEach((pokemon: PokemonObject) => {
      createPokemonListing(pokemon);
    });
  }).catch(error => {
    console.error(error.message)
})


function pokemonFetcher (parsedResponse: ParsedResponse){
    const urls = parsedResponse.results.map((pokemon: Pokemon) => pokemon.url);
    const fetches = urls.map((url: string) => fetch(url).then(parseJSON));
    return Promise.all(fetches)
}

function createPokemonListing(pokemon: PokemonObject) {
  const pokemonOption = document.createElement("li");
  pokemonOption.classList.add("pokemon-listing");
  pokemonOption.innerHTML = `
        <figure>
            <img src = "${pokemon.sprites.front_shiny}" alt = "${pokemon.name}"/>
                <figcaption>
                    <a href="pokemon.html?pokemon=${
                      pokemon.id
                    }">${capitalizeFirstLetter(pokemon.name)}<a/>
                </figcaption>
        </figure>

`;
  if (pokemonList) {
    pokemonList.append(pokemonOption);
  }
  return pokemonList;
}

function hideSpinner(){
    const spinner = document.querySelector(".spinner");
      if (spinner) {
        spinner.classList.add("hidden");
      }
}

export function parseJSON(response: Response) {
  return response.json();
}

export function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
