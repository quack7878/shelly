import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { registerSW } from 'virtual:pwa-register'
import './index.css'
import "./i18n"
import App from './App.jsx'

registerSW({
  immediate: true,
  onRegisteredSW(swUrl, registration) {
    console.log('Shelly service worker registered:', swUrl)

    if (registration) {
      setInterval(() => {
        registration.update()
      }, 60 * 1000)
    }
  },
  onOfflineReady() {
    console.log('Shelly is ready to work offline')
  },
  onNeedRefresh() {
    console.log('Shelly update available')
    window.location.reload()
  },
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
