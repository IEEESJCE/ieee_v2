import { useState } from 'react'
import KeepIoT from '../KeepIoT'
import {
  BookPage,
  EventTag,
  FitHeading,
  HighlightList,
  Kicker,
  MagazineImage,
  PageFooter,
  PageHeader,
  Rule,
} from './MagazinePrimitives'

const pad = (value) => String(value).padStart(2, '0')

// Large centred poster that grows to fill the free height of the page.
function BriefPoster({ src, title }) {
  const [failed, setFailed] = useState(false)

  return (
    <div className="relative min-h-[90px] flex-1">
      <div className="absolute inset-0 flex items-center justify-center py-1">
        {failed ? (
          <div className="h-full w-[60%]">
            <MagazineImage src={null} alt={`${title} poster`} />
          </div>
        ) : (
          <img
            src={src}
            alt={`${title} poster`}
            loading="lazy"
            decoding="async"
            onError={() => setFailed(true)}
            className="block max-h-full max-w-[92%] border-2 border-[var(--mag-ink)] bg-[var(--mag-paper-deep)] object-contain p-0.5 shadow-[3px_3px_0_rgba(17,17,17,0.16)]"
          />
        )}
      </div>
    </div>
  )
}

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
        <div className="flex shrink-0 flex-wrap items-center justify-between gap-x-2 gap-y-1">
          <EventTag>{event.category}</EventTag>
          <span className="mag-mono border border-[var(--mag-ink)] bg-[var(--mag-paper-deep)] px-1.5 py-0.5 text-[6px] font-bold uppercase tracking-[0.14em] text-[var(--mag-ink-soft)]">
            No. {pad(event.order)}
          </span>
        </div>

        <FitHeading as="h2" text={event.title} className="mag-display mt-1.5 text-[15px] uppercase leading-[0.94] tracking-[-0.03em] sm:text-[18px]">
          <KeepIoT text={event.title} />
        </FitHeading>

        <p className="mag-mono mt-1 shrink-0 text-[6.5px] font-bold uppercase tracking-[0.12em] text-[var(--mag-ink-soft)]">
          {event.date}{event.venue && <><br />{event.venue}</>}
        </p>

        <Rule className="mt-1.5 w-12" />

        <div className="mt-2 flex min-h-0 flex-1 flex-col gap-2 overflow-hidden">
          {event.poster && <BriefPoster src={event.poster} title={event.title} />}

          <p
            className={
              event.poster
                ? 'shrink-0 line-clamp-4 text-[9px] leading-[1.45] text-[var(--mag-ink-soft)]'
                : 'line-clamp-6 text-[9.5px] leading-[1.5] text-[var(--mag-ink-soft)]'
            }
          >
            <span className="mag-display float-left mr-1.5 text-[16px] leading-none text-[var(--mag-ink)] sm:text-[24px]">
              {event.description.charAt(0)}
            </span>
            {event.description.slice(1)}
          </p>

          {event.highlights && event.highlights.length > 0 && (
            <div className="shrink-0">
              <Kicker>Highlights</Kicker>
              <HighlightList items={event.highlights} limit={3} className="mt-1" />
            </div>
          )}

          <div className="mt-auto shrink-0 space-y-1.5">
            {companion && (
              <div className="flex items-center justify-between gap-2 border-t border-[var(--mag-line)] pt-1 text-[5.5px]">
                <span className="mag-mono font-bold uppercase tracking-[0.12em] text-[var(--mag-ink-soft)]">
                  Facing Event
                </span>
                <span className="mag-display min-w-0 truncate text-right text-[7.5px] uppercase">
                  <KeepIoT text={companion.title} />
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
