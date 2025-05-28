import { useEffect, useState } from "react"
import { fetchPokemonPage } from "../../services/poke_api"
import { typeColors } from "../../utils/typeColors"

interface Pokemon {
  name: string
  image: string
  types: string[]
  id: number
}

export function Home() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [totalCount, setTotalCount] = useState(0)
  const [error, setError] = useState<string | null>(null)

  const POKEMONS_PER_PAGE = 21

  // Função para carregar a primeira página
  const loadInitialPokemons = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const data = await fetchPokemonPage(1, POKEMONS_PER_PAGE)
      setPokemons(data.pokemons)
      setHasMore(data.hasMore)
      setTotalCount(data.totalCount)
      setCurrentPage(1)
    } catch (error) {
      console.error("Erro ao carregar Pokémons iniciais:", error)
      setError("Erro ao carregar Pokémons. Tente novamente.")
    } finally {
      setIsLoading(false)
    }
  }

  // Função para carregar mais Pokémons
  const loadMorePokemons = async () => {
    if (!hasMore || isLoadingMore) return

    setIsLoadingMore(true)
    setError(null)

    try {
      const nextPage = currentPage + 1
      const data = await fetchPokemonPage(nextPage, POKEMONS_PER_PAGE)

      // Adiciona os novos Pokémons à lista existente
      setPokemons((prevPokemons) => [...prevPokemons, ...data.pokemons])
      setHasMore(data.hasMore)
      setCurrentPage(nextPage)
    } catch (error) {
      console.error("Erro ao carregar mais Pokémons:", error)
      setError("Erro ao carregar mais Pokémons. Tente novamente.")
    } finally {
      setIsLoadingMore(false)
    }
  }

  useEffect(() => {
    loadInitialPokemons()
  }, [])

  // Loading inicial
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando Pokémons...</p>
        </div>
      </div>
    )
  }

  // Erro
  if (error && pokemons.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={loadInitialPokemons}
            className="px-4 py-2 bg-rose-600 text-white rounded hover:bg-rose-700 transition-colors"
          >
            Tentar novamente
          </button>
        </div>
      </div>
    )
  }

  return (
    <main className="grid px-4 md:px-4 lg:px-8 max-w-screen-xl mx-auto">
      {/* Contador de Pokémons */}
      <div className="mb-6 text-center">
        <p className="text-gray-600">
          Mostrando {pokemons.length} de {totalCount.toLocaleString()} Pokémons
        </p>
      </div>

      {/* Grid de Pokémons */}
      <ol className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-4 lg:gap-8 items-center justify-center">
        {pokemons.map((pokemon) => (
          <li
            key={pokemon.id}
            className="relative flex items-center justify-between w-full max-w-2xl h-60 bg-white rounded-2xl shadow-md mx-auto p-4 md:p-1 hover:scale-105 transition-transform duration-200 overflow-hidden"
          >
            <div className="grid grid-cols-2 h-full w-full items-center">
              <div className="flex flex-col justify-center items-start gap-2 pl-4">
                <h2 className="font-nunito text-slate-700 first-letter:uppercase text-2xl font-bold col-span-2">
                  {pokemon.name}
                </h2>
                <ol className="col-span-2 font-nunito pt-6">
                  {pokemon.types.map((type) => (
                    <li key={type} className="mb-1">
                      <div
                        className="first-letter:uppercase px-2 py-1 rounded text-white text-sm font-medium"
                        style={{
                          backgroundColor: typeColors[type] || "#d3d3d3",
                        }}
                      >
                        {type}
                      </div>
                    </li>
                  ))}
                </ol>
                <div>
                  <p className="text-sm text-slate-500">
                    N° {pokemon.id.toString().padStart(4, "0")}
                  </p>
                </div>
              </div>
              <div className="flex justify-end items-center h-full pr-4">
                <img
                  src={pokemon.image}
                  alt={pokemon.name}
                  className="max-w-40 lg:max-w-32 row-span-3 z-10"
                  loading="lazy"
                />
              </div>
            </div>
          </li>
        ))}
      </ol>

      {/* Botão de carregar mais */}
      <div className="mt-8 mb-8 text-center">
        {hasMore ? (
          <button
            onClick={loadMorePokemons}
            disabled={isLoadingMore}
            className="px-6 py-3 bg-rose-600 text-white rounded-lg hover:bg-rose-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
          >
            {isLoadingMore ? (
              <div className="flex items-center justify-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Carregando...
              </div>
            ) : (
              `Carregar mais Pokémons`
            )}
          </button>
        ) : (
          <p className="text-gray-500 font-medium">
            🎉 Você viu todos os Pokémons disponíveis!
          </p>
        )}
      </div>

      {/* Erro ao carregar mais */}
      {error && pokemons.length > 0 && (
        <div className="mt-4 text-center">
          <p className="text-red-600 mb-2">{error}</p>
          <button
            onClick={loadMorePokemons}
            className="px-4 py-2 bg-rose-600 text-white rounded hover:bg-rose-700 transition-colors"
          >
            Tentar novamente
          </button>
        </div>
      )}
    </main>
  )
}
