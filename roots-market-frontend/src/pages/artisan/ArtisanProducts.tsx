import { useArtisanPrivate } from "../../hooks/useArtisan";
import { PlusIcon } from "../../icons";

export function ArtisanProducts(){
  const { products } = useArtisanPrivate()

  console.log({products})

  return (
    <section className="w-full min-h-full flex items-start">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className={`
          border border-dashed flex flex-col items-center p-4 cursor-pointer transition-colors rounded-lg
          hover:text-primary hover:border-primary
          `}>
          <p className="font-semibold text-xl">Agregar Producto</p>
          <PlusIcon className="size-48"/>
        </div>
        {products.data.map(product => (
          <article
            className="z-0 flex flex-col gap-4 items-center transition-all duration-300 group  hover:cursor-pointer hover:scale-105 hover:drop-shadow-2xl hover:drop-shadow-red-950/40"
          >
            <div className="w-full h-64 rounded bg-zinc-200">
              <img src={product.images[0].imageUrl} className="w-full h-full object-cover rounded-lg" />
            </div>
            <div className="">
                <h3 className="text-lg text-center text-pretty">{product.name}</h3>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
