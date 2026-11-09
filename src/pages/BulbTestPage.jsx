import { lazy, Suspense } from 'react'

/* ─────────────────────────────────────────────
   TEMPORARY test page for the 3D bulb (/bulb-test).
   Not linked from the navbar. Delete this file and its route in App.jsx
   once the bulb is moved onto the home page.
   ───────────────────────────────────────────── */

// Lazy-loaded so Three.js downloads as a separate file, only when this page opens
const BulbScene = lazy(() => import('../components/BulbScene'))

export default function BulbTestPage() {
  return (
    <div style={{ position: 'relative', minHeight: 'calc(100vh - 71px)' }}>
      <Suspense fallback={null}>
        <BulbScene autoRotate />
      </Suspense>

      <p
        style={{
          position: 'relative',
          zIndex: 1,
          margin: 0,
          padding: '16px 24px',
          fontSize: 12,
          fontWeight: 700,
          letterSpacing: 2,
          textTransform: 'uppercase',
          color: 'var(--text-muted)',
        }}
      >
        Bulb test · temporary page
      </p>
    </div>
  )
}
