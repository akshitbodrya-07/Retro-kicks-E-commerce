import { useState, useEffect } from 'react'
import { API_URL } from '../config'


const useProduct = (id) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(true)
    fetch(`${API_URL}/products/${id}`)
    .then(res => {
      if(!res.ok) throw new Error("Product not found")
        return res.json()
    })
    .then(data => {
      setData(data)
      setError(null)
      setLoading(false)
    })
    .catch(err => {
      setData(null)
      setError(err)
      setLoading(false)
    })
  }, [id])

  return { data, loading, error }
}

export default useProduct
