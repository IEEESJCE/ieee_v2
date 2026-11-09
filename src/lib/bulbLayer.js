import { sectionScrollTop } from './bulbPoses'

/* ═════════════════════════════════════════════════════════════
   Which layer the 3D bulb is drawn on.

   Hero: the bulb stays BEHIND the hero (title + buttons are readable on top).
   From Events (section 2) on, desktop only: the bulb moves IN FRONT of the
   sections, so it sits above the tiles/cards (its glass is see-through).
   Phones keep it behind everywhere, so it never covers full-width card text.

   The switch happens the moment Events starts sliding in from the bottom of the
   screen. By then the hero has completely faded out (the "fade gap" in
   HomePage.jsx), so the bulb never jumps over visible hero text.

   Checked on every scroll/resize against where Events is RIGHT NOW (one cheap
   measurement), so it's always correct even after the page layout changes.
   It only toggles a class; the z-index lives in bulb-scene.css.
   Returns a cleanup function.
   ═════════════════════════════════════════════════════════════ */

export function installBulbLayer() {
  const canvas = document.querySelector('.bulb-canvas')
  const events = document.querySelector('.nb-events-wrapper')
  if (!canvas || !events) return () => {}

  const update = () => {
    // in front once the top of Events has reached the bottom of the screen
    const front = window.scrollY >= sectionScrollTop(events) - window.innerHeight
    canvas.classList.toggle('is-front', front)
  }

  window.addEventListener('scroll', update, { passive: true })
  window.addEventListener('resize', update)
  update()

  return () => {
    window.removeEventListener('scroll', update)
    window.removeEventListener('resize', update)
    canvas.classList.remove('is-front')
  }
}
