import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { LanguageProvider } from './services/i18n/i18nService'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <LanguageProvider>
      <App />
    </LanguageProvider>
    </BrowserRouter>
  </StrictMode>,
)
