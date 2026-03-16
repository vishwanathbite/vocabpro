# 📚 Literary Rides VocabPro

**Free vocabulary builder for Indian competitive exams — UPSC, SSC CGL, Banking/IBPS PO, CAT, and Railways**

Master **6,100+ vocabulary items** with spaced repetition, 9 quiz modes, flashcards, gamification, and full offline support. Built by an educator, for students. Always free.

🔗 **[Try VocabPro Now →](https://vishwanathbite.github.io/vocabpro/)**

---

## 📊 Content Library

| Category | Count | Description |
|----------|-------|-------------|
| Easy Words | 1,000 | Foundational vocabulary for all exams |
| Medium Words | 1,709 | Intermediate vocabulary for SSC/Banking |
| Hard Words | 1,501 | Advanced vocabulary for UPSC/CAT |
| Acronyms | 300 | Common acronyms with smart distractors |
| One-Word Substitutes | 500 | Phrase-to-word patterns for exam MCQs |
| Idioms & Phrases | 1,116 | SSC/Banking/UPSC tested idioms with meanings |
| **Total** | **6,126** | **Comprehensive exam-ready coverage** |

Every item includes: definition, pronunciation, synonyms, antonyms, mnemonic, example sentence with Indian exam context, and exam relevance tag.

Idioms include: idiom, meaning, example sentence, usage context, exam tags (SSC/Banking/UPSC/CAT/Railways), category, and difficulty level.

---

## ✨ Features

### Learning Modes
- **Vocabulary Quiz** — Match words with definitions across 3 difficulty levels
- **Synonyms Quiz** — Find similar meanings
- **Antonyms Quiz** — Find opposite meanings
- **One-Word Substitutes** — Replace phrases with single words
- **Acronyms Quiz** — Expand common acronyms
- **Idioms & Phrases Quiz** — Match idioms with their correct meanings
- **Idioms Reverse Quiz** — Identify the idiom from its meaning
- **Flashcard Mode** — Card-flip learning with swipe navigation
- **Smart Review (SRS)** — AI-powered spaced repetition review

### Daily Challenge
- 10 mixed questions daily — same for every user on the same date
- Mix of vocabulary + idiom questions
- Seeded RNG ensures deterministic daily challenges
- Streak tracking and daily goal integration

### Spaced Repetition (SM-2)
- Algorithm tracks what you know and what you struggle with
- 8 review intervals from 1 day to 365 days
- Words you get wrong appear more frequently
- Optimized word selection prioritizes due reviews

### Gamification
- **10 Levels** — Beginner to Legend progression
- **25+ Badges** — Including idiom-specific achievements
  - Phrase Hunter — Complete first idioms quiz
  - Idiom Master — Score 100% in idioms quiz
  - Wordsmith — Complete idioms quiz in all 3 difficulties
- **XP Points** — 10-20 points per question based on difficulty
- **Streaks** — Build momentum with consecutive correct answers
- **Daily Goals** — 4 preset difficulty levels to choose from

### Performance
- Lazy loading for data files — idioms.js only loads when needed
- Service worker cache-first strategy (v27)
- LCP optimized for fast initial load
- Works 100% offline after first load

### Offline & PWA
- Install as an app on phone or desktop
- Background updates when online
- All data cached for offline use

### Data Safety
- All progress stored locally in your browser
- Full JSON backup and restore
- No server, no tracking, no accounts required
- Optional multi-user support via local storage

### Analytics
- Cloudflare Web Analytics (privacy-first, no cookies)

---

## 🎯 Target Exams

All content is curated with Indian exam context:
- **UPSC** (Civil Services Prelims & Mains)
- **SSC CGL/CHSL** (Staff Selection Commission)
- **Banking** (IBPS PO/Clerk, SBI, RBI)
- **CAT/MAT** (MBA entrance)
- **Railways** (RRB NTPC, Group D)
- **State PSC** exams

---

## 🛠️ Technology

- **React 18** — UMD build via CDN
- **Babel Standalone** — In-browser JSX compilation
- **Twind** — TailwindCSS-compatible styling (no CORS issues)
- **localStorage** — Progress persistence
- **Web Speech API** — Text-to-speech pronunciation
- **Service Worker v27** — Offline-first PWA caching with lazy data loading

No build process needed — runs directly in the browser.

---

## 📁 Project Structure

```
vocabpro/
├── index.html                # App shell (loads all scripts)
├── sw.js                     # Service Worker v27 (offline caching)
├── manifest.json             # PWA manifest
├── robots.txt                # Search engine crawling rules
├── sitemap.xml               # Sitemap for Google Search Console
├── js/
│   ├── storage.js            # Centralized storage layer
│   ├── icons.js              # SVG icon components
│   ├── utils.js              # Helper functions, speech, utilities
│   ├── gamification.js       # XP, levels, badges, streaks
│   ├── srs.js                # Spaced repetition (SM-2) engine
│   ├── bookmarks.js          # Bookmarks system
│   ├── dailygoals.js         # Daily goals tracking
│   ├── settings.js           # Settings, history, onboarding
│   ├── components.js         # Reusable UI components
│   ├── screens.js            # Home, quiz, and flashcard screens
│   ├── app.js                # Main App component & state
│   └── data/
│       ├── vocab-easy.js     # 1,000 easy words
│       ├── vocab-medium.js   # 1,709 medium words
│       ├── vocab-hard.js     # 1,501 hard words
│       ├── acronyms.js       # 300 acronyms
│       ├── oneword.js        # 500 one-word substitutes
│       ├── idioms.js         # 1,116 idioms & phrases (lazy loaded)
│       └── index.js          # Data aggregator & stats
└── README.md
```

---

## 🚀 Getting Started

### For Students
1. Visit **[vishwanathbite.github.io/vocabpro](https://vishwanathbite.github.io/vocabpro/)**
2. Start learning — no signup needed
3. Install as app (tap "Add to Home Screen" on mobile)
4. Your progress saves automatically in your browser

### For Developers
```bash
git clone https://github.com/vishwanathbite/vocabpro.git
cd vocabpro
# Open index.html in any browser — no build step needed
```

---

## 💾 Backup & Restore

All data lives in your browser. Export anytime:

1. Go to **Settings** (gear icon)
2. Click **Export Backup** — downloads a `.json` file
3. To restore: click **Import Backup** and select your file

Backups include: settings, quiz history, SRS progress, bookmarks, daily goals, badges, and level data.

---

## 📴 Offline Mode

VocabPro is a Progressive Web App:

- **First visit:** App loads from network, caches all assets
- **Subsequent visits:** Loads instantly from cache, even without internet
- **Idioms data:** Lazy loaded on first idioms quiz click, then cached offline
- **Updates:** When online, silently refreshes cached assets in background

### Updating the Cache (for developers)

Increment `CACHE_VERSION` in `sw.js` and version query strings in `index.html`:
```javascript
const CACHE_VERSION = 27;
const CACHE_NAME = `vocabpro-v${CACHE_VERSION}`;
```

---

## 📈 Roadmap

### ✅ Completed
- 6,126 vocabulary items across all categories
- 9 quiz modes including Idioms & Phrases + Idioms Reverse
- 1,116 idioms sourced from SSC/Banking/UPSC past papers
- SM-2 spaced repetition engine
- Gamification (25+ badges, 10 levels, streaks, XP)
- Idiom-specific badges (Phrase Hunter, Idiom Master, Wordsmith)
- Daily Challenge with mixed vocab + idiom questions
- Offline-first PWA with service worker v27
- Lazy loading for idioms data file
- Cloudflare Web Analytics (privacy-first)
- Backup/restore functionality
- Centralized storage layer with versioning
- SEO optimization (Open Graph, JSON-LD, sitemap)
- Daily goals system
- Text-to-speech pronunciation
- Multi-user local support
- Compact HomeScreen layout

### 🔜 Next
- Accessibility audit (ARIA labels, screen reader support)
- LCP optimization to 90%+ Good rating
- IndexedDB migration (planned before localStorage limits)
- Match Game mode (word-definition pairing)
- OG image for social sharing preview

### 🔮 Future
- Vite migration for build-time optimization
- GitHub Device Flow authentication
- Data export to Google Sheets
- Global leaderboards (needs backend)

---

## 🎓 Created By

**Dr. Vishwanath Bite**
*Assistant Professor, Department of English*
*Government Vidarbha Institute of Science and Humanities, Amravati*

15+ years of teaching experience | 12+ books authored | 38+ research papers published

### Connect

- 🌐 [vishwanathbite.com](https://vishwanathbite.com)
- 🎥 [YouTube: @literaryrides](https://www.youtube.com/@literaryrides) (8,000+ subscribers)
- 📸 [Instagram: @literaryrides](https://www.instagram.com/literaryrides)
- 🎙️ [Spotify Podcast](https://open.spotify.com/show/3lsJLi7SBqrsR65I1jqxAn)
- 🎧 [Apple Podcast](https://podcasts.apple.com/us/podcast/literary-rides/id1810843805)
- 🎵 [Amazon Music](https://music.amazon.in/podcasts/b05c6db4-5c01-4cbb-bfc4-ddf70d68a91d/literary-rides)
- 📖 [The Criterion: An International Journal in English](https://www.the-criterion.com) (Founded 2010)
- 📖 [Galaxy: International Multidisciplinary Research Journal](https://www.galaxyimrj.com) (Founded 2012)

---

## 📄 License

**Free for educational use. Always will be.**

This project exists to help students prepare for competitive exams. Use it, share it, learn from it.

---

**Made with ❤️ for Indian students by Dr. Vishwanath Bite**

*"Lighting lamps of knowledge — when you light one lamp, that person goes on to light countless others."*
