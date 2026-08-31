

const Footer = () => {
  return (
    <footer className='bg-black border-t border-white/20 py-12 px-6 sm:px-8'>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-10 sm:px-10">
            <div className="flex flex-col gap-4 col-span-2 md:col-span-1">
                <h1 className='text-2xl font-bold tracking-widest text-white whitespace-nowrap'>RETRO <span className='text-red-500'>KICKS</span></h1>
                <p className='text-sm text-gray-500 max-w-xs'>Premium vintage sneakers from the world's greatest brands.</p>
            </div>
            <div className="flex flex-col gap-4">
                <ol className="text-sm text-gray-500">
                    <li className="text-sm font-semibold tracking-widest text-white mb-2">SHOP</li>
                    <li>New Arrivals</li>
                    <li>Nikes</li>
                    <li>Adidas</li>
                    <li>Jordan</li>
                    <li>New Balance</li>
                </ol>
            </div>
            <div className="flex flex-col gap-4">
                <ol className="text-sm text-gray-500">
                    <li className="text-sm font-semibold tracking-widest text-white mb-2">COMPANY</li>
                    <li>About Us</li>
                    <li>Careers</li>
                    <li>Press</li>
                    <li>Blog</li>
                </ol>
            </div>
            <div className="flex flex-col gap-4">
                <ol className="text-sm text-gray-500">
                    <li className="text-sm font-semibold tracking-widest text-white mb-2">SUPPORT</li>
                    <li>FAQ</li>
                    <li>Shipping</li>
                    <li>Returns</li>
                    <li>Size Guide</li>
                    <li>Contact Us</li>
                </ol>
            </div>
        </div>
        <div className="flex flex-col sm:flex-row items-center sm:justify-between gap-2 w-full border-t border-white/10 mt-8 pt-4">
            <p className="text-gray-600 text-xs">© 2026 Retro Kicks. All rights reserved.</p>
            <p className="text-gray-600 text-xs">Privacy Policy · Terms of Service</p>
        </div>
    </footer>
  )
}

export default Footer
