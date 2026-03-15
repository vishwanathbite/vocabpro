/**
 * Main App Component
 * Literary Rides VocabPro - Modular Architecture
 * Central application logic, state management, and coordination
 */

const { useState, useEffect, useRef, useCallback } = React;

/**
 * Main Application Component
 */
function App() {
  // ===========================
  // TOAST NOTIFICATIONS
  // ===========================
  const toast = useToast();

  // ===========================
  // STATE MANAGEMENT
  // ===========================

  // Screen & Navigation
  const [screen, setScreen] = useState('home'); // 'home', 'quiz', 'flashcard', 'settings', 'history', 'analytics', 'onboarding'
  const [mode, setMode] = useState(null); // 'vocab', 'synonym', 'antonym', 'oneword', 'acronym'
  const [difficulty, setDifficulty] = useState(null); // 'easy', 'medium', 'hard'

  // Settings
  const [appSettings, setAppSettings] = useState(SettingsManager.getSettings());

  // Quiz State
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0); // Track actual correct answers
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  // User & Authentication
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showSignupReminder, setShowSignupReminder] = useState(false);

  // Gamification State
  const [stats, setStats] = useState(initializeStats());
  const [showDifficultyModal, setShowDifficultyModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [pendingMode, setPendingMode] = useState(null);

  // Confirm Modal State
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmModalConfig, setConfirmModalConfig] = useState({});

  // Quiz Complete Modal State
  const [showQuizCompleteModal, setShowQuizCompleteModal] = useState(false);
  const [quizResults, setQuizResults] = useState(null);

  // Loading State
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');

  // Search Modal
  const [showSearchModal, setShowSearchModal] = useState(false);

  // Flashcard State
  const [flashcards, setFlashcards] = useState([]);

  // Achievement Notifications
  const [showAchievement, setShowAchievement] = useState(null);
  const [showLevelUp, setShowLevelUp] = useState(null);
  const [showStreakMilestone, setShowStreakMilestone] = useState(null);
  const [previousBadges, setPreviousBadges] = useState([]);
  const [previousLevel, setPreviousLevel] = useState(1);

  // Match Game State
  const [matchPairs, setMatchPairs] = useState([]);
  const [matchSelected, setMatchSelected] = useState(null);
  const [matchMatched, setMatchMatched] = useState([]);
  const [matchWrong, setMatchWrong] = useState(0);
  const [matchTimer, setMatchTimer] = useState(0);
  const [matchTimerActive, setMatchTimerActive] = useState(false);
  const [matchShuffledWords, setMatchShuffledWords] = useState([]);
  const [matchShuffledDefs, setMatchShuffledDefs] = useState([]);
  const [matchWrongPair, setMatchWrongPair] = useState(null);
  const [matchComplete, setMatchComplete] = useState(false);
  const [matchScore, setMatchScore] = useState(0);
  const [matchFirstTryCount, setMatchFirstTryCount] = useState(0);
  const [matchAttemptedIds, setMatchAttemptedIds] = useState(new Set());

  // ===========================
  // INITIALIZATION & PERSISTENCE
  // ===========================

  // Load users and current user from localStorage on mount
  useEffect(() => {
    const savedUsers = loadFromStorage('vocabProUsers', []);
    setUsers(savedUsers);

    const savedCurrentUser = loadFromStorage('vocabProCurrentUser');
    if (savedCurrentUser) {
      setCurrentUser(savedCurrentUser);
      // Load user's stats
      const user = savedUsers.find(u => u.email === savedCurrentUser.email);
      if (user && user.stats) {
        setStats(user.stats);
        setPreviousBadges(user.stats.earnedBadges || []);
        setPreviousLevel(user.stats.level || 1);
      }
    }

    // Check for referral code in URL
    const ref = getUrlParam('ref');
    if (ref) {
      saveToStorage('pendingReferral', ref);
    }
  }, []);

  // Save users whenever they change
  useEffect(() => {
    if (users.length > 0) {
      saveToStorage('vocabProUsers', users);
    }
  }, [users]);

  // Save current user whenever it changes
  useEffect(() => {
    if (currentUser) {
      saveToStorage('vocabProCurrentUser', currentUser);
      // Update user stats in users array
      setUsers(prev => prev.map(u =>
        u.email === currentUser.email
          ? { ...u, stats }
          : u
      ));
    }
  }, [currentUser, stats]);

  // Signup reminder (after 5 questions or 50 points without login)
  useEffect(() => {
    if (!currentUser && (stats.totalAnswered >= 5 || stats.totalPoints >= 50)) {
      setShowSignupReminder(true);
    }
  }, [stats.totalAnswered, stats.totalPoints, currentUser]);

  // Cleanup speech on unmount
  useEffect(() => {
    return () => stopSpeech();
  }, []);

  // Focus management ref for screen transitions (Change 7)
  const mainContentRef = useRef(null);

  // Move focus to main content on screen change (Change 7)
  useEffect(() => {
    if (mainContentRef.current) {
      mainContentRef.current.focus();
    }
  }, [screen]);

  // Dynamic page titles (Change 9)
  useEffect(() => {
    const titles = {
      home: 'VocabPro — Master 5000+ Words for Competitive Exams',
      quiz: `VocabPro — ${mode ? mode.charAt(0).toUpperCase() + mode.slice(1) : ''} Quiz`,
      flashcard: 'VocabPro — Flashcards',
      settings: 'VocabPro — Settings',
      history: 'VocabPro — Quiz History',
      analytics: 'VocabPro — Analytics',
      match: 'VocabPro — Match Game',
    };
    document.title = titles[screen] || 'VocabPro';
  }, [screen, mode]);

  // Match Game timer
  useEffect(() => {
    let interval;
    if (matchTimerActive) {
      interval = setInterval(() => {
        setMatchTimer(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [matchTimerActive]);

  // Check onboarding status
  useEffect(() => {
    if (!OnboardingManager.isCompleted()) {
      setScreen('onboarding');
    }
  }, []);

  // Keyboard shortcuts handler
  useEffect(() => {
    if (!appSettings.keyboardShortcutsEnabled) return;

    const handleKeyDown = (e) => {
      // Don't handle shortcuts when typing in inputs
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      if (screen === 'quiz' && questions.length > 0) {
        const shortcuts = KeyboardShortcuts.quiz;
        const key = e.key;

        if (shortcuts[key]) {
          e.preventDefault();
          const action = shortcuts[key];

          if (action.action === 'selectOption' && !showResult) {
            const option = questions[currentIndex]?.options[action.option];
            if (option) handleAnswer(option);
          } else if ((action.action === 'next') && showResult) {
            handleNext();
          } else if (action.action === 'back') {
            handleBack();
          } else if (action.action === 'pronounce') {
            const word = questions[currentIndex]?.word;
            if (word) speakWord(word);
          } else if (action.action === 'toggleSound') {
            const newEnabled = SoundManager.toggle();
            toast.info(newEnabled ? 'Sound enabled' : 'Sound disabled');
          }
        }
      } else if (screen === 'flashcard' && flashcards.length > 0) {
        // Flashcard shortcuts are handled in the FlashcardScreen component
      } else if (screen === 'home') {
        if (e.key === '/') {
          e.preventDefault();
          setShowSearchModal(true);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [screen, showResult, questions, currentIndex, appSettings.keyboardShortcutsEnabled]);

  // ===========================
  // AUTHENTICATION HANDLERS
  // ===========================

  const handleAuth = (formData, isSignUp) => {
    if (isSignUp) {
      // Check if user already exists
      const existing = users.find(u => u.email === formData.email);
      if (existing) {
        toast.error('User with this email already exists!');
        return;
      }

      // Create new user
      const referralCode = generateReferralCode(formData.firstName, formData.lastName);
      const newUser = {
        ...formData,
        referralCode,
        stats: { ...stats },
        createdAt: new Date().toISOString()
      };

      // Check for pending referral
      const pendingRef = loadFromStorage('pendingReferral');
      if (pendingRef) {
        // Award referral bonus
        newUser.stats.totalPoints += 150;
        newUser.stats.referrals = 1;
        removeFromStorage('pendingReferral');
        toast.success('Referral bonus: +150 points!', 4000);
      }

      setUsers(prev => [...prev, newUser]);
      setCurrentUser(newUser);
      setStats(newUser.stats);
      setShowAuthModal(false);
      setShowSignupReminder(false);

      toast.success(`Welcome, ${formData.firstName}! Your account has been created.`);
    } else {
      // Sign in
      const user = users.find(u => u.email === formData.email && u.password === formData.password);
      if (user) {
        setCurrentUser(user);
        setStats(user.stats || initializeStats());
        setShowAuthModal(false);
        toast.success(`Welcome back, ${user.firstName}!`);
      } else {
        toast.error('Invalid email or password!');
      }
    }
  };

  const handleSignOut = () => {
    setCurrentUser(null);
    removeFromStorage('vocabProCurrentUser');
    setStats(initializeStats());
    setScreen('home');
  };

  // ===========================
  // QUIZ LOGIC
  // ===========================

  /**
   * Generate questions based on mode and difficulty
   * Uses Spaced Repetition System for optimal word selection
   */
  const generateQuestions = (quizMode, quizDifficulty, useSRS = true) => {
    const count = 10; // Number of questions per quiz
    let generatedQuestions = [];

    // Defensive check for vocabularyDB
    if (typeof vocabularyDB === 'undefined') {
      console.error('vocabularyDB is not defined');
      return [];
    }

    if (quizMode === 'vocab') {
      // Vocabulary mode: Definition matching
      const words = vocabularyDB[quizDifficulty] || [];
      if (words.length === 0) {
        console.warn(`No words found for difficulty: ${quizDifficulty}`);
        return [];
      }
      // Use SRS-optimized selection if enabled
      const selectedWords = useSRS && typeof selectSRSOptimizedWords === 'function'
        ? selectSRSOptimizedWords(words, count)
        : sample(words, count);

      generatedQuestions = selectedWords.map(word => {
        if (!word || !word.word || !word.definition) return null;
        const distractors = generateSmartDistractors(word.definition, words, 3);
        const options = shuffleArray([word.definition, ...distractors]);

        return {
          question: `What is the meaning of "${word.word}"?`,
          options,
          correct: word.definition,
          wordData: word,
          word: word.word,
          startTime: Date.now()
        };
      }).filter(q => q !== null);
    } else if (quizMode === 'synonym') {
      // Synonym mode
      const words = vocabularyDB[quizDifficulty] || [];
      if (words.length === 0) {
        console.warn(`No words found for difficulty: ${quizDifficulty}`);
        return [];
      }
      const selectedWords = useSRS && typeof selectSRSOptimizedWords === 'function'
        ? selectSRSOptimizedWords(words, count)
        : sample(words, count);

      generatedQuestions = selectedWords.map(word => {
        if (!word || !word.word || !word.synonyms || word.synonyms.length === 0) return null;
        const correctSyn = randomItem(word.synonyms);
        if (!correctSyn) return null;
        const allSynonyms = buildSynonymPool(words, word.synonyms);
        const distractors = sample(allSynonyms, 3, new Set([correctSyn]));
        const options = shuffleArray([correctSyn, ...distractors]);

        return {
          question: word.word,
          options,
          correct: correctSyn,
          wordData: word,
          word: word.word,
          startTime: Date.now()
        };
      }).filter(q => q !== null);
    } else if (quizMode === 'antonym') {
      // Antonym mode
      const words = vocabularyDB[quizDifficulty] || [];
      if (words.length === 0) {
        console.warn(`No words found for difficulty: ${quizDifficulty}`);
        return [];
      }
      const selectedWords = useSRS && typeof selectSRSOptimizedWords === 'function'
        ? selectSRSOptimizedWords(words, count)
        : sample(words, count);

      generatedQuestions = selectedWords.map(word => {
        if (!word || !word.word || !word.antonyms || word.antonyms.length === 0) return null;
        const correctAnt = randomItem(word.antonyms);
        if (!correctAnt) return null;
        const allAntonyms = buildAntonymPool(words, word.antonyms);
        const distractors = sample(allAntonyms, 3, new Set([correctAnt]));
        const options = shuffleArray([correctAnt, ...distractors]);

        return {
          question: word.word,
          options,
          correct: correctAnt,
          wordData: word,
          word: word.word,
          startTime: Date.now()
        };
      }).filter(q => q !== null);
    } else if (quizMode === 'oneword') {
      // One-word substitutes
      if (typeof oneWordDB === 'undefined' || !Array.isArray(oneWordDB) || oneWordDB.length === 0) {
        console.warn('oneWordDB is not defined or empty');
        return [];
      }
      const selectedItems = useSRS && typeof selectSRSOptimizedWords === 'function'
        ? selectSRSOptimizedWords(oneWordDB, count)
        : sample(oneWordDB, count);

      generatedQuestions = selectedItems.map(item => {
        if (!item || !item.phrase || !item.options || !item.answer) return null;
        const options = shuffleArray([...item.options]);

        return {
          question: item.phrase,
          options,
          correct: item.answer,
          wordData: item,
          startTime: Date.now()
        };
      }).filter(q => q !== null);
    } else if (quizMode === 'acronym') {
      // Acronyms
      if (typeof acronymsDB === 'undefined' || !Array.isArray(acronymsDB) || acronymsDB.length === 0) {
        console.warn('acronymsDB is not defined or empty');
        return [];
      }
      const selectedItems = useSRS && typeof selectSRSOptimizedWords === 'function'
        ? selectSRSOptimizedWords(acronymsDB, count)
        : sample(acronymsDB, count);

      generatedQuestions = selectedItems.map(item => {
        if (!item || !item.acronym || !item.options || !item.full) return null;
        const options = shuffleArray([...item.options]);

        return {
          question: item.acronym,
          options,
          correct: item.full,
          wordData: item,
          startTime: Date.now()
        };
      }).filter(q => q !== null);
    } else if (quizMode === 'review') {
      // Review mode - due words across all difficulties
      const easyWords = vocabularyDB.easy || [];
      const mediumWords = vocabularyDB.medium || [];
      const hardWords = vocabularyDB.hard || [];
      const allWords = [...easyWords, ...mediumWords, ...hardWords];

      if (allWords.length === 0) {
        console.warn('No vocabulary words available for review');
        return [];
      }

      const dueWords = typeof SRSManager !== 'undefined' && SRSManager.getDueWords
        ? SRSManager.getDueWords(allWords, count)
        : sample(allWords, count);

      generatedQuestions = dueWords.map(word => {
        if (!word || !word.word || !word.definition) return null;
        const distractors = generateSmartDistractors(word.definition, allWords, 3);
        const options = shuffleArray([word.definition, ...distractors]);

        return {
          question: `What is the meaning of "${word.word}"?`,
          options,
          correct: word.definition,
          wordData: word,
          word: word.word,
          startTime: Date.now()
        };
      }).filter(q => q !== null);
    } else if (quizMode === 'bookmarks') {
      // Bookmarks mode - practice saved words
      const bookmarkedWords = typeof BookmarksManager !== 'undefined' && BookmarksManager.getForPractice
        ? BookmarksManager.getForPractice(count)
        : [];

      if (bookmarkedWords.length === 0) {
        console.warn('No bookmarked words available');
        return [];
      }

      const easyWords = vocabularyDB.easy || [];
      const mediumWords = vocabularyDB.medium || [];
      const hardWords = vocabularyDB.hard || [];
      const allWords = [...easyWords, ...mediumWords, ...hardWords];

      generatedQuestions = bookmarkedWords.map(word => {
        if (!word) return null;
        // Handle different word types (vocab, acronym, oneword)
        if (word.word && word.definition) {
          // Vocabulary word
          const distractors = generateSmartDistractors(word.definition, allWords, 3);
          const options = shuffleArray([word.definition, ...distractors]);

          return {
            question: `What is the meaning of "${word.word}"?`,
            options,
            correct: word.definition,
            wordData: word,
            word: word.word,
            startTime: Date.now()
          };
        } else if (word.acronym && word.options && word.full) {
          // Acronym
          return {
            question: word.acronym,
            options: shuffleArray([...word.options]),
            correct: word.full,
            wordData: word,
            startTime: Date.now()
          };
        } else if (word.phrase && word.options && word.answer) {
          // One-word substitute
          return {
            question: word.phrase,
            options: shuffleArray([...word.options]),
            correct: word.answer,
            wordData: word,
            startTime: Date.now()
          };
        }
        return null;
      }).filter(q => q !== null);
    }

    // Ensure we always return a valid array
    return generatedQuestions || [];
  };

  /**
   * Start quiz handler
   */
  const handleStartQuiz = (quizMode) => {
    // Check if mode needs difficulty selection
    if (['vocab', 'synonym', 'antonym', 'match'].includes(quizMode)) {
      setPendingMode(quizMode);
      setShowDifficultyModal(true);
    } else if (quizMode === 'flashcard') {
      // Start flashcard mode - show difficulty selection
      setPendingMode('flashcard');
      setShowDifficultyModal(true);
    } else {
      // Start quiz directly for oneword, acronym, and review modes
      startQuizWithDifficulty(quizMode, null);
    }
  };

  /**
   * Start flashcard mode
   */
  const startFlashcardMode = async (flashcardDifficulty) => {
    setShowDifficultyModal(false);
    setIsLoading(true);
    setLoadingMessage('Preparing flashcards...');

    await new Promise(resolve => setTimeout(resolve, 300));

    const words = vocabularyDB[flashcardDifficulty];
    const selectedWords = selectSRSOptimizedWords(words, 15); // 15 flashcards per session
    setFlashcards(selectedWords);
    setMode('flashcard');
    setDifficulty(flashcardDifficulty);
    setIsLoading(false);
    setLoadingMessage('');
    setScreen('flashcard');
    setPendingMode(null);
  };

  /**
   * Handle flashcard session complete
   */
  const handleFlashcardComplete = (known, unknown) => {
    toast.success(`Session complete! ${known} known, ${unknown} to review`);
    setScreen('home');
    setFlashcards([]);
  };

  /**
   * Start quiz with selected difficulty
   */
  const startQuizWithDifficulty = async (quizMode, quizDifficulty) => {
    setShowDifficultyModal(false);
    setIsLoading(true);
    setLoadingMessage('Preparing your quiz...');

    // Small delay for UX (shows loading state)
    await new Promise(resolve => setTimeout(resolve, 500));

    setMode(quizMode);
    setDifficulty(quizDifficulty);
    const newQuestions = generateQuestions(quizMode, quizDifficulty);
    setQuestions(newQuestions);
    setCurrentIndex(0);
    setScore(0);
    setCorrectCount(0); // Reset correct count
    setShowResult(false);
    setIsCorrect(false);
    setSelectedAnswer(null);
    setIsLoading(false);
    setLoadingMessage('');
    setScreen('quiz');
    setPendingMode(null);
  };

  /**
   * Handle difficulty selection
   */
  const handleDifficultySelect = (selectedDifficulty) => {
    if (pendingMode === 'flashcard') {
      startFlashcardMode(selectedDifficulty);
    } else if (pendingMode === 'match') {
      startMatchGame(selectedDifficulty);
    } else if (pendingMode) {
      startQuizWithDifficulty(pendingMode, selectedDifficulty);
    }
  };

  /**
   * Handle answer selection
   */
  const handleAnswer = (answer) => {
    const currentQuestion = questions[currentIndex];
    const correct = answer === currentQuestion.correct;
    const responseTime = Date.now() - (currentQuestion.startTime || Date.now());

    setSelectedAnswer(answer);
    setIsCorrect(correct);
    setShowResult(true);

    // Play sound effect
    if (correct) {
      SoundManager.playCorrect();
    } else {
      SoundManager.playIncorrect();
    }

    // Update SRS data for the word
    const wordId = currentQuestion.word || currentQuestion.wordData?.acronym || currentQuestion.wordData?.phrase;
    if (wordId) {
      SRSManager.updateEntry(wordId, correct, responseTime);
    }

    // Update stats
    const difficultyOrMode = difficulty || mode;
    const newStats = updateStats(stats, correct, difficultyOrMode, currentQuestion.word, mode);

    // Check for new achievements
    const newBadges = getNewBadges(newStats, previousBadges);
    if (newBadges.length > 0) {
      // Show the first new badge (queue others for later)
      setTimeout(() => {
        SoundManager.playAchievement();
        setShowAchievement(newBadges[0]);
        setPreviousBadges(newStats.earnedBadges);
      }, 500);
    }

    // Check for level up
    if (newStats.level > previousLevel) {
      const levelInfo = getLevelInfo(newStats.totalPoints);
      setTimeout(() => {
        SoundManager.playLevelUp();
        setShowLevelUp(levelInfo);
        setPreviousLevel(newStats.level);
      }, newBadges.length > 0 ? 4500 : 500);
    }

    // Check for streak milestones
    if (correct && [5, 10, 20, 50].includes(newStats.currentStreak)) {
      setTimeout(() => {
        setShowStreakMilestone(newStats.currentStreak);
      }, 300);
    }

    setStats(newStats);

    // Update session score and daily goals
    if (correct) {
      setCorrectCount(prev => prev + 1); // Track actual correct count
      const points = calculatePoints(difficultyOrMode, stats.currentStreak);
      setScore(prev => prev + points);

      // Update daily goals
      const wasComplete = DailyGoalsManager.isGoalComplete();
      DailyGoalsManager.updateProgress(1, points);
      const isNowComplete = DailyGoalsManager.isGoalComplete();

      // Show celebration if goal just completed
      if (!wasComplete && isNowComplete) {
        setTimeout(() => {
          toast.success('Daily Goal Complete! Great work!', 5000);
        }, 1000);
      }
    } else {
      // Still count the question even if wrong (no points)
      DailyGoalsManager.updateProgress(1, 0);
    }
  };

  /**
   * Handle next question
   */
  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setShowResult(false);
      setIsCorrect(false);
      setSelectedAnswer(null);
      stopSpeech();
    } else {
      // Quiz finished
      handleQuizComplete();
    }
  };

  /**
   * Handle quiz completion
   */
  const handleQuizComplete = () => {
    const sessionTotal = questions.length;

    // Save to quiz history with accurate correct count
    QuizHistoryManager.addQuiz({
      mode: mode,
      difficulty: difficulty,
      questionsTotal: sessionTotal,
      questionsCorrect: correctCount,
      score: score,
      words: questions.map(q => q.word || q.wordData?.acronym || q.wordData?.phrase).filter(Boolean)
    });

    setQuizResults({
      score,
      correctCount,
      totalQuestions: sessionTotal,
      totalPoints: stats.totalPoints,
      level: stats.level,
      levelInfo: getLevelInfo(stats.totalPoints),
      correctAnswers: stats.correctAnswers,
      totalAnswered: stats.totalAnswered,
      accuracy: sessionTotal > 0 ? Math.round((correctCount / sessionTotal) * 100) : 0
    });
    setShowQuizCompleteModal(true);
    stopSpeech();
  };

  /**
   * Close quiz complete modal and go home
   */
  const handleCloseQuizComplete = () => {
    setShowQuizCompleteModal(false);
    setQuizResults(null);
    setScreen('home');
  };

  /**
   * Handle back to home
   */
  const handleBack = () => {
    setConfirmModalConfig({
      title: 'Exit Quiz?',
      message: 'Are you sure you want to exit? Your current quiz progress will be lost, but earned points are saved.',
      confirmText: 'Exit Quiz',
      cancelText: 'Continue',
      type: 'warning',
      onConfirm: () => {
        setScreen('home');
        stopSpeech();
      }
    });
    setShowConfirmModal(true);
  };

  // ===========================
  // MATCH GAME LOGIC
  // ===========================

  /**
   * Start a match game round
   */
  const startMatchGame = async (selectedDifficulty) => {
    setShowDifficultyModal(false);
    setIsLoading(true);
    setLoadingMessage('Preparing match game...');

    await new Promise(resolve => setTimeout(resolve, 400));

    const words = vocabularyDB[selectedDifficulty] || [];
    if (words.length < 5) {
      setIsLoading(false);
      setLoadingMessage('');
      toast.error('Not enough words for this difficulty level');
      return;
    }

    const selected = shuffleArray([...words]).slice(0, 5);
    const pairs = selected.map((w, i) => ({
      id: i,
      word: w.word,
      definition: w.definition
    }));

    const shuffledWords = shuffleArray([...pairs]);
    const shuffledDefs = shuffleArray([...pairs]);

    setMatchPairs(pairs);
    setMatchShuffledWords(shuffledWords);
    setMatchShuffledDefs(shuffledDefs);
    setMatchSelected(null);
    setMatchMatched([]);
    setMatchWrong(0);
    setMatchTimer(0);
    setMatchTimerActive(true);
    setMatchComplete(false);
    setMatchScore(0);
    setMatchWrongPair(null);
    setMatchFirstTryCount(0);
    setMatchAttemptedIds(new Set());
    setMode('match');
    setDifficulty(selectedDifficulty);
    setIsLoading(false);
    setLoadingMessage('');
    setScreen('match');
    setPendingMode(null);
  };

  /**
   * Handle tapping an item in the match game
   */
  const handleMatchTap = (item, type) => {
    // Ignore if already matched or animating wrong
    if (matchMatched.includes(item.id) || matchWrongPair) return;

    if (!matchSelected) {
      // First tap — select this item
      setMatchSelected({ ...item, type });
      return;
    }

    if (matchSelected.type === type) {
      // Tapped same column — switch selection
      setMatchSelected({ ...item, type });
      return;
    }

    // Tapped different column — check if match
    const wordItem = type === 'word' ? item : matchSelected;
    const defItem = type === 'definition' ? item : matchSelected;

    if (wordItem.id === defItem.id) {
      // CORRECT MATCH
      SoundManager.playCorrect();
      const newMatched = [...matchMatched, wordItem.id];
      setMatchMatched(newMatched);

      // Track first-try matches
      if (!matchAttemptedIds.has(wordItem.id)) {
        setMatchFirstTryCount(prev => prev + 1);
      }

      setMatchSelected(null);

      // Check if all matched
      if (newMatched.length === matchPairs.length) {
        setMatchTimerActive(false);
        // Delay to show the final match animation
        setTimeout(() => {
          handleMatchComplete(newMatched.length);
        }, 600);
      }
    } else {
      // WRONG MATCH
      SoundManager.playIncorrect();
      setMatchWrong(prev => prev + 1);
      // Track that these IDs have been attempted (no longer first-try eligible)
      setMatchAttemptedIds(prev => {
        const next = new Set(prev);
        next.add(wordItem.id);
        next.add(defItem.id);
        return next;
      });
      // Show wrong animation
      setMatchWrongPair({ wordId: wordItem.id, defId: defItem.id });
      setTimeout(() => {
        setMatchWrongPair(null);
        setMatchSelected(null);
      }, 600);
    }
  };

  /**
   * Handle match game completion
   */
  const handleMatchComplete = (totalMatched) => {
    // Calculate score
    let finalScore = 50; // Base points per round
    if (matchTimer < 30) finalScore += 20; // Time bonus under 30s
    else if (matchTimer < 60) finalScore += 10; // Time bonus under 60s

    // Accuracy bonus: +5 per first-try match
    finalScore += matchFirstTryCount * 5;

    // Wrong attempt penalty
    finalScore -= matchWrong * 5;
    if (finalScore < 0) finalScore = 0;

    setMatchScore(finalScore);
    setMatchComplete(true);

    // Update stats — treat as 5 correct answers for the match mode
    let newStats = { ...stats };
    const diffKey = difficulty || 'easy';
    matchPairs.forEach(pair => {
      newStats = updateStats(newStats, true, diffKey, pair.word, 'match');
    });
    newStats.totalPoints += finalScore;
    const levelInfo = getLevelInfo(newStats.totalPoints);
    newStats.level = levelInfo.level;
    newStats.earnedBadges = getEarnedBadges(newStats).map(b => b.id);
    setStats(newStats);

    // Check for new achievements
    const newBadges = getNewBadges(newStats, previousBadges);
    if (newBadges.length > 0) {
      setTimeout(() => {
        SoundManager.playAchievement();
        setShowAchievement(newBadges[0]);
        setPreviousBadges(newStats.earnedBadges);
      }, 500);
    }

    // Check for level up
    if (newStats.level > previousLevel) {
      const lvlInfo = getLevelInfo(newStats.totalPoints);
      setTimeout(() => {
        SoundManager.playLevelUp();
        setShowLevelUp(lvlInfo);
        setPreviousLevel(newStats.level);
      }, newBadges.length > 0 ? 4500 : 500);
    }

    // Save to quiz history
    QuizHistoryManager.addQuiz({
      mode: 'match',
      difficulty: difficulty,
      questionsTotal: 5,
      questionsCorrect: 5, // All pairs matched
      score: finalScore,
      timeSpent: matchTimer,
      words: matchPairs.map(p => p.word)
    });

    // Update daily goals
    const wasComplete = DailyGoalsManager.isGoalComplete();
    DailyGoalsManager.updateProgress(5, finalScore);
    const isNowComplete = DailyGoalsManager.isGoalComplete();
    if (!wasComplete && isNowComplete) {
      setTimeout(() => {
        toast.success('Daily Goal Complete! Great work!', 5000);
      }, 1000);
    }
  };

  /**
   * Handle back from match game
   */
  const handleMatchBack = () => {
    if (matchComplete || matchMatched.length === 0) {
      // No progress or already complete — go straight home
      setMatchTimerActive(false);
      setScreen('home');
    } else {
      // In progress — confirm exit
      setConfirmModalConfig({
        title: 'Exit Match Game?',
        message: 'Are you sure you want to exit? Your current progress will be lost.',
        confirmText: 'Exit Game',
        cancelText: 'Continue',
        type: 'warning',
        onConfirm: () => {
          setMatchTimerActive(false);
          setScreen('home');
        }
      });
      setShowConfirmModal(true);
    }
  };

  // ===========================
  // RENDER
  // ===========================

  return (
    <>
      {/* Loading Overlay */}
      <LoadingOverlay isVisible={isLoading} message={loadingMessage} />

      {/* Achievement Notification */}
      {showAchievement && (
        <div role="alert" aria-live="assertive">
          <AchievementNotification
            badge={showAchievement}
            onClose={() => setShowAchievement(null)}
          />
        </div>
      )}

      {/* Level Up Notification */}
      {showLevelUp && (
        <LevelUpNotification
          levelInfo={showLevelUp}
          onClose={() => setShowLevelUp(null)}
        />
      )}

      {/* Streak Milestone */}
      {showStreakMilestone && (
        <StreakMilestone
          streak={showStreakMilestone}
          onClose={() => setShowStreakMilestone(null)}
        />
      )}

      <div ref={mainContentRef} tabIndex={-1} id="main-content" className="outline-none">
      {screen === 'onboarding' ? (
        <OnboardingScreen
          onComplete={() => setScreen('home')}
          onSkip={() => setScreen('home')}
        />
      ) : screen === 'settings' ? (
        <SettingsScreen
          onBack={() => {
            setAppSettings(SettingsManager.getSettings());
            setScreen('home');
          }}
          onToast={(msg) => toast.success(msg)}
        />
      ) : screen === 'history' ? (
        <QuizHistoryScreen
          onBack={() => setScreen('home')}
        />
      ) : screen === 'analytics' ? (
        <AnalyticsDashboard
          stats={stats}
          onBack={() => setScreen('home')}
        />
      ) : screen === 'home' ? (
        <HomeScreen
          user={currentUser}
          stats={stats}
          onStartQuiz={handleStartQuiz}
          onShowAuth={() => setShowAuthModal(true)}
          onShowShare={() => setShowShareModal(true)}
          onShowSearch={() => setShowSearchModal(true)}
          onShowSettings={() => setScreen('settings')}
          onShowHistory={() => setScreen('history')}
          onShowAnalytics={() => setScreen('analytics')}
          onSignOut={handleSignOut}
          showWordOfDay={appSettings.showWordOfDay}
          showDailyGoals={appSettings.showDailyGoals}
        />
      ) : screen === 'flashcard' ? (
        <FlashcardScreen
          cards={flashcards}
          onBack={handleBack}
          onComplete={handleFlashcardComplete}
        />
      ) : screen === 'match' ? (
        <MatchGameScreen
          pairs={matchPairs}
          shuffledWords={matchShuffledWords}
          shuffledDefs={matchShuffledDefs}
          selected={matchSelected}
          matched={matchMatched}
          wrongPair={matchWrongPair}
          wrongCount={matchWrong}
          timer={matchTimer}
          complete={matchComplete}
          score={matchScore}
          firstTryCount={matchFirstTryCount}
          onTap={handleMatchTap}
          onBack={handleMatchBack}
          onPlayAgain={() => startMatchGame(difficulty)}
          onGoHome={() => { setMatchTimerActive(false); setScreen('home'); }}
          difficulty={difficulty}
        />
      ) : (
        <QuizScreen
          mode={mode}
          difficulty={difficulty}
          questions={questions}
          currentIndex={currentIndex}
          score={score}
          streak={stats.currentStreak}
          showResult={showResult}
          isCorrect={isCorrect}
          selectedAnswer={selectedAnswer}
          onAnswer={handleAnswer}
          onNext={handleNext}
          onBack={handleBack}
          stats={stats}
        />
      )}
      </div>

      {/* Modals */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onAuth={handleAuth}
      />

      <DifficultyModal
        isOpen={showDifficultyModal}
        onClose={() => {
          setShowDifficultyModal(false);
          setPendingMode(null);
        }}
        onSelect={handleDifficultySelect}
        mode={pendingMode}
      />

      {currentUser && (
        <ShareModal
          isOpen={showShareModal}
          onClose={() => setShowShareModal(false)}
          referralCode={currentUser.referralCode}
          totalPoints={stats.totalPoints}
        />
      )}

      {/* Signup Reminder Modal */}
      <Modal
        isOpen={showSignupReminder && !currentUser}
        onClose={() => setShowSignupReminder(false)}
        title="Save Your Progress!"
      >
        <div className="text-center">
          <div className="text-6xl mb-4">🎯</div>
          <p className="text-white mb-4">
            You've earned {stats.totalPoints} points! Create an account to save your progress and unlock badges.
          </p>
          <PrimaryButton
            onClick={() => {
              setShowSignupReminder(false);
              setShowAuthModal(true);
            }}
            className="w-full mb-3"
          >
            Create Account
          </PrimaryButton>
          <SecondaryButton
            onClick={() => setShowSignupReminder(false)}
            className="w-full"
          >
            Maybe Later
          </SecondaryButton>
        </div>
      </Modal>

      {/* Search Modal */}
      <SearchModal
        isOpen={showSearchModal}
        onClose={() => setShowSearchModal(false)}
      />

      {/* Confirm Modal */}
      <ConfirmModal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={confirmModalConfig.onConfirm || (() => {})}
        title={confirmModalConfig.title}
        message={confirmModalConfig.message}
        confirmText={confirmModalConfig.confirmText}
        cancelText={confirmModalConfig.cancelText}
        type={confirmModalConfig.type}
      />

      {/* Quiz Complete Modal */}
      <Modal
        isOpen={showQuizCompleteModal}
        onClose={handleCloseQuizComplete}
        title="Quiz Complete!"
        maxWidth="max-w-lg"
      >
        {quizResults && (
          <div className="text-center">
            <div className="text-6xl mb-4 animate-bounce-in">
              {quizResults.accuracy >= 80 ? '🎉' : quizResults.accuracy >= 60 ? '👍' : '💪'}
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">
              {quizResults.accuracy >= 80 ? 'Excellent!' : quizResults.accuracy >= 60 ? 'Good Job!' : 'Keep Practicing!'}
            </h3>
            <p className="text-white text-opacity-70 mb-6">
              {quizResults.correctCount}/{quizResults.totalQuestions} correct answers
            </p>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-white bg-opacity-10 rounded-xl p-4">
                <p className="text-white text-opacity-70 text-sm">Score</p>
                <p className="text-3xl font-bold text-yellow-400">+{quizResults.score}</p>
              </div>
              <div className="bg-white bg-opacity-10 rounded-xl p-4">
                <p className="text-white text-opacity-70 text-sm">Accuracy</p>
                <p className={`text-3xl font-bold ${quizResults.accuracy >= 80 ? 'text-green-400' : quizResults.accuracy >= 60 ? 'text-yellow-400' : 'text-red-400'}`}>
                  {quizResults.accuracy}%
                </p>
              </div>
              <div className="bg-white bg-opacity-10 rounded-xl p-4">
                <p className="text-white text-opacity-70 text-sm">Total Points</p>
                <p className="text-2xl font-bold text-green-400">{quizResults.totalPoints}</p>
              </div>
              <div className="bg-white bg-opacity-10 rounded-xl p-4">
                <p className="text-white text-opacity-70 text-sm">Level</p>
                <p className="text-xl font-bold text-white">{quizResults.levelInfo.badge} {quizResults.levelInfo.name}</p>
              </div>
            </div>

            <PrimaryButton onClick={handleCloseQuizComplete} className="w-full">
              Continue Learning
            </PrimaryButton>
          </div>
        )}
      </Modal>
    </>
  );
}

// ===========================
// MATCH GAME SCREEN COMPONENT
// ===========================

const MatchGameScreen = ({
  pairs, shuffledWords, shuffledDefs, selected, matched,
  wrongPair, wrongCount, timer, complete, score, firstTryCount,
  onTap, onBack, onPlayAgain, onGoHome, difficulty
}) => {
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getCardClass = (item, type) => {
    const isMatched = matched.includes(item.id);
    const isSelected = selected && selected.id === item.id && selected.type === type;
    const isWrong = wrongPair && (
      (type === 'word' && wrongPair.wordId === item.id) ||
      (type === 'definition' && wrongPair.defId === item.id)
    );

    let base = 'w-full min-h-[48px] p-3 rounded-xl border-2 text-left transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 ';

    if (isMatched) {
      base += 'bg-green-500 bg-opacity-30 border-green-400 opacity-40 cursor-default';
    } else if (isWrong) {
      base += 'bg-red-500 bg-opacity-30 border-red-400 animate-pulse';
    } else if (isSelected) {
      base += 'bg-purple-500 bg-opacity-30 border-purple-400 ring-2 ring-purple-400 ring-opacity-50 scale-105';
    } else {
      base += 'bg-white bg-opacity-10 border-white border-opacity-20 hover:bg-opacity-20 hover:scale-102 cursor-pointer active:scale-95';
    }

    return base;
  };

  if (complete) {
    // Results screen
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        <header className="bg-white bg-opacity-10 backdrop-blur-xl border-b border-white border-opacity-20">
          <div className="container mx-auto px-4 py-4">
            <h1 className="text-2xl font-bold text-white text-center">Match Game Complete!</h1>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8 max-w-md">
          <div role="status" aria-live="polite" className="bg-white bg-opacity-10 backdrop-blur-xl rounded-2xl p-8 border border-white border-opacity-20 text-center">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-2xl font-bold text-white mb-6">Great Job!</h2>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-white bg-opacity-10 rounded-xl p-4">
                <p className="text-white text-opacity-70 text-sm">Time</p>
                <p className="text-2xl font-bold text-blue-400">{formatTime(timer)}</p>
              </div>
              <div className="bg-white bg-opacity-10 rounded-xl p-4">
                <p className="text-white text-opacity-70 text-sm">Wrong Attempts</p>
                <p className="text-2xl font-bold text-red-400">{wrongCount}</p>
              </div>
              <div className="bg-white bg-opacity-10 rounded-xl p-4">
                <p className="text-white text-opacity-70 text-sm">First Try</p>
                <p className="text-2xl font-bold text-green-400">{firstTryCount}/5</p>
              </div>
              <div className="bg-white bg-opacity-10 rounded-xl p-4">
                <p className="text-white text-opacity-70 text-sm">Score</p>
                <p className="text-2xl font-bold text-yellow-400">+{score}</p>
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={onPlayAgain}
                className="w-full py-3 px-6 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl text-white font-semibold hover:scale-105 active:scale-95 transition-all"
              >
                Play Again
              </button>
              <button
                onClick={onGoHome}
                className="w-full py-3 px-6 bg-white bg-opacity-10 border border-white border-opacity-30 rounded-xl text-white font-semibold hover:bg-opacity-20 transition-all"
              >
                Back to Home
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Header */}
      <header className="bg-white bg-opacity-10 backdrop-blur-xl border-b border-white border-opacity-20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-white hover:text-gray-300 transition-all"
              aria-label="Go back"
            >
              <ArrowLeft width="20" height="20" />
              <span>Back</span>
            </button>
            <h1 className="text-xl font-bold text-white">Match Game</h1>
            <div className="flex items-center gap-2 text-white" aria-live="off">
              <Clock width="18" height="18" />
              <span className="font-mono font-bold">{formatTime(timer)}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Game Area */}
      <main className="container mx-auto px-4 py-6 max-w-2xl">
        {/* Match Grid */}
        <div className="space-y-3">
          {shuffledWords.map((wordItem, rowIndex) => {
            const defItem = shuffledDefs[rowIndex];
            return (
              <div key={rowIndex} className="grid grid-cols-2 gap-3">
                {/* Word Card */}
                <button
                  className={getCardClass(wordItem, 'word')}
                  onClick={() => !matched.includes(wordItem.id) && !wrongPair && onTap(wordItem, 'word')}
                  disabled={matched.includes(wordItem.id)}
                  role="button"
                  aria-label={'Word: ' + wordItem.word}
                  aria-pressed={selected && selected.id === wordItem.id && selected.type === 'word'}
                  aria-disabled={matched.includes(wordItem.id)}
                >
                  <span className="text-white font-semibold text-sm sm:text-base">
                    {wordItem.word}
                  </span>
                  {matched.includes(wordItem.id) && (
                    <Check width="16" height="16" className="inline ml-2 text-green-400" />
                  )}
                </button>

                {/* Definition Card */}
                <button
                  className={getCardClass(defItem, 'definition')}
                  onClick={() => !matched.includes(defItem.id) && !wrongPair && onTap(defItem, 'definition')}
                  disabled={matched.includes(defItem.id)}
                  role="button"
                  aria-label={'Definition: ' + defItem.definition}
                  aria-pressed={selected && selected.id === defItem.id && selected.type === 'definition'}
                  aria-disabled={matched.includes(defItem.id)}
                >
                  <span className="text-white text-opacity-90 text-xs sm:text-sm leading-snug">
                    {defItem.definition}
                  </span>
                  {matched.includes(defItem.id) && (
                    <Check width="16" height="16" className="inline ml-2 text-green-400" />
                  )}
                </button>
              </div>
            );
          })}
        </div>

        {/* Status Bar */}
        <div className="mt-6 flex items-center justify-center gap-6 text-white text-sm">
          <div className="flex items-center gap-2">
            <CheckCircle width="18" height="18" className="text-green-400" />
            <span aria-live="polite" aria-atomic="true">Matches: {matched.length}/{pairs.length}</span>
          </div>
          <div className="flex items-center gap-2">
            <XCircle width="18" height="18" className="text-red-400" />
            <span aria-live="polite" aria-atomic="true">Wrong: {wrongCount}</span>
          </div>
        </div>
      </main>
    </div>
  );
};

// Expose to window for global access
window.App = App;
