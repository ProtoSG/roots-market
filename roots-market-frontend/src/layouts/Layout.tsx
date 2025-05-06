import { Outlet } from "react-router-dom";
import { Header } from "../components/UI";

export default function Layout(){
  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}
