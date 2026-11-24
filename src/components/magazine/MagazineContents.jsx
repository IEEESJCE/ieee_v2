import { ARCHIVE_PHOTOS, MAGAZINE_SUMMARY } from '../../data/magazineEvents'
import KeepIoT from '../KeepIoT'
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

        <div className="mt-2 grid grid-cols-2 gap-1">
          <StatBox value={MAGAZINE_SUMMARY.stories} label="Stories" accent compact />
          <StatBox value={MAGAZINE_SUMMARY.features} label="Feature spreads" compact />
          <StatBox value={MAGAZINE_SUMMARY.years} label="Years covered" compact />
          <StatBox value={MAGAZINE_SUMMARY.wings} label="Wings & chapters" compact />
        </div>

        <div className="mt-2.5 min-h-0 flex-1">
          <PhotoPlate
            src={ARCHIVE_PHOTOS[2].src}
            alt={ARCHIVE_PHOTOS[2].alt}
            className="h-full w-full"
          />
        </div>

        <div className="mt-2 shrink-0 border border-[var(--mag-line)] bg-[var(--mag-paper-deep)] px-2 py-1.5">
          <p className="mag-mono text-[7px] sm:text-[8px] font-bold uppercase tracking-[0.14em] text-[var(--mag-ink-soft)]">
            About this issue
          </p>
          <p className="mt-0.5 text-[9.5px] sm:text-[10.5px] leading-[1.4] text-[var(--mag-ink-soft)]">
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

      <div className="mt-2 sm:mt-3 flex min-h-0 flex-1 flex-col">
        <div className="flex items-end justify-between gap-2 border-b-2 border-[var(--mag-ink)] pb-1">
          <h2 className="mag-display text-[24px] sm:text-[27px] uppercase leading-none tracking-[-0.03em]">
            {part === 1 ? 'Contents' : 'Contents II'}
          </h2>
          <Kicker className="text-right">
            {part === 1 ? 'Vol. 01 · Issue 01' : 'Continued'}
          </Kicker>
        </div>

        <div
          className="my-1 sm:my-1.5 grid min-h-0 flex-1 gap-x-2 sm:gap-x-3 overflow-hidden [grid-auto-flow:column]"
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
              className="group flex h-full min-w-0 items-center gap-1 sm:gap-1.5 border-b border-[var(--mag-line)] py-0.5 text-left transition-colors hover:bg-[var(--mag-blue-soft)]"
              aria-label={`Go to ${entry.title} on page ${entry.pageIndex + 1}`}
            >
              <span className="mag-mono w-4 sm:w-4.5 shrink-0 text-[7.5px] sm:text-[9px] font-bold tabular-nums text-[var(--mag-ink-soft)]">
                {String(startIndex + index + 1).padStart(2, '0')}
              </span>
              <span className="mag-display min-w-0 flex-1 whitespace-normal break-words text-[clamp(8.5px,2vw,11px)] uppercase leading-[1.18] tracking-tight group-hover:text-[var(--mag-blue)]">
                <KeepIoT text={entry.title} />
              </span>
              <span className="mag-mono shrink-0 pl-0.5 text-[7.5px] sm:text-[9px] font-bold tabular-nums text-[var(--mag-ink-soft)]">
                {String(entry.pageIndex + 1).padStart(2, '0')}
              </span>
            </button>
          ))}
        </div>

        {showYearReview ? (
          <button
            type="button"
            onClick={() => onGoto(yearReviewPage)}
            className="group flex min-w-0 shrink-0 items-center gap-1 sm:gap-1.5 border-y border-[var(--mag-ink)] bg-[var(--mag-paper-deep)] px-1.5 py-1 text-left transition-colors hover:bg-[var(--mag-yellow)]"
            aria-label={`Go to the Year in Review on page ${yearReviewPage + 1}`}
          >
            <span className="mag-mono w-4 sm:w-4.5 shrink-0 text-[7.5px] sm:text-[9px] font-bold tabular-nums">
              ★
            </span>
            <span className="mag-display min-w-0 flex-1 whitespace-normal break-words text-[clamp(8.5px,2vw,11px)] uppercase leading-[1.18] tracking-tight group-hover:text-[var(--mag-ink)]">
              The Year in Review
            </span>
            <span className="mag-mono shrink-0 pl-0.5 text-[7.5px] sm:text-[9px] font-bold tabular-nums text-[var(--mag-ink-soft)]">
              {String(yearReviewPage + 1).padStart(2, '0')}
            </span>
          </button>
        ) : (
          <div className="flex shrink-0 items-center justify-between gap-2 border-y border-[var(--mag-ink)] bg-[var(--mag-paper-deep)] px-1.5 py-1">
            <span className="mag-mono text-[7px] sm:text-[8px] font-bold uppercase tracking-[0.14em] text-[var(--mag-ink-soft)]">
              Continued on the next page
            </span>
            <span className="mag-mono text-[7px] sm:text-[8px] font-bold uppercase tracking-[0.14em] text-[var(--mag-ink-soft)]">
              Part {part} / 2
            </span>
          </div>
        )}

        <div className="mt-1 flex items-center justify-between gap-2 border-t border-[var(--mag-line)] pt-1">
          <p className="mag-mono text-[6.5px] sm:text-[7.5px] font-bold uppercase tracking-[0.14em] text-[var(--mag-ink-soft)]">
            Tap any entry to open that spread
          </p>
          <p className="mag-mono text-[6.5px] sm:text-[7.5px] font-bold uppercase tracking-[0.14em] text-[var(--mag-ink-soft)]">
            {totalStories} stories
          </p>
        </div>
      </div>

      <PageFooter page={pageNumber} />
    </>
  )
}
