# 🚀 Live Server Kaise Run Karein - Simple Steps

## 📝 Step-by-Step Instructions

### Step 1: Terminal/Command Prompt Kholo

**Windows:**
- `Windows Key + R` press karein
- Type: `powershell` ya `cmd`
- Enter press karein

**Ya VS Code me:**
- `Ctrl + ~` (backtick key) press karein
- Terminal automatically khul jayega

---

### Step 2: Project Folder Me Jao

Terminal me ye command run karein:

```bash
cd "C:\Users\Ibrahim Amjad\Desktop\AI shopping Assistance  Frontend React"
```

**Ya agar already project folder me ho to skip karein**

---

### Step 3: Dependencies Check Karein (Pehli Baar)

**Agar pehli baar run kar rahe ho to:**

```bash
npm install
```

Ye command sab packages install karega (2-5 minutes lagega)

**Note:** Agar pehle install kar chuke ho to ye step skip karein

---

### Step 4: Development Server Start Karein

Terminal me ye command run karein:

```bash
npm run dev
```

---

### Step 5: Success Message Dekhein

Terminal me ye dikhega:

```
VITE v5.4.21  ready in XXX ms

➜  Local:   http://localhost:3000/
➜  Network: use --host to expose
```

**Ye matlab server successfully chal raha hai! ✅**

---

### Step 6: Browser Me Open Karein

**Option 1: Automatic**
- Browser automatically khul jayega
- URL: `http://localhost:3000`

**Option 2: Manual**
- Browser kholo (Chrome, Firefox, Edge - koi bhi)
- Address bar me type karein:
  ```
  http://localhost:3000
  ```
- Enter press karein

---

## ✅ Success Indicators

Agar sab sahi hai to:

1. ✅ Terminal me server running message dikhega
2. ✅ Browser me app load hoga
3. ✅ "AI Shopping" header dikhega
4. ✅ Navigation bar dikhega
5. ✅ Home page content dikhega

---

## 🛑 Server Band Karne Ke Liye

Terminal me:
- `Ctrl + C` press karein
- Server band ho jayega

---

## 🔄 Server Dobara Start Karein

Agar server band kar diya to:

1. Terminal me `npm run dev` command dobara run karein
2. Browser me `http://localhost:3000` open karein

---

## 🐛 Common Issues

### Issue 1: Port Already in Use

**Error:** `Port 3000 is already in use`

**Solution:**
```bash
# Terminal me Ctrl+C press karein (server band karein)
# Phir different port use karein:
npm run dev -- --port 3001
```

Phir browser me: `http://localhost:3001` open karein

---

### Issue 2: Module Not Found

**Error:** `Cannot find module...`

**Solution:**
```bash
# Dependencies dobara install karein
npm install
```

---

### Issue 3: Browser Me Blank Page

**Solution:**
1. Browser console check karein (F12 press karein)
2. Hard refresh karein: `Ctrl + Shift + R`
3. Terminal me errors check karein

---

## 📱 Quick Commands Summary

```bash
# Dependencies install (pehli baar)
npm install

# Server start
npm run dev

# Server stop
Ctrl + C

# Different port pe run
npm run dev -- --port 3001
```

---

## 💡 Tips

1. **Terminal ko open rakhein** - server logs dikhenge
2. **Code save karte hi** - browser automatically refresh hoga
3. **Errors check karein** - terminal ya browser console me
4. **Backend chahiye** - API calls ke liye backend bhi chalana hoga

---

## 🎯 Complete Flow

```
1. Terminal kholo
2. Project folder me jao
3. npm install (pehli baar)
4. npm run dev
5. Browser me http://localhost:3000 open karo
6. App chal raha hai! 🎉
```

---

**Ab server chal raha hoga! Agar koi issue aaye to batao! 🚀**

