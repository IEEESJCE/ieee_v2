import { bulb, subscribe } from '../bulbBus'

/* ═════════════════════════════════════════════════════════════
   Shared helper: elements lit by the bulb's proximity.
   Used by Hall of Fame (plaques) and What We Stand For (tabs + panel).

   Every frame, each element matching `itemSelector` inside `wrapperSelector`
   gets three CSS variables (styled in home-bulb.css):
     --lit      0…1  how much bulb light reaches it (closer = brighter)
     --lx, --ly      where the bulb is, relative to the element (in %), so a
                     highlight can sit on the side facing the bulb
   Elements are never dimmed: --lit only ADDS a glow on top of the normal look.

   Desktop: the light source is the bulb's LIVE screen position (bulbBus), scaled
   by how bright the bulb is right now (bulb.glow), so a flicker shows too.
   Phones: the bulb is off to the side, so the "source" is the middle of the
   screen — each element lights up as it passes it.

   Elements are looked up again every frame (cheap), because some sections
   re-create them — e.g. What We Stand For swaps its panel when a tab is clicked.
   Updates run at most once per animation frame, triggered by the bulb's own
   frames (subscribe) AND by scrolling (elements move even when the bulb doesn't).
   Returns a cleanup function (or null if the section isn't on the page).
   ═════════════════════════════════════════════════════════════ */

const VARS = ['--lit', '--lx', '--ly']
const clamp01 = (v) => Math.min(1, Math.max(0, v))

export function proximityGlow({ wrapperSelector, itemSelector, isMobile }) {
  const wrapper = document.querySelector(wrapperSelector)
  if (!wrapper || !wrapper.querySelector(itemSelector)) return null

  // last values written per element, so unchanged ones aren't restyled every frame
  let last = new WeakMap()
  let touched = new Set() // every element we've styled, to clean up later
  let rafId = 0

  const update = () => {
    rafId = 0
    const items = wrapper.querySelectorAll(itemSelector)
    const w = wrapper.getBoundingClientRect()
    const sectionOnScreen = w.bottom > 0 && w.top < window.innerHeight

    // the light source and how far its light reaches (px)
    const source = isMobile
      ? { x: window.innerWidth / 2, y: window.innerHeight / 2, radius: 0, glow: 1 }
      : { x: bulb.x, y: bulb.y, radius: bulb.radius, glow: bulb.visible ? bulb.glow : 0 }
    const reach = isMobile ? window.innerHeight * 0.5 : Math.max(window.innerWidth * 0.5, 480)

    items.forEach((el) => {
      let lit = 0
      let lx = 50
      let ly = 50
      if (sectionOnScreen && source.glow > 0) {
        const r = el.getBoundingClientRect()
        // distance from the bulb's edge to the NEAREST point of the element
        const nx = Math.min(Math.max(source.x, r.left), r.right)
        const ny = Math.min(Math.max(source.y, r.top), r.bottom)
        const d = Math.max(0, Math.hypot(source.x - nx, source.y - ny) - source.radius)
        const t = clamp01(d / reach)
        lit = source.glow * (1 - t) * (1 - t) // eases off smoothly with distance
        // highlight position: the bulb's spot relative to the element, kept near its edges
        lx = Math.min(130, Math.max(-30, ((source.x - r.left) / r.width) * 100))
        ly = Math.min(130, Math.max(-30, ((source.y - r.top) / r.height) * 100))
      }

      const prev = last.get(el)
      if (prev && Math.abs(prev.lit - lit) < 0.005 && Math.abs(prev.lx - lx) < 1 && Math.abs(prev.ly - ly) < 1) return
      last.set(el, { lit, lx, ly })
      touched.add(el)
      el.style.setProperty('--lit', lit.toFixed(3))
      el.style.setProperty('--lx', `${lx.toFixed(1)}%`)
      el.style.setProperty('--ly', `${ly.toFixed(1)}%`)
    })
  }

  // ask for one update on the next frame (several requests in a frame → one update)
  const schedule = () => {
    if (!rafId) rafId = requestAnimationFrame(update)
  }

  const unsubscribe = subscribe(schedule)
  window.addEventListener('scroll', schedule, { passive: true })
  window.addEventListener('resize', schedule)
  // a clicked tab re-creates the panel: style the new one straight away
  wrapper.addEventListener('click', schedule)
  schedule()

  return () => {
    unsubscribe()
    window.removeEventListener('scroll', schedule)
    window.removeEventListener('resize', schedule)
    wrapper.removeEventListener('click', schedule)
    cancelAnimationFrame(rafId)
    touched.forEach((el) => VARS.forEach((v) => el.style.removeProperty(v)))
    touched = new Set()
    last = new WeakMap()
  }
}
