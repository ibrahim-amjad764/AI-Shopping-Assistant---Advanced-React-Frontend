import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { searchAPI } from '../../services/api'
import { Search } from 'lucide-react'

const SearchSuggestions = ({ query, onClose }) => {
  const [suggestions, setSuggestions] = useState([])
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const timeoutRef = useState(null)[0]

  useEffect(() => {
    let timeoutId

    if (query && query.length >= 2) {
      setLoading(true)
      timeoutId = setTimeout(async () => {
        try {
          const data = await searchAPI.getSuggestions(query)
          setSuggestions(data)
        } catch (error) {
          console.error('Error fetching suggestions:', error)
          setSuggestions([])
        } finally {
          setLoading(false)
        }
      }, 300)
    } else {
      setSuggestions([])
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [query])

  const handleSuggestionClick = (product) => {
    navigate(`/products/${product.id}`)
    onClose()
  }

  if (!query || query.length < 2 || suggestions.length === 0) {
    if (loading) {
      return (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          <div className="p-4 text-center text-gray-500">Loading...</div>
        </div>
      )
    }
    return null
  }

  return (
    <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
      <ul className="py-2">
        {suggestions.map((product) => (
          <li
            key={product.id}
            onClick={() => handleSuggestionClick(product)}
            className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center space-x-3"
          >
            <Search className="w-4 h-4 text-gray-400" />
            <div>
              <p className="font-medium">{product.name}</p>
              {product.brand && (
                <p className="text-sm text-gray-500">{product.brand}</p>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default SearchSuggestions

