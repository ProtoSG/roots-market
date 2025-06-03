import { Route, Routes } from "react-router-dom"
import { ArtisanInfo, ArtisanProducts, Artisans, Cart, Home, Products } from "./pages"
import { ProtectedRoute } from "./ProtectedRoute"
import { Layout, ArtisanLayout } from "./layouts"

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />} >
        <Route index element={<Home />} />
        <Route path="products" element={<Products />} />
        <Route path="artisans" element={<Artisans />} />
        <Route path="shopping-cart" element={<Cart />} />

        <Route element={<ProtectedRoute />}>
          <Route path="artisan" element={<ArtisanLayout />} >
            <Route index element={<ArtisanInfo />} />
            <Route path="products" element={<ArtisanProducts />}/>
          </Route>
        </Route>
      </Route>
    </Routes>
  )
}
