# Globex Branding Update - MongoDB Changes

## Overview
This document shows all changes from "Globex CFO Advisory" to "Globex" in MongoDB.

---

## Documents to Update

### 1. **hero** (key: 'hero')

**Field:** `subtitle`

**BEFORE:**
```
Globex CFO Advisory — empowering Indian startups and global SMEs with clarity, control, and confidence in every financial decision.
```

**AFTER:**
```
Globex — empowering Indian startups and global SMEs with clarity, control, and confidence in every financial decision.
```

**Update Command:**
```javascript
db.contentLoader.updateOne(
  { key: 'hero' },
  { $set: { 
      subtitle: 'Globex — empowering Indian startups and global SMEs with clarity, control, and confidence in every financial decision.',
      lastUpdated: new Date()
    }
  }
);
```

---

### 2. **about-hero** (key: 'about-hero')

**Field:** `subtitle`

**BEFORE:**
```
Meet Naina Panjwani — CA (India), ACCA (UK) and the Concept Founder of Globex CFO Advisory LLP.
```

**AFTER:**
```
Meet Naina Panjwani — CA (India), ACCA (UK) and the Concept Founder of Globex.
```

**Update Command:**
```javascript
db.contentLoader.updateOne(
  { key: 'about-hero' },
  { $set: { 
      subtitle: 'Meet Naina Panjwani — CA (India), ACCA (UK) and the Concept Founder of Globex.',
      lastUpdated: new Date()
    }
  }
);
```

---

### 3. **about-founder** (key: 'about-founder')

**Fields:** `preview`, `paragraphs[1]`, `paragraphs[2]`

**BEFORE:**
- **preview:** `Naina Panjwani, CA (India), ACCA (UK) is a globally qualified finance professional and the Concept Founder of Globex CFO Advisory LLP.`
- **paragraphs[1]:** `...This inspired her to create Globex CFO Advisory LLP.`
- **paragraphs[2]:** `Her dual qualifications in Indian and global finance make Globex a trusted partner...`

**AFTER:**
- **preview:** `Naina Panjwani, CA (India), ACCA (UK) is a globally qualified finance professional and the Concept Founder of Globex.`
- **paragraphs[1]:** `...This inspired her to create Globex.`
- **paragraphs[2]:** `Her dual qualifications in Indian and global finance make Globex a trusted partner...`

**Update Command:**
```javascript
db.contentLoader.updateOne(
  { key: 'about-founder' },
  { $set: { 
      preview: 'Naina Panjwani, CA (India), ACCA (UK) is a globally qualified finance professional and the Concept Founder of Globex.',
      'paragraphs.1': 'Throughout her career, she observed a consistent gap — while companies had accountants and auditors, they often lacked strategic financial guidance. Someone who could convert numbers into strategy. This inspired her to create Globex.',
      'paragraphs.2': 'Her dual qualifications in Indian and global finance make Globex a trusted partner for startups, SMEs, and international ventures.',
      lastUpdated: new Date()
    }
  }
);
```

---

### 4. **founder-message** (key: 'founder-message')

**Field:** `signature`

**BEFORE:**
```
— Naina Panjwani, CA, ACCA
Concept Founder & Strategic Advisor, Globex CFO Advisory LLP
```

**AFTER:**
```
— Naina Panjwani, CA, ACCA
Concept Founder & Strategic Advisor, Globex
```

**Update Command:**
```javascript
db.contentLoader.updateOne(
  { key: 'founder-message' },
  { $set: { 
      signature: '— <strong>Naina Panjwani, CA, ACCA</strong><br />Concept Founder & Strategic Advisor, Globex',
      lastUpdated: new Date()
    }
  }
);
```

---

### 5. **about-company** (key: 'about-company')

**Fields:** `heading`, `preview`

**BEFORE:**
- **heading:** `About Globex CFO Advisory LLP`
- **preview:** `At Globex CFO Advisory, we help growing businesses turn financial complexity into clarity.`

**AFTER:**
- **heading:** `About Globex`
- **preview:** `At Globex, we help growing businesses turn financial complexity into clarity.`

**Update Command:**
```javascript
db.contentLoader.updateOne(
  { key: 'about-company' },
  { $set: { 
      heading: 'About Globex',
      preview: 'At Globex, we help growing businesses turn financial complexity into clarity.',
      lastUpdated: new Date()
    }
  }
);
```

---

### 6. **why-us** (key: 'why-us')

**Field:** `closingQuote`

**BEFORE:**
```
"At Globex, we don't just manage your numbers — we empower your business to grow through them."
```

**AFTER:**
```
"At Globex, we don't just manage your numbers — we empower your business to grow through them."
```

**Note:** Already says "Globex" - no change needed! ✅

**Update Command (for consistency):**
```javascript
db.contentLoader.updateOne(
  { key: 'why-us' },
  { $set: { 
      closingQuote: '"At Globex, we don\'t just manage your numbers — we empower your business to grow through them."',
      lastUpdated: new Date()
    }
  }
);
```

