import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js'
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js'
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js'
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { bulb, publish, setWake, GLASS_CENTER_Y, GLASS_RADIUS } from '../lib/bulbBus'
import '../styles/bulb-scene.css'

/* ═════════════════════════════════════════════════════════════
   BulbScene — the IEEE logo bulb, built entirely in code with Three.js.
   Rendered into a fixed, full-screen, TRANSPARENT canvas (only the bulb and
   its glow are drawn; the page background shows through everywhere else).
   It sits behind the hero, and in front of the sections from Events on
   (desktop — see bulbLayer.js). pointer-events: none, so it never blocks
   clicks or scrolling.

   The bulb starts OFF (dark blue filament, clear glass) and switches ON
   shortly after the page has loaded: one quick flicker, then it warms up
   to a bright yellow filament glowing inside a softly lit yellow glass.

   Everything that changes with the light reads ONE number, `level`
   (0 = off, 1 = fully on), so the switch-on animation only animates that.
   ═════════════════════════════════════════════════════════════ */


const THEME = {
  dark: {
    glassOff: '#4a5a70', // dark tint: clear glass on a dark background shouldn't look milky
    glassOn: '#ffe9a8',  // warm light-yellow glass when lit
    rimOff: '#7cc4ff',
    rimOn: '#fff1b8',
    filamentOff: '#1e3a8a', // dark IEEE blue
    filamentOn: '#ffd54a',  // bright yellow
    filamentBoost: 2.6,     // >1 so the lit filament is bright enough to bloom
    halo: '#ffd877',
    haloStrength: 0.3,
    metal: '#e4e8ee', // bright silver
    bloom: 0.75,
  },
  light: {
    glassOff: '#93b4e8',
    glassOn: '#ffe7a0',
    rimOff: '#2563EB',
    rimOn: '#f2b705',
    filamentOff: '#1e3a8a',
    filamentOn: '#f5a700', // deeper amber so it reads on a light background
    filamentBoost: 1.0, // no boost: keeps a true amber that's visible on white
    halo: '#ffc21a',
    haloStrength: 0.5,
    metal: '#c9d0d9', // silver, a touch darker so it stands out on white
    bloom: 0.4,
  },
}

// Switch-on timing
const TURN_ON_DELAY = 0.8 // seconds after the page has fully loaded (no rise)
const WARMUP = 1.1        // seconds from first flicker to full brightness

// Rise-in entrance (technique from the reference: one-time float-up, ease-out cubic)
const RISE_DUR = 2.0       // seconds
const RISE_START_Y = -6.5  // world units below the final position (fully off-screen)
const SWITCH_AFTER_RISE = 0.25 // seconds pause between landing and the flicker
const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3)

/* Light level over time after switch-on starts (t in seconds) → 0…1.
   One dim flicker, a short dark gap, then a smooth warm-up. Only one flash,
   well under the "max 3 flashes per second" accessibility limit. */
function flickerLevel(t) {
  if (t < 0) return 0
  if (t < 0.1) return 0.55       // quick dim flash
  if (t < 0.3) return 0.05       // off again
  const k = Math.min((t - 0.3) / (WARMUP - 0.3), 1)
  return 1 - Math.pow(1 - k, 3)  // ease-out warm-up to full
}

/* ─── Geometry builders ─── */

// Glass envelope: a lathe (a 2D profile spun around the Y axis) — round globe narrowing to a neck
function buildGlass(segments) {
  const pts = []
  // neck (bottom → up)
  pts.push(new THREE.Vector2(0.42, -0.8))
  pts.push(new THREE.Vector2(0.43, -0.7))
  pts.push(new THREE.Vector2(0.47, -0.6))
  // globe: circle centred at (0, 0.35), radius 1, from -60° up to the top (90°)
  const c = 0.35
  for (let deg = -60; deg <= 90; deg += 8) {
    const a = THREE.MathUtils.degToRad(deg)
    pts.push(new THREE.Vector2(Math.max(Math.cos(a), 0.0001), c + Math.sin(a)))
  }
  pts.push(new THREE.Vector2(0.0001, c + 1)) // close the top
  return new THREE.LatheGeometry(pts, segments)
}

