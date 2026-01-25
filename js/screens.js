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
  onShowSettings,
  onShowHistory,
  onShowAnalytics,
  onSignOut,
  showWordOfDay = true,
  showDailyGoals = true
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
              <VocabProLogo width="48" height="48" className="flex-shrink-0" />
              <div className="hidden sm:block">
                <h1 className="text-xl md:text-2xl font-bold text-white">Literary Rides VocabPro</h1>
                <p className="text-white text-opacity-70 text-xs md:text-sm">Master 5000+ Words</p>
              </div>
              <div className="sm:hidden">
                <h1 className="text-lg font-bold text-white">VocabPro</h1>
              </div>
            </div>
            <div className="flex items-center gap-1 sm:gap-2">
              {/* Search Button */}
              <button
                onClick={onShowSearch}
                className="p-2 bg-white bg-opacity-10 rounded-lg hover:bg-opacity-20 transition-all"
                title="Search words (Press /)"
              >
                <Search width="20" height="20" className="text-white" />
              </button>
              {/* Analytics Button - Hidden on small mobile */}
              <button
                onClick={onShowAnalytics}
                className="hidden xs:flex p-2 bg-white bg-opacity-10 rounded-lg hover:bg-opacity-20 transition-all"
                title="Analytics"
              >
                <TrendingUp width="20" height="20" className="text-green-400" />
              </button>
              {/* History Button - Hidden on small mobile */}
              <button
                onClick={onShowHistory}
                className="hidden sm:flex p-2 bg-white bg-opacity-10 rounded-lg hover:bg-opacity-20 transition-all"
                title="Quiz History"
              >
                <History width="20" height="20" className="text-blue-400" />
              </button>
              {/* Settings Button */}
              <button
                onClick={onShowSettings}
                className="p-2 bg-white bg-opacity-10 rounded-lg hover:bg-opacity-20 transition-all"
                title="Settings"
              >
                <Settings width="20" height="20" className="text-white" />
              </button>
              {user ? (
                <>
                  <button
                    onClick={onShowShare}
                    className="hidden sm:flex p-2 bg-white bg-opacity-10 rounded-lg hover:bg-opacity-20 transition-all"
                    title="Share & Earn"
                  >
                    <Gift width="20" height="20" className="text-yellow-400" />
                  </button>
                  <button
                    onClick={onSignOut}
                    className="px-2 sm:px-3 py-2 bg-white bg-opacity-10 rounded-lg text-white text-xs sm:text-sm hover:bg-opacity-20 transition-all"
                  >
                    <span className="hidden sm:inline">Sign Out</span>
                    <span className="sm:hidden">Exit</span>
                  </button>
                </>
              ) : (
                <button
                  onClick={onShowAuth}
                  className="px-2 sm:px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg text-white text-xs sm:text-sm font-semibold hover:scale-105 active:scale-95 transition-all flex items-center gap-1"
                >
                  <User width="16" height="16" />
                  <span className="hidden sm:inline">Sign In</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 sm:py-8">
        {/* Mobile Quick Access Bar */}
        <div className="flex sm:hidden gap-2 mb-4 overflow-x-auto hide-scrollbar pb-2">
          <button
            onClick={onShowAnalytics}
            className="flex items-center gap-2 px-3 py-2 bg-white bg-opacity-10 rounded-lg text-white text-sm whitespace-nowrap"
          >
            <TrendingUp width="16" height="16" className="text-green-400" />
            <span>Analytics</span>
          </button>
          <button
            onClick={onShowHistory}
            className="flex items-center gap-2 px-3 py-2 bg-white bg-opacity-10 rounded-lg text-white text-sm whitespace-nowrap"
          >
            <History width="16" height="16" className="text-blue-400" />
            <span>History</span>
          </button>
          {user && (
            <button
              onClick={onShowShare}
              className="flex items-center gap-2 px-3 py-2 bg-white bg-opacity-10 rounded-lg text-white text-sm whitespace-nowrap"
            >
              <Gift width="16" height="16" className="text-yellow-400" />
              <span>Share</span>
            </button>
          )}
        </div>

        {/* Welcome Section */}
        <div className="mb-6 sm:mb-8">
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
        {showDailyGoals && <DailyGoals />}

        {/* Word of the Day */}
        {showWordOfDay && <WordOfTheDay />}

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
          <div className="space-y-4" role="group" aria-label="Answer options">
            {currentQuestion.options.map((option, index) => (
              <OptionButton
                key={index}
                onClick={() => !showResult && onAnswer(option)}
                isSelected={selectedAnswer === option}
                isCorrect={showResult && option === currentQuestion.correct}
                isIncorrect={showResult && selectedAnswer === option && option !== currentQuestion.correct}
                disabled={showResult}
                optionIndex={index}
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
    // Update SRS
    const wordId = currentCard.word || currentCard.acronym || currentCard.phrase;
    if (wordId) {
      SRSManager.updateEntry(wordId, true, 3000);
    }

    // Check if this is the last card
    if (currentIndex >= cards.length - 1) {
      // Session complete - include current card in count
      setIsFlipped(false);
      onComplete(knownCards.length + 1, unknownCards.length);
    } else {
      setKnownCards(prev => [...prev, currentCard]);
      nextCard();
    }
  };

  const handleDontKnow = () => {
    // Update SRS
    const wordId = currentCard.word || currentCard.acronym || currentCard.phrase;
    if (wordId) {
      SRSManager.updateEntry(wordId, false, 5000);
    }

    // Check if this is the last card
    if (currentIndex >= cards.length - 1) {
      // Session complete - include current card in count
      setIsFlipped(false);
      onComplete(knownCards.length, unknownCards.length + 1);
    } else {
      setUnknownCards(prev => [...prev, currentCard]);
      nextCard();
    }
  };

  const nextCard = () => {
    setIsFlipped(false);
    setTimeout(() => setCurrentIndex(prev => prev + 1), 200);
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

// ===========================
// SETTINGS SCREEN
// ===========================

/**
 * Settings Screen Component
 */
const SettingsScreen = ({ onBack, onToast }) => {
  const [settings, setSettings] = useState(SettingsManager.getSettings());
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const fileInputRef = useRef(null);

  const handleToggle = (key) => {
    const newValue = !settings[key];
    const newSettings = SettingsManager.set(key, newValue);
    setSettings(newSettings);

    if (key === 'soundEnabled') {
      SoundManager.enabled = newValue;
      if (newValue) {
        SoundManager.playClick();
      }
    }
  };

  const handleGoalPreset = (preset) => {
    const newSettings = SettingsManager.set('dailyGoalPreset', preset);
    setSettings(newSettings);
    DailyGoalsManager.setGoalPreset(preset);
    onToast && onToast(`Daily goal set to ${DAILY_GOAL_PRESETS[preset].name}`);
  };

  const handleResetProgress = () => {
    setShowResetConfirm(true);
  };

  const confirmReset = () => {
    if (typeof StorageManager !== 'undefined') {
      StorageManager.resetState(true);
    } else {
      clearStorage();
    }
    window.location.reload();
  };

  // Backup/Restore handlers
  const handleExportBackup = () => {
    try {
      const jsonData = typeof StorageManager !== 'undefined'
        ? StorageManager.exportStateToJSON()
        : JSON.stringify({ settings: SettingsManager.getSettings() }, null, 2);

      const blob = new Blob([jsonData], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `vocabpro-backup-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      onToast && onToast('Backup downloaded successfully!', 'success');
    } catch (error) {
      console.error('Export failed:', error);
      onToast && onToast('Failed to export backup', 'error');
    }
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleImportBackup = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsImporting(true);
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const jsonString = e.target?.result;
        if (typeof StorageManager !== 'undefined') {
          const result = StorageManager.importStateFromJSON(jsonString);
          if (result.success) {
            onToast && onToast('Backup restored! Reloading...', 'success');
            setTimeout(() => window.location.reload(), 1500);
          } else {
            onToast && onToast(result.error || 'Invalid backup file', 'error');
            setIsImporting(false);
          }
        } else {
          onToast && onToast('Storage not available', 'error');
          setIsImporting(false);
        }
      } catch (error) {
        console.error('Import failed:', error);
        onToast && onToast('Failed to import backup', 'error');
        setIsImporting(false);
      }
    };

    reader.onerror = () => {
      onToast && onToast('Failed to read file', 'error');
      setIsImporting(false);
    };

    reader.readAsText(file);
    event.target.value = ''; // Reset input
  };

  const SettingToggle = ({ label, description, checked, onChange, icon: Icon }) => (
    <div className="flex items-center justify-between py-4 border-b border-white border-opacity-10">
      <div className="flex items-center gap-3">
        {Icon && (
          <div className="p-2 bg-white bg-opacity-10 rounded-lg">
            <Icon width="20" height="20" className="text-blue-400" />
          </div>
        )}
        <div>
          <p className="text-white font-medium">{label}</p>
          {description && <p className="text-white text-opacity-60 text-sm">{description}</p>}
        </div>
      </div>
      <button
        onClick={onChange}
        className={`relative w-14 h-8 rounded-full transition-colors duration-300 ${
          checked ? 'bg-blue-500' : 'bg-white bg-opacity-20'
        }`}
      >
        <div className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-300 ${
          checked ? 'translate-x-7' : 'translate-x-1'
        }`} />
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Header */}
      <header className="bg-white bg-opacity-10 backdrop-blur-xl border-b border-white border-opacity-20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-white hover:text-gray-300 transition-all"
            >
              <ArrowLeft width="20" height="20" />
              <span>Back</span>
            </button>
            <h1 className="text-2xl font-bold text-white">Settings</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Sound & Feedback */}
        <div className="bg-white bg-opacity-10 backdrop-blur-xl rounded-xl p-6 border border-white border-opacity-20 mb-6">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Volume2 width="20" height="20" className="text-blue-400" />
            Sound & Feedback
          </h3>
          <SettingToggle
            label="Sound Effects"
            description="Play sounds for correct/incorrect answers"
            checked={settings.soundEnabled}
            onChange={() => handleToggle('soundEnabled')}
          />
          <SettingToggle
            label="Text-to-Speech"
            description="Enable word pronunciation"
            checked={settings.speechEnabled}
            onChange={() => handleToggle('speechEnabled')}
          />
          <SettingToggle
            label="Auto-Pronounce Words"
            description="Automatically pronounce words in quizzes"
            checked={settings.autoPlayPronunciation}
            onChange={() => handleToggle('autoPlayPronunciation')}
          />
        </div>

        {/* Daily Goal */}
        <div className="bg-white bg-opacity-10 backdrop-blur-xl rounded-xl p-6 border border-white border-opacity-20 mb-6">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Target width="20" height="20" className="text-green-400" />
            Daily Goal
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {Object.entries(DAILY_GOAL_PRESETS).map(([key, preset]) => (
              <button
                key={key}
                onClick={() => handleGoalPreset(key)}
                className={`p-4 rounded-xl border-2 transition-all ${
                  settings.dailyGoalPreset === key
                    ? 'border-green-400 bg-green-500 bg-opacity-20'
                    : 'border-white border-opacity-20 bg-white bg-opacity-5 hover:bg-opacity-10'
                }`}
              >
                <p className="text-white font-bold">{preset.name}</p>
                <p className="text-white text-opacity-60 text-sm">{preset.questions} questions</p>
                <p className="text-white text-opacity-60 text-sm">{preset.points} points</p>
              </button>
            ))}
          </div>
        </div>

        {/* Display Options */}
        <div className="bg-white bg-opacity-10 backdrop-blur-xl rounded-xl p-6 border border-white border-opacity-20 mb-6">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Sun width="20" height="20" className="text-yellow-400" />
            Display
          </h3>
          <SettingToggle
            label="Word of the Day"
            description="Show daily featured word on home screen"
            checked={settings.showWordOfDay}
            onChange={() => handleToggle('showWordOfDay')}
          />
          <SettingToggle
            label="Daily Goals Widget"
            description="Show progress towards daily goals"
            checked={settings.showDailyGoals}
            onChange={() => handleToggle('showDailyGoals')}
          />
        </div>

        {/* Keyboard Shortcuts */}
        <div className="bg-white bg-opacity-10 backdrop-blur-xl rounded-xl p-6 border border-white border-opacity-20 mb-6">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Zap width="20" height="20" className="text-purple-400" />
            Keyboard Shortcuts
          </h3>
          <SettingToggle
            label="Enable Shortcuts"
            description="Use keyboard to navigate quizzes"
            checked={settings.keyboardShortcutsEnabled}
            onChange={() => handleToggle('keyboardShortcutsEnabled')}
          />
          {settings.keyboardShortcutsEnabled && (
            <div className="mt-4 space-y-2">
              <p className="text-white text-opacity-70 text-sm mb-2">Quiz shortcuts:</p>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex justify-between text-white text-opacity-70">
                  <span>1-4 or A-D</span>
                  <span>Select option</span>
                </div>
                <div className="flex justify-between text-white text-opacity-70">
                  <span>Enter / Space</span>
                  <span>Next question</span>
                </div>
                <div className="flex justify-between text-white text-opacity-70">
                  <span>P</span>
                  <span>Pronounce word</span>
                </div>
                <div className="flex justify-between text-white text-opacity-70">
                  <span>Esc</span>
                  <span>Exit quiz</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Backup & Restore */}
        <div className="bg-white bg-opacity-10 backdrop-blur-xl rounded-xl p-6 border border-white border-opacity-20 mb-6">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Save width="20" height="20" className="text-blue-400" />
            Backup & Restore
          </h3>
          <p className="text-white text-opacity-70 text-sm mb-4">
            Export your progress to a file or restore from a previous backup.
          </p>
          <div className="space-y-3">
            <button
              onClick={handleExportBackup}
              className="w-full py-3 px-4 min-h-[48px] bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg text-white font-medium hover:from-blue-600 hover:to-indigo-600 transition-all flex items-center justify-center gap-2"
            >
              <Save width="18" height="18" />
              Export Backup
            </button>
            <button
              onClick={handleImportClick}
              disabled={isImporting}
              className="w-full py-3 px-4 min-h-[48px] bg-white bg-opacity-10 border border-white border-opacity-30 rounded-lg text-white font-medium hover:bg-opacity-20 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isImporting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Importing...
                </>
              ) : (
                <>
                  <ArrowLeft width="18" height="18" className="rotate-90" />
                  Import Backup
                </>
              )}
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImportBackup}
              accept=".json"
              className="hidden"
            />
          </div>
        </div>

        {/* Data Management */}
        <div className="bg-white bg-opacity-10 backdrop-blur-xl rounded-xl p-6 border border-white border-opacity-20 mb-6">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <RotateCcw width="20" height="20" className="text-red-400" />
            Data Management
          </h3>
          <div className="space-y-3">
            <button
              onClick={() => { QuizHistoryManager.clearHistory(); onToast && onToast('Quiz history cleared'); }}
              className="w-full py-3 px-4 min-h-[48px] bg-white bg-opacity-10 rounded-lg text-white hover:bg-opacity-20 transition-all text-left"
            >
              Clear Quiz History
            </button>
            <button
              onClick={() => { SRSManager.reset(); onToast && onToast('Learning data reset'); }}
              className="w-full py-3 px-4 min-h-[48px] bg-white bg-opacity-10 rounded-lg text-white hover:bg-opacity-20 transition-all text-left"
            >
              Reset Learning Progress
            </button>
            <button
              onClick={handleResetProgress}
              className="w-full py-3 px-4 min-h-[48px] bg-red-500 bg-opacity-20 border border-red-400 rounded-lg text-red-300 hover:bg-opacity-30 transition-all text-left"
            >
              Reset All Data
            </button>
          </div>
        </div>

        {/* App Info */}
        <div className="bg-white bg-opacity-10 backdrop-blur-xl rounded-xl p-6 border border-white border-opacity-20">
          <h3 className="text-lg font-bold text-white mb-4">About VocabPro</h3>
          <div className="space-y-2 text-white text-opacity-70">
            <p>Version: 2.1.0</p>
            <p>Created by Dr. Vishwanath Bite</p>
            <p>Literary Rides</p>
            <p className="text-sm mt-4">
              Master vocabulary for UPSC, SSC, Banking, Railways & State PSC exams
            </p>
            <p className="text-xs mt-2 text-white text-opacity-50">
              Works offline after first load
            </p>
          </div>
        </div>
      </main>

      {/* Reset Confirm Modal */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-70 backdrop-blur-sm">
          <div className="bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 rounded-2xl p-6 border border-white border-opacity-20 max-w-md w-full">
            <div className="text-center">
              <div className="text-5xl mb-4">⚠️</div>
              <h2 className="text-xl font-bold text-white mb-2">Reset All Data?</h2>
              <p className="text-white text-opacity-80 mb-6">
                This will delete all your progress, stats, bookmarks, and settings. This cannot be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowResetConfirm(false)}
                  className="flex-1 py-3 bg-white bg-opacity-20 rounded-xl text-white font-semibold"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmReset}
                  className="flex-1 py-3 bg-red-500 rounded-xl text-white font-semibold"
                >
                  Reset Everything
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ===========================
// QUIZ HISTORY SCREEN
// ===========================

/**
 * Quiz History Screen Component
 */
const QuizHistoryScreen = ({ onBack }) => {
  const [history, setHistory] = useState([]);
  const [stats, setStats] = useState(null);
  const [selectedQuiz, setSelectedQuiz] = useState(null);

  useEffect(() => {
    setHistory(QuizHistoryManager.getHistory());
    setStats(QuizHistoryManager.getStats());
  }, []);

  const getModeLabel = (mode) => {
    const labels = {
      vocab: 'Vocabulary',
      synonym: 'Synonyms',
      antonym: 'Antonyms',
      oneword: 'One-Word',
      acronym: 'Acronyms',
      review: 'Smart Review',
      bookmarks: 'Bookmarks'
    };
    return labels[mode] || mode;
  };

  const getModeColor = (mode) => {
    const colors = {
      vocab: 'bg-purple-500',
      synonym: 'bg-blue-500',
      antonym: 'bg-green-500',
      oneword: 'bg-orange-500',
      acronym: 'bg-pink-500',
      review: 'bg-yellow-500',
      bookmarks: 'bg-red-500'
    };
    return colors[mode] || 'bg-gray-500';
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return `Today, ${date.toLocaleTimeString('en', { hour: '2-digit', minute: '2-digit' })}`;
    } else if (date.toDateString() === yesterday.toDateString()) {
      return `Yesterday, ${date.toLocaleTimeString('en', { hour: '2-digit', minute: '2-digit' })}`;
    }
    return date.toLocaleDateString('en', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Header */}
      <header className="bg-white bg-opacity-10 backdrop-blur-xl border-b border-white border-opacity-20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-white hover:text-gray-300 transition-all"
            >
              <ArrowLeft width="20" height="20" />
              <span>Back</span>
            </button>
            <h1 className="text-2xl font-bold text-white">Quiz History</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Stats Summary */}
        {stats && stats.totalQuizzes > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white bg-opacity-10 backdrop-blur-xl rounded-xl p-4 text-center">
              <p className="text-white text-opacity-70 text-sm">Total Quizzes</p>
              <p className="text-2xl font-bold text-white">{stats.totalQuizzes}</p>
            </div>
            <div className="bg-white bg-opacity-10 backdrop-blur-xl rounded-xl p-4 text-center">
              <p className="text-white text-opacity-70 text-sm">Questions</p>
              <p className="text-2xl font-bold text-blue-400">{stats.totalQuestions}</p>
            </div>
            <div className="bg-white bg-opacity-10 backdrop-blur-xl rounded-xl p-4 text-center">
              <p className="text-white text-opacity-70 text-sm">Correct</p>
              <p className="text-2xl font-bold text-green-400">{stats.totalCorrect}</p>
            </div>
            <div className="bg-white bg-opacity-10 backdrop-blur-xl rounded-xl p-4 text-center">
              <p className="text-white text-opacity-70 text-sm">Avg. Accuracy</p>
              <p className="text-2xl font-bold text-yellow-400">{stats.averageAccuracy}%</p>
            </div>
          </div>
        )}

        {/* 7-Day Chart */}
        {stats && stats.last7Days && stats.last7Days.some(d => d.quizzes > 0) && (
          <div className="bg-white bg-opacity-10 backdrop-blur-xl rounded-xl p-6 border border-white border-opacity-20 mb-8">
            <h3 className="text-lg font-bold text-white mb-4">Last 7 Days</h3>
            <div className="flex items-end justify-between h-32 gap-2">
              {stats.last7Days.map((day, index) => {
                const maxQuestions = Math.max(...stats.last7Days.map(d => d.questions), 1);
                const height = day.questions > 0 ? (day.questions / maxQuestions) * 100 : 5;
                return (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <div
                      className="w-full bg-blue-500 rounded-t-lg transition-all"
                      style={{ height: `${height}%` }}
                      title={`${day.questions} questions`}
                    />
                    <p className="text-white text-opacity-70 text-xs mt-2">{day.dayName}</p>
                    <p className="text-white text-opacity-50 text-xs">{day.questions}</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* History List */}
        <div className="bg-white bg-opacity-10 backdrop-blur-xl rounded-xl border border-white border-opacity-20 overflow-hidden">
          <h3 className="text-lg font-bold text-white p-4 border-b border-white border-opacity-10">Recent Quizzes</h3>
          {history.length === 0 ? (
            <div className="p-8 text-center text-white text-opacity-70">
              <History width="48" height="48" className="mx-auto mb-4 opacity-50" />
              <p>No quiz history yet</p>
              <p className="text-sm mt-2">Complete a quiz to see your history here</p>
            </div>
          ) : (
            <div className="divide-y divide-white divide-opacity-10">
              {history.map((quiz) => (
                <div
                  key={quiz.id}
                  className="p-4 hover:bg-white hover:bg-opacity-5 transition-colors cursor-pointer"
                  onClick={() => setSelectedQuiz(quiz)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className={`px-3 py-1 ${getModeColor(quiz.mode)} bg-opacity-30 rounded-full text-white text-sm font-medium`}>
                        {getModeLabel(quiz.mode)}
                      </span>
                      {quiz.difficulty && (
                        <span className="text-white text-opacity-60 text-sm capitalize">{quiz.difficulty}</span>
                      )}
                    </div>
                    <span className="text-white text-opacity-50 text-sm">{formatDate(quiz.date)}</span>
                  </div>
                  <div className="flex items-center gap-6 mt-2">
                    <span className="text-white">
                      <span className="text-green-400 font-bold">{quiz.questionsCorrect}</span>
                      <span className="text-opacity-70">/{quiz.questionsTotal} correct</span>
                    </span>
                    <span className="text-yellow-400 font-bold">+{quiz.score} pts</span>
                    <span className={`font-bold ${quiz.accuracy >= 80 ? 'text-green-400' : quiz.accuracy >= 60 ? 'text-yellow-400' : 'text-red-400'}`}>
                      {quiz.accuracy}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Quiz Detail Modal */}
      {selectedQuiz && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-70 backdrop-blur-sm"
             onClick={() => setSelectedQuiz(null)}>
          <div className="bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 rounded-2xl p-6 border border-white border-opacity-20 max-w-md w-full"
               onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-white">Quiz Details</h2>
              <button onClick={() => setSelectedQuiz(null)} className="text-white text-opacity-70 hover:text-opacity-100">
                <X width="24" height="24" />
              </button>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-white text-opacity-70">Mode</span>
                <span className="text-white font-medium">{getModeLabel(selectedQuiz.mode)}</span>
              </div>
              {selectedQuiz.difficulty && (
                <div className="flex justify-between">
                  <span className="text-white text-opacity-70">Difficulty</span>
                  <span className="text-white font-medium capitalize">{selectedQuiz.difficulty}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-white text-opacity-70">Date</span>
                <span className="text-white font-medium">{formatDate(selectedQuiz.date)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white text-opacity-70">Score</span>
                <span className="text-yellow-400 font-bold">+{selectedQuiz.score} pts</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white text-opacity-70">Correct Answers</span>
                <span className="text-green-400 font-bold">{selectedQuiz.questionsCorrect}/{selectedQuiz.questionsTotal}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white text-opacity-70">Accuracy</span>
                <span className={`font-bold ${selectedQuiz.accuracy >= 80 ? 'text-green-400' : selectedQuiz.accuracy >= 60 ? 'text-yellow-400' : 'text-red-400'}`}>
                  {selectedQuiz.accuracy}%
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ===========================
// ANALYTICS DASHBOARD
// ===========================

/**
 * Analytics Dashboard Component
 */
const AnalyticsDashboard = ({ stats, onBack }) => {
  const [quizStats, setQuizStats] = useState(null);
  const [srsStats, setSrsStats] = useState(null);

  useEffect(() => {
    setQuizStats(QuizHistoryManager.getStats());
    setSrsStats(SRSManager.getStats ? SRSManager.getStats() : null);
  }, []);

  const levelInfo = getLevelInfo(stats.totalPoints);
  const levelProgress = getLevelProgress(stats.totalPoints);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Header */}
      <header className="bg-white bg-opacity-10 backdrop-blur-xl border-b border-white border-opacity-20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-white hover:text-gray-300 transition-all"
            >
              <ArrowLeft width="20" height="20" />
              <span>Back</span>
            </button>
            <h1 className="text-2xl font-bold text-white">Analytics</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Level Progress Card */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-6 mb-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="text-5xl">{levelInfo.badge}</div>
            <div>
              <h2 className="text-2xl font-bold text-white">{levelInfo.name}</h2>
              <p className="text-white text-opacity-80">Level {levelInfo.level}</p>
            </div>
          </div>
          <div className="mb-2">
            <div className="flex justify-between text-white text-sm mb-1">
              <span>{stats.totalPoints} XP</span>
              <span>{levelProgress.pointsToNext} to next level</span>
            </div>
            <ProgressBar progress={levelProgress.progress} color="bg-white" height="h-3" />
          </div>
        </div>

        {/* Main Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white bg-opacity-10 backdrop-blur-xl rounded-xl p-4">
            <Trophy width="24" height="24" className="text-yellow-400 mb-2" />
            <p className="text-white text-opacity-70 text-sm">Total Points</p>
            <p className="text-2xl font-bold text-white">{formatNumber(stats.totalPoints)}</p>
          </div>
          <div className="bg-white bg-opacity-10 backdrop-blur-xl rounded-xl p-4">
            <Flame width="24" height="24" className="text-orange-400 mb-2" />
            <p className="text-white text-opacity-70 text-sm">Best Streak</p>
            <p className="text-2xl font-bold text-white">{stats.maxStreak} days</p>
          </div>
          <div className="bg-white bg-opacity-10 backdrop-blur-xl rounded-xl p-4">
            <Target width="24" height="24" className="text-blue-400 mb-2" />
            <p className="text-white text-opacity-70 text-sm">Questions</p>
            <p className="text-2xl font-bold text-white">{stats.totalAnswered}</p>
          </div>
          <div className="bg-white bg-opacity-10 backdrop-blur-xl rounded-xl p-4">
            <CheckCircle width="24" height="24" className="text-green-400 mb-2" />
            <p className="text-white text-opacity-70 text-sm">Accuracy</p>
            <p className="text-2xl font-bold text-white">{stats.averageAccuracy.toFixed(1)}%</p>
          </div>
        </div>

        {/* Performance Breakdown */}
        <div className="bg-white bg-opacity-10 backdrop-blur-xl rounded-xl p-6 border border-white border-opacity-20 mb-6">
          <h3 className="text-lg font-bold text-white mb-4">Performance Breakdown</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-white">Correct Answers</span>
                <span className="text-green-400 font-bold">{stats.correctAnswers}</span>
              </div>
              <ProgressBar
                progress={stats.totalAnswered > 0 ? (stats.correctAnswers / stats.totalAnswered) * 100 : 0}
                color="bg-green-500"
                height="h-2"
              />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-white">Incorrect Answers</span>
                <span className="text-red-400 font-bold">{stats.totalAnswered - stats.correctAnswers}</span>
              </div>
              <ProgressBar
                progress={stats.totalAnswered > 0 ? ((stats.totalAnswered - stats.correctAnswers) / stats.totalAnswered) * 100 : 0}
                color="bg-red-500"
                height="h-2"
              />
            </div>
          </div>
        </div>

        {/* Learning Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white bg-opacity-10 backdrop-blur-xl rounded-xl p-6 border border-white border-opacity-20">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <BookOpen width="20" height="20" className="text-purple-400" />
              Word Mastery
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-white text-opacity-70">Mastered Words</span>
                <span className="text-green-400 font-bold">{stats.masteredWords}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white text-opacity-70">Learning</span>
                <span className="text-yellow-400 font-bold">{stats.learningWords || 0}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white text-opacity-70">Need Practice</span>
                <span className="text-red-400 font-bold">{stats.strugglingWords}</span>
              </div>
            </div>
          </div>

          <div className="bg-white bg-opacity-10 backdrop-blur-xl rounded-xl p-6 border border-white border-opacity-20">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Award width="20" height="20" className="text-yellow-400" />
              Achievements
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-white text-opacity-70">Badges Earned</span>
                <span className="text-yellow-400 font-bold">{stats.earnedBadges?.length || 0}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white text-opacity-70">Current Level</span>
                <span className="text-purple-400 font-bold">{levelInfo.name}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white text-opacity-70">Streak Shields</span>
                <span className="text-blue-400 font-bold">{StreakProtection.getShields()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quiz Mode Stats */}
        {quizStats && quizStats.byMode && Object.keys(quizStats.byMode).length > 0 && (
          <div className="bg-white bg-opacity-10 backdrop-blur-xl rounded-xl p-6 border border-white border-opacity-20">
            <h3 className="text-lg font-bold text-white mb-4">Performance by Mode</h3>
            <div className="space-y-3">
              {Object.entries(quizStats.byMode).map(([mode, data]) => {
                const accuracy = data.total > 0 ? Math.round((data.correct / data.total) * 100) : 0;
                return (
                  <div key={mode} className="flex items-center gap-4">
                    <span className="text-white w-24 capitalize">{mode}</span>
                    <div className="flex-1">
                      <ProgressBar progress={accuracy} color="bg-blue-500" height="h-2" />
                    </div>
                    <span className="text-white font-bold w-16 text-right">{accuracy}%</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

// ===========================
// ONBOARDING SCREEN
// ===========================

/**
 * Onboarding Tutorial Component
 */
const OnboardingScreen = ({ onComplete, onSkip }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const steps = OnboardingManager.steps;
  const step = steps[currentStep];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
      OnboardingManager.setStep(currentStep + 1);
    } else {
      OnboardingManager.complete();
      onComplete();
    }
  };

  const handleSkip = () => {
    OnboardingManager.skip();
    onSkip();
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        {/* Progress Dots */}
        <div className="flex justify-center gap-2 mb-8">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentStep
                  ? 'w-8 bg-blue-400'
                  : index < currentStep
                    ? 'bg-blue-400'
                    : 'bg-white bg-opacity-30'
              }`}
            />
          ))}
        </div>

        {/* Content Card */}
        <div className="bg-white bg-opacity-10 backdrop-blur-xl rounded-2xl p-8 border border-white border-opacity-20 text-center">
          <div className="text-7xl mb-6 animate-bounce-in" key={currentStep}>
            {step.icon}
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">{step.title}</h2>
          <p className="text-white text-opacity-80 mb-8">{step.description}</p>

          {/* Navigation Buttons */}
          <div className="flex gap-4">
            {currentStep > 0 && (
              <button
                onClick={handleBack}
                className="flex-1 py-3 bg-white bg-opacity-10 rounded-xl text-white font-semibold
                          hover:bg-opacity-20 transition-all"
              >
                Back
              </button>
            )}
            <button
              onClick={handleNext}
              className="flex-1 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl text-white font-semibold
                        hover:scale-105 active:scale-95 transition-all"
            >
              {currentStep === steps.length - 1 ? "Let's Go!" : 'Next'}
            </button>
          </div>

          {/* Skip Link */}
          {currentStep < steps.length - 1 && (
            <button
              onClick={handleSkip}
              className="mt-4 text-white text-opacity-60 hover:text-opacity-100 text-sm"
            >
              Skip tutorial
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// Export note: In browser environment with Babel, these are automatically available globally
