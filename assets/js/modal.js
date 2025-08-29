function loadDetailPokemon (pokemon){
    console.log(pokemon);

    const newHtml = `
                      <div class="pokemonDetailHeader">
                        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg" alt="Bulbasaur">
                        <button id="closeDetailPokemon">✖</button>
                      </div>

                      <div id="pokemonDetailName"><p >Bulbasaur</p></div>

                      <div id="pokemonDetailLine"></div>

                      <div class="pokemonDetailBody">
                        <p class="title">Weight</p>
                        <p class="description">6</p>
                        <p class="title">Height</p>
                        <p class="description">7.92</p>
                        <p class="title">Skills</p>
                        <p class="description">Overgrow, Chlorophyl</p>
                      </div>
                    `;
    modal.innerHTML = newHtml;
}

let pokemons = [];



const overlay = document.getElementById('modalOverlay');

pokeApi.getPokemons().then((pokemonsDetails) => {
  pokemons = pokemonsDetails; // todos os pokemons carregados ficam aqui
});

pokemonList.addEventListener("click", (event) => {
  const clickedPokemon = event.target.closest('.openDetailPokemon');

  if(clickedPokemon){
    overlay.style.display = 'flex';
  }
  
  const pokemonNumber = clickedPokemon.getAttribute("data-number");

  const pokemonDetail = pokemons.find(p => p.number == pokemonNumber);

  console.log(pokemonNumber);
  loadDetailPokemon(pokemonDetail);
  
  
  
  overlay.addEventListener("click", (event) => {
    if(event.target === overlay)
      overlay.style.display = 'none';
  })
})

const closeDetailPokemon = document.getElementById('closeDetailPokemon');

closeDetailPokemon.addEventListener("click", (event) => {
  const clickedCloseDetail = event.target.closest('.closeDetailPokemon');
  if(clickedCloseDetail){
    overlay.style.display = 'none';
  }
})