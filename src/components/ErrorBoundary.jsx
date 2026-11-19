import { Component } from 'react'

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    if (import.meta.env.DEV) {
      console.error('Route rendering failed', error, errorInfo)
    }
  }

  render() {
    if (!this.state.hasError) {
      return this.props.children
    }

    return (
      <main className="route-error" role="alert">
        <img src="/logo.png" alt="" width="56" height="56" />
        <p className="route-error-eyebrow">Something went wrong</p>
        <h1>This page could not be loaded.</h1>
        <p>Please refresh the page or return to the homepage.</p>
        <div className="route-error-actions">
          <button type="button" onClick={() => window.location.reload()}>
            Refresh page
          </button>
          <a href="/home">Go to homepage</a>
        </div>
      </main>
    )
  }
}
