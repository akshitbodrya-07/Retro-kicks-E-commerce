import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import useProduct from '../hooks/useProduct'
import { ChevronRight, Star, Truck, RefreshCcw, ShieldCheck } from 'lucide-react'
import { Link } from 'react-router-dom'
import Button from '../components/ui/Button'
import { useCart } from '../context/CartContext'

const ProductDetail = () => {
  const {id} = useParams()
  const navigate = useNavigate()
  const { dispatch } = useCart()

  const {data, loading, error} = useProduct(id)

  const discountPrice = data?.price * 0.10
  const finalPrice = data?.price - discountPrice

  const[selectedSize, setSelectedSize] = useState(null)
  const[sizeError, setSizeError] = useState(false)

  const addCurrentItemToCart = () => {
    if (!selectedSize) {
      setSizeError(true)
      return false
    }
    setSizeError(false)
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        id: data.id,
        brand: data.brand,
        name: data.name,
        price: finalPrice,
        image: data.image,
        size: selectedSize
      }
    })
    return true
  }

  const handleAddToCart = () => {
    addCurrentItemToCart()
  }

  const handleBuyNow = () => {
    if (addCurrentItemToCart()) {
      navigate('/cart')
    }
  }

  return (
    <div className='px-4 sm:px-10 lg:px-20 py-4'>
      <div className='text-lg flex items-center gap-2 px-1 sm:px-6 flex-wrap'>
        <Link to="/" className='text-gray-500 text-sm hover:text-white '>Home</Link>
        <ChevronRight />
        <Link to="/shop" className='text-gray-500 text-sm hover:text-white'>Shop</Link>
        <ChevronRight />
        <span>{data?.name}</span>
      </div>
      <div className='grid grid-cols-1 lg:grid-cols-2 mt-5 border-b-2 border-white/10'>
        <div className='flex flex-col gap-4'>
          <div className='h-[300px] sm:h-[400px] lg:h-[500px] bg-zinc-900 rounded-xl overflow-hidden'>
            <img src={data?.image} alt={data?.name} className='w-full h-full object-cover p-8'/>
          </div>
          <div className='flex items-center gap-4 mt-4 ml-2 sm:ml-8'>
              {[1,2,3].map(i => (
                <div key={i} className='w-20 h-20 bg-zinc-900 rounded-lg overflow-hidden border border-zinc-700 cursor-pointer hover:border-red-500 transition-colors'>
                  <img src={data?.image} alt='' className='w-full h-full object-contain p-2'/>
                </div>
              ))}
          </div>
        </div>
        <div className='px-1 sm:px-8 lg:px-14 py-5 flex flex-col gap-10'>

          <div>
            <h3 className='text-red-500 tracking-widest uppercase text-xl'>{data?.brand}</h3>
            <h1 className='text-4xl sm:text-5xl lg:text-7xl text-white font-semibold'>{data?.name}</h1>
            <div className='flex items-center gap-3 text-zinc-500 mt-4'>
              <Star size={20}/>
              <h3>(128 reviews)</h3>
            </div>
            <div className='flex items-center gap-4'>
              <h1 className='text-4xl sm:text-5xl text-red-500 mt-4'>${finalPrice}</h1>
              <h3 className='text-xl text-zinc-500 line-through mt-4'>${data?.price}</h3>
            </div>
          </div>

          <div className='border-t-2 border-white/10 py-5'>
            <h3 className='text-zinc-500 tracking-widest uppercase text-sm'>Select Size (UK)</h3>
            <div className='flex items-center gap-4 mt-5 flex-wrap'>
              {data?.sizes?.map(size => (
                <div
                  key={size}
                  onClick={() => { setSelectedSize(size); setSizeError(false) }}
                  className={`flex items-center justify-center h-14 w-14 border rounded-lg cursor-pointer transition-all duration-200
                    ${selectedSize === size?
                      'border-red-500 text-red-500'
                      : 'border-zinc-500 text-zinc-500 hover:text-white hover:border-white'
                    }`}
                >
                  {size}
                </div>
              ))}
            </div>
            {sizeError && (
              <p className='text-red-500 text-sm mt-2'>Please select a size before continuing</p>
            )}
            <p className='text-lg text-zinc-500 mt-5'>{data?.description}</p>
          </div>

          <div className='flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-4 sm:gap-8 mb-2'>
            <div className='flex items-center gap-3 text-zinc-500'>
              <Truck size={30}/>
              <p>Free shipping over $150</p>
            </div>
            <div className='flex items-center gap-3 text-zinc-500'>
              <RefreshCcw size={28}/>
              <p>30 day return Policy</p>
            </div>
            <div className='flex items-center gap-3 text-zinc-500'>
              <ShieldCheck size={28}/>
              <p>Authentic guarantee</p>
            </div>
          </div>

          <div className='flex gap-4 mb-5'>
            <Button variant="primary" className='flex-1' onClick={handleAddToCart}>Add to Cart</Button>
            <Button variant="outline" className='flex-1' onClick={handleBuyNow}>Buy Now</Button>
          </div>

        </div>
      </div>

      <div className='flex flex-col gap-10 mt-10'>
        <p className='text-2xl text-white tracking-wide font-medium'>Customer Reviews</p>
        <div className='flex flex-col gap-6'>
          <div className='flex flex-col gap-2 border border-white/15 rounded-lg w-full p-5 bg-zinc-900'>
            <div className='flex items-center justify-between'>
              <h4 className='font-medium text-xl'>John D.</h4>
              <h5 className='text-zinc-500 tracking-wide'>May 2026</h5>
            </div>
            <p className='text-lg text-zinc-500 tracking-wide'>Amazing quality and exactly as described. The fit is perfect and they look even better in person.</p>
          </div>
          <div className='flex flex-col gap-2 border border-white/15 rounded-lg w-full h-28 p-5 bg-zinc-900'>
            <div className='flex items-center justify-between'>
              <h4 className='font-medium text-xl'>Sarah M.</h4>
              <h5 className='text-zinc-500 tracking-wide'>April 2026</h5>
            </div>
            <p className='text-lg text-zinc-500 tracking-wide'>Love these sneakers! Fast shipping and great packaging. Will definitely order again.</p>
          </div>
          </div>
      </div>

    </div>
  )
}

export default ProductDetail
