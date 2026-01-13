/**
 * UI Components
 * Literary Rides VocabPro - Modular Architecture
 * Reusable React components for cards, buttons, modals, etc.
 */

const { useState, useEffect, useRef } = React;

// ===========================
// BUTTON COMPONENTS
// ===========================

/**
 * Primary button with icon and hover effects
 */
const PrimaryButton = ({ children, onClick, icon: Icon, className = '', disabled = false, type = 'button' }) => {
  const handleClick = (e) => {
    if (type !== 'submit') {
      e.preventDefault();
    }
    if (!disabled && onClick) {
      onClick(e);
    }
  };

  return (
    <button
      type={type}
      onClick={handleClick}
      disabled={disabled}
      className={`flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600
                  text-white rounded-xl font-semibold hover:scale-105 active:scale-95 shadow-lg
                  disabled:opacity-50 disabled:cursor-not-allowed select-none ${className}`}
      style={{ pointerEvents: disabled ? 'none' : 'auto' }}
    >
      {Icon && <Icon width="20" height="20" className="pointer-events-none" />}
      <span className="pointer-events-none">{children}</span>
    </button>
  );
};

/**
 * Secondary button with outline style
 */
const SecondaryButton = ({ children, onClick, icon: Icon, className = '', disabled = false }) => {
  const handleClick = (e) => {
    e.preventDefault();
    if (!disabled && onClick) {
      onClick(e);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled}
      className={`flex items-center justify-center gap-2 px-6 py-3 bg-white bg-opacity-20
                  border-2 border-white border-opacity-40 text-white rounded-xl font-semibold
                  hover:bg-opacity-30 hover:scale-105 active:scale-95 backdrop-blur-xl
                  disabled:opacity-50 disabled:cursor-not-allowed select-none ${className}`}
      style={{ pointerEvents: disabled ? 'none' : 'auto' }}
    >
      {Icon && <Icon width="20" height="20" className="pointer-events-none" />}
      <span className="pointer-events-none">{children}</span>
    </button>
  );
};

/**
 * Quiz option button (for multiple choice)
 */
const OptionButton = ({ children, onClick, isSelected, isCorrect, isIncorrect, disabled }) => {
  let bgColor = 'bg-white bg-opacity-10';
  let borderColor = 'border-white border-opacity-30';
  let hoverClass = 'hover:bg-opacity-20 hover:scale-105';

  if (isCorrect) {
    bgColor = 'bg-green-500 bg-opacity-30';
    borderColor = 'border-green-400';
    hoverClass = '';
  } else if (isIncorrect) {
    bgColor = 'bg-red-500 bg-opacity-30';
    borderColor = 'border-red-400';
    hoverClass = '';
  } else if (isSelected) {
    bgColor = 'bg-blue-500 bg-opacity-30';
    borderColor = 'border-blue-400';
  }

  const handleClick = (e) => {
    e.preventDefault();
    if (!disabled && onClick) {
      onClick();
    }
  };

  return (
    <div
      onClick={handleClick}
      role="button"
      tabIndex={disabled ? -1 : 0}
      className={`w-full px-6 py-4 ${bgColor} backdrop-blur-xl border-2 ${borderColor}
                  text-white rounded-xl font-medium text-left ${hoverClass} active:scale-95
                  select-none ${disabled ? 'cursor-not-allowed opacity-70' : 'cursor-pointer'}`}
      style={{ pointerEvents: 'auto' }}
    >
      {children}
    </div>
  );
};

// ===========================
// CARD COMPONENTS
// ===========================

/**
 * Glass morphism card with stats
 */
const StatsCard = ({ icon: Icon, title, value, subtitle, color = 'text-white', iconColor = 'text-yellow-400' }) => (
  <div className="bg-white bg-opacity-10 backdrop-blur-xl rounded-xl p-6 shadow-xl border border-white border-opacity-20">
    <div className="flex items-start justify-between mb-3">
      <div>
        <p className="text-white text-opacity-70 text-sm mb-1">{title}</p>
        <p className={`text-3xl font-bold ${color}`}>{value}</p>
        {subtitle && <p className="text-white text-opacity-60 text-xs mt-1">{subtitle}</p>}
      </div>
      {Icon && (
        <div className={`p-3 bg-white bg-opacity-10 rounded-lg ${iconColor}`}>
          <Icon width="24" height="24" />
        </div>
      )}
    </div>
  </div>
);

