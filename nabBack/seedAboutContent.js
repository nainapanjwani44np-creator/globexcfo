// Seed script for About Us page content
require('dotenv').config();
const { MongoClient } = require('mongodb');

const client = new MongoClient(process.env.MONGODB_URI);

async function seedAboutContent() {
  try {
    console.log('🌱 Seeding About Us content to MongoDB...\n');
    
    await client.connect();
    console.log('✅ Connected to MongoDB');
    
    const db = client.db(process.env.DB_NAME);
    const collection = db.collection('contentLoader');
    
    // About page content
    const aboutContent = [
      // Hero Section
      {
        key: 'about-hero',
        title: 'About The Founder',
        subtitle: 'Meet Naina Panjwani — CA (India), ACCA (UK) and the Concept Founder of Globex CFO Advisory LLP.',
        lastUpdated: new Date()
      },
      
      // About Founder
      {
        key: 'about-founder',
        heading: 'About Naina Panjwani',
        preview: 'Naina Panjwani, CA (India), ACCA (UK) is a globally qualified finance professional and the Concept Founder of Globex CFO Advisory LLP.',
        paragraphs: [
          'With over 5 years of experience in Audit and Financial Management, she has worked with fast-growing startups and established businesses across industries — gaining deep insight into how finance, strategy, and operations work together.',
          'Throughout her career, she observed a consistent gap — while companies had accountants and auditors, they often lacked strategic financial guidance. Someone who could convert numbers into strategy. This inspired her to create Globex CFO Advisory LLP.',
          'Her dual qualifications in Indian and global finance make Globex a trusted partner for startups, SMEs, and international ventures.'
        ],
        closing: 'Her belief is simple: Finance should empower, not overwhelm — and every business deserves world-class financial clarity.',
        lastUpdated: new Date()
      },
      
      // Founder Message
      {
        key: 'founder-message',
        heading: "Founder's Message",
        preview: 'Finance isn\'t just about recording the past — it\'s about shaping the future.',
        paragraphs: [
          'Businesses don\'t fail because they lack vision — they fail because they lack financial clarity.',
          'My goal with Globex is to bridge the gap between accounting and strategy. To give founders the clarity to make decisions that move their business forward. And to make world-class CFO expertise accessible to every entrepreneur, regardless of size or location.'
        ],
        signature: '— <strong>Naina Panjwani, CA, ACCA</strong><br />Concept Founder & Strategic Advisor, Globex CFO Advisory LLP',
        lastUpdated: new Date()
      },
      
      // About Company
      {
        key: 'about-company',
        heading: 'About Globex CFO Advisory LLP',
        preview: 'At Globex CFO Advisory, we help growing businesses turn financial complexity into clarity.',
        paragraphs: [
          'Whether you\'re an Indian startup or a global SME, we act as your strategic finance partner — bringing structure, direction, and smart financial decisions.',
          'We provide CFO-level guidance, data-driven insights, and hands-on support — without the cost of hiring a full-time finance team.'
        ],
        services: [
          'Cash flow management',
          'Budgeting & forecasting',
          'Profitability improvement',
          'Compliance & reporting'
        ],
        additionalText: 'Our model is built on Virtual CFO leadership supported by modern tools, automation, and deep financial analysis.',
        closing: 'We don\'t just look at your numbers — we understand your goals, your story, and we grow with you.',
        lastUpdated: new Date()
      },
      
      // Vision
      {
        key: 'vision',
        heading: 'Our Vision',
        preview: 'To make world-class financial expertise accessible to every growing business.',
        paragraphs: [
          'We believe no great idea should fail because of poor financial clarity.'
        ],
        closing: 'Our vision is to become the most trusted Virtual CFO partner for startups and SMEs globally.',
        lastUpdated: new Date()
      },
      
      // Mission
      {
        key: 'mission',
        heading: 'Our Mission',
        preview: 'To simplify finance and empower founders with clarity, control, and confidence.',
        paragraphs: [
          'Our mission is to bridge the gap between numbers and business decisions — bringing CFO-level insights to those who need it most.'
        ],
        coreValues: [
          {
            name: 'Clarity',
            description: 'We simplify complex finance into clear, actionable insights that drive better decisions.'
          },
          {
            name: 'Credibility',
            description: 'Every number, report, and recommendation is backed by integrity and precision.'
          },
          {
            name: 'Commitment',
            description: 'We treat every client\'s business as our own — with full accountability and dedication.'
          },
          {
            name: 'Confidence',
            description: 'Our insights empower leaders to take bold, informed decisions for sustainable growth.'
          },
          {
            name: 'Continuous Growth',
            description: 'We constantly evolve with technology, regulations, and global best practices to serve clients better.'
          }
        ],
        lastUpdated: new Date()
      },
      
      // Belief/Philosophy
      {
        key: 'belief',
        heading: 'Our Belief / Philosophy / Promise',
        preview: 'At Globex, we don\'t just manage your books — we build relationships.',
        paragraphs: [
          'Every business we work with is a partnership built on trust, transparency, and shared success.'
        ],
        closing: 'Our goal is to grow together — one decision, one milestone, one success story at a time.',
        lastUpdated: new Date()
      }
    ];
    
    // Clear existing about content (optional)
    console.log('\n🗑️  Clearing existing about content...');
    await collection.deleteMany({ key: { $in: [
      'about-hero', 
      'about-founder', 
      'founder-message', 
      'about-company', 
      'vision', 
      'mission', 
      'belief'
    ]}});
    
    // Insert new content
    console.log('📝 Inserting About Us content...\n');
    const result = await collection.insertMany(aboutContent);
    
    console.log(`✅ Successfully inserted ${result.insertedCount} documents\n`);
    
    // Display inserted content
    const allContent = await collection.find({ 
      key: { $in: [
        'about-hero', 
        'about-founder', 
        'founder-message', 
        'about-company', 
        'vision', 
        'mission', 
        'belief'
      ]}
    }).toArray();
    console.log('📋 About content in database:');
    allContent.forEach((doc, index) => {
      console.log(`\n${index + 1}. Key: "${doc.key}"`);
      console.log(`   Fields:`, Object.keys(doc).filter(k => k !== '_id' && k !== 'key').join(', '));
    });
    
    console.log('\n🎉 About Us content seeding completed successfully!');
    console.log('\n💡 Test your content:');
    console.log('   - Visit: http://localhost:3000/api/content/about-hero');
    console.log('   - Visit: http://localhost:3000/api/content/about-founder');
    console.log('   - Then check your About page!\n');
    
  } catch (error) {
    console.error('❌ Error seeding about content:', error);
  } finally {
    await client.close();
    console.log('🔌 Disconnected from MongoDB');
  }
}

// Run the seeding function
seedAboutContent();
