import { useContext } from 'react'
import { CartContext } from '../context/cart'

export const useCart = () => {
  const context = useContext(CartContext)

  // Este componente no tiene acceso al Context (no esta envuelto por el Context).
  if(context === undefined) {
    throw new Error('useCart must be used within a CartProvider.')
  }

  return context
}