/**
 * Quiz mode selection card
 */
const QuizModeCard = ({ icon: Icon, title, description, onClick, color = 'from-purple-600 to-blue-600', locked = false }) => {
  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!locked && onClick) {
      onClick();
    }
  };

  return (
    <div
      onClick={handleClick}
      role="button"
      tabIndex={locked ? -1 : 0}
      className={`relative bg-gradient-to-br ${color} rounded-xl p-6 shadow-xl
                  transform hover:scale-105 active:scale-95 text-left w-full
                  ${locked ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                  select-none`}
      style={{ pointerEvents: 'auto' }}
    >
      {locked && (
        <div className="absolute top-4 right-4">
          <Lock width="24" height="24" className="text-white" />
        </div>
      )}
      <div className="flex items-center gap-4 mb-3 pointer-events-none">
        {Icon && <Icon width="32" height="32" className="text-white" />}
        <h3 className="text-xl font-bold text-white">{title}</h3>
      </div>
      <p className="text-white text-opacity-90 text-sm pointer-events-none">{description}</p>
    </div>
  );
};

/**
 * Badge card for achievements
 */
const BadgeCard = ({ badge, earned = false }) => (
  <div className={`bg-white bg-opacity-10 backdrop-blur-xl rounded-lg p-4 text-center border-2
                   ${earned ? 'border-yellow-400' : 'border-white border-opacity-20'}
                   ${earned ? 'shadow-lg shadow-yellow-500/50' : ''}`}>
    <div className="text-4xl mb-2">{badge.icon}</div>
    <h4 className="text-white font-semibold text-sm mb-1">{badge.name}</h4>
    <p className="text-white text-opacity-60 text-xs">{badge.description}</p>
  </div>
);

/**
 * Progress bar component
 */
const ProgressBar = ({ progress, color = 'bg-blue-500', height = 'h-2' }) => (
  <div className={`w-full ${height} bg-white bg-opacity-20 rounded-full overflow-hidden`}>
    <div
      className={`${height} ${color} rounded-full transition-all duration-300`}
      style={{ width: `${Math.min(progress, 100)}%` }}
    />
  </div>
);

// ===========================
// MODAL COMPONENTS
// ===========================

/**
 * Base modal component with backdrop
 */
const Modal = ({ children, isOpen, onClose, title, maxWidth = 'max-w-md' }) => {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEsc);
      return () => window.removeEventListener('keydown', handleEsc);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm"
         onClick={onClose}>
      <div className={`bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 rounded-2xl p-6
                      shadow-2xl border border-white border-opacity-20 w-full ${maxWidth} max-h-[90vh] overflow-y-auto`}
           onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-white">{title}</h2>
          <button onClick={onClose} className="text-white hover:text-gray-300">
            <X width="24" height="24" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

/**
 * Difficulty selection modal
 */
const DifficultyModal = ({ isOpen, onClose, onSelect, mode }) => {
  const handleSelect = (difficulty) => (e) => {
    e.preventDefault();
    e.stopPropagation();
    onSelect(difficulty);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Select Difficulty">
      <div className="space-y-4">
        <div
          onClick={handleSelect('easy')}
          role="button"
          tabIndex={0}
          className="w-full p-4 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl text-white font-semibold
                     hover:scale-105 active:scale-95 cursor-pointer select-none"
          style={{ pointerEvents: 'auto' }}
        >
          <div className="text-lg pointer-events-none">🌱 Easy</div>
          <div className="text-sm text-white text-opacity-80 pointer-events-none">10 points per question</div>
        </div>
        <div
          onClick={handleSelect('medium')}
          role="button"
          tabIndex={0}
          className="w-full p-4 bg-gradient-to-r from-yellow-600 to-orange-600 rounded-xl text-white font-semibold
                     hover:scale-105 active:scale-95 cursor-pointer select-none"
          style={{ pointerEvents: 'auto' }}
        >
          <div className="text-lg pointer-events-none">⚡ Medium</div>
          <div className="text-sm text-white text-opacity-80 pointer-events-none">15 points per question</div>
        </div>
        <div
          onClick={handleSelect('hard')}
          role="button"
          tabIndex={0}
          className="w-full p-4 bg-gradient-to-r from-red-600 to-pink-600 rounded-xl text-white font-semibold
                     hover:scale-105 active:scale-95 cursor-pointer select-none"
          style={{ pointerEvents: 'auto' }}
        >
          <div className="text-lg pointer-events-none">🔥 Hard</div>
          <div className="text-sm text-white text-opacity-80 pointer-events-none">20 points per question</div>
        </div>
        <SecondaryButton onClick={onClose} className="w-full mt-4">
          Cancel
        </SecondaryButton>
      </div>
    </Modal>
  );
};

