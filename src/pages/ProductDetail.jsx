import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { productAPI } from '../services/api'
import PriceHistoryChart from '../components/Product/PriceHistoryChart'
import { Star, ShoppingCart, Heart, Share2, Check } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { favoritesAPI } from '../services/api'

const ProductDetail = () => {
  const { id } = useParams()
  const { isAuthenticated } = useAuth()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isFavorite, setIsFavorite] = useState(false)
  const [favoriteLoading, setFavoriteLoading] = useState(false)

  useEffect(() => {
    fetchProduct()
  }, [id])

  useEffect(() => {
    if (isAuthenticated && product?.id) {
      checkFavorite()
    }
  }, [isAuthenticated, product?.id])

  const fetchProduct = async () => {
    try {
      setLoading(true)
      const data = await productAPI.getById(id)
      setProduct(data)
    } catch (error) {
      console.error('Error fetching product:', error)
    } finally {
      setLoading(false)
    }
  }

  const checkFavorite = async () => {
    try {
      const response = await favoritesAPI.check(product.id)
      setIsFavorite(response.isFavorite)
    } catch (error) {
      console.error('Error checking favorite:', error)
    }
  }

  const handleFavoriteToggle = async () => {
    if (!isAuthenticated) {
      window.location.href = '/login'
      return
    }

    setFavoriteLoading(true)
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
      setFavoriteLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="card animate-pulse">
        <div className="h-96 bg-gray-200 rounded"></div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="card text-center py-12">
        <p className="text-gray-500 text-lg">Product not found</p>
        <Link to="/products" className="text-primary-600 mt-4 inline-block">
          Back to Products
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Product Info */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Image */}
        <div>
          <img
            src={product.image || '/placeholder-product.jpg'}
            alt={product.name}
            className="w-full h-96 object-cover rounded-lg"
          />
        </div>

        {/* Details */}
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          {product.brand && (
            <p className="text-lg text-gray-600 mb-4">{product.brand}</p>
          )}

          {product.rating && (
            <div className="flex items-center space-x-2 mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product.rating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="font-medium">{product.rating}</span>
              {product.reviewsCount && (
                <span className="text-gray-500">
                  ({product.reviewsCount} reviews)
                </span>
              )}
            </div>
          )}

          <div className="mb-6">
            <p className="text-4xl font-bold text-primary-600 mb-2">
              ₹{product.price?.toLocaleString()}
            </p>
            {product.originalPrice && product.originalPrice > product.price && (
              <>
                <p className="text-xl text-gray-500 line-through">
                  ₹{product.originalPrice.toLocaleString()}
                </p>
                <p className="text-green-600 font-semibold">
                  {Math.round(
                    ((product.originalPrice - product.price) /
                      product.originalPrice) *
                      100
                  )}
                  % OFF
                </p>
              </>
            )}
          </div>

          {/* Actions */}
          <div className="flex space-x-4 mb-6">
            <button className="btn-primary flex-1 flex items-center justify-center space-x-2">
              <ShoppingCart className="w-5 h-5" />
              <span>Add to Cart</span>
            </button>
            {isAuthenticated && (
              <button
                onClick={handleFavoriteToggle}
                disabled={favoriteLoading}
                className={`px-4 py-2 rounded-lg border-2 flex items-center space-x-2 ${
                  isFavorite
                    ? 'border-red-500 text-red-500 bg-red-50'
                    : 'border-gray-300 text-gray-700 hover:border-red-500 hover:text-red-500'
                }`}
              >
                <Heart
                  className={`w-5 h-5 ${
                    isFavorite ? 'fill-red-500' : ''
                  }`}
                />
                <span>{isFavorite ? 'Favorited' : 'Add to Favorites'}</span>
              </button>
            )}
            <button className="px-4 py-2 rounded-lg border-2 border-gray-300 text-gray-700 hover:border-primary-500 hover:text-primary-500">
              <Share2 className="w-5 h-5" />
            </button>
          </div>

          {/* Specifications */}
          {product.specs && (
            <div className="border-t pt-6">
              <h3 className="font-semibold text-lg mb-4">Specifications</h3>
              <div className="grid grid-cols-2 gap-4">
                {product.specs.ram && (
                  <div>
                    <span className="text-gray-600">RAM:</span>
                    <span className="ml-2 font-medium">{product.specs.ram}</span>
                  </div>
                )}
                {product.specs.storage && (
                  <div>
                    <span className="text-gray-600">Storage:</span>
                    <span className="ml-2 font-medium">
                      {product.specs.storage}
                    </span>
                  </div>
                )}
                {product.specs.battery && (
                  <div>
                    <span className="text-gray-600">Battery:</span>
                    <span className="ml-2 font-medium">
                      {product.specs.battery}
                    </span>
                  </div>
                )}
                {product.specs.camera && (
                  <div>
                    <span className="text-gray-600">Camera:</span>
                    <span className="ml-2 font-medium">
                      {product.specs.camera}
                    </span>
                  </div>
                )}
                {product.specs.display && (
                  <div>
                    <span className="text-gray-600">Display:</span>
                    <span className="ml-2 font-medium">
                      {product.specs.display}
                    </span>
                  </div>
                )}
                {product.specs.processor && (
                  <div>
                    <span className="text-gray-600">Processor:</span>
                    <span className="ml-2 font-medium">
                      {product.specs.processor}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Price History Chart */}
      <PriceHistoryChart productId={id} />

      {/* Description */}
      {product.description && (
        <div className="card">
          <h2 className="text-2xl font-bold mb-4">Description</h2>
          <p className="text-gray-700 leading-relaxed">{product.description}</p>
        </div>
      )}
    </div>
  )
}

export default ProductDetail

