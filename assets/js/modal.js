function loadDetailPokemon (pokemon){
    const newHtml = `
                      <div class="pokemonDetailHeader">
                        <img src="${pokemon.image}" class="${pokemon.type}" alt="Bulbasaur">
                        <button id="closeDetailPokemon">✖</button>
                      </div>

                      <div id="pokemonDetailName"><p>${pokemon.name}</p></div>

                      <div id="pokemonDetailLine"></div>

                      <div class="pokemonDetailBody">
                        <p class="title">Weight</p>
                        <p class="description">${pokemon.weight}</p>
                        <p class="title">Height</p>
                        <p class="description">${pokemon.height}</p>
                        <p class="title">Skills</p>
                        <p class="description">${pokemon.skills.join(', ')}</p>
                      </div>
                    `;
    modal.innerHTML = newHtml;
}

let pokemons = [];

const overlay = document.getElementById('modalOverlay');
const closeDetailPokemon = document.getElementById('closeDetailPokemon');

pokeApi.getPokemons().then((pokemonsDetails) => {
  pokemons = pokemonsDetails; // Todos os pokemons carregados ficam aqui
});

pokemonList.addEventListener("click", (event) => {
  const clickedPokemon = event.target.closest('.openDetailPokemon');

  if(clickedPokemon){
    overlay.style.display = 'flex';
  }
  
  const pokemonNumber = clickedPokemon.getAttribute("data-number");

  const pokemonDetail = pokemons.find(p => p.number == pokemonNumber);

  loadDetailPokemon(pokemonDetail);
  
  overlay.addEventListener("click", (event) => {
    if(event.target === overlay)
      overlay.style.display = 'none';
  })
})

closeDetailPokemon.addEventListener("click", (event) => {
  const clickedCloseDetail = event.target.closest('.closeDetailPokemon');
  if(clickedCloseDetail){
    overlay.style.display = 'none';
  }
})