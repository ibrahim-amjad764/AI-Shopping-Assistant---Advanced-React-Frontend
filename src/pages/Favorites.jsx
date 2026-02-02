import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { favoritesAPI } from '../services/api'
import { Heart, ShoppingBag } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import ProductCard from '../components/Product/ProductCard'

const Favorites = () => {
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const [favorites, setFavorites] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login')
      return
    }
    fetchFavorites()
  }, [isAuthenticated, navigate])

  const fetchFavorites = async () => {
    try {
      setLoading(true)
      const data = await favoritesAPI.getAll()
      setFavorites(data.products || data || [])
    } catch (error) {
      console.error('Error fetching favorites:', error)
      setFavorites([])
    } finally {
      setLoading(false)
    }
  }

  const handleRemoveFavorite = async (productId) => {
    try {
      await favoritesAPI.remove(productId)
      setFavorites(favorites.filter((p) => p.id !== productId))
    } catch (error) {
      console.error('Error removing favorite:', error)
    }
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Heart className="w-8 h-8 text-red-500 fill-red-500" />
          <h1 className="text-3xl font-bold">My Favorites</h1>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="card animate-pulse">
              <div className="h-48 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded mt-4"></div>
            </div>
          ))}
        </div>
      ) : favorites.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {favorites.map((product) => (
            <div key={product.id} className="relative">
              <ProductCard product={product} />
              <button
                onClick={() => handleRemoveFavorite(product.id)}
                className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:bg-red-50 transition-colors z-10"
              >
                <Heart className="w-5 h-5 fill-red-500 text-red-500" />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="card text-center py-12">
          <Heart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">No Favorites Yet</h2>
          <p className="text-gray-600 mb-6">
            Start adding products to your favorites to see them here
          </p>
          <Link to="/products" className="btn-primary inline-flex items-center space-x-2">
            <ShoppingBag className="w-5 h-5" />
            <span>Browse Products</span>
          </Link>
        </div>
      )}
    </div>
  )
}

export default Favorites

