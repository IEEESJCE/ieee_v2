import { Routes, Route } from 'react-router-dom'
import EntryPage from './pages/EntryPage.jsx'
import HomePage from './pages/HomePage.jsx'
import SocietiesPage from './pages/SocietiesPage.jsx'
import BoardsPage from './pages/BoardsPage.jsx'
import ContactPage from './pages/ContactPage.jsx'
import GalleryPage from './pages/GalleryPage.jsx'
import TeamPage from './pages/TeamPage.jsx'
import Layout from './components/Layout.jsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<EntryPage />} />
      <Route element={<Layout />}>
        <Route path="/home" element={<HomePage />} />
        <Route path="/societies" element={<SocietiesPage />} />
        <Route path="/boards" element={<BoardsPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/team" element={<TeamPage />} />
      </Route>
    </Routes>
  )
}

export default App
