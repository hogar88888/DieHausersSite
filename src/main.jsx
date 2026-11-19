import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { LanguageProvider } from './services/i18n/i18nService'
import { AuthProvider } from './components/AuthContext.jsx'
import { LoadingProvider } from './components/LoadingContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <LanguageProvider>
          <LoadingProvider>
            <AuthProvider>
              <App />
            </AuthProvider>
          </LoadingProvider>
      </LanguageProvider>
    </BrowserRouter>
  </StrictMode>,
)
