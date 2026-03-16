/**
 * Screen Components
 * Literary Rides VocabPro - Modular Architecture
 * Home Screen, Quiz Screen, and other main screens
 */

const {
  useState,
  useEffect,
  useRef
} = React;

// ===========================
// DAILY GOALS COMPONENT
// ===========================

const DailyGoals = () => {
  const [progress, setProgress] = useState(DailyGoalsManager.getTodayProgress());
  const [goal, setGoal] = useState(DailyGoalsManager.getGoal());
  const [weekHistory, setWeekHistory] = useState(DailyGoalsManager.getWeekHistory());
  const [isOpen, setIsOpen] = useState(false);
  const progressPercentage = DailyGoalsManager.getProgressPercentage();
  const isComplete = progress.completed;

  // Refresh on mount
  useEffect(() => {
    setProgress(DailyGoalsManager.getTodayProgress());
    setGoal(DailyGoalsManager.getGoal());
    setWeekHistory(DailyGoalsManager.getWeekHistory());
  }, []);
  return /*#__PURE__*/React.createElement("div", {
    className: `mb-4 rounded-lg border ${isComplete ? 'bg-green-500 bg-opacity-10 border-green-400' : 'bg-white bg-opacity-10 border-white border-opacity-20'}`
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setIsOpen(!isOpen),
    className: "w-full flex items-center justify-between p-3 text-left",
    style: {
      minHeight: '44px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: `p-1.5 rounded-md ${isComplete ? 'bg-green-500 bg-opacity-20' : 'bg-blue-500 bg-opacity-20'}`
  }, /*#__PURE__*/React.createElement(Target, {
    width: "18",
    height: "18",
    className: isComplete ? 'text-green-400' : 'text-blue-400'
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    className: "text-sm font-bold text-white leading-tight"
  }, "Daily Goal"), /*#__PURE__*/React.createElement("p", {
    className: "text-white text-opacity-60 text-xs leading-tight"
  }, goal.name, " \xB7 ", progress.questionsAnswered, "/", goal.questions, " questions"))), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2"
  }, isComplete && /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-1 bg-green-500 bg-opacity-20 px-2 py-1 rounded-full"
  }, /*#__PURE__*/React.createElement(Check, {
    width: "14",
    height: "14",
    className: "text-green-400"
  }), /*#__PURE__*/React.createElement("span", {
    className: "text-green-300 font-bold text-xs"
  }, "Done")), /*#__PURE__*/React.createElement(ChevronDown, {
    width: "16",
    height: "16",
    className: `text-white text-opacity-50 transform transition-transform ${isOpen ? 'rotate-180' : ''}`
  }))), isOpen && /*#__PURE__*/React.createElement("div", {
    className: "px-3 pb-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "space-y-2 mb-3"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between text-xs mb-0.5"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-white text-opacity-60"
  }, "Questions"), /*#__PURE__*/React.createElement("span", {
    className: "text-white font-semibold"
  }, progress.questionsAnswered, " / ", goal.questions)), /*#__PURE__*/React.createElement(ProgressBar, {
    progress: progress.questionsAnswered / goal.questions * 100,
    color: isComplete ? 'bg-green-500' : 'bg-blue-500',
    height: "h-1.5"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between text-xs mb-0.5"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-white text-opacity-60"
  }, "Points"), /*#__PURE__*/React.createElement("span", {
    className: "text-white font-semibold"
  }, progress.pointsEarned, " / ", goal.points)), /*#__PURE__*/React.createElement(ProgressBar, {
    progress: progress.pointsEarned / goal.points * 100,
    color: isComplete ? 'bg-green-500' : 'bg-purple-500',
    height: "h-1.5"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between"
  }, weekHistory.map((day, index) => /*#__PURE__*/React.createElement("div", {
    key: index,
    className: "flex flex-col items-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: `w-6 h-6 rounded-full flex items-center justify-center mb-0.5
                  ${day.completed ? 'bg-green-500' : index === 6 ? 'bg-blue-500 bg-opacity-30 border border-blue-400' : 'bg-white bg-opacity-10'}`
  }, day.completed ? /*#__PURE__*/React.createElement(Check, {
    width: "12",
    height: "12",
    className: "text-white"
  }) : /*#__PURE__*/React.createElement("span", {
    className: "text-white text-opacity-50 text-xs"
  }, day.questionsAnswered || '-')), /*#__PURE__*/React.createElement("span", {
    className: `text-xs ${index === 6 ? 'text-white font-bold' : 'text-white text-opacity-50'}`
  }, day.dayName))))));
};

// ===========================
// WORD OF THE DAY COMPONENT
// ===========================

const WordOfTheDay = () => {
  const [wotd, setWotd] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const toast = useToast();
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
  const handleShareWord = async () => {
    const text = `📚 Word of the Day: ${word.word}\n📖 ${word.definition}${word.synonyms && word.synonyms.length > 0 ? `\n🔗 Synonyms: ${word.synonyms.slice(0, 3).join(', ')}` : ''}\n\nLearn more at: https://vishwanathbite.github.io/vocabpro/`;
    try {
      await navigator.clipboard.writeText(text);
      toast.success('Word copied to clipboard!');
    } catch (err) {
      toast.error('Failed to copy');
    }
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "mb-4 bg-gradient-to-r from-amber-600 via-orange-600 to-yellow-600 rounded-lg p-0.5"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 rounded-lg p-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between mb-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "p-1.5 bg-yellow-500 bg-opacity-20 rounded-md animate-pulse-glow"
  }, /*#__PURE__*/React.createElement(Sun, {
    width: "18",
    height: "18",
    className: "text-yellow-400"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    className: "text-sm font-bold text-white leading-tight"
  }, "Word of the Day"), /*#__PURE__*/React.createElement("p", {
    className: "text-white text-opacity-60 text-xs leading-tight"
  }, new Date().toLocaleDateString('en-IN', {
    weekday: 'long',
    month: 'short',
    day: 'numeric'
  })))), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-1"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => speakWord(word.word),
    className: "p-2 bg-white bg-opacity-10 rounded-md text-blue-400 hover:bg-opacity-20",
    style: {
      minWidth: '44px',
      minHeight: '44px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(Volume2, {
    width: "18",
    height: "18"
  })), /*#__PURE__*/React.createElement("button", {
    onClick: handleBookmark,
    className: `p-2 rounded-md ${isBookmarked ? 'bg-pink-500 bg-opacity-30 text-pink-400' : 'bg-white bg-opacity-10 text-white hover:text-pink-400'}`,
    "aria-label": isBookmarked ? 'Remove bookmark' : 'Bookmark word',
    style: {
      minWidth: '44px',
      minHeight: '44px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, isBookmarked ? /*#__PURE__*/React.createElement(HeartFilled, {
    width: "18",
    height: "18"
  }) : /*#__PURE__*/React.createElement(Heart, {
    width: "18",
    height: "18"
  })), /*#__PURE__*/React.createElement("button", {
    onClick: handleShareWord,
    className: "p-2 bg-white bg-opacity-10 rounded-md text-white hover:bg-opacity-20",
    "aria-label": "Share word of the day",
    style: {
      minWidth: '44px',
      minHeight: '44px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(Share2, {
    width: "18",
    height: "18"
  })))), /*#__PURE__*/React.createElement("div", {
    className: "text-center mb-2"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "text-2xl font-bold text-white mb-1"
  }, word.word), word.pronunciation && /*#__PURE__*/React.createElement("p", {
    className: "text-white text-opacity-60 italic text-sm"
  }, word.pronunciation)), /*#__PURE__*/React.createElement("p", {
    className: "text-white text-center text-sm mb-2"
  }, word.definition), isExpanded && /*#__PURE__*/React.createElement("div", {
    className: "space-y-2 mt-2 pt-2 border-t border-white border-opacity-20 animate-fade-in text-sm"
  }, word.example && /*#__PURE__*/React.createElement("p", {
    className: "text-white text-opacity-80"
  }, /*#__PURE__*/React.createElement("span", {
    className: "font-semibold"
  }, "Example:"), " ", word.example), word.mnemonic && /*#__PURE__*/React.createElement("p", {
    className: "text-blue-300"
  }, /*#__PURE__*/React.createElement("span", {
    className: "font-semibold"
  }, "Mnemonic:"), " ", word.mnemonic), word.synonyms && word.synonyms.length > 0 && /*#__PURE__*/React.createElement("p", {
    className: "text-green-300"
  }, /*#__PURE__*/React.createElement("span", {
    className: "font-semibold"
  }, "Synonyms:"), " ", word.synonyms.slice(0, 3).join(', ')), word.antonyms && word.antonyms.length > 0 && /*#__PURE__*/React.createElement("p", {
    className: "text-red-300"
  }, /*#__PURE__*/React.createElement("span", {
    className: "font-semibold"
  }, "Antonyms:"), " ", word.antonyms.slice(0, 3).join(', '))), /*#__PURE__*/React.createElement("button", {
    onClick: () => setIsExpanded(!isExpanded),
    className: "w-full mt-2 py-1.5 text-white text-opacity-60 hover:text-opacity-100 text-xs flex items-center justify-center gap-1",
    style: {
      minHeight: '44px'
    }
  }, /*#__PURE__*/React.createElement("span", null, isExpanded ? 'Show Less' : 'Learn More'), /*#__PURE__*/React.createElement(ChevronDown, {
    width: "14",
    height: "14",
    className: `transform transition-transform ${isExpanded ? 'rotate-180' : ''}`
  }))));
};

// ===========================
// DAILY CHALLENGE CARD
// ===========================

