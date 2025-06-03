import { Outlet } from "react-router-dom";
import { Header, ModalLoggin, ModalProduct } from "../components/UI";
import { Toaster } from "sonner";

export function Layout(){
  return (
    <>
      <Header />
      <Outlet />
      <ModalProduct />
      <ModalLoggin />
      <Toaster richColors/>
    </>
  )
}
