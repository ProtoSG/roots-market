import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { ErrorBoundary } from 'react-error-boundary'
import { AuthProvider } from './context/auth.context.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <ErrorBoundary fallbackRender={({error}) => <div>Error: {error.message}</div>}>
        <AuthProvider>
          <BrowserRouter>
            <Suspense fallback={<div>Loading...</div>}>
                <App />
            </Suspense>
          </BrowserRouter>
        </AuthProvider>
      </ErrorBoundary>
  </StrictMode>,
)
