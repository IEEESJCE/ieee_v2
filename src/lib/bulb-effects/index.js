/* ─────────────────────────────────────────────
   Section effects that react to the 3D bulb.

   Each effect module exports `setup({ isMobile })` and returns a cleanup
   function. HomePage calls installBulbEffects() inside gsap.matchMedia once
   the bulb is running, and never under prefers-reduced-motion.

   Effects are added one phase at a time (see the plan):
     Phase 1  eventsEmerge       — Events cards come out from behind the bulb
     Phase 2  flagshipBolts      — lightning from the bulb to the Flagship Events posters
     Phase 3  achievementsLight  — Hall of Fame cards lit by the bulb's proximity
     Phase 4  standForReveal     — spotlight pose + slow reveal
     Phase 5  societiesOrbit     — society tiles emerge around the centred bulb
   ───────────────────────────────────────────── */

import eventsEmerge from './eventsEmerge'
import flagshipBolts from './flagshipBolts'

const EFFECTS = [
  eventsEmerge,
  flagshipBolts,
  // later phases are added here
]

export function installBulbEffects(options) {
  const cleanups = EFFECTS.map((setup) => setup(options)).filter(Boolean)
  return () => cleanups.forEach((fn) => fn())
}
