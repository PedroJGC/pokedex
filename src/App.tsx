import { useEffect, useState } from "react"
import { fetchPokemons } from "./services/poke_api"

interface Pokemon {
  name: string
  image: string
}

function App() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([])

  useEffect(() => {
    const loadPokemons = async () => {
      const data = await fetchPokemons(20)
      if (data) {
        setPokemons(data)
      }
    }

    loadPokemons()
  }, [])

  if (pokemons.length === 0) {
    return <p>Carregando...</p>
  }

  return (
    <div>
      {pokemons.map((pokemon, index) => (
        <div key={index}>
          <h1>{pokemon.name}</h1>
          <img src={pokemon.image} alt={pokemon.name} />
        </div>
      ))}
    </div>
  )
}

export default App
