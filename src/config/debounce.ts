export const DEBOUNCE_TIMING = {
  INSTANT: 150, // Near-instant feedback, e.g. button clicks, resize events
  FAST: 300, // Quick search/autocomplete (lightweight API)
  DEFAULT: 400, // General-purpose search (good balance for most cases)
  SLOW: 600, // Heavy API calls, rate-limited requests
  VERY_SLOW: 1000, // Background tasks, analytics, non-urgent actions
};
