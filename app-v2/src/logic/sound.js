/**
 * Sound Manager
 * Literary Rides VocabPro - Modular Architecture
 *
 * Web Audio sound effects + the sound on/off flag. Extracted verbatim from
 * js/utils.js (SoundManager). Its only cross-file coupling is SettingsManager,
 * now imported from ./settings.js. This forms a circular import (settings.js
 * imports SoundManager back), which is load-safe because every reference on
 * both sides is runtime-only (inside methods), never dereferenced at module
 * top level.
 */

import { SettingsManager } from './settings.js';

export const SoundManager = {
  audioContext: null,
  enabled: true,
  _initialized: false,

  /**
   * Initialize audio context (must be called after user interaction)
   */
  init: () => {
    try {
      if (!SoundManager.audioContext) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (AudioContext) {
          SoundManager.audioContext = new AudioContext();
        }
      }
      // Resume suspended audio context (required after user interaction on some browsers)
      if (SoundManager.audioContext && SoundManager.audioContext.state === 'suspended') {
        SoundManager.audioContext.resume();
      }
      return SoundManager.audioContext;
    } catch (e) {
      console.warn('Failed to initialize audio context:', e);
      return null;
    }
  },

  /**
   * Load and apply saved sound settings.
   *
   * Reads the unified store, the same place the Settings screen writes to.
   * This used to read the legacy `vocabProSoundEnabled` key while the Settings
   * screen wrote only to state.settings.soundEnabled, so turning sound off in
   * Settings never survived a reload — and once migrateLegacyData deleted the
   * legacy key, boot silently fell back to the default of on.
   */
  loadSettings: () => {
    if (!SoundManager._initialized) {
      // Cycle completed: SettingsManager imported from ./settings.js (runtime-only use).
      SoundManager.enabled = SettingsManager.get('soundEnabled');
      SoundManager._initialized = true;
    }
    return SoundManager.enabled;
  },

  /**
   * Check if sound is enabled
   */
  isEnabled: () => {
    if (!SoundManager._initialized) {
      SoundManager.loadSettings();
    }
    return SoundManager.enabled;
  },

  /**
   * Toggle sound on/off.
   *
   * Writes through SettingsManager so the keyboard shortcut and the Settings
   * screen land in the same place; previously this wrote only the legacy key,
   * leaving the Settings checkbox showing the opposite of what was audible.
   */
  toggle: () => {
    SoundManager.enabled = !SoundManager.enabled;
    // Cycle completed: SettingsManager imported from ./settings.js (runtime-only use).
    SettingsManager.set('soundEnabled', SoundManager.enabled);
    return SoundManager.enabled;
  },

  /**
   * Play a tone
   */
  playTone: (frequency, duration, type = 'sine', volume = 0.3) => {
    if (!SoundManager.enabled) return;

    try {
      const ctx = SoundManager.init();
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      oscillator.frequency.value = frequency;
      oscillator.type = type;

      gainNode.gain.setValueAtTime(volume, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);

      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + duration);
    } catch (e) {
      // Sound playback failed silently
    }
  },

  /**
   * Play correct answer sound (happy ascending tones)
   */
  playCorrect: () => {
    if (!SoundManager.enabled) return;

    try {
      const ctx = SoundManager.init();

      // Play a pleasant ascending arpeggio
      [523.25, 659.25, 783.99].forEach((freq, i) => {
        setTimeout(() => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.frequency.value = freq;
          osc.type = 'sine';
          gain.gain.setValueAtTime(0.2, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
          osc.start();
          osc.stop(ctx.currentTime + 0.15);
        }, i * 80);
      });
    } catch (e) {
      // Sound playback failed silently
    }
  },

  /**
   * Play incorrect answer sound (descending tone)
   */
  playIncorrect: () => {
    if (!SoundManager.enabled) return;

    try {
      const ctx = SoundManager.init();

      // Play a short descending tone
      [349.23, 293.66].forEach((freq, i) => {
        setTimeout(() => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.frequency.value = freq;
          osc.type = 'triangle';
          gain.gain.setValueAtTime(0.15, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
          osc.start();
          osc.stop(ctx.currentTime + 0.2);
        }, i * 100);
      });
    } catch (e) {
      // Sound playback failed silently
    }
  },

  /**
   * Play level up sound (triumphant)
   */
  playLevelUp: () => {
    if (!SoundManager.enabled) return;

    try {
      const ctx = SoundManager.init();

      // Triumphant fanfare
      const notes = [523.25, 659.25, 783.99, 1046.50];
      notes.forEach((freq, i) => {
        setTimeout(() => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.frequency.value = freq;
          osc.type = 'sine';
          gain.gain.setValueAtTime(0.25, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
          osc.start();
          osc.stop(ctx.currentTime + 0.3);
        }, i * 120);
      });
    } catch (e) {
      // Sound playback failed silently
    }
  },

  /**
   * Play achievement sound
   */
  playAchievement: () => {
    if (!SoundManager.enabled) return;

    try {
      const ctx = SoundManager.init();

      // Magical achievement sound
      const notes = [659.25, 783.99, 987.77, 1174.66, 1318.51];
      notes.forEach((freq, i) => {
        setTimeout(() => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.frequency.value = freq;
          osc.type = 'sine';
          gain.gain.setValueAtTime(0.2, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.25);
          osc.start();
          osc.stop(ctx.currentTime + 0.25);
        }, i * 80);
      });
    } catch (e) {
      // Sound playback failed silently
    }
  },

  /**
   * Play click sound
   */
  playClick: () => {
    if (!SoundManager.enabled) return;
    SoundManager.playTone(800, 0.05, 'sine', 0.1);
  }
};
