import { useId } from 'react'
import { CartIcon, ClearCartIcon } from './Icons.jsx'
import './Cart.css'
import { useCart } from '../hooks/useCart.jsx' // import Hook.

export function Cart() {
  const cartCheckboxId = useId()

  // const { cart, addToCart, clearCart } = useCart() // Hook. Now I'm listing from localStorage.
  const { addToCart, clearCart } = useCart() // Hook.

  // From localStorage, if localStorage then brings its content, else []
  const getCartFromLocalStorage = JSON.parse(window.localStorage.getItem('cart')) || []

  // Este lo hice para no iterar con .map sobre el useState cart.
  // const listProductsCart = structuredClone(cart) Now I'm listing from localStorage.
  const listProductsCart = structuredClone(getCartFromLocalStorage)

  return (
    <>
      <label className='cart-button' htmlFor={cartCheckboxId}>
        <CartIcon />
      </label>
      <input id={cartCheckboxId} type='checkbox' hidden />

      <aside className='cart'>
        <ul>
          {
            listProductsCart.map(product => (
              <li key={product.id}>
                <img src={product.thumbnail} alt={product.title} />
                <div>
                  <strong>{product.title}</strong> - ${product.price}
                </div>
                <footer>
                  <small>
                    Qty: {product.quantity}
                  </small>
                  <button onClick={() => addToCart(product)}>+</button>
                </footer>
              </li>
            ))
          }
        </ul>

        <button onClick={() => clearCart()}>
          <ClearCartIcon />
        </button>
      </aside>
    </>
  )
}