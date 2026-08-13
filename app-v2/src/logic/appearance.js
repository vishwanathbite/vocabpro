/**
 * Appearance settings, applied to the document.
 *
 * THE ONLY THING THAT TOUCHES <html>. Font size is a CSS variable scale defined
 * in index.css and selected by a `data-font-size` attribute on the root element;
 * this module is the one place that attribute is written, so there is no second
 * opinion about what the document is currently set to.
 *
 * WHY AN ATTRIBUTE AND NOT A CLASS. Tailwind v4 scans source text for class
 * names, and a class assembled at runtime would never be generated. The
 * attribute selector lives in the stylesheet, so nothing has to be scanned.
 *
 * NO React STATE HERE. The setting is document-level, applies to every screen at
 * once, and outlives any component — putting it in a provider would mean every
 * screen re-rendering for a change the browser applies by itself.
 */

import { SettingsManager } from './settings.js';

/** The three the stylesheet defines. `medium` is the default and the fallback. */
export const FONT_SIZES = ['small', 'medium', 'large'];

/**
 * Stamp a font size onto the document.
 *
 * `medium` REMOVES the attribute rather than setting it. The scale defaults to 1
 * on bare :root, so the default state is the absence of an override — which
 * keeps the DOM honest about what has been chosen, and means a stored value this
 * build does not recognise degrades to the default instead of selecting nothing.
 *
 * @param {string} size One of FONT_SIZES
 */
export const applyFontSize = (size) => {
  const root = document.documentElement;

  if (size === 'small' || size === 'large') {
    root.dataset.fontSize = size;
  } else {
    delete root.dataset.fontSize;
  }
};

/**
 * Read the stored appearance settings and apply them.
 *
 * CALLED BEFORE THE FIRST RENDER, from main.jsx. Applying it in a mount effect
 * would paint one frame at the default size and then reflow the whole app — the
 * flash is worst for the students most likely to have chosen `large`.
 *
 * Safe to call with no stored settings: SettingsManager.get falls back to its
 * own defaults, and applyFontSize treats anything unrecognised as `medium`.
 */
export const initAppearance = () => {
  applyFontSize(SettingsManager.get('fontSize'));
};
