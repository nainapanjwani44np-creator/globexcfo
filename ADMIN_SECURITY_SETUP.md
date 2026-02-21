# Admin Panel Security Setup

## 🔒 Overview

The admin dashboard is now hosted on a **separate port (4000)** for enhanced security. This allows you to:
- Keep admin APIs isolated from public website
- Use firewall rules to block external access
- Access remotely via SSH tunnel only
- Restrict access to specific IP addresses

---

## 📋 Architecture

```
Public Website (Port 3000)
├── Homepage, Services, About, etc.
├── Contact Form
└── Publicly accessible

Admin Server (Port 4000)  
├── Admin Login API
├── Admin Submissions API
└── 🔒 LOCALHOST ONLY (127.0.0.1)
```

---

## 🚀 Quick Start

### 1. Development (Local)

**Terminal 1 - Main Website:**
```bash
cd /Users/naina/Documents/globexcfogit/nabBack
npm run dev
# Runs on http://localhost:3000
```

**Terminal 2 - Admin Server:**
```bash
cd /Users/naina/Documents/globexcfogit/nabBack
npm run admin:dev
# Runs on http://127.0.0.1:4000
```

**Access Admin:**
- Visit: `http://localhost:3000/Admin`
- Login with credentials from .env file

---

## 🔐 Production Deployment

### Option 1: Separate Server Process (Recommended)

**Dokploy Configuration:**

1. **Main App (Port 3000):**
   - Start Command: `node server.js`
   - Port: 3000
   - Expose to public: YES

2. **Admin App (Port 4000):**
   - Start Command: `node adminServer.js`
   - Port: 4000
   - Expose to public: NO
   - **Important:** Do NOT add to reverse proxy

3. **Environment Variables (Both):**
   ```
   NODE_ENV=production
   MONGODB_URI_PROD=your_mongodb_uri
   DB_NAME_PROD=basicWebDataBase
   ADMIN_USERNAME=your_admin_username
   ADMIN_PASSWORD=your_secure_password
   ADMIN_PORT=4000
   ADMIN_HOST=127.0.0.1
   ```

### Option 2: SSH Tunnel Access

**From Your Laptop:**
```bash
# Create SSH tunnel to server
ssh -L 4000:localhost:4000 user@your-server-ip

# Then access in browser:
# http://localhost:4000
```

This creates a secure tunnel from your laptop's port 4000 to server's localhost:4000.

---

## 🔒 Firewall Configuration

### Ubuntu/Debian (ufw)

```bash
# Allow port 3000 for public website
sudo ufw allow 3000/tcp

# Block port 4000 from external access (already blocked by default if listening on 127.0.0.1)
# But to be explicit:
sudo ufw deny 4000/tcp

# Check status
sudo ufw status
```

### Docker/Dokploy

In `docker-compose.yml` or Dokploy port mapping:

```yaml
# Main server - expose publicly
ports:
  - "3000:3000"

# Admin server - localhost only, no external port mapping
# Just run internally on 127.0.0.1:4000
```

---

## 🌐 Access Methods

### Local Development
```
Admin Dashboard: http://localhost:3000/Admin
Admin API: http://localhost:4000/api/admin/*
```

### Production - SSH Tunnel (Recommended)
```bash
# Step 1: Create tunnel
ssh -L 4000:localhost:4000 user@your-server-ip

# Step 2: Access admin (in browser)
http://localhost:3000/Admin

# Admin API calls will go through tunnel to server's port 4000
```

### Production - VPN Access
```
1. Connect to company VPN
2. Access: http://server-internal-ip:3000/Admin
3. Admin API: http://server-internal-ip:4000
```

### Production - IP Whitelist
```bash
# Only allow specific IPs to access port 4000
sudo ufw allow from YOUR_IP_ADDRESS to any port 4000

# Example:
sudo ufw allow from 203.0.113.10 to any port 4000
```

---

## 🔑 Credentials

### Default (Development)
```
Username: admin
Password: GlobexAdmin@2026!
```

### Production Setup

1. **In Dokploy Environment Variables:**
   ```
   ADMIN_USERNAME=your_chosen_username
   ADMIN_PASSWORD=your_strong_password_here
   ```

