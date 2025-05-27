import { Routes, Route } from "react-router-dom"
import { Home } from "./pages/Home"
import { LoadPokemon } from "./pages/LoadPokemon"

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/load-pokemon" element={<LoadPokemon />} />
    </Routes>
  )
}
