// server.js
require('dotenv').config();
const { MongoClient } = require('mongodb');
const path = require('path');
const jwt = require('jsonwebtoken');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const cors = require('cors');

// Determine environment
const isProduction = process.env.NODE_ENV === 'production';

// Select MongoDB URI based on environment
const MONGODB_URI = isProduction 
  ? process.env.MONGODB_URI_PROD 
  : process.env.MONGODB_URI;

const DB_NAME = isProduction 
  ? process.env.DB_NAME_PROD 
  : process.env.DB_NAME;

// Enhanced logging with file and line info
const logWithLocation = (message, data = null) => {
  const stack = new Error().stack;
  const caller = stack.split('\n')[2];
  const match = caller.match(/at\s+(.+?)\s+\((.+?):(\d+):(\d+)\)/);
  const location = match ? `${match[2]}:${match[3]}` : 'unknown';
  
  console.log(`[${new Date().toISOString()}] [${location}] ${message}`);
  if (data) {
    console.log(JSON.stringify(data, null, 2));
  }
};

// Log environment variables (with detailed info)
console.log('\n' + '='.repeat(60));
console.log('           MONGODB CONFIGURATION');
console.log('='.repeat(60));
console.log('📍 File: server.js');
console.log('📅 Startup Time:', new Date().toISOString());
console.log('\n🌍 ENVIRONMENT DETAILS:');
console.log('   NODE_ENV:', process.env.NODE_ENV || 'development (not set)');
console.log('   Is Production?:', isProduction ? 'YES ✓' : 'NO (Development)');
console.log('   PORT:', process.env.PORT || 3000);
console.log('   HOST:', process.env.HOST || '0.0.0.0');

console.log('\n💾 DATABASE CONFIGURATION:');
console.log('   Using:', isProduction ? 'PRODUCTION Database' : 'DEVELOPMENT Database');
console.log('   Database Name:', DB_NAME);

// Extract username from MongoDB URI
let username = 'N/A';
if (MONGODB_URI) {
  // Match username in mongodb://username:password@... or mongodb+srv://username:password@...
  const usernameMatch = MONGODB_URI.match(/mongodb(?:\+srv)?:\/\/([^:]+):/);
  if (usernameMatch) {
    username = usernameMatch[1];
  }
}

// Mask the password in URI for security
const maskedURI = MONGODB_URI ? MONGODB_URI.replace(/:[^:@]*@/, ':****@') : 'NOT SET';
console.log('   MongoDB URI:', maskedURI);
console.log('   MongoDB Username:', username);
console.log('   URI Source:', isProduction ? 'MONGODB_URI_PROD' : 'MONGODB_URI');
console.log('   URI Exists?:', !!MONGODB_URI ? 'YES ✓' : 'NO ✗');

console.log('\n📁 COLLECTIONS:');
console.log('   UserData Collection: For query submissions');
console.log('   contentLoader Collection: For page content');

console.log('\n⚙️  ENVIRONMENT VARIABLES CHECK:');
console.log('   MONGODB_URI:', !!process.env.MONGODB_URI ? 'SET ✓' : 'NOT SET ✗');
console.log('   MONGODB_URI_PROD:', !!process.env.MONGODB_URI_PROD ? 'SET ✓' : 'NOT SET ✗');
console.log('   DB_NAME:', !!process.env.DB_NAME ? 'SET ✓' : 'NOT SET ✗');
console.log('   DB_NAME_PROD:', !!process.env.DB_NAME_PROD ? 'SET ✓' : 'NOT SET ✗');

console.log('='.repeat(60) + '\n');

const client = new MongoClient(MONGODB_URI);
const collectionName = 'UserData';
let db;
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Security headers
app.use(helmet({
  contentSecurityPolicy: false // disabled to allow Vue SPA assets
}));

// CORS — only allow your own domain in production
const allowedOrigins = isProduction
  ? ['https://globexcfo.com', 'https://www.globexcfo.com']
  : ['http://localhost:5173', 'http://localhost:3000'];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
    callback(new Error('Not allowed by CORS'));
  },
  credentials: true
}));

app.use(express.json({ limit: '50kb' })); // body size limit

// JWT secret — must be set in production
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  if (isProduction) {
    console.error('❌ FATAL: JWT_SECRET env var is not set. Refusing to start in production.');
    process.exit(1);
  } else {
    console.warn('⚠️  JWT_SECRET not set — using dev fallback. Set it in .env for production.');
  }
}
const JWT_SECRET_VALUE = JWT_SECRET || 'dev-fallback-secret-do-not-use-in-production';

const adminLoginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { status: 'error', message: 'Too many login attempts. Please try again in 15 minutes.' }
});

// Rate limiter for public form submissions (max 5 per 10 min per IP)
const queryLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { status: 'error', message: 'Too many submissions. Please try again in 10 minutes.' }
});

const verifyAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ status: 'error', message: 'Unauthorized - No token provided' });
  }
  const token = authHeader.substring(7);
  try {
    const decoded = jwt.verify(token, JWT_SECRET_VALUE);
    if (decoded.role !== 'admin') {
      return res.status(401).json({ status: 'error', message: 'Unauthorized - Insufficient role' });
    }
    req.admin = decoded;
    next();
  } catch (error) {
    res.status(401).json({
      status: 'error',
      message: error.name === 'TokenExpiredError' ? 'Session expired - please log in again' : 'Unauthorized - Invalid token'
    });
  }
};

async function connectToMongo(){
  if(!db){
    try {
      console.log('\n' + '-'.repeat(60));
      console.log('🔗 MONGODB CONNECTION ATTEMPT');
      console.log('-'.repeat(60));
      console.log('📍 File: server.js:~80 (connectToMongo function)');
      console.log('⏰ Time:', new Date().toISOString());
      console.log('🌍 Environment:', process.env.NODE_ENV || 'development');
      console.log('💾 Target Database:', DB_NAME);
      
      // Extract username from MongoDB URI
      let username = 'N/A';
      if (MONGODB_URI) {
        const usernameMatch = MONGODB_URI.match(/mongodb(?:\+srv)?:\/\/([^:]+):/);
        if (usernameMatch) {
          username = usernameMatch[1];
        }
      }
      
      const maskedURI = MONGODB_URI ? MONGODB_URI.replace(/:[^:@]*@/, ':****@') : 'NOT SET';
      console.log('🔗 MongoDB URI:', maskedURI);
      console.log('👤 MongoDB Username:', username);
      console.log('📂 Database Type:', isProduction ? 'PRODUCTION (Dokploy)' : 'DEVELOPMENT (Atlas/Local)');
      
      console.log('\nConnecting...');
      await client.connect();
      console.log('✅ MongoDB connection established!');
      
      db = client.db(DB_NAME);
      console.log(`✅ Database selected: ${DB_NAME}`);
      
      // Test the connection by listing collections
      console.log('\n📋 Listing available collections...');
      const collections = await db.listCollections().toArray();
      console.log('   Available collections:', collections.map(c => c.name).join(', '));
      console.log('   Total collections:', collections.length);
      
      // Count documents in key collections
      try {
        const userDataCount = await db.collection('UserData').countDocuments();
        const contentCount = await db.collection('contentLoader').countDocuments();
        console.log('\n📊 Collection Stats:');
        console.log('   UserData documents:', userDataCount);
        console.log('   contentLoader documents:', contentCount);
      } catch (e) {
        console.log('   (Could not fetch collection stats)');
      }
      
      console.log('-'.repeat(60) + '\n');
      
    } catch (error) {
      console.error('\n' + '='.repeat(60));
      console.error('           ❌ MONGODB CONNECTION FAILED');
      console.error('='.repeat(60));
      console.error('📍 File: server.js:~114 (connectToMongo error handler)');
      console.error('⏰ Error Time:', new Date().toISOString());
      console.error('🌍 Environment:', process.env.NODE_ENV || 'development');
      
      console.error('\n❌ ERROR DETAILS:');
      console.error('   Error Type:', error.name);
      console.error('   Error Message:', error.message);
      console.error('   Error Code:', error.code || 'N/A');
      
      console.error('\n💾 CONNECTION DETAILS:');
      console.error('   Database Name:', DB_NAME);
      console.error('   Using:', isProduction ? 'PRODUCTION DB (MONGODB_URI_PROD)' : 'DEVELOPMENT DB (MONGODB_URI)');
      const maskedURI = MONGODB_URI ? MONGODB_URI.replace(/:[^:@]*@/, ':****@') : 'NOT SET';
      console.error('   MongoDB URI:', maskedURI);
      
      console.error('\n🔍 TROUBLESHOOTING:');
      
      if (error.message.includes('SSL') || error.message.includes('TLS')) {
        console.error('   Issue: SSL/TLS Certificate Problem');
        console.error('   Solutions:');
        console.error('   1. Whitelist your IP in MongoDB Atlas:');
        console.error('      - Go to Network Access → Add IP → Allow Access from Anywhere (0.0.0.0/0)');
        console.error('   2. Verify username and password in Database Access');
        console.error('   3. Wait 1-2 minutes after making changes');
      } else if (error.message.includes('Authentication failed')) {
        console.error('   Issue: Authentication Failed');
        console.error('   Solutions:');
        console.error('   - Check your username and password');
        console.error('   - Verify user exists in Database Access in MongoDB Atlas');
        console.error('   - Ensure password special characters are URL-encoded');
      } else if (error.message.includes('ENOTFOUND') || error.message.includes('ECONNREFUSED')) {
        console.error('   Issue: Cannot Reach MongoDB Server');
        console.error('   Solutions:');
        console.error('   - Check MongoDB cluster address in connection string');
        console.error('   - Verify internet connection');
        console.error('   - Check if MongoDB service is running (if local)');
      } else {
        console.error('   Issue: Unknown Error');
        console.error('   Check the error message and stack trace above');
      }
      
      console.error('\n📝 Environment Variables Check:');
      console.error('   MONGODB_URI:', !!process.env.MONGODB_URI ? 'SET ✓' : 'NOT SET ✗');
      console.error('   MONGODB_URI_PROD:', !!process.env.MONGODB_URI_PROD ? 'SET ✓' : 'NOT SET ✗');
      console.error('   DB_NAME:', !!process.env.DB_NAME ? 'SET ✓' : 'NOT SET ✗');
      console.error('   DB_NAME_PROD:', !!process.env.DB_NAME_PROD ? 'SET ✓' : 'NOT SET ✗');
      
      console.error('\n' + '='.repeat(60) + '\n');
      
      throw error;
    }
  }
  return db;
}

