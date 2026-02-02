import { useState, useEffect } from 'react'
import { X, SlidersHorizontal } from 'lucide-react'

const FilterSidebar = ({ isOpen, onClose, onFilterChange, filters = {} }) => {
  const [localFilters, setLocalFilters] = useState({
    minPrice: filters.minPrice || '',
    maxPrice: filters.maxPrice || '',
    brand: filters.brand || [],
    minRating: filters.minRating || '',
    storage: filters.storage || [],
    battery: filters.battery || '',
    ram: filters.ram || [],
  })

  const brands = ['Apple', 'Samsung', 'OnePlus', 'Xiaomi', 'Realme', 'Oppo', 'Vivo']
  const storageOptions = ['64GB', '128GB', '256GB', '512GB', '1TB']
  const ramOptions = ['4GB', '6GB', '8GB', '12GB', '16GB']

  useEffect(() => {
    setLocalFilters({
      minPrice: filters.minPrice || '',
      maxPrice: filters.maxPrice || '',
      brand: filters.brand || [],
      minRating: filters.minRating || '',
      storage: filters.storage || [],
      battery: filters.battery || '',
      ram: filters.ram || [],
    })
  }, [filters])

  const handleChange = (key, value) => {
    setLocalFilters((prev) => ({ ...prev, [key]: value }))
  }

  const handleBrandToggle = (brand) => {
    setLocalFilters((prev) => ({
      ...prev,
      brand: prev.brand.includes(brand)
        ? prev.brand.filter((b) => b !== brand)
        : [...prev.brand, brand],
    }))
  }

  const handleStorageToggle = (storage) => {
    setLocalFilters((prev) => ({
      ...prev,
      storage: prev.storage.includes(storage)
        ? prev.storage.filter((s) => s !== storage)
        : [...prev.storage, storage],
    }))
  }

  const handleRamToggle = (ram) => {
    setLocalFilters((prev) => ({
      ...prev,
      ram: prev.ram.includes(ram)
        ? prev.ram.filter((r) => r !== ram)
        : [...prev.ram, ram],
    }))
  }

  const handleApply = () => {
    onFilterChange(localFilters)
  }

  const handleReset = () => {
    const resetFilters = {
      minPrice: '',
      maxPrice: '',
      brand: [],
      minRating: '',
      storage: [],
      battery: '',
      ram: [],
    }
    setLocalFilters(resetFilters)
    onFilterChange(resetFilters)
  }

  if (!isOpen) return null

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
        onClick={onClose}
      />

      {/* Sidebar */}
      <div className="fixed right-0 top-0 h-full w-80 bg-white shadow-xl z-50 overflow-y-auto md:static md:shadow-none md:z-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <SlidersHorizontal className="w-5 h-5 text-primary-600" />
              <h2 className="text-xl font-bold">Filters</h2>
            </div>
            <button
              onClick={onClose}
              className="md:hidden text-gray-500 hover:text-gray-700"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Price Range */}
          <div className="mb-6">
            <h3 className="font-semibold mb-3">Price Range</h3>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Min</label>
                <input
                  type="number"
                  value={localFilters.minPrice}
                  onChange={(e) => handleChange('minPrice', e.target.value)}
                  placeholder="0"
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Max</label>
                <input
                  type="number"
                  value={localFilters.maxPrice}
                  onChange={(e) => handleChange('maxPrice', e.target.value)}
                  placeholder="100000"
                  className="input-field"
                />
              </div>
            </div>
          </div>

          {/* Brand */}
          <div className="mb-6">
            <h3 className="font-semibold mb-3">Brand</h3>
            <div className="space-y-2">
              {brands.map((brand) => (
                <label
                  key={brand}
                  className="flex items-center space-x-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={localFilters.brand.includes(brand)}
                    onChange={() => handleBrandToggle(brand)}
                    className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
                  />
                  <span className="text-sm">{brand}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Rating */}
          <div className="mb-6">
            <h3 className="font-semibold mb-3">Minimum Rating</h3>
            <select
              value={localFilters.minRating}
              onChange={(e) => handleChange('minRating', e.target.value)}
              className="input-field"
            >
              <option value="">Any Rating</option>
              <option value="4.5">4.5+ Stars</option>
              <option value="4">4+ Stars</option>
              <option value="3.5">3.5+ Stars</option>
              <option value="3">3+ Stars</option>
            </select>
          </div>

          {/* Storage */}
          <div className="mb-6">
            <h3 className="font-semibold mb-3">Storage</h3>
            <div className="space-y-2">
              {storageOptions.map((storage) => (
                <label
                  key={storage}
                  className="flex items-center space-x-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={localFilters.storage.includes(storage)}
                    onChange={() => handleStorageToggle(storage)}
                    className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
                  />
                  <span className="text-sm">{storage}</span>
                </label>
              ))}
            </div>
          </div>

          {/* RAM */}
          <div className="mb-6">
            <h3 className="font-semibold mb-3">RAM</h3>
            <div className="space-y-2">
              {ramOptions.map((ram) => (
                <label
                  key={ram}
                  className="flex items-center space-x-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={localFilters.ram.includes(ram)}
                    onChange={() => handleRamToggle(ram)}
                    className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
                  />
                  <span className="text-sm">{ram}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Battery */}
          <div className="mb-6">
            <h3 className="font-semibold mb-3">Battery (mAh)</h3>
            <input
              type="number"
              value={localFilters.battery}
              onChange={(e) => handleChange('battery', e.target.value)}
              placeholder="e.g., 4000"
              className="input-field"
            />
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button onClick={handleApply} className="btn-primary w-full">
              Apply Filters
            </button>
            <button onClick={handleReset} className="btn-secondary w-full">
              Reset Filters
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default FilterSidebar

