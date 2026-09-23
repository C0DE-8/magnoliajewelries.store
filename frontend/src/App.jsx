import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { ShopProvider } from './context/ShopContext'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home/Home'
import Shop from './pages/Shop/Shop'
import Product from './pages/Product/Product'
import Wishlist from './pages/Wishlist/Wishlist'
import Bag from './pages/Bag/Bag'
import About from './pages/About/About'
import Information from './pages/Information/Information'
import NotFound from './pages/NotFound/NotFound'
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}
export default function App() {
  return <BrowserRouter><ShopProvider><ScrollToTop /><Header /><main id="main"><Routes>
    <Route path="/" element={<Home />} /><Route path="/shop" element={<Shop />} />
    <Route path="/product/:slug" element={<Product />} /><Route path="/wishlist" element={<Wishlist />} />
    <Route path="/bag" element={<Bag />} /><Route path="/about" element={<About />} />
    <Route path="/information/:topic" element={<Information />} /><Route path="*" element={<NotFound />} />
  </Routes></main><Footer /></ShopProvider></BrowserRouter>
}

