import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '@/App.jsx'
import '@/index.css'
import { registerSW } from 'virtual:pwa-register'
// Sync system dark-mode preference with the .dark class on <html>
const applyTheme = (dark) => document.documentElement.classList.toggle('dark', dark);
const mq = window.matchMedia('(prefers-color-scheme: dark)');
applyTheme(mq.matches);
mq.addEventListener('change', (e) => applyTheme(e.matches));

ReactDOM.createRoot(document.getElementById('root')).render(
  <App />
)

const updateSW = registerSW({
  onNeedRefresh() {
    if (confirm('Une nouvelle version est disponible. Recharger ?')) {
      updateSW(true)
    }
  },
  onOfflineReady() {
    console.log('App prête à fonctionner hors-ligne 🎉')
  },
})
