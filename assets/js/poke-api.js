// Um objeto que teremos as funções de manipulação da pokeapi

const pokeApi=  {}
    function convertPokeApiDetailToPokemonMode(pokeDetail){
        const pokemon = new Pokemon()
        pokemon.number =pokeDetail.id
        pokemon.name =pokeDetail.name

        const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
        
        const [type] = types
        
        pokemon.types = types
        pokemon.type = type
        
        pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

        return pokemon
    }
pokeApi.getPokemonDetail = (pokemon) => {
     return fetch(pokemon.url )
            .then((response) => response.json()) 
            .then(convertPokeApiDetailToPokemonMode)
}

pokeApi.getPokemons = (offset= 0, limit=5) =>{
  
        const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

                return fetch(url) // requisição http me devolve uma promise de response
                        .then((response) => response.json()) // assim que a promisse for resolvida converte para json e me da uma promise de any
                        .then((jsonBody) => jsonBody.results) // vou pegar dentro do jason a lista

                        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail)) // transformando a lista de cima em lista de promessas pela url pegando os detalhes
                        .then((detailRequests) => Promise.all(detailRequests))
                        .then((pokemonsDetails) => pokemonsDetails)
    }
     
// lista de novas requisições e utilizar seus resultados
