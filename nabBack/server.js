// server.js
require('dotenv').config();
const { MongoClient } = require('mongodb');
const path = require('path');

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
app.use(express.json());

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

// Test MongoDB connection endpoint
app.get('/api/test-connection', async (req, res) => {
  try {
    await connectToMongo();
    
    // Test write operation
    const testDoc = { 
      test: true, 
      timestamp: new Date(),
      message: 'Test connection document'
    };
    const result = await db.collection(collectionName).insertOne(testDoc);
    
    // Count documents
    const count = await db.collection(collectionName).countDocuments();
    
    // Get latest document
    const latest = await db.collection(collectionName)
      .find({})
      .sort({ _id: -1 })
      .limit(1)
      .toArray();
    
    res.json({
      status: '✅ SUCCESS',
      message: 'MongoDB connection is working!',
      database: DB_NAME,
      collection: collectionName,
      totalDocuments: count,
      testInsertId: result.insertedId,
      latestDocument: latest[0]
    });
  } catch (err) {
    console.error('❌ Connection test failed:', err);
    res.status(500).json({
      status: '❌ FAILED',
      message: 'MongoDB connection failed',
      error: err.message,
      database: DB_NAME,
      collection: collectionName
    });
  }
});

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

app.post('/api/query', async (req, res) => {
   try {
     console.log('\n' + '='.repeat(70));
     console.log('                    NEW QUERY SUBMISSION');
     console.log('='.repeat(70));
     console.log('📍 File: server.js:~165 (POST /api/query endpoint)');
     console.log('⏰ Timestamp:', new Date().toISOString());
     console.log('🌍 Environment:', process.env.NODE_ENV || 'development');
     console.log('💾 Using Database:', isProduction ? 'PRODUCTION ⚠️' : 'DEVELOPMENT');
     
     console.log('\n📝 REQUEST DETAILS:');
     console.log('   Method: POST');
     console.log('   Endpoint: /api/query');
     console.log('   Source: Query.vue (frontend form submission)');
     console.log('   Content-Type:', req.headers['content-type']);
     
     console.log('\n📋 USER DATA RECEIVED:');
     console.log('   Name:', req.body.name || 'NOT PROVIDED');
     console.log('   Company:', req.body.companyName || 'NOT PROVIDED');
     console.log('   Email:', req.body.email || 'NOT PROVIDED');
     console.log('   Phone:', req.body.contactNumber || 'NOT PROVIDED');
     console.log('   Services Selected:', req.body.selectedOptions?.length || 0, 'items');
     if (req.body.selectedOptions?.length > 0) {
       req.body.selectedOptions.forEach((service, idx) => {
         console.log(`      ${idx + 1}. ${service}`);
       });
     }
     console.log('   Message Length:', req.body.userMessage?.length || 0, 'characters');
     
     console.log('\n🔗 MONGODB CONNECTION:');
     console.log('   Step 1: Connecting to MongoDB...');
     console.log('   File: server.js:~180');
     await connectToMongo();
     console.log('   ✅ Connected successfully');
     
     console.log('\n💾 DATABASE DETAILS:');
     console.log('   Database Name:', DB_NAME);
     console.log('   Collection:', collectionName);
     
     // Extract username for query submission
     let queryUsername = 'N/A';
     if (MONGODB_URI) {
       const usernameMatch = MONGODB_URI.match(/mongodb(?:\+srv)?:\/\/([^:]+):/);
       if (usernameMatch) {
         queryUsername = usernameMatch[1];
       }
     }
     console.log('   MongoDB Username:', queryUsername);
     console.log('   MongoDB Type:', isProduction ? 'Production (Dokploy)' : 'Development (Atlas/Local)');
     
     console.log('\n📤 INSERTING DOCUMENT:');
     console.log('   Step 2: Inserting document into MongoDB...');
     console.log('   File: server.js:~195');
     console.log('   Data to insert:');
     console.log(JSON.stringify(req.body, null, 2));
     
     let result = await db.collection(collectionName).insertOne(req.body);
     
     console.log('\n✅ INSERTION SUCCESS:');
     console.log('   Inserted ID:', result.insertedId);
     console.log('   Acknowledged:', result.acknowledged ? 'YES ✓' : 'NO ✗');
     console.log('   Insertion Time:', new Date().toISOString());
     
     console.log('\n🔍 VERIFICATION:');
     console.log('   Step 3: Verifying document was saved...');
     console.log('   File: server.js:~210');
     const savedDoc = await db.collection(collectionName).findOne({ _id: result.insertedId });
     console.log('   Document Found?:', !!savedDoc ? 'YES ✓' : 'NO ✗');
     
     if (savedDoc) {
       console.log('   ✅ Verified: Document successfully saved to database');
       console.log('   Document _id:', savedDoc._id);
       console.log('   Document name:', savedDoc.name);
       console.log('   Document email:', savedDoc.email);
     } else {
       console.log('   ⚠️ WARNING: Document not found after insertion!');
     }
     
     // Extract username for response
     let responseUsername = 'N/A';
     if (MONGODB_URI) {
       const usernameMatch = MONGODB_URI.match(/mongodb(?:\+srv)?:\/\/([^:]+):/);
       if (usernameMatch) {
         responseUsername = usernameMatch[1];
       }
     }
     
     console.log('\n📨 SENDING RESPONSE:');
     console.log('   Status: 200 OK');
     console.log('   Response Data:');
     console.log('   - status: ok');
     console.log('   - insertedId:', result.insertedId);
     console.log('   - database:', DB_NAME);
     console.log('   - collection:', collectionName);
     console.log('   - mongoUsername:', responseUsername);
     console.log('   - environment:', process.env.NODE_ENV || 'development');
     
     console.log('\n' + '='.repeat(70));
     console.log('           QUERY SUBMISSION COMPLETED SUCCESSFULLY');
     console.log('='.repeat(70) + '\n');
     
     res.send({ 
       'status': 'ok',
       'insertedId': result.insertedId,
       'database': DB_NAME,
       'collection': collectionName,
       'mongoUsername': responseUsername,
       'environment': process.env.NODE_ENV || 'development'
     });
   } catch (err) {
     console.log('\n' + '='.repeat(70));
     console.log('                    ❌ ERROR OCCURRED');
     console.log('='.repeat(70));
     console.log('📍 File: server.js:~240 (catch block)');
     console.log('⏰ Error Time:', new Date().toISOString());
     console.log('🌍 Environment:', process.env.NODE_ENV || 'development');
     console.log('\n❌ ERROR DETAILS:');
     console.log('   Error Type:', err.name);
     console.log('   Error Message:', err.message);
     console.log('   Error Code:', err.code || 'N/A');
     
     if (err.stack) {
       console.log('\n📚 STACK TRACE:');
       console.log(err.stack);
     }
     
     console.log('\n🔍 REQUEST DATA THAT FAILED:');
     console.log(JSON.stringify(req.body, null, 2));
     
     console.log('\n💾 DATABASE INFO:');
     console.log('   Attempted Database:', DB_NAME);
     console.log('   Attempted Collection:', collectionName);
     console.log('   MongoDB Connected?:', !!db ? 'YES' : 'NO');
     
     console.log('\n' + '='.repeat(70));
     console.log('              END OF ERROR LOG');
     console.log('='.repeat(70) + '\n');
     
     res.status(500).send({ 
       'status': 'error', 
       'message': err.message,
       'environment': process.env.NODE_ENV || 'development'
     });
   }
});

// Get all queries - for viewing saved data
app.get('/api/queries', async (req, res) => {
  try {
    console.log('\n=== Fetching All Queries ===');
    await connectToMongo();
    console.log(`📂 Database: ${DB_NAME}`);
    console.log(`📁 Collection: ${collectionName}`);
    
    const queries = await db.collection(collectionName).find({}).sort({ _id: -1 }).toArray();
    
    console.log(`✅ Found ${queries.length} documents`);
    console.log('===========================\n');
    
    res.json({ 
      status: 'success', 
      database: DB_NAME,
      collection: collectionName,
      count: queries.length,
      data: queries 
    });
  } catch (err) {
    console.error('❌ Error fetching queries:', err);
    res.status(500).send({ 'status': 'error', 'message': err.message });
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
    
    res.json({ 
      status: 'success',
      data: content,
      environment: process.env.NODE_ENV || 'development'
    });
  } catch (err) {
    console.error('\n' + '='.repeat(60));
    console.error('❌ ERROR FETCHING CONTENT');
    console.error('='.repeat(60));
    console.error('📍 File: server.js:~315 (content fetch error)');
    console.error('⏰ Error Time:', new Date().toISOString());
    console.error('🔑 Requested Key:', req.params.key);
    console.error('❌ Error:', err.message);
    console.error('='.repeat(60) + '\n');
    
    res.status(500).json({ 
      'status': 'error', 
      'message': err.message,
      'environment': process.env.NODE_ENV || 'development'
    });
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

// Serve Vue.js frontend for all non-API routes (SPA support)
// Express 5 compatible: Use regex instead of '*'
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