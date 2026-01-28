# 🚀 Deploy to Dokploy with NixPacks (Simple Guide)

---

## 📁 Your Project Structure

```
basicwebsite/
├── nabbasic/           # Frontend (Vue.js)
├── nabBack/            # Backend (Express.js)
└── package.json        # Root package.json (tells NixPacks how to build)
```

---

## 📦 Step 1: Create ZIP

```bash
cd /Users/naina/dev/basicwebsite

zip -r globex-cfo.zip \
  nabbasic \
  nabBack \
  package.json \
  -x "*/node_modules/*" \
  -x "*/dist/*" \
  -x "*/.env" \
  -x "*/.git/*" \
  -x "*/.DS_Store"
```

**Or using Finder:**
1. Select: `nabbasic`, `nabBack`, `package.json`
2. Right-click → Compress
3. Rename to `globex-cfo.zip`

---

## 🗄️ Step 2: Setup MongoDB Atlas

1. Go to https://cloud.mongodb.com
2. Create production cluster
3. Create database user: `prod_user` (save password!)
4. Network Access → Add your VPS IP
5. Get connection string:
   ```
   mongodb+srv://prod_user:PASSWORD@cluster.mongodb.net/
   ```

---

## 🚀 Step 3: Deploy in Dokploy

### 3.1 Create Application

1. Login: `http://YOUR_VPS_IP:3000`
2. Create Project: `globex-cfo`
3. Click **"+ New Application"**
4. Choose **"Upload"** or **"ZIP"**

### 3.2 Upload ZIP

1. Upload `globex-cfo.zip`
2. Dokploy extracts files
3. **NixPacks auto-detects** your Node.js project ✅

### 3.3 Environment Variables

Add in **Environment** tab:

```env
NODE_ENV=production
PORT=3000
MONGODB_URI=mongodb+srv://prod_user:YOUR_PASSWORD@cluster.mongodb.net/
DB_NAME=baisWebData_production
```

### 3.4 Configure Domain

1. **Domains** tab
2. Add: `yourdomain.com`
3. Add: `www.yourdomain.com`
4. Enable **SSL Certificate**
5. Port: `3000`

### 3.5 Deploy!

Click **Deploy** button.

**NixPacks will automatically:**
```
✅ Detect Node.js project
✅ Install dependencies
✅ Build frontend (npm run build)
✅ Start backend (npm start)
✅ Generate SSL certificate
```

**Wait 5-10 minutes for first deployment**

---

## ✅ Step 4: Verify

**Test Health:**
```
https://yourdomain.com/health
```

**Test MongoDB:**
```
https://yourdomain.com/api/test-connection
```

**Visit Website:**
```
https://yourdomain.com
```

🎉 **You're Live!**

---

## 🔄 Update Later

1. Make changes locally
2. Create new ZIP (same process)
3. Dokploy → Upload new ZIP
4. Click **Redeploy**

---

## 🐛 Troubleshooting

### Build Failed?
- Check logs in Dokploy
- Verify environment variables are set
- Ensure MongoDB connection string is correct

### MongoDB Connection Error?
- Whitelist VPS IP in MongoDB Atlas
- Check connection string has correct password
- Test: `https://yourdomain.com/api/test-connection`

### Site Not Loading?
- Wait 10-30 min for DNS propagation
- Clear browser cache
- Check SSL certificate generated

---

## 💰 Cost

- Hostinger VPS: $5.99-12.99/month
- MongoDB Atlas: Free (512MB)
- Domain: ~$13/year
- **Total: ~$7-15/month**

---

## 📝 Quick Checklist

- [ ] Root `package.json` exists
- [ ] ZIP file created (nabbasic + nabBack + package.json)
- [ ] MongoDB Atlas setup complete
- [ ] VPS IP whitelisted in MongoDB
- [ ] Environment variables prepared
- [ ] Uploaded to Dokploy
- [ ] Domain configured
- [ ] Deployed successfully
- [ ] Website is live!

---

**Deployment Time: ~30 minutes** ⏱️

**That's it! Simple and easy!** 🚀

