import { Filters } from './Filters.jsx'

export function Header() {

  return (
    <header>
      <h1>React Shop 🛒</h1>
      {/* Recibe y pasa a Filters la prop que viene de App. */}
      <Filters />
    </header>
  )
}