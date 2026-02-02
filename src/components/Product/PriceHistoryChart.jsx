import { useEffect, useState } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import { productAPI } from '../../services/api'
import { TrendingUp, TrendingDown } from 'lucide-react'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

const PriceHistoryChart = ({ productId }) => {
  const [priceData, setPriceData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchPriceHistory()
  }, [productId])

  const fetchPriceHistory = async () => {
    try {
      setLoading(true)
      const data = await productAPI.getPriceHistory(productId)
      setPriceData(data)
    } catch (err) {
      setError('Failed to load price history')
      console.error('Error fetching price history:', err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="card">
        <h3 className="text-lg font-semibold mb-4">Price History</h3>
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-500">Loading price history...</div>
        </div>
      </div>
    )
  }

  if (error || !priceData || priceData.length === 0) {
    return (
      <div className="card">
        <h3 className="text-lg font-semibold mb-4">Price History</h3>
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-500">
            {error || 'No price history available'}
          </div>
        </div>
      </div>
    )
  }

  // Calculate price change
  const firstPrice = priceData[0]?.price || 0
  const lastPrice = priceData[priceData.length - 1]?.price || 0
  const priceChange = lastPrice - firstPrice
  const priceChangePercent = firstPrice > 0 
    ? ((priceChange / firstPrice) * 100).toFixed(2)
    : 0

  const chartData = {
    labels: priceData.map((item) => {
      const date = new Date(item.date)
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    }),
    datasets: [
      {
        label: 'Price',
        data: priceData.map((item) => item.price),
        borderColor: priceChange >= 0 ? 'rgb(34, 197, 94)' : 'rgb(239, 68, 68)',
        backgroundColor: priceChange >= 0 
          ? 'rgba(34, 197, 94, 0.1)' 
          : 'rgba(239, 68, 68, 0.1)',
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `₹${context.parsed.y.toLocaleString()}`
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        ticks: {
          callback: function (value) {
            return '₹' + value.toLocaleString()
          },
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  }

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Price History</h3>
        {priceChange !== 0 && (
          <div
            className={`flex items-center space-x-1 ${
              priceChange >= 0 ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {priceChange >= 0 ? (
              <TrendingUp className="w-5 h-5" />
            ) : (
              <TrendingDown className="w-5 h-5" />
            )}
            <span className="font-semibold">
              {priceChange >= 0 ? '+' : ''}
              {priceChangePercent}%
            </span>
          </div>
        )}
      </div>
      <div className="h-64">
        <Line data={chartData} options={options} />
      </div>
      <div className="mt-4 text-sm text-gray-600">
        <p>
          Price range: ₹{Math.min(...priceData.map((p) => p.price)).toLocaleString()} - ₹
          {Math.max(...priceData.map((p) => p.price)).toLocaleString()}
        </p>
      </div>
    </div>
  )
}

export default PriceHistoryChart

