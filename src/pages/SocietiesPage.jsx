import { useEffect, useRef, useState } from "react";
import {
  Cpu,
  Users,
  Bot,
  Radio,
  Zap,
  ChevronRight,
  ChevronLeft,
  Rocket,
} from "lucide-react";
import gsap from "gsap";
import "../styles/societies.css";

const SOCIETIES = [
  {
    id: "student-branch",
    short: "Student Branch",
    name: "IEEE SJCE Student Branch",
    icon: Zap,
    accent: "#3B82F6",
    animation:
      "https://lottie.host/?file=89a9d017-c9c2-4e7c-a02e-c33653a6972a/3dpYgASICZ.json",
    tagline: "Advancing technology and professional development.",
    about:
      "IEEE-SJCE Student Branch which started as an elite group 29 years ago, today has sprawled throughout the campus of SJCE, making the students technically more competitive, more professional and capable of enhancing their abilities as an engineer. Since then IEEE-SJCE Student Branch, a division under Region 10 of IEEE has been known for the immensity with which its members were bestowed. The very success story of its students as professionals into their respective fields after graduations speaks of its standards.IEEE-SJCE Student Branch, which started 29 years ago, has grown to represent 330+ members across six engineering disciplines. With a focus on technical excellence and professional growth, we conduct two major technical fests annually and organize workshops to keep students industry-ready.",
    events: [],
  },
  {
    id: "eds",
    short: "EDS",
    name: "ELECTRON DEVICES SOCIETY",
    icon: Cpu,
    accent: "#00E5FF",
    animation: "",
    about:
      "IEEE-SJCE EDS bridges the gap between classroom semiconductor theory and real-world hardware. We host hands-on workshops covering fundamental circuit design, PCB fabrication, VLSI design using Cadence, and embedded robotics—giving students practical exposure to modern electronic systems.",
    events: [
      {
        title: "SNAP CIRCUITS",
        desc: "A beginner-friendly introduction to electronics. Learn core circuit concepts through hands-on assembly using snap-together components, switches, and LEDs to build working hardware logic.",
      },
      {
        title: "SOLDERING & ETCHING",
        desc: "Move from schematics to physical boards. Master hands-on soldering, component mounting, and chemical PCB etching techniques in an intensive workshop environment.",
      },
      {
        title: "CADENCE WORKSHOP",
        desc: "Explore analog circuit design and simulation using industry-standard Cadence EDA tools. Practical sessions cover schematic capture, layout design, and IC simulation workflows.",
      },
      {
        title: "ROBOTICS WORKSHOP",
        desc: "A 3-day hardware sprint covering microcontrollers, sensor integration, and firmware programming. Build functional autonomous robots from scratch.",
      },
    ],
  },
  {
    id: "wie",
    short: "WIE",
    name: "Women in Engineering",
    icon: Users,
    accent: "#EC4899",
    animation:
      "https://lottie.host/?file=2f28a704-d29d-4531-975b-c3e7e6d9bf20/WVBLEk0GNv.json",
    tagline: "Empowering women in STEM globally.",
    about:
      "IEEE Women in Engineering (WIE) is a global network of IEEE members and volunteers dedicated to promoting women engineers and scientists and inspiring girls around the world to follow their academic interests in a career in engineering and science. It is the world’s largest technical professional organization dedicated to advancing technology for the benefit of humanity. Its goal is to facilitate the recruitment and retention of women in technical disciplines globally. IEEE WIE envisions a vibrant community of IEEE women and men collectively using their diverse talents to innovate the benefit of humanity.",
    events: [
      {
        title: "PRAYAS",
        desc: "A hands-on STEM outreach program providing structured educational support, practical science modules, and technical exposure to young students from underprivileged backgrounds.",
      },
      {
        title: "TCL WORKSHOP: PRINCIPLES & APPLICATIONS",
        desc: "An intensive hands-on session introducing Tool Command Language (TCL) fundamentals, syntax, and automation scripting, featuring practical demonstrations covering concepts such as implementing loops, developing simple TCL scripts, and handling file operations.",
      },
      {
        title: "KALPANA CHAWLA MEMORIAL LECTURE",
        desc: "A flagship keynote address featuring pioneering women scientists and industry leaders sharing key developments in aerospace, deep tech, and advanced engineering research.",
      },
    ],
  },
  {
    id: "ras",
    short: "RAS",
    name: "Robotics & Automation Society",
    icon: Bot,
    accent: "#00F5D4",
    animation:
      "https://lottie.host/?file=2761ce9c-5f1d-49bd-9db8-b7b3bd572353/UrP5jahB6E.json",
    tagline: "Robotics, automation & intelligent systems.",
    about:
      "IEEE-SJCE RAS aims to keep the students up to date on the latest automation technology. Robotics focuses on systems incorporating sensors and actuators that operate autonomously or semi-autonomously in cooperation with humans. Robotics research emphasises intelligence and adaptability to cope with unstructured environments. Automation research emphasises efficiency, quality, and reliability, focusing on systems that operate autonomously.The IEEE Robotics and Automation Society's objectives are scientific, literary, and educational in character. The Society strives for the advancement of the theory and practice of robotics and automation engineering, along with allied arts and sciences, and for the maintenance of high professional standards among its members.",
    events: [
      {
        title: "IOT 4.0",
        desc: "A three-day workshop giving participants hands-on exposure to building smart, connected systems. Using Raspberry Pi as the core platform, participants explore IoT concepts and develop practical applications for real-world problems.",
      },
      {
        title: "TECHKSHETRA",
        desc: "Organized in collaboration with the Signal Processing Society, Techkshetra is a flagship project expo where participants showcase working prototypes, technical know-how, and innovative engineering ideas.",
      },
      {
        title: "ROBOTICS",
        desc: "Conducted in collaboration with the Electron Devices Society, focusing on sensor integration, microcontroller programming, and hardware-software interfacing to build fully functional, working autonomous robots.",
      },
      {
        title: "TECH TALK ON MOTION PLANNING IN ROBOTICS",
        desc: "Expert session covering classical search-based, sampling-based, and learning-based motion planning algorithms for autonomous vehicles, drones, and robotic arms, featuring open-source tools like ROS 2, Nav2, and MoveIt.",
      },
    ],
  },
  {
    id: "sps",
    short: "SPS",
    name: "Signal Processing Society",
    icon: Radio,
    accent: "#60A5FA",
    animation: "",
    tagline: "Signals, analysis & real-world models.",
    about:
      "IEEE-SJCE SPS aims to keep students up to date with the latest developments in signal processing technology. Signal processing focuses on the generation, transformation, analysis, and interpretation of information carried by signals such as audio, speech, images, and other forms of data. Signal processing research emphasises the development of mathematical models, computational algorithms, and machine learning techniques to extract meaningful information from signals and apply them across diverse real-world applications. The IEEE Signal Processing Society's objectives are scientific, literary, and educational in character. The Society strives for the advancement and dissemination of knowledge in signal processing engineering, along with allied arts and sciences, and for the education of students and professionals through the exchange of technical knowledge and ideas.",
    events: [
      {
        title: "AUDIO SIGNAL PROCESSING TECH TALK",
        desc: 'Formal wing inauguration featuring a technical session by Dr. Jayasudha BSK on "Deep Dive into Audio Signal Processing," exploring real-world DSP techniques used in automotive products at Harman International.',
      },
      {
        title: "ML WORKSHOP",
        desc: "A 3-day flagship workshop covering Machine Learning fundamentals, basic modeling in Python, and building a local edge-AI inference system using ESP32, MPU6050, and motion inputs.",
      },
      {
        title: "MOTION PLANNING IN ROBOTICS",
        desc: "Online technical talk conducted with the RAS Wing, where Sujeendra Ramesh demonstrated navigation tradeoffs, visual motion planning algorithms, and future robotics opportunities.",
      },
      {
        title: "WAVE LAB",
        desc: "A hands-on workshop utilizing MATLAB to explore fundamental digital signal processing concepts and practical real-world signal analysis.",
      },
    ],
  },
  {
    id: "aess",
    short: "AESS",
    name: "AEROSPACE & ELECTRONIC SYSTEMS SOCIETY",
    icon: Rocket,
    accent: "#F59E0B",
    animation: "",
    tagline: "AEROSPACE, RADAR & AVIONICS SYSTEMS.",
    about:
      "IEEE-SJCE AESS aims to keep students up to date with the latest developments in aerospace and electronic systems technology. Aerospace and electronic systems encompass the design, development, and integration of complex systems operating across air, space, ocean, and ground environments. The field incorporates technologies such as radar, avionics, satellite systems, navigation, communication, and guidance and control, with research emphasising system integration, precision, reliability, and operational efficiency. The IEEE Aerospace and Electronic Systems Society's objectives are technical, scientific, literary, professional, and educational in character. The Society strives for the advancement of the theory and practice of aerospace and electronic systems engineering, along with allied arts and sciences, and for the promotion of technical knowledge and professional development among its members.",
    events: [
      {
        title:
          "AESS STUDENT CHAPTER INAUGURATION & TECHNICAL TALK ON SPACE TECHNOLOGY",
        desc: "Formal inauguration of the IEEE AESS student chapter on 23rd July 2026, featuring chief guest Dr. Braham Himed (President, IEEE AESS & Senior Research Head, AFRL USA) and Sri Puneeth Kumar Mishra (BoG Member AESS, ISRO), accompanied by an insightful technical session on radar systems, satellite tech, and IEEE professional opportunities.",
      },
      {
        title:
          "HANDS-ON MATLAB WORKSHOP: SIGNAL PROCESSING AND CONTROL SYSTEMS",
        desc: "A two-day hands-on workshop organized by AESS, SPS, and RAS in association with the ECE Department, conducted by Dr. Riyaz A. Rahiman (CoreEL Technologies). Sessions introduce MATLAB fundamentals, model development, and system simulation using MATLAB, Simulink, and Simscape, focusing on practical signal processing and control system applications.",
      },
    ],
  },
];

