import { Outlet, useLocation } from "react-router-dom"
import { Header } from "../components/Header/Header"
import { useState, useEffect } from "react"

export function DefaultLayout() {
  const [searchHandler, setSearchHandler] = useState<
    ((term: string) => void) | undefined
  >()
  const location = useLocation()

  // Limpa o handler de pesquisa quando sai da página Home
  useEffect(() => {
    if (location.pathname !== "/") {
      setSearchHandler(undefined)
    }
  }, [location])
  return (
    <div>
      <Header onSearch={searchHandler} />
      <Outlet context={{ setSearchHandler }} />
    </div>
  )
}
