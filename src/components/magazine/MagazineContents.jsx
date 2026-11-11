import { Kicker, PageFooter, PageHeader } from './MagazinePrimitives'

export default function MagazineContents({
  entries = [],
  onGoto,
  pageNumber,
  yearReviewPage = 3,
}) {
  return (
    <>
      <PageHeader section="Contents" />

      <div className="mt-3 flex min-h-0 flex-1 flex-col">
        <div className="flex items-end justify-between gap-2 border-b-2 border-[var(--mag-ink)] pb-1">
          <h2 className="mag-display text-[27px] uppercase leading-none tracking-[-0.03em]">
            Contents
          </h2>
          <Kicker className="text-right">Vol. 01 · Issue 01</Kicker>
        </div>

        <div className="mt-2 grid min-h-0 flex-1 grid-flow-col grid-rows-11 gap-x-3 overflow-hidden">
          {entries.map((entry, index) => (
            <button
              key={entry.id}
              type="button"
              onClick={() => onGoto(entry.pageIndex)}
              className="group flex min-w-0 items-baseline gap-1.5 border-b border-[var(--mag-line)] py-0.5 text-left transition-colors hover:bg-[var(--mag-blue-soft)]"
              aria-label={`Go to ${entry.title} on page ${entry.pageIndex + 1}`}
            >
              <span className="mag-mono w-4 shrink-0 text-[6.5px] font-bold tabular-nums">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className="mag-display min-w-0 flex-1 truncate text-[8.5px] uppercase leading-tight group-hover:text-[var(--mag-blue)]">
                {entry.title}
              </span>
              <span className="mag-mono shrink-0 text-[6.5px] font-bold tabular-nums text-[var(--mag-ink-soft)]">
                {String(entry.pageIndex + 1).padStart(2, '0')}
              </span>
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => onGoto(yearReviewPage)}
          className="group mt-1.5 flex min-w-0 shrink-0 items-baseline gap-1.5 border-y border-[var(--mag-ink)] bg-[var(--mag-paper-deep)] px-1 py-1 text-left transition-colors hover:bg-[var(--mag-yellow)]"
          aria-label={`Go to the Year in Review on page ${yearReviewPage + 1}`}
        >
          <span className="mag-mono w-4 shrink-0 text-[6.5px] font-bold tabular-nums">
            ★
          </span>
          <span className="mag-display min-w-0 flex-1 truncate text-[8.5px] uppercase leading-tight group-hover:text-[var(--mag-ink)]">
            The Year in Review
          </span>
          <span className="mag-mono shrink-0 text-[6.5px] font-bold tabular-nums text-[var(--mag-ink-soft)]">
            {String(yearReviewPage + 1).padStart(2, '0')}
          </span>
        </button>

        <div className="mt-2 flex items-center justify-between gap-2 border-t border-[var(--mag-line)] pt-1.5">
          <p className="mag-mono text-[6px] font-bold uppercase tracking-[0.14em] text-[var(--mag-ink-soft)]">
            Tap any entry to open that spread
          </p>
          <p className="mag-mono text-[6px] font-bold uppercase tracking-[0.14em] text-[var(--mag-ink-soft)]">
            {entries.length} stories
          </p>
        </div>
      </div>

      <PageFooter page={pageNumber} />
    </>
  )
}
