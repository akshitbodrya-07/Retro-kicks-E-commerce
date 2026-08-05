import{ Link, useLocation } from 'react-router-dom'
import { useCart } from '../../context/CartContext'

const Navbar = () => {
    const location = useLocation()

    const navLinks = [
        {name: 'Home', path: '/'},
        {name: 'Shop', path: '/shop'}
    ]

    const { cart } = useCart()

  return (
    <nav className='flex items-center justify-between h-20 px-8 py-4 border-b border-white/10'>

        <Link to="/" className='text-2xl font-bold tracking-widest text-white'>RETRO <span className='text-red-500'>KICKS</span></Link>

        <div className='flex gap-8'>
            {navLinks.map(link => (
                <Link 
                    key={link.name}
                    to={link.path}
                    className={`text-lg transition-color duration-200 ${
                        location.pathname === link.path? 
                        'text-red-500 font-medium' : 'text-gray-400 hover:text-white'
                    }`}
                >
                    {link.name}
                </Link>
            ))}
            
        </div>

        <div className='flex items-center gap-6'>
            <Link to="/auth" className='text-sm text-gray-400 hover:text-white transition-colors'>
                Login
            </Link>

            <Link to="/cart" className='relative'>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-400 hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-4H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span className='absolute -top-2 -right-2 bg-red-500 text-white text-sm w-5 h-5 rounded-full flex items-center justify-center'>
                    {cart.length}
                </span>
            </Link>
            
        </div>
      
    </nav>
  )
}

export default Navbar
