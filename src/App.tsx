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
    <main className="grid px-4  md:px-4 lg:px-8 max-w-screen-xl mx-auto">
      <ol className="grid grid-cols-1  sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-4 lg:gap-8 items-center justify-center">
        {pokemons.map((pokemon, index) => (
          <li
            key={index}
            className="flex items-center justify-between w-full max-w-2xl h-60 bg-white rounded-2xl shadow-md mx-auto  p-4 md:p-1"
          >
            <div className="grid grid-cols-2 h-full w-full items-center">
              <div className="flex flex-col justify-center items-start gap-2 pl-4">
                <h2 className="font-nunito text-slate-700 first-letter:uppercase text-2xl font-bold col-span-2">
                  {pokemon.name}
                </h2>
                <ol className="col-span-2 font-nunito  pt-6">
                  {pokemon.types.map((type) => {
                    return (
                      <li key={type}>
                        <div className="first-letter:uppercase">{type}</div>
                      </li>
                    )
                  })}
                </ol>
                <div>
                  <p className="text-sm text-slate-500">{`N° ${(index += 1).toString().padStart(4, "0")}`}</p>
                </div>
              </div>
              <div className="flex justify-end items-center h-full pr-4">
                <img
                  src={pokemon.image}
                  alt={pokemon.name}
                  className="max-w-40 lg:max-w-32 row-span-3"
                />
              </div>
            </div>
          </li>
        ))}
      </ol>
    </main>
  )
}

export default App
