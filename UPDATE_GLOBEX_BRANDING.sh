#!/bin/bash

# MongoDB Update Commands to Change "Globex CFO Advisory" to "Globex"
# ========================================================================
# 
# This script updates all MongoDB documents in the contentLoader collection
# to replace "Globex CFO Advisory" with "Globex"
#
# Usage:
#   For PRODUCTION: NODE_ENV=production bash UPDATE_GLOBEX_BRANDING.sh
#   For DEVELOPMENT: bash UPDATE_GLOBEX_BRANDING.sh
#
# ========================================================================

echo "=================================="
echo "GLOBEX BRANDING UPDATE SCRIPT"
echo "=================================="
echo ""

# Check environment
if [ "$NODE_ENV" = "production" ]; then
    echo "🌍 Environment: PRODUCTION"
    MONGO_URI="${MONGODB_URI_PROD}"
    DB_NAME="basicWebDataBase"
else
    echo "🌍 Environment: DEVELOPMENT"
    MONGO_URI="${MONGODB_URI}"
    DB_NAME="basicWebDataBase"
fi

echo "💾 Database: $DB_NAME"
echo ""
echo "📝 Updates to perform:"
echo "   1. hero.subtitle"
echo "   2. about-hero.subtitle"
echo "   3. about-founder texts"
echo "   4. founder-message.signature"
echo "   5. about-company texts"
echo ""
echo "Press Enter to continue or Ctrl+C to cancel..."
read

echo ""
echo "🔄 Starting updates..."
echo ""

# Run MongoDB updates
mongosh "$MONGO_URI/$DB_NAME" --eval "

// Update 1: hero.subtitle
db.contentLoader.updateOne(
  { key: 'hero' },
  { 
    \$set: { 
      subtitle: 'Globex — empowering Indian startups and global SMEs with clarity, control, and confidence in every financial decision.'
    }
  }
);
print('✅ Updated: hero.subtitle');

// Update 2: about-hero.subtitle
db.contentLoader.updateOne(
  { key: 'about-hero' },
  { 
    \$set: { 
      subtitle: 'Meet Naina Panjwani — CA (India), ACCA (UK) and the Concept Founder of Globex.'
    }
  }
);
print('✅ Updated: about-hero.subtitle');

// Update 3: about-founder.preview
db.contentLoader.updateOne(
  { key: 'about-founder' },
  { 
    \$set: { 
      preview: 'Naina Panjwani, CA (India), ACCA (UK) is a globally qualified finance professional and the Concept Founder of Globex.',
      'paragraphs.1': 'Throughout her career, she observed a consistent gap — while companies had accountants and auditors, they often lacked strategic financial guidance. Someone who could convert numbers into strategy. This inspired her to create Globex.'
    }
  }
);
print('✅ Updated: about-founder');

// Update 4: founder-message.signature
db.contentLoader.updateOne(
  { key: 'founder-message' },
  { 
    \$set: { 
      signature: '— <strong>Naina Panjwani, CA, ACCA</strong><br />Concept Founder & Strategic Advisor, Globex'
    }
  }
);
print('✅ Updated: founder-message.signature');

// Update 5: about-company.heading
db.contentLoader.updateOne(
  { key: 'about-company' },
  { 
    \$set: { 
      heading: 'About Globex',
      preview: 'At Globex, we help growing businesses turn financial complexity into clarity.'
    }
  }
);
print('✅ Updated: about-company');

print('');
print('==================================');
print('✅ ALL UPDATES COMPLETED!');
print('==================================');
print('');
print('📊 Summary:');
print('   - 5 documents updated');
print('   - All instances of \"Globex CFO Advisory\" changed to \"Globex\"');
print('');
print('🔍 Verify changes:');
print('   db.contentLoader.find({ key: \"hero\" }).pretty()');
print('   db.contentLoader.find({ key: \"about-hero\" }).pretty()');
print('   db.contentLoader.find({ key: \"about-founder\" }).pretty()');
print('   db.contentLoader.find({ key: \"founder-message\" }).pretty()');
print('   db.contentLoader.find({ key: \"about-company\" }).pretty()');
print('');

"

echo ""
echo "✅ Script completed!"
echo ""
echo "🌐 To verify changes on website:"
echo "   1. Restart your server (if local)"
echo "   2. Visit the website"
echo "   3. Check Home and About pages"
echo "   4. All text should show 'Globex' instead of 'Globex CFO Advisory'"
echo ""
