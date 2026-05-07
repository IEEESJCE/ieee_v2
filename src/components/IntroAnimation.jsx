import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import '../styles/intro-animation.css'

// Module-level flag to survive StrictMode double-mount
let animationTimeline = null

/* ═══════════════════════════════════════════════
   IEEE SJCE — FUTURISTIC INTRO ANIMATION
   5-Phase Cinematic System Power-On Sequence
   ═══════════════════════════════════════════════ */

// ─── SVG Circuit Trace Paths (procedural PCB-style) ───
const CIRCUIT_PATHS = [
  // Left side traces
  'M 0 30% L 12% 30% L 15% 35% L 25% 35% L 30% 40% L 38% 40%',
  'M 0 50% L 10% 50% L 14% 46% L 22% 46% L 26% 50% L 35% 50%',
  'M 0 70% L 8% 70% L 12% 65% L 20% 65% L 24% 60% L 38% 60%',
  'M 5% 0 L 5% 12% L 10% 18% L 10% 28% L 15% 32% L 15% 42%',
  // Right side traces
  'M 100% 30% L 88% 30% L 85% 35% L 75% 35% L 70% 40% L 62% 40%',
  'M 100% 50% L 90% 50% L 86% 46% L 78% 46% L 74% 50% L 65% 50%',
  'M 100% 70% L 92% 70% L 88% 65% L 80% 65% L 76% 60% L 62% 60%',
  'M 95% 0 L 95% 12% L 90% 18% L 90% 28% L 85% 32% L 85% 42%',
  // Top traces
  'M 30% 0 L 30% 10% L 35% 15% L 35% 25% L 40% 30% L 40% 38%',
  'M 70% 0 L 70% 10% L 65% 15% L 65% 25% L 60% 30% L 60% 38%',
  // Bottom traces
  'M 30% 100% L 30% 88% L 35% 82% L 35% 72% L 40% 68% L 40% 62%',
  'M 70% 100% L 70% 88% L 65% 82% L 65% 72% L 60% 68% L 60% 62%',
]

// Circuit node positions (where traces terminate or intersect)
const CIRCUIT_NODES = [
  { cx: '38%', cy: '40%', r: 3 },
  { cx: '35%', cy: '50%', r: 2.5 },
  { cx: '38%', cy: '60%', r: 3 },
  { cx: '62%', cy: '40%', r: 3 },
  { cx: '65%', cy: '50%', r: 2.5 },
  { cx: '62%', cy: '60%', r: 3 },
  { cx: '40%', cy: '38%', r: 2.5 },
  { cx: '60%', cy: '38%', r: 2.5 },
  { cx: '40%', cy: '62%', r: 2.5 },
  { cx: '60%', cy: '62%', r: 2.5 },
  { cx: '15%', cy: '42%', r: 2 },
  { cx: '85%', cy: '42%', r: 2 },
]

// Background PCB trace patterns (very faint, ambient)
const PCB_BG_PATHS = [
  'M 20% 10% L 22% 10% L 22% 15% L 28% 15%',
  'M 75% 85% L 78% 85% L 78% 80% L 82% 80%',
  'M 10% 80% L 10% 76% L 16% 76% L 16% 72%',
  'M 88% 20% L 88% 25% L 82% 25% L 82% 30%',
  'M 45% 8% L 48% 8% L 48% 12% L 52% 12% L 52% 8% L 55% 8%',
  'M 45% 92% L 48% 92% L 48% 88% L 52% 88% L 52% 92% L 55% 92%',
  'M 8% 45% L 8% 48% L 12% 48% L 12% 52% L 8% 52% L 8% 55%',
  'M 92% 45% L 92% 48% L 88% 48% L 88% 52% L 92% 52% L 92% 55%',
]

// Diamond path for the IEEE-style frame
const DIAMOND_PATH = 'M 100 5 L 195 100 L 100 195 L 5 100 Z'

