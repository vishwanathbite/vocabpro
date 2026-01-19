/**
 * UI Components
 * Literary Rides VocabPro - Modular Architecture
 * Reusable React components for cards, buttons, modals, etc.
 */

const { useState, useEffect, useRef, createContext, useContext, useCallback, Component } = React;

// ===========================
// ERROR BOUNDARY COMPONENT
// ===========================

/**
 * Error Boundary - catches JavaScript errors in child components
 * Must be a class component as per React requirements
 */
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Error caught by boundary - could be logged to an error reporting service
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    // Optionally reload the page
    if (this.props.onReset) {
      this.props.onReset();
    }
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
          <div className="bg-white bg-opacity-10 backdrop-blur-xl rounded-2xl p-8 border border-white border-opacity-20 max-w-md text-center">
            <div className="text-6xl mb-4">😅</div>
            <h2 className="text-2xl font-bold text-white mb-2">Oops! Something went wrong</h2>
            <p className="text-white text-opacity-70 mb-6">
              We encountered an unexpected error. Don't worry, your progress is saved!
            </p>
            <div className="space-y-3">
              <button
                onClick={this.handleReset}
                className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold hover:scale-105 active:scale-95 transition-all"
              >
                Try Again
              </button>
              <button
                onClick={() => window.location.reload()}
                className="w-full px-6 py-3 bg-white bg-opacity-20 border-2 border-white border-opacity-40 text-white rounded-xl font-semibold hover:bg-opacity-30 transition-all"
              >
                Reload App
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// ===========================
// TOAST NOTIFICATION SYSTEM
// ===========================

/**
 * Toast Context for global toast management
 */
const ToastContext = createContext(null);

/**
 * Toast Provider Component
 */
const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'info', duration = 3000) => {
    const id = Date.now() + Math.random();
    const toast = { id, message, type, duration };
    setToasts(prev => [...prev, toast]);

    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }

    return id;
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const success = useCallback((message, duration) => addToast(message, 'success', duration), [addToast]);
  const error = useCallback((message, duration) => addToast(message, 'error', duration), [addToast]);
  const warning = useCallback((message, duration) => addToast(message, 'warning', duration), [addToast]);
  const info = useCallback((message, duration) => addToast(message, 'info', duration), [addToast]);

  return (
    <ToastContext.Provider value={{ addToast, removeToast, success, error, warning, info }}>
      {children}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </ToastContext.Provider>
  );
};

/**
 * Hook to use toast notifications
 */
const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

/**
 * Toast Container - renders all active toasts
 */
const ToastContainer = ({ toasts, onRemove }) => {
  return (
    <div
      className="fixed top-4 right-4 z-[100] flex flex-col gap-2 max-w-sm w-full pointer-events-none"
      role="region"
      aria-label="Notifications"
      aria-live="polite"
    >
      {toasts.map(toast => (
        <Toast key={toast.id} toast={toast} onRemove={onRemove} />
      ))}
    </div>
  );
};

/**
 * Individual Toast Component
 */
const Toast = ({ toast, onRemove }) => {
  const [isExiting, setIsExiting] = useState(false);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => onRemove(toast.id), 300);
  };

  const getToastStyles = () => {
    switch (toast.type) {
      case 'success':
        return {
          bg: 'bg-green-500',
          border: 'border-green-400',
          icon: <Check width="20" height="20" />,
          iconBg: 'bg-green-600'
        };
      case 'error':
        return {
          bg: 'bg-red-500',
          border: 'border-red-400',
          icon: <X width="20" height="20" />,
          iconBg: 'bg-red-600'
        };
      case 'warning':
        return {
          bg: 'bg-yellow-500',
          border: 'border-yellow-400',
          icon: <Zap width="20" height="20" />,
          iconBg: 'bg-yellow-600'
        };
      default:
        return {
          bg: 'bg-blue-500',
          border: 'border-blue-400',
          icon: <BookOpen width="20" height="20" />,
          iconBg: 'bg-blue-600'
        };
    }
  };

  const styles = getToastStyles();

  return (
    <div
      className={`${styles.bg} ${styles.border} border-2 rounded-xl p-4 shadow-2xl backdrop-blur-xl
                  flex items-start gap-3 pointer-events-auto transform transition-all duration-300
                  ${isExiting ? 'opacity-0 translate-x-full' : 'opacity-100 translate-x-0 animate-slide-in'}`}
    >
      <div className={`${styles.iconBg} p-2 rounded-lg text-white flex-shrink-0`}>
        {styles.icon}
      </div>
      <div className="flex-1 text-white">
        <p className="font-medium text-sm">{toast.message}</p>
      </div>
      <button
        onClick={handleClose}
        className="text-white text-opacity-70 hover:text-opacity-100 flex-shrink-0"
      >
        <X width="16" height="16" />
      </button>
    </div>
  );
};

