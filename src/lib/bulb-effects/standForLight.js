import { proximityGlow } from './proximityGlow'

/* ═════════════════════════════════════════════════════════════
   Phase 4 — What We Stand For: the tabs and the photo panel lit by the bulb.

   The bulb parks in the empty top-right corner (right of the heading, above the
   panel), tilted so its glass points down-left at the section like a lamp
   (pose in bulbPoses.js). It never sits on top of any text. The section holds
   briefly so the bulb rests there while you read.
   The glow itself is the shared proximityGlow helper; the look is in home-bulb.css.
   ═════════════════════════════════════════════════════════════ */

export default function standForLight({ isMobile }) {
  return proximityGlow({
    wrapperSelector: '.nb-standfor-wrapper',
    itemSelector: '.stf-tab, .stf-panel',
    isMobile,
  })
}
