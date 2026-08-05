import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Shop from './pages/Shop'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Auth from './pages/Auth' 
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import { useLocation } from 'react-router-dom'


const App = () => {
  const location = useLocation()
  const isAuthPage = location.pathname === '/auth' 
  return (
    <div className='min-h-screen bg-black text-white flex flex-col'>

      <Navbar/>

      <main className='flex-1'>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/shop" element={<Shop/>} />
          <Route path="/product/:id" element={<ProductDetail/>} />
          <Route path="/cart" element={<Cart/>} />
          <Route path="/checkout" element={<Checkout/>} />
          <Route path="/auth" element={<Auth/>}/>
        </Routes>
      </main>
      {!isAuthPage && <Footer />}
    </div>
  )
}

export default App
