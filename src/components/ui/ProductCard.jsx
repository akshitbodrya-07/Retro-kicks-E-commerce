import React, { useState } from 'react'
import Button from './Button'
import {Link} from 'react-router-dom'
import { useCart } from '../../context/CartContext'

const ProductCard = ({id,brand, name, price, image}) => {

    const[liked, setLiked] = useState(false)

    const { dispatch } = useCart()

    const handleAddToCart = () => {
        dispatch({
            type: 'ADD_ITEM',
            payload: {id, brand, name, price, image}
        })
    }

  return (
    <div className='bg-zinc-900 border border-white/10 rounded-xl overflow-hidden'>
        <Link to={`/product/${id}`}>
        <div className='relative h-48 bg-zinc-800'>
            <img src={image} alt={name} className='w-full h-full object-cover'/>
            <svg onClick={() => setLiked(!liked)}
                xmlns="http://www.w3.org/2000/svg" 
                className={`w-6 h-6 absolute -bottom-10 right-4 cursor-pointer transition-colors duration-200 ${liked ? 'text-red-500' : 'text-gray-500 hover:text-red-400'}`} 
                fill={liked? "red" : "none"} 
                viewBox="0 0 24 24" 
                stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
        </div>
        </Link>
        <div className='p-4 flex flex-col gap-2'>
            <div className='text-xs text-gray-500 tracking-widest uppercase'>{brand}</div>
            <div className='text-l font-medium text-white'>{name}</div>
            <div className='text-red-500 font-medium'>${price}</div>
            <Button variant="primary" className='w-full hover:bg-red-400' onClick={handleAddToCart}>Add to Cart</Button>
        </div>
    </div>
  )
}

export default ProductCard
