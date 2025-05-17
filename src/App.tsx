import { useEffect, useState } from "react"

interface Pokemon {
  name: string
  image: string
}

function App() {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null)

  useEffect(() => {
    async function fetchPokemon() {
      try {
        const response = await fetch(
          "https://pokeapi.co/api/v2/pokemon/pikachu"
        )
        const data = await response.json()

        setPokemon({
          name: data.name,
          image: data.sprites.front_default,
        })
      } catch (error) {
        console.error("Erro ao buscar Pokémon:", error)
      }
    }

    fetchPokemon()
  }, [])

  if (!pokemon) {
    return <p>Carregando...</p>
  }

  return (
    <div>
      <h1>{pokemon.name}</h1>
      <img src={pokemon.image} alt={pokemon.name} />
    </div>
  )
}

export default App
