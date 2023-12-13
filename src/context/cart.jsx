import { createContext, useReducer } from 'react'

// set cart on localStorage. 
const updateLocalStorage = state => {
  window.localStorage.setItem('cart', JSON.stringify(state))
}

// Singleton -> Modulo de JavaScript.

// 1. Crear el contexto.
// Esto es lo que tenemos que usar en los componentes para acceder a la informacion 
// del contexto ==> const { cart, addToCart, clearCart } = useContext(CartContext).
// Esto se crea solo 1 vez en la application.
export const CartContext = createContext() 

// useReducer 
// Definiendo un useReducer para el carrito.
// 1- Estado inicial.
// const initialState = [] Before I used this, but now I'm listing from localStorage.

// From localStorage, if localStorage then brings its content, else []
const initialState = JSON.parse(window.localStorage.getItem('cart')) || []

// 2- El reducer
const reducer = (state, action) => {
  const { type: actionType, payload: actionPayload } = action
  switch(actionType) {

    // Agregar 1 producto al carrito.
    // Si el producto no esta en el carrito lo agrego introduciendole la propiedad  
    // quantity con  valor 1, de lo contrario, solo le incremento el valor de la 
    // propiedad quantity.
    case 'ADD_TO_CART': {
      const { id } = actionPayload
      const productInCartIndex = state.findIndex(item => item.id === id)

      // producto no esta en el carrito
      if(productInCartIndex === -1) { 
        // agrego el producto a la vez que le pongo la propiedad quantity en 1.
        let newState = [
          ...state,
          {
            ...actionPayload,
            quantity: 1
          }
        ]
        // set cart on localStorage.
        updateLocalStorage(newState)

        return newState
      } else {
        // El producto ya habia sido agregado al carrito, entonces solo le incremento 
        // quantity.
        // Diferentes maneras de incrementar quantity:

        // forma numero 1️⃣ (usando structuredClone)
        // let newState = structuredClone(state) // copia profunda
        // newState[productInCartIndex].quantity += 1        

        // forma numero 2️⃣ (usando map)
        // let newState = state.map(item => {
        //   if(item.id === id) {
        //     return {
        //       ...item,
        //       quantity: item.quantity + 1
        //     }
        //   }
        //   return item
        // })

        // forma numero 3️⃣ (usando spread operator y slice)
        const newState = [
          ...state.slice(0, productInCartIndex),
          {
            ...state[productInCartIndex],
            quantity: state[productInCartIndex].quantity + 1
          },
          ...state.slice(productInCartIndex + 1)
        ]

        // set cart on localStorage.
        updateLocalStorage(newState)

        return newState
      }  
    }

    // Eliminar 1 producto del carrito.
    // Se actualiza el array cart con los productos que ya tenia, excepto el que quiero 
    // eliminar.
    case 'REMOVE_FROM_CART': {
      const { id } = actionPayload 
      let newState = state.filter(item => item.id !== id)
      // set cart on localStorage.
      updateLocalStorage(newState)

      return newState
    }

    // Vaciar el carrito.
    case 'CLEAR_CART': {
      // set cart on localStorage.
      updateLocalStorage([])

      return []
    }
  }
  return state
}

// 2. Crear el Provider, para proveer el contexto.
// Esto es lo que tenemos que usar para envolver los componentes que accederan al 
// contexto.
export function CartProvider({ children }) {
  // 3- El hook useReducer. 
  const [state, dispatch] = useReducer(reducer, initialState)

  const addToCart = product => dispatch({
    type: 'ADD_TO_CART',
    payload: product
  })

  const removeFromCart = product => dispatch({
    type: 'REMOVE_FROM_CART',
    payload: product
  })

  const clearCart = () => dispatch({
    type: 'CLEAR_CART'
  })

  return (
    <CartContext.Provider value={{
      // Cosas, de este Contexto, a las que se puede acceder.
      cart: state, 
      addToCart,
      clearCart,
      removeFromCart
    }}>
      {children}
    </CartContext.Provider>
  )
}