// Connect on startup
connectToMongo().catch(err => {
  console.error('Failed to connect to MongoDB on startup:', err);
});

app.use(express.static(path.join(__dirname, 'dist')));


// Basic route
app.get('/api/blogs', async (req, res) => {
  try {
    await connectToMongo();
    const blogs = await db.collection('blogs').find({}).toArray();
    res.json(blogs);
  } catch (err) {
    console.error('Error fetching blogs:', err);
    res.status(500).send({ 'status': 'error', 'message': err.message });
  }
});

app.post('/api/query', queryLimiter, async (req, res) => {
  try {
    const { name, companyName, email, contactNumber, selectedOptions, userMessage } = req.body;

    // Input validation — only allow expected fields
    if (!name || typeof name !== 'string' || name.trim().length < 1) {
      return res.status(400).json({ status: 'error', message: 'Name is required' });
    }
    if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ status: 'error', message: 'Valid email is required' });
    }

    // Whitelist only allowed fields — nothing extra goes to DB
    const safeDoc = {
      name: String(name).trim().substring(0, 100),
      companyName: companyName ? String(companyName).trim().substring(0, 100) : '',
      email: String(email).trim().toLowerCase().substring(0, 200),
      contactNumber: contactNumber ? String(contactNumber).trim().substring(0, 20) : '',
      selectedOptions: Array.isArray(selectedOptions) ? selectedOptions.slice(0, 20).map(s => String(s).substring(0, 100)) : [],
      userMessage: userMessage ? String(userMessage).trim().substring(0, 2000) : '',
      submittedAt: new Date()
    };

    console.log(`[${new Date().toISOString()}] New query submission from: ${safeDoc.email}`);

    await connectToMongo();
    const result = await db.collection(collectionName).insertOne(safeDoc);

    console.log(`✅ Query saved: ${result.insertedId}`);
    res.json({ status: 'ok' });

  } catch (err) {
    console.error(`[${new Date().toISOString()}] Error saving query:`, err.message);
    res.status(500).json({ status: 'error', message: 'Failed to submit. Please try again.' });
  }
});

// Get all queries - protected, admin only
app.get('/api/queries', verifyAdmin, async (req, res) => {
  try {
    await connectToMongo();
    const queries = await db.collection(collectionName).find({}).sort({ _id: -1 }).toArray();
    console.log(`[${new Date().toISOString()}] Admin fetched ${queries.length} queries`);
    res.json({ status: 'success', count: queries.length, data: queries });
  } catch (err) {
    console.error('❌ Error fetching queries:', err.message);
    res.status(500).json({ status: 'error', message: 'Failed to fetch data' });
  }
});