/**
 * Achievement Notification Component
 * Shows when user earns a new badge
 */
const AchievementNotification = ({ badge, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Animate in
    setTimeout(() => setIsVisible(true), 100);

    // Auto close after 4 seconds
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 500);
    }, 4000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black bg-opacity-70 backdrop-blur-sm
                    transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className={`bg-gradient-to-br from-yellow-600 via-amber-600 to-orange-600 rounded-2xl p-1
                      transform transition-all duration-500 ${isVisible ? 'scale-100' : 'scale-50'}`}>
        <div className="bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 rounded-xl p-8 text-center">
          {/* Confetti effect */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  backgroundColor: ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96E6A1'][i % 5],
                  animation: `confetti ${1 + Math.random()}s ease-out forwards`,
                  animationDelay: `${Math.random() * 0.5}s`
                }}
              />
            ))}
          </div>

          <div className="relative">
            <div className="text-8xl mb-4 animate-bounce-in">{badge.icon}</div>
            <h2 className="text-2xl font-bold text-white mb-2">Achievement Unlocked!</h2>
            <h3 className="text-xl font-bold text-yellow-400 mb-2">{badge.name}</h3>
            <p className="text-white text-opacity-80 mb-6">{badge.description}</p>

            <button
              onClick={() => {
                setIsVisible(false);
                setTimeout(onClose, 500);
              }}
              className="px-8 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-xl
                        font-bold hover:scale-105 active:scale-95 transition-transform"
            >
              Awesome!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * Level Up Notification Component
 */
const LevelUpNotification = ({ levelInfo, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100);

    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 500);
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black bg-opacity-70 backdrop-blur-sm
                    transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className={`transform transition-all duration-700 ${isVisible ? 'scale-100 rotate-0' : 'scale-0 rotate-180'}`}>
        <div className="bg-gradient-to-br from-purple-600 via-pink-600 to-red-600 rounded-full p-2 animate-pulse-glow">
          <div className="bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 rounded-full p-12 text-center">
            <div className="text-8xl mb-4">{levelInfo.badge}</div>
            <h2 className="text-3xl font-bold text-white mb-2">LEVEL UP!</h2>
            <div className={`text-2xl font-bold ${levelInfo.color.replace('bg-', 'text-')} mb-2`}>
              Level {levelInfo.level}
            </div>
            <h3 className="text-xl font-bold text-yellow-400 mb-4">{levelInfo.name}</h3>

            <button
              onClick={() => {
                setIsVisible(false);
                setTimeout(onClose, 500);
              }}
              className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl
                        font-bold hover:scale-105 active:scale-95 transition-transform"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * Streak Milestone Notification
 */
const StreakMilestone = ({ streak, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-[100] animate-bounce-in">
      <div className="bg-gradient-to-r from-orange-500 to-red-500 px-6 py-3 rounded-full shadow-2xl
                    flex items-center gap-3">
        <Flame width="28" height="28" className="text-yellow-300" />
        <span className="text-white font-bold text-lg">{streak} Streak!</span>
        <span className="text-2xl">{getStreakEmoji(streak)}</span>
      </div>
    </div>
  );
};

/**
 * Loading Overlay Component
 */
