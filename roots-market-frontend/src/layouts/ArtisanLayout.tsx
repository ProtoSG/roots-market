import { Outlet } from "react-router-dom";
import { MainContainer } from "../components/UI";
import { NavAside } from "../components/Artisan";
import { PrivateArtisanProvider } from "../context/privateArtisan.provider";

export function ArtisanLayout() {
  return (
    <PrivateArtisanProvider>
      <MainContainer className="min-h-dvh gap-8">
        <NavAside />
        <Outlet />
      </MainContainer>
    </PrivateArtisanProvider>
  )
}
