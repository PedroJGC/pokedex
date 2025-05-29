import { useState, useEffect } from "react"
import { ArrowUpIcon } from "@phosphor-icons/react"

export function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false)

  // Controla a visibilidade do botão baseado no scroll
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener("scroll", toggleVisibility)

    return () => {
      window.removeEventListener("scroll", toggleVisibility)
    }
  }, [])

  // Função para voltar ao topo
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  if (!isVisible) {
    return null
  }

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 z-50 bg-rose-600 hover:bg-rose-700 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 group"
      aria-label="Voltar ao topo"
    >
      <ArrowUpIcon
        size={24}
        className="transition-transform duration-200 group-hover:-translate-y-0.5"
      />
    </button>
  )
}
