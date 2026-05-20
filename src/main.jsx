import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import ReactGA from 'react-ga4'

// Initialize Google Analytics
const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID

if (GA_MEASUREMENT_ID) {
  ReactGA.initialize(GA_MEASUREMENT_ID)
  ReactGA.send('pageview')
  console.log('✅ Google Analytics initialized with ID:', GA_MEASUREMENT_ID)
} else {
  console.log('⚠️ Google Analytics not initialized — VITE_GA_MEASUREMENT_ID not found in .env')
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)