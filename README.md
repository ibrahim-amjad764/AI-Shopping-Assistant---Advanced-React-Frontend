# 🛍️ AI Shopping Assistant - Advanced React Frontend

Complete advanced React frontend with all professional features for FYP project.

## ✨ Features Implemented

### 🔥 1. Price History Chart
- Interactive line chart using `react-chartjs-2`
- Shows price trends over time
- Displays price change percentage
- Component: `PriceHistoryChart.jsx`

### 🔥 2. Product Comparison
- Compare up to 3 products side-by-side
- Detailed specification comparison table
- Add/remove products from compare list
- Page: `Compare.jsx`

### 🔥 3. Live Search Suggestions
- Real-time search suggestions dropdown
- Debounced API calls for performance
- Click to navigate to product
- Component: `SearchSuggestions.jsx`

### 🔥 4. User Authentication & Favorites
- JWT-based authentication
- Login/Register pages
- Add products to favorites
- Favorites page with all saved products
- Protected routes

### 🔥 5. Advanced Filter Panel
- Price range slider
- Brand multi-select
- Rating filter
- Storage & RAM filters
- Battery capacity filter
- Real-time filtering without page refresh
- Component: `FilterSidebar.jsx`

### 🔥 6. Modern UI Design
- Tailwind CSS for styling
- Responsive design (mobile, tablet, desktop)
- Beautiful card layouts
- Professional color scheme
- Smooth animations and transitions

## 📁 Project Structure

```
src/
├── components/
│   ├── Layout/
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   └── Layout.jsx
│   ├── Product/
│   │   ├── ProductCard.jsx
│   │   └── PriceHistoryChart.jsx
│   ├── Search/
│   │   └── SearchSuggestions.jsx
│   └── Filter/
│       └── FilterSidebar.jsx
├── pages/
│   ├── Home.jsx
│   ├── Products.jsx
│   ├── ProductDetail.jsx
│   ├── Compare.jsx
│   ├── Favorites.jsx
│   └── Login.jsx
├── context/
│   └── AuthContext.jsx
├── services/
│   └── api.js
├── utils/
│   └── cn.js
├── App.jsx
├── main.jsx
└── index.css
```

## 🚀 Installation & Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Variables

Create `.env` file in root:

```env
VITE_API_BASE_URL=http://localhost:8080/api
```

### 3. Run Development Server

```bash
npm run dev
```

App will run on `http://localhost:3000`

## 🔌 Backend API Requirements

Your Spring Boot backend should implement these APIs:

### Authentication APIs
```
POST /api/auth/login
POST /api/auth/register
GET  /api/auth/me
```

### Product APIs
```
GET  /api/products
GET  /api/products/{id}
GET  /api/products/{id}/price-history
GET  /api/search?query=phone&brand=Apple&minPrice=20000&maxPrice=80000
GET  /api/search/suggestions?query=iph
```

### Favorites APIs
```
GET    /api/favorites
POST   /api/favorites/{productId}
DELETE /api/favorites/{productId}
GET    /api/favorites/{productId}/check
```

## 📊 API Response Formats

### Product Response
```json
{
  "id": 1,
  "name": "iPhone 15 Pro",
  "brand": "Apple",
  "price": 134900,
  "originalPrice": 149900,
  "image": "https://example.com/image.jpg",
  "rating": 4.5,
  "reviewsCount": 1234,
  "description": "Product description...",
  "specs": {
    "ram": "8GB",
    "storage": "256GB",
    "battery": "3279 mAh",
    "camera": "48MP",
    "display": "6.1 inch",
    "processor": "A17 Pro"
  }
}
```

### Price History Response
```json
[
  {
    "date": "2024-01-01",
    "price": 149900
  },
  {
    "date": "2024-01-15",
    "price": 144900
  }
]
```

### Search Suggestions Response
```json
[
  {
    "id": 1,
    "name": "iPhone 13",
    "brand": "Apple"
  },
  {
    "id": 2,
    "name": "iPhone 14",
    "brand": "Apple"
  }
]
```

## 🎨 UI Components

All components use Tailwind CSS with custom utility classes:
- `btn-primary` - Primary button
- `btn-secondary` - Secondary button
- `card` - Card container
- `input-field` - Input field styling

## 🔐 Authentication Flow

1. User logs in → JWT token stored in localStorage
2. Token automatically added to all API requests
3. Token expiration handled automatically
4. Protected routes redirect to login if not authenticated

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px)
- Mobile filter sidebar overlay
- Responsive grid layouts

## 🛠️ Technologies Used

- **React 18** - UI library
- **React Router** - Routing
- **Axios** - HTTP client
- **Chart.js + react-chartjs-2** - Charts
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **Vite** - Build tool

## 📝 Notes

- All API calls are centralized in `src/services/api.js`
- Authentication state managed via Context API
- Compare list stored in localStorage
- Favorites require authentication
- Price history chart shows last 30 days by default

## 🚀 Build for Production

```bash
npm run build
```

Output will be in `dist/` folder.

---

**Made with ❤️ for FYP Project**

"# AI-Shopping-Assistant---Advanced-React-Frontend" 
"# AI-Shopping-Assistant---Advanced-React-Frontend" 
"# AI-Shopping-Assistant---Advanced-React-Frontend" 
