import { proximityGlow } from './proximityGlow'

/* ═════════════════════════════════════════════════════════════
   Phase 3 — Hall of Fame: plaques lit by the bulb's proximity.

   During the Hall of Fame hold the bulb sweeps left → right over the plaque row
   (holdTo in bulbPoses.js), so the plaques light up one after another as it passes.
   The glow itself is the shared proximityGlow helper; the look is in home-bulb.css.
   ═════════════════════════════════════════════════════════════ */

export default function achievementsLight({ isMobile }) {
  return proximityGlow({
    wrapperSelector: '.nb-achievements-wrapper',
    itemSelector: '.ach-plaque',
    isMobile,
  })
}
