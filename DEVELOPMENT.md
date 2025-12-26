# VocabPro Development Guide

## 📁 Project Structure

This project uses a unique dual-file structure for deployment:

### File Relationship

1. **`App.js`** - Source React component file
   - Contains the full application code with all databases
   - Uses ES6 imports from `lucide-react`
   - Intended for future build processes
   - **Last synced:** 2025-12-26

2. **`index.html`** - Standalone deployment file
   - Self-contained HTML file with embedded React app
   - Loads React, ReactDOM, and Babel from CDN
   - Contains inline SVG icons (no external dependencies)
   - Ready for immediate deployment via GitHub Pages
   - **This is the currently deployed file**

### Database Statistics

Both files contain identical vocabulary databases:

- **Easy vocabulary:** ~594 words
- **Medium vocabulary:** ~450 words
- **Hard vocabulary:** ~301 words
- **Acronyms:** 103
- **One-word substitutes:** 98
- **Total items:** 1,546

## 🔄 Keeping Files in Sync

**CRITICAL:** Both `App.js` and `index.html` must be kept in sync!

### When updating the databases:

1. ✅ Update the vocabularyDB, acronymsDB, or oneWordSubstitutes in BOTH files
2. ✅ Update the "Last synced" date in the App.js comment header
3. ✅ Test both files to ensure they work correctly
4. ✅ Commit both changes together

### Sync Process

If you update `index.html` with new words:

```bash
# Extract databases from index.html (lines will vary)
# vocabularyDB: lines 119-1471
# acronymsDB: lines 1472-1577
# oneWordSubstitutes: lines 1578-1715

# Rebuild App.js using the sync script (if available)
./scripts/sync-databases.sh
```

## 🚀 Deployment

Currently, the app is deployed directly from `index.html`:

1. No build process required
2. `index.html` is served directly via GitHub Pages
3. All React code is transpiled in-browser using Babel
4. This works but is **not optimal for production** (slower initial load)

## 🎯 Future Improvements

### Recommended: Add a proper build process

1. **Setup:**
   ```bash
   npm init -y
   npm install react react-dom lucide-react
   npm install --save-dev @vitejs/plugin-react vite
   ```

2. **Create vite.config.js:**
   ```javascript
   import { defineConfig } from 'vite'
   import react from '@vitejs/plugin-react'

   export default defineConfig({
     plugins: [react()],
     build: {
       outDir: 'dist'
     }
   })
   ```

3. **Build command:**
   ```bash
   npm run build
   ```

4. **Deploy:** Serve the `dist` folder instead of root

## 📊 Content Guidelines

### Adding New Vocabulary

Each word entry should include:

```javascript
{
  word: "Example",
  definition: "Clear, concise definition",
  pronunciation: "ex-AM-puhl",
  synonyms: ["similar1", "similar2", "similar3", "similar4"],
  antonyms: ["opposite1", "opposite2", "opposite3", "opposite4"],
  example: "Context sentence using the word for Indian competitive exams.",
  mnemonic: "Memory trick to remember the word",
  usage: "When and how to use this word",
  exam: "UPSC/SSC/Banking",
  difficulty: "easy" // or "medium" or "hard"
}
```

### Quality Standards

- ✅ All definitions should be exam-focused
- ✅ Examples should relate to Indian context
- ✅ Mnemonics should be memorable and culturally relevant
- ✅ Each difficulty level should have balanced content

## 🔐 User Data

- User data is stored in **localStorage** only
- Key: `vocabProUsers`
- No backend server required
- Data persists across sessions on the same device

## 🎁 Referral System

**How it works:**
- Base signup bonus: **+50 points**
- Referral code bonus: **+100 additional points** (150 total)
- Referrer reward: **+100 points** per successful referral

## 📝 Updating Title/Count

If you add words, update the title in `index.html`:

```html
<title>Literary Rides VocabPro - [NEW_COUNT] Words - By Dr. Vishwanath Bite</title>
```

Current count should be: **1546 items** (1345 vocab + 103 acronyms + 98 one-word)

## 🐛 Common Issues

### App.js imports not working?
→ This is expected! App.js requires a build process with bundler.

### Changes not appearing on deployed site?
→ Make sure you're editing `index.html`, not just `App.js`

### Lost all vocabulary data?
→ Check if you deployed from `App.js` instead of `index.html`
→ Restore from git: `git checkout index.html`

## 👥 Contributing

When contributing new words or features:

1. Fork the repository
2. Update BOTH `App.js` and `index.html`
3. Test thoroughly
4. Submit pull request with clear description
5. Ensure databases remain in sync

---

**Built with ❤️ by Dr. Vishwanath Bite for Indian Exam Aspirants**
