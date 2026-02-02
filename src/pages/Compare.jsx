import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { productAPI } from '../services/api'
import { X, Plus, Trash2 } from 'lucide-react'
import ProductCard from '../components/Product/ProductCard'

const Compare = () => {
  const [compareList, setCompareList] = useState([])
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Load from localStorage
    const saved = localStorage.getItem('compareList')
    if (saved) {
      const ids = JSON.parse(saved)
      setCompareList(ids)
      fetchProducts(ids)
    }
  }, [])

  const fetchProducts = async (ids) => {
    if (ids.length === 0) {
      setProducts([])
      return
    }

    try {
      setLoading(true)
      const promises = ids.map((id) => productAPI.getById(id))
      const results = await Promise.all(promises)
      setProducts(results)
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setLoading(false)
    }
  }

  const addToCompare = (productId) => {
    if (compareList.length >= 3) {
      alert('You can compare maximum 3 products at a time')
      return
    }

    if (compareList.includes(productId)) {
      alert('Product already in compare list')
      return
    }

    const newList = [...compareList, productId]
    setCompareList(newList)
    localStorage.setItem('compareList', JSON.stringify(newList))
    fetchProducts(newList)
  }

  const removeFromCompare = (productId) => {
    const newList = compareList.filter((id) => id !== productId)
    setCompareList(newList)
    localStorage.setItem('compareList', JSON.stringify(newList))
    fetchProducts(newList)
  }

  const clearCompare = () => {
    setCompareList([])
    setProducts([])
    localStorage.removeItem('compareList')
  }

  const getSpecValue = (product, key) => {
    return product.specs?.[key] || 'N/A'
  }

  if (products.length === 0) {
    return (
      <div className="card text-center py-12">
        <Plus className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-2">No Products to Compare</h2>
        <p className="text-gray-600 mb-6">
          Add products to compare by clicking the "Compare" button on product
          cards
        </p>
        <Link to="/products" className="btn-primary inline-block">
          Browse Products
        </Link>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Compare Products</h1>
        <button onClick={clearCompare} className="btn-secondary flex items-center space-x-2">
          <Trash2 className="w-5 h-5" />
          <span>Clear All</span>
        </button>
      </div>

      {loading ? (
        <div className="card animate-pulse">
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full bg-white rounded-lg shadow-md overflow-hidden">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Specification
                </th>
                {products.map((product) => (
                  <th key={product.id} className="px-6 py-4 text-center relative">
                    <button
                      onClick={() => removeFromCompare(product.id)}
                      className="absolute top-2 right-2 text-gray-400 hover:text-red-600"
                    >
                      <X className="w-5 h-5" />
                    </button>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-32 h-32 object-cover mx-auto mb-2 rounded"
                    />
                    <h3 className="font-semibold text-sm">{product.name}</h3>
                    <p className="text-primary-600 font-bold mt-1">
                      ₹{product.price?.toLocaleString()}
                    </p>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 font-medium">Brand</td>
                {products.map((product) => (
                  <td key={product.id} className="px-6 py-4 text-center">
                    {product.brand || 'N/A'}
                  </td>
                ))}
              </tr>
              <tr className="bg-gray-50">
                <td className="px-6 py-4 font-medium">Price</td>
                {products.map((product) => (
                  <td key={product.id} className="px-6 py-4 text-center font-semibold">
                    ₹{product.price?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="px-6 py-4 font-medium">Rating</td>
                {products.map((product) => (
                  <td key={product.id} className="px-6 py-4 text-center">
                    {product.rating ? `${product.rating} ⭐` : 'N/A'}
                  </td>
                ))}
              </tr>
              <tr className="bg-gray-50">
                <td className="px-6 py-4 font-medium">RAM</td>
                {products.map((product) => (
                  <td key={product.id} className="px-6 py-4 text-center">
                    {getSpecValue(product, 'ram')}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="px-6 py-4 font-medium">Storage</td>
                {products.map((product) => (
                  <td key={product.id} className="px-6 py-4 text-center">
                    {getSpecValue(product, 'storage')}
                  </td>
                ))}
              </tr>
              <tr className="bg-gray-50">
                <td className="px-6 py-4 font-medium">Battery</td>
                {products.map((product) => (
                  <td key={product.id} className="px-6 py-4 text-center">
                    {getSpecValue(product, 'battery')}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="px-6 py-4 font-medium">Camera</td>
                {products.map((product) => (
                  <td key={product.id} className="px-6 py-4 text-center">
                    {getSpecValue(product, 'camera')}
                  </td>
                ))}
              </tr>
              <tr className="bg-gray-50">
                <td className="px-6 py-4 font-medium">Display</td>
                {products.map((product) => (
                  <td key={product.id} className="px-6 py-4 text-center">
                    {getSpecValue(product, 'display')}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="px-6 py-4 font-medium">Processor</td>
                {products.map((product) => (
                  <td key={product.id} className="px-6 py-4 text-center">
                    {getSpecValue(product, 'processor')}
                  </td>
                ))}
              </tr>
              <tr className="bg-gray-50">
                <td className="px-6 py-4 font-medium">Action</td>
                {products.map((product) => (
                  <td key={product.id} className="px-6 py-4 text-center">
                    <Link
                      to={`/products/${product.id}`}
                      className="text-primary-600 hover:text-primary-700 font-medium"
                    >
                      View Details
                    </Link>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default Compare

