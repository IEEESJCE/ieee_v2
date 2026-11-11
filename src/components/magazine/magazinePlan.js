import { MAGAZINE_EVENTS } from '../../data/magazineEvents.js'

export const EVENT_START_PAGE = 3
export const YEAR_REVIEW_PAGES = 2

export function buildMagazinePlan(events = MAGAZINE_EVENTS) {
  const units = []
  let pendingBrief = null

  events.forEach((event) => {
    const isDetailed = event.template === 'DETAILED';

    if (isDetailed) {
      if (pendingBrief) {
        units.push({ type: 'brief', events: [pendingBrief] })
        pendingBrief = null
      }
      units.push({ type: 'detailed', events: [event] })
      return
    }

    if (pendingBrief) {
      units.push({ type: 'brief', events: [pendingBrief, event] })
      pendingBrief = null
      return
    }

    pendingBrief = event
  })

  if (pendingBrief) {
    units.push({ type: 'brief', events: [pendingBrief] })
  }

  const pages = []
  const plannedEvents = []
  let pageIndex = EVENT_START_PAGE

  units.forEach((unit) => {
    if (unit.type === 'detailed') {
      const event = unit.events[0]
      pages.push({ type: 'detailed', event, pageIndex })
      plannedEvents.push({ ...event, pageIndex })
      pageIndex += 2
      return
    }

    const [first, second] = unit.events

    pages.push({
      type: 'brief',
      event: first,
      pageIndex,
      companion: second ?? null,
    })
    plannedEvents.push({ ...first, pageIndex })
    pageIndex += 1

    if (second) {
      pages.push({
        type: 'brief',
        event: second,
        pageIndex,
        companion: first,
      })
      plannedEvents.push({ ...second, pageIndex })
      pageIndex += 1
    } else {
      pages.push({ type: 'filler', pageIndex })
      pageIndex += 1
    }
  })

  const yearReviewPage = pageIndex
  const backCoverPage = yearReviewPage + YEAR_REVIEW_PAGES

  return {
    units,
    pages,
    plannedEvents,
    eventStartPage: EVENT_START_PAGE,
    yearReviewPage,
    backCoverPage,
    totalPages: backCoverPage + 1,
  }
}


/**
 * Development-time invariant checks for the generated magazine page plan.
 * Not executed on render; exposed for tooling / tests.
 */
export function validateMagazinePlan(plan) {
  const errors = []
  const seen = new Set()
  let expectedIndex = EVENT_START_PAGE

  for (const page of plan.pages) {
    const size = page.type === 'detailed' ? 2 : page.type === 'brief' ? 1 : 1
    if (page.pageIndex !== expectedIndex) {
      errors.push(
        `Page sequence mismatch: expected physical index ${expectedIndex}, got ${page.pageIndex} (${page.type} ${page.event?.id ?? ''})`
      )
    }
    if (seen.has(page.pageIndex)) errors.push(`Duplicate physical page index ${page.pageIndex}`)
    seen.add(page.pageIndex)
    expectedIndex += size
  }

  for (const planned of plan.plannedEvents) {
    if (planned.pageIndex === undefined) errors.push(`Planned event ${planned.id} has no pageIndex`)
    if (planned.template !== 'DETAILED' && planned.template !== 'BRIEF') {
      errors.push(`Planned event ${planned.id} has invalid template ${planned.template}`)
    }
  }

  if (plan.yearReviewPage !== expectedIndex) {
    errors.push(`Year in Review page ${plan.yearReviewPage} does not follow expected index ${expectedIndex}`)
  }
  if (plan.backCoverPage !== plan.yearReviewPage + YEAR_REVIEW_PAGES) {
    errors.push('Back cover does not immediately follow Year in Review')
  }
  if (plan.totalPages !== plan.backCoverPage + 1) {
    errors.push(`totalPages ${plan.totalPages} does not equal backCoverPage + 1 (${plan.backCoverPage + 1})`)
  }

  return errors
}

export const MAGAZINE_PLAN = buildMagazinePlan()