/**
 * Authentication Modal (Sign In / Sign Up)
 */
const AuthModal = ({ isOpen, onClose, onAuth }) => {
  const [isSignUp, setIsSignUp] = useState(true);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    mobile: '',
    email: '',
    password: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (isSignUp) {
      if (!formData.firstName || !formData.lastName || !formData.mobile || !formData.email || !formData.password) {
        alert('Please fill all fields');
        return;
      }
      if (!isValidMobile(formData.mobile)) {
        alert('Please enter a valid 10-digit mobile number');
        return;
      }
      if (!isValidEmail(formData.email)) {
        alert('Please enter a valid email address');
        return;
      }
    } else {
      if (!formData.email || !formData.password) {
        alert('Please enter email and password');
        return;
      }
    }

    onAuth(formData, isSignUp);
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={isSignUp ? 'Create Account' : 'Sign In'}>
      <form onSubmit={handleSubmit} className="space-y-4">
        {isSignUp && (
          <>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="First Name"
                value={formData.firstName}
                onChange={(e) => handleChange('firstName', e.target.value)}
                className="px-4 py-3 bg-white bg-opacity-10 border border-white border-opacity-30 rounded-lg text-white
                          placeholder-white placeholder-opacity-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={(e) => handleChange('lastName', e.target.value)}
                className="px-4 py-3 bg-white bg-opacity-10 border border-white border-opacity-30 rounded-lg text-white
                          placeholder-white placeholder-opacity-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <input
              type="tel"
              placeholder="Mobile (10 digits)"
              value={formData.mobile}
              onChange={(e) => handleChange('mobile', e.target.value)}
              maxLength="10"
              className="w-full px-4 py-3 bg-white bg-opacity-10 border border-white border-opacity-30 rounded-lg text-white
                        placeholder-white placeholder-opacity-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </>
        )}
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => handleChange('email', e.target.value)}
          className="w-full px-4 py-3 bg-white bg-opacity-10 border border-white border-opacity-30 rounded-lg text-white
                    placeholder-white placeholder-opacity-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) => handleChange('password', e.target.value)}
          className="w-full px-4 py-3 bg-white bg-opacity-10 border border-white border-opacity-30 rounded-lg text-white
                    placeholder-white placeholder-opacity-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <PrimaryButton type="submit" className="w-full">
          {isSignUp ? 'Sign Up' : 'Sign In'}
        </PrimaryButton>
        <button
          type="button"
          onClick={() => setIsSignUp(!isSignUp)}
          className="w-full text-white text-opacity-80 hover:text-opacity-100 text-sm"
        >
          {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
        </button>
      </form>
    </Modal>
  );
};

/**
 * Result feedback component (shows after answering)
 */
