import { useState, useEffect } from 'react'
import products from '../data/products'

// Looks up a single product by id from the bundled catalog, mirroring the
// shape of useFetch/useProducts. Replaces the old
// http://localhost:3001/products/:id call, which only worked when the
// developer's local json-server was running.
const useProduct = (id) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      const found = products.find(p => String(p.id) === String(id))
      if (found) {
        setData(found)
        setError(null)
      } else {
        setData(null)
        setError(new Error('Product not found'))
      }
      setLoading(false)
    }, 400)
    return () => clearTimeout(timer)
  }, [id])

  return { data, loading, error }
}

export default useProduct