---

## Summary of Changes

| Document Key | Fields Updated | Changes |
|--------------|----------------|---------|
| **hero** | subtitle | "Globex CFO Advisory" → "Globex" |
| **about-hero** | subtitle | "Globex CFO Advisory LLP" → "Globex" |
| **about-founder** | preview, paragraphs[1], paragraphs[2] | "Globex CFO Advisory LLP" → "Globex" |
| **founder-message** | signature | "Globex CFO Advisory LLP" → "Globex" |
| **about-company** | heading, preview | "Globex CFO Advisory LLP" → "Globex" |
| **why-us** | closingQuote | Already correct ✅ |

**Total Documents:** 6
**Total Fields:** 9
**Updates Needed:** 5 documents

---

## How to Run

### Option 1: Using the Shell Script (Recommended)

**For DEVELOPMENT:**
```bash
cd /Users/naina/Documents/globexcfogit
bash UPDATE_GLOBEX_BRANDING.sh
```

**For PRODUCTION:**
```bash
cd /Users/naina/Documents/globexcfogit
NODE_ENV=production bash UPDATE_GLOBEX_BRANDING.sh
```

### Option 2: Using mongosh with JavaScript file

**For DEVELOPMENT:**
```bash
mongosh "mongodb+srv://nainapanjwani44np_db_user:SQwdg5CsGnonFztD@cluster0.ee9bw2k.mongodb.net/basicWebDataBase?appName=Cluster0" < UPDATE_GLOBEX_BRANDING.js
```

**For PRODUCTION:**
```bash
mongosh "mongodb://mongo_admin_root:HardPassCode@9351@globalcfo-globexcfodb-m0uggj:27017/basicWebDataBase" < UPDATE_GLOBEX_BRANDING.js
```

### Option 3: Manual Updates (Copy-Paste into mongosh)

**Step 1:** Connect to MongoDB
```bash
# For development
mongosh "mongodb+srv://nainapanjwani44np_db_user:SQwdg5CsGnonFztD@cluster0.ee9bw2k.mongodb.net/basicWebDataBase?appName=Cluster0"

# For production
mongosh "mongodb://mongo_admin_root:HardPassCode@9351@globalcfo-globexcfodb-m0uggj:27017/basicWebDataBase"
```

**Step 2:** Copy and paste each update command:

```javascript
// 1. Update hero
db.contentLoader.updateOne(
  { key: 'hero' },
  { $set: { 
      subtitle: 'Globex — empowering Indian startups and global SMEs with clarity, control, and confidence in every financial decision.',
      lastUpdated: new Date()
    }
  }
);

// 2. Update about-hero
db.contentLoader.updateOne(
  { key: 'about-hero' },
  { $set: { 
      subtitle: 'Meet Naina Panjwani — CA (India), ACCA (UK) and the Concept Founder of Globex.',
      lastUpdated: new Date()
    }
  }
);

// 3. Update about-founder
db.contentLoader.updateOne(
  { key: 'about-founder' },
  { $set: { 
      preview: 'Naina Panjwani, CA (India), ACCA (UK) is a globally qualified finance professional and the Concept Founder of Globex.',
      'paragraphs.1': 'Throughout her career, she observed a consistent gap — while companies had accountants and auditors, they often lacked strategic financial guidance. Someone who could convert numbers into strategy. This inspired her to create Globex.',
      'paragraphs.2': 'Her dual qualifications in Indian and global finance make Globex a trusted partner for startups, SMEs, and international ventures.',
      lastUpdated: new Date()
    }
  }
);

// 4. Update founder-message
db.contentLoader.updateOne(
  { key: 'founder-message' },
  { $set: { 
      signature: '— <strong>Naina Panjwani, CA, ACCA</strong><br />Concept Founder & Strategic Advisor, Globex',
      lastUpdated: new Date()
    }
  }
);

// 5. Update about-company
db.contentLoader.updateOne(
  { key: 'about-company' },
  { $set: { 
      heading: 'About Globex',
      preview: 'At Globex, we help growing businesses turn financial complexity into clarity.',
      lastUpdated: new Date()
    }
  }
);
```

---

## Verify Changes

After running the updates, verify with:

```javascript
// Check all updated documents
db.contentLoader.find(
  { key: { $in: ['hero', 'about-hero', 'about-founder', 'founder-message', 'about-company'] } },
  { key: 1, subtitle: 1, heading: 1, preview: 1, signature: 1, lastUpdated: 1 }
).pretty();
```

---

## After Update

1. **Restart your server** (if running locally)
2. **Clear browser cache** (Ctrl+Shift+R or Cmd+Shift+R)
3. **Visit website** and verify:
   - Home page hero text
   - About page - all sections
   - Founder section
   - Company information

All references should now show **"Globex"** instead of **"Globex CFO Advisory"**!

---

## Rollback (If Needed)

If you need to revert changes, save the original values and use similar update commands with the old text.

**IMPORTANT:** Run this on **BOTH** development and production databases for consistency!
