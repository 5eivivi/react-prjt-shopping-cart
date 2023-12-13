import { products as initialProducts} from './mocks/products.json'
import { Products } from './components/Products.jsx'
import { useState, useContext } from 'react'
import { Header } from './components/Header.jsx'
// import { Footer } from './components/Footer.jsx'
// import { IS_DEVELOPMENT } from './config.js'
import { FiltersContext } from './context/filters.jsx'
import { Cart } from './components/Cart'
import { CartProvider } from './context/cart'

function App() {
  const [products] = useState(initialProducts)

  // Context.
  // useContext
  // 3. Consumir el context.
  const { filters } = useContext(FiltersContext)
  
  // Filtrar por category y minPrice devuelve lista de productos a mostrar.
  const filterProducts = (products) => {
    return products.filter(product => {
      return (
        product.price >=  filters.minPrice && 
        (
          filters.category === 'all' ||
          product.category === filters.category
        )
      )
    })
  }

  const filteredProducts = filterProducts(products)

  return (
    <>
      <Header />

      {/* Envuelvo estos componentes para que tengan acceso al Contexto del cart. */}
      <CartProvider>
        <Cart />
        <Products products={filteredProducts} />
            
        {/* Solo si la app esta en Modo Desarrollo muestra el Footer. */}
        {/* {IS_DEVELOPMENT && <Footer />} */}
      </CartProvider>
    </>
  )
}

export default App
