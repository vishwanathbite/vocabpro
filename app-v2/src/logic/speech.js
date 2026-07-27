/**
 * Speech
 * Literary Rides VocabPro - Modular Architecture
 *
 * Text-to-speech helpers extracted verbatim from js/utils.js:104-137.
 * Leaf module: the Web Speech API is the only ambient dependency, and there is
 * no module-level state — both functions talk to window.speechSynthesis
 * directly, so they are coupled only through the browser's global speech queue.
 * This module imports nothing.
 */

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
