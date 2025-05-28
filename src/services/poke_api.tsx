interface PokemonListResponse {
  count: number
  next: string | null
  previous: string | null
  results: {
    name: string
    url: string
  }[]
}

interface PokemonDetails {
  name: string
  image: string
  types: string[]
  id: number
}

// Cache para armazenar a lista completa de Pokémons (apenas nomes e URLs)
let pokemonListCache: { name: string; url: string; id: number }[] = []

/**
 * Busca a lista completa de Pokémons (apenas nomes e URLs) - faz isso apenas uma vez
 */
export async function fetchPokemonList(): Promise<
  { name: string; url: string; id: number }[]
> {
  // Se já temos a lista em cache, retorna ela
  if (pokemonListCache.length > 0) {
    return pokemonListCache
  }

  try {
    // Busca todos os Pokémons disponíveis (apenas nomes e URLs)
    const response = await fetch(
      "https://pokeapi.co/api/v2/pokemon?limit=100000"
    )
    const data: PokemonListResponse = await response.json()

    // Extrai o ID da URL e armazena no cache
    pokemonListCache = data.results.map((pokemon) => {
      const id = parseInt(pokemon.url.split("/").slice(-2, -1)[0])
      return {
        name: pokemon.name,
        url: pokemon.url,
        id: id,
      }
    })

    return pokemonListCache
  } catch (error) {
    console.error("Erro ao buscar lista de Pokémons:", error)
    throw error
  }
}

/**
 * Busca detalhes específicos de um Pokémon
 */
export async function fetchPokemonDetails(
  url: string
): Promise<PokemonDetails> {
  try {
    const response = await fetch(url)
    const data = await response.json()

    return {
      name: data.name,
      image: data.sprites.other["official-artwork"].front_default,
      types: data.types.map(
        (type: { type: { name: string } }) => type.type.name
      ),
      id: data.id,
    }
  } catch (error) {
    console.error(`Erro ao buscar detalhes do Pokémon: ${url}`, error)
    throw error
  }
}

/**
 * Busca uma página de Pokémons com detalhes completos
 * @param page - Número da página (começando em 1)
 * @param limit - Quantidade de Pokémons por página
 */
export async function fetchPokemonPage(
  page: number = 1,
  limit: number = 21
): Promise<{
  pokemons: PokemonDetails[]
  totalCount: number
  hasMore: boolean
  currentPage: number
}> {
  try {
    // Primeiro, garante que temos a lista completa
    const pokemonList = await fetchPokemonList()

    // Calcula os índices para a paginação
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit

    // Pega apenas os Pokémons da página atual
    const pokemonsForPage = pokemonList.slice(startIndex, endIndex)

    // Busca os detalhes de cada Pokémon da página atual
    const pokemonDetailsPromises = pokemonsForPage.map((pokemon) =>
      fetchPokemonDetails(pokemon.url)
    )

    // Executa todas as requisições em paralelo
    const pokemons = await Promise.all(pokemonDetailsPromises)

    return {
      pokemons,
      totalCount: pokemonList.length,
      hasMore: endIndex < pokemonList.length,
      currentPage: page,
    }
  } catch (error) {
    console.error("Erro ao buscar página de Pokémons:", error)
    throw error
  }
}

/**
 * Busca Pokémons por nome (para funcionalidade de busca)
 */
export async function searchPokemonByName(
  searchTerm: string
): Promise<PokemonDetails[]> {
  try {
    const pokemonList = await fetchPokemonList()

    // Filtra Pokémons que contêm o termo de busca
    const filteredPokemons = pokemonList.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
    )

    // Limita a 10 resultados para não sobrecarregar
    const limitedResults = filteredPokemons.slice(0, 10)

    // Busca os detalhes dos Pokémons encontrados
    const pokemonDetailsPromises = limitedResults.map((pokemon) =>
      fetchPokemonDetails(pokemon.url)
    )

    return await Promise.all(pokemonDetailsPromises)
  } catch (error) {
    console.error("Erro ao buscar Pokémon por nome:", error)
    throw error
  }
}
