import { forwardRef, useMemo } from 'react'
import HTMLFlipBook from 'react-pageflip'

import { BookPage } from './MagazinePrimitives'
import MagazineBackCover from './MagazineBackCover'
import MagazineContents, { MagazineContentsIntro } from './MagazineContents'
import MagazineCover from './MagazineCover'
import MagazineEditorial from './MagazineEditorial'
import { YearReviewLeft, YearReviewRight } from './MagazineYearReview'
import { eventPages } from './EventSpread'
import { MAGAZINE_PLAN } from './magazinePlan'

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

    const entries = MAGAZINE_PLAN.plannedEvents
    const splitAt = Math.ceil(entries.length / 2)

    children.push(
      <BookPage key="magazine-contents-intro" side="right">
        <MagazineContentsIntro pageNumber={3} />
      </BookPage>
    )

    children.push(
      <BookPage key="magazine-contents-left" side="left">
        <MagazineContents
          entries={entries.slice(0, splitAt)}
          onGoto={onGoto}
          pageNumber={4}
          startIndex={0}
          part={1}
          totalStories={entries.length}
          yearReviewPage={MAGAZINE_PLAN.yearReviewPage}
        />
      </BookPage>
    )

    children.push(
      <BookPage key="magazine-contents-right" side="right">
        <MagazineContents
          entries={entries.slice(splitAt)}
          onGoto={onGoto}
          pageNumber={5}
          startIndex={splitAt}
          part={2}
          totalStories={entries.length}
          yearReviewPage={MAGAZINE_PLAN.yearReviewPage}
          showYearReview
        />
      </BookPage>
    )

    MAGAZINE_PLAN.pages.forEach((entry) => {
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
