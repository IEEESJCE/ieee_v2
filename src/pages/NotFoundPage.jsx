import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <main className="route-error">
      <img src="/logo.png" alt="" width="56" height="56" />
      <p className="route-error-eyebrow">Error 404</p>
      <h1>This page does not exist.</h1>
      <p>The link may be outdated, or the page may have moved.</p>
      <div className="route-error-actions">
        <Link to="/home">Go to homepage</Link>
      </div>
    </main>
  )
}