// Get content by key from contentLoader collection
app.get('/api/content/:key', async (req, res) => {
  try {
    const { key } = req.params;
    console.log('\n' + '-'.repeat(60));
    console.log(`📖 FETCHING CONTENT: ${key}`);
    console.log('-'.repeat(60));
    console.log('📍 File: server.js:~280 (GET /api/content/:key)');
    console.log('⏰ Time:', new Date().toISOString());
    console.log('🌍 Environment:', process.env.NODE_ENV || 'development');
    console.log('💾 Database:', DB_NAME);
    console.log('📁 Collection: contentLoader');
    console.log('🔑 Requested Key:', key);
    
    await connectToMongo();
    
    console.log('\n🔍 Searching for document...');
    const content = await db.collection('contentLoader').findOne({ key: key });
    
    if (!content) {
      console.log(`⚠️  NOT FOUND: No content with key "${key}"`);
      console.log('💡 Available keys in database:');
      const allKeys = await db.collection('contentLoader').find({}, { projection: { key: 1 } }).toArray();
      console.log('   ', allKeys.map(doc => doc.key).join(', '));
      console.log('-'.repeat(60) + '\n');
      
      return res.status(404).json({ 
        status: 'error', 
        message: `Content not found for key: ${key}`,
        availableKeys: allKeys.map(doc => doc.key)
      });
    }
    
    console.log(`✅ Content found for key: ${key}`);
    console.log('📋 Document fields:', Object.keys(content).filter(k => k !== '_id').join(', '));
    console.log('-'.repeat(60) + '\n');
    
    res.json({ status: 'success', data: content });
  } catch (err) {
    console.error(`[${new Date().toISOString()}] Error fetching content key: ${req.params.key}:`, err.message);
    res.status(500).json({ status: 'error', message: 'Failed to fetch content' });
  }
});

// Get all content from contentLoader collection
app.get('/api/content', async (req, res) => {
  try {
    console.log('\n=== Fetching All Content ===');
    await connectToMongo();
    
    const allContent = await db.collection('contentLoader').find({}).toArray();
    
    console.log(`✅ Found ${allContent.length} content items`);
    console.log('===========================\n');
    
    res.json({ 
      status: 'success',
      count: allContent.length,
      data: allContent 
    });
  } catch (err) {
    console.error('❌ Error fetching all content:', err);
    res.status(500).json({ 'status': 'error', 'message': err.message });
  }
});

// Admin login endpoint (rate limited)
app.post('/api/admin/login', adminLoginLimiter, async (req, res) => {
  try {
    const { username, password } = req.body;
    const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

    if (!ADMIN_USERNAME || !ADMIN_PASSWORD) {
      return res.status(500).json({ status: 'error', message: 'Admin credentials not configured' });
    }

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      const token = jwt.sign({ username, role: 'admin' }, JWT_SECRET_VALUE, { expiresIn: '8h' });
      console.log('✅ Admin login successful');
      res.json({ status: 'success', message: 'Authentication successful', token });
    } else {
      console.log('❌ Admin login failed - invalid credentials');
      res.status(401).json({ status: 'error', message: 'Invalid username or password' });
    }
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Login failed' });
  }
});

// Admin submissions endpoint (JWT protected)
app.get('/api/admin/submissions', verifyAdmin, async (req, res) => {
  try {
    await connectToMongo();
    const submissions = await db.collection(collectionName).find({}).sort({ _id: -1 }).toArray();
    console.log('✅ Admin fetched', submissions.length, 'submissions');
    res.json({ status: 'success', count: submissions.length, database: DB_NAME, collection: collectionName, data: submissions });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Failed to fetch submissions' });
  }
});

// Serve Vue.js frontend for all non-API routes (SPA support)
app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Start server
const HOST = process.env.HOST || '0.0.0.0';
app.listen(PORT, HOST, () => {
  console.log('\n🚀 Server started successfully!');
  console.log(`📡 Server running on http://${HOST}:${PORT}`);
  console.log('\n📌 Available Endpoints:');
  console.log(`   - GET  http://localhost:${PORT}/api/test-connection (Test MongoDB)`);
  console.log(`   - GET  http://localhost:${PORT}/api/queries (View all saved queries)`);
  console.log(`   - POST http://localhost:${PORT}/api/query (Submit new query)`);
  console.log(`   - GET  http://localhost:${PORT}/api/blogs (Get blog posts)`);
  console.log('\n💡 To test MongoDB connection, visit:');
  console.log(`   http://localhost:${PORT}/api/test-connection\n`);
});