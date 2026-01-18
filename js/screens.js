/**
 * Screen Components
 * Literary Rides VocabPro - Modular Architecture
 * Home Screen, Quiz Screen, and other main screens
 */

const { useState, useEffect, useRef } = React;

// ===========================
// DAILY GOALS COMPONENT
// ===========================

const DailyGoals = () => {
  const [progress, setProgress] = useState(DailyGoalsManager.getTodayProgress());
  const [goal, setGoal] = useState(DailyGoalsManager.getGoal());
  const [weekHistory, setWeekHistory] = useState(DailyGoalsManager.getWeekHistory());
  const progressPercentage = DailyGoalsManager.getProgressPercentage();
  const isComplete = progress.completed;

  // Refresh on mount
  useEffect(() => {
    setProgress(DailyGoalsManager.getTodayProgress());
    setGoal(DailyGoalsManager.getGoal());
    setWeekHistory(DailyGoalsManager.getWeekHistory());
  }, []);

  return (
    <div className={`mb-8 rounded-xl p-6 border ${isComplete
      ? 'bg-green-500 bg-opacity-10 border-green-400'
      : 'bg-white bg-opacity-10 border-white border-opacity-20'}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`p-3 rounded-lg ${isComplete ? 'bg-green-500 bg-opacity-20' : 'bg-blue-500 bg-opacity-20'}`}>
            <Target width="24" height="24" className={isComplete ? 'text-green-400' : 'text-blue-400'} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Daily Goal</h3>
            <p className="text-white text-opacity-60 text-sm">{goal.name}</p>
          </div>
        </div>
        {isComplete && (
          <div className="flex items-center gap-2 bg-green-500 bg-opacity-20 px-4 py-2 rounded-full">
            <Check width="20" height="20" className="text-green-400" />
            <span className="text-green-300 font-bold">Complete!</span>
          </div>
        )}
      </div>

      {/* Progress bars */}
      <div className="space-y-3 mb-4">
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-white text-opacity-70">Questions</span>
            <span className="text-white font-semibold">{progress.questionsAnswered} / {goal.questions}</span>
          </div>
          <ProgressBar
            progress={(progress.questionsAnswered / goal.questions) * 100}
            color={isComplete ? 'bg-green-500' : 'bg-blue-500'}
            height="h-2"
          />
        </div>
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-white text-opacity-70">Points</span>
            <span className="text-white font-semibold">{progress.pointsEarned} / {goal.points}</span>
          </div>
          <ProgressBar
            progress={(progress.pointsEarned / goal.points) * 100}
            color={isComplete ? 'bg-green-500' : 'bg-purple-500'}
            height="h-2"
          />
        </div>
      </div>

      {/* Week view */}
      <div className="flex justify-between">
        {weekHistory.map((day, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-1
              ${day.completed ? 'bg-green-500' : index === 6 ? 'bg-blue-500 bg-opacity-30 border-2 border-blue-400' : 'bg-white bg-opacity-10'}`}>
              {day.completed ? (
                <Check width="16" height="16" className="text-white" />
              ) : (
                <span className="text-white text-opacity-50 text-xs">{day.questionsAnswered || '-'}</span>
              )}
            </div>
            <span className={`text-xs ${index === 6 ? 'text-white font-bold' : 'text-white text-opacity-50'}`}>
              {day.dayName}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

// ===========================
// WORD OF THE DAY COMPONENT
// ===========================

const WordOfTheDay = () => {
  const [wotd, setWotd] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    const wotdData = getWordOfTheDay();
    setWotd(wotdData);
    if (wotdData.word) {
      setIsBookmarked(BookmarksManager.isBookmarked(wotdData.word.word));
    }
  }, []);

  if (!wotd || !wotd.word) return null;

  const word = wotd.word;

  const handleBookmark = () => {
    BookmarksManager.toggleBookmark(word, 'vocab');
    setIsBookmarked(!isBookmarked);
  };

  return (
    <div className="mb-8 bg-gradient-to-r from-amber-600 via-orange-600 to-yellow-600 rounded-xl p-1">
      <div className="bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-500 bg-opacity-20 rounded-lg animate-pulse-glow">
              <Sun width="24" height="24" className="text-yellow-400" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Word of the Day</h3>
              <p className="text-white text-opacity-60 text-xs">{new Date().toLocaleDateString('en-IN', { weekday: 'long', month: 'short', day: 'numeric' })}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => speakWord(word.word)}
              className="p-2 bg-white bg-opacity-10 rounded-lg text-blue-400 hover:bg-opacity-20"
            >
              <Volume2 width="20" height="20" />
            </button>
            <button
              onClick={handleBookmark}
              className={`p-2 rounded-lg ${isBookmarked ? 'bg-pink-500 bg-opacity-30 text-pink-400' : 'bg-white bg-opacity-10 text-white hover:text-pink-400'}`}
            >
              {isBookmarked ? <HeartFilled width="20" height="20" /> : <Heart width="20" height="20" />}
            </button>
          </div>
        </div>

        <div className="text-center mb-4">
          <h2 className="text-3xl font-bold text-white mb-2">{word.word}</h2>
          {word.pronunciation && (
            <p className="text-white text-opacity-70 italic">{word.pronunciation}</p>
          )}
        </div>

        <p className="text-white text-center mb-4">{word.definition}</p>

        {isExpanded && (
          <div className="space-y-3 mt-4 pt-4 border-t border-white border-opacity-20 animate-fade-in">
            {word.example && (
              <p className="text-white text-opacity-80"><span className="font-semibold">Example:</span> {word.example}</p>
            )}
            {word.mnemonic && (
              <p className="text-blue-300"><span className="font-semibold">Mnemonic:</span> {word.mnemonic}</p>
            )}
            {word.synonyms && word.synonyms.length > 0 && (
              <p className="text-green-300"><span className="font-semibold">Synonyms:</span> {word.synonyms.slice(0, 3).join(', ')}</p>
            )}
            {word.antonyms && word.antonyms.length > 0 && (
              <p className="text-red-300"><span className="font-semibold">Antonyms:</span> {word.antonyms.slice(0, 3).join(', ')}</p>
            )}
          </div>
        )}

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full mt-4 py-2 text-white text-opacity-70 hover:text-opacity-100 text-sm flex items-center justify-center gap-2"
        >
          <span>{isExpanded ? 'Show Less' : 'Learn More'}</span>
          <ChevronDown width="16" height="16" className={`transform transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
        </button>
      </div>
    </div>
  );
};

// ===========================
// HOME SCREEN
// ===========================

/**
 * Main home screen with stats and quiz mode selection
 */
const HomeScreen = ({
  user,
  stats,
  onStartQuiz,
  onShowAuth,
  onShowShare,
  onShowSearch,
  onSignOut
}) => {
  const [showBadges, setShowBadges] = useState(false);
  const levelInfo = getLevelInfo(stats.totalPoints);
  const levelProgress = getLevelProgress(stats.totalPoints);
  const earnedBadges = getEarnedBadges(stats);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Header */}
      <header className="bg-white bg-opacity-10 backdrop-blur-xl border-b border-white border-opacity-20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="text-3xl">📚</div>
              <div>
                <h1 className="text-2xl font-bold text-white">Literary Rides VocabPro</h1>
                <p className="text-white text-opacity-70 text-sm">Master 5000+ Words</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {/* Search Button */}
              <button
                onClick={onShowSearch}
                className="p-2 bg-white bg-opacity-10 rounded-lg hover:bg-opacity-20 transition-all"
                title="Search words"
              >
                <Search width="24" height="24" className="text-white" />
              </button>
              {user ? (
                <>
                  <button
                    onClick={onShowShare}
                    className="p-2 bg-white bg-opacity-10 rounded-lg hover:bg-opacity-20 transition-all"
                  >
                    <Gift width="24" height="24" className="text-yellow-400" />
                  </button>
                  <button
                    onClick={onSignOut}
                    className="px-4 py-2 bg-white bg-opacity-10 rounded-lg text-white text-sm hover:bg-opacity-20 transition-all"
                  >
                    Sign Out
                  </button>
                </>
                <PrimaryButton onClick={onShowAuth} icon={User}>
                  Sign In
                </PrimaryButton>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          {user && (
            <h2 className="text-3xl font-bold text-white mb-2">
              Welcome back, {user.firstName}!
            </h2>
          )}
          <div className="flex items-center gap-4 flex-wrap">
            <LevelBadge level={stats.level} totalPoints={stats.totalPoints} />
            {stats.currentStreak >= 5 && (
              <div className="flex items-center gap-2 bg-orange-500 bg-opacity-30 px-4 py-2 rounded-full border-2 border-orange-400">
                <Flame width="20" height="20" className="text-orange-400" />
                <span className="text-white font-bold">{stats.currentStreak} Streak!</span>
              </div>
            )}
            {/* Streak Shields */}
            {StreakProtection.getShields() > 0 && (
              <div className="flex items-center gap-2 bg-blue-500 bg-opacity-30 px-3 py-2 rounded-full border-2 border-blue-400"
                   title="Streak shields protect your streak if you miss a day">
                <Shield width="18" height="18" className="text-blue-400" />
                <span className="text-white font-bold text-sm">{StreakProtection.getShields()}</span>
              </div>
            )}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatsCard
            icon={Trophy}
            title="Total Points"
            value={formatNumber(stats.totalPoints)}
            subtitle={`${levelProgress.pointsToNext} to next level`}
            iconColor="text-yellow-400"
          />
          <StatsCard
            icon={Flame}
            title="Current Streak"
            value={stats.currentStreak}
            subtitle={`Best: ${stats.maxStreak}`}
            iconColor="text-orange-400"
          />
          <StatsCard
            icon={BookOpen}
            title="Words Mastered"
            value={stats.masteredWords}
            subtitle={`${stats.strugglingWords} need practice`}
            iconColor="text-green-400"
          />
          <StatsCard
            icon={Target}
            title="Accuracy"
            value={`${stats.averageAccuracy.toFixed(1)}%`}
            subtitle={`${stats.correctAnswers}/${stats.totalAnswered} correct`}
            iconColor="text-blue-400"
          />
        </div>

        {/* Daily Goals */}
        <DailyGoals />

        {/* Word of the Day */}
        <WordOfTheDay />

        {/* Level Progress */}
        {!levelProgress.isMaxLevel && (
          <div className="mb-8 bg-white bg-opacity-10 backdrop-blur-xl rounded-xl p-6 border border-white border-opacity-20">
            <div className="flex items-center justify-between mb-2">
              <span className="text-white font-semibold">Level Progress</span>
              <span className="text-white text-sm">
                {levelInfo.name} → {levelProgress.nextLevel.name}
              </span>
            </div>
            <ProgressBar progress={levelProgress.progress} color="bg-gradient-to-r from-yellow-400 to-orange-500" height="h-3" />
            <p className="text-white text-opacity-70 text-sm mt-2">
              {levelProgress.pointsToNext} points to level {levelProgress.nextLevel.level}
            </p>
          </div>
        )}

        {/* Quiz Modes */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-white mb-4">Choose Your Challenge</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <QuizModeCard
              icon={Brain}
              title="Vocabulary"
              description="Match words with their definitions"
              color="from-purple-600 to-blue-600"
              onClick={() => onStartQuiz('vocab')}
            />
            <QuizModeCard
              icon={MessageSquare}
              title="Synonyms"
              description="Find words with similar meanings"
              color="from-blue-600 to-cyan-600"
              onClick={() => onStartQuiz('synonym')}
            />
            <QuizModeCard
              icon={Target}
              title="Antonyms"
              description="Find words with opposite meanings"
              color="from-green-600 to-emerald-600"
              onClick={() => onStartQuiz('antonym')}
            />
            <QuizModeCard
              icon={List}
              title="One-Word Substitutes"
              description="Replace phrases with single words"
              color="from-orange-600 to-red-600"
              onClick={() => onStartQuiz('oneword')}
            />
            <QuizModeCard
              icon={Zap}
              title="Acronyms"
              description="Expand common acronyms"
              color="from-pink-600 to-purple-600"
              onClick={() => onStartQuiz('acronym')}
            />
            <QuizModeCard
              icon={Layers}
              title="Flashcards"
              description="Flip cards to learn without pressure"
              color="from-teal-600 to-cyan-600"
              onClick={() => onStartQuiz('flashcard')}
            />
            <QuizModeCard
              icon={Star}
              title="Smart Review"
              description="AI-powered review of words you need to practice"
              color="from-yellow-600 to-orange-600"
              onClick={() => onStartQuiz('review')}
            />
          </div>
        </div>

        {/* Bookmarks Quick Access */}
        {BookmarksManager.getCount() > 0 && (
          <div className="mb-8 bg-white bg-opacity-10 backdrop-blur-xl rounded-xl p-6 border border-white border-opacity-20">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-pink-500 bg-opacity-20 rounded-lg">
                  <HeartFilled width="24" height="24" className="text-pink-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Saved Words</h3>
                  <p className="text-white text-opacity-70 text-sm">{BookmarksManager.getCount()} words bookmarked</p>
                </div>
              </div>
              <PrimaryButton onClick={() => onStartQuiz('bookmarks')} className="text-sm px-4 py-2">
                Practice Now
              </PrimaryButton>
            </div>
          </div>
        )}

        {/* Badges Section */}
        {earnedBadges.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-bold text-white">Your Badges ({earnedBadges.length})</h3>
              <button
                onClick={() => setShowBadges(!showBadges)}
                className="text-blue-400 hover:text-blue-300 text-sm font-semibold"
              >
                {showBadges ? 'Hide' : 'Show All'}
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {(showBadges ? earnedBadges : earnedBadges.slice(0, 6)).map(badge => (
                <BadgeCard key={badge.id} badge={badge} earned={true} />
              ))}
            </div>
          </div>
        )}

        {/* Social Links */}
        <div className="bg-white bg-opacity-10 backdrop-blur-xl rounded-xl p-6 border border-white border-opacity-20">
          <h3 className="text-xl font-bold text-white mb-4 text-center">Connect with Literary Rides</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            <a
              href="https://www.youtube.com/@literaryrides"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-2 p-4 bg-white bg-opacity-10 rounded-lg hover:bg-opacity-20 transition-all"
            >
              <Youtube width="32" height="32" className="text-red-400" />
              <span className="text-white text-sm">YouTube</span>
            </a>
            <a
              href="https://www.instagram.com/literaryrides"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-2 p-4 bg-white bg-opacity-10 rounded-lg hover:bg-opacity-20 transition-all"
            >
              <Instagram width="32" height="32" className="text-pink-400" />
              <span className="text-white text-sm">@literaryrides</span>
            </a>
            <a
              href="https://www.instagram.com/vishwanathbite"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-2 p-4 bg-white bg-opacity-10 rounded-lg hover:bg-opacity-20 transition-all"
            >
              <Instagram width="32" height="32" className="text-pink-400" />
              <span className="text-white text-sm">@vishwanathbite</span>
            </a>
            <a
              href="https://open.spotify.com/show/3lsJLi7SBqrsR65I1jqxAn"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-2 p-4 bg-white bg-opacity-10 rounded-lg hover:bg-opacity-20 transition-all"
            >
              <Music width="32" height="32" className="text-green-400" />
              <span className="text-white text-sm">Spotify</span>
            </a>
            <a
              href="https://podcasts.apple.com/us/podcast/literary-rides/id1810843805"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-2 p-4 bg-white bg-opacity-10 rounded-lg hover:bg-opacity-20 transition-all"
            >
              <Headphones width="32" height="32" className="text-purple-400" />
              <span className="text-white text-sm">Apple</span>
            </a>
            <a
              href="https://music.amazon.in/podcasts/b05c6db4-5c01-4cbb-bfc4-ddf70d68a91d/literary-rides"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-2 p-4 bg-white bg-opacity-10 rounded-lg hover:bg-opacity-20 transition-all"
            >
              <Music width="32" height="32" className="text-blue-400" />
              <span className="text-white text-sm">Amazon</span>
            </a>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white bg-opacity-5 backdrop-blur-xl border-t border-white border-opacity-20 mt-12">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center text-white text-opacity-70 text-sm">
            <p className="mb-2">© {new Date().getFullYear()} Literary Rides VocabPro. Created by Dr. Vishwanath Bite.</p>
            <p>Master vocabulary for UPSC, SSC, Banking, Railways & State PSC exams</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

// ===========================
// QUIZ SCREEN
// ===========================

/**
 * Quiz screen for all quiz modes
 */
const QuizScreen = ({
  mode,
  difficulty,
  questions,
  currentIndex,
  score,
  streak,
  showResult,
  isCorrect,
  selectedAnswer,
  onAnswer,
  onNext,
  onBack,
  stats
}) => {
  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;

  if (!currentQuestion) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Loading question...</h2>
        </div>
      </div>
    );
  }

  const getModeTitle = () => {
    const titles = {
      vocab: 'Vocabulary',
      synonym: 'Synonyms',
      antonym: 'Antonyms',
      oneword: 'One-Word Substitutes',
      acronym: 'Acronyms'
    };
    return titles[mode] || 'Quiz';
  };

  const getQuestionText = () => {
    if (mode === 'vocab') return currentQuestion.question;
    if (mode === 'synonym') return `Find a synonym for: ${currentQuestion.question}`;
    if (mode === 'antonym') return `Find an antonym for: ${currentQuestion.question}`;
    if (mode === 'oneword') return `One word for: ${currentQuestion.question}`;
    if (mode === 'acronym') return `What does ${currentQuestion.question} stand for?`;
    return currentQuestion.question;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Header */}
      <header className="bg-white bg-opacity-10 backdrop-blur-xl border-b border-white border-opacity-20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-white hover:text-gray-300 transition-all"
            >
              <ArrowLeft width="20" height="20" />
              <span>Back</span>
            </button>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-white bg-opacity-10 px-4 py-2 rounded-lg">
                <Trophy width="20" height="20" className="text-yellow-400" />
                <span className="text-white font-bold">{score}</span>
              </div>
              {streak >= 3 && (
                <div className="flex items-center gap-2 bg-orange-500 bg-opacity-30 px-4 py-2 rounded-lg border border-orange-400">
                  <Flame width="20" height="20" className="text-orange-400" />
                  <span className="text-white font-bold">{streak}</span>
                </div>
              )}
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-white font-semibold">{getModeTitle()}</span>
              <span className="text-white text-sm">
                Question {currentIndex + 1} of {questions.length}
              </span>
            </div>
            <ProgressBar progress={progress} color="bg-blue-500" height="h-2" />
          </div>
        </div>
      </header>

      {/* Quiz Content */}
      <main className="container mx-auto px-4 py-8 max-w-3xl">
        <div className="bg-white bg-opacity-10 backdrop-blur-xl rounded-2xl p-8 border border-white border-opacity-20">
          {/* Question */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">{getQuestionText()}</h2>
            {currentQuestion.word && (
              <button
                onClick={() => speakWord(currentQuestion.word)}
                className="text-blue-300 hover:text-blue-100 flex items-center gap-2"
              >
                <Volume2 width="20" height="20" />
                <span>Pronounce</span>
              </button>
            )}
          </div>

          {/* Options */}
          <div className="space-y-4">
            {currentQuestion.options.map((option, index) => (
              <OptionButton
                key={index}
                onClick={() => !showResult && onAnswer(option)}
                isSelected={selectedAnswer === option}
                isCorrect={showResult && option === currentQuestion.correct}
                isIncorrect={showResult && selectedAnswer === option && option !== currentQuestion.correct}
                disabled={showResult}
              >
                {option}
              </OptionButton>
            ))}
          </div>

          {/* Result Feedback */}
          {showResult && (
            <ResultFeedback
              isCorrect={isCorrect}
              currentWord={currentQuestion.wordData}
              mode={mode}
            />
          )}

          {/* Next Button */}
          {showResult && (
            <div className="mt-6">
              <PrimaryButton onClick={onNext} className="w-full">
                {currentIndex < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
              </PrimaryButton>
            </div>
          )}
        </div>

        {/* Progress Info */}
        <div className="mt-6 grid grid-cols-3 gap-4">
          <div className="bg-white bg-opacity-10 backdrop-blur-xl rounded-lg p-4 text-center">
            <p className="text-white text-opacity-70 text-sm mb-1">Session Score</p>
            <p className="text-2xl font-bold text-white">{score}</p>
          </div>
          <div className="bg-white bg-opacity-10 backdrop-blur-xl rounded-lg p-4 text-center">
            <p className="text-white text-opacity-70 text-sm mb-1">Total Points</p>
            <p className="text-2xl font-bold text-yellow-400">{stats.totalPoints}</p>
          </div>
          <div className="bg-white bg-opacity-10 backdrop-blur-xl rounded-lg p-4 text-center">
            <p className="text-white text-opacity-70 text-sm mb-1">Level</p>
            <p className="text-2xl font-bold text-white">{stats.level}</p>
          </div>
        </div>
      </main>
    </div>
  );
};

// ===========================
// FLASHCARD SCREEN
// ===========================

/**
 * Flashcard learning screen
 */
const FlashcardScreen = ({
  cards,
  onBack,
  onComplete
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [knownCards, setKnownCards] = useState([]);
  const [unknownCards, setUnknownCards] = useState([]);

  const currentCard = cards[currentIndex];
  const progress = ((currentIndex) / cards.length) * 100;

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleKnow = () => {
    setKnownCards(prev => [...prev, currentCard]);
    // Update SRS
    const wordId = currentCard.word || currentCard.acronym || currentCard.phrase;
    if (wordId) {
      SRSManager.updateEntry(wordId, true, 3000);
    }
    nextCard();
  };

  const handleDontKnow = () => {
    setUnknownCards(prev => [...prev, currentCard]);
    // Update SRS
    const wordId = currentCard.word || currentCard.acronym || currentCard.phrase;
    if (wordId) {
      SRSManager.updateEntry(wordId, false, 5000);
    }
    nextCard();
  };

  const nextCard = () => {
    setIsFlipped(false);
    if (currentIndex < cards.length - 1) {
      setTimeout(() => setCurrentIndex(prev => prev + 1), 200);
    } else {
      // Session complete
      onComplete(knownCards.length, unknownCards.length);
    }
  };

  if (!currentCard) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Loading flashcards...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Header */}
      <header className="bg-white bg-opacity-10 backdrop-blur-xl border-b border-white border-opacity-20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-white hover:text-gray-300 transition-all"
            >
              <ArrowLeft width="20" height="20" />
              <span>Exit</span>
            </button>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-green-500 bg-opacity-20 px-3 py-1 rounded-lg">
                <Check width="16" height="16" className="text-green-400" />
                <span className="text-green-300 font-bold">{knownCards.length}</span>
              </div>
              <div className="flex items-center gap-2 bg-red-500 bg-opacity-20 px-3 py-1 rounded-lg">
                <X width="16" height="16" className="text-red-400" />
                <span className="text-red-300 font-bold">{unknownCards.length}</span>
              </div>
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-white font-semibold">Flashcards</span>
              <span className="text-white text-sm">
                {currentIndex + 1} of {cards.length}
              </span>
            </div>
            <ProgressBar progress={progress} color="bg-purple-500" height="h-2" />
          </div>
        </div>
      </header>

      {/* Flashcard */}
      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <div
          onClick={handleFlip}
          className="relative cursor-pointer perspective-1000"
          style={{ minHeight: '350px' }}
        >
          <div
            className={`w-full bg-white bg-opacity-10 backdrop-blur-xl rounded-2xl p-8 border border-white border-opacity-20
                        shadow-2xl transition-all duration-500 transform
                        ${isFlipped ? 'rotate-y-180' : ''}`}
            style={{
              transformStyle: 'preserve-3d',
              transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
              minHeight: '350px'
            }}
          >
            {/* Front of card */}
            <div
              className={`absolute inset-0 p-8 flex flex-col items-center justify-center backface-hidden
                          ${isFlipped ? 'invisible' : ''}`}
              style={{ backfaceVisibility: 'hidden' }}
            >
              <div className="text-center">
                <p className="text-white text-opacity-60 text-sm mb-4">TAP TO FLIP</p>
                <h2 className="text-4xl font-bold text-white mb-4">
                  {currentCard.word || currentCard.acronym || currentCard.answer}
                </h2>
                {currentCard.pronunciation && (
                  <p className="text-white text-opacity-70 italic mb-4">{currentCard.pronunciation}</p>
                )}
                <button
                  onClick={(e) => { e.stopPropagation(); speakWord(currentCard.word || currentCard.acronym || currentCard.answer); }}
                  className="p-3 bg-blue-500 bg-opacity-20 rounded-full text-blue-400 hover:bg-opacity-30"
                >
                  <Volume2 width="24" height="24" />
                </button>
              </div>
            </div>

            {/* Back of card */}
            <div
              className={`absolute inset-0 p-8 flex flex-col items-center justify-center
                          ${!isFlipped ? 'invisible' : ''}`}
              style={{
                backfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)'
              }}
            >
              <div className="text-center space-y-4 w-full">
                {currentCard.definition && (
                  <div>
                    <p className="text-white text-opacity-60 text-sm">Definition</p>
                    <p className="text-white text-xl">{currentCard.definition}</p>
                  </div>
                )}
                {currentCard.full && (
                  <div>
                    <p className="text-white text-opacity-60 text-sm">Full Form</p>
                    <p className="text-white text-xl">{currentCard.full}</p>
                  </div>
                )}
                {currentCard.phrase && (
                  <div>
                    <p className="text-white text-opacity-60 text-sm">Phrase</p>
                    <p className="text-white text-lg">{currentCard.phrase}</p>
                  </div>
                )}
                {currentCard.example && (
                  <div className="mt-4">
                    <p className="text-white text-opacity-60 text-sm">Example</p>
                    <p className="text-white text-opacity-80 italic">"{currentCard.example}"</p>
                  </div>
                )}
                {currentCard.mnemonic && (
                  <div className="mt-4">
                    <p className="text-blue-300 text-opacity-80 text-sm">💡 {currentCard.mnemonic}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mt-8">
          <button
            onClick={handleDontKnow}
            className="flex-1 flex items-center justify-center gap-3 px-6 py-4 bg-red-500 bg-opacity-20
                      border-2 border-red-400 text-red-300 rounded-xl font-semibold
                      hover:bg-opacity-30 active:scale-95 transition-all"
          >
            <X width="24" height="24" />
            <span>Still Learning</span>
          </button>
          <button
            onClick={handleKnow}
            className="flex-1 flex items-center justify-center gap-3 px-6 py-4 bg-green-500 bg-opacity-20
                      border-2 border-green-400 text-green-300 rounded-xl font-semibold
                      hover:bg-opacity-30 active:scale-95 transition-all"
          >
            <Check width="24" height="24" />
            <span>Got It!</span>
          </button>
        </div>

        {/* Flip hint */}
        <p className="text-center text-white text-opacity-50 mt-6">
          Tap the card to reveal the answer
        </p>
      </main>
    </div>
  );
};

// Export note: In browser environment with Babel, these are automatically available globally
