import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { FiltersProvider } from './context/filters.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    
    {/* Asi se envuelve el componente App, con todos sus hijos dentro para que luego todos tengan acceso al contexto cada vez lo necesiten. */}
    <FiltersProvider>
      <App />
    </FiltersProvider>

  </React.StrictMode>
)
