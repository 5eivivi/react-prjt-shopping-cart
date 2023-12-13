import './Footer.css'
import { useContext } from 'react'
import { FiltersContext } from '../../src/context/filters.jsx'
import { useCart } from '../hooks/useCart.jsx' // import Hook.

export function Footer() {
  const { filters } = useContext(FiltersContext)
  const { cart } = useCart() // Hook.

  return (
    <footer className='footer'>
      {/* Muestra los valores de minPrice y category del useContext. */}
      {
        JSON.stringify(filters, null, 2)
      }

      {/* Muestra los productos del carrito. */}
      {
        JSON.stringify(cart, null, 2)
      }

      <h4>Prueba técnica de React ⚛️ － <span>@midudev</span></h4>
      <h5>Shopping Cart con useId, useContext & useReducer</h5>
    </footer>
  )
}
