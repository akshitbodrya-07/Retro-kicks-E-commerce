import {Search} from 'lucide-react'
import { useState } from 'react'
import useProducts from '../hooks/useProducts'
import useDebounce from '../hooks/useDebounce'
import ProductCard from '../components/ui/ProductCard'
import SkeletonCard from '../components/ui/SkeletonCard'

const Shop = () => {

  const brands = ["All", "Nike", "Jordan", "Adidas", "New Balance"]

  const[selectedBrand, setSelectedBrand] = useState("All")
  const[search, setSearch] = useState('')

  const {data, loading, error} = useProducts()
  const debouncedSearch = useDebounce(search, 300)

  const filtered = data?.filter(product => {
    const matchBrand = selectedBrand === "All" || product.brand === selectedBrand
    const matchSearch = product.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
    product.brand.toLowerCase().includes(debouncedSearch.toLowerCase())
    return matchBrand && matchSearch
  }) 

  return (
    <div className='px-4 sm:px-10 lg:px-20 py-10 flex flex-col gap-5'>
      {/* Search Bar */}
      <div className='relative'>
        <input type="search" 
          placeholder='Search sneakers, brands...'
          value={search}
          onChange={(e) => setSearch(e.target.value)} 
          className='w-full bg-zinc-900 border border-white/10 rounded-lg py-3 pl-12 pr-4 text-white placeholder-gray-600 outline-none focus:border-red-900'/>

        <div className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-500'>
          <Search size={20}/>
        </div>
      </div>

      {/* Filter pills */}
      <div className='flex items-center gap-3 flex-wrap'>
        {brands.map(brand => (
          <button
            key={brand}
            onClick={() => setSelectedBrand(brand)}
            className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200
              ${selectedBrand === brand?
                "bg-red-500 text-white border-red-500":"border-white/10 text-gray-500 hover:border-white hover:text-white"
              }`}
          >
            {brand}
          </button>
        ))}
      </div>

      {/* Product card */}
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6'>
        {loading?(
          Array(12).fill(0).map((_,i) => <SkeletonCard key={i}/>)
        ): error?(
          <p className='text-zinc-500'>Its an error check your connection!</p>
        ):(
          filtered.map(product => (
            <ProductCard
              key= {product.id}
              id= {product.id}
              brand= {product.brand}
              name = {product.name}
              price = {product.price}
              image ={product.image}
              sizes ={product.sizes}
            />
          ))
        )}
      </div>
    </div>
  )
}

export default Shop
