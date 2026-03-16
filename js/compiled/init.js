// Required globals that must be available before app can start
const REQUIRED_GLOBALS = ['React', 'ReactDOM', 'ErrorBoundary', 'ToastProvider', 'OfflineBanner', 'SWUpdateToast', 'App', 'vocabularyDB', 'acronymsDB', 'oneWordDB', 'SoundManager', 'StorageManager', 'SettingsManager', 'BookmarksManager', 'SRSManager', 'DailyGoalsManager', 'QuizHistoryManager', 'OnboardingManager', 'getLevelInfo', 'updateStats', 'initializeStats', 'shuffleArray', 'sample', 'speakWord', 'loadFromStorage', 'saveToStorage', 'generateSmartDistractors', 'selectSRSOptimizedWords', 'StreakProtection', 'getEarnedBadges', 'getNewBadges', 'calculatePoints', 'getLevelProgress', 'getStreakEmoji', 'DailyChallengeManager'];

// Check if all required modules are loaded
const checkModulesLoaded = () => {
  const missing = REQUIRED_GLOBALS.filter(name => typeof window[name] === 'undefined');
  return {
    allLoaded: missing.length === 0,
    missing
  };
};

// Initialize the app
const initApp = () => {
  const {
    allLoaded,
    missing
  } = checkModulesLoaded();
  if (!allLoaded) {
    throw new Error('Missing required modules: ' + missing.join(', '));
  }

  // Verify data is loaded
  if (!vocabularyDB.easy || vocabularyDB.easy.length === 0) {
    throw new Error('Vocabulary data failed to load. Please refresh the page.');
  }

  // Initialize SoundManager with saved settings
  SoundManager.enabled = SoundManager.isEnabled();

  // Clean up old daily goals history
  if (typeof DailyGoalsManager !== 'undefined' && DailyGoalsManager.cleanupHistory) {
    try {
      DailyGoalsManager.cleanupHistory();
    } catch (e) {
      console.warn('Failed to cleanup daily goals history:', e);
    }
  }
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(/*#__PURE__*/React.createElement(ErrorBoundary, null, /*#__PURE__*/React.createElement(ToastProvider, null, /*#__PURE__*/React.createElement(OfflineBanner, null), /*#__PURE__*/React.createElement(SWUpdateToast, null), /*#__PURE__*/React.createElement(App, null))));
  console.log('VocabPro initialized successfully');
};

// Retry initialization with exponential backoff
let initAttempts = 0;
const MAX_INIT_ATTEMPTS = 10;
const INIT_RETRY_DELAY = 100; // Start with 100ms

const tryInitApp = () => {
  initAttempts++;
  try {
    const {
      allLoaded,
      missing
    } = checkModulesLoaded();
    if (!allLoaded) {
      if (initAttempts < MAX_INIT_ATTEMPTS) {
        // Exponential backoff: 100ms, 200ms, 400ms, etc.
        const delay = INIT_RETRY_DELAY * Math.pow(1.5, initAttempts - 1);
        console.log(`VocabPro: Waiting for modules (attempt ${initAttempts}/${MAX_INIT_ATTEMPTS})... Missing: ${missing.slice(0, 3).join(', ')}${missing.length > 3 ? '...' : ''}`);
        setTimeout(tryInitApp, delay);
        return;
      }
      throw new Error('Missing required modules after ' + MAX_INIT_ATTEMPTS + ' attempts: ' + missing.join(', '));
    }
    initApp();
  } catch (error) {
    console.error('VocabPro initialization error:', error);
    showErrorScreen(error);
  }
};

// Show error screen with recovery options
const showErrorScreen = error => {
  document.getElementById('root').innerHTML = `
        <div style="min-height: 100vh; display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, #581c87 0%, #1e3a8a 50%, #312e81 100%); padding: 20px;">
          <div style="text-align: center; color: white; max-width: 400px;">
            <div style="font-size: 4rem; margin-bottom: 1rem;">⚠️</div>
            <h1 style="font-size: 1.5rem; margin-bottom: 0.5rem;">App Error</h1>
            <p style="opacity: 0.7; margin-bottom: 1rem;">Something went wrong loading VocabPro.</p>
            <p style="opacity: 0.5; font-size: 0.875rem; word-break: break-all; margin-bottom: 1rem;">${error.message}</p>
            <button onclick="clearCachesAndReload()" style="margin-top: 1rem; padding: 12px 24px; background: #7c3aed; color: white; border: none; border-radius: 8px; cursor: pointer; margin-right: 10px;">
              Clear Cache & Reload
            </button>
            <button onclick="window.location.reload()" style="margin-top: 1rem; padding: 12px 24px; background: #4f46e5; color: white; border: none; border-radius: 8px; cursor: pointer;">
              Reload
            </button>
          </div>
        </div>
      `;
};

// Start initialization with retry logic
tryInitApp();
