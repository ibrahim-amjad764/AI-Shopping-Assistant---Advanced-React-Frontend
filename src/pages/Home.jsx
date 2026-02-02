import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import ProductCard from '../components/Product/ProductCard'
import { productAPI } from '../services/api'
import { Sparkles } from 'lucide-react'

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchFeaturedProducts()
  }, [])

  const fetchFeaturedProducts = async () => {
    try {
      const data = await productAPI.getAll({ limit: 8, featured: true })
      setFeaturedProducts(data.products || data || [])
    } catch (error) {
      console.error('Error fetching featured products:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white rounded-lg p-12 mb-12">
        <div className="max-w-4xl">
          <div className="flex items-center space-x-2 mb-4">
            <Sparkles className="w-6 h-6" />
            <span className="text-primary-200 font-semibold">AI-Powered</span>
          </div>
          <h1 className="text-5xl font-bold mb-4">
            Find Your Perfect Product
          </h1>
          <p className="text-xl text-primary-100 mb-8">
            Compare prices, track history, and discover the best deals with
            Selectify AI - your intelligent shopping assistant.
          </p>
          <Link to="/products" className="btn-primary bg-white text-primary-600 hover:bg-gray-100 inline-block">
            Explore Products
          </Link>
        </div>
      </section>

      {/* Featured Products */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold">Featured Products</h2>
          <Link
            to="/products"
            className="text-primary-600 hover:text-primary-700 font-medium"
          >
            View All →
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="card animate-pulse">
                <div className="h-48 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded mt-4"></div>
                <div className="h-4 bg-gray-200 rounded mt-2 w-3/4"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

export default Home

