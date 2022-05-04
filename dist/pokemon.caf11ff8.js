Object.defineProperty({}, "__esModule", { value: !0 });
const e = window.location.search,
  n = new URLSearchParams(e).get("pokemon"),
  t = document.querySelector(".pokemon");
var i = {};
Object.defineProperty(i, "__esModule", { value: !0 }),
  (i.capitalizeFirstLetter = void 0);
const a = document.querySelector("ul");
fetch("https://pokeapi.co/api/v2/pokemon?offset=151&limit=50")
  .then((e) => e.json())
  .then((e) => {
    const n = e.results
      .map((e) => e.url)
      .map((e) => fetch(e).then((e) => e.json()));
    return Promise.all(n);
  })
  .then((e) => {
    console.log(e),
      e.forEach((e) => {
        const n = document.createElement("div");
        n.classList.add("pokemon-listing"),
          (n.innerHTML = `\n            <figure>\n                <img src = "${e.sprites.front_shiny}" alt = "${e.name}"/>\n                <figcaption><a href="pokemon.html?pokemon=${e.id}">${e.name}<a/></figcaption>\n            </figure>\n\n    `);
        const t = document.querySelector(".spinner");
        t && t.classList.add("hidden"), a && a.append(n);
      });
  }),
  (i.capitalizeFirstLetter = function (e) {
    return e.charAt(0).toUpperCase() + e.slice(1);
  }),
  fetch(`https://pokeapi.co/api/v2/pokemon/${n}`)
    .then((e) => e.json())
    .then((e) => {
      const n = document.createElement("div");
      n.classList.add("pokemon.details"),
        (n.innerHTML = `\n    <figure>\n      <img src="${
          e.sprites.front_shiny
        }" alt = "${e.name}" />\n      <figcaption>${(0,
        i.capitalizeFirstLetter)(e.name)} </figcaption>\n    </figure>`);
      const a = document.querySelector(".spinner");
      a && a.classList.add("hidden"), t && t.append(n);
      const o = document.createElement("ul");
      o.classList.add("abilities"),
        e.abilities.forEach((e) => {
          fetch(e.ability.url)
            .then((e) => e.json())
            .then((e) => {
              console.log(e);
              const n = e.flavor_text_entries.find(
                  (e) => (e.language.name = "en")
                ),
                t = document.createElement("li");
              (t.innerHTML = `\n            <span class="ability-name">${(0,
              i.capitalizeFirstLetter)(
                e.name
              )}</span>\n            <span class"abiity-short-description">${
                n.flavor_text
              }</span>\n          `),
                o.append(t);
            });
        }),
        abilitiesContainer && abilitiesContainer.append(o);
    });
//# sourceMappingURL=pokemon.caf11ff8.js.map
