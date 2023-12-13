import './Filters.css'
import { useId, useContext } from 'react'
import { FiltersContext } from '../../src/context/filters.jsx'

export function Filters() {
  const minPriceFilterId = useId()
  const categoryFilterId = useId()

  // Context.
  // useContext
  // 3. Consumir el context.
  const { filters, setFilters } = useContext(FiltersContext)

  // onChange sobre el input type range.
  const handleChangeMinPrice = (event) => {
    // Asi se hace setFilters un useState que viene desde otro archivo.
    // El useState de src/context/filters.jsx que viene a traves 
    // del useContext, en este caso.
    setFilters(prevState => ({
      ...prevState,
      minPrice: event.target.value
    }))
  }

  // onChange sobre el select.
  const handleChangeCategory = (event) => {
    // Asi se hace setFilters un useState que viene desde otro archivo.
    // El useState de src/context/filters.jsx que viene a traves 
    // del useContext, en este caso.
    setFilters(prevState => ({
      ...prevState,
      category: event.target.value
    }))
  }

  return (
    <section className="filters">

      <div>
        <label htmlFor={minPriceFilterId}>Price</label>
        <input type='range' id={minPriceFilterId} min='0' max='1000' onChange={handleChangeMinPrice} value={filters.minPrice} />
        {/* valor de useState minPrice. */}
        <span>${filters.minPrice}</span>
      </div>

      <div>
        <label htmlFor={categoryFilterId}>Category</label>
        <select id={categoryFilterId} onChange={handleChangeCategory}>
          <option value='all'>All</option>
          <option value='laptops'>Laptops</option>
          <option value='smartphones'>Smartphones</option>
        </select>
      </div>

    </section>
  )
}