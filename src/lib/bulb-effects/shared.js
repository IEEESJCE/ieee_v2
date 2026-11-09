import gsap from 'gsap'

/**
 * Take over elements from a section's own entrance animation.
 * Each home section has its own GSAP fade-in (with a ScrollTrigger). When a bulb
 * effect animates the same elements, the two would fight — so stop the section's
 * tweens + their ScrollTriggers and clear the inline styles they left behind
 * (a "from opacity 0" tween that never played would otherwise keep things hidden).
 */
export function takeOver(elements) {
  const els = Array.from(elements).filter(Boolean)
  if (!els.length) return
  gsap.getTweensOf(els).forEach((tween) => {
    tween.scrollTrigger?.kill()
    tween.kill()
  })
  gsap.set(els, { clearProps: 'transform,opacity,filter,visibility' })
}
