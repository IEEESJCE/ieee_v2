import { ARCHIVE_PHOTOS } from '../../data/magazineEvents'
import {
  BookPage,
  EventTag,
  HighlightList,
  Kicker,
  MagazineImage,
  PageFooter,
  PageHeader,
  PhotoPlate,
  Rule,
  StatStrip,
} from './MagazinePrimitives'

const pad = (value) => String(value).padStart(2, '0')

function FeatureLeftPage({ event, pageNumber }) {
  return (
    <>
      <PageHeader section={event.category} />

      <div className="mt-2.5 flex min-h-0 flex-1 gap-3">
        <div className="flex w-[46%] shrink-0 flex-col min-h-0 justify-center items-center h-full">
          <div className="relative aspect-[3/4] w-full overflow-hidden border-2 border-[var(--mag-ink)] bg-[var(--mag-paper-deep)] shadow-[4px_4px_0_rgba(17,17,17,0.18)]">
            <span
              className="mag-tape absolute -top-1.5 left-1/2 z-20 h-3.5 w-12 -translate-x-1/2 -rotate-2"
              aria-hidden="true"
            />
            <MagazineImage
              src={event.poster}
              alt={`${event.title} event poster`}
              imgClassName="h-full w-full object-contain p-1"
            />
            <span className="mag-mono absolute bottom-1 left-1 z-20 border border-[var(--mag-ink)] bg-[var(--mag-paper)] px-1 py-0.5 text-[5px] font-bold uppercase tracking-[0.14em]">
              Official poster
            </span>
          </div>

          {event.pullQuote && (
            <blockquote className="mt-2.5 shrink-0 border-l-2 border-[var(--mag-blue)] pl-2 py-0.5 text-center">
              <Kicker className="text-center">From the editors</Kicker>
              <p className="mag-display mt-0.5 text-[8.5px] uppercase leading-tight text-[var(--mag-ink)] text-center">
                “{event.pullQuote}”
              </p>
            </blockquote>
          )}

          <div className="mt-2 shrink-0 border border-[var(--mag-line)] bg-[var(--mag-paper-deep)] px-1.5 py-1 text-center w-full">
            <span className="mag-mono text-[5px] font-bold uppercase tracking-[0.12em] text-[var(--mag-ink-soft)]">
              {event.wing} · {event.category}
            </span>
          </div>
        </div>

        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex shrink-0 items-center justify-between gap-1.5">
            <EventTag>{event.category}</EventTag>
            <span className="mag-mono shrink-0 border border-[var(--mag-ink)] px-1.5 py-0.5 text-[6px] font-bold uppercase tracking-[0.12em]">
              No. {pad(event.order)}
            </span>
          </div>

          <h2 className="mag-display mt-1.5 text-[17px] uppercase leading-[0.95] tracking-[-0.025em]">
            {event.title}
          </h2>

          <p className="mag-mono mt-1 shrink-0 text-[6.5px] font-bold uppercase tracking-[0.12em] text-[var(--mag-ink-soft)]">
            {event.date} · {event.venue}
          </p>

          <Rule className="mt-1.5 w-12" />

          <p className="mt-1.5 line-clamp-6 shrink-0 text-[9px] leading-[1.45] text-[var(--mag-ink-soft)]">
            {event.description}
          </p>

          <div className="mt-2 shrink-0">
            <Kicker>Highlights</Kicker>
            <HighlightList items={event.highlights} limit={3} className="mt-1" />
          </div>

          <StatStrip stats={event.stats} className="mt-auto shrink-0 pt-2" />
        </div>
      </div>

      <PageFooter page={pageNumber} />
    </>
  )
}

function FeatureRightPage({ event, pageNumber }) {
  const photos = (event.photos ?? []).filter((photo) => photo && photo !== event.poster)
  const [photo1, photo2] =
    photos.length >= 2
      ? photos.slice(0, 2)
      : photos.length === 1
        ? [photos[0], ARCHIVE_PHOTOS[1].src]
        : [ARCHIVE_PHOTOS[0].src, ARCHIVE_PHOTOS[1].src]

  return (
    <>
      <PageHeader section={`${event.category} · Recap`} />

      <div className="mt-2.5 flex min-h-0 flex-1 flex-col">
        <div className="flex shrink-0 items-end justify-between gap-2 border-b border-[var(--mag-line)] pb-1.5">
          <div className="min-w-0">
            <Kicker>The recap</Kicker>
            <h3 className="mag-display mt-0.5 truncate text-[17px] uppercase leading-none tracking-[-0.02em]">
              {event.title}
            </h3>
          </div>
          <span className="mag-mono shrink-0 text-[6px] font-bold uppercase tracking-[0.12em] text-[var(--mag-ink-soft)]">
            {event.date}
          </span>
        </div>

        <div className="relative my-2 min-h-0 flex-1 w-full">
          <div className="absolute left-0 top-0.5 z-10 w-[72%] aspect-[16/10] -rotate-2">
            <PhotoPlate
              src={photo1}
              alt={`${event.title} moment 1`}
              caption="Event session"
              className="h-full w-full"
              tape
            />
          </div>

          <div className="absolute right-0 bottom-0.5 z-20 w-[72%] aspect-[16/10] rotate-2">
            <PhotoPlate
              src={photo2}
              alt={`${event.title} moment 2`}
              caption="IEEE-SJCE archive"
              className="h-full w-full"
              tape
            />
          </div>

          <span className="mag-mono absolute right-1 top-1.5 z-30 border border-[var(--mag-ink)] bg-[var(--mag-paper)] px-1.5 py-0.5 text-[5.5px] font-bold uppercase tracking-[0.14em]">
            Archive print
          </span>

          <span className="mag-mono absolute bottom-1 left-1 z-30 text-[5.5px] font-bold uppercase tracking-[0.14em] text-[var(--mag-ink-soft)]">
            Recap moments
          </span>
        </div>

        <p className="mt-1 line-clamp-3 shrink-0 text-[9px] leading-[1.45] text-[var(--mag-ink-soft)]">
          {event.recap}
        </p>

        <div className="mt-1.5 flex shrink-0 items-center justify-between gap-2 border-t border-[var(--mag-line)] pt-1.5 w-full">
          <span className="mag-mono w-[45%] shrink-0 truncate text-[5px] font-bold uppercase tracking-[0.06em] leading-none text-[var(--mag-ink-soft)]">
            {event.wing}
          </span>
          <span className="mag-mono w-[45%] shrink-0 truncate text-[5px] font-bold uppercase tracking-[0.06em] leading-none text-[var(--mag-ink-soft)] text-right">
            {event.venue}
          </span>
        </div>
      </div>

      <PageFooter page={pageNumber} />
    </>
  )
}

export function featureEventPages(event, startIndex) {
  return [
    <BookPage key={`${event.id}-feature-left`} side="left">
      <FeatureLeftPage event={event} pageNumber={startIndex + 1} />
    </BookPage>,
    <BookPage key={`${event.id}-feature-right`} side="right">
      <FeatureRightPage event={event} pageNumber={startIndex + 2} />
    </BookPage>,
  ]
}

export default function FeatureEventTemplate({ event, startIndex }) {
  return featureEventPages(event, startIndex)
}
