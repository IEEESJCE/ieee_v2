import { ARCHIVE_PHOTOS, MAGAZINE_META, MAGAZINE_SUMMARY } from '../../data/magazineEvents'
import {
  Kicker,
  PageFooter,
  PageHeader,
  PhotoPlate,
  Rule,
} from './MagazinePrimitives'

export default function MagazineEditorial({ pageNumber }) {
  return (
    <>
      <PageHeader section="Editorial" />

      <div className="mt-2.5 flex min-h-0 flex-1 flex-col">
        <Kicker>From the editors</Kicker>
        <h2 className="mag-display mt-1 text-[23px] uppercase leading-[0.92] tracking-[-0.03em]">
          A year in circuits, code &amp; community.
        </h2>
        <Rule className="mt-1.5 w-14" />

        <div className="mt-2.5 flex min-h-0 flex-1 gap-3">
          <div className="min-w-0 flex-1 space-y-1.5">
            <p className="text-[9px] leading-[1.45] text-[var(--mag-ink-soft)]">
              <span className="mag-display float-left mr-1.5 text-[24px] leading-none text-[var(--mag-ink)]">
                B
              </span>
              etween the first breadboard and the final keynote, IEEE-SJCE spent the
              year turning curiosity into capability. This publication gathers the
              workshops, talks and outreach moments that shaped our chapter.
            </p>
            <p className="text-[9px] leading-[1.45] text-[var(--mag-ink-soft)]">
              Built from the posters, photographs and notes in our archive, these pages
              are a record of people learning by doing. Read them in order, or turn to
              the story that catches your eye.
            </p>
            <p className="text-[9px] font-bold text-[var(--mag-ink)]">
              Thank you for turning the pages.
            </p>
          </div>

          <div className="mag-editorial-aside flex w-[36%] shrink-0 flex-col gap-1.5">
            <PhotoPlate
              src={ARCHIVE_PHOTOS[0].src}
              alt={ARCHIVE_PHOTOS[0].alt}
              caption="IEEE-SJCE archive"
              className="h-[92px] w-full"
            />
            <div className="border border-[var(--mag-ink)] bg-[var(--mag-yellow)] px-1.5 py-1 text-center">
              <div className="mag-display text-[15px] leading-none">
                {MAGAZINE_SUMMARY.stories}
              </div>
              <div className="mag-mono text-[5px] font-bold uppercase tracking-[0.12em]">
                Stories in this issue
              </div>
            </div>
            <div className="border border-[var(--mag-line)] px-1.5 py-0.5 text-center">
              <div className="mag-mono text-[5px] font-bold uppercase tracking-[0.12em] text-[var(--mag-ink-soft)]">
                {MAGAZINE_META.volume} · {MAGAZINE_META.issue}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-auto shrink-0 border-t border-[var(--mag-line)] pt-1.5">
          <p className="mag-display text-[9.5px] uppercase leading-none">
            — The IEEE-SJCE Editorial Board
          </p>
          <p className="mag-mono mt-0.5 text-[5.5px] uppercase tracking-[0.14em] text-[var(--mag-ink-soft)]">
            IEEE-SJCE - Student Branch · Mysuru
          </p>
        </div>
      </div>

      <PageFooter page={pageNumber} />
    </>
  )
}
