export async function fetchPokemons(limit: number) {
  try {
    const pokemons = []
    for (let i = 1; i <= limit; i++) {
      //const randomId = Math.floor(Math.random() * 898) + 1 // 1 a 898 (Geração 1-8)
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`)
      const data = await response.json()

      pokemons.push({
        name: data.name,
        image: data.sprites.front_default,
      })
    }
    return pokemons
  } catch (error) {
    console.error("Erro ao buscar Pokémon:", error)
    throw error
  }
}
