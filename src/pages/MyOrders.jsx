import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import useProducts from '../hooks/useProducts'
import { API_URL } from '../config'

const MyOrders = () => {
  const { token } = useAuth()
  const navigate = useNavigate()
  const { data: products, loading: productsLoading } = useProducts()

  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!token) return
    fetch(`${API_URL}/my-orders`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    .then(res => {
      if (!res.ok) throw new Error('Failed to load your orders')
      return res.json()
    })
    .then(data => {
      setOrders(data)
      setLoading(false)
    })
    .catch(err => {
      setError(err.message)
      setLoading(false)
    })
  }, [token])

  const findProduct = (productId) => products?.find(p => p.id === productId)

  if (!token) {
    return (
      <div className='px-16 py-20 flex flex-col items-center text-center gap-4'>
        <h1 className='text-3xl font-medium'>Please log in to view your orders</h1>
        <button
          onClick={() => navigate('/auth')}
          className='bg-red-500 text-white px-6 py-2 rounded-lg text-sm hover:bg-red-400 transition-colors mt-4'
        >
          Go to Login
        </button>
      </div>
    )
  }

  if (loading || productsLoading) {
    return <div className='px-16 py-20 text-center text-zinc-500'>Loading your orders...</div>
  }

  if (error) {
    return <div className='px-16 py-20 text-center text-red-500'>{error}</div>
  }

  if (orders.length === 0) {
    return (
      <div className='px-16 py-20 flex flex-col items-center text-center gap-4'>
        <h1 className='text-3xl font-medium'>No orders yet</h1>
        <button
          onClick={() => navigate('/shop')}
          className='bg-red-500 text-white px-6 py-2 rounded-lg text-sm hover:bg-red-400 transition-colors mt-4'
        >
          Start Shopping
        </button>
      </div>
    )
  }

  return (
    <div className='px-16 py-10'>
      <h1 className='text-4xl font-medium mb-10'>My Orders</h1>
      <div className='flex flex-col gap-6'>
        {orders.map(order => (
          <div key={order.id} className='bg-zinc-900 rounded-xl border border-white/15 px-8 py-6'>
            <div className='flex justify-between items-center mb-4 text-sm text-zinc-500'>
              <p>Order #{order.id} — {new Date(order.created_at).toLocaleDateString()}</p>
              <p className='text-white text-lg'>${order.total_price.toFixed(2)}</p>
            </div>
            <div className='flex flex-col gap-3'>
              {order.items.map(item => {
                const product = findProduct(item.product_id)
                return (
                  <div key={item.id} className='flex items-center gap-4'>
                    {product && (
                      <img src={product.image} alt={product.name} className='w-14 h-14 object-cover rounded' />
                    )}
                    <div className='flex-1 min-w-0'>
                      <p className='truncate'>{product ? product.name : `Product #${item.product_id}`}</p>
                      <p className='text-zinc-500 text-sm'>Size: UK {item.size} · Qty: {item.quantity}</p>
                    </div>
                    <p className='text-red-500 shrink-0'>${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyOrders