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
  Terminal,
} from "lucide-react";
import gsap from "gsap";
import "../styles/societies.css";

const SOCIETIES = [
  {
    id: "student-branch",
    short: "Student Branch",
    name: "IEEE-SJCE Student Branch",
    icon: Zap,
    accent: "#3B82F6",
    animation:
      "https://lottie.host/?file=89a9d017-c9c2-4e7c-a02e-c33653a6972a/3dpYgASICZ.json",
    tagline: "Advancing technology and professional development.",
    about:
      "IEEE-SJCE Student Branch, established in the year 1991, celebrates 35 years of excellence. Having started as an elite group, today it has sprawled throughout the campus of SJCE, making students technically more competitive, more professional, and capable of enhancing their abilities as engineers. Since then, IEEE-SJCE Student Branch, a division under Region 10 of IEEE, has been known for the immensity with which its members were bestowed. The very success story of its students as professionals speaks to its standards. IEEE-SJCE Student Branch has grown to represent 330+ members across six engineering disciplines. With a focus on technical excellence and professional growth, we conduct two major technical fests annually and organize workshops to keep students industry-ready.",
    events: [
      {
        title: "ORIENTATION DAY",
        desc: "The premier annual induction event welcoming new members to IEEE-SJCE. Students meet the Execom, discover technical societies, connect with mentors and seniors, and embark on an enriching engineering journey.",
      },
      {
        title: "TECHTOUR (INDUSTRIAL VISIT)",
        desc: "Educational industrial study visits to ISRO Telemetry, Tracking and Command Network (ISTRAC) and the Centre for Nanoscience and Engineering (CeNSE) at IISc Bengaluru, providing firsthand exposure to satellite mission telemetry, cleanroom semiconductor fabrication, and molecular characterization labs.",
      },
      {
        title: "FUN-FINITY / FUNsane",
        desc: "Signature freshers welcome and social gathering evenings dedicated to breaking away from routine, unwinding, and celebrating community spirit through interactive team challenges, icebreakers, music, and laughter.",
      },
      {
        title: "RADIOVERSE",
        desc: "A two-day immersive technical exploration into radio frequency engineering, wireless telemetry, antenna design, and radar applications with live simulation sessions and demonstrations.",
      },
      {
        title: "TECH DETECTIVE",
        desc: "Celebrated on the occasion of IEEE Day, an exhilarating technical deduction and clue-hunting contest where participants decipher encrypted signals, solve cryptic hardware puzzles, and crack complex engineering mysteries.",
      },
      {
        title: "CIRCUITRIX",
        desc: "Hands-on circuit simulation competition challenging participants to create, analyze, and troubleshoot analog and digital circuits using modern SPICE tools.",
      },
      {
        title: "ELECTROCLUES",
        desc: "An engaging circuit debugging and deduction competition organized under the IEEE Illuminate series for IEEE Day. Features 'Wire and Win' rapid-fire circuit debugging with a 90-second buzzer clock alongside deductive electronics puzzle challenges.",
      },
      {
        title: "PRE-CONFERENCE WORKSHOP (ICETEG)",
        desc: "Hosted as part of the International Conference on Emerging Technologies in Electronics and Green Energy (ICETEG) in association with MathWorks and Hub Energy, exploring AI in energy systems, digital twins, battery life prediction, and automated HDL code generation.",
      },
      {
        title: "TUXEDO",
        desc: "IEEE-SJCE's signature odd-semester technical fest spanning a full week of multidisciplinary workshops, tech competitions, paper presentations, and hackathons.",
      },
    ],
  },
  {
    id: "eds",
    short: "EDS",
    name: "ELECTRON DEVICES SOCIETY",
    icon: Cpu,
    accent: "#00E5FF",
    animation: "",
    tagline: "Semiconductor devices, circuits & hardware innovation.",
    about:
      "IEEE-SJCE EDS bridges the gap between classroom semiconductor theory and real-world hardware. We host hands-on workshops covering fundamental circuit design, PCB fabrication, VLSI design using Cadence, and embedded robotics—giving students practical exposure to modern electronic systems.",
    events: [
      {
        title: "SNAP CIRCUITS",
        desc: "EDS's annual flagship hands-on electronics workshop conducted across multiple editions (2023, 2024, 2025, 2026). Freshers gain practical experience with breadboard connections, transistors as switches, logic gates, 7-segment displays, and capacitor circuits using Snap Circuits modular kits without requiring prior electronics knowledge.",
      },
      {
        title: "SOLDERING & ETCHING WORKSHOP",
        desc: "Flagship multi-day hardware fabrication workshop moving students from schematics to physical printed circuit boards through 3 structured phases: breadboarding & LED blinking, 555 timer circuits & perfboard soldering, and KiCad PCB design with chemical etching, ironing, and drilling.",
      },
      {
        title: "CADENCE WORKSHOP",
        desc: "Explore analog circuit design and simulation using industry-standard Cadence EDA tools. Practical sessions cover schematic capture, layout verification (DRC/LVS), and IC simulation workflows.",
      },
      {
        title: "ROBOTICS WORKSHOP",
        desc: "Organized in collaboration with the Robotics & Automation Society (RAS), including flagship editions like Robotics'16 with the innovative 'Two-Bot Concept' and Robotics'17, covering microcontroller architectures, sensor integration, and firmware programming to engineer functional autonomous robots.",
      },
      {
        title: "SPICELAB (CIRCUIT SIMULATION)",
        desc: "Hands-on circuit simulation workshop organized in collaboration with RAS and WIE under the IEEE Illuminate series for IEEE Day, utilizing LTspice software to design, test, probe, and simulate analog rectifiers and digital logic gates and adders.",
      },
      {
        title: "QUIZ QUAKE",
        desc: "A four-round technical and aptitude quiz competition organized jointly with RAS and WIE for first- and second-year students, featuring aptitude tests, riddles, logo identification, and engineering puzzles.",
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
        title: "KALPANA CHAWLA MEMORIAL LECTURE",
        desc: "A prestigious flagship memorial lecture organized by IEEE WIE exploring the evolution, achievements, and future horizons of the Indian Space Programme and honoring women leaders in STEM.",
      },
      {
        title: "TCL WORKSHOP: PRINCIPLES & APPLICATIONS",
        desc: "An intensive hands-on session introducing Tool Command Language (TCL) fundamentals, syntax, loops, and file operations for Electronic Design Automation (EDA) scripting.",
      },
      {
        title: "PRAYAS",
        desc: "Signature philanthropic and STEM outreach initiative ('Platform for Rendering Aid to Young Kids and Aiming to Spread Smiles') conducted across multiple school and hostel visits (Visits 4–8), delivering science modules, national flag tricolour awareness, menstrual health seminars, and physics/chemistry demonstrations to underprivileged children across Mysuru.",
      },
      {
        title: "AI EXPERT TALK AND IDEATHON",
        desc: "Organized under STRONG (Scientific Research for NextGen GirlGeeks) in collaboration with the Marie Curie Alumni Association (MCAA) India Chapter, funded by the European Union, and supported by IEEE Mysore Subsection and IEEE-SJCE, inspiring young women in STEM through research talks and an interactive Ideathon with awards.",
      },
      {
        title: "SQL BOOTCAMP",
        desc: "A hands-on two-day online database bootcamp organized by WIE in association with IEEE Bangalore Section & IEEE Mysore Subsection, introducing DBMS fundamentals, complex SQL queries, multi-table joins, Slido quizzes, and mini-projects.",
      },
      {
        title: "SPICELAB (CIRCUIT SIMULATION)",
        desc: "Circuit simulation workshop organized in collaboration with EDS and RAS under the IEEE Illuminate series for IEEE Day, utilizing LTspice to draft, probe, and analyze analog and digital circuit architectures.",
      },
      {
        title: "QUIZ QUAKE",
        desc: "A four-round technical and aptitude quiz competition organized in collaboration with EDS and RAS, testing aptitude, logic, and engineering fundamentals for 1st- and 2nd-year students.",
      },
      {
        title: "WEB DEV BOOTCAMP",
        desc: "Hands-on web development bootcamp organized in collaboration with the Robotics & Automation Society (RAS), covering responsive web architecture, JavaScript, and site deployment.",
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
        title: "IoT WORKSHOP SERIES",
        desc: "Flagship multi-day workshop series (covering editions like IoT 3.0 and IoT 4.0) giving participants practical exposure to smart connected devices, MicroPython, sensor interfacing, MQTT/cloud protocols, RGB LED server booting, and NodeMCU/Raspberry Pi microcontrollers.",
      },
      {
        title: "TECHKSHETRA",
        desc: "Premier inter-college project exposition organized in collaboration with IEEE Mysuru Subsection and SPS. Features Category I (1st/2nd years) and Category II (3rd/4th years) competitive showcases across AI, robotics, IoT, drones, and integrated hardware-software systems.",
      },
      {
        title: "ROBOTICS WORKSHOP",
        desc: "Conducted in collaboration with the Electron Devices Society (EDS), featuring annual flagships such as Robotics'16 with its unique 'Two-Bot Concept' and Robotics'17, focusing on mechanical fabrication, sensor interfacing, and motion algorithms for autonomous robots.",
      },
      {
        title: "TECH TALK: CONTROL AND GUIDANCE SYSTEMS IN SPACE",
        desc: "A distinguished technical lecture organized by RAS featuring Dr. Ravikumar Lagisetty (Group Director, Mission Simulation Group, URSC, ISRO) exploring satellite orbit maintenance, control and guidance architectures, and Chandrayaan-3 and space docking mission case studies.",
      },
      {
        title: "TECH TALK ON MOTION PLANNING IN ROBOTICS",
        desc: "Joint technical session conducted in collaboration with the Signal Processing Society (SPS), exploring classical search-based, sampling-based, and visual motion planning algorithms using ROS 2, Nav2, and MoveIt for autonomous mobile robots.",
      },
      {
        title: "HANDS-ON MATLAB WORKSHOP: SIGNAL PROCESSING AND CONTROL SYSTEMS",
        desc: "A two-day hands-on workshop organized collaboratively by RAS, SPS, and AESS in association with the ECE Department, conducted by Dr. Riyaz A. Rahiman (CoreEL Technologies), introducing MATLAB, Simulink, and Simscape for control systems and signal workflows.",
      },
      {
        title: "SPICELAB (CIRCUIT SIMULATION)",
        desc: "Hands-on circuit simulation workshop organized in collaboration with EDS and WIE under the IEEE Illuminate series for IEEE Day, utilizing LTspice for circuit analysis across analog and digital systems.",
      },
      {
        title: "QUIZ QUAKE",
        desc: "A four-round technical and aptitude quiz competition organized in collaboration with EDS and WIE, featuring aptitude challenges, riddles, logo identification, and engineering puzzles.",
      },
      {
        title: "WEB DEV BOOTCAMP",
        desc: "Hands-on web development bootcamp organized in collaboration with Women in Engineering (WIE), introducing modern web technologies, responsive UI design, and website deployment.",
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
        title: "THE WAVE: SPEECH AS A WINDOW TO THE BRAIN",
        desc: "Distinguished lecture series organized in association with IEEE SPS Bangalore Section, IEEE Bangalore Section, and IEEE Mysore Subsection, featuring Dr. Radha Kodali (Univ. of Tennessee & Le Bonheur Children's Hospital, USA) exploring speech biomarkers and healthcare AI in neuroscience.",
      },
      {
        title: "SPS WING INAUGURATION & AUDIO DSP TECH TALK",
        desc: 'Formal wing launch in association with IEEE SPS Bangalore Section, featuring a technical keynote by Dr. Jayasudha BSK (Harman International / Vice Chair, IEEE SPS Bangalore Section) on "Deep Dive into Audio Signal Processing" and automotive audio DSP.',
      },
      {
        title: "ML WORKSHOP",
        desc: "A 3-day flagship workshop covering Machine Learning fundamentals, algorithmic modeling in Python, and building local edge-AI inference systems using ESP32, MPU6050, and motion inputs.",
      },
      {
        title: "MOTION PLANNING IN ROBOTICS",
        desc: "Technical session conducted in collaboration with the Robotics & Automation Society (RAS), exploring path navigation algorithms, visual motion planning, and ROS 2 autonomous robotics.",
      },
      {
        title: "WAVE LAB",
        desc: "The debut hands-on workshop of the SPS Wing utilizing MATLAB to explore fundamental digital signal processing concepts, audio transformations, and practical filter design.",
      },
      {
        title: "HANDS-ON MATLAB WORKSHOP: SIGNAL PROCESSING AND CONTROL SYSTEMS",
        desc: "A two-day hands-on workshop organized collaboratively by SPS, RAS, and AESS in association with the ECE Department, conducted by Dr. Riyaz A. Rahiman (CoreEL Technologies), introducing MATLAB, Simulink, and Simscape for signal processing workflows.",
      },
      {
        title: "TECHKSHETRA",
        desc: "Flagship project exposition organized in collaboration with the Robotics & Automation Society (RAS), where participants showcase working prototypes, signal processing implementations, and technical innovations.",
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
        title: "AESS STUDENT CHAPTER INAUGURATION & TECHNICAL TALK ON SPACE TECHNOLOGY",
        desc: "Formal inauguration of the IEEE AESS student chapter on 23rd July 2026 organized in association with IEEE AESS and ISRO, featuring chief guest Dr. Braham Himed (President, IEEE AESS & AFRL USA) and Sri Puneeth Kumar Mishra (ISRO), with technical sessions on radar and satellite tech.",
      },
      {
        title: "HANDS-ON MATLAB WORKSHOP: SIGNAL PROCESSING AND CONTROL SYSTEMS",
        desc: "A two-day hands-on workshop organized collaboratively by AESS, SPS, and RAS in association with the ECE Department, conducted by Dr. Riyaz A. Rahiman (CoreEL Technologies), introducing system modeling, simulation, and aerospace control systems using MATLAB and Simulink.",
      },
    ],
  },
  {
    id: "cs",
    short: "CS",
    name: "COMPUTER SOCIETY",
    icon: Terminal,
    accent: "#2563EB",
    animation: "",
    tagline: "COMPUTING, ALGORITHMIC SYSTEMS & SOFTWARE INNOVATION.",
    about:
      "IEEE-SJCE Computer Society (CS) is dedicated to advancing the theory, design, practice, and application of computer science and information technology. Inaugurated alongside the Orientation Program of 2026, the chapter bridges academic computer science with high-impact software engineering. IEEE CS empowers students across key frontiers including Artificial Intelligence, Machine Learning, Cloud Systems, Cybersecurity, Distributed Architecture, and Competitive Programming through intensive bootcamps, technical hackathons, open-source initiatives, and direct industry mentorship.",
    events: [
      {
        title: "IEEE COMPUTER SOCIETY CHAPTER INAUGURATION",
        desc: "Official chapter launch formally inaugurated alongside the IEEE-SJCE Orientation Day 2026, establishing a dedicated society for computing, algorithmic systems, and software engineering.",
      },
    ],
  },
];

