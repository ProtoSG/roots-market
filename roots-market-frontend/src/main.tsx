import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { ErrorBoundary } from 'react-error-boundary'
import { AuthProvider } from './context/auth.provider.tsx'
import ErrorBackPage from './ErrorBackPage.tsx'
import { ProductProvider } from './context/product.provider.tsx'
import { CategoryProvider } from './context/category.provider.tsx'
import { PublicArtisanProvider } from './context/publicArtisan.provider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary fallbackRender={({error}) => <ErrorBackPage error={error.message} />}>
      <AuthProvider>
        <ProductProvider>
          <PublicArtisanProvider>
            <CategoryProvider>
              <BrowserRouter>
                <Suspense fallback={<div>Loading...</div>}>
                  <App />
                </Suspense>
              </BrowserRouter>
            </CategoryProvider>
          </PublicArtisanProvider>
        </ProductProvider>
      </AuthProvider>
    </ErrorBoundary>
  </StrictMode>,
)
