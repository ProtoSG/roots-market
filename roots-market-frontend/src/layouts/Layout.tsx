import { Outlet } from "react-router-dom";
import { Header } from "../components/UI";
import { Toaster } from "sonner";

export default function Layout(){
  return (
    <>
      <Header />
      <Outlet />
      <Toaster richColors/>
    </>
  )
}