/* ─── Minimal EDS Chip Visual (Matching Reference Image) ─── */
function EdsMinimalVisual() {
  return (
    <div className="eds-minimal-visual" aria-label="EDS Semiconductor Chip">
      <div className="eds-minimal-glow" />
      <Cpu size={76} strokeWidth={2.6} className="eds-minimal-icon" />
    </div>
  );
}

/* ─── Animated SPS DSP Oscilloscope Visual with 3D Dynamic Camera Motion ─── */
function SpsWaveVisual() {
  return (
    <div className="sps-camera-wrap">
      <div className="sps-camera-viewport">
        <svg
          viewBox="0 0 240 240"
          className="sps-scope-svg"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="scope-grid"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 20 0 L 0 0 0 20"
                fill="none"
                stroke="rgba(96, 165, 250, 0.12)"
                strokeWidth="0.8"
              />
            </pattern>
            <filter id="wave-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <radialGradient id="crt-vignette" cx="50%" cy="50%" r="70%">
              <stop offset="60%" stopColor="#0A0E1A" stopOpacity="0" />
              <stop offset="100%" stopColor="#040711" stopOpacity="0.85" />
            </radialGradient>
          </defs>

          {/* Scope CRT Screen Background */}
          <rect width="240" height="240" fill="#0A0E1A" />
          <rect width="240" height="240" fill="url(#scope-grid)" />

          {/* Scanning Beam Radar Line */}
          <line
            x1="0"
            y1="0"
            x2="0"
            y2="240"
            stroke="#00E5FF"
            strokeWidth="1.5"
            opacity="0.35"
            filter="url(#wave-glow)"
          >
            <animate
              attributeName="x1"
              values="0;240;0"
              dur="4.5s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="x2"
              values="0;240;0"
              dur="4.5s"
              repeatCount="indefinite"
            />
          </line>

          {/* Crosshair Center Lines */}
          <line
            x1="0"
            y1="120"
            x2="240"
            y2="120"
            stroke="rgba(96, 165, 250, 0.35)"
            strokeWidth="1"
            strokeDasharray="3 3"
          />
          <line
            x1="120"
            y1="0"
            x2="120"
            y2="240"
            stroke="rgba(96, 165, 250, 0.35)"
            strokeWidth="1"
            strokeDasharray="3 3"
          />

          {/* Animated Primary Sine Wave */}
          <path
            d="M 10 120 Q 35 60, 65 120 T 120 120 T 175 120 T 230 120"
            fill="none"
            stroke="#60A5FA"
            strokeWidth="2.8"
            filter="url(#wave-glow)"
          >
            <animate
              attributeName="d"
              values="
                M 10 120 Q 35 60, 65 120 T 120 120 T 175 120 T 230 120;
                M 10 120 Q 35 170, 65 120 T 120 120 T 175 120 T 230 120;
                M 10 120 Q 35 60, 65 120 T 120 120 T 175 120 T 230 120
              "
              dur="2.6s"
              repeatCount="indefinite"
            />
          </path>

          {/* Secondary Harmonic Wave */}
          <path
            d="M 10 120 Q 25 90, 45 120 T 85 120 T 125 120 T 165 120 T 205 120 T 230 120"
            fill="none"
            stroke="#00E5FF"
            strokeWidth="1.6"
            opacity="0.65"
          >
            <animate
              attributeName="d"
              values="
                M 10 120 Q 25 90, 45 120 T 85 120 T 125 120 T 165 120 T 205 120 T 230 120;
                M 10 120 Q 25 145, 45 120 T 85 120 T 125 120 T 165 120 T 205 120 T 230 120;
                M 10 120 Q 25 90, 45 120 T 85 120 T 125 120 T 165 120 T 205 120 T 230 120
              "
              dur="3.2s"
              repeatCount="indefinite"
            />
          </path>

          {/* Dynamic Spectrum EQ Bars at Bottom */}
          <g fill="#60A5FA" opacity="0.8">
            <rect x="30" y="195" width="8" height="15" rx="1">
              <animate
                attributeName="height"
                values="15;30;12;24;15"
                dur="1.2s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="y"
                values="195;180;198;186;195"
                dur="1.2s"
                repeatCount="indefinite"
              />
            </rect>
            <rect x="44" y="190" width="8" height="20" rx="1">
              <animate
                attributeName="height"
                values="20;38;16;32;20"
                dur="1.4s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="y"
                values="190;172;194;178;190"
                dur="1.4s"
                repeatCount="indefinite"
              />
            </rect>
            <rect x="58" y="185" width="8" height="25" rx="1">
              <animate
                attributeName="height"
                values="25;45;20;38;25"
                dur="1.1s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="y"
                values="185;165;190;172;185"
                dur="1.1s"
                repeatCount="indefinite"
              />
            </rect>
            <rect x="72" y="175" width="8" height="35" rx="1">
              <animate
                attributeName="height"
                values="35;20;42;18;35"
                dur="1.5s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="y"
                values="175;190;168;192;175"
                dur="1.5s"
                repeatCount="indefinite"
              />
            </rect>
            <rect x="86" y="182" width="8" height="28" rx="1">
              <animate
                attributeName="height"
                values="28;40;18;34;28"
                dur="1.3s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="y"
                values="182;170;192;176;182"
                dur="1.3s"
                repeatCount="indefinite"
              />
            </rect>
            <rect x="100" y="192" width="8" height="18" rx="1">
              <animate
                attributeName="height"
                values="18;32;14;28;18"
                dur="1.2s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="y"
                values="192;178;196;182;192"
                dur="1.2s"
                repeatCount="indefinite"
              />
            </rect>
          </g>

          {/* CRT Screen Vignette */}
          <rect
            width="240"
            height="240"
            fill="url(#crt-vignette)"
            pointerEvents="none"
          />

          {/* Readout Text */}
          <text
            x="14"
            y="24"
            fill="#60A5FA"
            fontSize="7"
            fontFamily="monospace"
            fontWeight="700"
          >
            SPS // FFT HARMONIC
          </text>
          <text
            x="226"
            y="24"
            textAnchor="end"
            fill="#93C5FD"
            fontSize="6.5"
            fontFamily="monospace"
          >
            48kHz / 24-BIT
          </text>
          <text
            x="14"
            y="230"
            fill="#64748B"
            fontSize="6"
            fontFamily="monospace"
          >
            CH-1: SINE // DSP CORE
          </text>
          <text
            x="226"
            y="230"
            textAnchor="end"
            fill="#60A5FA"
            fontSize="6"
            fontFamily="monospace"
          >
            +6.2 dB
          </text>
        </svg>
      </div>
      <div className="sps-crt-scanline" />
    </div>
  );
}

