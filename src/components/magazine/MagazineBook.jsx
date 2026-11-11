import { forwardRef, useMemo } from 'react'
import HTMLFlipBook from 'react-pageflip'

import {
  BookPage,
  Kicker,
  PageFooter,
  PageHeader,
} from './MagazinePrimitives'
import MagazineBackCover from './MagazineBackCover'
import MagazineContents from './MagazineContents'
import MagazineCover from './MagazineCover'
import MagazineEditorial from './MagazineEditorial'
import { YearReviewLeft, YearReviewRight } from './MagazineYearReview'
import { eventPages } from './EventSpread'
import { MAGAZINE_PLAN } from './magazinePlan'

function NotesPage({ pageNumber }) {
  return (
    <>
      <PageHeader section="Notes" />

      <div className="mt-3 flex min-h-0 flex-1 flex-col">
        <Kicker>Appendix</Kicker>
        <h2 className="mag-display mt-1.5 text-[28px] uppercase leading-none tracking-[-0.03em]">
          Notes
        </h2>
        <div className="mt-4 grid flex-1 content-start gap-3">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="h-px bg-[var(--mag-line)]" />
          ))}
        </div>
      </div>

      <PageFooter page={pageNumber} />
    </>
  )
}

const MagazineBook = forwardRef(function MagazineBook(
  {
    onGoto,
    onFlip,
    onInit,
    onChangeOrientation,
    onChangeState,
  },
  ref
) {
  const bookPages = useMemo(() => {
    const children = []

    children.push(
      <BookPage key="magazine-cover" side="right" padded={false}>
        <MagazineCover />
      </BookPage>
    )

    children.push(
      <BookPage key="magazine-editorial" side="left">
        <MagazineEditorial pageNumber={2} />
      </BookPage>
    )

    children.push(
      <BookPage key="magazine-contents" side="right">
        <MagazineContents
          entries={MAGAZINE_PLAN.plannedEvents}
          onGoto={onGoto}
          pageNumber={3}
          yearReviewPage={MAGAZINE_PLAN.yearReviewPage}
        />
      </BookPage>
    )

    MAGAZINE_PLAN.pages.forEach((entry) => {
      if (entry.type === 'filler') {
        const side = entry.pageIndex % 2 === 0 ? 'right' : 'left'
        children.push(
          <BookPage key={`magazine-notes-${entry.pageIndex}`} side={side}>
            <NotesPage pageNumber={entry.pageIndex + 1} />
          </BookPage>
        )
        return
      }

      children.push(...eventPages(entry))
    })

    children.push(
      <BookPage key="magazine-year-left" side="left">
        <YearReviewLeft pageNumber={MAGAZINE_PLAN.yearReviewPage + 1} />
      </BookPage>
    )

    children.push(
      <BookPage key="magazine-year-right" side="right">
        <YearReviewRight pageNumber={MAGAZINE_PLAN.yearReviewPage + 2} />
      </BookPage>
    )

    children.push(
      <BookPage key="magazine-back-cover" side="left" padded={false}>
        <MagazineBackCover />
      </BookPage>
    )

    return children
  }, [onGoto])

  return (
    <HTMLFlipBook
      ref={ref}
      width={400}
      height={560}
      size="stretch"
      minWidth={230}
      maxWidth={430}
      minHeight={392}
      maxHeight={600}
      showCover
      drawShadow
      flippingTime={820}
      maxShadowOpacity={0.26}
      mobileScrollSupport
      usePortrait
      swipeDistance={30}
      clickEventForward
      useMouseEvents
      showPageCorners
      disableFlipByClick={false}
      startPage={0}
      startZIndex={0}
      autoSize
      renderOnlyPageLengthChange
      className="mag-flipbook"
      onFlip={onFlip}
      onInit={onInit}
      onChangeOrientation={onChangeOrientation}
      onChangeState={onChangeState}
    >
      {bookPages}
    </HTMLFlipBook>
  )
})

export default MagazineBook
