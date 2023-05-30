// function convertPokemonTypesToLi(pokemonTypes){
  //     return pokemonTypes.map((typeSlot) =>`<li class="type"> ${typeSlot.type.name}</li>` )
  // }
const pokemonList = document.getElementById("pokemonList"); //pegando a lista de pokemon
const loadMoreButton = document.getElementById('loadMoreButton'); //
const maxRange =  151

const limit = 10
let offset = 0

// 1, 2, 3, 4, 5                0-5
// 6 , 7, 8, 9, 10             5-5
// 11,                           10-5

function convertPokemonToLi(pokemon) {
  return `
        <li class="pokemon  ${pokemon.type}">
        <span class="number"> # ${pokemon.number}</span>
        <span class="name"> ${pokemon.name}</span>

        <div class="detail">
            <ol class="types">
            ${pokemon.types.map((type) => `<li class="type ${type}"> ${type} </li>`).join("")}
              
            </ol>

            <img src="${pokemon.photo}"
                alt="${pokemon.name}" />
        </div>
    </li>
    `
}



function loadPokemonItens(offset, limit){
  pokeApi.getPokemons(offset, limit)
  .then((pokemons = []) => {
          const newList =    pokemons.map((pokemon) => {
            return convertPokemonToLi(pokemon);
    })
    const newHtml = newList.join(" " )
    pokemonList.innerHTML += newHtml
})
}


loadMoreButton.addEventListener("click", ()=> {
  offset += limit

  const qtdRegisterNextPage = offset + limit

  if(qtdRegisterNextPage >= maxRange){
    const newlimit =  maxRange - offset
    loadPokemonItens(offset, newlimit)
    loadMoreButton.parentElement.removeChild(loadMoreButton)
 } else{ 
   loadPokemonItens(offset, limit)
 }
})

loadPokemonItens(offset, limit)
// como manipular promisses
// como manipular lista de objetos 
// como tranformar lista de objetos em outro tipo
// como concatenar esses objetos 
// manipulação de html
// manipular array, elementos, objetos
// Manipulação de multiplas requisições em paralelo 
