export async function fetchPokemon() {
  try {
    const randomId = Math.floor(Math.random() * 898) + 1 // 1 a 898 (Geração 1-8)
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${randomId}`
    )
    const data = await response.json()

    return {
      name: data.name,
      image: data.sprites.front_default,
    }
  } catch (error) {
    console.error("Erro ao buscar Pokémon:", error)
  }
}