// IEEE diamond outline: outer diamond with an inner diamond cut out, extruded slightly
function buildDiamond() {
  const outer = 0.42
  const inner = 0.33
  const shape = new THREE.Shape()
  shape.moveTo(0, outer)
  shape.lineTo(outer, 0)
  shape.lineTo(0, -outer)
  shape.lineTo(-outer, 0)
  shape.closePath()
  const hole = new THREE.Path()
  hole.moveTo(0, inner)
  hole.lineTo(-inner, 0)
  hole.lineTo(0, -inner)
  hole.lineTo(inner, 0)
  hole.closePath()
  shape.holes.push(hole)
  const geo = new THREE.ExtrudeGeometry(shape, { depth: 0.05, bevelEnabled: false })
  geo.translate(0, 0, -0.025) // centre the thickness on z = 0
  return geo
}

// The swirl around the arrow shaft (an ellipse drawn as a thin tube)
function buildSwirl(tubularSegments) {
  const pts = []
  for (let i = 0; i <= 48; i++) {
    const t = (i / 48) * Math.PI * 2
    pts.push(new THREE.Vector3(Math.cos(t) * 0.17, Math.sin(t) * 0.06, Math.sin(t) * 0.05))
  }
  const curve = new THREE.CatmullRomCurve3(pts, true)
  return new THREE.TubeGeometry(curve, tubularSegments, 0.016, 8, true)
}

/* Adds a fresnel rim (bright edges, like light catching curved glass) to a standard material */
function addFresnelRim(material, uniforms) {
  material.onBeforeCompile = (shader) => {
    shader.uniforms.uRimColor = uniforms.uRimColor
    shader.uniforms.uRimStrength = uniforms.uRimStrength
    shader.fragmentShader = shader.fragmentShader
      .replace(
        'void main() {',
        'uniform vec3 uRimColor;\nuniform float uRimStrength;\nvoid main() {'
      )
      .replace(
        '#include <dithering_fragment>',
        `#include <dithering_fragment>
        float rimF = pow(1.0 - abs(dot(normalize(vNormal), normalize(vViewPosition))), 2.5);
        gl_FragColor.rgb += uRimColor * rimF * uRimStrength;
        gl_FragColor.a = max(gl_FragColor.a, rimF * 0.55);`
      )
  }
}

/* Soft round glow (billboard plane with radial falloff) — technique from the reference */
function buildHalo() {
  const mat = new THREE.ShaderMaterial({
    uniforms: {
      uColor: { value: new THREE.Color() },
      uIntensity: { value: 0 },
    },
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }`,
    fragmentShader: `
      uniform vec3 uColor;
      uniform float uIntensity;
      varying vec2 vUv;
      void main() {
        float d = length(vUv - 0.5) * 2.0;
        float a = pow(clamp(1.0 - d, 0.0, 1.0), 2.2) * uIntensity;
        gl_FragColor = vec4(uColor * a, a);
      }`,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  })
  return new THREE.Mesh(new THREE.PlaneGeometry(2, 2), mat)
}

/* Props
   autoRotate  slowly spin the bulb
   layout      'center' (test page) or 'hero' (home: centred in the hero, below the navbar)
   riseIn      rise up from below the screen on load, then switch on
   onReady     called once WebGL started OK (home page uses it to make the hero see-through)
   activeRef   element ref; animation pauses while that element is off-screen
   getStops    () => [{ at, x, y, s, tilt, glow }] — scroll choreography (see below).
               at   = scroll position in px where this pose is reached
               x, y = position as a fraction of half the screen (-1 … 1; y up)
               s    = size (1 = the normal size for this screen)
               tilt = sideways lean in radians, glow = 0…1 light strength
   getLightOnAt  optional () => scroll px. The bulb stays OFF above this scroll position
               and switches on (with its flicker) once you scroll past it; scrolling
               back above it fades the light out again. Without it: on after load. */
export default function BulbScene({ autoRotate = false, layout = 'center', riseIn = false, onReady, activeRef, getStops, getLightOnAt }) {
  const canvasRef = useRef(null)
  // Keep the latest onReady in a ref so a new function each render doesn't restart the scene
  const onReadyRef = useRef(onReady)
  useEffect(() => {
    onReadyRef.current = onReady
  })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const isMobile = window.matchMedia('(max-width: 767px)').matches
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const SEG = isMobile ? 48 : 96 // fewer polygons on phones

    /* ─── Renderer ─── */
    let renderer
    try {
      // alpha: true → the canvas is see-through wherever nothing is drawn
      renderer = new THREE.WebGLRenderer({ canvas, antialias: !isMobile, alpha: true })
    } catch {
      return // WebGL unavailable — leave the page exactly as it is
    }
    const dpr = Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2)
    renderer.setPixelRatio(dpr)
    renderer.setSize(window.innerWidth, window.innerHeight, false)
    renderer.setClearColor(0x000000, 0) // clear to fully transparent
    renderer.toneMapping = THREE.NoToneMapping

    /* ─── Scene, camera, lights ─── */
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 100)
    camera.position.set(0, 0, 8)

    // Soft studio reflections so the metal base and glass look real (generated, no files)
    const pmrem = new THREE.PMREMGenerator(renderer)
    const envTexture = pmrem.fromScene(new RoomEnvironment(), 0.04).texture
    scene.environment = envTexture

    scene.add(new THREE.AmbientLight(0xffffff, 0.6))
    const keyLight = new THREE.DirectionalLight(0xffffff, 1.2)
    keyLight.position.set(3, 4, 5)
    scene.add(keyLight)

    /* ─── Post-processing: SELECTIVE bloom — only the filament glows ───
       (layers technique from the reference)
       1. bloomComposer renders ONLY objects on BLOOM_LAYER (the filament) on black,
          then UnrealBloomPass blurs it into a glow. Its result stays off-screen.
       2. finalComposer renders the normal scene, adds that glow on top (MixPass),
          and OutputPass converts the colours for the screen.
       This way the shiny silver base can never glow, however bright it is. */
    const BLOOM_LAYER = 1
    const bloomRes = new THREE.Vector2(window.innerWidth, window.innerHeight).multiplyScalar(isMobile ? 0.5 : 1)

    const bloomComposer = new EffectComposer(renderer)
    bloomComposer.renderToScreen = false
    bloomComposer.setPixelRatio(dpr)
    bloomComposer.setSize(window.innerWidth, window.innerHeight)
    bloomComposer.addPass(new RenderPass(scene, camera))
    const bloomPass = new UnrealBloomPass(bloomRes, 0, 0.4, 0) // strength set per frame; threshold 0: everything here is filament
    bloomComposer.addPass(bloomPass)

    const mixPass = new ShaderPass(
      new THREE.ShaderMaterial({
        uniforms: {
          baseTexture: { value: null },
          bloomTexture: { value: bloomComposer.renderTarget2.texture },
        },
        vertexShader: `
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }`,
        fragmentShader: `
          uniform sampler2D baseTexture;
          uniform sampler2D bloomTexture;
          varying vec2 vUv;
          void main() {
            vec4 base = texture2D(baseTexture, vUv);
            vec3 glow = texture2D(bloomTexture, vUv).rgb;
            // The canvas is transparent, so the glow must also make its pixels visible:
            // opacity = the bulb's own, or the glow's brightest channel, whichever is more
            float a = max(base.a, max(glow.r, max(glow.g, glow.b)));
            gl_FragColor = vec4(base.rgb + glow, clamp(a, 0.0, 1.0));
          }`,
      }),
      'baseTexture'
    )
    mixPass.needsSwap = true
    // 1×1 black texture used instead of the glow while the bulb is off (skips the glow pass)
    const blackTexture = new THREE.DataTexture(new Uint8Array([0, 0, 0, 255]), 1, 1)
    blackTexture.needsUpdate = true

    const composer = new EffectComposer(renderer)
    composer.setPixelRatio(dpr)
    composer.setSize(window.innerWidth, window.innerHeight)
    composer.addPass(new RenderPass(scene, camera))
    composer.addPass(mixPass)
    composer.addPass(new OutputPass())

    /* ─── Groups (same split as the reference: world = position/scale, bulb = rotation) ─── */
    const worldGroup = new THREE.Group()
    const bulbGroup = new THREE.Group()
    worldGroup.add(bulbGroup)
    scene.add(worldGroup)

    /* ─── Materials ─── */
    const rimUniforms = {
      uRimColor: { value: new THREE.Color() },
      uRimStrength: { value: 0.55 },
    }
    const glassMat = new THREE.MeshPhysicalMaterial({
      transparent: true,
      opacity: 0.04, // mostly clear glass; the fresnel rim gives it its outline
      roughness: 0.08,
      metalness: 0,
      clearcoat: 0.4,
      clearcoatRoughness: 0.05,
      envMapIntensity: 0.25, // weaker studio reflections, so the inside of the globe stays clear
      side: THREE.FrontSide, // front face only: the back face doubled the haze inside the globe
      depthWrite: false,
    })
    addFresnelRim(glassMat, rimUniforms)

    // Polished silver: fully metallic, fairly smooth, reflecting the studio environment
    // (envMapIntensity kept under ~1 so the base's highlights don't trigger the glow)
    const metalMat = new THREE.MeshStandardMaterial({ metalness: 1, roughness: 0.22, envMapIntensity: 0.8 })
    // Filament: unlit colour; dark blue when off, bright (HDR) yellow when on so bloom picks it up
    const filamentMat = new THREE.MeshBasicMaterial({ toneMapped: false })

    /* ─── Bulb parts ─── */
    const glass = new THREE.Mesh(buildGlass(SEG), glassMat)
    glass.renderOrder = 2 // draw glass after the filament so the filament shows through
    bulbGroup.add(glass)

    // Screw base: collar, threaded core with rings, contact tip
    const collar = new THREE.Mesh(new THREE.CylinderGeometry(0.45, 0.43, 0.12, SEG), metalMat)
    collar.position.y = -0.86
    const core = new THREE.Mesh(new THREE.CylinderGeometry(0.38, 0.35, 0.36, SEG), metalMat)
    core.position.y = -1.1
    bulbGroup.add(collar, core)
    ;[-0.97, -1.08, -1.19].forEach((y) => {
      const ring = new THREE.Mesh(new THREE.TorusGeometry(0.38, 0.045, 12, SEG), metalMat)
      ring.rotation.x = Math.PI / 2
      ring.position.y = y
      bulbGroup.add(ring)
    })
    const tip = new THREE.Mesh(new THREE.SphereGeometry(0.17, 24, 12, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2), metalMat)
    tip.position.y = -1.27
    tip.scale.y = 0.7
    bulbGroup.add(tip)

    // Filament = IEEE emblem: diamond outline, arrow (shaft + head), swirl, and the stem down to the base
    const emblem = new THREE.Group()
    emblem.position.y = 0.4
    const diamond = new THREE.Mesh(buildDiamond(), filamentMat)
    const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.022, 0.52, 10), filamentMat)
    shaft.position.y = -0.02
    const head = new THREE.Mesh(new THREE.ConeGeometry(0.07, 0.14, 12), filamentMat)
    head.position.y = 0.27
    const swirl = new THREE.Mesh(buildSwirl(SEG), filamentMat)
    swirl.position.y = 0.02
    emblem.add(diamond, shaft, head, swirl)
    const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.86, 10), filamentMat)
    stem.position.y = -0.42 // from the diamond's bottom tip down into the neck
    bulbGroup.add(emblem, stem)
    // Tag every filament part for the glow pass (they stay on the normal layer too)
    ;[diamond, shaft, head, swirl, stem].forEach((m) => m.layers.enable(BLOOM_LAYER))

    // Warm glow filling the glass (in worldGroup so it doesn't spin; it always faces the camera)
    const halo = buildHalo()
    halo.position.y = 0.38
    halo.scale.setScalar(1.4)
    halo.renderOrder = 1
    worldGroup.add(halo)

    // Warm light inside the bulb — tints the silver base and glass when on
    const bulbLight = new THREE.PointLight(0xffc860, 0, 6, 2)
    bulbLight.position.set(0, 0.4, 0)
    bulbGroup.add(bulbLight)

    // Slight 3/4 turn so it reads as 3D even while static
    bulbGroup.rotation.y = -0.35
    bulbGroup.rotation.x = 0.08

    /* ─── Theme + light level → colours ─── */
    let theme = THEME.dark
    let level = 0 // 0 = off, 1 = fully on
    let canSwitchOn = false // true once the page has loaded (and the rise is done)
    let lightOnAt = 0 // scroll px from which the light may be on (getLightOnAt, see props)
    const tmpA = new THREE.Color()
    const tmpB = new THREE.Color()
    // Glow strength 0…1 (on top of the on/off level). Comes from the scroll poses when
    // present; otherwise softened behind the hero text so the text stays readable.
    let glow = layout === 'hero' ? 0.6 : 1

    const applyLight = () => {
      const t = theme
      // filament: dark blue → bright yellow (multiplied above 1 so it blooms; less when glow is gentle)
      tmpA.set(t.filamentOff)
      // bulb.flash: a momentary flicker brighter (e.g. a lightning bolt firing), 0 normally
      const flash = bulb.flash
      tmpB.set(t.filamentOn).multiplyScalar((1 + (t.filamentBoost - 1) * glow) * (1 + flash * 0.8))
      filamentMat.color.copy(tmpA).lerp(tmpB, level)
      // glass: clear → warm light yellow, slightly more visible when lit
      glassMat.color.copy(tmpA.set(t.glassOff)).lerp(tmpB.set(t.glassOn), level)
      glassMat.opacity = 0.04 + 0.06 * level
      glassMat.emissive.set(t.glassOn).multiplyScalar(0.25 * level * glow * (1 + flash * 2))
      rimUniforms.uRimColor.value.copy(tmpA.set(t.rimOff)).lerp(tmpB.set(t.rimOn), level)
      rimUniforms.uRimStrength.value = 0.55 + 0.2 * level
      // halo + warm point light + bloom all follow the light level
      halo.material.uniforms.uColor.value.set(t.halo)
      halo.material.uniforms.uIntensity.value = t.haloStrength * level * glow * (1 + flash * 1.5)
      bulbLight.intensity = 0.8 * level // warm tint on the silver base
      bloomPass.strength = t.bloom * level * (0.5 + 0.5 * glow) * (1 + flash)
    }

    const applyTheme = () => {
      const isLight = document.documentElement.classList.contains('light')
      theme = isLight ? THEME.light : THEME.dark
      metalMat.color.set(theme.metal)
      // Additive glow is invisible on a white page, so blend normally in light mode
      halo.material.blending = isLight ? THREE.NormalBlending : THREE.AdditiveBlending
      halo.material.needsUpdate = true
      applyLight()
    }
    applyTheme()

    /* ─── Placement: poses → position on screen ───
       A pose is { x, y, s, tilt, glow } in screen-relative units (see props above).
       World units per pixel at the bulb's depth come from the camera's field of view. */
    const view = { visibleW: 1, visibleH: 1, navOffset: 0, sizeFactor: 1, sideScale: 1, maxScale: 1 }
    const measureView = () => {
      view.visibleH = 2 * camera.position.z * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2))
      view.visibleW = view.visibleH * camera.aspect
      const mobileNow = window.innerWidth <= 767
      // content sits below the sticky navbar, so centre on the area under it
      const navH = layout === 'hero' ? document.querySelector('.nb-nav')?.offsetHeight || 0 : 0
      view.navOffset = -(navH / 2) * (view.visibleH / window.innerHeight)
      view.sizeFactor = layout === 'hero' ? (mobileNow ? 0.6 : 0.85) : 1
      // less sideways travel on narrow screens (same rule as the reference)
      view.sideScale = THREE.MathUtils.clamp(window.innerWidth / 1200, 0.5, 1)
      // never wider than ~60% of the screen, so text over it stays readable
      view.maxScale = (0.6 * view.visibleW) / 2
      bulb.view = view // shared so poseToScreen() uses exactly these numbers
    }
    measureView()

    const DEFAULT_POSE = { x: 0, y: 0, s: 1, tilt: 0, glow: layout === 'hero' ? 0.6 : 1, fade: 1 }
    const scrollMode = typeof getStops === 'function'
    let stops = [] // [{ at, x, y, s, tilt, glow }] sorted by `at`
    const recomputeStops = () => {
      if (typeof getLightOnAt === 'function') lightOnAt = getLightOnAt() // sections may have moved
      if (!scrollMode) return
      const list = (getStops() || []).filter((p) => Number.isFinite(p.at))
      // fill in any missing keys (e.g. fade) so blending never hits undefined
      stops = list.map((p) => ({ ...DEFAULT_POSE, ...p })).sort((a, b) => a.at - b.at)
    }
    recomputeStops()

    const smoothstep = (t) => t * t * (3 - 2 * t)
    const lerp = (a, b, t) => a + (b - a) * t
    const POSE_KEYS = ['x', 'y', 's', 'tilt', 'glow', 'fade']
    // Pose for a scroll position: smooth blend between the two surrounding stops
    const blendStops = (scroll, out) => {
      if (scroll <= stops[0].at) return Object.assign(out, stops[0])
      const lastStop = stops[stops.length - 1]
      if (scroll >= lastStop.at) return Object.assign(out, lastStop)
      let i = 0
      while (i < stops.length - 2 && scroll > stops[i + 1].at) i++
      const a = stops[i]
      const b = stops[i + 1]
      const t = smoothstep(THREE.MathUtils.clamp((scroll - a.at) / Math.max(b.at - a.at, 1), 0, 1))
      POSE_KEYS.forEach((k) => (out[k] = lerp(a[k], b[k], t)))
      return out
    }
    const samplePose = (scroll, out) => {
      if (!stops.length) return Object.assign(out, DEFAULT_POSE)
      blendStops(scroll, out)
      if (reducedMotion) {
        // reduced motion: the bulb stays still in the hero pose, but can still fade out (not motion)
        const fade = out.fade
        Object.assign(out, stops[0])
        out.fade = fade
      }
      return out
    }

    const targetPose = { ...DEFAULT_POSE }
    const curPose = { ...DEFAULT_POSE }
    samplePose(window.scrollY, curPose) // start exactly in place (no glide on load)
    glow = curPose.glow

    // Scroll progress 0…1 (damped) — drives the slow turn as you scroll
    const scrollProgress = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      return max > 0 ? THREE.MathUtils.clamp(window.scrollY / max, 0, 1) : 0
    }
    let curP = scrollProgress()
    let spinPhase = 0

    // Dev-only debug handle (stripped from production builds): lets tests read the live pose
    if (import.meta.env.DEV) window.__bulbDebug = { pose: curPose, getStops: () => stops, bulb }
    const SCROLL_TURN = Math.PI * 1.2 // total extra turn from top to bottom of the page

    /* ─── Animation loop ───
       requestAnimationFrame calls `tick` before each screen refresh. We advance
       the spin by speed × elapsed time, move the bulb during its rise, and update
       the light level while it's switching on. When nothing is changing, the loop
       stops to save battery. */
    const render = () => {
      // 1) glow pass: only the filament, on black
      if (level > 0) {
        camera.layers.set(BLOOM_LAYER)
        bloomComposer.render()
        camera.layers.set(0)
      }
      // 2) normal scene + glow on top → screen
      mixPass.uniforms.bloomTexture.value = level > 0 ? bloomComposer.renderTarget2.texture : blackTexture
      composer.render()
    }
    const SPIN_SPEED = 0.15 // radians per second (~42 s per full turn)
    const spinning = autoRotate && !reducedMotion
    let switchOnAt = null // performance.now() time when the switch-on starts
    const rising = riseIn && !reducedMotion
    let riseStartAt = null // performance.now() time when the rise starts
    let rafId = 0
    let last = performance.now()
    let inView = true // is activeRef's element on screen?

    // Rise offset: RISE_START_Y (hidden below) → 0 over RISE_DUR, ease-out
    const riseOffset = (now) => {
      if (!rising) return 0
      if (riseStartAt === null) return RISE_START_Y
      const k = Math.min((now - riseStartAt) / 1000 / RISE_DUR, 1)
      return RISE_START_Y * (1 - easeOutCubic(k))
    }
    const riseDone = (now) => !rising || (riseStartAt !== null && (now - riseStartAt) / 1000 >= RISE_DUR)

    // Apply the current (damped) pose + rise offset to the 3D groups
    const updatePosition = (now) => {
      const scale = Math.min(curPose.s * view.sizeFactor, view.maxScale)
      worldGroup.position.x = curPose.x * (view.visibleW / 2) * view.sideScale
      worldGroup.position.y = curPose.y * (view.visibleH / 2) + view.navOffset + riseOffset(now)
      worldGroup.scale.setScalar(scale)
      bulbGroup.rotation.z = curPose.tilt
      bulbGroup.rotation.y = -0.35 + spinPhase + (scrollMode && !reducedMotion ? curP * SCROLL_TURN : 0)
      // fade: the whole canvas fades out (e.g. at Mentors); 0 = completely gone, no glow left
      const opacity = curPose.fade < 0.002 ? '0' : curPose.fade.toFixed(3)
      if (canvas.style.opacity !== opacity) canvas.style.opacity = opacity
    }
    updatePosition(performance.now())

    /* ─── Share the bulb's live state with the page (bulbBus) ───
       Projects the glass centre from 3D to screen pixels. Plain object writes,
       no React — section effects read `bulb` or subscribe to it. */
    const glassCentre = new THREE.Vector3()
    const publishState = () => {
      bulbGroup.updateMatrixWorld()
      glassCentre.set(0, GLASS_CENTER_Y, 0)
      bulbGroup.localToWorld(glassCentre)
      glassCentre.project(camera) // → normalised screen coords (-1…1)
      bulb.x = (glassCentre.x + 1) * 0.5 * window.innerWidth
      bulb.y = (1 - glassCentre.y) * 0.5 * window.innerHeight
      bulb.radius = GLASS_RADIUS * worldGroup.scale.x * (window.innerHeight / view.visibleH)
      bulb.glow = level * curPose.glow * curPose.fade
      bulb.visible = curPose.fade > 0.002
      publish()
    }

    // Move the current pose part of the way toward the target each frame (damping, like the reference)
    const POSE_EPS = 0.0005
    const stepPose = (dt) => {
      samplePose(window.scrollY, targetPose)
      const k = Math.min(1, dt * 3.2)
      let moving = false
      POSE_KEYS.forEach((key) => {
        const d = targetPose[key] - curPose[key]
        if (Math.abs(d) > POSE_EPS) moving = true
        curPose[key] += d * k
      })
      const pTarget = scrollProgress()
      const dp = pTarget - curP
      if (Math.abs(dp) > POSE_EPS) moving = true
      curP += dp * Math.min(1, dt * 4.5)
      glow = curPose.glow
      return moving
    }

    const lightTarget = (now) => {
      if (switchOnAt === null) return 0
      const t = (now - switchOnAt) / 1000
      if (reducedMotion) return Math.min(Math.max(t / 0.8, 0), 1) // gentle fade, no flicker
      return flickerLevel(t)
    }
    // Settled = fully on after the warm-up, or fully off after fading out
    const lightSettled = (now) =>
      switchOnAt === null ? level === 0 : (now - switchOnAt) / 1000 > WARMUP + 0.05

    // getLightOnAt: on only past that scroll position (e.g. off in the hero)
    const wantsLight = () => canSwitchOn && window.scrollY >= lightOnAt
    const updateSwitch = (now) => {
      if (switchOnAt === null && wantsLight()) switchOnAt = now // start the flicker-on
      else if (switchOnAt !== null && !wantsLight()) switchOnAt = null // fade back out
    }

    const tick = (now) => {
      const dt = Math.min((now - last) / 1000, 0.05) // seconds; clamped after tab switches
      last = now
      if (spinning) spinPhase += SPIN_SPEED * dt
      // a flicker fades back out over ~0.25 s
      if (bulb.flash > 0) bulb.flash = Math.max(0, bulb.flash - dt * 4)
      const moving = stepPose(dt)
      updatePosition(now)
      updateSwitch(now)
      // switched off → the light fades out over ~0.25 s
      level = switchOnAt === null ? Math.max(0, level - dt * 4) : lightTarget(now)
      applyLight()
      publishState()
      // Fully faded out and staying that way → skip drawing and let the loop rest
      // (scrolling wakes it again). Saves the GPU at Mentors and the footer.
      const hidden = curPose.fade < 0.002 && targetPose.fade < 0.002
      if (!hidden) render()
      // keep looping while spinning, moving, rising or still switching on; otherwise stop
      if (!hidden && (spinning || moving || bulb.flash > 0 || !riseDone(now) || !lightSettled(now))) rafId = requestAnimationFrame(tick)
      else rafId = 0
    }
    const startLoop = () => {
      if (rafId || document.hidden || !inView) return
      last = performance.now()
      rafId = requestAnimationFrame(tick)
    }
    // flashBulb() (bulbBus) can wake the loop when it's resting
    setWake(startLoop)
    const stopLoop = () => {
      cancelAnimationFrame(rafId)
      rafId = 0
    }

    render() // first frame: bulb off (and, when rising, still below the screen)
    bulb.ready = true
    publishState()
    onReadyRef.current?.() // WebGL is working

    // Once the page has fully loaded (images, fonts, etc.):
    //   riseIn → rise for RISE_DUR, short pause, then switch on
    //   otherwise → switch on after TURN_ON_DELAY
    //   (with getLightOnAt: only allowed to switch on from then; it actually switches
    //    on once you've scrolled past that point — see updateSwitch)
    let switchTimer = 0
    const onPageLoaded = () => {
      recomputeStops() // images/fonts are in, so section positions are final
      if (rising) {
        riseStartAt = performance.now()
        startLoop()
      }
      const delay = rising ? RISE_DUR + SWITCH_AFTER_RISE : TURN_ON_DELAY
      switchTimer = window.setTimeout(() => {
        canSwitchOn = true
        startLoop()
      }, delay * 1000)
    }
    if (document.readyState === 'complete') onPageLoaded()
    else window.addEventListener('load', onPageLoaded, { once: true })

    if (spinning) startLoop()

    // Pause while the browser tab is hidden (saves battery), resume when visible
    const onVisibility = () => (document.hidden ? stopLoop() : startLoop())
    document.addEventListener('visibilitychange', onVisibility)

    // Pause while the watched element (e.g. the hero) is scrolled off-screen
    let viewObserver = null
    if (activeRef?.current) {
      viewObserver = new IntersectionObserver(([entry]) => {
        inView = entry.isIntersecting
        if (inView) startLoop()
        else stopLoop()
      })
      viewObserver.observe(activeRef.current)
    }

    const themeObserver = new MutationObserver(() => {
      applyTheme()
      render()
    })
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight, false)
      composer.setSize(window.innerWidth, window.innerHeight)
      bloomComposer.setSize(window.innerWidth, window.innerHeight)
      measureView()
      recomputeStops()
      updatePosition(performance.now())
      publishState()
      render()
    }
    window.addEventListener('resize', onResize)

    // Scrolling wakes the loop so the bulb can glide to its new pose
    const onScroll = () => startLoop()
    if (scrollMode) window.addEventListener('scroll', onScroll, { passive: true })

    // GSAP re-measures its pinned sections on "refresh" — section positions may have changed
    const onRefresh = () => {
      recomputeStops()
      startLoop()
    }
    if (scrollMode) ScrollTrigger.addEventListener('refresh', onRefresh)

    /* ─── Cleanup: runs when leaving the page — frees all GPU memory ─── */
    return () => {
      if (import.meta.env.DEV) delete window.__bulbDebug
      setWake(null)
      bulb.flash = 0
      // the bulb is gone: tell the page
      Object.assign(bulb, { ready: false, visible: false, glow: 0, view: null })
      publish()
      stopLoop()
      window.clearTimeout(switchTimer)
      window.removeEventListener('load', onPageLoaded)
      document.removeEventListener('visibilitychange', onVisibility)
      viewObserver?.disconnect()
      window.removeEventListener('resize', onResize)
      window.removeEventListener('scroll', onScroll)
      ScrollTrigger.removeEventListener('refresh', onRefresh)
      themeObserver.disconnect()
      scene.traverse((obj) => {
        if (obj.geometry) obj.geometry.dispose()
      })
      ;[glassMat, metalMat, filamentMat, halo.material].forEach((m) => m.dispose())
      bloomPass.dispose()
      composer.dispose()
      bloomComposer.dispose()
      mixPass.dispose()
      blackTexture.dispose()
      envTexture.dispose()
      pmrem.dispose()
      renderer.dispose()
    }
  }, [autoRotate, layout, riseIn, activeRef, getStops, getLightOnAt])

  return <canvas ref={canvasRef} className="bulb-canvas" aria-hidden="true" />
}
