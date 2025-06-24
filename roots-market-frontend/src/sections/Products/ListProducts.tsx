import { ChangeEvent, useState } from "react"
import { useProduct } from "../../hooks/useProduct"
import { CardProduct, Paginations, SearchInput } from "../../components/UI"
import { FilterButton } from "../../components/Products/FilterButton"
import { UseFilterStore } from "../../stores/filterStore"

export function ListProducts() {
  const [ searchWord, setSearchWord ] = useState("")
  const { setPage } = UseFilterStore()

  const { products } = useProduct()

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (name === "search") setSearchWord(value)
  }

  const totalPages = products.meta.totalPages
  const page = products.meta.page

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
        {products.data.map((product) => (
          <CardProduct key={product.id} product={product} />
        ))}
      </div>
      <Paginations page={page} totalPages={totalPages} onPageChange={setPage}/>
    </section>
  )
}
