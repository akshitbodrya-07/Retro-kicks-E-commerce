import { useState, useEffect } from 'react'
import { API_URL } from '../config'


const useProducts = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null) 

  useEffect(() => {
    fetch(`${API_URL}/products`)
    .then(res => {
      if(!res.ok) throw new Error("Failed to fetch Data")
        return res.json()
    })
    .then(data => {
      setData(data)
      setLoading(false)
    })
    .catch(err => {
      setError(err)
      setLoading(false)
    })
  }, [])

  return { data, loading, error }
}

export default useProducts
