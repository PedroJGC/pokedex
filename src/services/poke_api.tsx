export async function fetchPokemons(limit: number) {
  try {
    const pokemons = []
    for (let i = 1; i <= limit; i++) {
      //const randomId = Math.floor(Math.random() * 898) + 1 // 1 a 898 (Geração 1-8)
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`)
      const data = await response.json()

      pokemons.push({
        name: data.name,
        image: data.sprites.other["official-artwork"].front_default,
        types: data.types.map(
          (type: { type: { name: string } }) => type.type.name
        ),
      })
    }
    return pokemons
  } catch (error) {
    console.error("Erro ao buscar Pokémon:", error)
    throw error
  }
}
