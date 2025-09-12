const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton');

const modal = document.getElementById('modal');

const darkModeButton = document.getElementById('btnDarkMode');
const body = document.body;

const maxRecords = 151;

function loadPokemonItens(offset, limit){
    
    pokeApi.getPokemons(offset, limit).then((pokemons = []) =>{
        const newHtml = pokemons.map((pokemon) => `
            <li class="pokemon ${pokemon.type} openDetailPokemon" data-number="${pokemon.number}">
                    <span class="number">#${pokemon.number}</span>
                    <span class="name">${pokemon.name}</span>

                    <div class="detail">
                        <ol class="types">
                           ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                        </ol>
                            
                        <img src="${pokemon.image}" 
                        alt="${pokemon.name}">
                    </div>      
            </li>
                `).join('');

        pokemonList.innerHTML += newHtml;
    })
}

loadPokemonItens(offset, limit);

loadMoreButton.addEventListener('click', () => {
    offset += limit;

    const qtdRecords = offset + limit;

    if(qtdRecords >= maxRecords){
        const newLimit = maxRecords - offset;
        loadPokemonItens(offset, newLimit);

        loadMoreButton.parentElement.removeChild(loadMoreButton);
    }
    else
        loadPokemonItens(offset, limit);
})

const openMenuBtn = document.getElementById("openMenuBtn");
const sideBar = document.getElementById("sidebar");
const closeMenuBtn = document.getElementById("closeMenuBtn");

openMenuBtn.addEventListener("click", () => {
  sideBar.classList.add("active");
});

closeMenuBtn.addEventListener("click", () => {
  sideBar.classList.remove("active");
});

document.addEventListener("click", (event) => {
  if (
    sideBar.classList.contains("active") &&
    !sideBar.contains(event.target) &&
    event.target !== openMenuBtn                
  ) {
    sideBar.classList.remove("active");
  }
});

darkModeButton.addEventListener("click", () => {
  body.classList.toggle('darkMode');

  if(body.classList.contains('darkMode'))
    darkModeButton.innerText = '☀︎';
  else
    darkModeButton.innerText = '⏾';
})