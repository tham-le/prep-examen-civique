// Runs before the app. Kept in a file so the page can forbid inline scripts.
if (localStorage.getItem('darkMode') === 'true') {
  document.documentElement.classList.add('dark');
}

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(err => console.log('SW registration failed:', err));
  });
}
