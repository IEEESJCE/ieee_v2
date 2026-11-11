import {
  BookPage,
  EventTag,
  HighlightList,
  Kicker,
  MagazineImage,
  PageFooter,
  PageHeader,
  Rule,
} from './MagazinePrimitives'

const pad = (value) => String(value).padStart(2, '0')

function BriefPage({ event, pageNumber, companion }) {
  return (
    <div className="relative flex h-full flex-col overflow-hidden">
      <PageHeader section={event.category} />

      <span
        aria-hidden="true"
        className="mag-display pointer-events-none absolute -right-1 top-9 text-[78px] leading-none tracking-[-0.06em] text-[var(--mag-ink)] opacity-[0.045]"
      >
        {pad(event.order)}
      </span>

      <div className="mt-2 flex min-h-0 flex-1 flex-col overflow-hidden">
        <div className="flex shrink-0 items-center justify-between gap-2">
          <EventTag>{event.category}</EventTag>
          <span className="mag-mono border border-[var(--mag-ink)] bg-[var(--mag-paper-deep)] px-1.5 py-0.5 text-[6px] font-bold uppercase tracking-[0.14em] text-[var(--mag-ink-soft)]">
            No. {pad(event.order)}
          </span>
        </div>

        <h2 className="mag-display mt-1.5 text-[18px] uppercase leading-[0.94] tracking-[-0.03em]">
          {event.title}
        </h2>

        <p className="mag-mono mt-1 shrink-0 text-[6.5px] font-bold uppercase tracking-[0.12em] text-[var(--mag-ink-soft)]">
          {event.date} · {event.venue}
        </p>

        <Rule className="mt-1.5 w-12" />

        <div className="mt-2 flex min-h-0 flex-1 flex-col gap-2 overflow-hidden">
          {event.poster ? (
            <div className="flex min-h-0 gap-2.5">
              <div className="w-[33%] shrink-0">
                <div className="relative aspect-[3/4] w-full overflow-hidden border-2 border-[var(--mag-ink)] bg-[var(--mag-paper-deep)] shadow-[3px_3px_0_rgba(17,17,17,0.16)]">
                  <span
                    className="mag-tape absolute -top-1 left-1/2 z-20 h-3 w-10 -translate-x-1/2 -rotate-2"
                    aria-hidden="true"
                  />
                  <MagazineImage
                    src={event.poster}
                    alt={`${event.title} poster`}
                    imgClassName="h-full w-full object-contain p-0.5"
                  />
                </div>
              </div>
              <div className="min-w-0 flex-1">
                <p className="line-clamp-6 text-[9px] leading-[1.45] text-[var(--mag-ink-soft)]">
                  <span className="mag-display float-left mr-1.5 text-[24px] leading-none text-[var(--mag-ink)]">
                    {event.description.charAt(0)}
                  </span>
                  {event.description.slice(1)}
                </p>
              </div>
            </div>
          ) : (
            <p className="line-clamp-6 text-[9.5px] leading-[1.5] text-[var(--mag-ink-soft)]">
              <span className="mag-display float-left mr-1.5 text-[26px] leading-none text-[var(--mag-ink)]">
                {event.description.charAt(0)}
              </span>
              {event.description.slice(1)}
            </p>
          )}

          {event.highlights && event.highlights.length > 0 && (
            <div className="shrink-0">
              <Kicker>Highlights</Kicker>
              <HighlightList items={event.highlights} limit={3} className="mt-1" />
            </div>
          )}

          <div className="mt-auto shrink-0 space-y-1.5">
            {event.takeaway && (
              <div className="border border-[var(--mag-ink)] bg-[var(--mag-yellow)] px-2 py-1.5">
                <div className="mag-mono text-[5.5px] font-bold uppercase tracking-[0.14em] text-[var(--mag-ink)]">
                  Takeaway
                </div>
                <p className="mag-display mt-0.5 text-[10.5px] uppercase leading-tight text-[var(--mag-ink)]">
                  {event.takeaway}
                </p>
              </div>
            )}

            {companion && (
              <div className="flex items-center justify-between gap-2 border-t border-[var(--mag-line)] pt-1 text-[5.5px]">
                <span className="mag-mono font-bold uppercase tracking-[0.12em] text-[var(--mag-ink-soft)]">
                  Facing Event
                </span>
                <span className="mag-display min-w-0 truncate text-right text-[7.5px] uppercase">
                  {companion.title}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      <PageFooter page={pageNumber} />
    </div>
  )
}

export function briefEventPage(event, pageIndex, companion) {
  const side = pageIndex % 2 === 0 ? 'right' : 'left'
  return (
    <BookPage key={`${event.id}-brief`} side={side}>
      <BriefPage event={event} pageNumber={pageIndex + 1} companion={companion} />
    </BookPage>
  )
}

export default function StandardEventTemplate({ event, pageIndex, companion }) {
  return briefEventPage(event, pageIndex, companion)
}
