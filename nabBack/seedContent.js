// Quick script to add sample content to MongoDB
require('dotenv').config();
const { MongoClient } = require('mongodb');

const client = new MongoClient(process.env.MONGODB_URI);

async function seedContent() {
  try {
    console.log('🌱 Seeding content to MongoDB...\n');
    
    await client.connect();
    console.log('✅ Connected to MongoDB');
    
    const db = client.db(process.env.DB_NAME);
    const collection = db.collection('contentLoader');
    
    // Complete content for home page
    const sampleContent = [
      // Hero Section
      {
        key: 'hero',
        title: 'Finance Simplified. Growth Amplified.',
        subtitle: 'Globex CFO Advisory — empowering Indian startups and global SMEs with clarity, control, and confidence in every financial decision.',
        quote: '"Behind every successful business is a smart financial strategy." — Peter Drucker',
        lastUpdated: new Date()
      },
      
      // Why Every Business Needs a CFO Section
      {
        key: 'cfo-section',
        heading: '💼 Why Every Business Needs a CFO',
        subheading: 'Because behind every successful business is a clear financial roadmap — and that\'s exactly what a CFO brings.',
        description: 'From building financial models to managing cash flow, our Virtual CFO services give startups and SMEs the expertise big companies rely on — at a fraction of the cost.',
        benefits: [
          {
            icon: '📊',
            title: 'Financial Clarity & Direction',
            description: 'Real-time visibility into profits, performance, and cash flow.'
          },
          {
            icon: '📈',
            title: 'Financial Models & Growth Strategy',
            description: 'Insight-backed models for better decisions.'
          },
          {
            icon: '💰',
            title: 'Cash Flow Mastery',
            description: 'Predict, manage, and optimize cash flow.'
          },
          {
            icon: '📉',
            title: 'Profit Management',
            description: 'Forecast, control expenses, and optimize margins.'
          },
          {
            icon: '✅',
            title: 'Compliance Without Confusion',
            description: 'Stay clean and compliant.'
          }
        ],
        closingQuote: '"A CFO isn\'t just for large corporations — it\'s the difference between running your business and growing it."',
        lastUpdated: new Date()
      },
      
      // Why Work With Us Section
      {
        key: 'why-us',
        heading: '🤝 Why Work With Us',
        subheading: 'Because we understand business the way founders do — practical, fast, and focused on results.',
        benefits: [
          {
            icon: '🎯',
            title: 'Scalable & Customised Solutions',
            description: 'Tailored to your stage of growth.'
          },
          {
            icon: '🧠',
            title: 'Strategy Meets Simplicity',
            description: 'Clear financial insights without confusion.'
          },
          {
            icon: '🎓',
            title: 'Founder-Led Expertise',
            description: 'Led by a CA & ACCA professional.'
          },
          {
            icon: '📊',
            title: 'CFO-Led Financial Models',
            description: 'Powerful models for better decisions.'
          },
          {
            icon: '🛠️',
            title: 'Hands-On Approach',
            description: 'We help implement systems.'
          },
          {
            icon: '💎',
            title: 'Investor-Ready Confidence',
            description: 'Numbers that speak clearly.'
          }
        ],
        closingQuote: '"At Globex, we don\'t just manage your numbers — we empower your business to grow through them."',
        lastUpdated: new Date()
      },
      
      // Financial Models Section
      {
        key: 'financial-models',
        heading: 'Financial Models That Empower Business Growth',
        subheading: 'Smart businesses don\'t guess — they plan with precision.',
        whyItMatters: {
          title: 'Why Financial Models Matter',
          description: 'Financial models offer clarity, control, and confidence. They show how your business earns, spends, and grows.'
        },
        modelTypes: {
          title: 'Types of Financial Models',
          list: [
            'Dashboard & MIS Model',
            '3-Statement Integrated Model',
            'Startup Financial Model',
            'Forecasting & Budgeting Model',
            'Cash Flow Model',
            'Investor & Valuation Model',
            'Scenario & Sensitivity Model',
            'Project Profitability Model'
          ]
        },
        closingQuote: '"What gets measured gets managed — and what gets modeled gets mastered." — Peter Drucker',
        lastUpdated: new Date()
      },
      
      // Contact Info
      {
        key: 'contact-info',
        email: 'contact@globexcfo.com',
        phone: '+91 123 456 7890',
        socialMedia: {
          linkedin: 'https://linkedin.com/company/globex-cfo',
          twitter: 'https://twitter.com/globexcfo',
          instagram: 'https://instagram.com/globexcfo',
          facebook: 'https://facebook.com/globexcfo'
        },
        lastUpdated: new Date()
      }
    ];
    
    // Delete existing content (optional)
    console.log('\n🗑️  Clearing existing content...');
    await collection.deleteMany({});
    
    // Insert new content
    console.log('📝 Inserting new content...\n');
    const result = await collection.insertMany(sampleContent);
    
    console.log(`✅ Successfully inserted ${result.insertedCount} documents\n`);
    
    // Display inserted content
    const allContent = await collection.find({}).toArray();
    console.log('📋 Content in database:');
    allContent.forEach((doc, index) => {
      console.log(`\n${index + 1}. Key: "${doc.key}"`);
      console.log(`   Fields:`, Object.keys(doc).filter(k => k !== '_id' && k !== 'key').join(', '));
    });
    
    console.log('\n🎉 Content seeding completed successfully!');
    console.log('\n💡 Test your content:');
    console.log('   - Visit: http://localhost:3000/api/content/hero');
    console.log('   - Or: http://localhost:3000/api/content');
    console.log('   - Then check your Home page!\n');
    
  } catch (error) {
    console.error('❌ Error seeding content:', error);
  } finally {
    await client.close();
    console.log('🔌 Disconnected from MongoDB');
  }
}

// Run the seeding function
seedContent();

