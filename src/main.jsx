import React from 'react'
import ReactDOM from 'react-dom/client'

// Sync system dark-mode preference with the .dark class on <html>
const applyTheme = (dark) => document.documentElement.classList.toggle('dark', dark);
const mq = window.matchMedia('(prefers-color-scheme: dark)');
applyTheme(mq.matches);
mq.addEventListener('change', (e) => applyTheme(e.matches));
import App from '@/App.jsx'
import '@/index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <App />
)