/* ─── Animated CS Terminal / Code Visual ─── */
function CsTerminalVisual() {
  return (
    <div
      className="cs-terminal-wrap"
      style={{
        width: "100%",
        maxWidth: "340px",
        background: "#080D1A",
        border: "2px solid #2563EB",
        boxShadow: "6px 6px 0 0 #2563EB",
        padding: "16px",
        fontFamily: "var(--font-mono, monospace)",
        fontSize: "12px",
        color: "#93C5FD",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "6px",
          marginBottom: "14px",
          borderBottom: "1px solid rgba(37,99,235,0.3)",
          paddingBottom: "8px",
        }}
      >
        <span
          style={{
            width: "10px",
            height: "10px",
            borderRadius: "50%",
            background: "#EF4444",
            display: "inline-block",
          }}
        />
        <span
          style={{
            width: "10px",
            height: "10px",
            borderRadius: "50%",
            background: "#F59E0B",
            display: "inline-block",
          }}
        />
        <span
          style={{
            width: "10px",
            height: "10px",
            borderRadius: "50%",
            background: "#10B981",
            display: "inline-block",
          }}
        />
        <span
          style={{
            marginLeft: "8px",
            fontSize: "10px",
            letterSpacing: "1px",
            textTransform: "uppercase",
            color: "#60A5FA",
          }}
        >
          ieee_cs_wing.sh
        </span>
      </div>
      <div style={{ lineHeight: "1.8", color: "#E2E8F0" }}>
        <div>
          <span style={{ color: "#3B82F6" }}>const</span>{" "}
          <span style={{ color: "#00E5FF" }}>chapter</span> ={" "}
          <span style={{ color: "#F59E0B" }}>"IEEE-SJCE CS"</span>;
        </div>
        <div>
          <span style={{ color: "#3B82F6" }}>const</span>{" "}
          <span style={{ color: "#00E5FF" }}>status</span> ={" "}
          <span style={{ color: "#10B981" }}>"ACTIVE · 2026"</span>;
        </div>
        <div>
          <span style={{ color: "#A855F7" }}>function</span>{" "}
          <span style={{ color: "#60A5FA" }}>innovate</span>() &#123;
        </div>
        <div style={{ paddingLeft: "14px" }}>
          <span style={{ color: "#3B82F6" }}>return</span> [
          <span style={{ color: "#F59E0B" }}>"AI"</span>,{" "}
          <span style={{ color: "#F59E0B" }}>"Cloud"</span>,{" "}
          <span style={{ color: "#F59E0B" }}>"Cyber"</span>];
        </div>
        <div>&#125;</div>
        <div style={{ marginTop: "6px", color: "#00E5FF" }}>
          &gt; chapter.launch()
          <span
            className="cs-cursor"
            style={{
              display: "inline-block",
              width: "8px",
              height: "14px",
              background: "#00E5FF",
              verticalAlign: "middle",
              marginLeft: "4px",
            }}
          >
            _
          </span>
        </div>
      </div>
    </div>
  );
}

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
                ) : active.id === "cs" ? (
                  <CsTerminalVisual />
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
