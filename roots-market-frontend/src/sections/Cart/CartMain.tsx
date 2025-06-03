import { CartList, CartSummary } from "../../components/Cart";

export function CartMain() {
  return (
    <main className="flex flex-col lg:flex-row gap-8">
      <CartList />
      <hr className="lg:hidden"/>
      <div>
        <div className="flex flex-col gap-4 bg-white p-4 rounded-lg h-auto">
          <CartSummary />
        </div>
      </div>
    </main>
  )
}
