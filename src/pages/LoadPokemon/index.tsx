import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { fetchPokemonById } from "../../services/poke_api"
import { typeColors } from "../../utils/typeColors"

interface PokemonDetail {
  id: number
  name: string
  image: string
  types: string[]
  stats: Array<{
    name: string
    value: number
  }>
  height: number
  weight: number
}

const statTranslations: Record<string, string> = {
  hp: "HP",
  attack: "Attack",
  defense: "Defense",
  "special-attack": "Special-Attack",
  "special-defense": "Special-Defense",
  speed: "Speed",
}

const statColors: Record<string, string> = {
  hp: "#22c55e",
  attack: "#ef4444",
  defense: "#6b7280",
  "special-attack": "#8b5cf6",
  "special-defense": "#06b6d4",
  speed: "#eab308",
}

export function LoadPokemon() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [pokemon, setPokemon] = useState<PokemonDetail | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadPokemon = async () => {
      if (!id) return

      try {
        const data = await fetchPokemonById(id)
        setPokemon(data)
      } catch (error) {
        console.error("Erro ao carregar Pokémon:", error)
      } finally {
        setLoading(false)
      }
    }

    loadPokemon()
  }, [id])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-600 mx-auto mb-4"></div>
          <p className="text-xl">Carregando...</p>
        </div>
      </div>
    )
  }

  if (!pokemon) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl">Pokémon não encontrado</p>
      </div>
    )
  }

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <button
        onClick={() => navigate("/")}
        className="mb-6 px-4 py-2 bg-slate-200 hover:bg-slate-300 rounded-lg transition-colors font-medium"
      >
        ← Voltar
      </button>

      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="flex flex-col lg:flex-row">
          {/* Seção esquerda - Informações do Pokémon */}
          <div className="lg:w-1/2 p-8 bg-gradient-to-br from-gray-50 to-gray-100">
            <div className="text-center">
              <p className="text-6xl font-bold text-gray-300 mb-2">
                #{pokemon.id.toString().padStart(4, "0")}
              </p>

              <h1 className="text-4xl font-bold text-slate-700 font-nunito first-letter:uppercase mb-4">
                {pokemon.name}
              </h1>

              <div className="flex flex-wrap gap-2 justify-center mb-8">
                {pokemon.types.map((type) => (
                  <span
                    key={type}
                    className="px-4 py-2 rounded-full text-white font-medium text-sm first-letter:uppercase"
                    style={{ backgroundColor: typeColors[type] || "#6b7280" }}
                  >
                    {type}
                  </span>
                ))}
              </div>

              <div className="flex justify-center mb-8">
                <img
                  src={pokemon.image}
                  alt={pokemon.name}
                  className="w-80 h-80 object-contain drop-shadow-lg"
                />
              </div>

              {/* Informações físicas */}
              <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto">
                <div className="bg-white rounded-lg p-4 text-center shadow-md">
                  <p className="text-sm text-slate-500 mb-1">Altura</p>
                  <p className="text-xl font-bold text-slate-700">
                    {(pokemon.height / 10).toFixed(1)} m
                  </p>
                </div>
                <div className="bg-white rounded-lg p-4 text-center shadow-md">
                  <p className="text-sm text-slate-500 mb-1">Peso</p>
                  <p className="text-xl font-bold text-slate-700">
                    {(pokemon.weight / 10).toFixed(1)} kg
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Seção direita - Estatísticas */}
          <div className="lg:w-1/2 p-8">
            <h2 className="text-2xl font-bold text-slate-700 font-nunito mb-8">
              Estatísticas
            </h2>

            <div className="space-y-6">
              {pokemon.stats.map((stat) => (
                <div key={stat.name} className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-slate-600 text-lg">
                      {statTranslations[stat.name] || stat.name}
                    </span>
                    <span className="font-bold text-slate-700 text-xl min-w-[3rem] text-right">
                      {stat.value}
                    </span>
                  </div>

                  <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700 ease-out"
                      style={{
                        width: `${Math.min((stat.value / 150) * 100, 100)}%`,
                        backgroundColor: statColors[stat.name] || "#6b7280",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Estatísticas totais */}
            <div className="mt-8 p-4 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="font-medium text-slate-600">Total</span>
                <span className="font-bold text-slate-700 text-xl">
                  {pokemon.stats.reduce((total, stat) => total + stat.value, 0)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