const ResultFeedback = ({ isCorrect, currentWord, mode }) => {
  return (
    <div className={`mt-6 p-6 rounded-xl backdrop-blur-xl border-2
                    ${isCorrect ? 'bg-green-500 bg-opacity-20 border-green-400' : 'bg-red-500 bg-opacity-20 border-red-400'}`}>
      <div className="flex items-center gap-3 mb-4">
        {isCorrect ? (
          <>
            <CheckCircle width="32" height="32" className="text-green-400" />
            <div>
              <h3 className="text-xl font-bold text-white">Correct!</h3>
              <p className="text-green-200 text-sm">Great job! Keep it up!</p>
            </div>
          </>
        ) : (
          <>
            <XCircle width="32" height="32" className="text-red-400" />
            <div>
              <h3 className="text-xl font-bold text-white">Incorrect</h3>
              <p className="text-red-200 text-sm">Don't worry, learn from it!</p>
            </div>
          </>
        )}
      </div>

      {/* Show word details for vocab/synonym/antonym modes */}
      {['vocab', 'synonym', 'antonym'].includes(mode) && currentWord && (
        <div className="space-y-2 text-white">
          <div>
            <span className="font-semibold">Word:</span> {currentWord.word}
            <button
              onClick={() => speakWord(currentWord.word)}
              className="ml-2 text-blue-300 hover:text-blue-100"
            >
              <Volume2 width="16" height="16" className="inline" />
            </button>
          </div>
          <div>
            <span className="font-semibold">Definition:</span> {currentWord.definition}
          </div>
          <div>
            <span className="font-semibold">Example:</span> {currentWord.example}
          </div>
          {currentWord.mnemonic && (
            <div>
              <span className="font-semibold">Mnemonic:</span> {currentWord.mnemonic}
            </div>
          )}
          {currentWord.usage && (
            <div>
              <span className="font-semibold">Usage:</span> {currentWord.usage}
            </div>
          )}
        </div>
      )}

      {/* Show explanation for oneword mode */}
      {mode === 'oneword' && currentWord && (
        <div className="text-white">
          <div>
            <span className="font-semibold">Phrase:</span> {currentWord.phrase}
          </div>
          <div>
            <span className="font-semibold">Answer:</span> {currentWord.answer}
          </div>
          {currentWord.explanation && (
            <div>
              <span className="font-semibold">Explanation:</span> {currentWord.explanation}
            </div>
          )}
        </div>
      )}

      {/* Show details for acronym mode */}
      {mode === 'acronym' && currentWord && (
        <div className="text-white">
          <div>
            <span className="font-semibold">Acronym:</span> {currentWord.acronym}
          </div>
          <div>
            <span className="font-semibold">Full Form:</span> {currentWord.full}
          </div>
          {currentWord.category && (
            <div>
              <span className="font-semibold">Category:</span> {currentWord.category}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

/**
 * Share/Referral Modal
 */
const ShareModal = ({ isOpen, onClose, referralCode, totalPoints }) => {
  const shareUrl = `${window.location.origin}${window.location.pathname}?ref=${referralCode}`;

  const handleShare = async () => {
    const shareData = {
      title: 'Literary Rides VocabPro',
      text: `Join me on VocabPro! I've earned ${totalPoints} points mastering vocabulary. Use my referral code: ${referralCode}`,
      url: shareUrl
    };
    await shareContent(shareData);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      alert('Referral link copied to clipboard!');
    } catch (error) {
      console.error('Copy failed:', error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Share & Earn Rewards">
      <div className="space-y-4">
        <div className="bg-white bg-opacity-10 backdrop-blur-xl rounded-lg p-4">
          <p className="text-white text-center mb-2">Your Referral Code</p>
          <p className="text-2xl font-bold text-yellow-400 text-center">{referralCode}</p>
        </div>
        <p className="text-white text-center text-sm">
          Share with friends and earn <span className="font-bold text-yellow-400">150 bonus points</span> for each referral!
        </p>
        <div className="space-y-3">
          <PrimaryButton onClick={handleShare} icon={Share2} className="w-full">
            Share Now
          </PrimaryButton>
          <SecondaryButton onClick={copyToClipboard} className="w-full">
            Copy Link
          </SecondaryButton>
        </div>
      </div>
    </Modal>
  );
};

/**
 * Level badge display
 */
const LevelBadge = ({ level }) => {
  const levelInfo = getLevelInfo(level * 100); // Approximate
  return (
    <div className={`inline-flex items-center gap-2 px-4 py-2 ${levelInfo.color} rounded-full text-white font-bold shadow-lg`}>
      <span className="text-xl">{levelInfo.badge}</span>
      <span>Level {level}</span>
    </div>
  );
};

// Export note: In browser environment with Babel, these are automatically available globally
