import { useEffect, useState } from "react"
import { fetchPokemons } from "./services/poke_api"

interface Pokemon {
  name: string
  image: string
  types: string[]
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
    <main>
      <ol className="flex flex-col items-center justify-center gap-4 ">
        {pokemons.map((pokemon, index) => (
          <li
            key={index}
            className="flex flex-col items-center justify-center w-80 h-80 bg-gray-200"
          >
            <h2 className="font-[Roboto] first-letter:uppercase text-2xl font-bold">
              {pokemon.name}
            </h2>
            <ol>
              {pokemon.types.map((type) => {
                return (
                  <li key={type}>
                    <div>{type}</div>
                  </li>
                )
              })}
            </ol>
            <img src={pokemon.image} alt={pokemon.name} className="max-w-40" />
          </li>
        ))}
      </ol>
    </main>
  )
}

export default App
