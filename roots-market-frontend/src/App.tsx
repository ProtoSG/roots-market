import { Route, Routes } from "react-router-dom"
import { Artisans, Home, Products } from "./pages"
import Layout from "./layouts/Layout"

export default function App() {
  return (
    <Routes>
      <Route path="" element={<Layout />} >
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/artisans" element={<Artisans />} />
      </Route>
    </Routes>
  )
}
