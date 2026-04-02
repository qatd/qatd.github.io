import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { ErrorBoundary } from 'react-error-boundary'
import { HashRouter } from 'react-router-dom'
import FallbackError from './components/fallbackComponents/FallbackError.tsx'
import { AppDataProvider } from './contexts/AppDataProvider.tsx'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ErrorBoundary fallback={<FallbackError/>}>
            <HashRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
                <AppDataProvider>
                    <App />
                </AppDataProvider>
            </HashRouter>
        </ErrorBoundary>
    </StrictMode>,
)
