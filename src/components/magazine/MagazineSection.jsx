import { useCallback, useEffect, useRef, useState } from 'react'
import { ArrowRight, BookOpen, ChevronLeft, ChevronRight, X } from 'lucide-react'

import { MAGAZINE_META, MAGAZINE_SUMMARY } from '../../data/magazineEvents'
import MagazineBook from './MagazineBook'
import MagazineCover from './MagazineCover'
import { MAGAZINE_PLAN } from './magazinePlan'
import './magazine.css'

const INSTRUCTIONS = [
  'Open the magazine to explore the issue.',
  'Turn pages to discover events and memories.',
  'Use the navigation controls to move through the publication.',
]

const totalPages = MAGAZINE_PLAN.totalPages

const pad = (value) => String(value).padStart(2, '0')

export default function MagazineSection() {
  const [isOpen, setIsOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(0)
  const [orientation, setOrientation] = useState('landscape')

  const bookRef = useRef(null)
  const autoOpenRef = useRef(false)
  const openTimerRef = useRef(null)
  const pendingGotoRef = useRef(null)

  const handleFlip = useCallback((event) => {
    if (typeof event?.data === 'number') {
      setCurrentPage(event.data)
    }
    const instance = bookRef.current?.pageFlip()
    const nextOrientation = instance?.getOrientation?.()
    if (nextOrientation === 'portrait' || nextOrientation === 'landscape') {
      setOrientation(nextOrientation)
    }
  }, [])

  const handleOrientation = useCallback((event) => {
    if (event?.data === 'portrait' || event?.data === 'landscape') {
      setOrientation(event.data)
    }
  }, [])

  const tryAutoOpen = useCallback(() => {
    if (!autoOpenRef.current) return
    const instance = bookRef.current?.pageFlip()
    if (!instance) return
    autoOpenRef.current = false
    if (instance.getCurrentPageIndex() === 0) {
      instance.flipNext('bottom')
    }
  }, [])

  const handleInit = useCallback(
    (event) => {
      if (event?.data?.mode === 'portrait' || event?.data?.mode === 'landscape') {
        setOrientation(event.data.mode)
      }
      window.clearTimeout(openTimerRef.current)
      openTimerRef.current = window.setTimeout(tryAutoOpen, 280)
    },
    [tryAutoOpen]
  )

  const openMagazine = useCallback(() => {
    autoOpenRef.current = true
    setCurrentPage(0)
    setIsOpen(true)
  }, [])

  const closeMagazine = useCallback(() => {
    autoOpenRef.current = false
    window.clearTimeout(openTimerRef.current)
    setIsOpen(false)
    setCurrentPage(0)
  }, [])

  const flipPrev = useCallback(() => {
    const instance = bookRef.current?.pageFlip()
    if (!instance || instance.getCurrentPageIndex() <= 0) return
    instance.flipPrev('bottom')
  }, [])

  const flipNext = useCallback(() => {
    const instance = bookRef.current?.pageFlip()
    if (!instance || instance.getCurrentPageIndex() >= totalPages - 1) return
    instance.flipNext('bottom')
  }, [])

  const gotoPage = useCallback((pageIndex) => {
    const instance = bookRef.current?.pageFlip()
    if (!instance) return
    const target = Math.min(Math.max(Number(pageIndex) || 0, 0), MAGAZINE_PLAN.totalPages - 1)
    if (instance.getState() === 'flipping') {
      pendingGotoRef.current = target
      return
    }
    instance.turnToPage(target)
  }, [])

  const handleChangeState = useCallback((event) => {
    if (event?.data === 'read' && pendingGotoRef.current !== null) {
      const target = pendingGotoRef.current
      pendingGotoRef.current = null
      const instance = bookRef.current?.pageFlip()
      if (instance) instance.turnToPage(target)
    }
  }, [])

  useEffect(() => {
    if (!isOpen) {
      window.clearTimeout(openTimerRef.current)
      return undefined
    }

    const fallback = window.setTimeout(tryAutoOpen, 1100)
    return () => {
      window.clearTimeout(fallback)
      window.clearTimeout(openTimerRef.current)
    }
  }, [isOpen, tryAutoOpen])

  useEffect(() => {
    if (!isOpen) return undefined

    let resizeTimer

    const syncBookState = () => {
      const instance = bookRef.current?.pageFlip()
      if (!instance) return

      const nextOrientation = instance.getOrientation?.()
      if (nextOrientation === 'portrait' || nextOrientation === 'landscape') {
        setOrientation(nextOrientation)
      }

      const nextPage = instance.getCurrentPageIndex?.()
      if (typeof nextPage === 'number') {
        setCurrentPage(nextPage)
      }
    }

    const onResize = () => {
      window.clearTimeout(resizeTimer)
      resizeTimer = window.setTimeout(syncBookState, 120)
    }

    window.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('resize', onResize)
      window.clearTimeout(resizeTimer)
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return undefined

    const onKeyDown = (event) => {
      if (event.key === 'ArrowRight') {
        event.preventDefault()
        flipNext()
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault()
        flipPrev()
      } else if (event.key === 'Escape') {
        event.preventDefault()
        closeMagazine()
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [isOpen, flipNext, flipPrev, closeMagazine])

  const leftPage = currentPage + 1
  const rightPage = Math.min(currentPage + 2, totalPages)
  const pageLabel =
    currentPage === 0
      ? 'Cover'
      : orientation === 'portrait' || rightPage <= leftPage
        ? `Page ${pad(leftPage)} / ${totalPages}`
        : `Pages ${pad(leftPage)}–${pad(rightPage)} / ${totalPages}`

  const canGoPrev = currentPage > 0
  const canGoNext = currentPage < totalPages - 1

  return (
    <section
      id="events-section"
      className="magazine-scope relative overflow-hidden border-t border-[var(--border-color)] bg-[var(--bg)] px-4 py-6 sm:px-6 lg:px-8"
    >
      {/* quiet geometric backdrop that belongs to the existing theme */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -left-24 top-16 h-64 w-64 rounded-full border-[18px] border-[var(--accent)] opacity-[0.045]" />
        <div className="absolute -right-20 bottom-10 h-80 w-80 rotate-12 border-[18px] border-[var(--mag-yellow)] opacity-[0.05]" />
        <div className="absolute left-1/2 top-1/4 h-px w-48 -translate-x-1/2 bg-[var(--accent)] opacity-20" />
        <div className="absolute left-1/2 top-1/4 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-[var(--accent)] opacity-30" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-72px)] w-full max-w-[1440px] flex-col">
        <header className="shrink-0 text-center">
          <span className="mag-mono inline-flex items-center gap-2 border border-[var(--border-color)] bg-[var(--bg-card)] px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.28em] text-[var(--accent)] shadow-[3px_3px_0_var(--border-color)]">
            <img
              src="/logo.png"
              alt=""
              className="h-5 w-5 rounded-full border border-[var(--border-color)] bg-white object-contain"
            />
            Our Journey · The Chronicle
          </span>
          <h2 className="mag-display mt-3 text-[clamp(1.9rem,3.6vw,2.9rem)] uppercase leading-[0.95] tracking-[-0.02em] text-[var(--primary-strong)]">
            The <span className="text-[var(--accent)]">IEEE Chronicle</span>
          </h2>
          <p className="mx-auto mt-1.5 max-w-[520px] text-[12px] leading-relaxed text-[var(--text-muted)] sm:text-[13px]">
            {MAGAZINE_META.tagline} An editorial record of the events, people and
            ideas that shaped IEEE-SJCE.
          </p>
        </header>

        <div className="relative flex min-h-0 flex-1 items-center justify-center py-4">
          {!isOpen ? (
            <div className="grid w-full max-w-[1180px] items-center gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-12">
              <div className="order-2 lg:order-1">
                <IntroPanel onOpen={openMagazine} />
              </div>
              <div className="order-1 flex justify-center lg:order-2 lg:justify-end">
                <ClosedBook onOpen={openMagazine} />
              </div>
            </div>
          ) : (
            <div className="mag-open-enter flex w-full flex-col items-center overflow-x-hidden">
              <div className="flex w-full min-w-0 items-center justify-center overflow-x-hidden">
                <div className="mx-auto w-full min-w-0 max-w-[min(860px,calc((100svh_-_315px)*1.43))] max-md:max-w-[min(360px,calc((100svh_-_300px)*0.714))]">
                  <MagazineBook
                    ref={bookRef}
                    onGoto={gotoPage}
                    onFlip={handleFlip}
                    onInit={handleInit}
                    onChangeOrientation={handleOrientation}
                    onChangeState={handleChangeState}
                  />
                </div>
              </div>

              <div className="mt-2 w-full max-w-[min(860px,calc((100svh_-_315px)*1.43))] border-2 border-[var(--mag-ink)] bg-[var(--mag-paper)] px-2 py-1.5 text-[var(--mag-ink)] shadow-[4px_4px_0_rgba(17,17,17,0.2)] max-md:max-w-[min(370px,calc((100svh_-_320px)*0.714))]">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    <BookControl
                      onClick={flipPrev}
                      disabled={!canGoPrev}
                      label="Previous page"
                    >
                      <ChevronLeft size={14} />
                    </BookControl>
                    <BookControl
                      onClick={flipNext}
                      disabled={!canGoNext}
                      label="Next page"
                    >
                      <ChevronRight size={14} />
                    </BookControl>
                  </div>

                  <div className="mag-mono text-[8px] font-bold uppercase tracking-[0.14em]">
                    {pageLabel}
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => gotoPage(2)}
                      className="mag-mono inline-flex items-center gap-1 border border-[var(--mag-ink)] bg-[var(--mag-paper-deep)] px-2 py-1 text-[7px] font-bold uppercase tracking-[0.14em] transition-colors hover:bg-[var(--mag-yellow)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--mag-blue)]"
                    >
                      <BookOpen size={11} />
                      Contents
                    </button>
                    <button
                      type="button"
                      onClick={closeMagazine}
                      className="mag-mono inline-flex items-center gap-1 border border-[var(--mag-ink)] bg-[var(--mag-ink)] px-2 py-1 text-[7px] font-bold uppercase tracking-[0.14em] text-[var(--mag-paper)] transition-colors hover:bg-[var(--mag-blue)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--mag-blue)]"
                    >
                      <X size={11} />
                      Close
                    </button>
                  </div>
                </div>
              </div>

              <p className="mag-mono mt-2 text-[8px] uppercase tracking-[0.16em] text-[var(--text-muted)]">
                {orientation === 'portrait'
                  ? 'Swipe or tap the page edges to turn'
                  : 'Drag a page corner or use the arrows · Esc to close'}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

function IntroPanel({ onOpen }) {
  return (
    <div className="max-w-[560px]">
      <div className="inline-flex items-center gap-2 border-2 border-[var(--mag-ink)] bg-[var(--mag-yellow)] px-3 py-1.5 text-[var(--mag-ink)] shadow-[3px_3px_0_#111]">
        <img
          src="/logo.png"
          alt=""
          className="h-6 w-6 rounded-full border border-[var(--mag-ink)] bg-white object-contain"
        />
        <span className="mag-mono text-[8px] font-bold uppercase tracking-[0.2em]">
          IEEE-SJCE · Student Branch
        </span>
      </div>

      <p className="mag-mono mt-5 text-[9px] font-bold uppercase tracking-[0.3em] text-[var(--accent)]">
        A Year in Review
      </p>
      <h3 className="mag-display mt-2 text-[clamp(2rem,4.2vw,3.1rem)] uppercase leading-[1.2] tracking-[-0.03em] text-[var(--primary-strong)]">
        Stories Worth{' '}
        <span className="bg-[var(--mag-yellow)] px-1 text-[var(--mag-ink)]">
          Turning Pages
        </span>{' '}
        For.
      </h3>
      <p className="mt-4 max-w-[48ch] text-[13px] leading-relaxed text-[var(--text-muted)] sm:text-sm">
        The IEEE Chronicle documents the workshops, hackathons, talks, competitions
        and outreach moments of IEEE-SJCE — a year of ideas, preserved like a
        printed magazine.
      </p>

      <div className="mt-6 grid gap-2.5">
        {INSTRUCTIONS.map((instruction, index) => (
          <div
            key={instruction}
            className="flex items-start gap-3 border-l-2 border-[var(--border-color)] pl-3"
          >
            <span className="mag-mono mt-0.5 text-[9px] font-bold text-[var(--accent)]">
              {pad(index + 1)}
            </span>
            <p className="text-[12px] leading-snug text-[var(--primary)] sm:text-[13px]">
              {instruction}
            </p>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={onOpen}
        className="mag-display group mt-7 inline-flex items-center gap-2 border-2 border-[var(--mag-ink)] bg-[var(--mag-yellow)] px-5 py-3 text-[13px] uppercase tracking-[0.14em] text-[var(--mag-ink)] shadow-[5px_5px_0_#111] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[3px_3px_0_#111] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
      >
        Open Magazine
        <ArrowRight
          size={16}
          className="transition-transform group-hover:translate-x-0.5"
        />
      </button>

      <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 border-t border-[var(--border-color)] pt-3">
        <Stat value={MAGAZINE_SUMMARY.stories} label="Stories" />
        <Stat value={MAGAZINE_SUMMARY.years} label="Years" />
        <Stat value={MAGAZINE_SUMMARY.wings} label="Wings & chapters" />
        <Stat value={MAGAZINE_SUMMARY.features} label="Feature spreads" />
      </div>
    </div>
  )
}

function Stat({ value, label }) {
  return (
    <div>
      <div className="mag-display text-[20px] leading-none text-[var(--primary-strong)]">
        {value}
      </div>
      <div className="mag-mono mt-1 text-[7px] font-bold uppercase tracking-[0.16em] text-[var(--text-muted)]">
        {label}
      </div>
    </div>
  )
}

function ClosedBook({ onOpen }) {
  return (
    <div className="flex flex-col items-center gap-3 lg:items-end">
      <button
        type="button"
        onClick={onOpen}
        aria-label="Open The IEEE Chronicle magazine"
        className="mag-closed-book group block w-[min(78vw,300px)] text-left focus:outline-none focus-visible:ring-4 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--bg)] sm:w-[320px] lg:w-[345px]"
      >
        <div className="mag-closed-book-inner relative">
          <div className="absolute -left-3 bottom-2 top-2 w-3 rounded-l-sm border border-black bg-[#111]" />
          <div className="relative aspect-[400/560] overflow-hidden border-[3px] border-black shadow-[16px_18px_0_rgba(0,0,0,0.18)]">
            <MagazineCover />
          </div>
          <div className="absolute -right-2 bottom-2 top-2 w-2 border-y-2 border-r-2 border-black/60 bg-[var(--mag-paper-deep)]" />
          <div className="absolute -right-3 bottom-4 top-4 w-1 border-y border-r border-black/30 bg-[var(--mag-paper)]" />
        </div>
      </button>

      <div className="flex items-center gap-2">
        <span className="h-px w-8 bg-[var(--border-color)]" aria-hidden="true" />
        <span className="mag-mono text-[8px] font-bold uppercase tracking-[0.2em] text-[var(--text-muted)]">
          Click cover to open
        </span>
        <span className="h-px w-8 bg-[var(--border-color)]" aria-hidden="true" />
      </div>
    </div>
  )
}

function BookControl({ onClick, disabled, label, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className="inline-flex h-7 w-7 items-center justify-center border border-[var(--mag-ink)] bg-[var(--mag-paper-deep)] text-[var(--mag-ink)] transition-colors hover:bg-[var(--mag-yellow)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--mag-blue)] disabled:pointer-events-none disabled:opacity-30"
    >
      {children}
    </button>
  )
}