const LoadingOverlay = ({ isVisible, message = 'Loading...' }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm">
      <div className="text-center">
        <div className="relative w-20 h-20 mx-auto mb-4">
          <div className="absolute inset-0 border-4 border-purple-500 border-opacity-30 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-transparent border-t-purple-500 rounded-full animate-spin"></div>
          <div className="absolute inset-2 border-4 border-transparent border-t-blue-500 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '0.8s' }}></div>
        </div>
        <p className="text-white text-lg font-medium animate-pulse">{message}</p>
      </div>
    </div>
  );
};

/**
 * Confirm Modal Component - replacement for window.confirm()
 */
const ConfirmModal = ({ isOpen, onClose, onConfirm, title, message, confirmText = 'Confirm', cancelText = 'Cancel', type = 'warning' }) => {
  if (!isOpen) return null;

  const getTypeStyles = () => {
    switch (type) {
      case 'danger':
        return { icon: '⚠️', color: 'from-red-600 to-pink-600' };
      case 'success':
        return { icon: '✅', color: 'from-green-600 to-emerald-600' };
      case 'warning':
        return { icon: '⚡', color: 'from-yellow-600 to-orange-600' };
      default:
        return { icon: '❓', color: 'from-blue-600 to-purple-600' };
    }
  };

  const styles = getTypeStyles();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm"
         onClick={onClose}>
      <div className={`bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 rounded-2xl p-6
                      shadow-2xl border border-white border-opacity-20 w-full max-w-md transform
                      transition-all duration-300 scale-100`}
           onClick={(e) => e.stopPropagation()}>
        <div className="text-center">
          <div className="text-5xl mb-4">{styles.icon}</div>
          <h2 className="text-xl font-bold text-white mb-2">{title}</h2>
          <p className="text-white text-opacity-80 mb-6">{message}</p>
          <div className="flex gap-3">
            <SecondaryButton onClick={onClose} className="flex-1">
              {cancelText}
            </SecondaryButton>
            <button
              onClick={() => { onConfirm(); onClose(); }}
              className={`flex-1 px-6 py-3 bg-gradient-to-r ${styles.color} text-white rounded-xl
                         font-semibold hover:scale-105 active:scale-95 shadow-lg`}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

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
const OptionButton = ({ children, onClick, isSelected, isCorrect, isIncorrect, disabled, optionIndex }) => {
  let bgColor = 'bg-white bg-opacity-10';
  let borderColor = 'border-white border-opacity-30';
  let hoverClass = 'hover:bg-opacity-20 hover:scale-105';
  let ariaLabel = `Option ${optionIndex !== undefined ? String.fromCharCode(65 + optionIndex) : ''}: ${children}`;

  if (isCorrect) {
    bgColor = 'bg-green-500 bg-opacity-30';
    borderColor = 'border-green-400';
    hoverClass = '';
    ariaLabel += ' (Correct answer)';
  } else if (isIncorrect) {
    bgColor = 'bg-red-500 bg-opacity-30';
    borderColor = 'border-red-400';
    hoverClass = '';
    ariaLabel += ' (Incorrect)';
  } else if (isSelected) {
    bgColor = 'bg-blue-500 bg-opacity-30';
    borderColor = 'border-blue-400';
    ariaLabel += ' (Selected)';
  }

  const handleClick = (e) => {
    e.preventDefault();
    if (!disabled && onClick) {
      onClick();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick(e);
    }
  };

  return (
    <div
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={disabled ? -1 : 0}
      aria-label={ariaLabel}
      aria-pressed={isSelected}
      aria-disabled={disabled}
      className={`w-full px-6 py-4 ${bgColor} backdrop-blur-xl border-2 ${borderColor}
                  text-white rounded-xl font-medium text-left ${hoverClass} active:scale-95
                  select-none ${disabled ? 'cursor-not-allowed opacity-70' : 'cursor-pointer'}
                  focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-transparent`}
      style={{ pointerEvents: 'auto' }}
    >
      {optionIndex !== undefined && (
        <span className="inline-block w-6 h-6 mr-3 rounded-full bg-white bg-opacity-20 text-center text-sm leading-6">
          {String.fromCharCode(65 + optionIndex)}
        </span>
      )}
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
const ProgressBar = ({ progress, color = 'bg-blue-500', height = 'h-2', label = 'Progress' }) => (
  <div
    className={`w-full ${height} bg-white bg-opacity-20 rounded-full overflow-hidden`}
    role="progressbar"
    aria-valuenow={Math.round(progress)}
    aria-valuemin="0"
    aria-valuemax="100"
    aria-label={label}
  >
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
  const [validationError, setValidationError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setValidationError('');

    // Basic validation
    if (isSignUp) {
      if (!formData.firstName || !formData.lastName || !formData.mobile || !formData.email || !formData.password) {
        setValidationError('Please fill all fields');
        return;
      }
      if (!isValidMobile(formData.mobile)) {
        setValidationError('Please enter a valid 10-digit mobile number');
        return;
      }
      if (!isValidEmail(formData.email)) {
        setValidationError('Please enter a valid email address');
        return;
      }
    } else {
      if (!formData.email || !formData.password) {
        setValidationError('Please enter email and password');
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
        {/* Validation Error */}
        {validationError && (
          <div className="bg-red-500 bg-opacity-20 border border-red-400 rounded-lg p-3 text-red-200 text-sm">
            {validationError}
          </div>
        )}
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
  const [isBookmarked, setIsBookmarked] = useState(false);

  // Check bookmark status on mount
  useEffect(() => {
    if (currentWord) {
      const wordId = currentWord.word || currentWord.acronym || currentWord.phrase;
      setIsBookmarked(BookmarksManager.isBookmarked(wordId));
    }
  }, [currentWord]);

  const handleBookmarkToggle = () => {
    if (currentWord) {
      const isNowBookmarked = BookmarksManager.toggleBookmark(currentWord, mode);
      setIsBookmarked(isNowBookmarked);
    }
  };

  return (
    <div className={`mt-6 p-6 rounded-xl backdrop-blur-xl border-2
                    ${isCorrect ? 'bg-green-500 bg-opacity-20 border-green-400' : 'bg-red-500 bg-opacity-20 border-red-400'}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
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
        {/* Bookmark Button */}
        <button
          onClick={handleBookmarkToggle}
          className={`p-3 rounded-full transition-all duration-300 ${
            isBookmarked
              ? 'bg-pink-500 bg-opacity-30 text-pink-400'
              : 'bg-white bg-opacity-10 text-white text-opacity-70 hover:text-pink-400'
          }`}
          title={isBookmarked ? 'Remove from bookmarks' : 'Add to bookmarks'}
        >
          {isBookmarked ? (
            <HeartFilled width="24" height="24" />
          ) : (
            <Heart width="24" height="24" />
          )}
        </button>
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
  const [copied, setCopied] = useState(false);
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
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      // Copy failed - could fall back to a different method
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
          <button
            onClick={copyToClipboard}
            className={`w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold
                        transition-all duration-300 ${copied
                          ? 'bg-green-500 text-white'
                          : 'bg-white bg-opacity-20 border-2 border-white border-opacity-40 text-white hover:bg-opacity-30'
                        }`}
          >
            {copied ? (
              <>
                <Check width="20" height="20" />
                <span>Copied!</span>
              </>
            ) : (
              <span>Copy Link</span>
            )}
          </button>
        </div>
      </div>
    </Modal>
  );
};

/**
 * Search Modal Component
 */
const SearchModal = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);
  const [selectedWord, setSelectedWord] = useState(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
    if (!isOpen) {
      setSearchQuery('');
      setResults([]);
      setSelectedWord(null);
    }
  }, [isOpen]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    setSelectedWord(null);

    if (query.length < 2) {
      setResults([]);
      return;
    }

    const searchLower = query.toLowerCase();
    const allWords = [
      ...vocabularyDB.easy.map(w => ({ ...w, type: 'vocab', difficulty: 'easy' })),
      ...vocabularyDB.medium.map(w => ({ ...w, type: 'vocab', difficulty: 'medium' })),
      ...vocabularyDB.hard.map(w => ({ ...w, type: 'vocab', difficulty: 'hard' })),
      ...acronymsDB.map(a => ({ ...a, type: 'acronym' })),
      ...oneWordDB.map(o => ({ ...o, type: 'oneword' }))
    ];

    const filtered = allWords.filter(item => {
      if (item.type === 'vocab') {
        return item.word.toLowerCase().includes(searchLower) ||
               item.definition.toLowerCase().includes(searchLower) ||
               (item.synonyms && item.synonyms.some(s => s.toLowerCase().includes(searchLower)));
      } else if (item.type === 'acronym') {
        return item.acronym.toLowerCase().includes(searchLower) ||
               item.full.toLowerCase().includes(searchLower);
      } else if (item.type === 'oneword') {
        return item.answer.toLowerCase().includes(searchLower) ||
               item.phrase.toLowerCase().includes(searchLower);
      }
      return false;
    }).slice(0, 20); // Limit to 20 results

    setResults(filtered);
  };

  const handleWordClick = (word) => {
    setSelectedWord(word);
  };

  const handleBookmark = (word) => {
    const type = word.type === 'vocab' ? 'vocab' : word.type;
    BookmarksManager.toggleBookmark(word, type);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black bg-opacity-50 backdrop-blur-sm"
         onClick={onClose}>
      <div className="bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 rounded-2xl shadow-2xl
                      border border-white border-opacity-20 w-full max-w-2xl max-h-[70vh] overflow-hidden"
           onClick={(e) => e.stopPropagation()}>
        {/* Search Header */}
        <div className="p-4 border-b border-white border-opacity-20">
          <div className="flex items-center gap-3 bg-white bg-opacity-10 rounded-xl px-4 py-3">
            <Search width="20" height="20" className="text-white text-opacity-50" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search words, definitions, synonyms..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="flex-1 bg-transparent text-white placeholder-white placeholder-opacity-50
                        focus:outline-none text-lg"
            />
            {searchQuery && (
              <button onClick={() => handleSearch('')} className="text-white text-opacity-50 hover:text-opacity-100">
                <X width="20" height="20" />
              </button>
            )}
          </div>
        </div>

        {/* Results */}
        <div className="overflow-y-auto max-h-[50vh]">
          {selectedWord ? (
            // Word Detail View
            <div className="p-6">
              <button
                onClick={() => setSelectedWord(null)}
                className="flex items-center gap-2 text-white text-opacity-70 hover:text-opacity-100 mb-4"
              >
                <ArrowLeft width="16" height="16" />
                <span>Back to results</span>
              </button>

              {selectedWord.type === 'vocab' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-bold text-white">{selectedWord.word}</h3>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => speakWord(selectedWord.word)}
                        className="p-2 bg-white bg-opacity-10 rounded-lg text-blue-400 hover:bg-opacity-20"
                      >
                        <Volume2 width="20" height="20" />
                      </button>
                      <button
                        onClick={() => handleBookmark(selectedWord)}
                        className={`p-2 rounded-lg ${
                          BookmarksManager.isBookmarked(selectedWord.word)
                            ? 'bg-pink-500 bg-opacity-30 text-pink-400'
                            : 'bg-white bg-opacity-10 text-white hover:text-pink-400'
                        }`}
                      >
                        {BookmarksManager.isBookmarked(selectedWord.word) ? (
                          <HeartFilled width="20" height="20" />
                        ) : (
                          <Heart width="20" height="20" />
                        )}
                      </button>
                    </div>
                  </div>
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold
                    ${selectedWord.difficulty === 'easy' ? 'bg-green-500 bg-opacity-30 text-green-300' :
                      selectedWord.difficulty === 'medium' ? 'bg-yellow-500 bg-opacity-30 text-yellow-300' :
                      'bg-red-500 bg-opacity-30 text-red-300'}`}>
                    {selectedWord.difficulty.toUpperCase()}
                  </span>
                  {selectedWord.pronunciation && (
                    <p className="text-white text-opacity-70 italic">{selectedWord.pronunciation}</p>
                  )}
                  <div className="space-y-2">
                    <p className="text-white"><span className="font-semibold">Definition:</span> {selectedWord.definition}</p>
                    {selectedWord.example && (
                      <p className="text-white text-opacity-80"><span className="font-semibold">Example:</span> {selectedWord.example}</p>
                    )}
                    {selectedWord.mnemonic && (
                      <p className="text-blue-300"><span className="font-semibold">Mnemonic:</span> {selectedWord.mnemonic}</p>
                    )}
                    {selectedWord.synonyms && selectedWord.synonyms.length > 0 && (
                      <p className="text-green-300"><span className="font-semibold">Synonyms:</span> {selectedWord.synonyms.join(', ')}</p>
                    )}
                    {selectedWord.antonyms && selectedWord.antonyms.length > 0 && (
                      <p className="text-red-300"><span className="font-semibold">Antonyms:</span> {selectedWord.antonyms.join(', ')}</p>
                    )}
                  </div>
                </div>
              )}

              {selectedWord.type === 'acronym' && (
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-white">{selectedWord.acronym}</h3>
                  <p className="text-white"><span className="font-semibold">Full Form:</span> {selectedWord.full}</p>
                  {selectedWord.category && (
                    <span className="inline-block px-3 py-1 bg-blue-500 bg-opacity-30 text-blue-300 rounded-full text-xs">
                      {selectedWord.category}
                    </span>
                  )}
                </div>
              )}

              {selectedWord.type === 'oneword' && (
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-white">{selectedWord.answer}</h3>
                  <p className="text-white"><span className="font-semibold">Phrase:</span> {selectedWord.phrase}</p>
                  {selectedWord.explanation && (
                    <p className="text-white text-opacity-80"><span className="font-semibold">Explanation:</span> {selectedWord.explanation}</p>
                  )}
                </div>
              )}
            </div>
          ) : (
            // Results List
            <>
              {results.length === 0 && searchQuery.length >= 2 && (
                <div className="p-8 text-center text-white text-opacity-70">
                  No results found for "{searchQuery}"
                </div>
              )}
              {results.length === 0 && searchQuery.length < 2 && (
                <div className="p-8 text-center text-white text-opacity-50">
                  <Search width="48" height="48" className="mx-auto mb-4 opacity-30" />
                  <p>Type at least 2 characters to search</p>
                  <p className="text-sm mt-2">Search through {getDatabaseStats().totalItems}+ words</p>
                </div>
              )}
              {results.map((item, index) => (
                <div
                  key={index}
                  onClick={() => handleWordClick(item)}
                  className="px-6 py-4 border-b border-white border-opacity-10 hover:bg-white hover:bg-opacity-5
                            cursor-pointer transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-white font-semibold">
                        {item.word || item.acronym || item.answer}
                      </span>
                      <span className={`ml-2 text-xs px-2 py-0.5 rounded-full
                        ${item.type === 'vocab' ? 'bg-purple-500 bg-opacity-30 text-purple-300' :
                          item.type === 'acronym' ? 'bg-blue-500 bg-opacity-30 text-blue-300' :
                          'bg-orange-500 bg-opacity-30 text-orange-300'}`}>
                        {item.type === 'vocab' ? item.difficulty : item.type}
                      </span>
                    </div>
                    <ChevronRight width="16" height="16" className="text-white text-opacity-50" />
                  </div>
                  <p className="text-white text-opacity-60 text-sm mt-1 line-clamp-1">
                    {item.definition || item.full || item.phrase}
                  </p>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

/**
 * Level badge display
 */
const LevelBadge = ({ level, totalPoints = 0 }) => {
  const levelInfo = getLevelInfo(totalPoints);
  return (
    <div className={`inline-flex items-center gap-2 px-4 py-2 ${levelInfo.color} rounded-full text-white font-bold shadow-lg`}>
      <span className="text-xl">{levelInfo.badge}</span>
      <span>{levelInfo.name}</span>
    </div>
  );
};

// Export note: In browser environment with Babel, these are automatically available globally
