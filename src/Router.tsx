import { Routes, Route } from "react-router-dom"
import { DefaultLayout } from "./layouts/DefaultLayout"
import { LoadPokemon } from "./pages/LoadPokemon"

import { Home } from "./pages/Home"

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/load-pokemon" element={<LoadPokemon />} />
      </Route>
    </Routes>
  )
}
