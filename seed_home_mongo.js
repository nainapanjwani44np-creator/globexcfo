// MongoDB Shell Script - Seed Home Page Content
// Run with: mongosh "mongodb://mongo_admin_root:HardPassCode%409351@globalcfo-globexcfodb-m0uggj:27017/UserData" --file seed_home_mongo.js

// Switch to the database
use UserData;

// Clear existing content (optional)
print("🗑️  Clearing existing content...");
db.contentLoader.deleteMany({});

// Insert Home page content
print("📝 Inserting Home page content...\n");

const result = db.contentLoader.insertMany([
  // Hero Section
  {
    key: 'hero',
    title: 'Finance Simplified. Growth Amplified.',
    subtitle: 'Globex CFO Advisory — empowering Indian startups and global SMEs with clarity, control, and confidence in every financial decision.',
    quote: '"Behind every successful business is a smart financial strategy." — Peter Drucker',
    lastUpdated: new Date()
  },
  
  // CFO Section
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
  
  // Why Us Section
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
]);

print(`\n✅ Successfully inserted ${result.insertedCount} documents!\n`);

// Display what was inserted
print("📋 Inserted documents:");
db.contentLoader.find({}, {key: 1, _id: 0}).forEach(function(doc) {
  print(`   ✓ ${doc.key}`);
});

print("\n🎉 Home page content seeded successfully!");
print("\n💡 Test your content:");
print("   - API: /api/content/hero");
print("   - API: /api/content/cfo-section");
print("   - API: /api/content/why-us");
print("   - API: /api/content/financial-models");
print("   - Page: Visit your Home page!\n");

