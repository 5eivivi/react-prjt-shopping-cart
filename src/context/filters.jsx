import { createContext, useState } from 'react'

// Singleton -> Modulo de JavaScript.

// 1. Crear el contexto.
// Esto es lo que tenemos que usar en los componentes para acceder a la informacion 
// del contexto ==> const { filters, setFilters } = useContext(FiltersContext).
// Esto se crea solo 1 vez en la application.
export const FiltersContext = createContext() 

// 2. Crear el Provider, para proveer el contexto.
// Esto es lo que tenemos que usar para envolver los componentes que accederan al contexto.
export function FiltersProvider({ children }) {
  const [filters, setFilters] = useState({
    category: 'all',
    minPrice: 0
  })
  
  return (
    <FiltersContext.Provider value={{
      // Cosas, de este Contexto, a las que se puede acceder.
      filters, 
      setFilters
    }}>
      {children}
    </FiltersContext.Provider>
  )
}