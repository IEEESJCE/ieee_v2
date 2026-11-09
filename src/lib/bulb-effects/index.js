/* ─────────────────────────────────────────────
   Section effects that react to the 3D bulb.

   Each effect module exports `setup({ isMobile })` and returns a cleanup
   function. HomePage calls installBulbEffects() inside gsap.matchMedia once
   the bulb is running, and never under prefers-reduced-motion.

   Effects are added one phase at a time (see the plan):
     Phase 1  eventsEmerge       — Events cards come out from behind the bulb
     Phase 2  flagshipBolts      — lightning from the bulb to the Flagship Events posters
     Phase 3  achievementsLight  — bulb sweeps over the Hall of Fame plaques, lighting them
     Phase 4  standForLight      — bulb tilted like a lamp in the top-right corner; tabs + panel glow
     Phase 5  societiesEmerge    — wing tiles come out of the big centred bulb, then it shrinks away
   ───────────────────────────────────────────── */

import eventsEmerge from './eventsEmerge'
import flagshipBolts from './flagshipBolts'
import achievementsLight from './achievementsLight'
import standForLight from './standForLight'
import societiesEmerge from './societiesEmerge'

const EFFECTS = [
  eventsEmerge,
  flagshipBolts,
  achievementsLight,
  standForLight,
  societiesEmerge,
]

export function installBulbEffects(options) {
  const cleanups = EFFECTS.map((setup) => setup(options)).filter(Boolean)
  return () => cleanups.forEach((fn) => fn())
}
