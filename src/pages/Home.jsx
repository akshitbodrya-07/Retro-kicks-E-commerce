import React from 'react'
import ProductCard from '../components/ui/ProductCard'
import SkeletonCard from '../components/ui/SkeletonCard'
import Button from '../components/ui/Button'
import { Link } from 'react-router-dom'
import useProducts from '../hooks/useProducts'

const Home = () => {
  const brands = ["All", "Nike", "Jordan", "Adidas", "New Balance"]
  

  const {data, loading, error} = useProducts()

  return (
    <div className='px-16'>
      {/* Hero section */}
      <div className='flex items-center justify-between px-12 py-10 min-h-[650px]'>
        <div className='w-1/2 flex flex-col gap-10'>
          <div className='w-fit px-3 py-1 bg-red-950 bg-transparent opacity-100 border-2 border-red-900 rounded-full mt-3'>
            <p className='text-red-500 tracking-widest'>✦ NEW ARRIVALS 2026</p>
          </div>
          <div>
            <h1 className='text-7xl'>Step Into</h1>
            <h1 className='text-7xl mt-4'><span className='text-red-500 text-7xl'>Retro</span> Style</h1>
            <p className='text-l text-zinc-500 mt-4 tracking-wide'>Premium vintage sneakers from Nike, Adidas, Jordan & New Balance.</p>
          </div>
          <div className='flex items-center gap-8'>
            <Link to = "/shop">
              <Button variant = "primary">Shop Now</Button>
            </Link>
            <Button variant = "outline">View Lookbook</Button>
          </div>
            <div className='flex items-center gap-12 mt-16 border-t-2 border-white/10 pt-12'>
            <div>
              <h1 className='text-3xl font-semibold'>500+</h1>
              <h3 className='text-zinc-500 tracking-widest'>SNEAKERS</h3>
            </div>
            <div>
              <h1 className='text-3xl font-semibold'>4</h1>
              <h3 className='text-zinc-500 tracking-widest'>BRANDS</h3>
            </div>
            <div>
              <h1 className='text-3xl font-semibold'>10K+</h1>
              <h3 className='text-zinc-500 tracking-widest'>CUSTOMERS</h3>
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-center relative pt-10">
            <img 
              src="https://media.cgtrader.com/variants/93wN6mvMLab67Mj32DL9XUqf/78add9c2f02fbd73a43ffb3970be38683c5f15eff6ca849dc78c644f4ff9ce1b/Jordans_render_1.webp" 
              alt="Hero sneaker"
              className="w-[900px] object-contain mix-blend-screen"
              style={{
                    maskImage: 'radial-gradient(ellipse 80% 70% at 50% 60%, black 40%, transparent 100%)'
                    }}
            />
          </div>
      </div>
      {/* Category section */}
      <div className='px-12 py-6 flex items-center gap-3  border-2 border-white/10 pt-8'>
        {brands.map(brand => (
          <button
            key={brand}
            className='px-4 py-2 rounded-full text-sm font-medium border border-white/10 text-gray-500 hover:border-white hover:text-white transition-all duration-200'
          >
            {brand}
          </button>
        ))}
      </div>
      {/* Trending section */}
      <div className='px-12 py-10'>
        <div className='flex items-center justify-between mb-8'>
          <h1 className='text-3xl font-semibold text-white'>Trending Now</h1>
          <Link to="/shop" className='text-red-500 text-sm'>
            View All →
          </Link>
        </div>

        <div className='grid grid-cols-4 gap-6'>
          {loading?(
            Array(12).fill(0).map((_,i) => <SkeletonCard key={i}/>)
          ): error?(
            <p className='text-zinc-500'>Its an error check your connection!</p>
          ):(
            data?.slice(0,4).map(product => (
              <ProductCard
                key= {product.id}
                id= {product.id}
                brand= {product.brand}
                name = {product.name}
                price = {product.price}
                image ={product.image}
              />
            ))
          )}
        </div>
      </div>
      {/* New Arrival section */}
      <div className='flex items-center justify-between px-12 py-10 rounded-2xl mx-12 mb-12 border border-red-500/20'
        style={{background: 'linear-gradient(135deg, #1a0505, #0a0a0a)'}}
      >
        <div className='flex flex-col gap-4 px-4 py-4'>
          <h3 className='text-red-500 tracking-widest'>🔥 Just Dropped</h3>
          <h1 className='text-5xl font-semibold text-white'>New Arrivals Just Landed</h1>
          <p className='text-l text-zinc-500 tracking-wide'>Fresh styles from Nike, Jordan, Adidas & New Balance. Limited stock — shop before they're gone.</p>
        </div>
        <div className='flex flex-col gap-2 items-center justify-center'>
          <Button variant="primary">Shop New Arrivals</Button>
          <p className='text-sm text-zinc-500'>Free shipping on orders over $150</p>
        </div>
      </div>
      
    </div>
  )
}

export default Home
