import { Routes, Route } from 'react-router-dom'
import EntryPage from './pages/EntryPage.jsx'
import HomePage from './pages/HomePage.jsx'
import SocietiesPage from './pages/SocietiesPage.jsx'
import Layout from './components/Layout.jsx'

function App() {
  return (
    <Routes>
      {/* <Route path="/entry" element={<EntryPage />} /> */}
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/societies" element={<SocietiesPage />} />
      </Route>
    </Routes>
  )
}

export default App
