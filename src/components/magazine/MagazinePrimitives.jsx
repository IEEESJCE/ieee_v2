import { forwardRef, useLayoutEffect, useRef, useState } from 'react'

const cx = (...parts) => parts.filter(Boolean).join(' ')

// Event titles must break only between words. When a single word is wider
// than the column (e.g. "INAUGURATION" in a narrow side column), shrink the
// heading's type until the longest word fits instead of splitting the word.
export function FitHeading({ as: Tag = 'h2', className = '', text, children }) {
  const ref = useRef(null)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return undefined

    const fit = () => {
      if (!el.clientWidth) return // page hidden; refit when it is shown
      el.style.fontSize = ''
      let size = parseFloat(getComputedStyle(el).fontSize)
      const min = size * 0.55
      while (el.scrollWidth > el.clientWidth + 1 && size > min) {
        size -= 0.25
        el.style.fontSize = `${size}px`
      }
    }

    fit()
    document.fonts?.ready.then(fit)
    const observer = new ResizeObserver(fit)
    observer.observe(el)
    return () => observer.disconnect()
  }, [text])

  return (
    <Tag ref={ref} className={cx(className, '[overflow-wrap:normal] [hyphens:none]')}>
      {children}
    </Tag>
  )
}

export const BookPage = forwardRef(function BookPage(
  { children, side = 'left', padded = true, className = '' },
  ref
) {
  return (
    <div
      ref={ref}
      className={cx(
        'mag-paper relative h-full w-full overflow-hidden text-[var(--mag-ink)]',
        className
      )}
    >
      <div className="mag-grain pointer-events-none absolute inset-0 z-0" aria-hidden="true" />
      <div
        className={cx(
          'pointer-events-none absolute inset-y-0 z-10 w-5',
          side === 'left' ? 'right-0 mag-spine-left' : 'left-0 mag-spine-right'
        )}
        aria-hidden="true"
      />
      <div
        className={cx(
          'relative z-[1] flex h-full w-full flex-col',
          padded && 'px-4 py-3'
        )}
      >
        {children}
      </div>
    </div>
  )
})

export function PageHeader({ section = 'The Chronicle', className = '' }) {
  return (
    <header
      className={cx(
        'flex shrink-0 items-center justify-between gap-2 border-b-2 border-[var(--mag-ink)] pb-1.5',
        className
      )}
    >
      <span className="flex min-w-0 items-center gap-1.5">
        <img
          src="/logo.png"
          alt=""
          loading="lazy"
          className="h-4 w-4 shrink-0 rounded-full border border-[var(--mag-ink)] bg-white object-contain"
        />
        <span className="mag-mono truncate text-[6.5px] font-bold uppercase tracking-[0.18em]">
          The IEEE Chronicle
        </span>
      </span>
      <span className="mag-mono shrink-0 text-[6.5px] font-bold uppercase tracking-[0.18em]">
        {section}
      </span>
    </header>
  )
}

export function PageFooter({ page, className = '' }) {
  return (
    <footer
      className={cx(
        'mt-1.5 flex shrink-0 items-center justify-between gap-2 border-t border-[var(--mag-line)] pt-1.5',
        className
      )}
    >
      <span className="mag-mono text-[6px] font-bold uppercase tracking-[0.16em] text-[var(--mag-ink-soft)]">
        IEEE-SJCE
      </span>
      <span className="mag-mono flex items-center gap-1 text-[6px] font-bold uppercase tracking-[0.16em]">
        <span className="text-[var(--mag-ink-soft)]">Page</span>
        <span className="border border-[var(--mag-ink)] bg-[var(--mag-ink)] px-1.5 py-0.5 text-[7px] leading-none text-[var(--mag-paper)]">
          {String(page).padStart(2, '0')}
        </span>
      </span>
    </footer>
  )
}

export function EventTag({ children, className = '' }) {
  return (
    <span
      className={cx(
        'mag-mono inline-flex w-fit items-center whitespace-nowrap border border-[var(--mag-ink)] bg-[var(--mag-yellow)] px-1.5 py-0.5 text-[6.5px] font-bold uppercase tracking-[0.16em]',
        className
      )}
    >
      {children}
    </span>
  )
}

export function Kicker({ children, className = '' }) {
  return (
    <p
      className={cx(
        'mag-mono text-[6.5px] font-bold uppercase tracking-[0.2em] text-[var(--mag-ink-soft)]',
        className
      )}
    >
      {children}
    </p>
  )
}

