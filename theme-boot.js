/* Theme, stamped before the first paint.

   WHY A FILE. The Content-Security-Policy forbids inline scripts, and the app's
   own bundle is a module that runs only after the page is parsed — late enough
   for a student on Paper & Ink to see a navy frame first, or the reverse. A
   plain same-origin <script src> in <head> blocks parsing for the few
   milliseconds this takes, which is exactly the point, and script-src 'self'
   already allows it. It is precached with the rest of the app, so it works
   offline.

   READ-ONLY. It reads one field, settings.theme, from the saved progress and
   never writes anything; src/logic/storage.js remains the only writer of
   VOCABPRO_STATE_V1. The key below must match STORAGE_KEY there.

   THE SAME RULE AS src/logic/appearance.js resolveTheme: 'night' and 'paper'
   are themselves, anything else is "Match my phone", which is Navy Night when
   the phone is in dark mode and Paper & Ink otherwise. If storage is blocked
   or the saved data is unreadable it simply matches the phone; appearance.js
   re-applies the real setting before the app draws. */
(function () {
  var setting = 'system';
  try {
    var saved = JSON.parse(localStorage.getItem('VOCABPRO_STATE_V1'));
    var theme = saved && saved.settings && saved.settings.theme;
    if (theme === 'night' || theme === 'paper') setting = theme;
  } catch (e) {
    /* Unavailable or unreadable: match the phone. */
  }
  if (setting === 'system') {
    setting = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'night'
      : 'paper';
  }
  document.documentElement.setAttribute('data-theme', setting);
})();
