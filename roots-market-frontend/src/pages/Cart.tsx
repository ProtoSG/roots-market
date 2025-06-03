import { MainContainer } from "../components/UI";
import { CartHeader, CartMain } from "../sections/Cart";

export function Cart() {

  return (
    <MainContainer
      className="flex-col gap-4"
    >
      <CartHeader />
      <CartMain />
    </MainContainer>
  )
}
