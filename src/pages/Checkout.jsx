import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCart } from '../context/CartContext'

// Shipping details schema. Kept in the same style as Auth.jsx's zod schema
// so validation errors render the same way across the app.
const shippingSchema = z.object({
  fullName: z.string().min(2, 'Enter your full name'),
  address: z.string().min(5, 'Enter your street address'),
  city: z.string().min(2, 'Enter your city'),
  postalCode: z.string().min(3, 'Enter a valid postal code'),
  country: z.string().min(2, 'Enter your country')
})

const Checkout = () => {
  const { cart, dispatch } = useCart()
  const navigate = useNavigate()
  const [placed, setPlaced] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(shippingSchema)
  })

  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0)
  const tax = subtotal * 0.08
  const total = subtotal + tax

  // There's no backend yet, so "placing an order" can't actually persist
  // anywhere — this just proves the flow end to end (validate address,
  // review order, confirm) and clears the cart, the same way a real
  // checkout would once it succeeds. Lesson 6 (checkout + orders) replaces
  // this with a real POST /orders call, and lesson 8 rewires this exact
  // form to call it.
  const onSubmit = () => {
    setPlaced(true)
    dispatch({ type: 'CLEAR_CART' })
  }

  if (placed) {
    return (
      <div className='px-16 py-20 flex flex-col items-center text-center gap-4'>
        <h1 className='text-4xl font-medium'>Order placed 🎉</h1>
        <p className='text-zinc-500 max-w-md'>
          This is a placeholder confirmation — there's no backend yet to actually
          save this order. Once the API exists, this page will submit here for real.
        </p>
        <button
          onClick={() => navigate('/shop')}
          className='bg-red-500 text-white px-6 py-2 rounded-lg text-sm hover:bg-red-400 transition-colors mt-4'
        >
          Continue Shopping
        </button>
      </div>
    )
  }

  if (cart.length === 0) {
    return (
      <div className='px-16 py-20 flex flex-col items-center text-center gap-4'>
        <h1 className='text-3xl font-medium'>Your cart is empty</h1>
        <button
          onClick={() => navigate('/shop')}
          className='bg-red-500 text-white px-6 py-2 rounded-lg text-sm hover:bg-red-400 transition-colors mt-4'
        >
          Continue Shopping
        </button>
      </div>
    )
  }

  return (
    <div className='px-16 py-5'>
      <h1 className='text-4xl font-medium mb-10'>Checkout</h1>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-10'>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-3'>
          <h3 className='text-xl font-medium mb-2'>Shipping Details</h3>

          <label className='text-sm text-zinc-500 uppercase tracking-wide'>Full Name</label>
          <input
            type='text'
            placeholder='John Doe'
            className='px-4 py-2 bg-zinc-800 border border-zinc-700 rounded'
            {...register('fullName')}
          />
          {errors.fullName && <p className='text-red-500 text-xs'>{errors.fullName.message}</p>}

          <label className='text-sm text-zinc-500 uppercase tracking-wide mt-2'>Address</label>
          <input
            type='text'
            placeholder='Street and house number'
            className='px-4 py-2 bg-zinc-800 border border-zinc-700 rounded'
            {...register('address')}
          />
          {errors.address && <p className='text-red-500 text-xs'>{errors.address.message}</p>}

          <div className='grid grid-cols-2 gap-3'>
            <div className='flex flex-col gap-1'>
              <label className='text-sm text-zinc-500 uppercase tracking-wide mt-2'>City</label>
              <input
                type='text'
                className='px-4 py-2 bg-zinc-800 border border-zinc-700 rounded'
                {...register('city')}
              />
              {errors.city && <p className='text-red-500 text-xs'>{errors.city.message}</p>}
            </div>
            <div className='flex flex-col gap-1'>
              <label className='text-sm text-zinc-500 uppercase tracking-wide mt-2'>Postal Code</label>
              <input
                type='text'
                className='px-4 py-2 bg-zinc-800 border border-zinc-700 rounded'
                {...register('postalCode')}
              />
              {errors.postalCode && <p className='text-red-500 text-xs'>{errors.postalCode.message}</p>}
            </div>
          </div>

          <label className='text-sm text-zinc-500 uppercase tracking-wide mt-2'>Country</label>
          <input
            type='text'
            className='px-4 py-2 bg-zinc-800 border border-zinc-700 rounded'
            {...register('country')}
          />
          {errors.country && <p className='text-red-500 text-xs'>{errors.country.message}</p>}

          <button type='submit' className='bg-red-500 p-3 rounded mt-6 hover:bg-red-400 transition-colors'>
            Place Order — ${total.toFixed(2)}
          </button>
        </form>

        <div className='bg-zinc-900 rounded-xl border border-white/15 px-8 py-8 h-fit'>
          <h3 className='text-xl font-medium mb-4'>Order Summary</h3>
          <div className='flex flex-col gap-4'>
            {cart.map(item => (
              <div key={`${item.id}-${item.size}`} className='flex items-center justify-between gap-4 text-sm'>
                <div className='min-w-0'>
                  <p className='truncate'>{item.name} <span className='text-zinc-500'>x{item.quantity}</span></p>
                  <p className='text-zinc-500'>Size: UK {item.size}</p>
                </div>
                <p className='text-red-500 shrink-0'>${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
          </div>
          <div className='border-t border-t-white/15 pt-4 mt-6 flex flex-col gap-2 text-zinc-500'>
            <div className='flex justify-between'><p>Subtotal</p><p>${subtotal.toFixed(2)}</p></div>
            <div className='flex justify-between'><p>Tax (8%)</p><p>${tax.toFixed(2)}</p></div>
            <div className='flex justify-between text-white text-lg mt-2'><p>Total</p><p>${total.toFixed(2)}</p></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout
