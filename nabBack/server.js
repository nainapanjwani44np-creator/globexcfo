// server.js
require('dotenv').config();
const { MongoClient } = require('mongodb');
const path = require('path');

// Log environment variables (without exposing password)
console.log('=== MongoDB Configuration ===');
console.log('MongoDB URI exists:', !!process.env.MONGODB_URI);
console.log('Database Name:', process.env.DB_NAME);
console.log('Collection Name: UserData');
console.log('============================\n');

// MongoDB client - only initialize if URI is provided
let client = null;
let db = null;
const collectionName = 'UserData';

if (process.env.MONGODB_URI) {
  client = new MongoClient(process.env.MONGODB_URI);
} else {
  console.warn('⚠️  WARNING: MONGODB_URI not set. MongoDB features will be disabled.');
  console.warn('⚠️  Website will still work, but forms/queries will not save data.\n');
}
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());

async function connectToMongo(){
  // If no MongoDB URI configured, return null
  if (!client) {
    throw new Error('MongoDB not configured. Set MONGODB_URI environment variable.');
  }
  
  if(!db){
    try {
      console.log('Attempting to connect to MongoDB...');
      await client.connect();
      console.log('✅ Successfully connected to MongoDB!');
      db = client.db(process.env.DB_NAME);
      console.log(`✅ Using database: ${process.env.DB_NAME}`);
      
      // Test the connection by listing collections
      const collections = await db.listCollections().toArray();
      console.log('📋 Available collections:', collections.map(c => c.name).join(', '));
      
    } catch (error) {
      console.error('\n❌ MongoDB Connection Error:', error.message);
      console.error('\n🔍 Common Solutions:');
      
      if (error.message.includes('SSL') || error.message.includes('TLS')) {
        console.error('   1. Whitelist your IP in MongoDB Atlas:');
        console.error('      - Go to Network Access → Add IP → Allow Access from Anywhere (0.0.0.0/0)');
        console.error('   2. Verify username and password in Database Access');
        console.error('   3. Wait 1-2 minutes after making changes');
      } else if (error.message.includes('Authentication failed')) {
        console.error('   - Check your username and password in .env file');
        console.error('   - Verify user exists in Database Access in MongoDB Atlas');
      } else if (error.message.includes('ENOTFOUND')) {
        console.error('   - Check your MongoDB cluster address in connection string');
        console.error('   - Verify internet connection');
      }
      
      console.error('\n📝 Your .env should look like:');
      console.error('   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/');
      console.error('   DB_NAME=baisWebData');
      console.error('\n📖 See ENV_SETUP_GUIDE.md for detailed help\n');
      
      throw error;
    }
  }
  return db;
}

// Connect on startup (but don't crash if it fails)
if (client) {
  connectToMongo().catch(err => {
    console.error('⚠️  Failed to connect to MongoDB on startup:', err.message);
    console.error('⚠️  Server will continue running. MongoDB will retry on first API request.');
  });
} else {
  console.log('ℹ️  Skipping MongoDB connection (not configured)');
  console.log('ℹ️  Static website will work, but API endpoints will return errors\n');
}

app.use(express.static(path.join(__dirname, 'dist')));

// Health check endpoint for Dokploy
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
    mongodb: client ? (db ? 'connected' : 'not connected') : 'not configured'
  });
});

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
      database: process.env.DB_NAME,
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
      database: process.env.DB_NAME,
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
     console.log('\n=== New Query Submission ===');
     console.log('📝 User query data:', JSON.stringify(req.body, null, 2));
     
     await connectToMongo();
     console.log(`💾 Saving to database: ${process.env.DB_NAME}`);
     console.log(`📁 Collection: ${collectionName}`);
     
     let result = await db.collection(collectionName).insertOne(req.body);
     
     console.log('✅ Insertion successful!');
     console.log('📋 Inserted ID:', result.insertedId);
     console.log('📊 Acknowledged:', result.acknowledged);
     
     // Verify the document was saved
     const savedDoc = await db.collection(collectionName).findOne({ _id: result.insertedId });
     console.log('✅ Verified document exists in DB:', !!savedDoc);
     console.log('==========================\n');
     
     res.send({ 
       'status': 'ok',
       'insertedId': result.insertedId,
       'database': process.env.DB_NAME,
       'collection': collectionName
     });
   } catch (err) {
     console.error('❌ Error inserting data:', err);
     console.error('Error details:', err.message);
     res.status(500).send({ 'status': 'error', 'message': err.message });
   }
});

// Get all queries - for viewing saved data
app.get('/api/queries', async (req, res) => {
  try {
    console.log('\n=== Fetching All Queries ===');
    await connectToMongo();
    console.log(`📂 Database: ${process.env.DB_NAME}`);
    console.log(`📁 Collection: ${collectionName}`);
    
    const queries = await db.collection(collectionName).find({}).sort({ _id: -1 }).toArray();
    
    console.log(`✅ Found ${queries.length} documents`);
    console.log('===========================\n');
    
    res.json({ 
      status: 'success', 
      database: process.env.DB_NAME,
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
    console.log(`\n=== Fetching Content: ${key} ===`);
    
    await connectToMongo();
    const content = await db.collection('contentLoader').findOne({ key: key });
    
    if (!content) {
      console.log(`⚠️ Content not found for key: ${key}`);
      return res.status(404).json({ 
        status: 'error', 
        message: `Content not found for key: ${key}` 
      });
    }
    
    console.log(`✅ Content found for key: ${key}`);
    console.log('===========================\n');
    
    res.json({ 
      status: 'success',
      data: content 
    });
  } catch (err) {
    console.error('❌ Error fetching content:', err);
    res.status(500).json({ 'status': 'error', 'message': err.message });
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
// Express 5 compatible catch-all route
app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Start server
const HOST = process.env.HOST || '0.0.0.0';
app.listen(PORT, HOST, () => {
  console.log('\n🚀 Server started successfully!');
  console.log(`📡 Server running on http://${HOST}:${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`💾 MongoDB: ${client ? (db ? '✅ Connected' : '⏳ Connecting...') : '⚠️  Not Configured'}`);
  console.log('\n📌 Available Endpoints:');
  console.log(`   - GET  /health (Server health check)`);
  console.log(`   - GET  /api/test-connection (Test MongoDB)`);
  console.log(`   - GET  /api/queries (View all saved queries)`);
  console.log(`   - POST /api/query (Submit new query)`);
  console.log(`   - GET  /api/blogs (Get blog posts)`);
  console.log(`   - GET  /api/content (Get all content)`);
  console.log(`   - GET  /api/content/:key (Get specific content)`);
  if (!client) {
    console.log('\n⚠️  Note: MongoDB not configured. Website will work, but API endpoints will fail.');
    console.log('   To enable MongoDB, set MONGODB_URI and DB_NAME environment variables.');
  }
  console.log('\n💡 To test the server, visit:');
  console.log(`   http://${HOST === '0.0.0.0' ? 'localhost' : HOST}:${PORT}/health\n`);
});