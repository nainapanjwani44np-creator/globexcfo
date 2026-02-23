# 🌱 Seed MongoDB Database - Terminal Commands

## ✅ Your Seed Scripts are Ready!

I've updated both seed scripts to work with production MongoDB automatically!

---

## 🚀 Quick Commands

### **For Production (Dokploy):**

```bash
cd /Users/naina/Documents/globexcfogit/nabBack

# Set production environment
export NODE_ENV=production
export MONGODB_URI_PROD=mongodb://<PROD_DB_USER>:<PROD_DB_PASS>@<PROD_HOST>:27017
export DB_NAME_PROD=baisWebData_production

# Seed Home page content
node seedContent.js

# Seed About page content
node seedAboutContent.js
```

### **For Development (Local):**

```bash
cd /Users/naina/Documents/globexcfogit/nabBack

# Set development environment (or leave unset)
export MONGODB_URI=mongodb://localhost:27017/
export DB_NAME=baisWebData_dev

# Seed Home page content
node seedContent.js

# Seed About page content
node seedAboutContent.js
```

---

## 📊 What Gets Seeded

### **seedContent.js (Home Page):**
```
Collection: contentLoader

Seeds 5 documents:
1. key: 'hero'
   - Title: "Finance Simplified. Growth Amplified."
   - Subtitle, quote

2. key: 'cfo-section'
   - Heading: "Why Every Business Needs a CFO"
   - 5 benefits with icons

3. key: 'why-us'
   - Heading: "Why Work With Us"
   - 6 benefits with icons

4. key: 'financial-models'
   - Heading: "Financial Models That Empower Business Growth"
   - 8 model types

5. key: 'contact-info'
   - Email, phone, social media links
```

### **seedAboutContent.js (About Page):**
```
Collection: contentLoader

Seeds 6 documents:
1. key: 'about-hero'
2. key: 'about-founder'
3. key: 'founder-message'
4. key: 'about-company'
5. key: 'vision'
6. key: 'mission'
7. key: 'belief'
```

---

## 🎯 One-Liner Commands

### **Production:**
```bash
cd /Users/naina/Documents/globexcfogit/nabBack && NODE_ENV=production MONGODB_URI_PROD=mongodb://<PROD_DB_USER>:<PROD_DB_PASS>@<PROD_HOST>:27017 DB_NAME_PROD=baisWebData_production node seedContent.js
```

```bash
cd /Users/naina/Documents/globexcfogit/nabBack && NODE_ENV=production MONGODB_URI_PROD=mongodb://<PROD_DB_USER>:<PROD_DB_PASS>@<PROD_HOST>:27017 DB_NAME_PROD=baisWebData_production node seedAboutContent.js
```

---

## 📝 Expected Output

### **Successful Seed:**
```
=== Seed Script Configuration ===
Environment: production
Database: baisWebData_production
MongoDB URI exists: true
✅ Using PRODUCTION MongoDB
==================================

🌱 Seeding HOME page content to MongoDB...

✅ Connected to MongoDB

🗑️  Clearing existing content...
📝 Inserting new content...

✅ Successfully inserted 5 documents

📋 Content in database:

1. Key: "hero"
   Fields: title, subtitle, quote, lastUpdated

2. Key: "cfo-section"
   Fields: heading, subheading, description, benefits, closingQuote, lastUpdated

3. Key: "why-us"
   Fields: heading, subheading, benefits, closingQuote, lastUpdated

4. Key: "financial-models"
   Fields: heading, subheading, whyItMatters, modelTypes, closingQuote, lastUpdated

5. Key: "contact-info"
   Fields: email, phone, socialMedia, lastUpdated

🎉 HOME page content seeding completed successfully!

📊 Database: baisWebData_production
📁 Collection: contentLoader

💡 Test your content:
   - Visit: https://yourdomain.com/api/content/hero
   - Or: https://yourdomain.com/api/content
   - Then check your Home page!

🔌 Disconnected from MongoDB
```

---

## 🔍 Verify Data Was Seeded

### **Test 1: Via API**
```bash
# Get all content
curl https://yourdomain.com/api/content

# Get specific content
curl https://yourdomain.com/api/content/hero
curl https://yourdomain.com/api/content/cfo-section
```

### **Test 2: Via Browser**
```
1. Visit: https://yourdomain.com/api/content
2. Should see JSON with all content
3. Visit: https://yourdomain.com
4. Home page should now display content! ✅
```

### **Test 3: Via MongoDB Shell**
```bash
mongosh "mongodb://<PROD_DB_USER>:<PROD_DB_PASS>@<PROD_HOST>:27017"

use baisWebData_production

db.contentLoader.find({}).count()
# Should return: 11 (5 from Home + 6 from About)

db.contentLoader.find({ key: 'hero' })
# Should show hero content
```

---

## ⚠️ Important Notes

### **Password Encoding:**
If your password contains `@` it must be encoded as `%40` in the URL.

```
Password: <YOUR_PASSWORD>
Encoded:  <YOUR_PASSWORD_URL_ENCODED>
```

### **Seed Scripts Auto-Detect Environment:**
```
If NODE_ENV=production:
   └─ Uses MONGODB_URI_PROD
   └─ Uses DB_NAME_PROD

If NODE_ENV is NOT production:
   └─ Uses MONGODB_URI
   └─ Uses DB_NAME
```

---

## 🛠️ Troubleshooting

### **Error: "MONGODB_URI not set"**
```bash
# Make sure you set the environment variables!
export MONGODB_URI_PROD=mongodb://...
export DB_NAME_PROD=baisWebData_production
export NODE_ENV=production

# Then run seed script
node seedContent.js
```

### **Error: "Connection timeout"**
```bash
# Check MongoDB is accessible
ping globalcfo-globexcfodb-m0uggj

# Try with different MongoDB URL format
# Remove port if not needed:
mongodb://<PROD_DB_USER>:<PROD_DB_PASS>@<PROD_HOST>
```

### **Error: "Authentication failed"**
```bash
# Verify credentials match what is set in your Dokploy environment variables
# Remember: if password contains @, it must be URL-encoded as %40 in the connection string
```

---

## 📋 Complete Workflow

### **Step 1: Setup MongoDB Connection**
```bash
cd /Users/naina/Documents/globexcfogit/nabBack

export NODE_ENV=production
export MONGODB_URI_PROD=mongodb://<PROD_DB_USER>:<PROD_DB_PASS>@<PROD_HOST>:27017
export DB_NAME_PROD=baisWebData_production
```

### **Step 2: Seed Home Page**
```bash
node seedContent.js
# Wait for: "🎉 HOME page content seeding completed successfully!"
```

### **Step 3: Seed About Page**
```bash
node seedAboutContent.js
# Wait for: "🎉 ABOUT page content seeding completed successfully!"
```

### **Step 4: Verify**
```bash
# Test API
curl https://yourdomain.com/api/content

# Visit website
open https://yourdomain.com
```

### **Step 5: Check Pages**
```
✅ Home page: Should show all sections (hero, CFO, why us, models)
✅ About page: Should show founder info, vision, mission
```

---

## 🎯 Quick Reference

| Command | Purpose |
|---------|---------|
| `node seedContent.js` | Seeds Home page content |
| `node seedAboutContent.js` | Seeds About page content |
| `curl .../api/content` | View all seeded content |
| `curl .../api/content/hero` | View specific content |

---

## ✅ After Seeding

Your website will now have:
- ✅ Complete Home page with all sections
- ✅ Complete About page with founder info
- ✅ Dynamic content loaded from MongoDB
- ✅ Forms saving to database

---

**Ready to seed? Run the commands above!** 🌱

