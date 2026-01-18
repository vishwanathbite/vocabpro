/**
 * Main App Component
 * Literary Rides VocabPro - Modular Architecture
 * Central application logic, state management, and coordination
 */

const { useState, useEffect, useRef } = React;

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
  const [screen, setScreen] = useState('home'); // 'home' or 'quiz'
  const [mode, setMode] = useState(null); // 'vocab', 'synonym', 'antonym', 'oneword', 'acronym'
  const [difficulty, setDifficulty] = useState(null); // 'easy', 'medium', 'hard'

  // Quiz State
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
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

    if (quizMode === 'vocab') {
      // Vocabulary mode: Definition matching
      const words = vocabularyDB[quizDifficulty];
      // Use SRS-optimized selection if enabled
      const selectedWords = useSRS ? selectSRSOptimizedWords(words, count) : sample(words, count);

      generatedQuestions = selectedWords.map(word => {
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
      });
    } else if (quizMode === 'synonym') {
      // Synonym mode
      const words = vocabularyDB[quizDifficulty];
      const selectedWords = useSRS ? selectSRSOptimizedWords(words, count) : sample(words, count);

      generatedQuestions = selectedWords.map(word => {
        const correctSyn = randomItem(word.synonyms);
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
      });
    } else if (quizMode === 'antonym') {
      // Antonym mode
      const words = vocabularyDB[quizDifficulty];
      const selectedWords = useSRS ? selectSRSOptimizedWords(words, count) : sample(words, count);

      generatedQuestions = selectedWords.map(word => {
        const correctAnt = randomItem(word.antonyms);
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
      });
    } else if (quizMode === 'oneword') {
      // One-word substitutes
      const selectedItems = useSRS ? selectSRSOptimizedWords(oneWordDB, count) : sample(oneWordDB, count);

      generatedQuestions = selectedItems.map(item => {
        const options = shuffleArray(item.options);

        return {
          question: item.phrase,
          options,
          correct: item.answer,
          wordData: item,
          startTime: Date.now()
        };
      });
    } else if (quizMode === 'acronym') {
      // Acronyms
      const selectedItems = useSRS ? selectSRSOptimizedWords(acronymsDB, count) : sample(acronymsDB, count);

      generatedQuestions = selectedItems.map(item => {
        const options = shuffleArray(item.options);

        return {
          question: item.acronym,
          options,
          correct: item.full,
          wordData: item,
          startTime: Date.now()
        };
      });
    } else if (quizMode === 'review') {
      // Review mode - due words across all difficulties
      const allWords = [...vocabularyDB.easy, ...vocabularyDB.medium, ...vocabularyDB.hard];
      const dueWords = SRSManager.getDueWords(allWords, count);

      generatedQuestions = dueWords.map(word => {
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
      });
    } else if (quizMode === 'bookmarks') {
      // Bookmarks mode - practice saved words
      const bookmarkedWords = BookmarksManager.getForPractice(count);
      const allWords = [...vocabularyDB.easy, ...vocabularyDB.medium, ...vocabularyDB.hard];

      generatedQuestions = bookmarkedWords.map(word => {
        // Handle different word types (vocab, acronym, oneword)
        if (word.word) {
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
        } else if (word.acronym) {
          // Acronym
          return {
            question: word.acronym,
            options: shuffleArray(word.options),
            correct: word.full,
            wordData: word,
            startTime: Date.now()
          };
        } else if (word.phrase) {
          // One-word substitute
          return {
            question: word.phrase,
            options: shuffleArray(word.options),
            correct: word.answer,
            wordData: word,
            startTime: Date.now()
          };
        }
        return null;
      }).filter(q => q !== null);
    }

    return generatedQuestions;
  };

  /**
   * Start quiz handler
   */
  const handleStartQuiz = (quizMode) => {
    // Check if mode needs difficulty selection
    if (['vocab', 'synonym', 'antonym'].includes(quizMode)) {
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
    const correctCount = questions.filter((q, i) => {
      // This is approximate - we'll track this properly
      return true;
    }).length;

    setQuizResults({
      score,
      totalPoints: stats.totalPoints,
      level: stats.level,
      levelInfo: getLevelInfo(stats.totalPoints),
      correctAnswers: stats.correctAnswers,
      totalAnswered: stats.totalAnswered
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
  // RENDER
  // ===========================

  return (
    <>
      {/* Loading Overlay */}
      <LoadingOverlay isVisible={isLoading} message={loadingMessage} />

      {/* Achievement Notification */}
      {showAchievement && (
        <AchievementNotification
          badge={showAchievement}
          onClose={() => setShowAchievement(null)}
        />
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

      {screen === 'home' ? (
        <HomeScreen
          user={currentUser}
          stats={stats}
          onStartQuiz={handleStartQuiz}
          onShowAuth={() => setShowAuthModal(true)}
          onShowShare={() => setShowShareModal(true)}
          onShowSearch={() => setShowSearchModal(true)}
          onSignOut={handleSignOut}
        />
      ) : screen === 'flashcard' ? (
        <FlashcardScreen
          cards={flashcards}
          onBack={handleBack}
          onComplete={handleFlashcardComplete}
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
            <div className="text-6xl mb-4 animate-bounce-in">🎉</div>
            <h3 className="text-2xl font-bold text-white mb-6">Great Job!</h3>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-white bg-opacity-10 rounded-xl p-4">
                <p className="text-white text-opacity-70 text-sm">Session Score</p>
                <p className="text-3xl font-bold text-yellow-400">{quizResults.score}</p>
              </div>
              <div className="bg-white bg-opacity-10 rounded-xl p-4">
                <p className="text-white text-opacity-70 text-sm">Total Points</p>
                <p className="text-3xl font-bold text-green-400">{quizResults.totalPoints}</p>
              </div>
              <div className="bg-white bg-opacity-10 rounded-xl p-4">
                <p className="text-white text-opacity-70 text-sm">Level</p>
                <p className="text-2xl font-bold text-white">{quizResults.levelInfo.badge} {quizResults.levelInfo.name}</p>
              </div>
              <div className="bg-white bg-opacity-10 rounded-xl p-4">
                <p className="text-white text-opacity-70 text-sm">Accuracy</p>
                <p className="text-3xl font-bold text-blue-400">{stats.averageAccuracy.toFixed(0)}%</p>
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

// Export note: In browser environment with Babel, App is automatically available globally
