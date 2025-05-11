import { ChangeEvent, useState } from "react"
import { useProduct } from "../../hooks/useProduct"
import { CardProduct, SearchInput } from "../../components/UI"
import { FilterButton } from "../../components/Products/FilterButton"
import { useFilterStore } from "../../stores/filterStore"

export function ListProducts() {
  const [ searchWord, setSearchWord ] = useState("")
  const { categoryFilter, artisanFilter, rangeFilter } = useFilterStore()
  
  const products = useProduct()

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (name === "search") setSearchWord(value)
  }

  let filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchWord.toLowerCase())
  )

  if (categoryFilter) {
    filteredProducts = filteredProducts.filter(
      (product) => product.categoryId === categoryFilter.id
    )
  }

  if (artisanFilter) {
    filteredProducts = filteredProducts.filter(
      (product) => product.artisanId === artisanFilter.id
    )
  }

  if (rangeFilter) {
    const [ MIN, MAX ] = rangeFilter
    filteredProducts = filteredProducts.filter(
      (product) => product.price >= MIN && product.price <= MAX
    )
  }

  return (
    <section className="flex flex-col gap-6 mx-auto w-full">
      <SearchInput 
        name="search"
        value={searchWord}
        onChange={handleChange}
        placeholder="Buscar productos..."
      />
      <FilterButton />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <CardProduct key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}
