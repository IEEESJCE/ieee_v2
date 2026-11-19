import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import ErrorBoundary from './components/ErrorBoundary.jsx'
import SeoManager from './components/SeoManager.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'

function lazyWithRetry(componentImport) {
  return lazy(async () => {
    const pageHasBeenForceRefreshed = window.sessionStorage.getItem('page-retry-refreshed')
    try {
      const module = await componentImport()
      window.sessionStorage.removeItem('page-retry-refreshed')
      return module
    } catch (error) {
      if (!pageHasBeenForceRefreshed) {
        window.sessionStorage.setItem('page-retry-refreshed', 'true')
        window.location.reload()
        return new Promise(() => {})
      }
      throw error
    }
  })
}

const EntryPage = lazyWithRetry(() => import('./pages/EntryPage.jsx'))
const HomePage = lazyWithRetry(() => import('./pages/HomePage.jsx'))
const SocietiesPage = lazyWithRetry(() => import('./pages/SocietiesPage.jsx'))
const BoardsPage = lazyWithRetry(() => import('./pages/BoardsPage.jsx'))
const ContactPage = lazyWithRetry(() => import('./pages/ContactPage.jsx'))
const GalleryPage = lazyWithRetry(() => import('./pages/GalleryPage.jsx'))
const TeamPage = lazyWithRetry(() => import('./pages/TeamPage.jsx'))

function RouteFallback() {
  return (
    <div className="route-fallback" role="status" aria-live="polite">
      <img src="/logo.png" alt="" width="44" height="44" />
      <span>Loading…</span>
    </div>
  )
}

function App() {
  return (
    <ErrorBoundary>
      <SeoManager />
      <Suspense fallback={<RouteFallback />}>
        <Routes>
          <Route path="/" element={<EntryPage />} />
          <Route element={<Layout />}>
            <Route path="/home" element={<HomePage />} />
            <Route path="/societies" element={<SocietiesPage />} />
            <Route path="/boards" element={<BoardsPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/team" element={<TeamPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Suspense>
    </ErrorBoundary>
  )
}

export default App
