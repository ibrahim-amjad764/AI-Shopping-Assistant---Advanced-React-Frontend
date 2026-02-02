# 🌐 Browser Me Kaise Run Kare - Step by Step

## 📋 Prerequisites (Pehle Install Karein)

1. **Node.js** installed hona chahiye (version 16+)
   - Check karne ke liye: `node --version`
   - Agar nahi hai to: https://nodejs.org se download karein

2. **npm** (Node.js ke saath automatically aata hai)
   - Check karne ke liye: `npm --version`

---

## 🚀 Step-by-Step Instructions

### Step 1: Terminal/Command Prompt Kholo

- **Windows**: PowerShell ya Command Prompt
- **Mac/Linux**: Terminal

Project folder me jao:
```bash
cd "C:\Users\Ibrahim Amjad\Desktop\AI shopping Assistance  Frontend React"
```

---

### Step 2: Dependencies Install Karein

```bash
npm install
```

Ye command sab packages install karega (React, Tailwind, Chart.js, etc.)
- Time lagega: 2-5 minutes
- Success message aayega jab complete ho jayega

---

### Step 3: Environment File Banayein (Optional)

`.env` file banayein root folder me (agar backend alag port pe hai):

```env
VITE_API_BASE_URL=http://localhost:8080/api
```

**Note**: Agar backend port 8080 pe hai to ye step skip kar sakte hain (vite.config.js me already configured hai)

---

### Step 4: Development Server Start Karein

```bash
npm run dev
```

Ye command:
- Development server start karega
- Terminal me URL dikhega: `http://localhost:3000`
- Browser automatically khul jayega (agar nahi khula to manually kholo)

---

### Step 5: Browser Me Open Karein

Agar automatically nahi khula, to manually kholo:

**Browser me ye URL open karein:**
```
http://localhost:3000
```

Ya

```
http://127.0.0.1:3000
```

---

## ✅ Success Indicators

Agar sab sahi hai to:

1. ✅ Terminal me dikhega:
   ```
   VITE v5.0.8  ready in 500 ms
   
   ➜  Local:   http://localhost:3000/
   ➜  Network: use --host to expose
   ```

2. ✅ Browser me app dikhega:
   - Home page with "AI Shopping" header
   - Navigation bar
   - Featured products section

---

## 🐛 Common Issues & Solutions

### Issue 1: `npm install` me error aata hai

**Solution:**
```bash
# Clear npm cache
npm cache clean --force

# Phir dobara try karein
npm install
```

---

### Issue 2: Port 3000 already in use

**Error:** `Port 3000 is already in use`

**Solution:**
- Option 1: Jo app port 3000 use kar raha hai, usko band karein
- Option 2: Different port use karein:
  ```bash
  npm run dev -- --port 3001
  ```
  Phir browser me: `http://localhost:3001` open karein

---

### Issue 3: Module not found errors

**Solution:**
```bash
# Delete node_modules folder
rm -rf node_modules  # Mac/Linux
rmdir /s node_modules  # Windows

# Delete package-lock.json
rm package-lock.json  # Mac/Linux
del package-lock.json  # Windows

# Phir dobara install karein
npm install
```

---

### Issue 4: Backend connection errors

**Agar backend nahi chal raha:**
- Frontend to chalega, lekin API calls fail hongi
- Backend start karein separately (port 8080 pe)
- Ya mock data use karein testing ke liye

---

### Issue 5: Tailwind CSS not working

**Solution:**
```bash
# PostCSS check karein
npm install -D tailwindcss postcss autoprefixer

# Phir rebuild karein
npm run dev
```

---

## 📱 Testing Different Pages

Browser me ye URLs try karein:

1. **Home Page**: `http://localhost:3000/`
2. **Products**: `http://localhost:3000/products`
3. **Login**: `http://localhost:3000/login`
4. **Compare**: `http://localhost:3000/compare`
5. **Favorites**: `http://localhost:3000/favorites` (login required)

---

## 🛑 Server Band Karne Ke Liye

Terminal me `Ctrl + C` press karein

---

## 🔄 Code Changes Kaise Dekhein

1. Code edit karein (VS Code ya koi bhi editor me)
2. **Save karein** (Ctrl+S / Cmd+S)
3. Browser **automatically refresh** ho jayega (Hot Module Replacement)
4. Changes immediately dikhenge

---

## 📦 Production Build (Optional)

Agar production build chahiye:

```bash
npm run build
```

Output `dist/` folder me milega.

Preview karne ke liye:
```bash
npm run preview
```

---

## 🎯 Quick Checklist

- [ ] Node.js installed hai
- [ ] `npm install` successfully complete hua
- [ ] `.env` file banaya (optional)
- [ ] `npm run dev` command run ki
- [ ] Browser me `http://localhost:3000` open kiya
- [ ] App successfully load hua

---

## 💡 Tips

1. **Terminal ko open rakhein** - server logs dikhenge
2. **Browser console check karein** (F12) - errors dikhenge
3. **Network tab check karein** - API calls monitor kar sakte hain
4. **Hot reload** - code save karte hi changes dikhenge

---

**Ab app browser me chal raha hoga! 🎉**

Agar koi issue aaye to batao, main help karunga!