2. **Best Practices:**
   - Use strong password (16+ characters)
   - Include uppercase, lowercase, numbers, symbols
   - Never commit passwords to Git
   - Rotate passwords regularly
   - Use different passwords for dev/prod

---

## 📁 File Structure

```
nabBack/
├── server.js          # Main website server (port 3000)
├── adminServer.js     # Admin server (port 4000) 🔒
├── .env              # Environment variables (NOT committed)
├── .env.example      # Template for environment variables
└── admin-dist/       # Admin static files (optional)

nabbasic/src/pages/
└── Admin.vue         # Admin dashboard component
```

---

## 🔄 Workflow

### Development
1. Run both servers (`npm run dev` and `npm run admin:dev`)
2. Admin dashboard calls port 4000 APIs
3. Both accessible on localhost

### Production
1. Deploy both servers to production
2. Admin server listens on 127.0.0.1:4000 (localhost only)
3. Use SSH tunnel for remote admin access
4. Or use VPN/IP whitelist

---

## ⚙️ Configuration Options

### .env Variables

```bash
# Admin Server
ADMIN_PORT=4000              # Port for admin server
ADMIN_HOST=127.0.0.1         # Bind to localhost only (secure)
# ADMIN_HOST=0.0.0.0         # ⚠️ Bind to all interfaces (less secure)

# Admin Credentials
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your_password

# Database
MONGODB_URI_PROD=your_mongodb_uri
DB_NAME_PROD=basicWebDataBase
```

---

## 🛡️ Security Best Practices

### ✅ DO:
- Keep ADMIN_HOST=127.0.0.1 in production
- Use SSH tunnels for remote access
- Set firewall rules to block port 4000
- Use strong passwords
- Rotate credentials regularly
- Use HTTPS in production
- Enable rate limiting
- Log all admin access

### ❌ DON'T:
- Expose port 4000 to public internet
- Use default passwords in production
- Commit .env files to Git
- Share credentials via insecure channels
- Set ADMIN_HOST=0.0.0.0 in production
- Allow weak passwords

---

## 🔍 Monitoring

### Check Admin Server Status

```bash
# Check if admin server is running
netstat -tuln | grep 4000

# Should show:
# tcp  0  0  127.0.0.1:4000  0.0.0.0:*  LISTEN
#              ^
#              Only listening on localhost = secure ✅
```

### Check Logs

```bash
# Admin server logs
tail -f /path/to/admin-logs.log

# Look for:
# - Login attempts
# - Failed authentication
# - Suspicious access patterns
```

---

## 🐛 Troubleshooting

### Can't access admin dashboard
```bash
# Check if both servers are running
ps aux | grep node

# Check ports
netstat -tuln | grep -E '3000|4000'

# Check firewall
sudo ufw status
```

### Admin API not responding
```bash
# Test admin API
curl http://localhost:4000/api/admin/health

# Should return:
# {"status":"ok","message":"Admin server is running",...}
```

### SSH Tunnel not working
```bash
# Verify tunnel is active
ps aux | grep ssh

# Test locally on server
curl http://localhost:4000/api/admin/health

# Test through tunnel from laptop
curl http://localhost:4000/api/admin/health
```

---

## 📞 Support

If you need help:
1. Check if both servers are running
2. Verify environment variables are set
3. Check firewall rules
4. Review server logs
5. Test API endpoints with curl

---

## 🔄 Updating

When deploying updates:

```bash
# Update code
git pull origin main

# Rebuild frontend
cd nabbasic && npm run build

# Restart servers
pm2 restart main-server
pm2 restart admin-server

# Or with systemd:
sudo systemctl restart globex-main
sudo systemctl restart globex-admin
```

---

## 📝 Summary

**Key Points:**
- Admin APIs on port 4000 (localhost only)
- Main website on port 3000 (public)
- Use SSH tunnel for remote admin access
- Never expose port 4000 to public internet
- Use strong credentials in production
- Monitor admin access logs regularly

**Access Pattern:**
```
You → SSH Tunnel → Server:4000 (Admin API)
     → Direct    → Server:3000 (Public Website)
```

This setup ensures maximum security while maintaining easy admin access for authorized users.
