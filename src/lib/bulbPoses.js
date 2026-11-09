import { bulb, GLASS_CENTER_Y, screenToPose } from './bulbBus'

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
   fromLogo   (hero only) the bulb is hidden at the top of the page and fades in ON the
              bulb painted in the centre of the hero picture (ieee-bg.png), same place and
              size, while the hero fades away; then it glides on to the next section
   fromEnter  if true, the bulb only starts blending into this pose when the section
              begins to ENTER the screen (its top at the bottom of the screen), instead
              of right after the previous section's stop
   holdTo     (held sections only) where the bulb ends up at the END of the hold, e.g.
              { x: 0.7 } — during the hold it glides from the pose to here, scroll-linked.
              Without it the bulb stays still during the hold.
   holdSteps  (held sections only) like holdTo but in several stages: a list of
              { at, ...changes }, `at` = fraction of the hold (0…1). Each step keeps
              everything from the step before and changes only what it lists, e.g.
              [{ at: 0.7 }, { at: 1, s: 0.3, fade: 0 }] = stay put until 70%, then shrink away.
   center     if true, x and y are worked out so the GLASS sits exactly in the middle
              of the screen (at every size, and for every step's size)
   mobile     overrides used on phones (≤767px) instead of the values above
   ───────────────────────────────────────────── */
export const BULB_POSES = [
  // hero: not shown at all; fades in on the picture's painted bulb as you scroll (fromLogo)
  { selector: '.nb-section-landing',      fromLogo: true, tilt: 0,      glow: 0.7 },
  { selector: '.nb-events-wrapper',       x: 0.62,  y: 0,     s: 0.62, tilt: -0.12, glow: 1 },    // right, smaller
  { selector: '.nb-milestones-wrapper',   x: 0.3,   y: 0.6,   s: 0.45, tilt: 0.1,   glow: 1 },    // Flagship Events: up top, right of the heading — bolts strike down onto the posters
  // Hall of Fame (desktop): arrives left of the plaque row, then during the hold sweeps
  // left → right over all the plaques (they light up as it passes, achievementsLight.js)
  // before moving on to What We Stand For on the right. Phones: stays left, no sweep.
  { selector: '.nb-achievements-wrapper', x: -0.8,  y: 0.3,   s: 0.5,  tilt: 0.2,   glow: 1,
    holdTo: { x: 0.8, tilt: -0.15 },
    mobile: { x: -0.6, y: -0.05, s: 0.66 } },
  // What We Stand For (desktop): small, in the empty top-right corner (right of the heading,
  // above the photo panel), turned ~135° so the glass points down-left at the tabs and panel
  // like a lamp. Placed so it never covers any text. Phones: the old pose.
  { selector: '.nb-standfor-wrapper',     x: 0.42,  y: 0.72,  s: 0.45, tilt: 2.36,  glow: 1,
    mobile: { x: 0.62, y: 0, s: 0.62, tilt: -0.15 } },
  // Our Societies: the bulb grows and sits in the exact centre of the screen. During the
  // hold (desktop) the wing tiles come out of it one by one (bulb-effects/societiesEmerge.js),
  // then the bulb shrinks back into the centre and fades out, so it never stays on top of
  // tile text. Phones: big and centred behind the content, no hold.
  { selector: '.nb-societies-wrapper',    center: true, s: 1.3, tilt: 0, glow: 1,
    holdSteps: [{ at: 0.72 }, { at: 1, s: 0.25, glow: 0.4, fade: 0 }],
    mobile: { s: 0.9 } },
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
  '.nb-achievements-wrapper': { desktop: 1.2, mobile: 0 }, // the bulb sweeps over the plaques (desktop only)
  '.nb-standfor-wrapper': { desktop: 0.5, mobile: 0 }, // the bulb rests in its corner, lighting the section (desktop only)
  '.nb-societies-wrapper': { desktop: 1.2, mobile: 0 }, // wing tiles come out of the centred bulb, then it shrinks away
}

/** Hold length in px for a section (0 if it has none). */
export function holdPx(selector) {
  const h = HOLDS[selector]
  if (!h) return 0
  return Math.round(window.innerHeight * (isMobile() ? h.mobile : h.desktop))
}

const isMobile = () => window.innerWidth <= 767

/**
 * The pose y that puts the glass centre exactly in the middle of the screen for size s.
 * Same numbers BulbScene renders with (bulb.view): the bulb's origin sits at
 * y·(visibleH/2) + navOffset, and the glass centre GLASS_CENTER_Y·scale above that.
 */
function centredY(s) {
  const v = bulb.view
  if (!v) return 0
  const scale = Math.min(s * v.sizeFactor, v.maxScale)
  return -(v.navOffset + GLASS_CENTER_Y * scale) / (v.visibleH / 2)
}

/** A pose entry with the phone overrides applied (on phones) and helper fields removed. */
function resolvePose({ mobile, ...pose }) {
  return isMobile() && mobile ? { ...pose, ...mobile } : pose
}

/** Fill in x/y for a `center: true` pose (see centredY). */
function place(pose, center) {
  return center ? { ...pose, x: 0, y: centredY(pose.s ?? 1) } : pose
}

/** The pose for one section (by its selector), with defaults filled in. */
export function getPose(selector) {
  const p = BULB_POSES.find((pose) => pose.selector === selector)
  if (!p) return null
  const { center, ...pose } = resolvePose(p)
  delete pose.fromLogo
  delete pose.holdTo // hold-only fields, not part of the pose itself
  delete pose.holdSteps
  return place({ fade: 1, ...pose }, center)
}

// Document scroll position at which a section's top reaches the top of the screen.
// GSAP wraps pinned sections in a .pin-spacer that keeps their place in the page, so measure that.
export function sectionScrollTop(el) {
  const box = el.parentElement?.classList.contains('pin-spacer') ? el.parentElement : el
  return box.getBoundingClientRect().top + window.scrollY
}

/* The hero picture (ieee-bg.png, 1672 × 940, shown with background-size: cover,
   centred) has a flat bulb painted in the middle of the IEEE logo:
   glass centre ≈ (837, 480) px, glass radius ≈ 100 px, in the image's own pixels. */
const BG_W = 1672
const BG_H = 940
const LOGO_BULB = { x: 837, y: 480, r: 100 }

/** Where the painted bulb is on screen (px) while the hero is pinned at the top. */
function logoBulbOnScreen(landing) {
  const bg = landing.querySelector('.nb-bg')
  if (!bg) return null
  const box = bg.getBoundingClientRect()
  const top = box.top - landing.getBoundingClientRect().top // inside the hero
  const k = Math.max(box.width / BG_W, box.height / BG_H) // cover scale
  const imgLeft = box.left + (box.width - BG_W * k) / 2
  const imgTop = top + (box.height - BG_H * k) / 2
  return { x: imgLeft + LOGO_BULB.x * k, y: imgTop + LOGO_BULB.y * k, r: LOGO_BULB.r * k }
}

/**
 * Hero stops for `fromLogo`: hidden on the painted bulb at the top of the page, then
 * fully visible on it once the hero has faded away (= when the next section starts
 * coming in). The hero moves up a little first (HomePage: its fake scroll on tall
 * heroes) and while fading (the fade's y shift), so the stops follow it.
 */
function logoStops(landing, pose) {
  const p = logoBulbOnScreen(landing)
  const next = document.querySelector(BULB_POSES[1].selector)
  if (!p || !next) return []
  const inner = landing.querySelector('.nb-section-inner')
  const fakeScroll = !isMobile() && inner ? Math.max(0, inner.offsetHeight - window.innerHeight) : 0
  const top = sectionScrollTop(landing) // the hero's top on screen at scroll 0
  const pinEnd = top + fakeScroll // the hero starts fading here
  const shownAt = Math.max(pinEnd + 1, sectionScrollTop(next) - window.innerHeight)
  const hidden = (y, at) => ({ ...pose, ...screenToPose(p.x, y, p.r), at, fade: 0 })
  const stops = [hidden(top + p.y, 0)]
  // the hero scrolls normally until its top reaches the top of the screen (it's pinned
  // from there), then a tall hero moves up by fakeScroll — the hidden bulb follows…
  if (top > 0) stops.push(hidden(p.y, top))
  if (fakeScroll > 0) stops.push(hidden(p.y - fakeScroll, pinEnd))
  // …then it fades in exactly as the hero fades out. HomePage fades the hero with
  // ease 'power2.in' (progress t → t²) and moves it up 40px (20px on phones) on the
  // same curve, so a few in-between stops follow that curve.
  const fadeShift = isMobile() ? 20 : 40
  for (const t of [0.25, 0.5, 0.75, 1]) {
    const e = t * t
    stops.push({
      ...pose,
      ...screenToPose(p.x, p.y - fakeScroll - fadeShift * e, p.r),
      at: pinEnd + (shownAt - pinEnd) * t,
      fade: e,
    })
  }
  return stops
}

/**
 * Scroll position (px) where the bulb switches ON. It stays off in the hero and lights
 * up as it arrives at the 2nd section (Events): 85% of the way there, so the damped
 * glide has nearly landed. Scrolling back above this turns it off again.
 */
export function getLightOnAt() {
  const el = document.querySelector(BULB_POSES[1].selector)
  return el ? sectionScrollTop(el) * 0.85 : 0
}

/** Real section positions → bulb stops [{ at, x, y, s, tilt, glow, fade }] for BulbScene. */
export function getBulbStops() {
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight
  const stops = []
  for (const entry of BULB_POSES) {
    const { selector, fromEnter, fromLogo, holdTo, holdSteps, center, ...pose } = resolvePose(entry)
    const el = document.querySelector(selector)
    if (!el) continue
    if (fromLogo) {
      stops.push(...logoStops(el, { fade: 1, ...pose }))
      continue
    }
    let at = Math.min(sectionScrollTop(el), maxScroll)
    if (selector === '.nb-section-landing') at = 0
    if (selector === 'footer.ft') at = maxScroll

    // fromEnter: keep the previous pose until this section starts entering the screen,
    // so the blend (e.g. the fade-out at Mentors) happens while it slides in
    const prev = stops[stops.length - 1]
    const enterAt = at - window.innerHeight
    if (fromEnter && prev && enterAt > prev.at) stops.push({ ...prev, at: enterAt })

    const stop = place({ fade: 1, ...pose, at }, center)
    stops.push(stop)
    // a held section gets more stops during its hold: by default one identical stop at
    // the end (the bulb stays put while the section's effect plays); holdTo moves it by
    // the end (a sweep); holdSteps moves it in stages
    const hold = holdPx(selector)
    if (hold) {
      let current = stop
      for (const { at: f, ...change } of holdSteps ?? [{ at: 1, ...holdTo }]) {
        current = place({ ...current, ...change, at: Math.min(at + hold * f, maxScroll) }, center)
        stops.push(current)
      }
    }
  }
  return stops
}
