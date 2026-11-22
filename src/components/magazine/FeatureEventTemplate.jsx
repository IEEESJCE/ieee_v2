import { useLayoutEffect, useRef } from 'react'
import KeepIoT from '../KeepIoT'
import { ARCHIVE_PHOTOS } from '../../data/magazineEvents'
import {
  BookPage,
  EventTag,
  FitHeading,
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

const FIT_MAX_PX = 9
const FIT_MIN_PX = 5
const FIT_STEP_PX = 0.25

// The book scales with the viewport but the type is set in fixed px, so long
// copy (description + highlights) can overflow the column and push the stat
// strip under the footer. Shrink the box's font size until its content fits.
function useFitText(ref, deps) {
  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return undefined

    const fit = () => {
      if (!el.clientHeight) return // page hidden; refit when it is shown
      let size = FIT_MAX_PX
      el.style.fontSize = `${size}px`
      while (el.scrollHeight > el.clientHeight + 1 && size > FIT_MIN_PX) {
        size -= FIT_STEP_PX
        el.style.fontSize = `${size}px`
      }
    }

    fit()
    const observer = new ResizeObserver(fit)
    observer.observe(el)
    return () => observer.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}

function FeatureLeftPage({ event, pageNumber }) {
  const copyRef = useRef(null)
  useFitText(copyRef, [event.description, event.highlights])

  return (
    <>
      <PageHeader section={event.category} />

      <div className="mt-2.5 flex min-h-0 flex-1 flex-row gap-3 overflow-hidden">
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
            {/* Wing and category each stay on one line; if both don't fit,
                the line breaks between them, never inside "Industrial Visit". */}
            <span className="mag-mono text-[5px] font-bold uppercase tracking-[0.12em] text-[var(--mag-ink-soft)]">
              <span className="whitespace-nowrap">{event.wing} ·</span>{' '}
              <span className="whitespace-nowrap">{event.category}</span>
            </span>
          </div>
        </div>

        <div className="flex min-h-0 min-w-0 flex-1 flex-col">
          <div className="flex shrink-0 flex-wrap items-center justify-between gap-x-1.5 gap-y-1">
            <EventTag>{event.category}</EventTag>
            <span className="mag-mono shrink-0 border border-[var(--mag-ink)] px-1.5 py-0.5 text-[6px] font-bold uppercase tracking-[0.12em]">
              No. {pad(event.order)}
            </span>
          </div>

          <FitHeading as="h2" text={event.title} className="mag-display mt-1.5 text-[13.5px] uppercase leading-[0.95] tracking-[-0.03em]">
            <KeepIoT text={event.title} />
          </FitHeading>

          <p className="mag-mono mt-1 shrink-0 text-[6.5px] font-bold uppercase tracking-[0.12em] text-[var(--mag-ink-soft)]">
            {event.date} · {event.venue}
          </p>

          <Rule className="mt-1.5 w-12" />

          <div ref={copyRef} className="mt-1.5 min-h-0 flex-1 overflow-hidden" style={{ fontSize: FIT_MAX_PX }}>
            <p className="text-[1em] leading-[1.45] text-[var(--mag-ink-soft)]">
              {event.description}
            </p>

            <div className="mt-2">
              <Kicker>Highlights</Kicker>
              <HighlightList
                items={event.highlights}
                limit={3}
                className="mt-1"
                itemClassName="text-[1em] leading-tight"
              />
            </div>
          </div>

          <StatStrip stats={event.stats} className="shrink-0 pt-2" />
        </div>
      </div>

      <PageFooter page={pageNumber} />
    </>
  )
}

function FeatureRightPage({ event, pageNumber }) {
  const photos = (event.photos ?? []).filter((photo) => photo && photo !== event.poster)
  // One supplied photo is shown alone as a single large print.
  const singlePhoto = photos.length === 1
  const [photo1, photo2] =
    photos.length >= 2
      ? photos.slice(0, 2)
      : singlePhoto
        ? [photos[0], null]
        : [ARCHIVE_PHOTOS[0].src, ARCHIVE_PHOTOS[1].src]
  // `recapPhotos: false` drops the prints so the recap text sits right under
  // the title.
  const showPhotos = event.recapPhotos !== false

  return (
    <>
      <PageHeader section={`${event.category} · Recap`} />

      <div className="mt-2.5 flex min-h-0 flex-1 flex-col">
        {/* Date sits under the title so the title gets the full width and is
            never cut short. */}
        <div className="shrink-0 border-b border-[var(--mag-line)] pb-1.5">
          <Kicker>The recap</Kicker>
          <FitHeading as="h3" text={event.title} className="mag-display mt-0.5 text-[14px] uppercase leading-[0.95] tracking-[-0.02em] sm:text-[17px]">
            <KeepIoT text={event.title} />
          </FitHeading>
          <span className="mag-mono mt-1 block text-[6px] font-bold uppercase tracking-[0.12em] text-[var(--mag-ink-soft)]">
            {event.date}
          </span>
        </div>

        {!showPhotos ? null : singlePhoto ? (
          <div className="relative my-2 flex min-h-0 flex-1 w-full items-center justify-center">
            <div className="relative w-[94%] max-h-full aspect-[16/11] -rotate-1">
              <PhotoPlate
                src={photo1}
                alt={`${event.title} moment`}
                className="h-full w-full"
                tape
              />
            </div>

            <span className="mag-mono absolute right-1 top-0 z-30 border border-[var(--mag-ink)] bg-[var(--mag-paper)] px-1.5 py-0.5 text-[5.5px] font-bold uppercase tracking-[0.14em]">
              Archive print
            </span>
          </div>
        ) : (
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
        )}

        <p
          className={
            showPhotos
              ? 'mt-1 line-clamp-3 shrink-0 text-[9px] leading-[1.45] text-[var(--mag-ink-soft)]'
              : 'mt-2.5 shrink-0 text-[9px] leading-[1.45] text-[var(--mag-ink-soft)]'
          }
        >
          {event.recap}
        </p>

        {!showPhotos && <div className="min-h-0 flex-1" aria-hidden="true" />}

        <div className="mt-1.5 flex shrink-0 items-center justify-between gap-2 border-t border-[var(--mag-line)] pt-1.5 w-full">
          {/* "IEEE-SJCE" here just repeats the page footer, so only a specific
              wing or society is shown on the left. */}
          <span className="mag-mono w-[45%] shrink-0 truncate text-[5px] font-bold uppercase tracking-[0.06em] leading-none text-[var(--mag-ink-soft)]">
            {event.wing === 'IEEE-SJCE' ? null : event.wing}
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
