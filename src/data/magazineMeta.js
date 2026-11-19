/**
 * Lightweight magazine metadata used by the homepage cover.
 * Full event content lives in magazineEvents.js and is loaded with the
 * magazine book on demand.
 */

export const MAGAZINE_META = {
  title: 'THE IEEE CHRONICLE',
  edition: 'IEEE-SJCE',
  tagline: 'WHERE IDEAS BECOME STORIES.',
  volume: 'VOL. 01',
  issue: 'ISSUE 01',
  year: 'ACADEMIC YEAR 2025–26',
  span: 'A COLLECTION OF IEEE-SJCE EVENTS · 2023–2026',
  website: 'ieeesjce.org',
}

export const ARCHIVE_PHOTOS = [
  { src: '/photos/gallery/gall11.webp', alt: 'IEEE-SJCE flagship gathering in the auditorium' },
  { src: '/photos/gallery/gall2.webp', alt: 'IEEE-SJCE technical workshop in progress' },
  { src: '/photos/gallery/gall3.webp', alt: 'IEEE-SJCE student community group photograph' },
  { src: '/photos/gallery/gall4.webp', alt: 'IEEE-SJCE prototyping and hardware session' },
  { src: '/photos/gallery/gall5.webp', alt: 'IEEE-SJCE student leaders and members' },
  { src: '/photos/gallery/gall6.webp', alt: 'IEEE-SJCE event evening and celebration' },
  { src: '/photos/gallery/gall8.webp', alt: 'IEEE-SJCE interactive discussion and mentorship' },
  { src: '/photos/gallery/gall9.webp', alt: 'IEEE-SJCE project showcase and demonstrations' },
]

/**
 * Counts shown on the closed-magazine intro.
 * Keep in sync with MAGAZINE_EVENTS in magazineEvents.js.
 */
export const MAGAZINE_SUMMARY = {
  stories: 38,
  features: 18,
  standards: 0,
  years: 4,
  wings: 7,
}

export const MAGAZINE_LAYOUT = {
  eventStartPage: 5,
  yearReviewPages: 2,
  backCoverPages: 1,
}

/**
 * Page count without importing the full event archive. Keep the summary in
 * sync with magazineEvents.js when the issue changes.
 */
export function getMagazinePageCount(summary = MAGAZINE_SUMMARY) {
  const briefEvents = summary.stories - summary.features
  return (
    MAGAZINE_LAYOUT.eventStartPage +
    summary.features * 2 +
    briefEvents +
    MAGAZINE_LAYOUT.yearReviewPages +
    MAGAZINE_LAYOUT.backCoverPages
  )
}
