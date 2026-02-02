import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import ProductCard from '../components/Product/ProductCard'
import FilterSidebar from '../components/Filter/FilterSidebar'
import { productAPI } from '../services/api'
import { SlidersHorizontal, Grid, List } from 'lucide-react'

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({})
  const [viewMode, setViewMode] = useState('grid')

  useEffect(() => {
    const query = searchParams.get('q') || ''
    fetchProducts(query, filters)
  }, [searchParams, filters])

  const fetchProducts = async (query, appliedFilters) => {
    try {
      setLoading(true)
      let data

      if (query) {
        // Use search API with filters
        const searchFilters = {
          ...(appliedFilters.minPrice && { minPrice: appliedFilters.minPrice }),
          ...(appliedFilters.maxPrice && { maxPrice: appliedFilters.maxPrice }),
          ...(appliedFilters.brand?.length > 0 && {
            brand: appliedFilters.brand.join(','),
          }),
          ...(appliedFilters.minRating && { minRating: appliedFilters.minRating }),
          ...(appliedFilters.storage?.length > 0 && {
            storage: appliedFilters.storage.join(','),
          }),
          ...(appliedFilters.ram?.length > 0 && {
            ram: appliedFilters.ram.join(','),
          }),
          ...(appliedFilters.battery && { battery: appliedFilters.battery }),
        }
        data = await productAPI.search(query, searchFilters)
      } else {
        // Use regular products API
        data = await productAPI.getAll()
      }

      setProducts(data.products || data || [])
    } catch (error) {
      console.error('Error fetching products:', error)
      setProducts([])
    } finally {
      setLoading(false)
    }
  }

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters)
  }

  return (
    <div className="flex gap-6">
      {/* Filter Sidebar - Desktop */}
      <div className="hidden md:block w-80 flex-shrink-0">
        <FilterSidebar
          isOpen={true}
          onClose={() => setShowFilters(false)}
          onFilterChange={handleFilterChange}
          filters={filters}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">Products</h1>
            <p className="text-gray-600">
              {products.length} products found
            </p>
          </div>
          <div className="flex items-center space-x-4">
            {/* Mobile Filter Button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden btn-secondary flex items-center space-x-2"
            >
              <SlidersHorizontal className="w-5 h-5" />
              <span>Filters</span>
            </button>

            {/* View Mode Toggle */}
            <div className="flex items-center space-x-2 border border-gray-300 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded ${
                  viewMode === 'grid'
                    ? 'bg-primary-600 text-white'
                    : 'text-gray-600'
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded ${
                  viewMode === 'list'
                    ? 'bg-primary-600 text-white'
                    : 'text-gray-600'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Filter Sidebar */}
        {showFilters && (
          <div className="md:hidden mb-6">
            <FilterSidebar
              isOpen={showFilters}
              onClose={() => setShowFilters(false)}
              onFilterChange={handleFilterChange}
              filters={filters}
            />
          </div>
        )}

        {/* Products Grid/List */}
        {loading ? (
          <div
            className={
              viewMode === 'grid'
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
                : 'space-y-4'
            }
          >
            {[...Array(6)].map((_, i) => (
              <div key={i} className="card animate-pulse">
                <div className="h-48 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded mt-4"></div>
              </div>
            ))}
          </div>
        ) : products.length > 0 ? (
          <div
            className={
              viewMode === 'grid'
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
                : 'space-y-4'
            }
          >
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="card text-center py-12">
            <p className="text-gray-500 text-lg">No products found</p>
            <p className="text-gray-400 mt-2">
              Try adjusting your filters or search query
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Products

