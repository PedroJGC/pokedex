# 🔥 Pokédex Interativa - React + TypeScript

<div align="center">
  <img src="https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/TailwindCSS-4.1x-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="TailwindCSS" />
  <img src="https://img.shields.io/badge/Vite-5.x-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
</div>

---

## 🎯 **Sobre o Projeto**

Uma **Pokédex moderna e responsiva** desenvolvida com as mais recentes tecnologias front-end. O projeto oferece uma experiência fluida e intuitiva para explorar o universo Pokémon, com funcionalidades avançadas de busca, navegação otimizada e design responsivo.

### 🌟 **Principais Funcionalidades**

- 🔍 **Busca Inteligente**: Sistema de autocomplete com sugestões em tempo real
- 📱 **Design Responsivo**: Interface adaptável para todos os dispositivos
- ⚡ **Performance Otimizada**: Carregamento lazy e cache inteligente
- 🎨 **UI/UX Moderna**: Design limpo seguindo as melhores práticas
- 📊 **Visualização Detalhada**: Estatísticas completas dos Pokémons
- 🚀 **Navegação Fluida**: Transições suaves e feedback visual

---

## 🛠️ **Stack Tecnológica**

### **Frontend Core**

- **React 18** - Biblioteca principal com hooks modernos
- **TypeScript** - Tipagem estática para maior robustez
- **React Router DOM** - Navegação SPA otimizada

### **Estilização & UI**

- **TailwindCSS** - Framework CSS utilitário
- **Phosphor Icons** - Iconografia moderna e consistente
- **Google Fonts (Nunito Sans)** - Tipografia otimizada

### **Ferramentas de Desenvolvimento**

- **Vite** - Build tool ultra-rápido
- **ESLint + Prettier** - Qualidade e consistência de código

### **API & Dados**

- **PokéAPI** - API RESTful oficial do Pokémon
- **Cache Otimizado** - Sistema de cache para melhor performance

---

## 🏗️ **Arquitetura do Projeto**

```
src/
├── components/          # Componentes reutilizáveis
│   ├── Header/         # Cabeçalho com busca
│   └── ScrollToTopButton/ # Botão voltar ao topo
├── layouts/            # Layouts de página
│   └── DefaultLayout/  # Layout padrão com header
├── pages/              # Páginas da aplicação
│   ├── Home/          # Lista de Pokémons
│   └── LoadPokemon/   # Detalhes do Pokémon
├── services/          # Serviços de API
│   └── poke_api.tsx   # Integração com PokéAPI
├── utils/             # Utilitários
│   └── typeColors.ts  # Cores dos tipos Pokémon
└── types/             # Definições TypeScript
```

---

## 🎨 **Funcionalidades Técnicas Avançadas**

### **🔍 Sistema de Busca Inteligente**

- Autocomplete com debounce otimizado
- Busca por nome exato ou aproximado
- Cache de sugestões para performance
- Navegação por teclado (Enter/Escape)

### **📱 Responsividade & UX**

- Grid adaptativo (1-3 colunas)
- Hover effects e animações CSS
- Loading states e feedback visual
- Scroll infinito com paginação

### **⚡ Otimizações de Performance**

- Lazy loading de imagens
- Cache de dados da API
- Componentes funcionais com hooks
- Minimização de re-renders

### **🎯 Funcionalidades de Negócio**

- Listagem paginada de Pokémons
- Visualização detalhada com estatísticas
- Filtros por tipo com cores temáticas
- Informações físicas (altura/peso)
- Navegação breadcrumb

---

## 🚀 **Como Executar**

### **Pré-requisitos**

- Node.js 18+ instalado
- npm ou yarn

### **Instalação**

```bash
# Clone o repositório
git clone [url-do-repositorio]

# Entre no diretório
cd pokedex-react

# Instale as dependências
npm install

# Execute o projeto
npm run dev
```

### **Scripts Disponíveis**

```bash
npm run dev      # Servidor de desenvolvimento
npm run build    # Build de produção
npm run preview  # Preview do build
npm run lint     # Linting do código
```

---

## 📊 **Destaques Técnicos**

### **Gerenciamento de Estado**

- React Hooks (useState, useEffect, useRef)
- Context API para compartilhamento de estado
- Estado local otimizado para performance

### **Integração com API**

- Tratamento de erros robusto
- Loading states em todas as operações
- Cache inteligente para reduzir requisições
- Paginação eficiente

### **Experiência do Usuário**

- Feedback visual em todas as interações
- Estados de loading personalizados
- Mensagens de erro amigáveis
- Navegação intuitiva

---

## 🎯 **Padrões e Boas Práticas**

- ✅ **Clean Code**: Código limpo e bem documentado
- ✅ **TypeScript**: Tipagem forte em todo o projeto
- ✅ **Component-Driven**: Componentes reutilizáveis e modulares
- ✅ **Responsive Design**: Mobile-first approach
- ✅ **Performance**: Otimizações de renderização
- ✅ **Accessibility**: Práticas de acessibilidade implementadas

---

## 📈 **Possíveis Melhorias Futuras**

- 🔄 Implementação de PWA (Progressive Web App)
- 🌙 Modo escuro/claro
- ❤️ Sistema de favoritos com localStorage
- 🔍 Filtros avançados (tipo, geração, estatísticas)
- 📊 Comparação entre Pokémons
- 🎮 Integração com outras APIs do universo Pokémon

---

## 📝 **Licença**

Este projeto foi desenvolvido como um **projeto de portfólio** para demonstrar habilidades em desenvolvimento front-end moderno.

---

<div align="center">
  <p>Desenvolvido com ❤️ por <strong>Pedro Carvalho</strong></p>
  <p>
    <a href="https://www.linkedin.com/in/pedrojgc/">LinkedIn</a> •
    <a href="https://github.com/PedroJGC">GitHub</a> •
    <a href="mailto:pedro.juliogc02@gmail.com">Email</a>
  </p>
</div>
