# 🚀 Setup Guide — Lumen Digital Library

A complete step-by-step guide to setting up and deploying your project. (Bengali + English)

---

## 📋 Quick Checklist

- [ ] Node.js 18+ install kora ache
- [ ] MongoDB Atlas account create kora
- [ ] Google Cloud Console e OAuth setup kora
- [ ] GitHub repository toiri kora
- [ ] Vercel account create kora
- [ ] All env vars properly set kora

---

## 1️⃣ Project Setup (Local Development)

### Step 1.1: Install Dependencies

```bash
cd digital-library
npm install
```

**Note:** Eta package install korte 2-3 minute lagte pare. All 4 animation libraries (Framer Motion, React Spring, Animate.css, Swiper.js) automatically install hoye jabe.

### Step 1.2: Environment Variables

Project root e `.env.local` file create koro:

```bash
cp .env.example .env.local
```

`.env.local` file e niche er moto values dao:

```env
MONGODB_URI=mongodb+srv://...
MONGODB_DB=digital_library
BETTER_AUTH_SECRET=...
BETTER_AUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

---

## 2️⃣ MongoDB Atlas Setup

### Step 2.1: Account Create

1. [https://www.mongodb.com/cloud/atlas/register](https://www.mongodb.com/cloud/atlas/register) e jao
2. Free account create koro

### Step 2.2: Cluster Create

1. **"Build a Database"** click koro
2. **M0 (FREE)** select koro
3. Region: **Singapore** or **Mumbai** (Bangladesh er kachakachi)
4. Cluster name: `lumen-cluster` (or any name)
5. **Create** click koro (3-5 min lagbe)

### Step 2.3: Database User Create

1. Left sidebar e **"Database Access"** e jao
2. **"Add New Database User"** click koro
3. Username: `lumen-admin`
4. Password: ekta strong password generate koro (save kore rakho!)
5. Database User Privileges: **"Atlas Admin"** select koro
6. **Add User** click koro

### Step 2.4: Network Access

1. Left sidebar e **"Network Access"** e jao
2. **"Add IP Address"** click koro
3. **"Allow Access from Anywhere"** click koro (IP: 0.0.0.0/0)
4. **Confirm** click koro

⚠️ **Production e:** Specific IP whitelist kora better, but development e 0.0.0.0/0 kaaj korbe.

### Step 2.5: Connection String Copy

1. **"Database"** menu te jao
2. Apnar cluster er **"Connect"** click koro
3. **"Drivers"** select koro
4. Driver: **Node.js**, Version: **5.5 or later**
5. Connection string copy koro:
   ```
   mongodb+srv://lumen-admin:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
6. `<password>` ke apnar actual password diye replace koro
7. `.env.local` er `MONGODB_URI` e paste koro

---

## 3️⃣ Better Auth Secret Generate

Terminal e ei command run koro:

```bash
openssl rand -base64 32
```

Output ta `.env.local` er `BETTER_AUTH_SECRET` e paste koro.

**Windows users (PowerShell):**
```powershell
[System.Convert]::ToBase64String((1..32 | ForEach { Get-Random -Maximum 256 }))
```

---

## 4️⃣ Google OAuth Setup

### Step 4.1: Google Cloud Project Create

