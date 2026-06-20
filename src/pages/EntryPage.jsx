import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import gsap from 'gsap'
import '../styles/intro-animation.css'

/* ═══════════════════════════════════════════════
   IEEE SJCE — FUTURISTIC INTRO ANIMATION
   5-Phase Cinematic System Power-On Sequence
   Total duration: ~5.5 seconds
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

// Circuit node positions
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

// Background PCB trace patterns
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

// Diamond path for IEEE-style frame
const DIAMOND_PATH = 'M 100 5 L 195 100 L 100 195 L 5 100 Z'

export default function EntryPage() {
  const navigate = useNavigate()
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

  useEffect(() => {
    if (localStorage.getItem('ieee-intro-seen') === 'true') {
      navigate('/home', { replace: true })
      return
    }

    const tl = gsap.timeline({
      onComplete: () => {
        localStorage.setItem('ieee-intro-seen', 'true')
        navigate('/home')
      },
    })

    // ═══════════════════════════════════════
    // PHASE 1 — DORMANT STATE (0s – 1.0s)
    // ═══════════════════════════════════════

    const pcbPaths = pcbBgRef.current?.querySelectorAll('.pcb-trace-bg')
    if (pcbPaths?.length) {
      tl.fromTo(pcbPaths,
        { strokeDashoffset: (i, el) => el.getTotalLength(), strokeDasharray: (i, el) => el.getTotalLength() },
        { strokeDashoffset: 0, duration: 2, stagger: 0.06, ease: 'none' },
        0
      )
    }

    const particles = particlesRef.current?.querySelectorAll('.intro-particle')
    if (particles?.length) {
      tl.to(particles, {
        opacity: () => 0.2 + Math.random() * 0.4,
        duration: 0.8,
        stagger: { each: 0.04, from: 'random' },
        ease: 'power1.out'
      }, 0)

      particles.forEach((p) => {
        gsap.to(p, {
          x: `+=${(Math.random() - 0.5) * 40}`,
          y: `+=${(Math.random() - 0.5) * 30}`,
          duration: 3 + Math.random() * 2,
          repeat: -1, yoyo: true, ease: 'sine.inOut'
        })
      })
    }

    tl.fromTo(breathingRef.current,
      { opacity: 0, scale: 0.5 },
      { opacity: 0.6, scale: 1, duration: 1.0, ease: 'power2.out' },
      0
    )

    // ═══════════════════════════════════════
    // PHASE 2 — CIRCUIT ACTIVATION (0.8s – 2.8s)
    // ═══════════════════════════════════════

    const circuitTraces = circuitLayerRef.current?.querySelectorAll('.circuit-trace')
    const dimTraces = circuitLayerRef.current?.querySelectorAll('.circuit-trace-dim')

    if (dimTraces?.length) {
      tl.to(dimTraces, {
        opacity: 0.2, duration: 0.4, stagger: 0.03, ease: 'power1.in'
      }, 0.5)
    }

    if (circuitTraces?.length) {
      circuitTraces.forEach((trace) => {
        const length = trace.getTotalLength()
        gsap.set(trace, { strokeDasharray: length, strokeDashoffset: length, opacity: 0.6 })
      })

      tl.to(circuitTraces, {
        strokeDashoffset: 0,
        duration: 1.6, stagger: { each: 0.08, from: 'edges' }, ease: 'power2.inOut'
      }, 0.8)
    }

    const currentPulses = circuitLayerRef.current?.querySelectorAll('.current-pulse')
    if (currentPulses?.length && circuitTraces?.length) {
      currentPulses.forEach((pulse, i) => {
        const trace = circuitTraces[i % circuitTraces.length]
        if (!trace) return
        const pathLength = trace.getTotalLength()

        tl.to(pulse, { opacity: 1, duration: 0.12, ease: 'power1.in' }, 1.3 + i * 0.1)

        const pulseObj = { progress: 0 }
        tl.to(pulseObj, {
          progress: 1, duration: 0.6, ease: 'power1.inOut',
          onUpdate() {
            try {
              const point = trace.getPointAtLength(pulseObj.progress * pathLength)
              gsap.set(pulse, { attr: { cx: point.x, cy: point.y } })
            } catch (e) { /* safety */ }
          }
        }, 1.3 + i * 0.1)

        tl.to(pulse, { opacity: 0, duration: 0.25, ease: 'power1.out' }, 1.9 + i * 0.1)
      })
    }

    const nodes = circuitLayerRef.current?.querySelectorAll('.circuit-node')
    const nodeGlows = circuitLayerRef.current?.querySelectorAll('.circuit-node-glow')

    if (nodes?.length) {
      tl.to(nodes, {
        opacity: 1, duration: 0.2, stagger: { each: 0.08, from: 'random' }, ease: 'power2.out'
      }, 1.8)
    }

    if (nodeGlows?.length) {
      tl.to(nodeGlows, {
        opacity: 0.6, duration: 0.25, stagger: { each: 0.08, from: 'random' }, ease: 'power2.out'
      }, 1.9)
    }

    // ═══════════════════════════════════════
    // PHASE 3 — BULB IGNITION (2.3s – 3.8s)
    // ═══════════════════════════════════════

    tl.to(logoRef.current, {
      opacity: 0.3, filter: 'brightness(0.5) saturate(0.3)',
      duration: 0.4, ease: 'power1.out'
    }, 2.3)

    tl.to(logoRef.current, {
      opacity: 0.6, filter: 'brightness(0.8) saturate(0.5)',
      duration: 0.12, ease: 'power1.inOut'
    }, 2.8)

    tl.to(logoRef.current, {
      opacity: 0.3, filter: 'brightness(0.4) saturate(0.2)',
      duration: 0.1, ease: 'power1.inOut'
    }, 2.95)

    tl.to(logoRef.current, {
      opacity: 1,
      filter: 'brightness(1.15) saturate(1) drop-shadow(0 0 20px rgba(0,194,255,0.6))',
      scale: 1.05, duration: 0.6, ease: 'power3.out'
    }, 3.1)

    tl.to(logoRef.current, {
      scale: 1, duration: 0.4, ease: 'elastic.out(1, 0.5)'
    }, 3.7)

    tl.to(logoBloomRef.current, {
      opacity: 0.8, scale: 1.2, duration: 0.6, ease: 'power2.out'
    }, 3.1)

    tl.to(logoBloomRef.current, {
      opacity: 0.4, scale: 1, duration: 0.5, ease: 'power2.inOut'
    }, 3.7)

    tl.to(breathingRef.current, {
      opacity: 0, scale: 2, duration: 0.6, ease: 'power2.out'
    }, 3.1)

    // ═══════════════════════════════════════
    // PHASE 4 — DIAMOND FORMATION (3.5s – 4.6s)
    // ═══════════════════════════════════════

    const diamondPath = diamondRef.current?.querySelector('.diamond-path')
    if (diamondPath) {
      const dLen = diamondPath.getTotalLength()
      gsap.set(diamondPath, { strokeDasharray: dLen, strokeDashoffset: dLen })
      tl.to(diamondPath, {
        strokeDashoffset: 0, duration: 0.9, ease: 'power2.inOut'
      }, 3.5)
    }

    const hudRings = hudRingsRef.current?.querySelectorAll('.hud-ring, .hud-ring-accent')
    if (hudRings?.length) {
      tl.to(hudRings, {
        opacity: (i) => i % 2 === 0 ? 0.4 : 0.25,
        duration: 0.5, stagger: 0.12, ease: 'power2.out'
      }, 3.8)

      hudRings.forEach((ring, i) => {
        gsap.to(ring, {
          rotation: i % 2 === 0 ? 360 : -360,
          duration: 20 + i * 5, repeat: -1, ease: 'none',
          transformOrigin: 'center center'
        })
      })
    }

    tl.fromTo(energyPulseRef.current,
      { scale: 0.5, opacity: 0.8 },
      { scale: 8, opacity: 0, duration: 1.0, ease: 'power2.out' },
      4.0
    )

    if (circuitTraces?.length) {
      tl.to(circuitTraces, { opacity: 0.9, duration: 0.5, ease: 'power1.out' }, 4.0)
    }

    // ═══════════════════════════════════════
    // PHASE 5 — FADE OUT & NAVIGATE (4.3s – 5.5s)
    // ═══════════════════════════════════════

    if (particles?.length) {
      tl.to(particles, { opacity: 0, duration: 0.5, stagger: 0.01, ease: 'power1.out' }, 4.4)
    }

    if (circuitTraces?.length) {
      tl.to(circuitTraces, { opacity: 0, duration: 0.6, ease: 'power2.in' }, 4.5)
    }
    if (nodes?.length) tl.to(nodes, { opacity: 0, duration: 0.4 }, 4.6)
    if (nodeGlows?.length) tl.to(nodeGlows, { opacity: 0, duration: 0.4 }, 4.6)

    tl.to([logoRef.current, logoBloomRef.current], {
      opacity: 0, scale: 1.3, duration: 0.6, ease: 'power2.in'
    }, 4.6)

    if (diamondPath) tl.to(diamondPath, { opacity: 0, duration: 0.5, ease: 'power2.in' }, 4.6)
    if (hudRings?.length) tl.to(hudRings, { opacity: 0, duration: 0.5, ease: 'power2.in' }, 4.6)

    tl.to(overlayRef.current, {
      opacity: 0, duration: 0.7, ease: 'power2.inOut'
    }, 4.9)

    return () => { tl.kill() }
  }, [navigate])

  return (
    <div ref={overlayRef} className="intro-overlay">
      {/* Background PCB traces */}
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
              left: `${10 + (i * 2.7) % 80}%`,
              top: `${5 + (i * 3.3) % 90}%`,
              width: `${1 + (i % 3)}px`,
              height: `${1 + (i % 3)}px`,
            }}
          />
        ))}
      </div>

      {/* Circuit SVG layer */}
      <div ref={circuitLayerRef} className="intro-circuit-layer">
        <svg viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice">
          {CIRCUIT_PATHS.map((d, i) => (
            <path key={`dim-${i}`} d={convertPercentPath(d, 1920, 1080)} className="circuit-trace-dim" />
          ))}
          {CIRCUIT_PATHS.map((d, i) => (
            <path key={`trace-${i}`} d={convertPercentPath(d, 1920, 1080)} className="circuit-trace" />
          ))}
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
          {CIRCUIT_PATHS.map((_, i) => (
            <circle key={`pulse-${i}`} cx="0" cy="0" r="3" className="current-pulse" />
          ))}
        </svg>
      </div>

      {/* Center content */}
      <div className="intro-center">
        <div ref={breathingRef} className="intro-breathing-glow" />

        <div ref={hudRingsRef} className="intro-hud-rings">
          <svg viewBox="0 0 280 280">
            <circle cx="140" cy="140" r="120" className="hud-ring" />
            <circle cx="140" cy="140" r="130" className="hud-ring-accent" />
            <circle cx="140" cy="140" r="110" className="hud-ring" />
            <circle cx="140" cy="140" r="137" className="hud-ring-accent" />
          </svg>
        </div>

        <div ref={diamondRef} className="intro-diamond-frame">
          <svg viewBox="0 0 200 200">
            <path d={DIAMOND_PATH} className="diamond-path" />
          </svg>
        </div>

        <div ref={logoBloomRef} className="intro-logo-bloom" />

        <div className="intro-logo-container">
          <img ref={logoRef} src="/logo.png" alt="IEEE SJCE" className="intro-logo" />
        </div>

        <div ref={energyPulseRef} className="intro-energy-pulse" />
      </div>
    </div>
  )
}

/* ─── Utility: Convert percentage-based SVG path to pixel values ─── */
function convertPercentPath(pathStr, width, height) {
  const tokens = pathStr.trim().split(/\s+/)
  const result = []
  let coordIndex = 0

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i]
    if (/^[MLHVCSQTAZmlhvcsqtaz]$/.test(token)) {
      result.push(token)
      coordIndex = 0
      continue
    }
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
