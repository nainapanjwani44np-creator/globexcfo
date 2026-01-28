# 🐛 Debugging Guide for Backend Server

## Method 1: VS Code/Cursor Debugger (Easiest) ⭐

### Steps:
1. **Open Debug Panel**: Click bug icon on left sidebar or press `Cmd+Shift+D`
2. **Set Breakpoints**: Click left of line numbers (red dots appear)
3. **Start Debugging**: Press `F5` or click green ▶️ button
4. **Select Configuration**: Choose "Debug Backend Server"

### Where to Set Breakpoints:
- Line 108-109: When query data is received
- Line 115: Before saving to MongoDB
- Line 121: After successful insertion
- Line 111-113: To check database/collection names

### Debug Controls:
- `F5` - Continue
- `F10` - Step Over
- `F11` - Step Into
- `Shift+F11` - Step Out
- `Cmd+Shift+F5` - Restart
- `Shift+F5` - Stop

---

## Method 2: Chrome DevTools (Visual Debugger) 🌐

### Steps:
1. **Run in debug mode**:
   ```bash
   npm run debug
   ```

2. **Open Chrome DevTools**:
   - Open Chrome browser
   - Go to: `chrome://inspect`
   - Click "Open dedicated DevTools for Node"
   - Or click "inspect" under your running process

3. **Set breakpoints in Chrome**:
   - Navigate to Sources tab
   - Find server.js
   - Click line numbers to add breakpoints

### Advantages:
- Visual interface
- Network monitoring
- Memory profiling
- Performance analysis

---

## Method 3: Enhanced Console Logging (Already Added!) 📝

Your server now has detailed logging:

```
=== New Query Submission ===
📝 User query data: {...}
💾 Saving to database: baisWebData
📁 Collection: UserData
✅ Insertion successful!
📋 Inserted ID: ...
✅ Verified document exists in DB: true
==========================
```

Just run normally:
```bash
npm run dev
```

---

## Method 4: Node.js Built-in Debugger (Terminal) 💻

### Steps:
1. **Stop current server** (Ctrl+C)

2. **Run with inspect flag**:
   ```bash
   node --inspect server.js
   ```

3. **You'll see**:
   ```
   Debugger listening on ws://127.0.0.1:9229/...
   ```

4. **Add `debugger;` statement in code**:
   ```javascript
   app.post('/api/query', async (req, res) => {
     debugger;  // ← Execution will pause here
     console.log('user query data', req.body);
     // ...
   });
   ```

5. **Connect from Chrome**: `chrome://inspect`

---

## Quick Debug Commands

### Available npm scripts:
```bash
npm run dev         # Normal mode with auto-restart
npm run debug       # Debug mode with auto-restart
npm run debug-brk   # Debug mode, pauses on first line
npm start           # Production mode (no auto-restart)
```

---

## Common Debugging Scenarios

### 1. Debug MongoDB Connection
**Breakpoint at**: Line 23 (connectToMongo function)
**Check**: 
- `process.env.MONGODB_URI`
- `process.env.DB_NAME`
- `db` object after connection

### 2. Debug Data Insertion
**Breakpoint at**: Line 115 (before insertOne)
**Check**:
- `req.body` - What data was received?
- `collectionName` - Which collection?
- `result` - Was insertion successful?

### 3. Debug Data Retrieval
**Breakpoint at**: Line 147 (queries endpoint)
**Check**:
- `queries` array
- `queries.length`
- MongoDB connection status

---

## Debugging Tips 💡

### 1. Use Conditional Breakpoints
Right-click breakpoint → Edit Breakpoint → Add condition
Example: `email === 'test@example.com'`

### 2. Watch Variables
Add variables to Watch panel:
- `req.body`
- `process.env.DB_NAME`
- `collectionName`
- `result.insertedId`

### 3. Use Debug Console
While paused, type in Debug Console:
```javascript
req.body.email
db.databaseName
result.acknowledged
```

### 4. Log to File (Advanced)
```javascript
const fs = require('fs');
fs.appendFileSync('debug.log', JSON.stringify(req.body) + '\n');
```

---

## Testing Endpoints While Debugging

### Test Connection:
```bash
curl http://localhost:3000/api/test-connection
```

### View All Queries:
```bash
curl http://localhost:3000/api/queries
```

### Submit Test Query:
```bash
curl -X POST http://localhost:3000/api/query \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","contactNumber":"+1234567890"}'
```

---

## Troubleshooting

### Issue: Debugger not connecting
**Solution**: Check if port 9229 is free:
```bash
lsof -i :9229
```

### Issue: Breakpoints not hitting
**Solution**: 
1. Make sure source maps are enabled
2. Restart debugger
3. Check file path is correct

### Issue: Environment variables not loading
**Solution**: 
1. Check .env file exists
2. Verify .env path in launch.json
3. Manually load: `require('dotenv').config()`

---

## Quick Start Debugging

**Quickest way to debug right now:**

1. Stop your current server (Ctrl+C in Terminal 5)
2. Press `F5` in Cursor/VS Code
3. Select "Debug Backend Server"
4. Set breakpoint at line 109 (POST /api/query)
5. Submit a form from your frontend
6. Code will pause at breakpoint!
7. Inspect all variables in Variables panel

---

## Need Help?

- VS Code Debugging Docs: https://code.visualstudio.com/docs/nodejs/nodejs-debugging
- Node.js Debugging Guide: https://nodejs.org/en/docs/guides/debugging-getting-started/
- Chrome DevTools: https://developer.chrome.com/docs/devtools/

