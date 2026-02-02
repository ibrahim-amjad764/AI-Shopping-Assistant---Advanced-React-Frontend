# 🚀 Quick Start Guide

## Step 1: Install Dependencies

```bash
npm install
```

## Step 2: Create Environment File

Create `.env` file in root directory:

```env
VITE_API_BASE_URL=http://localhost:8080/api
```

## Step 3: Start Development Server

```bash
npm run dev
```

App will run on: **http://localhost:3000**

---

## ✅ What's Included

### Frontend Features (All Implemented)
- ✅ Price History Chart (Chart.js)
- ✅ Product Comparison (up to 3 products)
- ✅ Live Search Suggestions
- ✅ User Authentication (JWT)
- ✅ Favorites System
- ✅ Advanced Filter Panel
- ✅ Modern UI (Tailwind CSS)

### Backend Requirements
See `BACKEND_API_DOCUMENTATION.md` for complete API specs.

---

## 📁 Key Files

- `src/App.jsx` - Main app with routing
- `src/services/api.js` - All API calls
- `src/context/AuthContext.jsx` - Authentication state
- `src/components/` - All reusable components
- `src/pages/` - All page components

---

## 🔧 Backend Setup

1. Create Spring Boot project
2. Implement APIs from `BACKEND_API_DOCUMENTATION.md`
3. Set up database tables (see schema in docs)
4. Configure CORS for `http://localhost:3000`
5. Run backend on port 8080

---

## 🎨 Customization

### Change Colors
Edit `tailwind.config.js` - modify `primary` colors

### Add More Filters
Edit `src/components/Filter/FilterSidebar.jsx`

### Modify API Base URL
Update `.env` file or `src/services/api.js`

---

## 🐛 Troubleshooting

### API calls failing?
- Check backend is running on port 8080
- Verify CORS is configured
- Check `.env` file has correct API URL

### Authentication not working?
- Verify JWT token is being stored in localStorage
- Check backend `/api/auth/me` endpoint

### Charts not showing?
- Ensure Chart.js is installed: `npm install chart.js react-chartjs-2`

---

**Ready to go! 🎉**

