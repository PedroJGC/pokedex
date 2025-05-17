import { useEffect, useState } from "react"
import { fetchPokemon } from "./services/poke_api"

interface Pokemon {
  name: string
  image: string
}

function App() {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null)

  useEffect(() => {
    const loadPokemon = async () => {
      const data = await fetchPokemon()
      if (data) {
        setPokemon(data)
      }
    }

    loadPokemon()
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
