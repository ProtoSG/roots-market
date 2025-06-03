import { Outlet } from "react-router-dom";
import { MainContainer } from "../components/UI";
import { NavAside } from "../components/Artisan";

export function ArtisanLayout() {
  return (
    <MainContainer className="min-h-dvh gap-8">
      <NavAside />
      <Outlet />
    </MainContainer>
  )
}
