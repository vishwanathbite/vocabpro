import React, { useState, useEffect } from 'react';
import { BookOpen, Trophy, Target, Volume2, Star, Flame, Zap, Brain, MessageSquare, List, CheckCircle, XCircle, Calendar, Users, Medal, Save, User, Phone, Settings, Award, Share2, MessageCircle, X, Home, BarChart3, Gift, Crown, Sparkles, Copy, UserPlus, Lock, Mail, Youtube, Instagram, Globe } from 'lucide-react';

// Comprehensive Databases with Difficulty Levels
const vocabularyDB = {
  easy: [
    { word: "Abolish", definition: "To formally put an end to a system or practice", pronunciation: "uh-BOL-ish", synonyms: ["eliminate", "eradicate", "terminate", "annul"], antonyms: ["establish", "create", "institute", "found"], example: "The government decided to abolish the outdated tax system.", exam: "UPSC/SSC" },
    { word: "Abundant", definition: "Existing in large quantities", pronunciation: "uh-BUN-duhnt", synonyms: ["plentiful", "ample", "copious", "profuse"], antonyms: ["scarce", "sparse", "insufficient", "meager"], example: "The monsoon brings abundant rainfall to Western Ghats.", exam: "SSC/Banking" },
    { word: "Accurate", definition: "Correct in all details", pronunciation: "AK-yuh-ruht", synonyms: ["precise", "exact", "correct", "faithful"], antonyms: ["inaccurate", "incorrect", "erroneous", "imprecise"], example: "Census requires accurate data for planning.", exam: "Banking/SSC" }
  ],
  medium: [
    { word: "Benevolent", definition: "Well meaning and kindly", pronunciation: "buh-NEV-uh-luhnt", synonyms: ["kind", "compassionate", "caring", "generous"], antonyms: ["malevolent", "cruel", "mean", "unkind"], example: "The benevolent donor funded scholarships.", exam: "SSC/Banking" },
    { word: "Candid", definition: "Truthful and straightforward", pronunciation: "KAN-did", synonyms: ["honest", "frank", "open", "sincere"], antonyms: ["dishonest", "deceptive", "insincere", "evasive"], example: "The minister gave a candid interview.", exam: "UPSC/SSC" }
  ],
  hard: [
    { word: "Eloquent", definition: "Fluent or persuasive in speaking", pronunciation: "EL-uh-kwuhnt", synonyms: ["articulate", "fluent", "persuasive", "expressive"], antonyms: ["inarticulate", "hesitant", "tongue-tied", "awkward"], example: "The lawyer's eloquent argument convinced the jury.", exam: "UPSC/Banking" }
  ]
};

const acronymsDB = [
  { acronym: "ISRO", full: "Indian Space Research Organisation", distractors: ["Indian Science Research Organization", "International Space Research Organization", "Indian Space Resources Organization"], category: "Government" },
  { acronym: "RBI", full: "Reserve Bank of India", distractors: ["Revenue Board of India", "Regional Bank of India", "Reserve Banking Institute"], category: "Banking" },
  { acronym: "UPSC", full: "Union Public Service Commission", distractors: ["United Public Service Committee", "Union Personnel Service Commission", "Universal Public Service Commission"], category: "Government" }
];

const oneWordSubstitutesDB = [
  { phrase: "One who loves books", answer: "Bibliophile", distractors: ["Bibliographer", "Librarian", "Bookworm"] },
  { phrase: "A government by the wealthy", answer: "Plutocracy", distractors: ["Democracy", "Aristocracy", "Oligarchy"] }
];

const achievementsList = [
  { id: 'first_word', name: 'First Step', desc: 'Answer your first question', icon: '🎯', requirement: 1, type: 'questions' },
  { id: 'streak_5', name: 'On Fire!', desc: 'Get 5 correct in a row', icon: '🔥', requirement: 5, type: 'streak' },
  { id: 'points_100', name: 'Century', desc: 'Score 100 points', icon: '💯', requirement: 100, type: 'points' },
  { id: 'first_referral', name: 'Influencer', desc: 'Refer your first friend', icon: '👥', requirement: 1, type: 'referrals' }
];

