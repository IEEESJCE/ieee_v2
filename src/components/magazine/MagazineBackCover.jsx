import { MAGAZINE_META } from '../../data/magazineEvents'

export default function MagazineBackCover() {
  return (
    <article className="relative flex h-full w-full flex-col overflow-hidden bg-[#0B0B0B] px-6 py-6 text-[var(--mag-paper)]">
      <div
        className="pointer-events-none absolute -right-16 top-20 h-48 w-48 rounded-full border-[14px] border-[var(--mag-blue)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -left-12 bottom-24 h-36 w-36 rotate-12 bg-[var(--mag-yellow)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute right-10 top-10 h-8 w-8 bg-[var(--mag-yellow)]"
        aria-hidden="true"
      />

      <header className="relative z-10 flex items-center gap-2">
        <img
          src="/logo.png"
          alt="IEEE-SJCE logo"
          loading="lazy"
          className="h-10 w-10 rounded-full border-2 border-[var(--mag-paper)] bg-white object-contain"
        />
        <div className="mag-mono text-[7px] font-bold uppercase leading-tight tracking-[0.16em]">
          <div>IEEE-SJCE</div>
          <div className="font-normal text-[#BDB3A1]">Student Branch</div>
        </div>
      </header>

      <div className="relative z-10 mt-auto">
        <p className="mag-mono text-[7px] font-bold uppercase tracking-[0.3em] text-[var(--mag-paper)]">
          IEEE-SJCE
        </p>
        <h2 className="mag-display mt-2 text-[38px] uppercase leading-[0.84] tracking-[-0.04em]">
          The
          <br />
          IEEE
          <br />
          Chronicle
        </h2>
        <div className="mt-3 h-[3px] w-16 bg-[var(--mag-yellow)]" aria-hidden="true" />
        <p className="mag-display mt-3 max-w-[80%] text-[11px] uppercase leading-tight tracking-[0.12em]">
          {MAGAZINE_META.tagline}
        </p>
      </div>

      <footer className="relative z-10 mt-6 flex items-end justify-between gap-3 border-t border-[#3A352C] pt-3">
        <div>
          <div className="mag-mono text-[6.5px] font-bold uppercase tracking-[0.16em]">
            {MAGAZINE_META.year}
          </div>
          <div className="mag-mono mt-0.5 text-[6px] uppercase tracking-[0.14em] text-[#BDB3A1]">
            SJCE Mysuru · {MAGAZINE_META.website}
          </div>
        </div>
        <div className="mag-mono border border-[var(--mag-paper)] px-2 py-1 text-[6px] font-bold uppercase tracking-[0.16em]">
          End of issue
        </div>
      </footer>
    </article>
  )
}