const DailyChallengeCard = ({
  completed,
  result,
  streak,
  onStart,
  onShare
}) => {
  const yesterdayResult = DailyChallengeManager.getYesterdayResult();
  const dateStr = DailyChallengeManager.getTodayFormatted();
  const getScoreMessage = score => {
    if (score === 10) return 'Perfect!';
    if (score >= 8) return 'Excellent!';
    if (score >= 6) return 'Good job!';
    if (score >= 4) return 'Not bad!';
    return 'Keep practicing!';
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "mb-4 rounded-lg p-3 border border-amber-400 border-opacity-40",
    style: {
      background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.15) 0%, rgba(249, 115, 22, 0.15) 100%)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between mb-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "p-1.5 rounded-md bg-amber-500 bg-opacity-20"
  }, /*#__PURE__*/React.createElement(Trophy, {
    width: "18",
    height: "18",
    className: "text-amber-400"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    className: "text-sm font-bold text-white leading-tight"
  }, "Daily Challenge"), /*#__PURE__*/React.createElement("p", {
    className: "text-white text-opacity-60 text-xs leading-tight"
  }, dateStr))), streak > 0 && /*#__PURE__*/React.createElement("span", {
    className: "text-amber-300 flex items-center gap-1 text-xs"
  }, /*#__PURE__*/React.createElement(Flame, {
    width: "14",
    height: "14"
  }), streak, "d")), completed && result ? /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-green-500 bg-opacity-20 rounded-md px-3 py-1.5 flex items-center gap-1.5"
  }, /*#__PURE__*/React.createElement(CheckCircle, {
    width: "16",
    height: "16",
    className: "text-green-400"
  }), /*#__PURE__*/React.createElement("span", {
    className: "text-white font-bold text-sm"
  }, result.score, "/", result.total)), /*#__PURE__*/React.createElement("span", {
    className: "text-white text-opacity-60 text-xs"
  }, getScoreMessage(result.score)), /*#__PURE__*/React.createElement("button", {
    onClick: onShare,
    className: "ml-auto px-3 py-1.5 rounded-md bg-amber-500 bg-opacity-20 border border-amber-400 border-opacity-40 text-amber-300 font-semibold text-xs hover:bg-opacity-30 transition-all flex items-center gap-1",
    style: {
      minHeight: '44px'
    }
  }, /*#__PURE__*/React.createElement(Share2, {
    width: "14",
    height: "14"
  }), "Share")) : /*#__PURE__*/React.createElement("button", {
    onClick: onStart,
    className: "w-full py-2.5 rounded-md bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold text-sm hover:from-amber-600 hover:to-orange-600 transition-all",
    style: {
      minHeight: '44px'
    }
  }, "Start Today's Challenge"), !completed && yesterdayResult && /*#__PURE__*/React.createElement("p", {
    className: "text-white text-opacity-50 text-xs mt-1.5"
  }, "Yesterday: ", yesterdayResult.score, "/", yesterdayResult.total));
};

// ===========================
// DAILY CHALLENGE RESULTS SCREEN
// ===========================

