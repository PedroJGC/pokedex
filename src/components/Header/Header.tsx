import { useState, useEffect, useRef } from "react"
import { MagnifyingGlassIcon } from "@phosphor-icons/react"
import { useNavigate } from "react-router-dom"
import { fetchPokemonList } from "../../services/poke_api"
import pokeballIcon from "../../assets/images/pokeball.svg"

interface HeaderProps {
  onSearch?: (searchTerm: string) => void
}

interface PokemonSuggestion {
  name: string
  id: number
}

export function Header({ onSearch }: HeaderProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [suggestions, setSuggestions] = useState<PokemonSuggestion[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [pokemonList, setPokemonList] = useState<PokemonSuggestion[]>([])
  const [isLoadingList, setIsLoadingList] = useState(false)
  const navigate = useNavigate()
  const inputRef = useRef<HTMLInputElement>(null)
  const suggestionsRef = useRef<HTMLDivElement>(null)

  // Carrega a lista de Pokémons uma vez quando o componente monta
  useEffect(() => {
    const loadPokemonList = async () => {
      if (pokemonList.length > 0) return // Já carregou

      setIsLoadingList(true)
      try {
        const list = await fetchPokemonList()
        const simplifiedList = list.map((pokemon) => ({
          name: pokemon.name,
          id: pokemon.id,
        }))
        setPokemonList(simplifiedList)
      } catch (error) {
        console.error("Erro ao carregar lista de Pokémons:", error)
      } finally {
        setIsLoadingList(false)
      }
    }

    loadPokemonList()
  }, [pokemonList.length])

  // Atualiza sugestões quando o termo de busca muda
  useEffect(() => {
    if (!searchTerm.trim() || pokemonList.length === 0) {
      setSuggestions([])
      setShowSuggestions(false)
      return
    }

    const filteredSuggestions = pokemonList
      .filter((pokemon) =>
        pokemon.name.toLowerCase().includes(searchTerm.toLowerCase().trim())
      )
      .slice(0, 8) // Limita a 8 sugestões

    setSuggestions(filteredSuggestions)
    setShowSuggestions(filteredSuggestions.length > 0)
  }, [searchTerm, pokemonList])

  // Fecha sugestões quando clica fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node) &&
        !inputRef.current?.contains(event.target as Node)
      ) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      if (onSearch) {
        onSearch(searchTerm.trim())
      }
      setShowSuggestions(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchTerm(value)

    // Se limpar o campo, executa pesquisa vazia para voltar à lista completa
    if (!value.trim() && onSearch) {
      onSearch("")
    }
  }

  const handleInputKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch(e as any)
    } else if (e.key === "Escape") {
      setShowSuggestions(false)
      inputRef.current?.blur()
    }
  }

  const handleSuggestionClick = (pokemon: PokemonSuggestion) => {
    setSearchTerm(pokemon.name)
    setShowSuggestions(false)

    // Executa a pesquisa com o nome selecionado
    if (onSearch) {
      onSearch(pokemon.name)
    }
  }

  const handleSuggestionKeyPress = (
    e: React.KeyboardEvent,
    pokemon: PokemonSuggestion
  ) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      handleSuggestionClick(pokemon)
    }
  }

  const handleLogoClick = () => {
    navigate("/")
    setSearchTerm("")
    setSuggestions([])
    setShowSuggestions(false)

    // Limpa a pesquisa
    if (onSearch) {
      onSearch("")
    }
  }

  const handleInputFocus = () => {
    if (suggestions.length > 0) {
      setShowSuggestions(true)
    }
  }

  return (
    <header>
      <div className="flex items-center justify-between mx-5 py-12 lg:mx-8 xl:mx-16 lg:py-8">
        <img
          src={pokeballIcon}
          alt="Pokédex Logo"
          className="w-12 cursor-pointer hover:opacity-80 transition-opacity"
          onClick={handleLogoClick}
        />

        <div className="relative">
          <form
            onSubmit={handleSearch}
            className="flex items-center justify-center relative"
          >
            <input
              ref={inputRef}
              className="placeholder:text-gray-500 placeholder:italic border border-gray-300 focus:border-rose-600 focus:outline-none focus:border-2 rounded-lg py-1 px-4 pr-10 w-64"
              type="text"
              placeholder={
                isLoadingList ? "Carregando..." : "Pesquise um Pokémon"
              }
              value={searchTerm}
              onChange={handleInputChange}
              onKeyDown={handleInputKeyPress}
              onFocus={handleInputFocus}
              disabled={isLoadingList}
            />
            <button
              type="submit"
              className="absolute right-2 cursor-pointer p-1 hover:bg-gray-100 rounded disabled:opacity-50"
              disabled={isLoadingList}
            >
              <MagnifyingGlassIcon
                size={24}
                className="hover:text-rose-600 transition-colors"
              />
            </button>
          </form>

          {/* Sugestões */}
          {showSuggestions && (
            <div
              ref={suggestionsRef}
              className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-64 overflow-y-auto z-50"
            >
              {suggestions.map((pokemon) => (
                <div
                  key={pokemon.id}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer transition-colors border-b border-gray-100 last:border-b-0"
                  onClick={() => handleSuggestionClick(pokemon)}
                  onKeyDown={(e) => handleSuggestionKeyPress(e, pokemon)}
                  tabIndex={0}
                  role="option"
                >
                  <div className="flex items-center justify-between">
                    <span className="first-letter:uppercase text-gray-700">
                      {pokemon.name}
                    </span>
                    <span className="text-xs text-gray-400">
                      #{pokemon.id.toString().padStart(4, "0")}
                    </span>
                  </div>
                </div>
              ))}

              {suggestions.length === 0 && searchTerm.trim() && (
                <div className="px-4 py-2 text-gray-500 text-center">
                  Nenhum Pokémon encontrado
                </div>
              )}
            </div>
          )}
        </div>

        <button
          onClick={handleLogoClick}
          className="hover:opacity-80 transition-opacity"
        >
          <h1 className="font-nunito text-slate-700 text-lg font-bold col-span-2 hover:text-rose-600">
            Pokédex
          </h1>
        </button>
      </div>
    </header>
  )
}
