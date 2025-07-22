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
import { LoadingBackPage } from './LoadingBackPage.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary fallbackRender={({error}) => <ErrorBackPage error={error.message} />}>
      <Suspense fallback={<LoadingBackPage />}>
        <AuthProvider>
          <ProductProvider>
            <PublicArtisanProvider>
              <CategoryProvider>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
              </CategoryProvider>
            </PublicArtisanProvider>
          </ProductProvider>
        </AuthProvider>
      </Suspense>
    </ErrorBoundary>
  </StrictMode>,
)