1. [https://console.cloud.google.com](https://console.cloud.google.com) e jao
2. Top e project dropdown e click → **"New Project"**
3. Project Name: `Lumen Library`
4. **Create** click koro

### Step 4.2: OAuth Consent Screen

1. Left sidebar → **"APIs & Services"** → **"OAuth consent screen"**
2. User Type: **External** select koro
3. **Create** click koro
4. App information fill koro:
   - App name: `Lumen Library`
   - User support email: apnar email
   - Developer contact: apnar email
5. **Save and Continue**
6. Scopes page e shudhu **Save and Continue** click koro
7. Test users: apnar Gmail add koro
8. **Save and Continue**

### Step 4.3: OAuth Credentials Create

1. **"Credentials"** tab e jao
2. **"+ Create Credentials"** → **"OAuth client ID"**
3. Application type: **Web application**
4. Name: `Lumen Web Client`
5. **Authorized JavaScript origins:**
   ```
   http://localhost:3000
   ```
6. **Authorized redirect URIs:**
   ```
   http://localhost:3000/api/auth/callback/google
   ```
7. **Create** click koro
8. Modal e **Client ID** ar **Client Secret** dekhabe — copy koro
9. `.env.local` e paste koro

---

## 5️⃣ Local Run

```bash
npm run dev
```

Browser e [http://localhost:3000](http://localhost:3000) open koro.

✅ Test koro:
- Home page load hoy ki na
- Register koro (email/password)
- Login koro
- Google login try koro
- All Books browse koro
- Book details e gie Borrow button click koro
- Profile update kore dekho

---

## 6️⃣ Git & GitHub Setup

### Step 6.1: Git Initialize

```bash
git init
git add .
git commit -m "feat: initial project setup with Next.js 15"
```

### Step 6.2: Suggested Commit Messages (10+ commits)

For meaningful commit history (assignment requirement), make commits like:

```bash
git commit -m "feat: setup project structure with Next.js 15 and Tailwind"
git commit -m "feat: add MongoDB connection and BetterAuth integration"
git commit -m "feat: implement authentication with email and Google OAuth"
git commit -m "feat: create dark theme with glassmorphism and gradients"
git commit -m "feat: build animated navbar with scroll blur effect"
git commit -m "feat: implement hero banner with React Spring animations"
git commit -m "feat: add Swiper.js for categories and testimonials"
git commit -m "feat: create book cards with 3D tilt using Framer Motion"
git commit -m "feat: build all-books page with search and category filter"
git commit -m "feat: add book details page with Spring Modal confirmation"
git commit -m "feat: implement profile page with update functionality"
git commit -m "feat: add 404 page and protected routes middleware"
git commit -m "style: polish responsive design and final touches"
git commit -m "docs: add README and setup documentation"
```

### Step 6.3: GitHub Repo Create

1. [GitHub](https://github.com) e jao
2. **"New repository"** click koro
3. Name: `lumen-digital-library`
4. **Public** select koro
5. **Create repository** click koro
6. Terminal e:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/lumen-digital-library.git
   git branch -M main
   git push -u origin main
   ```

---

## 7️⃣ Vercel Deployment

### Step 7.1: Vercel Account

1. [https://vercel.com](https://vercel.com) e jao
2. **"Sign Up"** click koro → GitHub diye sign in koro

### Step 7.2: Project Import

1. Vercel dashboard e **"Add New"** → **"Project"**
2. Apnar `lumen-digital-library` repo select koro
3. **Import** click koro

### Step 7.3: Environment Variables

**"Environment Variables"** section e shob var add koro:

```
MONGODB_URI=mongodb+srv://...
MONGODB_DB=digital_library
BETTER_AUTH_SECRET=...
BETTER_AUTH_URL=https://your-app.vercel.app
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
NEXT_PUBLIC_BASE_URL=https://your-app.vercel.app
```

⚠️ **Note:** First deploy er por Vercel apnake URL dibe. Tarpor `BETTER_AUTH_URL` ar `NEXT_PUBLIC_BASE_URL` update kore deploy abar trigger korbe.

### Step 7.4: Deploy

**"Deploy"** click koro. 2-3 minute lagbe.

### Step 7.5: Update OAuth Redirect URI

Deployment er por:

1. Google Cloud Console → Credentials → OAuth client edit koro
2. **Authorized redirect URIs** e add koro:
   ```
   https://your-app.vercel.app/api/auth/callback/google
   ```
3. **Authorized JavaScript origins** e add koro:
   ```
   https://your-app.vercel.app
   ```
4. **Save** click koro

### Step 7.6: Update Vercel Env Vars

Vercel dashboard → Settings → Environment Variables:
- `BETTER_AUTH_URL` ke apnar Vercel URL diye update koro
- `NEXT_PUBLIC_BASE_URL` ke apnar Vercel URL diye update koro

Tarpor **Deployments** tab e jao → latest deployment er menu (...) → **"Redeploy"** click koro.

---

## 8️⃣ Final Testing

Live URL e jao ar test koro:

- ✅ Home page load hoy
- ✅ Register works
- ✅ Login works (email/password)
- ✅ Google OAuth works
- ✅ All Books page er search ar filter works
- ✅ Book details page e borrow modal ashe
- ✅ Profile update form works
- ✅ Mobile e fully responsive
- ✅ All animations smooth (60fps feel)
- ✅ Reload korle error nai
- ✅ 404 page works for invalid routes

---

## 🐛 Common Issues & Fixes

### Issue 1: "MONGODB_URI is not defined"
**Fix:** `.env.local` file root e ache ki na check koro. Variable name exact match korte hobe.

### Issue 2: Google OAuth "redirect_uri_mismatch"
**Fix:** Google Cloud Console e exact URL add kora ache ki na verify koro:
- `http://localhost:3000/api/auth/callback/google` (local)
- `https://your-app.vercel.app/api/auth/callback/google` (production)

### Issue 3: BetterAuth "invalid secret"
**Fix:** `BETTER_AUTH_SECRET` minimum 32 characters lagbe. `openssl rand -base64 32` diye new generate koro.

### Issue 4: Vercel build fails
**Fix:**
- Check koro build locally `npm run build` chole ki na
- Vercel logs dekho exact error er jonno
- All env vars Vercel e set ache ki na verify koro

### Issue 5: Images not loading
**Fix:** `next.config.mjs` e remote pattern correctly configured ache. Apnar custom URL add korte hole `next.config.mjs` te add koro.

### Issue 6: Animation lag/janky
**Fix:**
- Browser hardware acceleration enabled?
- Production build e check koro (`npm run build && npm start`)
- DevTools open thakle close koro

---

## 📞 Support

Kono issue hole:
1. Documentation gulo abar dekho
2. Console error message gulo carefully porho
3. GitHub Issues e search koro

**Best of luck with your assignment! 🎉**
