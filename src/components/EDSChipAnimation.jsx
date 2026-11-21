import React from "react";
import "./EDSChipAnimation.css";

/**
 * 2.5D Vector Tech Illustration for IEEE Electron Devices Society (EDS).
 * Designed to perfectly match the artistic language of WIE (girl coder) and RAS (friendly robot):
 * - Soft circular portal backdrop disc with gear mechanics
 * - 2.5D isometric hardware workbench with glowing semiconductor microchip
 * - Electronics engineer character with precision inspection tool
 * - Holographic wave display, diagnostic scope, and animated electron orbits
 */
export default function EDSChipAnimation({ className = "" }) {
  return (
    <div
      className={`eds-illust-wrap ${className}`}
      aria-label="IEEE EDS 2.5D Semiconductor & Hardware Engineering Illustration"
    >
      <svg
        className="eds-illust-svg"
        viewBox="0 0 400 400"
        xmlns="http://www.w3.org/2000/svg"
        role="presentation"
      >
        <defs>
          {/* Soft circular portal gradient */}
          <linearGradient id="eds-portal-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="60%" stopColor="#F1F5F9" />
            <stop offset="100%" stopColor="#E2E8F0" />
          </linearGradient>

          {/* Workbench top surface gradient */}
          <linearGradient id="eds-desk-top" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#E2E8F0" />
          </linearGradient>

          {/* Silicon chip body gradient */}
          <linearGradient id="eds-chip-body" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1E293B" />
            <stop offset="70%" stopColor="#0F172A" />
            <stop offset="100%" stopColor="#090E1A" />
          </linearGradient>

          {/* Glowing neon silicon core filter */}
          <filter id="eds-neon-glow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Drop shadow for 2.5D elements */}
          <filter id="eds-soft-shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#0F172A" floodOpacity="0.16" />
          </filter>

          {/* Gold lead pin gradient */}
          <linearGradient id="eds-gold-pin" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FDE047" />
            <stop offset="100%" stopColor="#D97706" />
          </linearGradient>
        </defs>

        {/* ─── 1. CIRCULAR PORTAL BACKDROP (Matching RAS backdrop disc) ─── */}
        <circle
          cx="200"
          cy="200"
          r="160"
          fill="url(#eds-portal-grad)"
          filter="url(#eds-soft-shadow)"
        />
        <circle
          cx="200"
          cy="200"
          r="160"
          fill="none"
          stroke="#00E5FF"
          strokeWidth="2.5"
          strokeOpacity="0.35"
        />

        {/* ─── 2. BACKGROUND MECHANICAL GEARS (Matching RAS & WIE gears) ─── */}
        {/* Gear 1: Upper Right (Large, Soft Slate) */}
        <g className="eds-gear-1" fill="#CBD5E1">
          <circle cx="300" cy="110" r="32" />
          {/* 8 Gear Teeth */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
            <rect
              key={deg}
              x="293"
              y="72"
              width="14"
              height="10"
              rx="2"
              transform={`rotate(${deg} 300 110)`}
            />
          ))}
          {/* Center Hole */}
          <circle cx="300" cy="110" r="13" fill="#E2E8F0" />
        </g>

        {/* Gear 2: Upper Left (Medium, Soft Blue-Slate) */}
        <g className="eds-gear-2" fill="#94A3B8">
          <circle cx="95" cy="125" r="24" />
          {/* 6 Gear Teeth */}
          {[0, 60, 120, 180, 240, 300].map((deg) => (
            <rect
              key={deg}
              x="90"
              y="96"
              width="10"
              height="8"
              rx="1.5"
              transform={`rotate(${deg} 95 125)`}
            />
          ))}
          {/* Center Hole */}
          <circle cx="95" cy="125" r="9" fill="#E2E8F0" />
        </g>

        {/* ─── 3. BACKGROUND FLOATING TECH CARD / WAVE SCOPE ─── */}
        <g transform="translate(130, 68)" opacity="0.9">
          {/* Frosted rounded window card */}
          <rect
            x="0"
            y="0"
            width="135"
            height="62"
            rx="8"
            fill="#FFFFFF"
            stroke="#CBD5E1"
            strokeWidth="1.5"
            filter="url(#eds-soft-shadow)"
          />
          {/* Window header dots */}
          <circle cx="10" cy="10" r="2.5" fill="#EF4444" />
          <circle cx="18" cy="10" r="2.5" fill="#F59E0B" />
          <circle cx="26" cy="10" r="2.5" fill="#10B981" />
          <text
            x="70"
            y="12"
            textAnchor="middle"
            fill="#64748B"
            fontSize="6.5"
            fontWeight="700"
            fontFamily="monospace"
          >
            EDS // SILICON LAB
          </text>

          {/* Oscilloscope Grid & Animated Sine Wave */}
          <line x1="8" y1="20" x2="127" y2="20" stroke="#F1F5F9" strokeWidth="1" />
          <line x1="8" y1="36" x2="127" y2="36" stroke="#F1F5F9" strokeWidth="1" />
          <line x1="8" y1="52" x2="127" y2="52" stroke="#F1F5F9" strokeWidth="1" />

          {/* Dynamic Oscilloscope Wave */}
          <path
            d="M 12 36 Q 24 22, 36 36 T 60 36 T 84 36 T 108 36 T 124 36"
            fill="none"
            stroke="#00E5FF"
            strokeWidth="2"
            strokeLinecap="round"
            className="eds-scope-wave"
          />

          {/* Live Frequency Readout */}
          <text
            x="12"
            y="54"
            fill="#0284C7"
            fontSize="5.5"
            fontWeight="700"
            fontFamily="monospace"
          >
            CLK: 240.00 MHz
          </text>
          <text
            x="124"
            y="54"
            textAnchor="end"
            fill="#10B981"
            fontSize="5.5"
            fontWeight="800"
            fontFamily="monospace"
          >
            STABLE ●
          </text>
        </g>

        {/* ─── 4. FLOATING HOLOGRAPHIC ELECTRON ORBIT ─── */}
        <g className="eds-orbit-pulse" opacity="0.65">
          <ellipse
            cx="200"
            cy="245"
            rx="125"
            ry="46"
            fill="none"
            stroke="#00E5FF"
            strokeWidth="1.5"
            strokeDasharray="6 4"
          />
          {/* Orbiting electron particle */}
          <circle cx="325" cy="245" r="4.5" fill="#00E5FF" filter="url(#eds-neon-glow)" />
        </g>

        {/* ─── 5. FLOATING HERO ASSEMBLY (ENGINEER + 2.5D WORKBENCH) ─── */}
        <g className="eds-hero-float">
          {/* Ground Contact Shadow under Desk */}
          <ellipse cx="200" cy="350" rx="105" ry="16" fill="#64748B" opacity="0.22" />

          {/* ─── 2.5D ISOMETRIC ELECTRONICS WORKBENCH ─── */}
          {/* Desk Left Side Face */}
          <path
            d="M 90 295 L 200 334 L 200 348 L 90 309 Z"
            fill="#94A3B8"
          />
          {/* Desk Right Side Face */}
          <path
            d="M 200 334 L 310 295 L 310 309 L 200 348 Z"
            fill="#64748B"
          />
          {/* Desk Top Isometric Surface */}
          <polygon
            points="200,256 310,295 200,334 90,295"
            fill="url(#eds-desk-top)"
            stroke="#CBD5E1"
            strokeWidth="1.5"
          />

          {/* Anti-Static Mat (Teal/Dark Slate Accent) */}
          <polygon
            points="200,266 292,298 200,328 108,298"
            fill="#0F172A"
            stroke="#00E5FF"
            strokeWidth="1"
            opacity="0.85"
          />

          {/* Mat Circuit Tracks (Isometric Golden/Cyan Lines) */}
          <g stroke="#00E5FF" strokeWidth="1" opacity="0.6" fill="none">
            <path d="M 140 298 L 175 310 L 200 301" />
            <path d="M 260 298 L 225 310 L 200 301" />
            <path d="M 200 278 L 200 301" />
          </g>

          {/* ─── 2.5D ISOMETRIC SILICON PROCESSOR CHIP (HERO DEVICE) ─── */}
          <g id="hero-chip">
            {/* Solder Gold Lead Pins (Isometric) */}
            {/* Top-Right Edge Pins */}
            {[-12, -4, 4, 12].map((offset, idx) => (
              <polygon
                key={`trp-${idx}`}
                points={`${215 + offset},${292 - offset * 0.35} ${220 + offset},${290 - offset * 0.35} ${224 + offset},${293 - offset * 0.35} ${219 + offset},${295 - offset * 0.35}`}
                fill="url(#eds-gold-pin)"
              />
            ))}
            {/* Bottom-Left Edge Pins */}
            {[-12, -4, 4, 12].map((offset, idx) => (
              <polygon
                key={`blp-${idx}`}
                points={`${180 + offset},${304 + offset * 0.35} ${185 + offset},${302 + offset * 0.35} ${189 + offset},${305 + offset * 0.35} ${184 + offset},${307 + offset * 0.35}`}
                fill="url(#eds-gold-pin)"
              />
            ))}

            {/* Chip Package Base Thickness (Left & Right Faces) */}
            <path
              d="M 172 297 L 200 307 L 200 313 L 172 303 Z"
              fill="#090E1A"
            />
            <path
              d="M 200 307 L 228 297 L 228 303 L 200 313 Z"
              fill="#1E293B"
            />

            {/* Chip Top Isometric Surface */}
            <polygon
              points="200,287 228,297 200,307 172,297"
              fill="url(#eds-chip-body)"
              stroke="#38BDF8"
              strokeWidth="0.8"
            />

            {/* Chip Glowing Quantum Silicon Core (The Pulse) */}
            <polygon
              points="200,291 216,297 200,303 184,297"
              fill="#00E5FF"
              className="eds-chip-glow"
              filter="url(#eds-neon-glow)"
            />

            {/* Core Center White Beacon */}
            <circle cx="200" cy="297" r="2.5" fill="#FFFFFF" />
          </g>

          {/* ─── MINI DIAGNOSTIC MONITOR ON DESK (LEFT SIDE) ─── */}
          <g transform="translate(118, 268)">
            {/* Scope Stand */}
            <polygon points="12,28 24,24 24,28 12,32" fill="#64748B" />
            {/* Scope Body Top & Sides */}
            <polygon points="18,0 34,6 24,24 8,18" fill="#1E293B" stroke="#475569" strokeWidth="0.8" />
            {/* Scope Glowing Screen */}
            <polygon points="17,3 31,8 23,22 9,17" fill="#0A0E1A" />
            <path
              d="M 11 16 Q 16 9, 21 16 T 29 11"
              fill="none"
              stroke="#10B981"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
            <circle cx="26" cy="10" r="1.2" fill="#00E5FF" />
          </g>

          {/* ─── CUTE CERAMIC MUG ON DESK (RIGHT SIDE, WIE EASTER EGG) ─── */}
          <g transform="translate(268, 274)">
            <ellipse cx="8" cy="18" rx="7" ry="3.5" fill="#0284C7" />
            <path d="M 1 18 L 1 10 C 1 8, 15 8, 15 10 L 15 18 Z" fill="#0284C7" />
            <ellipse cx="8" cy="10" rx="7" ry="2.8" fill="#38BDF8" />
            <ellipse cx="8" cy="10" rx="5" ry="2" fill="#78350F" />
            {/* Handle */}
            <path
              d="M 15 12 C 19 12, 19 16, 15 17"
              fill="none"
              stroke="#0284C7"
              strokeWidth="2"
              strokeLinecap="round"
            />
            {/* Tiny Steam Curl */}
            <path
              d="M 7 6 Q 6 3, 8 1"
              fill="none"
              stroke="#94A3B8"
              strokeWidth="1"
              strokeLinecap="round"
              opacity="0.6"
            />
          </g>

          {/* ─── 2.5D HARDWARE ENGINEER CHARACTER ─── */}
          <g id="character-engineer">
            {/* Lower Body / Seated Stance Behind Desk */}
            <path
              d="M 180 252 C 180 240, 220 240, 220 252 L 226 276 L 174 276 Z"
              fill="#1E293B"
            />

            {/* Torso / Tech Hoodie (EDS Cyan #0284C7 / #00E5FF) */}
            <path
              d="M 182 208 C 182 195, 218 195, 218 208 L 224 256 C 224 260, 176 260, 176 256 Z"
              fill="#0284C7"
            />
            {/* Hoodie Zipper / Accent Stripe */}
            <line x1="200" y1="206" x2="200" y2="256" stroke="#00E5FF" strokeWidth="1.5" />

            {/* Left Arm (Resting on table holding circuit board) */}
            <path
              d="M 182 214 L 160 242 L 178 262 L 188 254 L 174 240 Z"
              fill="#0369A1"
            />
            {/* Left Hand */}
            <ellipse cx="178" cy="262" rx="4.5" ry="3.5" fill="#F8C39F" />

            {/* Right Arm (Holding precision tweezers over the chip) */}
            <path
              d="M 218 214 L 236 244 L 216 268 L 208 262 L 224 242 Z"
              fill="#0284C7"
            />
            {/* Right Hand */}
            <ellipse cx="214" cy="268" rx="4.5" ry="3.5" fill="#F8C39F" />

            {/* Precision Tweezers / Inspection Probe */}
            <path
              d="M 214 268 L 203 288 L 201 288 L 211 267 Z"
              fill="#E2E8F0"
              stroke="#64748B"
              strokeWidth="0.5"
            />
            {/* Tweezers Tip Reflection */}
            <circle cx="202" cy="288" r="1.5" fill="#00E5FF" />

            {/* Character Neck */}
            <rect x="195" y="196" width="10" height="12" rx="3" fill="#F8C39F" />

            {/* Character Head & Face */}
            <ellipse cx="200" cy="184" rx="14" ry="16" fill="#F8C39F" />

            {/* Modern Hair (Slate Navy, Styled Side-Swept Bangs) */}
            <path
              d="M 186 182 C 186 166, 214 164, 215 178 C 215 182, 212 186, 212 186 C 206 174, 192 174, 186 182 Z"
              fill="#0F172A"
            />
            <path
              d="M 186 182 C 184 176, 186 168, 195 168 C 204 168, 214 172, 214 182 Z"
              fill="#1E293B"
            />

            {/* ESD Goggles / Tech Loupe (Resting on Hair, Cyan Accent) */}
            <g id="tech-loupe">
              <rect x="191" y="172" width="18" height="6" rx="2.5" fill="#00E5FF" opacity="0.9" />
              <circle cx="196" cy="175" r="2.2" fill="#FFFFFF" />
              <circle cx="204" cy="175" r="2.2" fill="#FFFFFF" />
              <line x1="187" y1="175" x2="191" y2="175" stroke="#0284C7" strokeWidth="1.2" />
              <line x1="209" y1="175" x2="213" y2="175" stroke="#0284C7" strokeWidth="1.2" />
            </g>

            {/* Clean Facial Silhouette (Focusing down at the chip) */}
            {/* Eye (Delicate downward focus line) */}
            <path d="M 198 186 Q 201 188, 204 186" fill="none" stroke="#0F172A" strokeWidth="1.2" strokeLinecap="round" />
            {/* Smile / Concentrated Expression */}
            <path d="M 200 193 Q 202 195, 204 193" fill="none" stroke="#0F172A" strokeWidth="0.8" strokeLinecap="round" />
          </g>

          {/* ─── FLOATING CIRCUIT PARTICLES / SPARKS ─── */}
          <circle cx="218" cy="286" r="1.8" fill="#FDE047" opacity="0.9">
            <animate attributeName="cy" values="286;278;286" dur="2s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.9;0.3;0.9" dur="2s" repeatCount="indefinite" />
          </circle>
          <circle cx="188" cy="282" r="1.8" fill="#00E5FF" opacity="0.8">
            <animate attributeName="cy" values="282;274;282" dur="2.4s" begin="-1s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.8;0.2;0.8" dur="2.4s" begin="-1s" repeatCount="indefinite" />
          </circle>
        </g>
      </svg>
    </div>
  );
}
