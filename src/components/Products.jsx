import './Products.css'
import { AddToCartIcon, RemoveFromCartIcon } from './Icons.jsx'
import { useCart } from '../hooks/useCart'

export function Products({ products }) {
  // const { cart, addToCart, removeFromCart } = useCart() Now I'm listing from localStorage.
  const { addToCart, removeFromCart } = useCart()

  // From localStorage, if localStorage then brings its content, else []
  const getCartFromLocalStorage = JSON.parse(window.localStorage.getItem('cart')) || []

  // El producto que pretendo agregar al carrito ya existe en el.
  // Devuelve true or false.
  // const checkIsProductInCart = (product) => cart.some(item => item.id === product.id) Now I'm listing from localStorage.
  const checkIsProductInCart = (product) => getCartFromLocalStorage.some(item => item.id === product.id)
  
  return (
    <main className='products'>
      <ul>
        {
          // Muestra solo los primeros 10 productos.
          // slice(posicionInicial, cantidadDePosiciones).
          products.slice(0, 10).map(product => {
            // true si el producto en la iteracion esta en el carrito, sino false.
            const isProductInCart = checkIsProductInCart(product)
            
            return (
              <li key={ product.id }>
                <img src={product.thumbnail} alt={product.title} />
                <div>
                  <strong>{product.title}</strong> - ${product.price}
                </div>
                <div>                  
                    {
                      isProductInCart                       
                      // iconos svg como componentes en el archivo Icons.jsx
                      ? <button onClick={() => removeFromCart(product)} className='removeFromCart'> <RemoveFromCartIcon /> </button> 
                      : <button onClick={() => addToCart(product)} className='addToCart'> <AddToCartIcon /> </button>
                    }                  
                </div>
              </li>
            )}
          )
        }
      </ul>
    </main>
  )
}