import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import { Menu, X } from 'lucide-react'

const CartIcon = ({ count }) => (
    <span className='relative'>
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-400 hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-4H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        <span className='absolute -top-2 -right-2 bg-red-500 text-white text-sm w-5 h-5 rounded-full flex items-center justify-center'>
            {count}
        </span>
    </span>
)

const Navbar = () => {
    const location = useLocation()
    const [menuOpen, setMenuOpen] = useState(false)

    const navLinks = [
        {name: 'Home', path: '/'},
        {name: 'Shop', path: '/shop'}
    ]

    const { cart } = useCart()

    const linkClass = (path) => `text-lg transition-color duration-200 ${
        location.pathname === path?
        'text-red-500 font-medium' : 'text-gray-400 hover:text-white'
    }`

  return (
    <nav className='px-4 sm:px-8 py-4 border-b border-white/10'>
        <div className='flex items-center justify-between h-12'>
            <Link to="/" className='text-xl sm:text-2xl font-bold tracking-widest text-white' onClick={() => setMenuOpen(false)}>
                RETRO <span className='text-red-500'>KICKS</span>
            </Link>

            {/* Desktop nav links — hidden below md, shown in the dropdown instead */}
            <div className='hidden md:flex gap-8'>
                {navLinks.map(link => (
                    <Link key={link.name} to={link.path} className={linkClass(link.path)}>
                        {link.name}
                    </Link>
                ))}
            </div>

            <div className='hidden md:flex items-center gap-6'>
                <Link to="/auth" className='text-sm text-gray-400 hover:text-white transition-colors'>
                    Login
                </Link>
                <Link to="/cart">
                    <CartIcon count={cart.length} />
                </Link>
            </div>

            {/* Mobile: cart stays visible, everything else moves into the hamburger menu */}
            <div className='flex md:hidden items-center gap-5'>
                <Link to="/cart">
                    <CartIcon count={cart.length} />
                </Link>
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                    className='text-white'
                >
                    {menuOpen ? <X size={26}/> : <Menu size={26}/>}
                </button>
            </div>
        </div>

        {menuOpen && (
            <div className='md:hidden flex flex-col gap-5 pt-6 pb-4'>
                {navLinks.map(link => (
                    <Link key={link.name} to={link.path} onClick={() => setMenuOpen(false)} className={linkClass(link.path)}>
                        {link.name}
                    </Link>
                ))}
                <Link to="/auth" onClick={() => setMenuOpen(false)} className='text-lg text-gray-400 hover:text-white transition-colors'>
                    Login
                </Link>
            </div>
        )}
    </nav>
  )
}

export default Navbar
