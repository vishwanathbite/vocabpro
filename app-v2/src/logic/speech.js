/**
 * Speech
 * Literary Rides VocabPro - Modular Architecture
 *
 * Text-to-speech helpers extracted verbatim from js/utils.js:104-137. No
 * module-level state — both functions talk to window.speechSynthesis directly,
 * so they are coupled only through the browser's global speech queue.
 *
 * NO LONGER A LEAF. It imported nothing until the Settings screen; it now
 * imports SettingsManager to gate speakWord on `speechEnabled`, which until then
 * was stored by both trees and honoured by neither — js/ declares the setting
 * and its own speak() never checks it either.
 *
 * THE GATE IS INSIDE speakWord, not at the call sites. There are three of them
 * today (QuizScreen's Pronounce button, its `p` keyboard shortcut, and
 * FlashcardScreen), and a fourth would be one more place to forget. This mirrors
 * SoundManager, which checks its own `enabled` inside play() rather than asking
 * every caller to.
 *
 * No cycle: settings.js imports storage, sound and dailygoals, none of which
 * import this.
 */

import { SettingsManager } from './settings.js';

/**
 * Text-to-speech function
 * Speaks the given text with US English pronunciation at slower rate
 * @param {string} text - Text to speak
 * @returns {boolean} - True if speech started, false if not supported
 */
export const speakWord = (text) => {
  if (!('speechSynthesis' in window)) {
    return false;
  }

  /* THE SETTING, honoured for the first time. Read per call rather than cached:
     loadState is memoized so this is a property lookup, and caching it here
     would need an invalidation path from the Settings screen for no gain.

     Returns false — the same value an unsupported browser gets — because to
     every caller the outcome is identical: nothing was spoken. */
  if (!SettingsManager.get('speechEnabled')) {
    return false;
  }

  try {
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.8;  // Slower rate for clarity
    utterance.lang = 'en-US';

    window.speechSynthesis.speak(utterance);
    return true;
  } catch (error) {
    return false;
  }
};

/**
 * Stop any ongoing speech
 */
export const stopSpeech = () => {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
};
