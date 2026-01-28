# MongoDB Connection Setup Guide

## 🔧 Step-by-Step Setup for MongoDB Atlas

### Step 1: Get Your Connection String

1. Go to https://cloud.mongodb.com
2. Click "**Connect**" on your cluster
3. Choose "**Connect your application**"
4. Select "**Node.js**" and latest version
5. Copy the connection string

### Step 2: Format Your Connection String

**Your connection string should look like:**
```
mongodb+srv://USERNAME:PASSWORD@cluster0.xxxxx.mongodb.net/
```

**Example:**
```
mongodb+srv://myuser:mypass123@cluster0.mongodb.net/
```

### Step 3: Setup .env File

Edit: `/Users/naina/dev/basicwebsite/nabBack/.env`

Add these lines (replace with YOUR values):
```bash
MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@YOUR_CLUSTER.mongodb.net/
DB_NAME=baisWebData
```

**Important:**
- ✅ NO spaces around `=`
- ✅ NO quotes
- ✅ Replace USERNAME with your MongoDB username
- ✅ Replace PASSWORD with your MongoDB password
- ✅ Replace YOUR_CLUSTER with your cluster address

---

## ✅ Whitelist Your IP Address

### In MongoDB Atlas:

1. Go to "**Network Access**" (left menu)
2. Click "**Add IP Address**"
3. For development, click "**Allow Access from Anywhere**"
4. IP Address: `0.0.0.0/0`
5. Comment: "Development access"
6. Click "**Confirm**"

**Wait 1-2 minutes** for changes to take effect.

---

## 🔒 Create Database User

### In MongoDB Atlas:

1. Go to "**Database Access**" (left menu)
2. Click "**Add New Database User**"
3. Choose "**Password**" authentication
4. Set username (e.g., `naina` or `admin`)
5. Set a simple password (e.g., `password123`)
6. Under "Database User Privileges" → Select "**Read and write to any database**"
7. Click "**Add User**"

**Wait 1-2 minutes** for user to be created.

---

## 📝 Example .env File

```bash
# MongoDB Atlas Example
MONGODB_URI=mongodb+srv://naina:password123@cluster0.abc123.mongodb.net/
DB_NAME=baisWebData

# Make sure:
# - No spaces around =
# - No quotes
# - Password is URL encoded if it has special characters
```

---

## 🔍 Test Your Connection

After updating `.env`:

1. **Save the file**
2. **Restart your backend** (it should auto-restart with nodemon)
3. **Check terminal output** - Should see:
   ```
   ✅ Successfully connected to MongoDB!
   ```
4. **Test endpoint**: Open browser and visit:
   ```
   http://localhost:3000/api/test-connection
   ```

---

## 🚨 Troubleshooting SSL Error

### If you still get SSL/TLS error:

**Option A: Add SSL options to connection string:**

In your `.env`, modify the URI:
```bash
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/?retryWrites=true&w=majority&tls=true
```

**Option B: Use older TLS version:**

Update your connection string with:
```bash
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/?retryWrites=true&w=majority&tlsAllowInvalidCertificates=true
```

---

## 🔐 Password Contains Special Characters?

If your password has special characters, you need to URL encode them:

| Character | Encode As |
|-----------|-----------|
| @ | %40 |
| : | %3A |
| / | %2F |
| ? | %3F |
| # | %23 |
| [ | %5B |
| ] | %5D |
| ! | %21 |
| $ | %24 |
| & | %26 |

**Example:**
- Password: `my@pass!123`
- Encoded: `my%40pass%21123`

---

## ✅ Quick Checklist

- [ ] MongoDB Atlas account created
- [ ] Cluster created
- [ ] Database user created
- [ ] IP address whitelisted (0.0.0.0/0 for dev)
- [ ] Connection string copied
- [ ] `.env` file updated with correct values
- [ ] Backend restarted
- [ ] Can access http://localhost:3000/api/test-connection

---

## 🆘 Still Having Issues?

### Check these:

1. **Verify cluster is running**: Green status in Atlas
2. **Wait 2 minutes**: After IP whitelist/user creation
3. **Check firewall**: Disable temporarily to test
4. **Try different network**: Mobile hotspot to test
5. **Use local MongoDB**: For development
   ```bash
   MONGODB_URI=mongodb://localhost:27017/
   DB_NAME=baisWebData
   ```

---

## 📞 Get Help

If still stuck, provide:
1. MongoDB Atlas cluster region (e.g., US East)
2. Your public IP address (from https://whatismyip.com)
3. Terminal error message
4. Connection string format (WITHOUT password!)