const DailyChallengeResultsScreen = ({
  score,
  total,
  points,
  streak,
  dateStr,
  onShare,
  onClose
}) => {
  const accuracy = total > 0 ? Math.round(score / total * 100) : 0;
  const getMessage = () => {
    if (score === total) return 'Perfect!';
    if (accuracy >= 80) return 'Excellent!';
    if (accuracy >= 60) return 'Good job!';
    if (accuracy >= 40) return 'Not bad!';
    return 'Keep practicing!';
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4",
    style: {
      animation: 'fade-in 0.3s ease-out'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 rounded-2xl p-8 max-w-md w-full border border-white border-opacity-20 text-center",
    style: {
      animation: 'bounce-in 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-4xl mb-2"
  }, "\uD83C\uDFC6"), /*#__PURE__*/React.createElement("h2", {
    className: "text-2xl font-bold text-white mb-1"
  }, "Daily Challenge"), /*#__PURE__*/React.createElement("p", {
    className: "text-white text-opacity-70 text-sm mb-6"
  }, dateStr), /*#__PURE__*/React.createElement("div", {
    className: "text-5xl font-bold text-white mb-2"
  }, score, "/", total), /*#__PURE__*/React.createElement("p", {
    className: "text-xl text-amber-400 font-semibold mb-6"
  }, getMessage()), /*#__PURE__*/React.createElement("div", {
    className: "flex justify-center gap-4 mb-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-white bg-opacity-10 rounded-xl px-5 py-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-amber-400 font-bold text-lg"
  }, "+", points), /*#__PURE__*/React.createElement("div", {
    className: "text-white text-opacity-60 text-xs"
  }, "Points")), /*#__PURE__*/React.createElement("div", {
    className: "bg-white bg-opacity-10 rounded-xl px-5 py-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-orange-400 font-bold text-lg flex items-center justify-center gap-1"
  }, streak, " ", /*#__PURE__*/React.createElement(Flame, {
    width: "16",
    height: "16"
  })), /*#__PURE__*/React.createElement("div", {
    className: "text-white text-opacity-60 text-xs"
  }, "Day", streak !== 1 ? 's' : '', " Streak"))), /*#__PURE__*/React.createElement("div", {
    className: "space-y-3"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onShare,
    className: "w-full py-3 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold hover:from-amber-600 hover:to-orange-600 transition-all flex items-center justify-center gap-2"
  }, /*#__PURE__*/React.createElement(Share2, {
    width: "18",
    height: "18"
  }), "Share Challenge Results"), /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    className: "w-full py-3 rounded-lg bg-white bg-opacity-10 text-white font-semibold hover:bg-opacity-20 transition-all"
  }, "Back to Home"))));
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
  showDailyGoals = true,
  isSignedUp = false,
  signedUpName = '',
  signedUpEmail = '',
  onShowSignUp,
  showSignedUpCard = false,
  onToggleSignedUpCard,
  showSignUpNudge = false,
  onDismissNudge,
  onStartDailyChallenge,
  dailyChallengeCompleted = false,
  dailyChallengeResult = null,
  dailyChallengeStreak = 0,
  onShareDailyChallenge
}) => {
  const [showBadges, setShowBadges] = useState(false);
  const levelInfo = getLevelInfo(stats.totalPoints);
  const levelProgress = getLevelProgress(stats.totalPoints);
  const earnedBadges = getEarnedBadges(stats);
  return /*#__PURE__*/React.createElement("div", {
    className: "min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900"
  }, /*#__PURE__*/React.createElement("header", {
    className: "bg-white bg-opacity-10 backdrop-blur-xl border-b border-white border-opacity-20"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container mx-auto px-4 py-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-3"
  }, /*#__PURE__*/React.createElement("img", {
    src: "Literary-Rides.webp",
    alt: "Literary Rides VocabPro logo",
    width: "40",
    height: "40",
    className: "rounded-lg flex-shrink-0",
    style: {
      objectFit: 'contain'
    },
    onError: e => {
      e.target.style.display = 'none';
      e.target.nextElementSibling && (e.target.nextElementSibling.style.display = 'flex');
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'none',
      width: 40,
      height: 40,
      borderRadius: 8,
      background: 'linear-gradient(135deg,#7c3aed,#4f46e5)',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '1rem',
      fontWeight: 'bold',
      color: 'white',
      flexShrink: 0
    }
  }, "VP"), /*#__PURE__*/React.createElement("div", {
    className: "hidden sm:block"
  }, /*#__PURE__*/React.createElement("h1", {
    className: "text-xl md:text-2xl font-bold text-white"
  }, "Literary Rides VocabPro"), /*#__PURE__*/React.createElement("p", {
    className: "text-white text-opacity-70 text-xs md:text-sm"
  }, "Master 6,100+ Words")), /*#__PURE__*/React.createElement("div", {
    className: "sm:hidden"
  }, /*#__PURE__*/React.createElement("h1", {
    className: "text-lg font-bold text-white"
  }, "VocabPro"))), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-1 sm:gap-2"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onShowSearch,
    className: "p-2 bg-white bg-opacity-10 rounded-lg hover:bg-opacity-20 transition-all",
    title: "Search words (Press /)",
    "aria-label": "Search words"
  }, /*#__PURE__*/React.createElement(Search, {
    width: "20",
    height: "20",
    className: "text-white"
  })), /*#__PURE__*/React.createElement("button", {
    onClick: onShowAnalytics,
    className: "hidden xs:flex p-2 bg-white bg-opacity-10 rounded-lg hover:bg-opacity-20 transition-all",
    title: "Analytics",
    "aria-label": "Analytics"
  }, /*#__PURE__*/React.createElement(TrendingUp, {
    width: "20",
    height: "20",
    className: "text-green-400"
  })), /*#__PURE__*/React.createElement("button", {
    onClick: onShowHistory,
    className: "hidden sm:flex p-2 bg-white bg-opacity-10 rounded-lg hover:bg-opacity-20 transition-all",
    title: "Quiz History",
    "aria-label": "Quiz history"
  }, /*#__PURE__*/React.createElement(History, {
    width: "20",
    height: "20",
    className: "text-blue-400"
  })), /*#__PURE__*/React.createElement("button", {
    onClick: onShowSettings,
    className: "p-2 bg-white bg-opacity-10 rounded-lg hover:bg-opacity-20 transition-all",
    title: "Settings",
    "aria-label": "Settings"
  }, /*#__PURE__*/React.createElement(Settings, {
    width: "20",
    height: "20",
    className: "text-white"
  })), user ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("button", {
    onClick: onShowShare,
    className: "hidden sm:flex p-2 bg-white bg-opacity-10 rounded-lg hover:bg-opacity-20 transition-all",
    title: "Share & Earn",
    "aria-label": "Share and earn rewards"
  }, /*#__PURE__*/React.createElement(Gift, {
    width: "20",
    height: "20",
    className: "text-yellow-400"
  })), /*#__PURE__*/React.createElement("button", {
    onClick: onSignOut,
    className: "px-2 sm:px-3 py-2 bg-white bg-opacity-10 rounded-lg text-white text-xs sm:text-sm hover:bg-opacity-20 transition-all"
  }, /*#__PURE__*/React.createElement("span", {
    className: "hidden sm:inline"
  }, "Sign Out"), /*#__PURE__*/React.createElement("span", {
    className: "sm:hidden"
  }, "Exit"))) : isSignedUp ? /*#__PURE__*/React.createElement("div", {
    className: "relative"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onToggleSignedUpCard,
    className: "px-2 sm:px-3 py-2 bg-white bg-opacity-10 rounded-lg text-white text-xs sm:text-sm hover:bg-opacity-20 transition-all flex items-center gap-1",
    "aria-label": `Signed up as ${signedUpName}`
  }, /*#__PURE__*/React.createElement("div", {
    className: "relative"
  }, /*#__PURE__*/React.createElement(User, {
    width: "16",
    height: "16"
  }), /*#__PURE__*/React.createElement("div", {
    className: "absolute -top-0.5 -right-0.5 w-2 h-2 bg-green-400 rounded-full"
  })), /*#__PURE__*/React.createElement("span", {
    className: "hidden sm:inline max-w-[80px] truncate"
  }, signedUpName.split(' ')[0])), showSignedUpCard && /*#__PURE__*/React.createElement("div", {
    className: "absolute right-0 top-full mt-2 bg-gradient-to-br from-purple-900 to-blue-900 rounded-xl p-4 shadow-2xl border border-white border-opacity-20 min-w-[220px] z-50"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-white text-sm font-semibold"
  }, signedUpName), /*#__PURE__*/React.createElement("p", {
    className: "text-white text-opacity-75 text-xs mt-1"
  }, signedUpEmail))) : /*#__PURE__*/React.createElement("button", {
    onClick: onShowSignUp,
    className: "px-2 sm:px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg text-white text-xs sm:text-sm font-semibold hover:scale-105 active:scale-95 transition-all flex items-center gap-1",
    "aria-label": "Join VocabPro for free"
  }, /*#__PURE__*/React.createElement(User, {
    width: "16",
    height: "16"
  }), /*#__PURE__*/React.createElement("span", {
    className: "hidden sm:inline"
  }, "Join Free")))))), /*#__PURE__*/React.createElement("main", {
    className: "container mx-auto px-3 py-3 sm:py-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex sm:hidden gap-2 mb-4 overflow-x-auto hide-scrollbar pb-2"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onShowAnalytics,
    className: "flex items-center gap-2 px-3 py-2 bg-white bg-opacity-10 rounded-lg text-white text-sm whitespace-nowrap"
  }, /*#__PURE__*/React.createElement(TrendingUp, {
    width: "16",
    height: "16",
    className: "text-green-400"
  }), /*#__PURE__*/React.createElement("span", null, "Analytics")), /*#__PURE__*/React.createElement("button", {
    onClick: onShowHistory,
    className: "flex items-center gap-2 px-3 py-2 bg-white bg-opacity-10 rounded-lg text-white text-sm whitespace-nowrap"
  }, /*#__PURE__*/React.createElement(History, {
    width: "16",
    height: "16",
    className: "text-blue-400"
  }), /*#__PURE__*/React.createElement("span", null, "History")), user && /*#__PURE__*/React.createElement("button", {
    onClick: onShowShare,
    className: "flex items-center gap-2 px-3 py-2 bg-white bg-opacity-10 rounded-lg text-white text-sm whitespace-nowrap"
  }, /*#__PURE__*/React.createElement(Gift, {
    width: "16",
    height: "16",
    className: "text-yellow-400"
  }), /*#__PURE__*/React.createElement("span", null, "Share"))), /*#__PURE__*/React.createElement("div", {
    className: "mb-3 sm:mb-4"
  }, user && /*#__PURE__*/React.createElement("h2", {
    className: "text-3xl font-bold text-white mb-2"
  }, "Welcome back, ", user.firstName, "!"), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-4 flex-wrap"
  }, /*#__PURE__*/React.createElement(LevelBadge, {
    level: stats.level,
    totalPoints: stats.totalPoints
  }), stats.currentStreak >= 5 && /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 bg-orange-500 bg-opacity-30 px-4 py-2 rounded-full border-2 border-orange-400"
  }, /*#__PURE__*/React.createElement(Flame, {
    width: "20",
    height: "20",
    className: "text-orange-400"
  }), /*#__PURE__*/React.createElement("span", {
    className: "text-white font-bold"
  }, stats.currentStreak, " Streak!")), StreakProtection.getShields() > 0 && /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 bg-blue-500 bg-opacity-30 px-3 py-2 rounded-full border-2 border-blue-400",
    title: "Streak shields protect your streak if you miss a day"
  }, /*#__PURE__*/React.createElement(Shield, {
    width: "18",
    height: "18",
    className: "text-blue-400"
  }), /*#__PURE__*/React.createElement("span", {
    className: "text-white font-bold text-sm"
  }, StreakProtection.getShields())))), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 lg:grid-cols-4 gap-2 mb-4"
  }, /*#__PURE__*/React.createElement(StatsCard, {
    icon: Trophy,
    title: "Total Points",
    value: formatNumber(stats.totalPoints),
    subtitle: `${levelProgress.pointsToNext} to next level`,
    iconColor: "text-yellow-400"
  }), /*#__PURE__*/React.createElement(StatsCard, {
    icon: Flame,
    title: "Current Streak",
    value: stats.currentStreak,
    subtitle: `Best: ${stats.maxStreak}`,
    iconColor: "text-orange-400"
  }), /*#__PURE__*/React.createElement(StatsCard, {
    icon: BookOpen,
    title: "Words Mastered",
    value: stats.masteredWords,
    subtitle: `${stats.strugglingWords} need practice`,
    iconColor: "text-green-400"
  }), /*#__PURE__*/React.createElement(StatsCard, {
    icon: Target,
    title: "Accuracy",
    value: `${stats.averageAccuracy.toFixed(1)}%`,
    subtitle: `${stats.correctAnswers}/${stats.totalAnswered} correct`,
    iconColor: "text-blue-400"
  })), /*#__PURE__*/React.createElement(DailyChallengeCard, {
    completed: dailyChallengeCompleted,
    result: dailyChallengeResult,
    streak: dailyChallengeStreak,
    onStart: onStartDailyChallenge,
    onShare: onShareDailyChallenge
  }), showDailyGoals && /*#__PURE__*/React.createElement(DailyGoals, null), showWordOfDay && /*#__PURE__*/React.createElement(WordOfTheDay, null), !levelProgress.isMaxLevel && /*#__PURE__*/React.createElement("div", {
    className: "mb-4 bg-white bg-opacity-10 backdrop-blur-xl rounded-lg p-3 border border-white border-opacity-20"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between mb-1"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-white font-semibold text-sm"
  }, "Level Progress"), /*#__PURE__*/React.createElement("span", {
    className: "text-white text-xs text-opacity-70"
  }, levelInfo.name, " \u2192 ", levelProgress.nextLevel.name)), /*#__PURE__*/React.createElement(ProgressBar, {
    progress: levelProgress.progress,
    color: "bg-gradient-to-r from-yellow-400 to-orange-500",
    height: "h-2"
  }), /*#__PURE__*/React.createElement("p", {
    className: "text-white text-opacity-50 text-xs mt-1"
  }, levelProgress.pointsToNext, " pts to level ", levelProgress.nextLevel.level)), /*#__PURE__*/React.createElement("div", {
    className: "mb-4"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "text-lg font-bold text-white mb-2"
  }, "Choose Your Challenge"), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 lg:grid-cols-3 gap-2"
  }, /*#__PURE__*/React.createElement(QuizModeCard, {
    icon: Brain,
    title: "Vocabulary",
    description: "Match words with their definitions",
    color: "from-purple-600 to-blue-600",
    onClick: () => onStartQuiz('vocab')
  }), /*#__PURE__*/React.createElement(QuizModeCard, {
    icon: MessageSquare,
    title: "Synonyms",
    description: "Find words with similar meanings",
    color: "from-blue-600 to-cyan-600",
    onClick: () => onStartQuiz('synonym')
  }), /*#__PURE__*/React.createElement(QuizModeCard, {
    icon: Target,
    title: "Antonyms",
    description: "Find words with opposite meanings",
    color: "from-green-600 to-emerald-600",
    onClick: () => onStartQuiz('antonym')
  }), /*#__PURE__*/React.createElement(QuizModeCard, {
    icon: List,
    title: "One-Word Substitutes",
    description: "Replace phrases with single words",
    color: "from-orange-600 to-red-600",
    onClick: () => onStartQuiz('oneword')
  }), /*#__PURE__*/React.createElement(QuizModeCard, {
    icon: Zap,
    title: "Acronyms",
    description: "Expand common acronyms",
    color: "from-pink-600 to-purple-600",
    onClick: () => onStartQuiz('acronym')
  }), /*#__PURE__*/React.createElement(QuizModeCard, {
    icon: MatchGame,
    title: "Match Game",
    description: "Pair words with definitions",
    color: "from-amber-600 to-orange-600",
    onClick: () => onStartQuiz('match')
  }), /*#__PURE__*/React.createElement(QuizModeCard, {
    icon: Layers,
    title: "Flashcards",
    description: "Flip cards to learn without pressure",
    color: "from-teal-600 to-cyan-600",
    onClick: () => onStartQuiz('flashcard')
  }), /*#__PURE__*/React.createElement(QuizModeCard, {
    icon: MessageSquare,
    title: "Idioms & Phrases",
    description: "Match idioms with their meanings",
    color: "from-rose-600 to-pink-600",
    onClick: () => onStartQuiz('idiom')
  }), /*#__PURE__*/React.createElement(QuizModeCard, {
    icon: BookOpen,
    title: "Idioms Reverse",
    description: "Identify the idiom from its meaning",
    color: "from-fuchsia-600 to-rose-600",
    onClick: () => onStartQuiz('idiom-reverse')
  }), /*#__PURE__*/React.createElement(QuizModeCard, {
    icon: Star,
    title: "Smart Review",
    description: "AI-powered review of words you need to practice",
    color: "from-yellow-600 to-orange-600",
    onClick: () => onStartQuiz('review')
  }))), BookmarksManager.getCount() > 0 && /*#__PURE__*/React.createElement("div", {
    className: "mb-4 bg-white bg-opacity-10 backdrop-blur-xl rounded-lg p-3 border border-white border-opacity-20"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "p-1.5 bg-pink-500 bg-opacity-20 rounded-md"
  }, /*#__PURE__*/React.createElement(HeartFilled, {
    width: "18",
    height: "18",
    className: "text-pink-400"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    className: "text-sm font-bold text-white leading-tight"
  }, "Saved Words"), /*#__PURE__*/React.createElement("p", {
    className: "text-white text-opacity-60 text-xs"
  }, BookmarksManager.getCount(), " bookmarked"))), /*#__PURE__*/React.createElement(PrimaryButton, {
    onClick: () => onStartQuiz('bookmarks'),
    className: "text-xs px-3 py-1.5",
    style: {
      minHeight: '44px'
    }
  }, "Practice"))), earnedBadges.length > 0 && /*#__PURE__*/React.createElement("div", {
    className: "mb-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between mb-2"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "text-lg font-bold text-white"
  }, "Your Badges (", earnedBadges.length, ")"), /*#__PURE__*/React.createElement("button", {
    onClick: () => setShowBadges(!showBadges),
    className: "text-blue-400 hover:text-blue-300 text-sm font-semibold"
  }, showBadges ? 'Hide' : 'Show All')), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2"
  }, (showBadges ? earnedBadges : earnedBadges.slice(0, 6)).map(badge => /*#__PURE__*/React.createElement(BadgeCard, {
    key: badge.id,
    badge: badge,
    earned: true
  })))), /*#__PURE__*/React.createElement("div", {
    className: "bg-white bg-opacity-10 backdrop-blur-xl rounded-lg p-3 border border-white border-opacity-20"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "text-sm font-bold text-white mb-2 text-center"
  }, "Connect with Literary Rides"), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4"
  }, /*#__PURE__*/React.createElement("a", {
    href: "https://www.youtube.com/@literaryrides",
    target: "_blank",
    rel: "noopener noreferrer",
    className: "flex flex-col items-center gap-2 p-4 bg-white bg-opacity-10 rounded-lg hover:bg-opacity-20 transition-all"
  }, /*#__PURE__*/React.createElement(Youtube, {
    width: "32",
    height: "32",
    className: "text-red-400"
  }), /*#__PURE__*/React.createElement("span", {
    className: "text-white text-sm"
  }, "YouTube")), /*#__PURE__*/React.createElement("a", {
    href: "https://www.instagram.com/literaryrides",
    target: "_blank",
    rel: "noopener noreferrer",
    className: "flex flex-col items-center gap-2 p-4 bg-white bg-opacity-10 rounded-lg hover:bg-opacity-20 transition-all"
  }, /*#__PURE__*/React.createElement(Instagram, {
    width: "32",
    height: "32",
    className: "text-pink-400"
  }), /*#__PURE__*/React.createElement("span", {
    className: "text-white text-sm"
  }, "@literaryrides")), /*#__PURE__*/React.createElement("a", {
    href: "https://www.instagram.com/vishwanathbite",
    target: "_blank",
    rel: "noopener noreferrer",
    className: "flex flex-col items-center gap-2 p-4 bg-white bg-opacity-10 rounded-lg hover:bg-opacity-20 transition-all"
  }, /*#__PURE__*/React.createElement(Instagram, {
    width: "32",
    height: "32",
    className: "text-pink-400"
  }), /*#__PURE__*/React.createElement("span", {
    className: "text-white text-sm"
  }, "@vishwanathbite")), /*#__PURE__*/React.createElement("a", {
    href: "https://open.spotify.com/show/3lsJLi7SBqrsR65I1jqxAn",
    target: "_blank",
    rel: "noopener noreferrer",
    className: "flex flex-col items-center gap-2 p-4 bg-white bg-opacity-10 rounded-lg hover:bg-opacity-20 transition-all"
  }, /*#__PURE__*/React.createElement(Music, {
    width: "32",
    height: "32",
    className: "text-green-400"
  }), /*#__PURE__*/React.createElement("span", {
    className: "text-white text-sm"
  }, "Spotify")), /*#__PURE__*/React.createElement("a", {
    href: "https://podcasts.apple.com/us/podcast/literary-rides/id1810843805",
    target: "_blank",
    rel: "noopener noreferrer",
    className: "flex flex-col items-center gap-2 p-4 bg-white bg-opacity-10 rounded-lg hover:bg-opacity-20 transition-all"
  }, /*#__PURE__*/React.createElement(Headphones, {
    width: "32",
    height: "32",
    className: "text-purple-400"
  }), /*#__PURE__*/React.createElement("span", {
    className: "text-white text-sm"
  }, "Apple")), /*#__PURE__*/React.createElement("a", {
    href: "https://music.amazon.in/podcasts/b05c6db4-5c01-4cbb-bfc4-ddf70d68a91d/literary-rides",
    target: "_blank",
    rel: "noopener noreferrer",
    className: "flex flex-col items-center gap-2 p-4 bg-white bg-opacity-10 rounded-lg hover:bg-opacity-20 transition-all"
  }, /*#__PURE__*/React.createElement(Music, {
    width: "32",
    height: "32",
    className: "text-blue-400"
  }), /*#__PURE__*/React.createElement("span", {
    className: "text-white text-sm"
  }, "Amazon"))))), showSignUpNudge && !isSignedUp && /*#__PURE__*/React.createElement("div", {
    className: "fixed bottom-0 left-0 right-0 z-40 bg-gradient-to-r from-purple-800 to-blue-800 border-t border-white border-opacity-20 px-4 py-3 safe-area-bottom"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container mx-auto flex items-center justify-between gap-3 max-w-lg"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-white text-sm flex-1"
  }, /*#__PURE__*/React.createElement("span", {
    className: "mr-1"
  }, "\uD83C\uDFAF"), " Join 50+ learners \u2014 get vocab tips & updates"), /*#__PURE__*/React.createElement("button", {
    onClick: onShowSignUp,
    className: "px-4 py-2 bg-white bg-opacity-20 rounded-lg text-white text-sm font-semibold hover:bg-opacity-30 transition-all whitespace-nowrap"
  }, "Join Free"), /*#__PURE__*/React.createElement("button", {
    onClick: onDismissNudge,
    className: "p-1 text-white text-opacity-75 hover:text-opacity-100",
    "aria-label": "Dismiss"
  }, /*#__PURE__*/React.createElement(X, {
    width: "18",
    height: "18"
  })))), /*#__PURE__*/React.createElement("footer", {
    className: "bg-white bg-opacity-5 backdrop-blur-xl border-t border-white border-opacity-20 mt-12"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container mx-auto px-4 py-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-center text-white text-opacity-70 text-sm"
  }, /*#__PURE__*/React.createElement("p", {
    className: "mb-2"
  }, "\xA9 ", new Date().getFullYear(), " Literary Rides VocabPro. Created by Dr. Vishwanath Bite."), /*#__PURE__*/React.createElement("p", null, "Master vocabulary for UPSC, SSC, Banking, Railways & State PSC exams"), /*#__PURE__*/React.createElement("p", {
    className: "mt-2"
  }, /*#__PURE__*/React.createElement("a", {
    href: "https://vishwanathbite.github.io/vocabpro/privacy.html",
    target: "_blank",
    rel: "noopener noreferrer",
    className: "text-white text-opacity-50 hover:text-opacity-75 transition-all text-xs"
  }, "Privacy Policy"))))));
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
  stats,
  isDailyChallenge = false
}) => {
  const currentQuestion = questions[currentIndex];
  const progress = (currentIndex + 1) / questions.length * 100;
  if (!currentQuestion) {
    return /*#__PURE__*/React.createElement("div", {
      className: "min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center"
    }, /*#__PURE__*/React.createElement("div", {
      className: "text-white text-center"
    }, /*#__PURE__*/React.createElement("h2", {
      className: "text-2xl font-bold mb-4"
    }, "Loading question...")));
  }
  const getModeTitle = () => {
    if (isDailyChallenge) {
      return `Daily Challenge`;
    }
    const titles = {
      vocab: 'Vocabulary',
      synonym: 'Synonyms',
      antonym: 'Antonyms',
      oneword: 'One-Word Substitutes',
      acronym: 'Acronyms',
      idiom: 'Idioms & Phrases',
      'idiom-reverse': 'Idioms (Reverse)'
    };
    return titles[mode] || 'Quiz';
  };
  const getQuestionText = () => {
    if (isDailyChallenge && currentQuestion.dailyMode) {
      if (currentQuestion.dailyMode === 'Synonym') return `Find a synonym for: ${currentQuestion.question}`;
      if (currentQuestion.dailyMode === 'Antonym') return `Find an antonym for: ${currentQuestion.question}`;
      if (currentQuestion.dailyMode === 'Idiom') return `What does the idiom "${currentQuestion.question}" mean?`;
      return currentQuestion.question;
    }
    if (mode === 'vocab') return currentQuestion.question;
    if (mode === 'synonym') return `Find a synonym for: ${currentQuestion.question}`;
    if (mode === 'antonym') return `Find an antonym for: ${currentQuestion.question}`;
    if (mode === 'oneword') return `One word for: ${currentQuestion.question}`;
    if (mode === 'acronym') return `What does ${currentQuestion.question} stand for?`;
    if (mode === 'idiom') return `What does the idiom "${currentQuestion.question}" mean?`;
    if (mode === 'idiom-reverse') return `Which idiom means: ${currentQuestion.question}?`;
    return currentQuestion.question;
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900"
  }, /*#__PURE__*/React.createElement("header", {
    className: "bg-white bg-opacity-10 backdrop-blur-xl border-b border-white border-opacity-20"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container mx-auto px-4 py-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between mb-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-3"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onBack,
    className: "flex items-center gap-2 text-white hover:text-gray-300 transition-all"
  }, /*#__PURE__*/React.createElement(ArrowLeft, {
    width: "20",
    height: "20"
  }), /*#__PURE__*/React.createElement("span", null, "Back")), isDailyChallenge && /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-1 text-amber-400 text-sm font-semibold"
  }, /*#__PURE__*/React.createElement(Trophy, {
    width: "16",
    height: "16"
  }), /*#__PURE__*/React.createElement("span", null, "Daily Challenge"))), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 bg-white bg-opacity-10 px-4 py-2 rounded-lg"
  }, /*#__PURE__*/React.createElement(Trophy, {
    width: "20",
    height: "20",
    className: "text-yellow-400"
  }), /*#__PURE__*/React.createElement("span", {
    className: "text-white font-bold",
    "aria-live": "polite",
    "aria-atomic": "true"
  }, "Score: ", score)), streak >= 3 && /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 bg-orange-500 bg-opacity-30 px-4 py-2 rounded-lg border border-orange-400"
  }, /*#__PURE__*/React.createElement(Flame, {
    width: "20",
    height: "20",
    className: "text-orange-400"
  }), /*#__PURE__*/React.createElement("span", {
    className: "text-white font-bold"
  }, streak)))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between mb-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-white font-semibold"
  }, isDailyChallenge && currentQuestion.dailyMode ? /*#__PURE__*/React.createElement("span", null, currentQuestion.dailyMode) : getModeTitle()), /*#__PURE__*/React.createElement("span", {
    className: "text-white text-sm"
  }, "Question ", currentIndex + 1, " of ", questions.length)), /*#__PURE__*/React.createElement(ProgressBar, {
    progress: progress,
    color: "bg-blue-500",
    height: "h-2"
  })))), /*#__PURE__*/React.createElement("main", {
    className: "container mx-auto px-4 py-8 max-w-3xl"
  }, /*#__PURE__*/React.createElement("div", {
    className: "rounded-2xl p-8 border",
    style: {
      backgroundColor: 'rgba(15, 23, 60, 0.7)',
      borderColor: 'rgba(148, 163, 214, 0.25)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "mb-8"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "text-2xl font-bold text-white mb-4"
  }, getQuestionText()), currentQuestion.word && /*#__PURE__*/React.createElement("button", {
    onClick: () => speakWord(currentQuestion.word),
    className: "text-blue-300 hover:text-blue-100 flex items-center gap-2"
  }, /*#__PURE__*/React.createElement(Volume2, {
    width: "20",
    height: "20"
  }), /*#__PURE__*/React.createElement("span", null, "Pronounce"))), /*#__PURE__*/React.createElement("div", {
    className: "space-y-4",
    role: "radiogroup",
    "aria-label": "Choose the correct answer"
  }, currentQuestion.options.map((option, index) => /*#__PURE__*/React.createElement(OptionButton, {
    key: index,
    onClick: () => !showResult && onAnswer(option),
    isSelected: selectedAnswer === option,
    isCorrect: showResult && option === currentQuestion.correct,
    isIncorrect: showResult && selectedAnswer === option && option !== currentQuestion.correct,
    disabled: showResult,
    optionIndex: index,
    role: "radio",
    "aria-checked": selectedAnswer === option
  }, option))), showResult && /*#__PURE__*/React.createElement(ResultFeedback, {
    isCorrect: isCorrect,
    currentWord: currentQuestion.wordData,
    mode: mode
  }), showResult && /*#__PURE__*/React.createElement("div", {
    className: "mt-6"
  }, /*#__PURE__*/React.createElement(PrimaryButton, {
    onClick: onNext,
    className: "w-full"
  }, currentIndex < questions.length - 1 ? 'Next Question' : 'Finish Quiz'))), /*#__PURE__*/React.createElement("div", {
    className: "mt-6 grid grid-cols-3 gap-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "rounded-lg p-4 text-center",
    style: {
      backgroundColor: 'rgba(15, 23, 60, 0.6)'
    }
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-white text-opacity-70 text-sm mb-1"
  }, "Session Score"), /*#__PURE__*/React.createElement("p", {
    className: "text-2xl font-bold text-white"
  }, score)), /*#__PURE__*/React.createElement("div", {
    className: "rounded-lg p-4 text-center",
    style: {
      backgroundColor: 'rgba(15, 23, 60, 0.6)'
    }
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-white text-opacity-70 text-sm mb-1"
  }, "Total Points"), /*#__PURE__*/React.createElement("p", {
    className: "text-2xl font-bold text-yellow-400"
  }, stats.totalPoints)), /*#__PURE__*/React.createElement("div", {
    className: "rounded-lg p-4 text-center",
    style: {
      backgroundColor: 'rgba(15, 23, 60, 0.6)'
    }
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-white text-opacity-70 text-sm mb-1"
  }, "Level"), /*#__PURE__*/React.createElement("p", {
    className: "text-2xl font-bold text-white"
  }, stats.level)))));
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
  const progress = currentIndex / cards.length * 100;
  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  // Keyboard shortcuts for flashcards
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      switch (e.key) {
        case ' ':
        case 'Enter':
          e.preventDefault();
          setIsFlipped(prev => !prev);
          break;
        case 'ArrowRight':
        case 'k':
          e.preventDefault();
          handleKnow();
          break;
        case 'ArrowLeft':
        case 'l':
          e.preventDefault();
          handleDontKnow();
          break;
        case 'p':
          e.preventDefault();
          if (currentCard) speakWord(currentCard.word || currentCard.acronym || currentCard.answer);
          break;
        case 'Escape':
          e.preventDefault();
          onBack();
          break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, currentCard, knownCards, unknownCards]);
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
    return /*#__PURE__*/React.createElement("div", {
      className: "min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center"
    }, /*#__PURE__*/React.createElement("div", {
      className: "text-white text-center"
    }, /*#__PURE__*/React.createElement("h2", {
      className: "text-2xl font-bold mb-4"
    }, "Loading flashcards...")));
  }
  return /*#__PURE__*/React.createElement("div", {
    className: "min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900"
  }, /*#__PURE__*/React.createElement("header", {
    className: "bg-white bg-opacity-10 backdrop-blur-xl border-b border-white border-opacity-20"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container mx-auto px-4 py-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between mb-4"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onBack,
    "aria-label": "Exit flashcard session",
    className: "flex items-center gap-2 text-white hover:text-gray-300 transition-all"
  }, /*#__PURE__*/React.createElement(ArrowLeft, {
    width: "20",
    height: "20"
  }), /*#__PURE__*/React.createElement("span", null, "Exit")), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 bg-green-500 bg-opacity-20 px-3 py-1 rounded-lg",
    "aria-label": `${knownCards.length} cards known`
  }, /*#__PURE__*/React.createElement(Check, {
    width: "16",
    height: "16",
    className: "text-green-400"
  }), /*#__PURE__*/React.createElement("span", {
    className: "text-green-300 font-bold"
  }, knownCards.length)), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 bg-red-500 bg-opacity-20 px-3 py-1 rounded-lg",
    "aria-label": `${unknownCards.length} cards still learning`
  }, /*#__PURE__*/React.createElement(X, {
    width: "16",
    height: "16",
    className: "text-red-400"
  }), /*#__PURE__*/React.createElement("span", {
    className: "text-red-300 font-bold"
  }, unknownCards.length)))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between mb-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-white font-semibold"
  }, "Flashcards"), /*#__PURE__*/React.createElement("span", {
    className: "text-white text-sm"
  }, currentIndex + 1, " of ", cards.length)), /*#__PURE__*/React.createElement(ProgressBar, {
    progress: progress,
    color: "bg-purple-500",
    height: "h-2"
  })))), /*#__PURE__*/React.createElement("main", {
    className: "container mx-auto px-4 py-8 max-w-2xl"
  }, /*#__PURE__*/React.createElement("div", {
    onClick: handleFlip,
    onKeyDown: e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleFlip();
      }
    },
    role: "region",
    "aria-label": isFlipped ? 'Flashcard — showing definition. Press Enter to flip back to word.' : 'Flashcard — showing word. Press Enter to flip and see definition.',
    tabIndex: 0,
    className: "relative cursor-pointer perspective-1000 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-transparent rounded-2xl",
    style: {
      minHeight: '350px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: `w-full bg-white bg-opacity-10 backdrop-blur-xl rounded-2xl p-8 border border-white border-opacity-20
                        shadow-2xl transition-all duration-500 transform
                        ${isFlipped ? 'rotate-y-180' : ''}`,
    style: {
      transformStyle: 'preserve-3d',
      transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
      minHeight: '350px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: `absolute inset-0 p-8 flex flex-col items-center justify-center backface-hidden
                          ${isFlipped ? 'invisible' : ''}`,
    style: {
      backfaceVisibility: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-center"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-white text-opacity-75 text-sm mb-4"
  }, "TAP TO FLIP"), /*#__PURE__*/React.createElement("h2", {
    className: "text-4xl font-bold text-white mb-4"
  }, currentCard.word || currentCard.acronym || currentCard.answer), currentCard.pronunciation && /*#__PURE__*/React.createElement("p", {
    className: "text-white text-opacity-70 italic mb-4"
  }, currentCard.pronunciation), /*#__PURE__*/React.createElement("button", {
    onClick: e => {
      e.stopPropagation();
      speakWord(currentCard.word || currentCard.acronym || currentCard.answer);
    },
    className: "p-3 bg-blue-500 bg-opacity-20 rounded-full text-blue-400 hover:bg-opacity-30",
    "aria-label": "Listen to pronunciation"
  }, /*#__PURE__*/React.createElement(Volume2, {
    width: "24",
    height: "24"
  })))), /*#__PURE__*/React.createElement("div", {
    className: `absolute inset-0 p-8 flex flex-col items-center justify-center
                          ${!isFlipped ? 'invisible' : ''}`,
    style: {
      backfaceVisibility: 'hidden',
      transform: 'rotateY(180deg)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-center space-y-4 w-full"
  }, currentCard.definition && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-white text-opacity-75 text-sm"
  }, "Definition"), /*#__PURE__*/React.createElement("p", {
    className: "text-white text-xl"
  }, currentCard.definition)), currentCard.full && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-white text-opacity-75 text-sm"
  }, "Full Form"), /*#__PURE__*/React.createElement("p", {
    className: "text-white text-xl"
  }, currentCard.full)), currentCard.phrase && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-white text-opacity-75 text-sm"
  }, "Phrase"), /*#__PURE__*/React.createElement("p", {
    className: "text-white text-lg"
  }, currentCard.phrase)), currentCard.example && /*#__PURE__*/React.createElement("div", {
    className: "mt-4"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-white text-opacity-75 text-sm"
  }, "Example"), /*#__PURE__*/React.createElement("p", {
    className: "text-white text-opacity-80 italic"
  }, "\"", currentCard.example, "\"")), currentCard.mnemonic && /*#__PURE__*/React.createElement("div", {
    className: "mt-4"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-blue-300 text-opacity-80 text-sm"
  }, "\uD83D\uDCA1 ", currentCard.mnemonic)))))), /*#__PURE__*/React.createElement("div", {
    className: "flex gap-4 mt-8"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: handleDontKnow,
    "aria-label": "Still learning \u2014 mark card for review",
    className: "flex-1 flex items-center justify-center gap-3 px-6 py-4 bg-red-500 bg-opacity-20 border-2 border-red-400 text-red-300 rounded-xl font-semibold hover:bg-opacity-30 active:scale-95 transition-all"
  }, /*#__PURE__*/React.createElement(X, {
    width: "24",
    height: "24"
  }), /*#__PURE__*/React.createElement("span", null, "Still Learning")), /*#__PURE__*/React.createElement("button", {
    onClick: handleKnow,
    "aria-label": "Got it \u2014 mark card as known",
    className: "flex-1 flex items-center justify-center gap-3 px-6 py-4 bg-green-500 bg-opacity-20 border-2 border-green-400 text-green-300 rounded-xl font-semibold hover:bg-opacity-30 active:scale-95 transition-all"
  }, /*#__PURE__*/React.createElement(Check, {
    width: "24",
    height: "24"
  }), /*#__PURE__*/React.createElement("span", null, "Got It!"))), /*#__PURE__*/React.createElement("p", {
    className: "text-center text-white text-opacity-50 mt-6"
  }, "Tap the card to reveal the answer")));
};

// ===========================
// SETTINGS SCREEN
// ===========================

/**
 * Settings Screen Component
 */
const SettingsScreen = ({
  onBack,
  onToast
}) => {
  const [settings, setSettings] = useState(SettingsManager.getSettings());
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const fileInputRef = useRef(null);
  const handleToggle = key => {
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
  const handleGoalPreset = preset => {
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
      const jsonData = typeof StorageManager !== 'undefined' ? StorageManager.exportStateToJSON() : JSON.stringify({
        settings: SettingsManager.getSettings()
      }, null, 2);
      const blob = new Blob([jsonData], {
        type: 'application/json'
      });
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
  const handleImportBackup = event => {
    const file = event.target.files?.[0];
    if (!file) return;
    setIsImporting(true);
    const reader = new FileReader();
    reader.onload = e => {
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
  const SettingToggle = ({
    label,
    description,
    checked,
    onChange,
    icon: Icon
  }) => /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between py-4 border-b border-white border-opacity-10"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-3"
  }, Icon && /*#__PURE__*/React.createElement("div", {
    className: "p-2 bg-white bg-opacity-10 rounded-lg"
  }, /*#__PURE__*/React.createElement(Icon, {
    width: "20",
    height: "20",
    className: "text-blue-400"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-white font-medium"
  }, label), description && /*#__PURE__*/React.createElement("p", {
    className: "text-white text-opacity-75 text-sm"
  }, description))), /*#__PURE__*/React.createElement("button", {
    onClick: onChange,
    className: `relative w-14 h-8 rounded-full transition-colors duration-300 ${checked ? 'bg-blue-500' : 'bg-white bg-opacity-20'}`,
    role: "switch",
    "aria-checked": checked,
    "aria-label": label
  }, /*#__PURE__*/React.createElement("div", {
    className: `absolute top-1 w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-300 ${checked ? 'translate-x-7' : 'translate-x-1'}`
  })));
  return /*#__PURE__*/React.createElement("div", {
    className: "min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900"
  }, /*#__PURE__*/React.createElement("header", {
    className: "bg-white bg-opacity-10 backdrop-blur-xl border-b border-white border-opacity-20"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container mx-auto px-4 py-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-4"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onBack,
    className: "flex items-center gap-2 text-white hover:text-gray-300 transition-all"
  }, /*#__PURE__*/React.createElement(ArrowLeft, {
    width: "20",
    height: "20"
  }), /*#__PURE__*/React.createElement("span", null, "Back")), /*#__PURE__*/React.createElement("h1", {
    className: "text-2xl font-bold text-white"
  }, "Settings")))), /*#__PURE__*/React.createElement("main", {
    className: "container mx-auto px-4 py-8 max-w-2xl"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-white bg-opacity-10 backdrop-blur-xl rounded-xl p-6 border border-white border-opacity-20 mb-6"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "text-lg font-bold text-white mb-4 flex items-center gap-2"
  }, /*#__PURE__*/React.createElement(Volume2, {
    width: "20",
    height: "20",
    className: "text-blue-400"
  }), "Sound & Feedback"), /*#__PURE__*/React.createElement(SettingToggle, {
    label: "Sound Effects",
    description: "Play sounds for correct/incorrect answers",
    checked: settings.soundEnabled,
    onChange: () => handleToggle('soundEnabled')
  }), /*#__PURE__*/React.createElement(SettingToggle, {
    label: "Text-to-Speech",
    description: "Enable word pronunciation",
    checked: settings.speechEnabled,
    onChange: () => handleToggle('speechEnabled')
  }), /*#__PURE__*/React.createElement(SettingToggle, {
    label: "Auto-Pronounce Words",
    description: "Automatically pronounce words in quizzes",
    checked: settings.autoPlayPronunciation,
    onChange: () => handleToggle('autoPlayPronunciation')
  })), /*#__PURE__*/React.createElement("div", {
    className: "bg-white bg-opacity-10 backdrop-blur-xl rounded-xl p-6 border border-white border-opacity-20 mb-6"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "text-lg font-bold text-white mb-4 flex items-center gap-2"
  }, /*#__PURE__*/React.createElement(Target, {
    width: "20",
    height: "20",
    className: "text-green-400"
  }), "Daily Goal"), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 gap-3"
  }, Object.entries(DAILY_GOAL_PRESETS).map(([key, preset]) => /*#__PURE__*/React.createElement("button", {
    key: key,
    onClick: () => handleGoalPreset(key),
    className: `p-4 rounded-xl border-2 transition-all ${settings.dailyGoalPreset === key ? 'border-green-400 bg-green-500 bg-opacity-20' : 'border-white border-opacity-20 bg-white bg-opacity-5 hover:bg-opacity-10'}`
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-white font-bold"
  }, preset.name), /*#__PURE__*/React.createElement("p", {
    className: "text-white text-opacity-75 text-sm"
  }, preset.questions, " questions"), /*#__PURE__*/React.createElement("p", {
    className: "text-white text-opacity-75 text-sm"
  }, preset.points, " points"))))), /*#__PURE__*/React.createElement("div", {
    className: "bg-white bg-opacity-10 backdrop-blur-xl rounded-xl p-6 border border-white border-opacity-20 mb-6"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "text-lg font-bold text-white mb-4 flex items-center gap-2"
  }, /*#__PURE__*/React.createElement(Sun, {
    width: "20",
    height: "20",
    className: "text-yellow-400"
  }), "Display"), /*#__PURE__*/React.createElement(SettingToggle, {
    label: "Word of the Day",
    description: "Show daily featured word on home screen",
    checked: settings.showWordOfDay,
    onChange: () => handleToggle('showWordOfDay')
  }), /*#__PURE__*/React.createElement(SettingToggle, {
    label: "Daily Goals Widget",
    description: "Show progress towards daily goals",
    checked: settings.showDailyGoals,
    onChange: () => handleToggle('showDailyGoals')
  })), /*#__PURE__*/React.createElement("div", {
    className: "bg-white bg-opacity-10 backdrop-blur-xl rounded-xl p-6 border border-white border-opacity-20 mb-6"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "text-lg font-bold text-white mb-4 flex items-center gap-2"
  }, /*#__PURE__*/React.createElement(Zap, {
    width: "20",
    height: "20",
    className: "text-purple-400"
  }), "Keyboard Shortcuts"), /*#__PURE__*/React.createElement(SettingToggle, {
    label: "Enable Shortcuts",
    description: "Use keyboard to navigate quizzes",
    checked: settings.keyboardShortcutsEnabled,
    onChange: () => handleToggle('keyboardShortcutsEnabled')
  }), settings.keyboardShortcutsEnabled && /*#__PURE__*/React.createElement("div", {
    className: "mt-4 space-y-2"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-white text-opacity-70 text-sm mb-2"
  }, "Quiz shortcuts:"), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 gap-2 text-sm"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between text-white text-opacity-70"
  }, /*#__PURE__*/React.createElement("span", null, "1-4 or A-D"), /*#__PURE__*/React.createElement("span", null, "Select option")), /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between text-white text-opacity-70"
  }, /*#__PURE__*/React.createElement("span", null, "Enter / Space"), /*#__PURE__*/React.createElement("span", null, "Next question")), /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between text-white text-opacity-70"
  }, /*#__PURE__*/React.createElement("span", null, "P"), /*#__PURE__*/React.createElement("span", null, "Pronounce word")), /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between text-white text-opacity-70"
  }, /*#__PURE__*/React.createElement("span", null, "Esc"), /*#__PURE__*/React.createElement("span", null, "Exit quiz"))))), /*#__PURE__*/React.createElement("div", {
    className: "bg-white bg-opacity-10 backdrop-blur-xl rounded-xl p-6 border border-white border-opacity-20 mb-6"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "text-lg font-bold text-white mb-4 flex items-center gap-2"
  }, /*#__PURE__*/React.createElement(Save, {
    width: "20",
    height: "20",
    className: "text-blue-400"
  }), "Backup & Restore"), /*#__PURE__*/React.createElement("p", {
    className: "text-white text-opacity-70 text-sm mb-4"
  }, "Export your progress to a file or restore from a previous backup."), /*#__PURE__*/React.createElement("div", {
    className: "space-y-3"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: handleExportBackup,
    className: "w-full py-3 px-4 min-h-[48px] bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg text-white font-medium hover:from-blue-600 hover:to-indigo-600 transition-all flex items-center justify-center gap-2"
  }, /*#__PURE__*/React.createElement(Save, {
    width: "18",
    height: "18"
  }), "Export Backup"), /*#__PURE__*/React.createElement("button", {
    onClick: handleImportClick,
    disabled: isImporting,
    className: "w-full py-3 px-4 min-h-[48px] bg-white bg-opacity-10 border border-white border-opacity-30 rounded-lg text-white font-medium hover:bg-opacity-20 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
  }, isImporting ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"
  }), "Importing...") : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(ArrowLeft, {
    width: "18",
    height: "18",
    className: "rotate-90"
  }), "Import Backup")), /*#__PURE__*/React.createElement("input", {
    type: "file",
    ref: fileInputRef,
    onChange: handleImportBackup,
    accept: ".json",
    className: "hidden"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "bg-white bg-opacity-10 backdrop-blur-xl rounded-xl p-6 border border-white border-opacity-20 mb-6"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "text-lg font-bold text-white mb-4 flex items-center gap-2"
  }, /*#__PURE__*/React.createElement(RotateCcw, {
    width: "20",
    height: "20",
    className: "text-red-400"
  }), "Data Management"), /*#__PURE__*/React.createElement("div", {
    className: "space-y-3"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      QuizHistoryManager.clearHistory();
      onToast && onToast('Quiz history cleared');
    },
    className: "w-full py-3 px-4 min-h-[48px] bg-white bg-opacity-10 rounded-lg text-white hover:bg-opacity-20 transition-all text-left"
  }, "Clear Quiz History"), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      SRSManager.reset();
      onToast && onToast('Learning data reset');
    },
    className: "w-full py-3 px-4 min-h-[48px] bg-white bg-opacity-10 rounded-lg text-white hover:bg-opacity-20 transition-all text-left"
  }, "Reset Learning Progress"), /*#__PURE__*/React.createElement("button", {
    onClick: handleResetProgress,
    className: "w-full py-3 px-4 min-h-[48px] bg-red-500 bg-opacity-20 border border-red-400 rounded-lg text-red-300 hover:bg-opacity-30 transition-all text-left"
  }, "Reset All Data"))), /*#__PURE__*/React.createElement("div", {
    className: "bg-white bg-opacity-10 backdrop-blur-xl rounded-xl p-6 border border-white border-opacity-20"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "text-lg font-bold text-white mb-4"
  }, "About VocabPro"), /*#__PURE__*/React.createElement("div", {
    className: "space-y-2 text-white text-opacity-70"
  }, /*#__PURE__*/React.createElement("p", null, "Version: 2.1.0"), /*#__PURE__*/React.createElement("p", null, "Created by Dr. Vishwanath Bite"), /*#__PURE__*/React.createElement("p", null, "Literary Rides"), /*#__PURE__*/React.createElement("p", {
    className: "text-sm mt-4"
  }, "Master vocabulary for UPSC, SSC, Banking, Railways & State PSC exams"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs mt-2 text-white text-opacity-50"
  }, "Works offline after first load")))), showResetConfirm && /*#__PURE__*/React.createElement("div", {
    className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-70 backdrop-blur-sm"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 rounded-2xl p-6 border border-white border-opacity-20 max-w-md w-full"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-5xl mb-4"
  }, "\u26A0\uFE0F"), /*#__PURE__*/React.createElement("h2", {
    className: "text-xl font-bold text-white mb-2"
  }, "Reset All Data?"), /*#__PURE__*/React.createElement("p", {
    className: "text-white text-opacity-80 mb-6"
  }, "This will delete all your progress, stats, bookmarks, and settings. This cannot be undone."), /*#__PURE__*/React.createElement("div", {
    className: "flex gap-3"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setShowResetConfirm(false),
    className: "flex-1 py-3 bg-white bg-opacity-20 rounded-xl text-white font-semibold"
  }, "Cancel"), /*#__PURE__*/React.createElement("button", {
    onClick: confirmReset,
    className: "flex-1 py-3 bg-red-500 rounded-xl text-white font-semibold"
  }, "Reset Everything"))))));
};

// ===========================
// QUIZ HISTORY SCREEN
// ===========================

/**
 * Quiz History Screen Component
 */
const QuizHistoryScreen = ({
  onBack
}) => {
  const [history, setHistory] = useState([]);
  const [stats, setStats] = useState(null);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  useEffect(() => {
    setHistory(QuizHistoryManager.getHistory());
    setStats(QuizHistoryManager.getStats());
  }, []);
  const getModeLabel = mode => {
    const labels = {
      vocab: 'Vocabulary',
      synonym: 'Synonyms',
      antonym: 'Antonyms',
      oneword: 'One-Word',
      acronym: 'Acronyms',
      review: 'Smart Review',
      bookmarks: 'Bookmarks',
      match: 'Match Game',
      daily: 'Daily Challenge'
    };
    return labels[mode] || mode;
  };
  const getModeColor = mode => {
    const colors = {
      vocab: 'bg-purple-500',
      synonym: 'bg-blue-500',
      antonym: 'bg-green-500',
      oneword: 'bg-orange-500',
      acronym: 'bg-pink-500',
      review: 'bg-yellow-500',
      bookmarks: 'bg-red-500',
      match: 'bg-amber-500',
      daily: 'bg-amber-600'
    };
    return colors[mode] || 'bg-gray-500';
  };
  const formatDate = dateStr => {
    const date = new Date(dateStr);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    if (date.toDateString() === today.toDateString()) {
      return `Today, ${date.toLocaleTimeString('en', {
        hour: '2-digit',
        minute: '2-digit'
      })}`;
    } else if (date.toDateString() === yesterday.toDateString()) {
      return `Yesterday, ${date.toLocaleTimeString('en', {
        hour: '2-digit',
        minute: '2-digit'
      })}`;
    }
    return date.toLocaleDateString('en', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900"
  }, /*#__PURE__*/React.createElement("header", {
    className: "bg-white bg-opacity-10 backdrop-blur-xl border-b border-white border-opacity-20"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container mx-auto px-4 py-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-4"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onBack,
    className: "flex items-center gap-2 text-white hover:text-gray-300 transition-all"
  }, /*#__PURE__*/React.createElement(ArrowLeft, {
    width: "20",
    height: "20"
  }), /*#__PURE__*/React.createElement("span", null, "Back")), /*#__PURE__*/React.createElement("h1", {
    className: "text-2xl font-bold text-white"
  }, "Quiz History")))), /*#__PURE__*/React.createElement("main", {
    className: "container mx-auto px-4 py-8 max-w-4xl"
  }, stats && stats.totalQuizzes > 0 && /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-white bg-opacity-10 backdrop-blur-xl rounded-xl p-4 text-center"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-white text-opacity-70 text-sm"
  }, "Total Quizzes"), /*#__PURE__*/React.createElement("p", {
    className: "text-2xl font-bold text-white"
  }, stats.totalQuizzes)), /*#__PURE__*/React.createElement("div", {
    className: "bg-white bg-opacity-10 backdrop-blur-xl rounded-xl p-4 text-center"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-white text-opacity-70 text-sm"
  }, "Questions"), /*#__PURE__*/React.createElement("p", {
    className: "text-2xl font-bold text-blue-400"
  }, stats.totalQuestions)), /*#__PURE__*/React.createElement("div", {
    className: "bg-white bg-opacity-10 backdrop-blur-xl rounded-xl p-4 text-center"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-white text-opacity-70 text-sm"
  }, "Correct"), /*#__PURE__*/React.createElement("p", {
    className: "text-2xl font-bold text-green-400"
  }, stats.totalCorrect)), /*#__PURE__*/React.createElement("div", {
    className: "bg-white bg-opacity-10 backdrop-blur-xl rounded-xl p-4 text-center"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-white text-opacity-70 text-sm"
  }, "Avg. Accuracy"), /*#__PURE__*/React.createElement("p", {
    className: "text-2xl font-bold text-yellow-400"
  }, stats.averageAccuracy, "%"))), stats && stats.last7Days && stats.last7Days.some(d => d.quizzes > 0) && /*#__PURE__*/React.createElement("div", {
    className: "bg-white bg-opacity-10 backdrop-blur-xl rounded-xl p-6 border border-white border-opacity-20 mb-8"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "text-lg font-bold text-white mb-4"
  }, "Last 7 Days"), /*#__PURE__*/React.createElement("div", {
    className: "flex items-end justify-between h-32 gap-2"
  }, stats.last7Days.map((day, index) => {
    const maxQuestions = Math.max(...stats.last7Days.map(d => d.questions), 1);
    const height = day.questions > 0 ? day.questions / maxQuestions * 100 : 5;
    return /*#__PURE__*/React.createElement("div", {
      key: index,
      className: "flex-1 flex flex-col items-center"
    }, /*#__PURE__*/React.createElement("div", {
      className: "w-full bg-blue-500 rounded-t-lg transition-all",
      style: {
        height: `${height}%`
      },
      title: `${day.questions} questions`
    }), /*#__PURE__*/React.createElement("p", {
      className: "text-white text-opacity-70 text-xs mt-2"
    }, day.dayName), /*#__PURE__*/React.createElement("p", {
      className: "text-white text-opacity-50 text-xs"
    }, day.questions));
  }))), /*#__PURE__*/React.createElement("div", {
    className: "bg-white bg-opacity-10 backdrop-blur-xl rounded-xl border border-white border-opacity-20 overflow-hidden"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "text-lg font-bold text-white p-4 border-b border-white border-opacity-10"
  }, "Recent Quizzes"), history.length === 0 ? /*#__PURE__*/React.createElement("div", {
    className: "p-8 text-center text-white text-opacity-70"
  }, /*#__PURE__*/React.createElement(History, {
    width: "48",
    height: "48",
    className: "mx-auto mb-4 opacity-50"
  }), /*#__PURE__*/React.createElement("p", null, "No quiz history yet"), /*#__PURE__*/React.createElement("p", {
    className: "text-sm mt-2"
  }, "Complete a quiz to see your history here")) : /*#__PURE__*/React.createElement("div", {
    className: "divide-y divide-white divide-opacity-10"
  }, history.map(quiz => /*#__PURE__*/React.createElement("div", {
    key: quiz.id,
    className: "p-4 hover:bg-white hover:bg-opacity-5 transition-colors cursor-pointer",
    onClick: () => setSelectedQuiz(quiz)
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-3"
  }, /*#__PURE__*/React.createElement("span", {
    className: `px-3 py-1 ${getModeColor(quiz.mode)} bg-opacity-30 rounded-full text-white text-sm font-medium`
  }, getModeLabel(quiz.mode)), quiz.difficulty && /*#__PURE__*/React.createElement("span", {
    className: "text-white text-opacity-75 text-sm capitalize"
  }, quiz.difficulty)), /*#__PURE__*/React.createElement("span", {
    className: "text-white text-opacity-50 text-sm"
  }, formatDate(quiz.date))), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-6 mt-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-white"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-green-400 font-bold"
  }, quiz.questionsCorrect), /*#__PURE__*/React.createElement("span", {
    className: "text-opacity-70"
  }, "/", quiz.questionsTotal, " correct")), /*#__PURE__*/React.createElement("span", {
    className: "text-yellow-400 font-bold"
  }, "+", quiz.score, " pts"), /*#__PURE__*/React.createElement("span", {
    className: `font-bold ${quiz.accuracy >= 80 ? 'text-green-400' : quiz.accuracy >= 60 ? 'text-yellow-400' : 'text-red-400'}`
  }, quiz.accuracy, "%"))))))), selectedQuiz && /*#__PURE__*/React.createElement("div", {
    className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-70 backdrop-blur-sm",
    onClick: () => setSelectedQuiz(null)
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 rounded-2xl p-6 border border-white border-opacity-20 max-w-md w-full",
    onClick: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between mb-4"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "text-xl font-bold text-white"
  }, "Quiz Details"), /*#__PURE__*/React.createElement("button", {
    onClick: () => setSelectedQuiz(null),
    className: "text-white text-opacity-70 hover:text-opacity-100",
    "aria-label": "Close"
  }, /*#__PURE__*/React.createElement(X, {
    width: "24",
    height: "24"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "space-y-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-white text-opacity-70"
  }, "Mode"), /*#__PURE__*/React.createElement("span", {
    className: "text-white font-medium"
  }, getModeLabel(selectedQuiz.mode))), selectedQuiz.difficulty && /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-white text-opacity-70"
  }, "Difficulty"), /*#__PURE__*/React.createElement("span", {
    className: "text-white font-medium capitalize"
  }, selectedQuiz.difficulty)), /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-white text-opacity-70"
  }, "Date"), /*#__PURE__*/React.createElement("span", {
    className: "text-white font-medium"
  }, formatDate(selectedQuiz.date))), /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-white text-opacity-70"
  }, "Score"), /*#__PURE__*/React.createElement("span", {
    className: "text-yellow-400 font-bold"
  }, "+", selectedQuiz.score, " pts")), /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-white text-opacity-70"
  }, "Correct Answers"), /*#__PURE__*/React.createElement("span", {
    className: "text-green-400 font-bold"
  }, selectedQuiz.questionsCorrect, "/", selectedQuiz.questionsTotal)), /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-white text-opacity-70"
  }, "Accuracy"), /*#__PURE__*/React.createElement("span", {
    className: `font-bold ${selectedQuiz.accuracy >= 80 ? 'text-green-400' : selectedQuiz.accuracy >= 60 ? 'text-yellow-400' : 'text-red-400'}`
  }, selectedQuiz.accuracy, "%"))))));
};

// ===========================
// ANALYTICS DASHBOARD
// ===========================

/**
 * Analytics Dashboard Component
 */
const AnalyticsDashboard = ({
  stats,
  onBack
}) => {
  const [quizStats, setQuizStats] = useState(null);
  const [srsStats, setSrsStats] = useState(null);
  useEffect(() => {
    setQuizStats(QuizHistoryManager.getStats());
    setSrsStats(SRSManager.getStats ? SRSManager.getStats() : null);
  }, []);
  const levelInfo = getLevelInfo(stats.totalPoints);
  const levelProgress = getLevelProgress(stats.totalPoints);
  return /*#__PURE__*/React.createElement("div", {
    className: "min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900"
  }, /*#__PURE__*/React.createElement("header", {
    className: "bg-white bg-opacity-10 backdrop-blur-xl border-b border-white border-opacity-20"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container mx-auto px-4 py-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-4"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onBack,
    className: "flex items-center gap-2 text-white hover:text-gray-300 transition-all"
  }, /*#__PURE__*/React.createElement(ArrowLeft, {
    width: "20",
    height: "20"
  }), /*#__PURE__*/React.createElement("span", null, "Back")), /*#__PURE__*/React.createElement("h1", {
    className: "text-2xl font-bold text-white"
  }, "Analytics")))), /*#__PURE__*/React.createElement("main", {
    className: "container mx-auto px-4 py-8 max-w-4xl"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-6 mb-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-4 mb-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-5xl"
  }, levelInfo.badge), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
    className: "text-2xl font-bold text-white"
  }, levelInfo.name), /*#__PURE__*/React.createElement("p", {
    className: "text-white text-opacity-80"
  }, "Level ", levelInfo.level))), /*#__PURE__*/React.createElement("div", {
    className: "mb-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between text-white text-sm mb-1"
  }, /*#__PURE__*/React.createElement("span", null, stats.totalPoints, " XP"), /*#__PURE__*/React.createElement("span", null, levelProgress.pointsToNext, " to next level")), /*#__PURE__*/React.createElement(ProgressBar, {
    progress: levelProgress.progress,
    color: "bg-white",
    height: "h-3"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 md:grid-cols-4 gap-4 mb-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-white bg-opacity-10 backdrop-blur-xl rounded-xl p-4"
  }, /*#__PURE__*/React.createElement(Trophy, {
    width: "24",
    height: "24",
    className: "text-yellow-400 mb-2"
  }), /*#__PURE__*/React.createElement("p", {
    className: "text-white text-opacity-70 text-sm"
  }, "Total Points"), /*#__PURE__*/React.createElement("p", {
    className: "text-2xl font-bold text-white"
  }, formatNumber(stats.totalPoints))), /*#__PURE__*/React.createElement("div", {
    className: "bg-white bg-opacity-10 backdrop-blur-xl rounded-xl p-4"
  }, /*#__PURE__*/React.createElement(Flame, {
    width: "24",
    height: "24",
    className: "text-orange-400 mb-2"
  }), /*#__PURE__*/React.createElement("p", {
    className: "text-white text-opacity-70 text-sm"
  }, "Best Streak"), /*#__PURE__*/React.createElement("p", {
    className: "text-2xl font-bold text-white"
  }, stats.maxStreak, " days")), /*#__PURE__*/React.createElement("div", {
    className: "bg-white bg-opacity-10 backdrop-blur-xl rounded-xl p-4"
  }, /*#__PURE__*/React.createElement(Target, {
    width: "24",
    height: "24",
    className: "text-blue-400 mb-2"
  }), /*#__PURE__*/React.createElement("p", {
    className: "text-white text-opacity-70 text-sm"
  }, "Questions"), /*#__PURE__*/React.createElement("p", {
    className: "text-2xl font-bold text-white"
  }, stats.totalAnswered)), /*#__PURE__*/React.createElement("div", {
    className: "bg-white bg-opacity-10 backdrop-blur-xl rounded-xl p-4"
  }, /*#__PURE__*/React.createElement(CheckCircle, {
    width: "24",
    height: "24",
    className: "text-green-400 mb-2"
  }), /*#__PURE__*/React.createElement("p", {
    className: "text-white text-opacity-70 text-sm"
  }, "Accuracy"), /*#__PURE__*/React.createElement("p", {
    className: "text-2xl font-bold text-white"
  }, stats.averageAccuracy.toFixed(1), "%"))), /*#__PURE__*/React.createElement("div", {
    className: "bg-white bg-opacity-10 backdrop-blur-xl rounded-xl p-6 border border-white border-opacity-20 mb-6"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "text-lg font-bold text-white mb-4"
  }, "Performance Breakdown"), /*#__PURE__*/React.createElement("div", {
    className: "space-y-4"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between text-sm mb-1"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-white"
  }, "Correct Answers"), /*#__PURE__*/React.createElement("span", {
    className: "text-green-400 font-bold"
  }, stats.correctAnswers)), /*#__PURE__*/React.createElement(ProgressBar, {
    progress: stats.totalAnswered > 0 ? stats.correctAnswers / stats.totalAnswered * 100 : 0,
    color: "bg-green-500",
    height: "h-2"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between text-sm mb-1"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-white"
  }, "Incorrect Answers"), /*#__PURE__*/React.createElement("span", {
    className: "text-red-400 font-bold"
  }, stats.totalAnswered - stats.correctAnswers)), /*#__PURE__*/React.createElement(ProgressBar, {
    progress: stats.totalAnswered > 0 ? (stats.totalAnswered - stats.correctAnswers) / stats.totalAnswered * 100 : 0,
    color: "bg-red-500",
    height: "h-2"
  })))), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 md:grid-cols-2 gap-6 mb-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-white bg-opacity-10 backdrop-blur-xl rounded-xl p-6 border border-white border-opacity-20"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "text-lg font-bold text-white mb-4 flex items-center gap-2"
  }, /*#__PURE__*/React.createElement(BookOpen, {
    width: "20",
    height: "20",
    className: "text-purple-400"
  }), "Word Mastery"), /*#__PURE__*/React.createElement("div", {
    className: "space-y-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between items-center"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-white text-opacity-70"
  }, "Mastered Words"), /*#__PURE__*/React.createElement("span", {
    className: "text-green-400 font-bold"
  }, stats.masteredWords)), /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between items-center"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-white text-opacity-70"
  }, "Learning"), /*#__PURE__*/React.createElement("span", {
    className: "text-yellow-400 font-bold"
  }, stats.learningWords || 0)), /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between items-center"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-white text-opacity-70"
  }, "Need Practice"), /*#__PURE__*/React.createElement("span", {
    className: "text-red-400 font-bold"
  }, stats.strugglingWords)))), /*#__PURE__*/React.createElement("div", {
    className: "bg-white bg-opacity-10 backdrop-blur-xl rounded-xl p-6 border border-white border-opacity-20"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "text-lg font-bold text-white mb-4 flex items-center gap-2"
  }, /*#__PURE__*/React.createElement(Award, {
    width: "20",
    height: "20",
    className: "text-yellow-400"
  }), "Achievements"), /*#__PURE__*/React.createElement("div", {
    className: "space-y-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between items-center"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-white text-opacity-70"
  }, "Badges Earned"), /*#__PURE__*/React.createElement("span", {
    className: "text-yellow-400 font-bold"
  }, stats.earnedBadges?.length || 0)), /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between items-center"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-white text-opacity-70"
  }, "Current Level"), /*#__PURE__*/React.createElement("span", {
    className: "text-purple-400 font-bold"
  }, levelInfo.name)), /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between items-center"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-white text-opacity-70"
  }, "Streak Shields"), /*#__PURE__*/React.createElement("span", {
    className: "text-blue-400 font-bold"
  }, StreakProtection.getShields()))))), quizStats && quizStats.byMode && Object.keys(quizStats.byMode).length > 0 && /*#__PURE__*/React.createElement("div", {
    className: "bg-white bg-opacity-10 backdrop-blur-xl rounded-xl p-6 border border-white border-opacity-20"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "text-lg font-bold text-white mb-4"
  }, "Performance by Mode"), /*#__PURE__*/React.createElement("div", {
    className: "space-y-3"
  }, Object.entries(quizStats.byMode).map(([mode, data]) => {
    const accuracy = data.total > 0 ? Math.round(data.correct / data.total * 100) : 0;
    return /*#__PURE__*/React.createElement("div", {
      key: mode,
      className: "flex items-center gap-4"
    }, /*#__PURE__*/React.createElement("span", {
      className: "text-white w-24 capitalize"
    }, mode), /*#__PURE__*/React.createElement("div", {
      className: "flex-1"
    }, /*#__PURE__*/React.createElement(ProgressBar, {
      progress: accuracy,
      color: "bg-blue-500",
      height: "h-2"
    })), /*#__PURE__*/React.createElement("span", {
      className: "text-white font-bold w-16 text-right"
    }, accuracy, "%"));
  })))));
};

// ===========================
// ONBOARDING SCREEN
// ===========================

/**
 * Onboarding Tutorial Component
 */
const OnboardingScreen = ({
  onComplete,
  onSkip
}) => {
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
  return /*#__PURE__*/React.createElement("div", {
    className: "min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4",
    role: "region",
    "aria-label": `Onboarding step ${currentStep + 1} of ${steps.length}`
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-full max-w-lg"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex justify-center gap-2 mb-8",
    role: "progressbar",
    "aria-valuenow": currentStep + 1,
    "aria-valuemin": 1,
    "aria-valuemax": steps.length,
    "aria-label": `Step ${currentStep + 1} of ${steps.length}`
  }, steps.map((_, index) => /*#__PURE__*/React.createElement("div", {
    key: index,
    "aria-hidden": "true",
    className: `w-2 h-2 rounded-full transition-all ${index === currentStep ? 'w-8 bg-blue-400' : index < currentStep ? 'bg-blue-400' : 'bg-white bg-opacity-30'}`
  }))), /*#__PURE__*/React.createElement("div", {
    className: "bg-white bg-opacity-10 backdrop-blur-xl rounded-2xl p-8 border border-white border-opacity-20 text-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-7xl mb-6 animate-bounce-in",
    key: currentStep
  }, step.icon), /*#__PURE__*/React.createElement("h2", {
    className: "text-2xl font-bold text-white mb-4"
  }, step.title), /*#__PURE__*/React.createElement("p", {
    className: "text-white text-opacity-80 mb-8"
  }, step.description), /*#__PURE__*/React.createElement("div", {
    className: "flex gap-4"
  }, currentStep > 0 && /*#__PURE__*/React.createElement("button", {
    onClick: handleBack,
    className: "flex-1 py-3 bg-white bg-opacity-10 rounded-xl text-white font-semibold hover:bg-opacity-20 transition-all"
  }, "Back"), /*#__PURE__*/React.createElement("button", {
    onClick: handleNext,
    className: "flex-1 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl text-white font-semibold hover:scale-105 active:scale-95 transition-all"
  }, currentStep === steps.length - 1 ? "Let's Go!" : 'Next')), currentStep < steps.length - 1 && /*#__PURE__*/React.createElement("button", {
    onClick: handleSkip,
    "aria-label": "Skip onboarding tutorial",
    className: "mt-4 text-white text-opacity-75 hover:text-opacity-100 text-sm"
  }, "Skip tutorial"))));
};

// Expose to window for global access
window.HomeScreen = HomeScreen;
window.QuizScreen = QuizScreen;
window.FlashcardScreen = FlashcardScreen;
window.SettingsScreen = SettingsScreen;
window.QuizHistoryScreen = QuizHistoryScreen;
window.OnboardingScreen = OnboardingScreen;
