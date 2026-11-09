/* ─────────────────────────────────────────────
   Bulb scroll choreography — one pose per home page section.
   Shared by HomePage (which passes getBulbStops to BulbScene) and the
   section effects in src/lib/bulb-effects/ (which need to know where the
   bulb will be for their section).

   x, y  position as a fraction of half the screen (x: -1 left … 1 right, y: -1 bottom … 1 top)
   s     size (1 = normal)
   tilt  sideways lean in radians (+ = counter-clockwise)
   glow  0…1 light strength
   fade  0…1 visibility of the whole bulb (0 = gone, and it stops rendering); defaults to 1
   fromEnter  if true, the bulb only starts blending into this pose when the section
              begins to ENTER the screen (its top at the bottom of the screen), instead
              of right after the previous section's stop
   ───────────────────────────────────────────── */
export const BULB_POSES = [
  { selector: '.nb-section-landing',      x: 0,     y: -0.22, s: 1.12, tilt: 0,     glow: 0.7 },  // hero: big, centred, lower half, lit
  { selector: '.nb-events-wrapper',       x: 0.62,  y: 0,     s: 0.62, tilt: -0.12, glow: 1 },    // right, smaller
  { selector: '.nb-milestones-wrapper',   x: 0.3,   y: 0.6,   s: 0.45, tilt: 0.1,   glow: 1 },    // Flagship Events: up top, right of the heading — bolts strike down onto the posters
  { selector: '.nb-achievements-wrapper', x: -0.6,  y: -0.05, s: 0.66, tilt: 0.2,   glow: 1 },    // stays left
  { selector: '.nb-standfor-wrapper',     x: 0.62,  y: 0,     s: 0.62, tilt: -0.15, glow: 1 },    // back to the right
  { selector: '.nb-societies-wrapper',    x: -0.62, y: 0.05,  s: 0.6,  tilt: 0.18,  glow: 1 },    // our societies: swings left
  // Mentors: the bulb fades out gently WHILE Mentors slides in (fromEnter), staying where
  // it was, and is completely gone (fade 0 → nothing drawn) for Mentors and the footer.
  { selector: '.nb-mentors-wrapper',      x: -0.62, y: 0.05,  s: 0.5,  tilt: 0.18,  glow: 0, fade: 0, fromEnter: true },
  { selector: 'footer.ft',                x: -0.62, y: 0.05,  s: 0.5,  tilt: 0.18,  glow: 0, fade: 0 },
]

/* ─────────────────────────────────────────────
   Holds: sections that stay pinned (still) for extra scrolling after reaching the
   top, so an effect can play while the bulb waits in that section's pose.
   Value = hold length as a fraction of the screen height.
   HomePage's pinning code adds the hold; getBulbStops keeps the bulb still during it.
   ───────────────────────────────────────────── */
export const HOLDS = {
  '.nb-events-wrapper': { desktop: 0.9, mobile: 0.6 }, // event cards come out of the bulb (right → left)
  '.nb-milestones-wrapper': { desktop: 0.6, mobile: 0.45 }, // lightning from the bulb to each Flagship Events poster
}

/** Hold length in px for a section (0 if it has none). */
export function holdPx(selector) {
  const h = HOLDS[selector]
  if (!h) return 0
  const mobile = window.innerWidth <= 767
  return Math.round(window.innerHeight * (mobile ? h.mobile : h.desktop))
}

/** The pose for one section (by its selector), with defaults filled in. */
export function getPose(selector) {
  const p = BULB_POSES.find((pose) => pose.selector === selector)
  return p ? { fade: 1, ...p } : null
}

// Document scroll position at which a section's top reaches the top of the screen.
// GSAP wraps pinned sections in a .pin-spacer that keeps their place in the page, so measure that.
export function sectionScrollTop(el) {
  const box = el.parentElement?.classList.contains('pin-spacer') ? el.parentElement : el
  return box.getBoundingClientRect().top + window.scrollY
}

/** Real section positions → bulb stops [{ at, x, y, s, tilt, glow, fade }] for BulbScene. */
export function getBulbStops() {
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight
  const stops = []
  for (const { selector, fromEnter, ...pose } of BULB_POSES) {
    const el = document.querySelector(selector)
    if (!el) continue
    let at = Math.min(sectionScrollTop(el), maxScroll)
    if (selector === '.nb-section-landing') at = 0
    if (selector === 'footer.ft') at = maxScroll

    // fromEnter: keep the previous pose until this section starts entering the screen,
    // so the blend (e.g. the fade-out at Mentors) happens while it slides in
    const prev = stops[stops.length - 1]
    const enterAt = at - window.innerHeight
    if (fromEnter && prev && enterAt > prev.at) stops.push({ ...prev, at: enterAt })

    const stop = { fade: 1, ...pose, at }
    stops.push(stop)
    // a held section gets a second, identical stop at the end of its hold,
    // so the bulb stays put while the section's effect plays
    const hold = holdPx(selector)
    if (hold) stops.push({ ...stop, at: Math.min(at + hold, maxScroll) })
  }
  return stops
}
