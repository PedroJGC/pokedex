import { MagnifyingGlassIcon } from "@phosphor-icons/react"
import pokeballIcon from "../../assets/images/pokeball.svg"

export function Header() {
  return (
    <header>
      <div className="flex items-center justify-between mx-5 py-12 lg:mx-8 xl:mx-16 lg:py-8">
        <img
          src={pokeballIcon}
          alt=""
          className="w-12 cursor-pointer hover:text-rose-600"
        />
        <div className="flex items-center justify-center relative ">
          <input
            className="placeholder:text-gray-500 placeholder:italic border border-gray-300 focus:border-rose-600 focus:outline-none focus:border-2 rounded-lg py-1 px-4"
            type="text"
            placeholder="Pesquise um Pokémon"
          />
          <div className="absolute right-2 cursor-pointer">
            <MagnifyingGlassIcon size={24} className="hover:text-rose-600" />
          </div>
        </div>
        <a href="#">
          <h1 className="font-nunito text-slate-700 text-lg font-bold col-span-2 hover:text-rose-600">
            Pokédex
          </h1>
        </a>
      </div>
    </header>
  )
}