export default function IntroAnimation({ onComplete }) {
  const overlayRef = useRef(null)
  const circuitLayerRef = useRef(null)
  const logoRef = useRef(null)
  const logoBloomRef = useRef(null)
  const diamondRef = useRef(null)
  const hudRingsRef = useRef(null)
  const breathingRef = useRef(null)
  const energyPulseRef = useRef(null)
  const particlesRef = useRef(null)
  const pcbBgRef = useRef(null)
  const [isComplete, setIsComplete] = useState(false)
  const hasStartedRef = useRef(false)

  const runAnimation = () => {
    const tl = gsap.timeline({
      onComplete: () => {
        sessionStorage.setItem('ieee-intro-v2', 'true')
        setIsComplete(true)
        onComplete?.()
      }
    })

    // ═══════════════════════════════════════
    // PHASE 1 — DORMANT STATE (0s - 0.8s)
    // ═══════════════════════════════════════

    // Fade in background PCB traces
    const pcbPaths = pcbBgRef.current?.querySelectorAll('.pcb-trace-bg')
    if (pcbPaths?.length) {
      tl.fromTo(pcbPaths,
        { strokeDashoffset: function(i, el) { return el.getTotalLength() }, strokeDasharray: function(i, el) { return el.getTotalLength() } },
        { strokeDashoffset: 0, duration: 1.5, stagger: 0.05, ease: 'none' },
        0
      )
    }

    // Ambient particles float in
    const particles = particlesRef.current?.querySelectorAll('.intro-particle')
    if (particles?.length) {
      tl.to(particles, {
        opacity: (i) => 0.2 + Math.random() * 0.4,
        duration: 0.6,
        stagger: { each: 0.03, from: 'random' },
        ease: 'power1.out'
      }, 0)

      // Slow drift animation
      particles.forEach((p) => {
        gsap.to(p, {
          x: `+=${(Math.random() - 0.5) * 40}`,
          y: `+=${(Math.random() - 0.5) * 30}`,
          duration: 3 + Math.random() * 2,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut'
        })
      })
    }

    // Breathing glow pulses
    tl.fromTo(breathingRef.current,
      { opacity: 0, scale: 0.5 },
      { opacity: 0.6, scale: 1, duration: 0.8, ease: 'power2.out' },
      0
    )

    // ═══════════════════════════════════════
    // PHASE 2 — CIRCUIT ACTIVATION (0.6s - 2.2s)
    // ═══════════════════════════════════════

    // Draw circuit traces from edges toward center
    const circuitTraces = circuitLayerRef.current?.querySelectorAll('.circuit-trace')
    const dimTraces = circuitLayerRef.current?.querySelectorAll('.circuit-trace-dim')

    // Show dim traces first (the dormant paths)
    if (dimTraces?.length) {
      tl.to(dimTraces, {
        opacity: 0.2,
        duration: 0.3,
        stagger: 0.02,
        ease: 'power1.in'
      }, 0.4)
    }

    // Animate circuit traces drawing in
    if (circuitTraces?.length) {
      circuitTraces.forEach((trace) => {
        const length = trace.getTotalLength()
        gsap.set(trace, {
          strokeDasharray: length,
          strokeDashoffset: length,
          opacity: 0.6
        })
      })

      tl.to(circuitTraces, {
        strokeDashoffset: 0,
        duration: 1.2,
        stagger: { each: 0.06, from: 'edges' },
        ease: 'power2.inOut'
      }, 0.6)
    }

    // Current pulses traveling along paths
    const currentPulses = circuitLayerRef.current?.querySelectorAll('.current-pulse')
    if (currentPulses?.length && circuitTraces?.length) {
      currentPulses.forEach((pulse, i) => {
        const traceIndex = i % circuitTraces.length
        const trace = circuitTraces[traceIndex]
        if (!trace) return

        const pathLength = trace.getTotalLength()

        tl.to(pulse, {
          opacity: 1,
          duration: 0.1,
          ease: 'power1.in'
        }, 1.0 + i * 0.08)

        // Animate pulse along path using manual position updates
        const pulseObj = { progress: 0 }
        tl.to(pulseObj, {
          progress: 1,
          duration: 0.5,
          ease: 'power1.inOut',
          onUpdate: function() {
            try {
              const point = trace.getPointAtLength(pulseObj.progress * pathLength)
              gsap.set(pulse, { cx: point.x, cy: point.y })
            } catch (e) { /* SVG path may not support getPointAtLength */ }
          }
        }, 1.0 + i * 0.08)

        tl.to(pulse, {
          opacity: 0,
          duration: 0.2,
          ease: 'power1.out'
        }, 1.5 + i * 0.08)
      })
    }

    // Circuit nodes glow sequentially
    const nodes = circuitLayerRef.current?.querySelectorAll('.circuit-node')
    const nodeGlows = circuitLayerRef.current?.querySelectorAll('.circuit-node-glow')

    if (nodes?.length) {
      tl.to(nodes, {
        opacity: 1,
        duration: 0.15,
        stagger: { each: 0.06, from: 'random' },
        ease: 'power2.out'
      }, 1.4)
    }

    if (nodeGlows?.length) {
      tl.to(nodeGlows, {
        opacity: 0.6,
        duration: 0.2,
        stagger: { each: 0.06, from: 'random' },
        ease: 'power2.out'
      }, 1.5)
    }

    // ═══════════════════════════════════════
    // PHASE 3 — BULB IGNITION (2.0s - 3.0s)
    // ═══════════════════════════════════════

    // Logo appears semi-transparent (dormant)
    tl.to(logoRef.current, {
      opacity: 0.3,
      filter: 'brightness(0.5) saturate(0.3)',
      duration: 0.3,
      ease: 'power1.out'
    }, 1.8)

    // Filament flicker
    tl.to(logoRef.current, {
      opacity: 0.6,
      filter: 'brightness(0.8) saturate(0.5)',
      duration: 0.1,
      ease: 'power1.inOut'
    }, 2.2)

    tl.to(logoRef.current, {
      opacity: 0.3,
      filter: 'brightness(0.4) saturate(0.2)',
      duration: 0.08,
      ease: 'power1.inOut'
    }, 2.35)

    // Power on fully
    tl.to(logoRef.current, {
      opacity: 1,
      filter: 'brightness(1.15) saturate(1) drop-shadow(0 0 20px rgba(0,194,255,0.6))',
      scale: 1.05,
      duration: 0.5,
      ease: 'power3.out'
    }, 2.5)

    // Scale pulse settle
    tl.to(logoRef.current, {
      scale: 1,
      duration: 0.3,
      ease: 'elastic.out(1, 0.5)'
    }, 3.0)

    // Bloom glow around logo
    tl.to(logoBloomRef.current, {
      opacity: 0.8,
      scale: 1.2,
      duration: 0.5,
      ease: 'power2.out'
    }, 2.5)

    tl.to(logoBloomRef.current, {
      opacity: 0.4,
      scale: 1,
      duration: 0.4,
      ease: 'power2.inOut'
    }, 3.0)

    // Breathing glow intensifies
    tl.to(breathingRef.current, {
      opacity: 0,
      scale: 2,
      duration: 0.5,
      ease: 'power2.out'
    }, 2.5)

    // ═══════════════════════════════════════
    // PHASE 4 — DIAMOND FORMATION (2.8s - 3.8s)
    // ═══════════════════════════════════════

    // Diamond frame draws itself
    const diamondPath = diamondRef.current?.querySelector('.diamond-path')
    if (diamondPath) {
      const dLen = diamondPath.getTotalLength()
      gsap.set(diamondPath, { strokeDasharray: dLen, strokeDashoffset: dLen })
      tl.to(diamondPath, {
        strokeDashoffset: 0,
        duration: 0.7,
        ease: 'power2.inOut'
      }, 2.8)
    }

    // HUD rings appear and start rotating
    const hudRings = hudRingsRef.current?.querySelectorAll('.hud-ring, .hud-ring-accent')
    if (hudRings?.length) {
      tl.to(hudRings, {
        opacity: (i) => i % 2 === 0 ? 0.4 : 0.25,
        duration: 0.4,
        stagger: 0.1,
        ease: 'power2.out'
      }, 3.0)

      // Subtle rotation
      hudRings.forEach((ring, i) => {
        gsap.to(ring, {
          rotation: i % 2 === 0 ? 360 : -360,
          duration: 20 + i * 5,
          repeat: -1,
          ease: 'none',
          transformOrigin: 'center center'
        })
      })
    }

    // Energy pulse expanding outward
    tl.fromTo(energyPulseRef.current,
      { scale: 0.5, opacity: 0.8 },
      { scale: 8, opacity: 0, duration: 0.8, ease: 'power2.out' },
      3.2
    )

    // Background circuits brighten
    if (circuitTraces?.length) {
      tl.to(circuitTraces, {
        opacity: 0.9,
        duration: 0.4,
        ease: 'power1.out'
      }, 3.2)
    }

    // ═══════════════════════════════════════
    // PHASE 5 — HOMEPAGE REVEAL (3.5s - 4.5s)
    // ═══════════════════════════════════════

    // Fade out particles
    if (particles?.length) {
      tl.to(particles, {
        opacity: 0,
        duration: 0.4,
        stagger: 0.01,
        ease: 'power1.out'
      }, 3.6)
    }

    // Fade out circuits
    if (circuitTraces?.length) {
      tl.to(circuitTraces, {
        opacity: 0,
        duration: 0.5,
        ease: 'power2.in'
      }, 3.7)
    }

    if (nodes?.length) {
      tl.to(nodes, { opacity: 0, duration: 0.3 }, 3.8)
    }

    if (nodeGlows?.length) {
      tl.to(nodeGlows, { opacity: 0, duration: 0.3 }, 3.8)
    }

    // Logo and diamond fade + scale up
    tl.to([logoRef.current, logoBloomRef.current], {
      opacity: 0,
      scale: 1.3,
      duration: 0.5,
      ease: 'power2.in'
    }, 3.8)

    if (diamondPath) {
      tl.to(diamondPath, {
        opacity: 0,
        duration: 0.4,
        ease: 'power2.in'
      }, 3.8)
    }

    if (hudRings?.length) {
      tl.to(hudRings, {
        opacity: 0,
        duration: 0.4,
        ease: 'power2.in'
      }, 3.8)
    }

    // Entire overlay dissolves
    tl.to(overlayRef.current, {
      opacity: 0,
      duration: 0.6,
      ease: 'power2.inOut'
    }, 4.0)

    return tl
  }

  useEffect(() => {
    // Skip if already seen this session
    const hasPlayed = sessionStorage.getItem('ieee-intro-v2')
    if (hasPlayed) {
      setIsComplete(true)
      onComplete?.()
      return
    }

    // Guard against StrictMode double-mount: only start once
    if (hasStartedRef.current) return
    hasStartedRef.current = true

    // Kill any previous timeline (from a prior mount cycle)
    if (animationTimeline) {
      animationTimeline.kill()
    }

    animationTimeline = runAnimation()

    return () => {
      // Don't kill on cleanup — let the animation finish
      // It will be killed on next mount if needed
    }
  }, [onComplete])

  if (isComplete) return null

  return (
    <div ref={overlayRef} className="intro-overlay">
      {/* Background PCB traces (very faint ambient) */}
      <div ref={pcbBgRef} className="intro-pcb-traces">
        <svg viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice">
          {PCB_BG_PATHS.map((d, i) => (
            <path key={`pcb-${i}`} d={convertPercentPath(d, 1920, 1080)} className="pcb-trace-bg" />
          ))}
        </svg>
      </div>

      {/* Ambient floating particles */}
      <div ref={particlesRef}>
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={`particle-${i}`}
            className="intro-particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${1 + Math.random() * 2}px`,
              height: `${1 + Math.random() * 2}px`,
            }}
          />
        ))}
      </div>

      {/* Circuit SVG layer */}
      <div ref={circuitLayerRef} className="intro-circuit-layer">
        <svg viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice">
          {/* Dim base traces (visible in dormant state) */}
          {CIRCUIT_PATHS.map((d, i) => (
            <path key={`dim-${i}`} d={convertPercentPath(d, 1920, 1080)} className="circuit-trace-dim" />
          ))}

          {/* Active circuit traces */}
          {CIRCUIT_PATHS.map((d, i) => (
            <path key={`trace-${i}`} d={convertPercentPath(d, 1920, 1080)} className="circuit-trace" />
          ))}

          {/* Circuit nodes */}
          {CIRCUIT_NODES.map((node, i) => (
            <g key={`node-${i}`}>
              <circle
                cx={percentToPixel(node.cx, 1920)}
                cy={percentToPixel(node.cy, 1080)}
                r={node.r * 3}
                className="circuit-node-glow"
              />
              <circle
                cx={percentToPixel(node.cx, 1920)}
                cy={percentToPixel(node.cy, 1080)}
                r={node.r}
                className="circuit-node"
              />
            </g>
          ))}

          {/* Current pulses */}
          {CIRCUIT_PATHS.map((_, i) => (
            <circle key={`pulse-${i}`} cx="0" cy="0" r="3" className="current-pulse" />
          ))}
        </svg>
      </div>

      {/* Center content */}
      <div className="intro-center">
        {/* Breathing glow */}
        <div ref={breathingRef} className="intro-breathing-glow" />

        {/* HUD Rings */}
        <div ref={hudRingsRef} className="intro-hud-rings">
          <svg viewBox="0 0 280 280">
            <circle cx="140" cy="140" r="120" className="hud-ring" />
            <circle cx="140" cy="140" r="130" className="hud-ring-accent" />
            <circle cx="140" cy="140" r="110" className="hud-ring" />
            <circle cx="140" cy="140" r="137" className="hud-ring-accent" />
          </svg>
        </div>

        {/* Diamond frame */}
        <div ref={diamondRef} className="intro-diamond-frame">
          <svg viewBox="0 0 200 200">
            <path d={DIAMOND_PATH} className="diamond-path" />
          </svg>
        </div>

        {/* Logo bloom glow */}
        <div ref={logoBloomRef} className="intro-logo-bloom" />

        {/* Logo */}
        <div className="intro-logo-container">
          <img ref={logoRef} src="/logo.png" alt="IEEE SJCE" className="intro-logo" />
        </div>

        {/* Energy pulse */}
        <div ref={energyPulseRef} className="intro-energy-pulse" />
      </div>
    </div>
  )
}

/* ─── Utility: Convert percentage-based SVG path to pixel values ─── */
function convertPercentPath(pathStr, width, height) {
  // Tokenize the path string into commands and coordinate pairs
  const tokens = pathStr.trim().split(/\s+/)
  const result = []
  let coordIndex = 0 // 0 = x, 1 = y within each coordinate pair

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i]
    // SVG commands reset coordinate index
    if (/^[MLHVCSQTAZmlhvcsqtaz]$/.test(token)) {
      result.push(token)
      coordIndex = 0
      continue
    }

    // Check if this token contains a percentage
    if (token.endsWith('%')) {
      const val = parseFloat(token) / 100
      const dim = coordIndex % 2 === 0 ? width : height
      result.push(String(Math.round(dim * val)))
    } else {
      result.push(token)
    }
    coordIndex++
  }

  return result.join(' ')
}

function percentToPixel(percentStr, dimension) {
  return Math.round((parseFloat(percentStr) / 100) * dimension)
}
