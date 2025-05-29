import { BrowserRouter } from "react-router-dom"
import { Router } from "./Router"

const basename = process.env.NODE_ENV === "production" ? "/pokedex" : ""

export function App() {
  return (
    <BrowserRouter basename={basename}>
      <Router />
    </BrowserRouter>
  )
}

export default App
