/* ═════════════════════════════════════════════════════════════
   Hero backdrop — the circuit picture (ieee-bg.png) drawn UNDER the 3D bulb.

   Why: inside the hero, the picture sits on top of the bulb canvas, so the bulb
   could only show through a soft hole cut in it (that hole looked blurry).
   With the bulb running, HomePage instead renders a copy of the picture as a
   fixed layer just BEFORE the canvas, and hides the one inside the hero:

       page background → circuit picture → 3D bulb → hero text and buttons

   This keeps the copy lined up with the hero every frame: same box as the hero's
   .nb-bg (so it follows the hero's pinning, its scroll-up on tall screens and its
   fade-out movement) and the same opacity as the hero panel.
   Returns a cleanup function.
   ═════════════════════════════════════════════════════════════ */

export function installHeroBackdrop(backdrop) {
  const landing = document.querySelector('.nb-section-landing')
  const heroBg = landing?.querySelector('.nb-bg')
  if (!backdrop || !heroBg) return () => {}

  let rafId = 0
  const sync = () => {
    rafId = 0
    const opacity = parseFloat(getComputedStyle(landing).opacity)
    // the hero has faded away: stop drawing the picture at all
    backdrop.style.visibility = opacity > 0 ? 'visible' : 'hidden'
    if (opacity <= 0) return
    const r = heroBg.getBoundingClientRect()
    Object.assign(backdrop.style, {
      top: `${r.top}px`,
      left: `${r.left}px`,
      width: `${r.width}px`,
      height: `${r.height}px`,
    })
    backdrop.style.setProperty('--hero-fade', String(opacity))
  }
  const schedule = () => {
    if (!rafId) rafId = requestAnimationFrame(sync)
  }

  window.addEventListener('scroll', schedule, { passive: true })
  window.addEventListener('resize', schedule)
  // layout can still shift right after load (pinning, fonts), so re-check for a moment
  const settle = setInterval(schedule, 250)
  const stopSettle = setTimeout(() => clearInterval(settle), 3000)
  sync()

  return () => {
    window.removeEventListener('scroll', schedule)
    window.removeEventListener('resize', schedule)
    clearInterval(settle)
    clearTimeout(stopSettle)
    cancelAnimationFrame(rafId)
  }
}
