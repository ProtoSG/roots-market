import { Outlet } from "react-router-dom";
import { MainContainer } from "../components/UI";
import { NavAside } from "../components/Artisan";
import { PrivateArtisanProvider } from "../context/privateArtisan.provider";
import { Toaster } from "sonner";

export function ArtisanLayout() {
  return (
    <PrivateArtisanProvider>
      <MainContainer className="min-h-dvh gap-8">
        <NavAside />
        <Outlet />
      </MainContainer>
      <Toaster richColors/>
    </PrivateArtisanProvider>
  )
}
