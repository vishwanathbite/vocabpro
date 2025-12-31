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
        alert('User with this email already exists!');
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
      }

      setUsers(prev => [...prev, newUser]);
      setCurrentUser(newUser);
      setStats(newUser.stats);
      setShowAuthModal(false);
      setShowSignupReminder(false);

      alert(`Welcome, ${formData.firstName}! Your account has been created.`);
    } else {
      // Sign in
      const user = users.find(u => u.email === formData.email && u.password === formData.password);
      if (user) {
        setCurrentUser(user);
        setStats(user.stats || initializeStats());
        setShowAuthModal(false);
        alert(`Welcome back, ${user.firstName}!`);
      } else {
        alert('Invalid email or password!');
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
   */
  const generateQuestions = (quizMode, quizDifficulty) => {
    const count = 10; // Number of questions per quiz
    let generatedQuestions = [];

    if (quizMode === 'vocab') {
      // Vocabulary mode: Definition matching
      const words = vocabularyDB[quizDifficulty];
      const selectedWords = sample(words, count);

      generatedQuestions = selectedWords.map(word => {
        const distractors = generateSmartDistractors(word.definition, words, 3);
        const options = shuffleArray([word.definition, ...distractors]);

        return {
          question: `What is the meaning of "${word.word}"?`,
          options,
          correct: word.definition,
          wordData: word,
          word: word.word
        };
      });
    } else if (quizMode === 'synonym') {
      // Synonym mode
      const words = vocabularyDB[quizDifficulty];
      const selectedWords = sample(words, count);

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
          word: word.word
        };
      });
    } else if (quizMode === 'antonym') {
      // Antonym mode
      const words = vocabularyDB[quizDifficulty];
      const selectedWords = sample(words, count);

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
          word: word.word
        };
      });
    } else if (quizMode === 'oneword') {
      // One-word substitutes
      const selectedItems = sample(oneWordDB, count);

      generatedQuestions = selectedItems.map(item => {
        const options = shuffleArray(item.options);

        return {
          question: item.phrase,
          options,
          correct: item.answer,
          wordData: item
        };
      });
    } else if (quizMode === 'acronym') {
      // Acronyms
      const selectedItems = sample(acronymsDB, count);

      generatedQuestions = selectedItems.map(item => {
        const options = shuffleArray(item.options);

        return {
          question: item.acronym,
          options,
          correct: item.full,
          wordData: item
        };
      });
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
    } else {
      // Start quiz directly for oneword and acronym
      startQuizWithDifficulty(quizMode, null);
    }
  };

  /**
   * Start quiz with selected difficulty
   */
  const startQuizWithDifficulty = (quizMode, quizDifficulty) => {
    setMode(quizMode);
    setDifficulty(quizDifficulty);
    const newQuestions = generateQuestions(quizMode, quizDifficulty);
    setQuestions(newQuestions);
    setCurrentIndex(0);
    setScore(0);
    setShowResult(false);
    setIsCorrect(false);
    setSelectedAnswer(null);
    setScreen('quiz');
    setShowDifficultyModal(false);
    setPendingMode(null);
  };

  /**
   * Handle difficulty selection
   */
  const handleDifficultySelect = (selectedDifficulty) => {
    if (pendingMode) {
      startQuizWithDifficulty(pendingMode, selectedDifficulty);
    }
  };

  /**
   * Handle answer selection
   */
  const handleAnswer = (answer) => {
    const currentQuestion = questions[currentIndex];
    const correct = answer === currentQuestion.correct;

    setSelectedAnswer(answer);
    setIsCorrect(correct);
    setShowResult(true);

    // Update stats
    const difficultyOrMode = difficulty || mode;
    const newStats = updateStats(stats, correct, difficultyOrMode, currentQuestion.word, mode);
    setStats(newStats);

    // Update session score
    if (correct) {
      const points = calculatePoints(difficultyOrMode, stats.currentStreak);
      setScore(prev => prev + points);
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
    alert(`Quiz Complete!\n\nScore: ${score} points\nTotal Points: ${stats.totalPoints}\nLevel: ${stats.level}`);
    setScreen('home');
    stopSpeech();
  };

  /**
   * Handle back to home
   */
  const handleBack = () => {
    if (confirm('Are you sure you want to exit the quiz? Your progress will be lost.')) {
      setScreen('home');
      stopSpeech();
    }
  };

  // ===========================
  // RENDER
  // ===========================

  return (
    <>
      {screen === 'home' ? (
        <HomeScreen
          user={currentUser}
          stats={stats}
          onStartQuiz={handleStartQuiz}
          onShowAuth={() => setShowAuthModal(true)}
          onShowShare={() => setShowShareModal(true)}
          onSignOut={handleSignOut}
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
    </>
  );
}

// Export note: In browser environment with Babel, App is automatically available globally
