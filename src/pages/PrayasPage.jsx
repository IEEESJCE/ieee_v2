import { useEffect } from 'react'
import PrayasSection from '../components/PrayasSection'

/* ─────────────────────────────────────────────
   Prayas page (/prayas) — the Prayas section, moved off the home page.
   Opened from the PRAYAS button next to the theme toggle in the navbar.
   ───────────────────────────────────────────── */
export default function PrayasPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return <PrayasSection />
}
