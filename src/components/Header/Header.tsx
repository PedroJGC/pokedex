import { useState } from "react"
import { MagnifyingGlassIcon } from "@phosphor-icons/react"
import { useNavigate } from "react-router-dom"
import pokeballIcon from "../../assets/images/pokeball.svg"

interface HeaderProps {
  onSearch?: (searchTerm: string) => void
}

export function Header({ onSearch }: HeaderProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const navigate = useNavigate()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      if (onSearch) {
        onSearch(searchTerm.trim())
      }
    }
  }

  const handleInputKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch(e as any)
    }
  }

  const handleLogoClick = () => {
    navigate("/")
    setSearchTerm("")
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
        <form
          onSubmit={handleSearch}
          className="flex items-center justify-center relative"
        >
          <input
            className="placeholder:text-gray-500 placeholder:italic border border-gray-300 focus:border-rose-600 focus:outline-none focus:border-2 rounded-lg py-1 px-4 pr-10"
            type="text"
            placeholder="Pesquise um Pokémon"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleInputKeyPress}
          />
          <button
            type="submit"
            className="absolute right-2 cursor-pointer p-1 hover:bg-gray-100 rounded"
          >
            <MagnifyingGlassIcon
              size={24}
              className="hover:text-rose-600 transition-colors"
            />
          </button>
        </form>

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
