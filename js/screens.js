/**
 * Screen Components
 * Literary Rides VocabPro - Modular Architecture
 * Home Screen, Quiz Screen, and other main screens
 */

const { useState, useEffect, useRef } = React;

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
            {user ? (
              <div className="flex items-center gap-3">
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
              </div>
            ) : (
              <PrimaryButton onClick={onShowAuth} icon={User}>
                Sign In
              </PrimaryButton>
            )}
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
            <LevelBadge level={stats.level} />
            {stats.currentStreak >= 5 && (
              <div className="flex items-center gap-2 bg-orange-500 bg-opacity-30 px-4 py-2 rounded-full border-2 border-orange-400">
                <Flame width="20" height="20" className="text-orange-400" />
                <span className="text-white font-bold">{stats.currentStreak} Streak!</span>
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
              icon={Star}
              title="Match Game"
              description="Coming soon!"
              color="from-yellow-600 to-orange-600"
              locked={true}
            />
          </div>
        </div>

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
            <p className="mb-2">© 2024 Literary Rides VocabPro. Created by Dr. Vishwanath Bite.</p>
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

// Export note: In browser environment with Babel, these are automatically available globally
