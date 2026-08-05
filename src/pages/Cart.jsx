import React from 'react'
import { useCart } from '../context/CartContext'
import { Trash2, Truck, RefreshCcw, ShieldCheck } from 'lucide-react'

const Cart = () => {
  const { cart, dispatch } = useCart()

  const subtotal = cart.reduce((total, item) => {
    return total + (item.price * item.quantity)
  }, 0)

  const tax = subtotal * 0.08

  const total = subtotal + tax

  return (
    <div>
      <div className=' px-16 py-5'>
        <h1 className='text-4xl font-medium'>Your Cart</h1>
        <h3 className='text-zinc-500 tracking-wide mt-2 ml-1'>{cart.length} items in your cart</h3>

        <div className='grid grid-cols-2 gap-10 mt-10'>
          <div>
            {cart.map(item => (
              <div key={item.id} className='flex items-center gap-10 mb-6 border border-white/15 bg-zinc-900 rounded-xl px-5 py-3'>
                <img src={item.image} alt={item.name} className='w-32 h-32 object-contain rounded bg-zinc-800 p-2'/>
                <div className='w-full'>
                  <h4 className='text-sm text-zinc-500 tracking-widest uppercase'>{item.brand}</h4>
                  <h3 className='text-2xl font-medium tracking-wide'>{item.name}</h3>
                  <p className='text-sm text-zinc-500 mt-1'>Size: UK</p>
                  <div className='flex items-center justify-between gap-5 mt-3'>
                    <div className='flex gap-2'>
                      <button 
                      onClick={() => dispatch({
                        type: 'UPDATE_QTY',
                        payload: {id: item.id, quantity: item.quantity + 1}
                      })}
                      className='w-8 h-8 flex items-center justify-center border border-zinc-500 hover:text-red-500 cursor-pointer hover:border-red-500'
                      >
                        +
                      </button>
                      <span className='w-8 h-8 flex items-center justify-center'>{item.quantity}</span>
                      <button
                      onClick={() => {
                        if(item.quantity > 1){
                          dispatch({
                          type: 'UPDATE_QTY',
                          payload: {id: item.id, quantity: item.quantity - 1}
                          })
                        }else{
                          dispatch({
                            type: 'REMOVE_ITEM',
                            payload: {id:item.id}
                          })
                        }
                      }}
                      className='w-8 h-8 flex items-center justify-center border border-zinc-500 hover:text-red-500 cursor-pointer hover:border-red-500'
                      >
                        -
                      </button>
                    </div>
                    <div className='flex items-center gap-6'>
                      <h3 className='text-xl text-red-500 font-medium'>${item.price}</h3>
                      <button 
                      onClick={() => dispatch({
                        type: 'REMOVE_ITEM',
                        payload: {id:item.id}
                      })}
                      className='flex items-center gap-2 text-zinc-500 hover:text-red-500 cursor-pointer'>
                        <Trash2 size={15}/> 
                        <p>Remove</p>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className='bg-zinc-900 rounded-xl border border-white/15 px-10 py-8'>
            <div>
              <h1 className='text-3xl tracking-wide'>Order Summary</h1>
              <div className='flex items-center justify-between mt-5 text-zinc-500'>
                <p>Subtotal</p>
                <p>${subtotal}</p>
              </div>
              <div className='flex items-center justify-between mt-5 text-zinc-500'>
                <p>Shipping</p>
                <p className='text-green-500'>Free</p>
              </div>
              <div className='flex items-center justify-between mt-5 text-zinc-500'>
                <p>Tax(8%)</p>
                <p>${tax.toFixed(2)}</p>
              </div>
            </div>

            <div className='border-t border-t-white/15 pt-4 mt-4'>
              <div className='flex items-center justify-between text-xl'>
                <p>Total</p>
                <p>${total.toFixed(2)}</p>
              </div>
              <div className='flex gap-2 mt-8'>
                <input 
                  type="text" 
                  placeholder='Promo code...' 
                  className='flex-1 bg-zinc-800 border border-white/10 rounded-lg px-4 py-2 text-sm text-white placeholder-zinc-500 outline-none'
                />
                <button className='bg-zinc-700 text-white px-4 py-2 rounded-lg text-sm hover:bg-zinc-600 transition-colors'>
                  Apply
                </button>
              </div>
              <div className='flex gap-2 mt-10'>
                <button className='flex-1 bg-red-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-400 transition-colors'>
                  Proceed to Checkout
                </button>
                <button className='flex-1 bg-zinc-700 text-white px-4 py-2 rounded-lg text-sm hover:bg-zinc-600 transition-colors'>
                  Continue Shopping
                </button>
              </div>
            </div>

            <div className='border-t border-t-white/15 pt-4 mt-14'>
              <div className='flex flex-col gap-6 text-zinc-500 text-lg mt-5'>
                <div className='flex items-center gap-4'>
                  <Truck size={20}/>
                  <p>Free shipping on orders over $90</p>
                </div>

                <div className='flex items-center gap-4'>
                  <RefreshCcw size={20}/>
                  <p>30 day return policy</p>
                </div>

                <div className='flex items-center gap-4'>
                  <ShieldCheck size={20}/>
                  <p>Secure checkout</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
