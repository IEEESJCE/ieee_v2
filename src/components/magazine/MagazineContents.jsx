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

/* ─────────────────────────────────────────────────────────────
   Contents page – CSS-container-query approach
   ─────────────────────────────────────────────────────────────
   The magazine page inside react-pageflip can range from
   230×392 px (small mobile portrait) to 430×600 px (desktop).
   Viewport units (vw/vh) don't help because the page is
   *inside* a scaled container, not the viewport.

   Strategy:
   1.  The outer wrapper becomes a CSS container (@container-type: size).
   2.  Font sizes use container-query height units (cqh) so text
       scales proportionally with the actual rendered page height.
   3.  Rows use `auto` sizing (each entry takes only the space it
       needs) with a uniform constant gap, so short titles don't
       get extra space and long titles aren't squeezed.
   4.  The grid + overflow-hidden ensures nothing bleeds past the
       page boundary.
   ───────────────────────────────────────────────────────────── */

const CONTAINER_STYLES = {
  containerType: 'size',
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

      {/* Container-query wrapper – takes all space between header and footer */}
      <div
        className="mt-1 flex min-h-0 flex-1 flex-col overflow-hidden"
        style={CONTAINER_STYLES}
      >
        {/* ── Section heading ── */}
        <div className="shrink-0 flex items-end justify-between gap-2 border-b-2 border-[var(--mag-ink)] pb-0.5">
          <h2 className="mag-display text-[18px] sm:text-[24px] uppercase leading-none tracking-[-0.03em]">
            {part === 1 ? 'Contents' : 'Contents II'}
          </h2>
          <Kicker className="text-right">
            {part === 1 ? 'Vol. 01 · Issue 01' : 'Continued'}
          </Kicker>
        </div>

        {/* ── Entries grid ── */}
        <div
          className="mt-0.5 grid min-h-0 flex-1 overflow-hidden [grid-auto-flow:column]"
          style={{
            gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))`,
            gridTemplateRows: `repeat(${rowCount}, minmax(0, 1fr))`,
            columnGap: '0.5rem',
          }}
        >
          {entries.map((entry, index) => (
            <button
              key={entry.id}
              type="button"
              onClick={() => onGoto(entry.pageIndex)}
              className="contents-entry group flex min-h-0 min-w-0 items-center border-b border-[var(--mag-line)] text-left transition-colors hover:bg-[var(--mag-blue-soft)]"
              style={{ gap: '2px', padding: '0 1px' }}
              aria-label={`Go to ${entry.title} on page ${entry.pageIndex + 1}`}
            >
              <span className="contents-num mag-mono shrink-0 font-bold tabular-nums text-[var(--mag-ink-soft)]">
                {String(startIndex + index + 1).padStart(2, '0')}
              </span>
              <span className="contents-title mag-display min-w-0 flex-1 whitespace-normal break-words uppercase leading-[1.15] tracking-tight group-hover:text-[var(--mag-blue)]">
                <KeepIoT text={entry.title} />
              </span>
              <span className="contents-num mag-mono shrink-0 font-bold tabular-nums text-[var(--mag-ink-soft)]">
                {String(entry.pageIndex + 1).padStart(2, '0')}
              </span>
            </button>
          ))}
        </div>

        {/* ── Bottom bar: pinned at bottom ── */}
        <div className="shrink-0 mt-auto pt-0.5">
          {showYearReview ? (
            <button
              type="button"
              onClick={() => onGoto(yearReviewPage)}
              className="contents-entry group flex w-full min-w-0 items-center border-y border-[var(--mag-ink)] bg-[var(--mag-paper-deep)] text-left transition-colors hover:bg-[var(--mag-yellow)]"
              style={{ gap: '2px', padding: '1px 4px' }}
              aria-label={`Go to the Year in Review on page ${yearReviewPage + 1}`}
            >
              <span className="contents-num mag-mono shrink-0 font-bold tabular-nums">
                ★
              </span>
              <span className="contents-title mag-display min-w-0 flex-1 whitespace-normal break-words uppercase leading-[1.15] tracking-tight group-hover:text-[var(--mag-ink)]">
                The Year in Review
              </span>
              <span className="contents-num mag-mono shrink-0 font-bold tabular-nums text-[var(--mag-ink-soft)]">
                {String(yearReviewPage + 1).padStart(2, '0')}
              </span>
            </button>
          ) : (
            <div className="contents-footer flex items-center justify-between gap-2 border-y border-[var(--mag-ink)] bg-[var(--mag-paper-deep)] px-1 py-0.5">
              <span className="mag-mono font-bold uppercase tracking-[0.14em] text-[var(--mag-ink-soft)]">
                Continued on the next page
              </span>
              <span className="mag-mono font-bold uppercase tracking-[0.14em] text-[var(--mag-ink-soft)]">
                Part {part} / 2
              </span>
            </div>
          )}

          <div className="contents-footer mt-0.5 flex items-center justify-between gap-2 border-t border-[var(--mag-line)] pt-0.5">
            <p className="mag-mono font-bold uppercase tracking-[0.14em] text-[var(--mag-ink-soft)]">
              Tap any entry to open that spread
            </p>
            <p className="mag-mono font-bold uppercase tracking-[0.14em] text-[var(--mag-ink-soft)]">
              {totalStories} stories
            </p>
          </div>
        </div>
      </div>

      <PageFooter page={pageNumber} />
    </>
  )
}
