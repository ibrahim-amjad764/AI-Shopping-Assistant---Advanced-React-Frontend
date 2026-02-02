import { Link, useNavigate } from 'react-router-dom'
import { Heart, Star, ShoppingCart, GitCompare } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import { favoritesAPI } from '../../services/api'

const ProductCard = ({ product }) => {
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const [isFavorite, setIsFavorite] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (isAuthenticated && product.id) {
      checkFavorite()
    }
  }, [isAuthenticated, product.id])

  const checkFavorite = async () => {
    try {
      const response = await favoritesAPI.check(product.id)
      setIsFavorite(response.isFavorite)
    } catch (error) {
      console.error('Error checking favorite:', error)
    }
  }

  const handleFavoriteToggle = async (e) => {
    e.preventDefault()
    e.stopPropagation()

    if (!isAuthenticated) {
      window.location.href = '/login'
      return
    }

    setLoading(true)
    try {
      if (isFavorite) {
        await favoritesAPI.remove(product.id)
        setIsFavorite(false)
      } else {
        await favoritesAPI.add(product.id)
        setIsFavorite(true)
      }
    } catch (error) {
      console.error('Error toggling favorite:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCompare = (e) => {
    e.preventDefault()
    e.stopPropagation()

    const compareList = JSON.parse(localStorage.getItem('compareList') || '[]')
    
    if (compareList.length >= 3) {
      alert('You can compare maximum 3 products at a time')
      return
    }

    if (compareList.includes(product.id)) {
      alert('Product already in compare list')
      return
    }

    compareList.push(product.id)
    localStorage.setItem('compareList', JSON.stringify(compareList))
    alert('Product added to compare!')
    navigate('/compare')
  }

  return (
    <Link
      to={`/products/${product.id}`}
      className="card hover:shadow-lg transition-shadow duration-300 group"
    >
      <div className="relative">
        <img
          src={product.image || '/placeholder-product.jpg'}
          alt={product.name}
          className="w-full h-48 object-cover rounded-t-lg"
        />
        {isAuthenticated && (
          <button
            onClick={handleFavoriteToggle}
            disabled={loading}
            className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
          >
            <Heart
              className={`w-5 h-5 ${
                isFavorite
                  ? 'fill-red-500 text-red-500'
                  : 'text-gray-400 group-hover:text-red-500'
              }`}
            />
          </button>
        )}
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-2">
          {product.name}
        </h3>
        {product.brand && (
          <p className="text-sm text-gray-500 mb-2">{product.brand}</p>
        )}

        {product.rating && (
          <div className="flex items-center space-x-1 mb-2">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{product.rating}</span>
            {product.reviewsCount && (
              <span className="text-sm text-gray-500">
                ({product.reviewsCount})
              </span>
            )}
          </div>
        )}

        <div className="flex items-center justify-between mt-4">
          <div>
            <p className="text-2xl font-bold text-primary-600">
              ₹{product.price?.toLocaleString()}
            </p>
            {product.originalPrice && product.originalPrice > product.price && (
              <p className="text-sm text-gray-500 line-through">
                ₹{product.originalPrice.toLocaleString()}
              </p>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleCompare}
              className="px-3 py-2 border border-primary-600 text-primary-600 rounded-lg hover:bg-primary-50 transition-colors flex items-center space-x-1"
              title="Add to Compare"
            >
              <GitCompare className="w-4 h-4" />
            </button>
            <button
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
              }}
              className="btn-primary flex items-center space-x-1"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>Add</span>
            </button>
          </div>
        </div>

        {product.specs && (
          <div className="mt-3 pt-3 border-t border-gray-200">
            <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
              {product.specs.ram && <div>RAM: {product.specs.ram}</div>}
              {product.specs.storage && (
                <div>Storage: {product.specs.storage}</div>
              )}
              {product.specs.battery && (
                <div>Battery: {product.specs.battery}</div>
              )}
            </div>
          </div>
        )}
      </div>
    </Link>
  )
}

export default ProductCard

