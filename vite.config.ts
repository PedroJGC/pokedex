import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 3000,
  },
  base: process.env.NODE_ENV === "production" ? "/pokedex/" : "/",
  build: {
    outDir: "dist",
    assetsDir: "assets",
    sourcemap: false,
  },
})
