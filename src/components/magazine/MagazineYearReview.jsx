import {
  ARCHIVE_PHOTOS,
  MAGAZINE_META,
  MAGAZINE_SUMMARY,
  eventsByYear,
} from '../../data/magazineEvents'
import {
  Kicker,
  PageFooter,
  PageHeader,
  PhotoPlate,
  Rule,
  StatBox,
} from './MagazinePrimitives'

const maxYearCount = Math.max(...eventsByYear.map(([, count]) => count), 1)

export function YearReviewLeft({ pageNumber }) {
  return (
    <>
      <PageHeader section="Year in Review" />

      <div className="mt-3 flex min-h-0 flex-1 flex-col">
        <Kicker>The year in numbers</Kicker>
        <h2 className="mag-display mt-1.5 text-[28px] uppercase leading-[0.9] tracking-[-0.03em]">
          A year worth turning pages for.
        </h2>
        <Rule className="mt-2 w-16" />

        <div className="mt-3 grid grid-cols-2 gap-1.5">
          <StatBox value={MAGAZINE_SUMMARY.stories} label="Stories" accent />
          <StatBox value={MAGAZINE_SUMMARY.features} label="Feature spreads" />
          <StatBox value={MAGAZINE_SUMMARY.years} label="Years covered" />
          <StatBox value={MAGAZINE_SUMMARY.wings} label="Wings & chapters" />
        </div>

        <div className="mt-3">
          <div className="flex items-center justify-between border-b border-[var(--mag-line)] pb-1">
            <Kicker>By the year</Kicker>
            <span className="mag-mono text-[5.5px] uppercase tracking-[0.12em] text-[var(--mag-ink-soft)]">
              Events documented
            </span>
          </div>
          <div className="mt-1.5 space-y-1.5">
            {eventsByYear.map(([year, count]) => (
              <div key={year} className="flex items-center gap-2">
                <span className="mag-mono w-7 shrink-0 text-[6.5px] font-bold tabular-nums">
                  {year}
                </span>
                <div className="h-2.5 flex-1 border border-[var(--mag-ink)] bg-[var(--mag-paper-deep)]">
                  <div
                    className="h-full bg-[var(--mag-blue)]"
                    style={{ width: `${(count / maxYearCount) * 100}%` }}
                  />
                </div>
                <span className="mag-mono w-4 shrink-0 text-right text-[6.5px] font-bold tabular-nums">
                  {count}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-auto border-t-2 border-[var(--mag-ink)] pt-2">
          <p className="text-[9.5px] leading-[1.5] text-[var(--mag-ink-soft)]">
            From first-year introductions to flagship workshops, the archive keeps
            growing. Each spread in this issue is a page from that larger story.
          </p>
          <p className="mag-mono mt-1 text-[6px] font-bold uppercase tracking-[0.14em]">
            {MAGAZINE_META.span}
          </p>
        </div>
      </div>

      <PageFooter page={pageNumber} />
    </>
  )
}

export function YearReviewRight({ pageNumber }) {
  return (
    <>
      <PageHeader section="Year in Review · Archive" />

      <div className="mt-3 flex min-h-0 flex-1 flex-col">
        <div className="flex items-end justify-between gap-2">
          <h2 className="mag-display text-[23px] uppercase leading-none tracking-[-0.03em]">
            The archive
          </h2>
          <Kicker className="text-right">IEEE-SJCE photographs</Kicker>
        </div>
        <Rule className="mt-2 w-12" />

        <div className="mt-2 grid min-h-0 flex-1 grid-cols-2 grid-rows-2 gap-2">
          {ARCHIVE_PHOTOS.slice(0, 4).map((photo, index) => (
            <PhotoPlate
              key={photo.src}
              src={photo.src}
              alt={photo.alt}
              caption={index % 2 === 0 ? 'IEEE-SJCE archive' : 'Event photography'}
              className="min-h-0"
              rotate={index % 2 === 0 ? '-rotate-1' : 'rotate-1'}
            />
          ))}
        </div>

        <div className="mt-2 border-2 border-[var(--mag-ink)] bg-[var(--mag-yellow)] px-2.5 py-2">
          <p className="mag-display text-[13px] uppercase leading-tight">
            Until the next issue.
          </p>
          <p className="mt-1 text-[9px] leading-[1.45] text-[var(--mag-ink)]">
            Thank you for reading, turning, and remembering the year with us. The next
            chapter is already being written.
          </p>
        </div>

        <div className="mt-auto flex items-end justify-between gap-2 border-t border-[var(--mag-line)] pt-1.5">
          <span className="mag-mono text-[6px] font-bold uppercase tracking-[0.14em] text-[var(--mag-ink-soft)]">
            {MAGAZINE_META.website}
          </span>
          <span className="mag-mono text-[6px] font-bold uppercase tracking-[0.14em] text-[var(--mag-ink-soft)]">
            {MAGAZINE_META.year}
          </span>
        </div>
      </div>

      <PageFooter page={pageNumber} />
    </>
  )
}