const securityQuestions = [
  "What was your first school's name?",
  "What is your mother's maiden name?",
  "What city were you born in?",
  "What was your childhood nickname?"
];

const generateReferralCode = (name) => {
  return name.substring(0, 3).toUpperCase() + Math.random().toString(36).substring(2, 6).toUpperCase();
};

const LiteraryRidesVocabPro = () => {
  const [screen, setScreen] = useState('home');
  const [mode, setMode] = useState(null);
  const [difficulty, setDifficulty] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [totalPoints, setTotalPoints] = useState(0);
  const [level, setLevel] = useState(1);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [totalAnswered, setTotalAnswered] = useState(0);
  
  // Auth State
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('signin'); // 'signin', 'signup', 'forgot'
  const [users, setUsers] = useState({}); // Stored users {mobile: {password, profile, data}}
  
  // User Profile
  const [userProfile, setUserProfile] = useState({
    firstName: '',
    lastName: '',
    mobile: '',
    email: '',
    password: '',
    securityQuestion: '',
    securityAnswer: ''
  });
  
  // Forgot Password
  const [forgotMobile, setForgotMobile] = useState('');
  const [forgotAnswer, setForgotAnswer] = useState('');
  
  const [showSignupReminder, setShowSignupReminder] = useState(false);
  const [showDifficultyModal, setShowDifficultyModal] = useState(false);
  const [selectedMode, setSelectedMode] = useState(null);
  
  // Referral System
  const [referralCode, setReferralCode] = useState('');
  const [referredBy, setReferredBy] = useState('');
  const [referralCount, setReferralCount] = useState(0);
  const [showReferralModal, setShowReferralModal] = useState(false);
  
  // Achievements
  const [unlockedAchievements, setUnlockedAchievements] = useState([]);
  const [showAchievementPopup, setShowAchievementPopup] = useState(null);
  const [dailyChallengesCompleted, setDailyChallengesCompleted] = useState(0);
  
  // UI State
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackText, setFeedbackText] = useState('');
  const [dailyChallengeCompleted, setDailyChallengeCompleted] = useState(false);
  const [dailyStreak, setDailyStreak] = useState(0);
  const [dailyChallengeScore, setDailyChallengeScore] = useState(0);
  
  const [progress, setProgress] = useState({
    vocabCompleted: 0,
    synonymsCompleted: 0,
    antonymsCompleted: 0,
    oneWordCompleted: 0,
    acronymsCompleted: 0
  });

  // Load users from localStorage
  useEffect(() => {
    const savedUsers = localStorage.getItem('vocabProUsers');
    if (savedUsers) {
      setUsers(JSON.parse(savedUsers));
    }
  }, []);

  // Check signup reminder
  useEffect(() => {
    if (!isSignedIn && (totalAnswered >= 5 || totalPoints >= 50)) {
      setShowSignupReminder(true);
    }
  }, [totalAnswered, totalPoints, isSignedIn]);

  useEffect(() => {
    setLevel(Math.floor(totalPoints / 100) + 1);
  }, [totalPoints]);

  const handleSignIn = (mobile, password) => {
    if (users[mobile] && users[mobile].password === password) {
      setIsSignedIn(true);
      setUserProfile(users[mobile].profile);
      setTotalPoints(users[mobile].data.totalPoints || 0);
      setStreak(users[mobile].data.streak || 0);
      setProgress(users[mobile].data.progress || progress);
      setReferralCode(users[mobile].data.referralCode || '');
      setReferralCount(users[mobile].data.referralCount || 0);
      setUnlockedAchievements(users[mobile].data.unlockedAchievements || []);
      setShowAuthModal(false);
      alert('✅ Welcome back!');
    } else {
      alert('❌ Invalid mobile number or password');
    }
  };

  const handleSignUp = (profile) => {
    if (users[profile.mobile]) {
      alert('❌ Mobile number already registered. Please sign in.');
      return;
    }
    
    const newReferralCode = generateReferralCode(profile.firstName + profile.lastName);
    const newUser = {
      password: profile.password,
      profile: profile,
      data: {
        totalPoints: totalPoints + 50, // Signup bonus
        streak: streak,
        progress: progress,
        referralCode: newReferralCode,
        referralCount: 0,
        unlockedAchievements: [],
        dailyChallengesCompleted: 0
      }
    };
    
    const updatedUsers = { ...users, [profile.mobile]: newUser };
    setUsers(updatedUsers);
    localStorage.setItem('vocabProUsers', JSON.stringify(updatedUsers));
    
    setIsSignedIn(true);
    setUserProfile(profile);
    setReferralCode(newReferralCode);
    setTotalPoints(totalPoints + 50);
    setShowAuthModal(false);
    setShowSignupReminder(false);
    alert('🎉 Welcome! You got +50 bonus points!');
  };

  const handleForgotPassword = () => {
    if (users[forgotMobile] && users[forgotMobile].profile.securityAnswer.toLowerCase() === forgotAnswer.toLowerCase()) {
      alert(`✅ Your password is: ${users[forgotMobile].password}`);
      setAuthMode('signin');
      setForgotMobile('');
      setForgotAnswer('');
    } else {
      alert('❌ Invalid mobile number or security answer');
    }
  };

  const saveProgress = () => {
    if (isSignedIn && userProfile.mobile) {
      const updatedUser = {
        ...users[userProfile.mobile],
        data: {
          totalPoints,
          streak,
          progress,
          referralCode,
          referralCount,
          unlockedAchievements,
          dailyChallengesCompleted,
          dailyStreak
        }
      };
      
      const updatedUsers = { ...users, [userProfile.mobile]: updatedUser };
      setUsers(updatedUsers);
      localStorage.setItem('vocabProUsers', JSON.stringify(updatedUsers));
      alert('✅ Progress Saved!\n\n📊 All your data is safe!');
    } else {
      alert('⚠️ Please sign in to save progress');
    }
  };

  const selectDifficulty = (level) => {
    setDifficulty(level);
    setMode(selectedMode);
    setScreen('quiz');
    setCurrentIndex(0);
    setScore(0);
    setShowResult(false);
    setShowDifficultyModal(false);
  };

  const startQuiz = (quizMode) => {
    setSelectedMode(quizMode);
    if (quizMode === 'vocab' || quizMode === 'synonym' || quizMode === 'antonym') {
      setShowDifficultyModal(true);
    } else {
      setMode(quizMode);
      setScreen('quiz');
      setCurrentIndex(0);
      setScore(0);
      setShowResult(false);
    }
  };

  const speakWord = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.8;
    window.speechSynthesis.speak(utterance);
  };

  const handleAnswer = (answer, correctAnswer) => {
    const correct = answer === correctAnswer;
    setIsCorrect(correct);
    setShowResult(true);
    setTotalAnswered(totalAnswered + 1);
    
    if (correct) {
      const points = difficulty === 'hard' ? 20 : difficulty === 'medium' ? 15 : 10;
      setScore(score + points);
      setTotalPoints(totalPoints + points);
      setStreak(streak + 1);

      if (mode === 'vocab') setProgress(p => ({ ...p, vocabCompleted: p.vocabCompleted + 1 }));
      if (mode === 'synonym') setProgress(p => ({ ...p, synonymsCompleted: p.synonymsCompleted + 1 }));
      if (mode === 'antonym') setProgress(p => ({ ...p, antonymsCompleted: p.antonymsCompleted + 1 }));
    } else {
      setStreak(0);
    }
  };

  const nextQuestion = () => {
    const words = difficulty ? vocabularyDB[difficulty] : vocabularyDB.easy;
    const maxIndex = words.length - 1;
    
    if (currentIndex < maxIndex) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
    setShowResult(false);
  };

  const shareReferral = () => {
    const text = `🎓 Join Literary Rides VocabPro!\n\n📚 FREE vocabulary app for competitive exams\n🎁 Use my code: ${referralCode}\n💯 Get 100 bonus points!\n\nBy Dr. Vishwanath Bite\n\n${window.location.href}?ref=${referralCode}`;
    
    if (navigator.share) {
      navigator.share({ title: 'Literary Rides VocabPro', text: text });
    } else {
      navigator.clipboard.writeText(text);
      alert('✅ Referral link copied!');
    }
  };

  // Home Screen
  const HomeScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 pb-32">
      {/* Beautiful Header with Logo */}
      <div className="bg-gradient-to-r from-purple-700 via-blue-700 to-indigo-700 shadow-2xl">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex flex-col items-center justify-center mb-4">
            {/* Logo */}
            <div className="bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 w-20 h-20 rounded-3xl flex items-center justify-center shadow-2xl mb-4 transform hover:scale-110 transition-all">
              <BookOpen className="w-12 h-12 text-white" />
            </div>
            
            {/* Brand Name */}
            <div className="text-center">
              <h1 className="text-4xl font-black text-white mb-2 tracking-tight">
                Literary Rides
              </h1>
              <h2 className="text-2xl font-bold text-yellow-300 mb-2">
                VocabPro
              </h2>
              <p className="text-purple-200 text-sm font-medium">
                By Dr. Vishwanath Bite
              </p>
            </div>
          </div>

          {/* Auth Buttons */}
          <div className="flex justify-center space-x-3">
            {!isSignedIn ? (
              <>
                <button 
                  onClick={() => { setAuthMode('signin'); setShowAuthModal(true); }} 
                  className="bg-white text-purple-700 px-6 py-2 rounded-xl font-bold text-sm shadow-lg hover:bg-gray-100 transition-all"
                >
                  Sign In
                </button>
                <button 
                  onClick={() => { setAuthMode('signup'); setShowAuthModal(true); }} 
                  className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-2 rounded-xl font-bold text-sm shadow-lg animate-pulse"
                >
                  Sign Up FREE
                </button>
              </>
            ) : (
              <div className="flex items-center space-x-3">
                <div className="bg-white bg-opacity-20 backdrop-blur-xl rounded-xl px-4 py-2">
                  <p className="text-white font-bold text-sm">
                    Hi, {userProfile.firstName}! 👋
                  </p>
                </div>
                <button onClick={saveProgress} className="bg-green-500 text-white p-2 rounded-xl">
                  <Save className="w-5 h-5" />
                </button>
                <button onClick={() => setShowReferralModal(true)} className="bg-white bg-opacity-20 p-2 rounded-xl">
                  <Gift className="w-5 h-5 text-white" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto p-4">
        {/* Free Forever Badge */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-4 mb-4 shadow-xl text-center">
          <h3 className="text-white font-black text-xl mb-1">✨ 100% FREE ✨</h3>
          <p className="text-green-100 text-sm">This app is and will always be free</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-4 gap-2 mb-4">
          <div className="bg-white bg-opacity-10 backdrop-blur-xl rounded-xl p-3 text-center">
            <Trophy className="w-6 h-6 text-yellow-300 mx-auto mb-1" />
            <p className="text-white font-black text-lg">{totalPoints}</p>
            <p className="text-xs text-gray-300">Points</p>
          </div>
          <div className="bg-white bg-opacity-10 backdrop-blur-xl rounded-xl p-3 text-center">
            <Flame className="w-6 h-6 text-orange-400 mx-auto mb-1" />
            <p className="text-white font-black text-lg">{streak}</p>
            <p className="text-xs text-gray-300">Streak</p>
          </div>
          <div className="bg-white bg-opacity-10 backdrop-blur-xl rounded-xl p-3 text-center">
            <Crown className="w-6 h-6 text-purple-300 mx-auto mb-1" />
            <p className="text-white font-black text-lg">{level}</p>
            <p className="text-xs text-gray-300">Level</p>
          </div>
          <div className="bg-white bg-opacity-10 backdrop-blur-xl rounded-xl p-3 text-center">
            <UserPlus className="w-6 h-6 text-green-300 mx-auto mb-1" />
            <p className="text-white font-black text-lg">{referralCount}</p>
            <p className="text-xs text-gray-300">Referrals</p>
          </div>
        </div>

        {/* Practice Modes */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <button onClick={() => startQuiz('vocab')} className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-4 shadow-lg transform hover:scale-105 active:scale-95 transition-all">
            <Brain className="w-8 h-8 text-white mx-auto mb-2" />
            <p className="text-white font-black text-sm">Vocabulary</p>
            <p className="text-green-100 text-xs">3 Levels</p>
          </button>

          <button onClick={() => startQuiz('synonym')} className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl p-4 shadow-lg transform hover:scale-105 active:scale-95 transition-all">
            <MessageSquare className="w-8 h-8 text-white mx-auto mb-2" />
            <p className="text-white font-black text-sm">Synonyms</p>
            <p className="text-blue-100 text-xs">3 Levels</p>
          </button>

          <button onClick={() => startQuiz('antonym')} className="bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl p-4 shadow-lg transform hover:scale-105 active:scale-95 transition-all">
            <Target className="w-8 h-8 text-white mx-auto mb-2" />
            <p className="text-white font-black text-sm">Antonyms</p>
            <p className="text-orange-100 text-xs">3 Levels</p>
          </button>

          <button onClick={() => startQuiz('oneword')} className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl p-4 shadow-lg transform hover:scale-105 active:scale-95 transition-all">
            <List className="w-8 h-8 text-white mx-auto mb-2" />
            <p className="text-white font-black text-sm">One Word</p>
            <p className="text-purple-100 text-xs">Substitutes</p>
          </button>

          <button onClick={() => startQuiz('acronym')} className="bg-gradient-to-br from-yellow-500 to-amber-600 rounded-2xl p-4 shadow-lg col-span-2 transform hover:scale-105 active:scale-95 transition-all">
            <Award className="w-8 h-8 text-white mx-auto mb-2" />
            <p className="text-white font-black text-sm">Acronyms Quiz</p>
            <p className="text-yellow-100 text-xs">Government & Banking</p>
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-purple-800 via-blue-800 to-indigo-800 border-t-4 border-yellow-400 shadow-2xl">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="text-center mb-3">
            <p className="text-white font-bold text-sm mb-2">Connect with Literary Rides</p>
            <div className="flex justify-center space-x-4">
              <a href="https://youtube.com/@literaryrides" target="_blank" rel="noopener noreferrer" className="bg-red-600 p-3 rounded-full hover:bg-red-700 transition-all transform hover:scale-110">
                <Youtube className="w-5 h-5 text-white" />
              </a>
              <a href="https://instagram.com/literaryrides" target="_blank" rel="noopener noreferrer" className="bg-pink-600 p-3 rounded-full hover:bg-pink-700 transition-all transform hover:scale-110">
                <Instagram className="w-5 h-5 text-white" />
              </a>
              <a href="https://open.spotify.com/show/3lsJLi7SBqrsR65I1jqxAn?si=dfc20ae522e74424" target="_blank" rel="noopener noreferrer" className="bg-green-600 p-3 rounded-full hover:bg-green-700 transition-all transform hover:scale-110">
                <Globe className="w-5 h-5 text-white" />
              </a>
            </div>
          </div>
          <div className="text-center">
            <p className="text-purple-200 text-xs">
              © 2025 Literary Rides • Created by Dr. Vishwanath Bite
            </p>
            <p className="text-purple-300 text-xs mt-1">
              For Students, By Educator • Always Free
            </p>
          </div>
        </div>
      </div>

      {/* Auth Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 my-8">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-black text-gray-800">
                {authMode === 'signin' ? '🔐 Sign In' : authMode === 'signup' ? '🎉 Sign Up' : '🔑 Forgot Password'}
              </h3>
              <button onClick={() => setShowAuthModal(false)} className="p-2">
                <X className="w-6 h-6" />
              </button>
            </div>

            {authMode === 'signin' && (
              <div className="space-y-3">
                <input
                  type="tel"
                  placeholder="Mobile Number"
                  id="signin-mobile"
                  maxLength="10"
                  className="w-full p-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 outline-none"
                />
                <input
                  type="password"
                  placeholder="Password"
                  id="signin-password"
                  className="w-full p-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 outline-none"
                />
                <button
                  onClick={() => {
                    const mobile = document.getElementById('signin-mobile').value;
                    const password = document.getElementById('signin-password').value;
                    if (mobile && password) handleSignIn(mobile, password);
                    else alert('Please fill all fields');
                  }}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-black py-3 rounded-xl"
                >
                  Sign In
                </button>
                <div className="text-center space-y-2">
                  <button onClick={() => setAuthMode('forgot')} className="text-blue-600 text-sm font-bold">
                    Forgot Password?
                  </button>
                  <p className="text-gray-600 text-sm">
                    Don't have an account?{' '}
                    <button onClick={() => setAuthMode('signup')} className="text-purple-600 font-bold">
                      Sign Up
                    </button>
                  </p>
                </div>
              </div>
            )}

            {authMode === 'signup' && (
              <div className="space-y-3">
                <div className="bg-yellow-50 border-2 border-yellow-400 rounded-xl p-3 mb-4">
                  <p className="text-sm font-bold text-yellow-800">🎁 Get +50 points on signup!</p>
                </div>
                <input type="text" placeholder="First Name *" id="signup-firstname" className="w-full p-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 outline-none" />
                <input type="text" placeholder="Last Name *" id="signup-lastname" className="w-full p-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 outline-none" />
                <input type="tel" placeholder="Mobile Number (10 digits) *" id="signup-mobile" maxLength="10" className="w-full p-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 outline-none" />
                <input type="email" placeholder="Email (Optional)" id="signup-email" className="w-full p-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 outline-none" />
                <input type="password" placeholder="Create Password *" id="signup-password" className="w-full p-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 outline-none" />
                <select id="signup-question" className="w-full p-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 outline-none">
                  <option value="">Select Security Question *</option>
                  {securityQuestions.map((q, i) => <option key={i} value={q}>{q}</option>)}
                </select>
                <input type="text" placeholder="Security Answer *" id="signup-answer" className="w-full p-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 outline-none" />
                <input type="text" placeholder="Referral Code (Optional)" id="signup-referral" className="w-full p-3 border-2 border-green-300 rounded-xl focus:border-green-500 outline-none" />
                
                <button
                  onClick={() => {
                    const profile = {
                      firstName: document.getElementById('signup-firstname').value,
                      lastName: document.getElementById('signup-lastname').value,
                      mobile: document.getElementById('signup-mobile').value,
                      email: document.getElementById('signup-email').value,
                      password: document.getElementById('signup-password').value,
                      securityQuestion: document.getElementById('signup-question').value,
                      securityAnswer: document.getElementById('signup-answer').value
                    };
                    
                    if (profile.firstName && profile.lastName && profile.mobile.length === 10 && profile.password && profile.securityQuestion && profile.securityAnswer) {
                      handleSignUp(profile);
                    } else {
                      alert('Please fill all required fields');
                    }
                  }}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-black py-4 rounded-xl"
                >
                  Sign Up & Get +50 Points 🎁
                </button>
                
                <p className="text-center text-gray-600 text-sm">
                  Already have an account?{' '}
                  <button onClick={() => setAuthMode('signin')} className="text-purple-600 font-bold">
                    Sign In
                  </button>
                </p>
              </div>
            )}

            {authMode === 'forgot' && (
              <div className="space-y-3">
                <p className="text-sm text-gray-600 mb-4">Enter your mobile number and answer your security question</p>
                <input
                  type="tel"
                  placeholder="Mobile Number"
                  maxLength="10"
                  value={forgotMobile}
                  onChange={(e) => setForgotMobile(e.target.value)}
                  className="w-full p-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 outline-none"
                />
                {forgotMobile.length === 10 && users[forgotMobile] && (
                  <>
                    <div className="bg-blue-50 p-3 rounded-xl">
                      <p className="text-sm font-bold text-gray-700">Your Security Question:</p>
                      <p className="text-sm text-gray-600">{users[forgotMobile].profile.securityQuestion}</p>
                    </div>
                    <input
                      type="text"
                      placeholder="Your Answer"
                      value={forgotAnswer}
                      onChange={(e) => setForgotAnswer(e.target.value)}
                      className="w-full p-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 outline-none"
                    />
                  </>
                )}
                <button
                  onClick={handleForgotPassword}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-black py-3 rounded-xl"
                >
                  Recover Password
                </button>
                <button onClick={() => setAuthMode('signin')} className="w-full text-center text-purple-600 font-bold">
                  Back to Sign In
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Difficulty Selection Modal */}
      {showDifficultyModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6">
            <h3 className="text-2xl font-black text-gray-800 mb-2 text-center">Choose Difficulty</h3>
            <p className="text-gray-600 text-sm text-center mb-6">Select your challenge level</p>
            
            <div className="space-y-3">
              <button
                onClick={() => selectDifficulty('easy')}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl p-4 shadow-lg transform hover:scale-105 transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="text-left">
                    <p className="font-black text-lg">Easy</p>
                    <p className="text-sm text-green-100">Perfect for beginners • 10 pts</p>
                  </div>
                  <Zap className="w-8 h-8" />
                </div>
              </button>

              <button
                onClick={() => selectDifficulty('medium')}
                className="w-full bg-gradient-to-r from-yellow-500 to-orange-600 text-white rounded-2xl p-4 shadow-lg transform hover:scale-105 transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="text-left">
                    <p className="font-black text-lg">Medium</p>
                    <p className="text-sm text-yellow-100">Good challenge • 15 pts</p>
                  </div>
                  <Flame className="w-8 h-8" />
                </div>
              </button>

              <button
                onClick={() => selectDifficulty('hard')}
                className="w-full bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-2xl p-4 shadow-lg transform hover:scale-105 transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="text-left">
                    <p className="font-black text-lg">Hard</p>
                    <p className="text-sm text-red-100">Expert level • 20 pts</p>
                  </div>
                  <Crown className="w-8 h-8" />
                </div>
              </button>
            </div>

            <button
              onClick={() => setShowDifficultyModal(false)}
              className="w-full mt-4 bg-gray-200 text-gray-800 font-bold py-3 rounded-xl"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Referral Modal */}
      {showReferralModal && isSignedIn && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-black text-gray-800">🎁 Refer & Earn</h3>
              <button onClick={() => setShowReferralModal(false)}>
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="bg-gray-50 rounded-xl p-4 mb-4">
              <p className="font-bold text-gray-800 mb-2">Your Referral Code:</p>
              <div className="flex items-center justify-between bg-white p-3 rounded-lg border-2 border-purple-300">
                <p className="text-2xl font-black text-purple-600">{referralCode}</p>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(referralCode);
                    alert('✅ Code copied!');
                  }}
                  className="bg-purple-600 text-white p-2 rounded-lg"
                >
                  <Copy className="w-5 h-5" />
                </button>
              </div>
            </div>

            <button onClick={shareReferral} className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white font-black py-3 rounded-xl mb-2">
              <Share2 className="w-5 h-5 inline mr-2" />
              Share Code
            </button>

            <button onClick={() => setShowReferralModal(false)} className="w-full bg-gray-200 text-gray-800 font-bold py-3 rounded-xl">
              Close
            </button>
          </div>
        </div>
      )}

      {/* Signup Reminder */}
      {showSignupReminder && !isSignedIn && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6">
            <div className="text-center mb-4">
              <div className="text-6xl mb-3">🎉</div>
              <h3 className="text-2xl font-black text-gray-800 mb-2">Great Progress!</h3>
              <p className="text-gray-600">You've earned <span className="font-bold text-purple-600">{totalPoints} points</span></p>
            </div>
            
            <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-2xl p-4 mb-4">
              <p className="text-sm font-bold text-gray-800 mb-2">🎁 Sign up to unlock:</p>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>✅ Save progress permanently</li>
                <li>✅ Get +50 bonus points</li>
                <li>✅ Unlock referral rewards</li>
                <li>✅ Earn achievements</li>
              </ul>
            </div>

            <button
              onClick={() => {
                setShowSignupReminder(false);
                setAuthMode('signup');
                setShowAuthModal(true);
              }}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-black py-3 rounded-xl mb-2"
            >
              Sign Up & Get +50 Points
            </button>
            <button
              onClick={() => setShowSignupReminder(false)}
              className="w-full bg-gray-200 text-gray-800 font-bold py-3 rounded-xl"
            >
              Maybe Later
            </button>
          </div>
        </div>
      )}
    </div>
  );

  // Quiz Screen (simplified)
  const QuizScreen = () => {
    let question, options, correctAnswer, currentData;
    const words = difficulty ? vocabularyDB[difficulty] : vocabularyDB.easy;
    const word = words[currentIndex % words.length];
    currentData = word;
    
    if (mode === 'vocab') {
      question = `What does "${word.word}" mean?`;
      options = [word.definition];
      while (options.length < 4) {
        const randomWord = words[Math.floor(Math.random() * words.length)];
        if (!options.includes(randomWord.definition)) options.push(randomWord.definition);
      }
      options.sort(() => Math.random() - 0.5);
      correctAnswer = word.definition;
    } else if (mode === 'synonym') {
      question = `Choose a SYNONYM for "${word.word}"`;
      options = [...word.synonyms];
      correctAnswer = word.synonyms[0];
    } else if (mode === 'antonym') {
      question = `Choose an ANTONYM for "${word.word}"`;
      options = [...word.antonyms];
      correctAnswer = word.antonyms[0];
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-4">
        <div className="max-w-md mx-auto">
          <div className="flex justify-between items-center mb-3">
            <button onClick={() => setScreen('home')} className="bg-white bg-opacity-20 backdrop-blur-xl text-white px-4 py-2 rounded-xl font-bold">
              ← Back
            </button>
            <div className="flex items-center space-x-2">
              <div className="bg-white bg-opacity-20 backdrop-blur-xl px-3 py-2 rounded-xl">
                <p className="text-white font-black">{score}</p>
              </div>
              <div className="flex items-center bg-white bg-opacity-20 backdrop-blur-xl px-3 py-2 rounded-xl">
                <Flame className="w-4 h-4 text-orange-400 mr-1" />
                <p className="text-white font-black">{streak}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-2xl p-6">
            <div className="text-center mb-6">
              <div className="flex justify-center items-center space-x-2 mb-3">
                <h2 className="text-3xl font-black text-gray-800">{currentData.word}</h2>
                <button onClick={() => speakWord(currentData.word)} className="bg-blue-500 text-white p-2 rounded-full">
                  <Volume2 className="w-5 h-5" />
                </button>
              </div>
              <p className="text-lg font-bold text-gray-700">{question}</p>
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold mt-2 ${
                difficulty === 'hard' ? 'bg-red-100 text-red-700' :
                difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                'bg-green-100 text-green-700'
              }`}>
                {difficulty ? difficulty.toUpperCase() : 'EASY'}
              </span>
            </div>

            {!showResult && (
              <div className="space-y-3">
                {options.map((option, i) => (
                  <button key={i} onClick={() => handleAnswer(option, correctAnswer)} className="w-full text-left p-4 rounded-xl bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-gray-200 hover:border-blue-500 hover:shadow-lg transform hover:scale-105 active:scale-95 transition-all">
                    <p className="font-semibold text-gray-800">{option}</p>
                  </button>
                ))}
              </div>
            )}

            {showResult && (
              <div className={`p-5 rounded-2xl ${isCorrect ? 'bg-green-50 border-4 border-green-500' : 'bg-red-50 border-4 border-red-500'}`}>
                <div className="flex items-center justify-center mb-4">
                  {isCorrect ? <CheckCircle className="w-12 h-12 text-green-600" /> : <XCircle className="w-12 h-12 text-red-600" />}
                  <h3 className={`text-2xl font-black ml-3 ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                    {isCorrect ? 'Correct! 🎉' : 'Try Again!'}
                  </h3>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="bg-white rounded-xl p-3">
                    <p className="font-bold text-gray-700">Definition:</p>
                    <p className="text-gray-600">{currentData.definition}</p>
                  </div>
                  <div className="bg-white rounded-xl p-3">
                    <p className="font-bold text-gray-700">Example:</p>
                    <p className="text-gray-600 italic">{currentData.example}</p>
                  </div>
                </div>

                <button onClick={nextQuestion} className="w-full mt-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-black py-3 rounded-xl">
                  Next →
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="font-sans">
      {screen === 'home' && <HomeScreen />}
      {screen === 'quiz' && <QuizScreen />}
    </div>
  );
};

export default LiteraryRidesVocabPro;
