export async function fetchPokemon() {
  try {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon/pikachu")
    const data = await response.json()

    return {
      name: data.name,
      image: data.sprites.front_default,
    }
  } catch (error) {
    console.error("Erro ao buscar Pokémon:", error)
  }
}
