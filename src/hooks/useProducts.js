import { useState, useEffect } from 'react'
import products from '../data/products'

// Serves the bundled product catalog with a small simulated delay so the
// existing skeleton-loading UI still has something to show. This replaces
// the old dependency on a local json-server instance (http://localhost:3001),
// which only ever worked on the developer's own machine and always failed
// once the app was deployed.
const useProducts = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null) // eslint-disable-line no-unused-vars

  useEffect(() => {
    const timer = setTimeout(() => {
      setData(products)
      setLoading(false)
    }, 400)
    return () => clearTimeout(timer)
  }, [])

  return { data, loading, error }
}

export default useProducts