export function MagazineImage({
  src,
  alt = '',
  className = '',
  imgClassName = '',
  loading = 'lazy',
}) {
  const [failed, setFailed] = useState(!src)

  return (
    <div
      className={cx(
        'relative h-full w-full overflow-hidden bg-[var(--mag-paper-deep)]',
        className
      )}
    >
      {failed ? (
        <div className="flex h-full w-full flex-col items-center justify-center gap-1 border border-dashed border-[var(--mag-line)] px-2 text-center">
          <span className="mag-mono text-[6px] font-bold uppercase tracking-[0.16em] text-[var(--mag-ink-soft)]">
            Image pending
          </span>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          loading={loading}
          decoding="async"
          onError={() => setFailed(true)}
          className={cx(
            'h-full w-full',
            !/\bobject-(contain|cover|fill|none|scale-down)\b/.test(imgClassName) && 'object-cover',
            imgClassName
          )}
        />
      )}
    </div>
  )
}

export function PosterFrame({
  src,
  alt,
  className = '',
  label = 'Event poster',
  imageClassName = '',
}) {
  return (
    <figure className={cx('relative min-h-0', className)}>
      <span
        className="mag-tape absolute -top-2 left-1/2 z-20 h-4 w-14 -translate-x-1/2 -rotate-2"
        aria-hidden="true"
      />
      <div className="relative h-full w-full overflow-hidden border-2 border-[var(--mag-ink)] bg-[var(--mag-paper-deep)] shadow-[5px_5px_0_rgba(17,17,17,0.18)]">
        <MagazineImage src={src} alt={alt} imgClassName={imageClassName} />
        <span className="mag-mono absolute bottom-1 left-1 z-20 border border-[var(--mag-ink)] bg-[var(--mag-paper)] px-1 py-0.5 text-[5.5px] font-bold uppercase tracking-[0.14em]">
          {label}
        </span>
      </div>
    </figure>
  )
}

export function PhotoPlate({
  src,
  alt = '',
  caption,
  className = '',
  innerClassName = '',
  rotate = '',
  tape = true,
  loading = 'lazy',
}) {
  return (
    <figure className={cx('relative flex min-h-0 flex-col', className)}>
      {tape && (
        <span
          className="mag-tape absolute -top-1.5 left-1/2 z-20 h-3.5 w-12 -translate-x-1/2 -rotate-2"
          aria-hidden="true"
        />
      )}
      <div
        className={cx(
          'relative min-h-0 flex-1 overflow-hidden border-2 border-[var(--mag-ink)] bg-[var(--mag-paper-deep)] shadow-[4px_4px_0_rgba(17,17,17,0.16)]',
          rotate,
          innerClassName
        )}
      >
        <MagazineImage src={src} alt={alt} loading={loading} />
      </div>
      {caption && (
        <figcaption className="mag-mono mt-0.5 shrink-0 truncate text-[5.5px] uppercase tracking-[0.12em] text-[var(--mag-ink-soft)]">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}

export function HighlightList({ items = [], limit = 3, className = '', itemClassName = 'text-[9px] leading-tight' }) {
  if (!items.length) return null
  return (
    <ul className={cx('space-y-0.5', className)}>
      {items.slice(0, limit).map((item) => (
        <li
          key={item}
          className={cx('flex items-start gap-1.5 text-[var(--mag-ink-soft)]', itemClassName)}
        >
          <span className="mt-1 h-1 w-1 shrink-0 bg-[var(--mag-blue)]" aria-hidden="true" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

export function StatStrip({ stats = [], className = '' }) {
  if (!stats.length) return null
  return (
    <div className={className}>
      <dl className="border-y border-[var(--mag-line)]">
        {stats.map((stat, index) => (
          <div
            key={stat.label}
            className={cx(
              'flex items-baseline justify-between gap-2 px-0.5 py-[3px]',
              index > 0 && 'border-t border-[var(--mag-line)]'
            )}
          >
            <dt className="mag-mono shrink-0 text-[5px] font-bold uppercase tracking-[0.12em] text-[var(--mag-ink-soft)]">
              {stat.label}
            </dt>
            <dd className="mag-display min-w-0 text-right text-[6.5px] uppercase leading-tight">
              {stat.value}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

export function StatBox({ value, label, accent = false, compact = false }) {
  return (
    <div
      className={cx(
        'border-2 border-[var(--mag-ink)]',
        compact ? 'px-1.5 py-1' : 'px-2 py-1.5',
        accent ? 'bg-[var(--mag-yellow)]' : 'bg-[var(--mag-paper-deep)]'
      )}
    >
      <div
        className={cx(
          'mag-display leading-none',
          compact ? 'text-[12px] sm:text-[15px]' : 'text-[16px] sm:text-[24px]'
        )}
      >
        {value}
      </div>
      <div
        className={cx(
          'mag-mono font-bold uppercase tracking-[0.14em]',
          compact ? 'mt-0.5 text-[5px]' : 'mt-1 text-[6px]'
        )}
      >
        {label}
      </div>
    </div>
  )
}

export function Rule({ className = '' }) {
  return <div className={cx('h-0.5 w-full bg-[var(--mag-ink)]', className)} />
}
