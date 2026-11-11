import { ARCHIVE_PHOTOS, MAGAZINE_META } from '../../data/magazineEvents'
import { MagazineImage } from './MagazinePrimitives'

const coverPhotos = [
  ARCHIVE_PHOTOS[0],
  ARCHIVE_PHOTOS[2],
  ARCHIVE_PHOTOS[4],
]

export default function MagazineCover() {
  return (
    <article className="mag-paper relative flex h-full w-full flex-col overflow-hidden border-[3px] border-[var(--mag-ink)] px-4 py-4 text-[var(--mag-ink)]">
      {/* geometric cover blocks */}
      <div
        className="pointer-events-none absolute -right-12 top-24 h-40 w-40 rounded-full bg-[var(--mag-blue)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -left-10 bottom-24 h-32 w-32 rotate-12 bg-[var(--mag-yellow)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute right-5 top-14 h-10 w-10 border-2 border-[var(--mag-ink)]"
        aria-hidden="true"
      />
      <header className="relative z-10 flex shrink-0 items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          <img
            src="/logo.png"
            alt="IEEE-SJCE logo"
            loading="eager"
            className="h-10 w-10 rounded-full border-2 border-[var(--mag-ink)] bg-white object-contain"
          />
          <div className="mag-mono text-[7px] font-bold uppercase leading-tight tracking-[0.16em]">
            <div>IEEE-SJCE</div>
            <div className="font-normal text-[var(--mag-ink-soft)]">Student Branch</div>
          </div>
        </div>
        <div className="border border-[var(--mag-ink)] bg-[var(--mag-yellow)] px-2 py-1 text-right">
          <div className="mag-mono text-[6px] font-bold uppercase tracking-[0.16em]">
            {MAGAZINE_META.volume}
          </div>
          <div className="mag-mono text-[6px] font-bold uppercase tracking-[0.16em]">
            {MAGAZINE_META.issue}
          </div>
        </div>
      </header>

      <div className="relative z-10 mt-5 shrink-0">
        <p className="mag-mono text-[8px] font-bold uppercase tracking-[0.5em]">The</p>
        <h1 className="mag-display text-[36px] leading-[0.85] tracking-[-0.04em] sm:text-[40px]">
          IEEE
          <br />
          CHRONICLE
        </h1>
        <div className="mt-2 flex items-center gap-2">
          <span className="h-[3px] w-10 bg-[var(--mag-ink)]" aria-hidden="true" />
          <span className="mag-mono text-[7px] font-bold uppercase tracking-[0.32em]">
            IEEE-SJCE
          </span>
        </div>
      </div>

      <p className="relative z-10 mt-3 max-w-[88%] shrink-0 mag-display text-[11px] uppercase leading-tight tracking-[0.12em]">
        {MAGAZINE_META.tagline}
      </p>

      {/* Actual IEEE-SJCE photographs, arranged like prints on a cover */}
      <div className="relative z-10 mt-4 min-h-0 flex-1">
        <div className="relative h-full w-full">
          <div className="absolute left-0 top-2 h-[72%] w-[56%] -rotate-3">
            <Print photo={coverPhotos[0]} label="IEEE-SJCE archive" />
          </div>
          <div className="absolute right-0 top-0 h-[55%] w-[46%] rotate-2">
            <Print photo={coverPhotos[1]} label="Workshop floor" />
          </div>
          <div className="absolute bottom-0 right-6 h-[44%] w-[44%] -rotate-1">
            <Print photo={coverPhotos[2]} label="The community" />
          </div>
          <div className="absolute bottom-1 left-2 z-20 rotate-[-2deg] border-2 border-[var(--mag-ink)] bg-[var(--mag-yellow)] px-2 py-1">
            <span className="mag-mono text-[6.5px] font-bold uppercase tracking-[0.16em]">
              A year in review
            </span>
          </div>
        </div>
      </div>

      <footer className="relative z-10 mt-3 flex shrink-0 items-end justify-between gap-3 border-t-2 border-[var(--mag-ink)] pt-2">
        <div>
          <div className="mag-mono text-[6.5px] font-bold uppercase tracking-[0.16em]">
            {MAGAZINE_META.year}
          </div>
          <div className="mag-mono mt-0.5 text-[6px] uppercase tracking-[0.14em] text-[var(--mag-ink-soft)]">
            {MAGAZINE_META.span}
          </div>
        </div>
        <div className="mag-display shrink-0 text-[22px] leading-none">2026</div>
      </footer>
    </article>
  )
}

function Print({ photo, label }) {
  return (
    <figure className="relative h-full w-full">
      <span
        className="mag-tape absolute -top-1.5 left-1/2 z-20 h-4 w-12 -translate-x-1/2 -rotate-2"
        aria-hidden="true"
      />
      <div className="relative h-full w-full overflow-hidden border-2 border-[var(--mag-ink)] bg-[var(--mag-paper-deep)] shadow-[4px_4px_0_rgba(17,17,17,0.2)]">
        <MagazineImage src={photo.src} alt={photo.alt} loading="eager" />
      </div>
      <figcaption className="mag-mono mt-0.5 truncate text-[5.5px] uppercase tracking-[0.1em] text-[var(--mag-ink-soft)]">
        {label}
      </figcaption>
    </figure>
  )
}
