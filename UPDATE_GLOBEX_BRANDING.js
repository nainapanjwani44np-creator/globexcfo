// MongoDB Update Script - Replace "Globex CFO Advisory" with "Globex"
// ========================================================================
// 
// Run this script with mongosh:
//
// For DEVELOPMENT:
// mongosh "mongodb+srv://nainapanjwani44np_db_user:SQwdg5CsGnonFztD@cluster0.ee9bw2k.mongodb.net/basicWebDataBase?appName=Cluster0" < UPDATE_GLOBEX_BRANDING.js
//
// For PRODUCTION:
// mongosh "mongodb://mongo_admin_root:HardPassCode@9351@globalcfo-globexcfodb-m0uggj:27017/basicWebDataBase" < UPDATE_GLOBEX_BRANDING.js
//
// ========================================================================

print('\n');
print('==================================================================');
print('           GLOBEX BRANDING UPDATE SCRIPT');
print('==================================================================');
print('\n');

// Switch to correct database
db = db.getSiblingDB('basicWebDataBase');

print('💾 Database:', db.getName());
print('📁 Collection: contentLoader');
print('\n');
print('🔄 Starting updates...');
print('\n');

// Update 1: hero.subtitle
print('1️⃣  Updating hero.subtitle...');
var result1 = db.contentLoader.updateOne(
  { key: 'hero' },
  { 
    $set: { 
      subtitle: 'Globex — empowering Indian startups and global SMEs with clarity, control, and confidence in every financial decision.',
      lastUpdated: new Date()
    }
  }
);
print('   Matched:', result1.matchedCount);
print('   Modified:', result1.modifiedCount);
print('   ✅ Done\n');

// Update 2: about-hero.subtitle
print('2️⃣  Updating about-hero.subtitle...');
var result2 = db.contentLoader.updateOne(
  { key: 'about-hero' },
  { 
    $set: { 
      subtitle: 'Meet Naina Panjwani — CA (India), ACCA (UK) and the Concept Founder of Globex.',
      lastUpdated: new Date()
    }
  }
);
print('   Matched:', result2.matchedCount);
print('   Modified:', result2.modifiedCount);
print('   ✅ Done\n');

// Update 3: about-founder
print('3️⃣  Updating about-founder...');
var result3 = db.contentLoader.updateOne(
  { key: 'about-founder' },
  { 
    $set: { 
      preview: 'Naina Panjwani, CA (India), ACCA (UK) is a globally qualified finance professional and the Concept Founder of Globex.',
      'paragraphs.1': 'Throughout her career, she observed a consistent gap — while companies had accountants and auditors, they often lacked strategic financial guidance. Someone who could convert numbers into strategy. This inspired her to create Globex.',
      'paragraphs.2': 'Her dual qualifications in Indian and global finance make Globex a trusted partner for startups, SMEs, and international ventures.',
      lastUpdated: new Date()
    }
  }
);
print('   Matched:', result3.matchedCount);
print('   Modified:', result3.modifiedCount);
print('   ✅ Done\n');

// Update 4: founder-message.signature
print('4️⃣  Updating founder-message.signature...');
var result4 = db.contentLoader.updateOne(
  { key: 'founder-message' },
  { 
    $set: { 
      signature: '— <strong>Naina Panjwani, CA, ACCA</strong><br />Concept Founder & Strategic Advisor, Globex',
      lastUpdated: new Date()
    }
  }
);
print('   Matched:', result4.matchedCount);
print('   Modified:', result4.modifiedCount);
print('   ✅ Done\n');

// Update 5: about-company
print('5️⃣  Updating about-company...');
var result5 = db.contentLoader.updateOne(
  { key: 'about-company' },
  { 
    $set: { 
      heading: 'About Globex',
      preview: 'At Globex, we help growing businesses turn financial complexity into clarity.',
      lastUpdated: new Date()
    }
  }
);
print('   Matched:', result5.matchedCount);
print('   Modified:', result5.modifiedCount);
print('   ✅ Done\n');

// Update 6: why-us.closingQuote
print('6️⃣  Updating why-us.closingQuote...');
var result6 = db.contentLoader.updateOne(
  { key: 'why-us' },
  { 
    $set: { 
      closingQuote: '"At Globex, we don\'t just manage your numbers — we empower your business to grow through them."',
      lastUpdated: new Date()
    }
  }
);
print('   Matched:', result6.matchedCount);
print('   Modified:', result6.modifiedCount);
print('   ✅ Done\n');

print('==================================================================');
print('           ✅ ALL UPDATES COMPLETED SUCCESSFULLY!');
print('==================================================================');
print('\n');

// Show summary
var totalModified = result1.modifiedCount + result2.modifiedCount + result3.modifiedCount + 
                   result4.modifiedCount + result5.modifiedCount + result6.modifiedCount;

print('📊 SUMMARY:');
print('   Documents matched: 6');
print('   Documents modified:', totalModified);
print('   Changes: "Globex CFO Advisory" → "Globex"');
print('\n');

print('🔍 VERIFY CHANGES:');
print('   Run these commands to check:');
print('');
print('   db.contentLoader.findOne({ key: "hero" }, { subtitle: 1 })');
print('   db.contentLoader.findOne({ key: "about-hero" }, { subtitle: 1 })');
print('   db.contentLoader.findOne({ key: "about-founder" }, { preview: 1, paragraphs: 1 })');
print('   db.contentLoader.findOne({ key: "founder-message" }, { signature: 1 })');
print('   db.contentLoader.findOne({ key: "about-company" }, { heading: 1, preview: 1 })');
print('   db.contentLoader.findOne({ key: "why-us" }, { closingQuote: 1 })');
print('\n');

print('🌐 TO SEE CHANGES ON WEBSITE:');
print('   1. Restart server (if running locally)');
print('   2. Clear browser cache (Ctrl+Shift+R or Cmd+Shift+R)');
print('   3. Visit website and check Home/About pages');
print('\n');
