/* ═════════════════════════════════════════════════════════════
   bulbBus — the 3D bulb's live state, shared with the rest of the page.

   A plain object (NOT React state), so updating it every frame never
   re-renders anything. BulbScene writes to it once per rendered frame;
   section effects read it, or subscribe to be called each frame.

   bulb.x, bulb.y   glass centre on screen, in CSS pixels (viewport coords)
   bulb.radius      glass radius on screen, in px
   bulb.glow        0…1 visible light (on/off level × pose glow × fade)
   bulb.visible     false once the bulb has faded out (e.g. at Mentors)
   bulb.ready       true once WebGL started successfully
   bulb.view        camera/layout numbers BulbScene uses (for poseToScreen)
   ═════════════════════════════════════════════════════════════ */

export const bulb = {
  x: 0,
  y: 0,
  radius: 0,
  glow: 0,
  visible: false,
  ready: false,
  view: null,
  flash: 0, // extra brightness from a flicker (decays back to 0 inside BulbScene)
}

let wake = null

/** BulbScene registers how to restart its render loop (it rests when nothing changes). */
export function setWake(fn) {
  wake = fn
}

/**
 * Make the bulb flicker brighter for a moment (e.g. when a lightning bolt fires).
 * `strength` ~0.5–1; BulbScene fades it back out over ~0.25 s.
 */
export function flashBulb(strength = 0.8) {
  bulb.flash = Math.max(bulb.flash, strength)
  wake?.()
}

const listeners = new Set()

/** Call `fn(bulb)` after every rendered frame. Returns an unsubscribe function. */
export function subscribe(fn) {
  listeners.add(fn)
  return () => listeners.delete(fn)
}

/** BulbScene calls this after updating `bulb` for a frame. */
export function publish() {
  listeners.forEach((fn) => fn(bulb))
}

// Local position of the glass centre inside the bulb model (matches BulbScene's geometry)
export const GLASS_CENTER_Y = 0.35
export const GLASS_RADIUS = 1

/**
 * Where a pose puts the glass centre on screen (px), using the SAME numbers BulbScene
 * renders with (bulb.view). Scroll-scrubbed effects use this instead of the live bulb,
 * because the live bulb trails behind the scroll (damping) and would make them jitter.
 * Ignores tilt (it only moves the glass centre a little).
 */
export function poseToScreen(pose) {
  const v = bulb.view
  if (!v) return { x: window.innerWidth / 2, y: window.innerHeight / 2, radius: 0 }
  const pxPerUnit = window.innerHeight / v.visibleH
  const scale = Math.min((pose.s ?? 1) * v.sizeFactor, v.maxScale)
  const worldX = (pose.x ?? 0) * (v.visibleW / 2) * v.sideScale
  const worldY = (pose.y ?? 0) * (v.visibleH / 2) + v.navOffset + GLASS_CENTER_Y * scale
  return {
    x: window.innerWidth / 2 + worldX * pxPerUnit,
    y: window.innerHeight / 2 - worldY * pxPerUnit,
    radius: GLASS_RADIUS * scale * pxPerUnit,
  }
}

/**
 * The opposite of poseToScreen: the pose { x, y, s } that puts the glass centre at
 * screen point (px, py) with a glass radius of `radius` px. Same numbers as above.
 */
export function screenToPose(px, py, radius) {
  const v = bulb.view
  if (!v) return { x: 0, y: 0, s: 1 }
  const pxPerUnit = window.innerHeight / v.visibleH
  const scale = Math.min(radius / (GLASS_RADIUS * pxPerUnit), v.maxScale)
  const worldX = (px - window.innerWidth / 2) / pxPerUnit
  const worldY = (window.innerHeight / 2 - py) / pxPerUnit
  return {
    x: worldX / ((v.visibleW / 2) * v.sideScale),
    y: (worldY - v.navOffset - GLASS_CENTER_Y * scale) / (v.visibleH / 2),
    s: scale / v.sizeFactor,
  }
}
