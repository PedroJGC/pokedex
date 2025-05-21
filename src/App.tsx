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
    <div className="flex flex-col items-center justify-center gap-4 ">
      {pokemons.map((pokemon, index) => (
        <div
          key={index}
          className="flex flex-col items-center justify-center w-80 h-80 bg-gray-200"
        >
          <img src={pokemon.image} alt={pokemon.name} />
          <h1 className="">{pokemon.name}</h1>
        </div>
      ))}
    </div>
  )
}

export default App
