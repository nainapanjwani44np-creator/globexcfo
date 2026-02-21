const express = require('express');
const path = require('path');
const cors = require('cors');
const { MongoClient } = require('mongodb');
require('dotenv').config();

const app = express();

// Environment variables
const isProduction = process.env.NODE_ENV === 'production';
const MONGODB_URI = isProduction ? process.env.MONGODB_URI_PROD : process.env.MONGODB_URI;
const DB_NAME = isProduction ? process.env.DB_NAME_PROD : process.env.DB_NAME;
const collectionName = 'UserData';
const ADMIN_PORT = process.env.ADMIN_PORT || 4000;
const ADMIN_HOST = process.env.ADMIN_HOST || '127.0.0.1'; // localhost only by default

let db = null;

// Middleware
app.use(cors());
app.use(express.json());

console.log('\n' + '='.repeat(70));
console.log('           🔒 ADMIN SERVER STARTING (SECURE MODE)');
console.log('='.repeat(70));
console.log('⚠️  WARNING: This is the ADMIN-ONLY server');
console.log('⚠️  Do NOT expose this port to the public internet!');
console.log('='.repeat(70));
console.log('🌍 Environment:', process.env.NODE_ENV || 'development');
console.log('🔒 Admin Port:', ADMIN_PORT);
console.log('🔒 Admin Host:', ADMIN_HOST);
console.log('💾 Database:', DB_NAME);
console.log('📁 Collection:', collectionName);
console.log('='.repeat(70) + '\n');

// MongoDB connection
async function connectToMongo() {
  if (db) return db;

  try {
    console.log('🔗 Connecting to MongoDB...');
    console.log('   URI Type:', isProduction ? 'Production' : 'Development');
    
    const client = await MongoClient.connect(MONGODB_URI);
    
    db = client.db(DB_NAME);
    console.log('✅ Connected to MongoDB successfully');
    console.log('   Database:', DB_NAME);
    
    // List collections
    const collections = await db.listCollections().toArray();
    console.log('   Collections available:', collections.map(c => c.name).join(', '));
    
    return db;
  } catch (error) {
    console.error('\n❌ MONGODB CONNECTION ERROR:');
    console.error('   Error:', error.message);
    console.error('   Stack:', error.stack);
    throw error;
  }
}

// Connect on startup
connectToMongo().catch(err => {
  console.error('Failed to connect to MongoDB on startup:', err);
  process.exit(1);
});

// Admin authentication endpoint
app.post('/api/admin/login', async (req, res) => {
  try {
    console.log('\n' + '='.repeat(70));
    console.log('                ADMIN: LOGIN ATTEMPT');
    console.log('='.repeat(70));
    console.log('📍 Endpoint: POST /api/admin/login');
    console.log('⏰ Timestamp:', new Date().toISOString());
    console.log('🔒 Source IP:', req.ip || req.connection.remoteAddress);
    
    const { username, password } = req.body;
    
    const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';
    
    console.log('👤 Username provided:', username);
    console.log('🔐 Password check:', password ? '***' : 'NOT PROVIDED');
    
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      console.log('✅ Authentication successful');
      console.log('='.repeat(70) + '\n');
      
      // Generate a simple token (in production, use JWT)
      const token = Buffer.from(`${username}:${password}:${Date.now()}`).toString('base64');
      
      res.json({
        status: 'success',
        message: 'Authentication successful',
        token: token
      });
    } else {
      console.log('❌ Authentication failed - Invalid credentials');
      console.log('='.repeat(70) + '\n');
      
      res.status(401).json({
        status: 'error',
        message: 'Invalid username or password'
      });
    }
  } catch (error) {
    console.error('\n❌ ERROR IN LOGIN:');
    console.error('   Error:', error.message);
    console.error('='.repeat(70) + '\n');
    
    res.status(500).json({
      status: 'error',
      message: 'Login failed',
      error: error.message
    });
  }
});

// Middleware to verify admin authentication
const verifyAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    console.log('❌ No authorization token provided');
    return res.status(401).json({
      status: 'error',
      message: 'Unauthorized - No token provided'
    });
  }
  
  const token = authHeader.substring(7);
  
  try {
    const decoded = Buffer.from(token, 'base64').toString('utf-8');
    const [username, password] = decoded.split(':');
    
    const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';
    
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      console.log('✅ Token verified - Admin access granted');
      next();
    } else {
      console.log('❌ Invalid token');
      res.status(401).json({
        status: 'error',
        message: 'Unauthorized - Invalid token'
      });
    }
  } catch (error) {
    console.log('❌ Token verification failed:', error.message);
    res.status(401).json({
      status: 'error',
      message: 'Unauthorized - Invalid token format'
    });
  }
};

// Admin endpoint to fetch all form submissions (PROTECTED)
app.get('/api/admin/submissions', verifyAdmin, async (req, res) => {
  try {
    console.log('\n' + '='.repeat(70));
    console.log('                ADMIN: FETCHING ALL SUBMISSIONS');
    console.log('='.repeat(70));
    console.log('📍 Endpoint: GET /api/admin/submissions');
    console.log('⏰ Timestamp:', new Date().toISOString());
    console.log('🔒 Source IP:', req.ip || req.connection.remoteAddress);
    console.log('🌍 Environment:', process.env.NODE_ENV || 'development');
    console.log('💾 Database:', DB_NAME);
    console.log('📁 Collection:', collectionName);
    console.log('🔒 Authenticated: YES');
    
    await connectToMongo();
    
    const submissions = await db.collection(collectionName)
      .find({})
      .sort({ _id: -1 })
      .toArray();
    
    console.log('✅ Retrieved', submissions.length, 'submissions');
    console.log('='.repeat(70) + '\n');
    
    res.json({
      status: 'success',
      count: submissions.length,
      database: DB_NAME,
      collection: collectionName,
      data: submissions
    });
  } catch (error) {
    console.error('\n❌ ERROR FETCHING SUBMISSIONS:');
    console.error('   Error:', error.message);
    console.error('   Stack:', error.stack);
    console.error('='.repeat(70) + '\n');
    
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch submissions',
      error: error.message
    });
  }
});

// Health check endpoint
app.get('/api/admin/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Admin server is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    database: DB_NAME
  });
});

// Serve admin static files
app.use(express.static(path.join(__dirname, 'admin-dist')));

// Serve admin dashboard for all routes (Express 5 compatible)
app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, 'admin-dist', 'admin.html'));
});

// Start admin server (bind to localhost only by default)
app.listen(ADMIN_PORT, ADMIN_HOST, () => {
  console.log('\n' + '='.repeat(70));
  console.log('           🔒 ADMIN SERVER RUNNING');
  console.log('='.repeat(70));
  console.log('🌐 Admin URL:', `http://${ADMIN_HOST}:${ADMIN_PORT}`);
  console.log('🔒 Access:', ADMIN_HOST === '127.0.0.1' || ADMIN_HOST === 'localhost' ? 'LOCAL ONLY ✅' : '⚠️  EXPOSED TO NETWORK');
  console.log('💾 Database:', DB_NAME);
  console.log('🌍 Environment:', process.env.NODE_ENV || 'development');
  console.log('='.repeat(70));
  console.log('\n📝 SECURITY NOTES:');
  console.log('   1. This server is for admin access only');
  console.log('   2. Do NOT expose this port to public internet');
  console.log('   3. Use SSH tunnel or VPN for remote access');
  console.log('   4. Set firewall rules to block external access');
  console.log('   5. Access via: ssh -L 4000:localhost:4000 user@server');
  console.log('='.repeat(70) + '\n');
});

// Error handling
process.on('unhandledRejection', (error) => {
  console.error('❌ Unhandled Promise Rejection:', error);
});

process.on('uncaughtException', (error) => {
  console.error('❌ Uncaught Exception:', error);
  process.exit(1);
});