/* ─── Animated AESS Aerospace & Avionics Satellite Visual (2.5D Dynamic Camera Perspective) ─── */
function AessAerospaceVisual() {
  return (
    <div
      className="aess-camera-wrap"
      aria-label="AESS Aerospace & Satellite Avionics Visual"
    >
      <div className="aess-camera-viewport">
        <svg
          className="aess-radar-svg"
          viewBox="0 0 380 380"
          xmlns="http://www.w3.org/2000/svg"
          role="presentation"
        >
          <defs>
            <radialGradient id="aess-space-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#172554" stopOpacity="0.8" />
              <stop offset="55%" stopColor="#0B132B" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#030712" stopOpacity="1" />
            </radialGradient>

            {/* Solar Panel Photovoltaic Blue Gradient */}
            <linearGradient
              id="aess-solar-pv"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#1D4ED8" />
              <stop offset="60%" stopColor="#1E3A8A" />
              <stop offset="100%" stopColor="#0F172A" />
            </linearGradient>

            {/* Gold Foil Kapton MLI Top Lighting */}
            <linearGradient
              id="aess-gold-top"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#FEF08A" />
              <stop offset="60%" stopColor="#FDE047" />
              <stop offset="100%" stopColor="#F59E0B" />
            </linearGradient>

            {/* Gold Foil Kapton MLI Left Midtone */}
            <linearGradient
              id="aess-gold-left"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#F59E0B" />
              <stop offset="70%" stopColor="#D97706" />
              <stop offset="100%" stopColor="#B45309" />
            </linearGradient>

            {/* Gold Foil Kapton MLI Right Shadow */}
            <linearGradient
              id="aess-gold-right"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#D97706" />
              <stop offset="60%" stopColor="#B45309" />
              <stop offset="100%" stopColor="#78350F" />
            </linearGradient>

            {/* Radar Scan Cone Gradient */}
            <linearGradient
              id="aess-sweep-grad"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
            </linearGradient>

            {/* Soft Shadow Blur */}
            <filter
              id="aess-shadow-blur"
              x="-30%"
              y="-30%"
              width="160%"
              height="160%"
            >
              <feGaussianBlur stdDeviation="8" />
            </filter>

            {/* Avionics Amber Glow */}
            <filter id="aess-glow" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="3.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Deep Space Background */}
          <rect width="380" height="380" fill="url(#aess-space-glow)" />

          {/* Starfield with Parallax Depth & Twinkle */}
          {[
            [40, 50, 1.2, "2.2s"],
            [95, 80, 1.5, "3.1s"],
            [320, 65, 1.3, "2.7s"],
            [290, 115, 1.8, "3.5s"],
            [55, 290, 1.4, "2.4s"],
            [335, 275, 1.6, "3.8s"],
            [85, 215, 1.2, "2.9s"],
            [275, 235, 1.4, "2.1s"],
            [190, 45, 1.6, "3.3s"],
            [150, 310, 1.2, "2.6s"],
          ].map(([sx, sy, r, dur], i) => (
            <circle key={i} cx={sx} cy={sy} r={r} fill="#E2E8F0" opacity="0.65">
              <animate
                attributeName="opacity"
                values="0.25;0.95;0.25"
                dur={dur}
                repeatCount="indefinite"
              />
            </circle>
          ))}

          {/* 2.5D Tilted Keplerian Orbital Trajectory Planes */}
          <g transform="rotate(-16 190 190)" opacity="0.75">
            {/* Outer Orbit */}
            <ellipse
              cx="190"
              cy="190"
              rx="155"
              ry="62"
              stroke="#334155"
              strokeWidth="1.2"
              strokeDasharray="5 5"
              fill="none"
            />
            {/* Mid Orbit */}
            <ellipse
              cx="190"
              cy="190"
              rx="112"
              ry="45"
              stroke="#475569"
              strokeWidth="1.4"
              strokeDasharray="6 3"
              fill="none"
              opacity="0.85"
            />
            {/* Inner Proximity Ring */}
            <ellipse
              cx="190"
              cy="190"
              rx="68"
              ry="27"
              stroke="#F59E0B"
              strokeWidth="1"
              strokeDasharray="3 3"
              fill="none"
              opacity="0.5"
            />

            {/* Orbital Tracking Beacons */}
            <circle cx="78" cy="172" r="3.2" fill="#10B981" />
            <circle
              cx="78"
              cy="172"
              r="7"
              fill="none"
              stroke="#10B981"
              strokeWidth="1.2"
              opacity="0.75"
            >
              <animate
                attributeName="r"
                values="3;10;3"
                dur="2.4s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values="0.8;0.2;0.8"
                dur="2.4s"
                repeatCount="indefinite"
              />
            </circle>

            <circle cx="288" cy="204" r="3.2" fill="#F59E0B" />
            <circle
              cx="288"
              cy="204"
              r="7"
              fill="none"
              stroke="#F59E0B"
              strokeWidth="1.2"
              opacity="0.75"
            >
              <animate
                attributeName="r"
                values="3;11;3"
                dur="2.8s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values="0.8;0.2;0.8"
                dur="2.8s"
                repeatCount="indefinite"
              />
            </circle>
          </g>

          {/* Sweeping 2.5D Radar / Sensor Scan Cone */}
          <g className="aess-radar-sweep">
            <path
              d="M 190 185 L 125 35 A 150 75 0 0 1 255 45 Z"
              fill="url(#aess-sweep-grad)"
            />
            <line
              x1="190"
              y1="185"
              x2="255"
              y2="45"
              stroke="#F59E0B"
              strokeWidth="2"
              opacity="0.9"
            />
          </g>

          {/* Curved Atmospheric Earth Horizon at Bottom */}
          <path
            d="M 5 375 Q 190 315, 375 375"
            fill="none"
            stroke="#0369A1"
            strokeWidth="7"
            opacity="0.35"
          />
          <path
            d="M 5 375 Q 190 315, 375 375"
            fill="none"
            stroke="#0284C7"
            strokeWidth="3.5"
            opacity="0.7"
          />
          <path
            d="M 5 375 Q 190 315, 375 375"
            fill="none"
            stroke="#38BDF8"
            strokeWidth="1.6"
            opacity="0.95"
          />
          <path
            d="M 5 375 Q 190 315, 375 375"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="0.8"
            opacity="0.85"
          />

          {/* Hero 2.5D Satellite & Avionics Payload (Rich Multi-Planar Depth) */}
          <g className="aess-satellite-float">
            {/* Ground / Orbital Drop Shadow */}
            <ellipse
              cx="190"
              cy="225"
              rx="48"
              ry="16"
              fill="#01040A"
              opacity="0.65"
              filter="url(#aess-shadow-blur)"
            />

            {/* Scientific Magnetometer Instrument Boom */}
            <line
              x1="190"
              y1="145"
              x2="242"
              y2="102"
              stroke="#64748B"
              strokeWidth="1.8"
            />
            <circle
              cx="242"
              cy="102"
              r="3"
              fill="#CBD5E1"
              stroke="#334155"
              strokeWidth="1"
            />

            {/* Signal Transmission Pulse Waves from Dish */}
            <circle
              cx="190"
              cy="102"
              r="14"
              fill="none"
              stroke="#F59E0B"
              strokeWidth="1.4"
              className="aess-signal-ping"
            />
            <circle
              cx="190"
              cy="102"
              r="26"
              fill="none"
              stroke="#F59E0B"
              strokeWidth="1.1"
              className="aess-signal-ping"
              style={{ animationDelay: "-1.4s" }}
            />

            {/* ─── Left Solar Array (2.5D Extruded Panel) ─── */}
            <g id="left-wing">
              {/* Articulated Mount Boom */}
              <line
                x1="126"
                y1="182"
                x2="160"
                y2="192"
                stroke="#F59E0B"
                strokeWidth="3.2"
                strokeLinecap="round"
              />
              <circle cx="160" cy="192" r="2.5" fill="#B45309" />
              {/* Panel Thickness / Bottom Edge */}
              <polygon points="56,192 126,204 126,209 56,197" fill="#78350F" />
              {/* Panel Side Bevel */}
              <polygon points="50,172 56,192 56,197 50,177" fill="#92400E" />
              {/* Panel Top Active Photovoltaic Face */}
              <polygon
                points="50,172 120,184 126,204 56,192"
                fill="url(#aess-solar-pv)"
                stroke="#F59E0B"
                strokeWidth="1.4"
              />
              {/* Solar Cell Grid Divides */}
              <line
                x1="68"
                y1="175"
                x2="74"
                y2="195"
                stroke="#60A5FA"
                strokeWidth="0.8"
                opacity="0.75"
              />
              <line
                x1="86"
                y1="178"
                x2="92"
                y2="198"
                stroke="#60A5FA"
                strokeWidth="0.8"
                opacity="0.75"
              />
              <line
                x1="104"
                y1="181"
                x2="110"
                y2="201"
                stroke="#60A5FA"
                strokeWidth="0.8"
                opacity="0.75"
              />
              <line
                x1="53"
                y1="182"
                x2="123"
                y2="194"
                stroke="#60A5FA"
                strokeWidth="0.8"
                opacity="0.75"
              />
            </g>

            {/* ─── Right Solar Array (2.5D Extruded Panel) ─── */}
            <g id="right-wing">
              {/* Articulated Mount Boom */}
              <line
                x1="220"
                y1="188"
                x2="254"
                y2="198"
                stroke="#F59E0B"
                strokeWidth="3.2"
                strokeLinecap="round"
              />
              <circle cx="220" cy="188" r="2.5" fill="#B45309" />
              {/* Panel Thickness / Bottom Edge */}
              <polygon
                points="254,198 324,210 324,215 254,203"
                fill="#78350F"
              />
              {/* Panel Side Bevel */}
              <polygon
                points="324,210 330,190 330,195 324,215"
                fill="#92400E"
              />
              {/* Panel Top Active Photovoltaic Face */}
              <polygon
                points="248,178 318,190 324,210 254,198"
                fill="url(#aess-solar-pv)"
                stroke="#F59E0B"
                strokeWidth="1.4"
              />
              {/* Solar Cell Grid Divides */}
              <line
                x1="266"
                y1="181"
                x2="272"
                y2="201"
                stroke="#60A5FA"
                strokeWidth="0.8"
                opacity="0.75"
              />
              <line
                x1="284"
                y1="184"
                x2="290"
                y2="204"
                stroke="#60A5FA"
                strokeWidth="0.8"
                opacity="0.75"
              />
              <line
                x1="302"
                y1="187"
                x2="308"
                y2="207"
                stroke="#60A5FA"
                strokeWidth="0.8"
                opacity="0.75"
              />
              <line
                x1="251"
                y1="188"
                x2="321"
                y2="200"
                stroke="#60A5FA"
                strokeWidth="0.8"
                opacity="0.75"
              />
            </g>

            {/* ─── Central Satellite Bus (Isometric 2.5D Hexahedron with Multi-Planar Depth) ─── */}
            <g id="sat-bus">
              {/* Top Face (Illuminated by Sunlight) */}
              <polygon
                points="190,146 222,162 190,178 158,162"
                fill="url(#aess-gold-top)"
                stroke="#B45309"
                strokeWidth="1"
              />
              <polygon
                points="186,151 210,162 190,172 166,160"
                fill="#FEF08A"
                opacity="0.85"
              />

              {/* Left Face (Midtone Gold Foil with Seam Lines) */}
              <polygon
                points="158,162 190,178 190,218 158,202"
                fill="url(#aess-gold-left)"
                stroke="#B45309"
                strokeWidth="1"
              />
              <line
                x1="158"
                y1="182"
                x2="190"
                y2="198"
                stroke="#78350F"
                strokeWidth="0.8"
                opacity="0.5"
              />
              {/* Thermal Radiator Louver */}
              <polygon
                points="168,178 180,184 180,198 168,192"
                fill="#0F172A"
                stroke="#475569"
                strokeWidth="0.8"
              />

              {/* Right Face (Deep Shadow Gold Foil) */}
              <polygon
                points="190,178 222,162 222,202 190,218"
                fill="url(#aess-gold-right)"
                stroke="#B45309"
                strokeWidth="1"
              />
              <line
                x1="190"
                y1="198"
                x2="222"
                y2="182"
                stroke="#78350F"
                strokeWidth="0.8"
                opacity="0.5"
              />

              {/* Star Tracker Optical Camera Cylinder */}
              <ellipse
                cx="208"
                cy="184"
                rx="4.5"
                ry="3.2"
                fill="#0A0E1A"
                stroke="#38BDF8"
                strokeWidth="1.2"
              />
              <circle cx="208" cy="184" r="1.8" fill="#00E5FF" />

              {/* ─── High-Gain Parabolic Dish Antenna (True 2.5D Depth) ─── */}
              <g id="parabolic-dish">
                {/* Gimbal Stalk */}
                <line
                  x1="190"
                  y1="146"
                  x2="190"
                  y2="124"
                  stroke="#64748B"
                  strokeWidth="2.8"
                  strokeLinecap="round"
                />
                {/* Outer Dish Rim */}
                <ellipse
                  cx="190"
                  cy="116"
                  rx="24"
                  ry="10"
                  fill="#CBD5E1"
                  stroke="#334155"
                  strokeWidth="1.5"
                />
                {/* Concave Dish Shadow */}
                <ellipse cx="190" cy="116" rx="19" ry="7.5" fill="#475569" />
                <ellipse cx="190" cy="116" rx="13" ry="5" fill="#1E293B" />
                {/* Feed Horn Struts */}
                <line
                  x1="176"
                  y1="116"
                  x2="190"
                  y2="102"
                  stroke="#94A3B8"
                  strokeWidth="1.3"
                />
                <line
                  x1="204"
                  y1="116"
                  x2="190"
                  y2="102"
                  stroke="#94A3B8"
                  strokeWidth="1.3"
                />
                {/* Transceiver Beacon Tip */}
                <circle
                  cx="190"
                  cy="102"
                  r="3.2"
                  fill="#F59E0B"
                  filter="url(#aess-glow)"
                />
                <circle cx="190" cy="102" r="1.2" fill="#FFFFFF" />
              </g>
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
}

export default function SocietiesPage() {
  const [activeId, setActiveId] = useState("student-branch");
  const headerRef = useRef(null);
  const scrollRef = useRef(null);
  const active = SOCIETIES.find((s) => s.id === activeId);
  const Icon = active.icon;

  useEffect(() => {
    window.scrollTo(0, 0);
    gsap.fromTo(
      headerRef.current?.children,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        delay: 0.15,
      },
    );
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = 0;
    }
    gsap.fromTo(
      ".soc-event-tile",
      { y: 22, opacity: 0, scale: 0.98 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.45,
        stagger: 0.08,
        ease: "power2.out",
        delay: 0.08,
      },
    );
  }, [activeId]);

  const scrollEvents = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -330 : 330;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <>
      <div className="soc-page">
        <header ref={headerRef} className="soc-hero">
          <p className="soc-hero-eyebrow">Explore Chapters</p>
          <h1>Societies</h1>
          <p>
            Select a chapter to dive into its mission, events and community.
          </p>
        </header>

        <div className="soc-shell">
          <nav className="soc-rail" aria-label="Society chapters">
            {SOCIETIES.map((s, idx) => {
              const SIcon = s.icon;
              return (
                <button
                  key={s.id}
                  type="button"
                  className={`soc-rail-btn ${activeId === s.id ? "soc-rail-active" : ""}`}
                  style={{ "--rail-accent": s.accent }}
                  onClick={() => setActiveId(s.id)}
                >
                  <span className="soc-rail-idx">0{idx + 1}</span>
                  <SIcon size={17} className="soc-rail-icon" />
                  <span className="soc-rail-name">{s.short}</span>
                  {activeId === s.id && (
                    <ChevronRight size={14} className="soc-rail-arrow" />
                  )}
                </button>
              );
            })}
          </nav>

          <article
            key={activeId}
            className="soc-stage"
            style={{ "--stage-accent": active.accent }}
          >
            <div className="soc-stage-top">
              <div className="soc-stage-copy">
                {active.tagline && (
                  <span className="soc-stage-tag">{active.tagline}</span>
                )}
                <div className="soc-title-wrap">
                  <div
                    className="soc-logo-badge"
                    aria-label={`${active.name} official emblem`}
                  >
                    <Icon
                      size={26}
                      strokeWidth={2.6}
                      className="soc-badge-icon"
                    />
                  </div>
                  <h2>{active.name}</h2>
                </div>
                <p>{active.about}</p>
                {active.extra && (
                  <p className="soc-stage-extra">{active.extra}</p>
                )}
                {active.comingSoon && (
                  <span className="soc-soon">More programs coming soon</span>
                )}
              </div>
              <div className="soc-stage-visual">
                {active.animation ? (
                  <iframe
                    title={active.name}
                    className="soc-lottie"
                    src={active.animation}
                  />
                ) : active.id === "eds" ? (
                  <EdsMinimalVisual />
                ) : active.id === "sps" ? (
                  <SpsWaveVisual />
                ) : active.id === "aess" ? (
                  <AessAerospaceVisual />
                ) : (
                  <div className="soc-visual-empty">
                    <Icon size={48} />
                  </div>
                )}
              </div>
            </div>

            {active.events.length > 0 && (
              <div className="soc-events-block">
                <h3>Featured Events</h3>
                <div className="soc-events-scroll" ref={scrollRef}>
                  {active.events.map((evt, i) => (
                    <div key={i} className="soc-event-tile">
                      <span className="soc-event-idx">
                        {evt.num || String(i + 1).padStart(2, "0")}
                      </span>
                      <h4>{evt.title}</h4>
                      <p>{evt.desc}</p>
                    </div>
                  ))}
                </div>

                <div className="soc-track-bar">
                  <button
                    type="button"
                    className="soc-track-arrow"
                    onClick={() => scrollEvents("left")}
                    aria-label="Scroll left"
                  >
                    ◀
                  </button>
                  <div className="soc-track-line" />
                  <button
                    type="button"
                    className="soc-track-arrow"
                    onClick={() => scrollEvents("right")}
                    aria-label="Scroll right"
                  >
                    ▶
                  </button>
                </div>
              </div>
            )}
          </article>
        </div>
      </div>
    </>
  );
}
