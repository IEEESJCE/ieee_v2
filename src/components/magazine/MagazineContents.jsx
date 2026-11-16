import { ARCHIVE_PHOTOS, MAGAZINE_SUMMARY } from '../../data/magazineEvents'
import {
  Kicker,
  PageFooter,
  PageHeader,
  PhotoPlate,
  Rule,
  StatBox,
} from './MagazinePrimitives'

export function MagazineContentsIntro({ pageNumber }) {
  return (
    <>
      <PageHeader section="Contents" />

      <div className="mt-3 flex min-h-0 flex-1 flex-col">
        <Kicker>Issue at a glance</Kicker>
        <h2 className="mag-display mt-1.5 text-[28px] uppercase leading-[0.92] tracking-[-0.03em]">
          In This Issue
        </h2>
        <Rule className="mt-2 w-16" />

        <p className="mt-2 text-[9px] leading-[1.45] text-[var(--mag-ink-soft)]">
          {MAGAZINE_SUMMARY.stories} stories from across the chapter, gathered into
          one issue and arranged to be read spread by spread.
        </p>

        <div className="mt-2 grid grid-cols-2 gap-1.5">
          <StatBox value={MAGAZINE_SUMMARY.stories} label="Stories" accent />
          <StatBox value={MAGAZINE_SUMMARY.features} label="Feature spreads" />
          <StatBox value={MAGAZINE_SUMMARY.years} label="Years covered" />
          <StatBox value={MAGAZINE_SUMMARY.wings} label="Wings & chapters" />
        </div>

        <div className="mt-2 min-h-0 flex-1">
          <PhotoPlate
            src={ARCHIVE_PHOTOS[2].src}
            alt={ARCHIVE_PHOTOS[2].alt}
            caption="IEEE-SJCE archive"
            className="h-full w-full"
          />
        </div>

        <div className="mt-2 shrink-0 border border-[var(--mag-line)] bg-[var(--mag-paper-deep)] px-2 py-1.5">
          <p className="mag-mono text-[5.5px] font-bold uppercase tracking-[0.14em] text-[var(--mag-ink-soft)]">
            About this issue
          </p>
          <p className="mt-0.5 text-[8.5px] leading-[1.4] text-[var(--mag-ink-soft)]">
            Every entry keeps its poster, date, wing and story. Use the contents
            spread to jump to any page.
          </p>
        </div>
      </div>

      <PageFooter page={pageNumber} />
    </>
  )
}

export default function MagazineContents({
  entries = [],
  onGoto,
  pageNumber,
  yearReviewPage = 3,
  startIndex = 0,
  part = 1,
  totalStories = entries.length,
  showYearReview = false,
}) {
  const columnCount = entries.length > 10 ? 2 : 1
  const rowCount = Math.max(1, Math.ceil(entries.length / columnCount))

  return (
    <>
      <PageHeader section="Contents" />

      <div className="mt-3 flex min-h-0 flex-1 flex-col">
        <div className="flex items-end justify-between gap-2 border-b-2 border-[var(--mag-ink)] pb-1">
          <h2 className="mag-display text-[27px] uppercase leading-none tracking-[-0.03em]">
            {part === 1 ? 'Contents' : 'Contents II'}
          </h2>
          <Kicker className="text-right">
            {part === 1 ? 'Vol. 01 · Issue 01' : 'Continued'}
          </Kicker>
        </div>

        <div
          className="mt-2 grid min-h-0 flex-1 gap-x-3 overflow-hidden [grid-auto-flow:column]"
          style={{
            gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))`,
            gridTemplateRows: `repeat(${rowCount}, minmax(0, 1fr))`,
          }}
        >
          {entries.map((entry, index) => (
            <button
              key={entry.id}
              type="button"
              onClick={() => onGoto(entry.pageIndex)}
              className="group flex min-w-0 items-baseline gap-1.5 border-b border-[var(--mag-line)] py-0.5 text-left transition-colors hover:bg-[var(--mag-blue-soft)]"
              aria-label={`Go to ${entry.title} on page ${entry.pageIndex + 1}`}
            >
              <span className="mag-mono w-4 shrink-0 text-[6.5px] font-bold tabular-nums">
                {String(startIndex + index + 1).padStart(2, '0')}
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

        {showYearReview ? (
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
        ) : (
          <div className="mt-1.5 flex shrink-0 items-center justify-between gap-2 border-y border-[var(--mag-ink)] bg-[var(--mag-paper-deep)] px-1 py-1">
            <span className="mag-mono text-[6px] font-bold uppercase tracking-[0.14em] text-[var(--mag-ink-soft)]">
              Continued on the next page
            </span>
            <span className="mag-mono text-[6px] font-bold uppercase tracking-[0.14em] text-[var(--mag-ink-soft)]">
              Part {part} / 2
            </span>
          </div>
        )}

        <div className="mt-2 flex items-center justify-between gap-2 border-t border-[var(--mag-line)] pt-1.5">
          <p className="mag-mono text-[6px] font-bold uppercase tracking-[0.14em] text-[var(--mag-ink-soft)]">
            Tap any entry to open that spread
          </p>
          <p className="mag-mono text-[6px] font-bold uppercase tracking-[0.14em] text-[var(--mag-ink-soft)]">
            {totalStories} stories
          </p>
        </div>
      </div>

      <PageFooter page={pageNumber} />
    </>
  )
}
