import { useEffect, useRef, useState } from 'react'
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Wrench,
  Radio,
  Wifi,
  Zap,
  CircuitBoard,
  Brain,
  Code,
  Trophy,
  Heart,
  Bot,
  Rocket,
  Search,
  Users,
  Image as ImageIcon,
  AudioWaveform,
  PartyPopper,
  Microscope,
  Database,
} from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import '../styles/events.css'

gsap.registerPlugin(ScrollTrigger)

// Chronology follows the legacy site: newest events first.
const EVENTS = [
  {
    title: 'Snap Circuits',
    date: '5–6 NOV 2026',
    wing: 'EDS',
    description:
      'The Electron Devices Society conducted Snap Circuits, giving freshers a hands-on experience with electronic components, circuit prototyping, and basic hardware debugging.',
    icon: <Zap size={22} />,
    accent: '#00F5D4',
    image: '/photos/events/anap_circuits_2026.jpeg',
    imageAlt: 'Snap Circuits November 2026 poster',
  },
  {
    title: 'MATLAB Workshop',
    date: '4–5 NOV 2026',
    wing: 'SPS · RAS · AESS',
    description:
      'A joint initiative organized collaboratively by SPS, RAS, and AESS in association with the ECE Department. An intensive two-day hands-on workshop covering computational mathematics, matrix manipulation, algorithm development, and practical signal processing and control systems workflows.',
    icon: <Code size={22} />,
    accent: '#8B5CF6',
    image: '/photos/events/matlab.png',
    imageAlt: 'MATLAB Workshop session, November 2026',
    imagePosition: 'center 40%',
  },
  {
    title: 'Tech Detective',
    date: '16 OCT 2026',
    wing: 'IEEE DAY',
    description:
      'Celebrated as part of IEEE Day, an exhilarating technical deduction contest challenging participants to crack cryptic hardware puzzles, decipher signals, and solve engineering mysteries.',
    icon: <Search size={22} />,
    accent: '#00E5FF',
    image: '/photos/events/tech_detective.jpeg',
    imageAlt: 'Tech Detective IEEE Day event poster',
  },
  {
    title: 'Radioverse',
    date: '8–9 OCT 2026',
    wing: 'IEEE-SJCE',
    description:
      'A two-day immersive exploration into radio frequency engineering, wireless telemetry, antenna design, and radar applications with live demonstrations and simulation sessions.',
    icon: <Radio size={22} />,
    accent: '#3B82F6',
    image: '/photos/events/radio.jpeg',
    imageAlt: 'Radioverse event poster',
  },
  {
    title: 'Orientation Day',
    date: '26 SEP 2026',
    wing: 'IEEE-SJCE',
    description:
      'The premier induction welcoming new engineering students to IEEE-SJCE. Freshers explored our societies, interacted with seniors and Execom members, and discovered the technical, leadership, and professional opportunities ahead.',
    icon: <Users size={22} />,
    accent: '#10B981',
    image: '/photos/events/orientation_day_2026.jpg',
    imageAlt: 'IEEE-SJCE Orientation Day 2026 poster',
    imagePosition: 'center 28%',
  },
  {
    title: 'FUNsane',
    date: '25 SEP 2026',
    wing: 'IEEE-SJCE',
    description:
      'An unforgettable evening dedicated to breaking away from routine, unwinding, and celebrating community spirit. Students immersed themselves in energetic team challenges, interactive games, lively music, and memorable moments filled with laughter and camaraderie.',
    icon: <PartyPopper size={22} />,
    accent: '#A855F7',
    image: '/photos/events/funsane_2026.jpg',
    imageAlt: 'FUNsane event poster, September 2026',
    imagePosition: 'center 32%',
  },
  {
    title: 'AESS Chapter Inauguration & Space Tech Talk',
    date: '23 JUL 2026',
    wing: 'AESS',
    description:
      'Formal inauguration of the IEEE AESS student chapter featuring chief guest Dr. Braham Himed (President, IEEE AESS) and Sri Puneeth Kumar Mishra (ISRO), accompanied by an insightful technical session on radar systems and satellite technology.',
    icon: <Rocket size={22} />,
    accent: '#F59E0B',
    image: '/photos/events/aess inaugaration.jpeg',
    imageAlt: 'AESS Chapter Inauguration event poster',
  },
  {
    title: 'THE WAVE: Speech as a Window to the Brain',
    date: '4 JUL 2026',
    wing: 'SPS',
    description:
      'Lecture series session with Dr. Radha Kodali (Univ. of Tennessee & Le Bonheur Children\'s Hospital, USA) exploring speech signal biomarkers, AI in neurological diagnosis, pediatric epilepsy, and clinical brain data analysis.',
    icon: <Brain size={22} />,
    accent: '#8B5CF6',
    image: '/photos/events/the_wave_2026.jpg',
    imageAlt: 'THE WAVE Lecture Series: Speech as a Window to the Brain poster',
    imagePosition: 'center 24%',
  },
  {
    title: 'Techtour',
    date: '3 JUL 2026',
    wing: 'IEEE-SJCE',
    description:
      'An educational industrial visit to the Centre for Nanoscience and Engineering (CeNSE), IISc Bengaluru. Students explored cutting-edge semiconductor fabrication facilities, advanced molecular laboratories, and networked with leading nanotechnology researchers.',
    icon: <Microscope size={22} />,
    accent: '#06B6D4',
    image: '/photos/events/techtour_2026.jpg',
    imageAlt: 'IEEE-SJCE Techtour industrial visit to CeNSE, IISc Bengaluru',
    imagePosition: 'center 56%',
  },
  {
    title: 'Kalpana Chawla Memorial Lecture',
    date: '15 JUN 2026',
    wing: 'WIE',
    description:
      'A prestigious memorial lecture organized by IEEE WIE exploring the evolution, achievements, and future horizons of the Indian Space Programme and its transformative role in national progress.',
    icon: <Rocket size={22} />,
    accent: '#EC4899',
    image: '/photos/events/kalpana_chawla_2026.jpeg',
    imageAlt: 'Kalpana Chawla Memorial Lecture poster',
  },
  {
    title: 'Motion Planning in Robotics',
    date: '4 JUN 2026',
    wing: 'SPS & RAS',
    description:
      'Joint technical session by SPS and RAS exploring search-based, sampling-based, and visual motion planning algorithms for mobile robotics and autonomous navigation using ROS 2.',
    icon: <Bot size={22} />,
    accent: '#00E5FF',
    image: '/photos/events/motion_planning.jpeg',
    imageAlt: 'Motion Planning in Robotics event poster',
  },
  {
    title: 'Cadence Workshop',
    date: '28 MAY 2026',
    wing: 'EDS',
    description:
      'An intensive hands-on workshop by the Electron Devices Society delving into industry-standard Cadence EDA tools, schematic entry, layout verification, and physical semiconductor design.',
    icon: <CircuitBoard size={22} />,
    accent: '#00F5D4',
    image: '/photos/events/cadence.jpeg',
    imageAlt: 'Cadence Workshop poster',
  },
  {
    title: 'ML Workshop',
    date: '27–29 MAR 2026',
    wing: 'SPS',
    description:
      'A 3-day flagship workshop by the Signal Processing Society covering machine learning fundamentals, modeling in Python, and building local edge-AI inference on ESP32 & MPU6050.',
    icon: <Brain size={22} />,
    accent: '#8B5CF6',
    image: '/photos/events/ml_workshop.jpeg',
    imageAlt: 'ML Workshop poster',
  },
  {
    title: 'TCL Workshop',
    date: '14 MAR 2026',
    wing: 'WIE',
    description:
      'Conducted by Women in Engineering, focusing on Tool Command Language (TCL) scripting for automating digital design flows, synthesis constraints, and simulation regression suites.',
    icon: <Code size={22} />,
    accent: '#F59E0B',
    image: '/photos/events/tcl.jpeg',
    imageAlt: 'TCL Workshop poster',
  },
  {
    title: 'Prayas',
    date: '25 DEC 2025',
    wing: 'WIE',
    description:
      "IEEE WIE's flagship humanitarian outreach initiative, visiting educational institutions to foster curiosity in science and engineering through joyful, hands-on learning sessions.",
    icon: <Heart size={22} />,
    accent: '#FF4081',
    image: '/photos/events/prayas.jpeg',
    imageAlt: 'Prayas event poster',
  },
  {
    title: 'Soldering and Etching Workshop',
    date: '19–21 DEC 2025',
    wing: 'EDS',
    description:
      'A three-day flagship workshop from the Electron Devices Society, giving students hands-on experience of soldering and etching through theoretical and practical sessions.',
    icon: <Wrench size={22} />,
    accent: '#00E5FF',
    image: '/photos/events/soldering.jpeg',
    imageAlt: 'Soldering and Etching workshop poster, December 2025',
    imagePosition: 'center 28%',
  },
  {
    title: 'SPS Wing Inauguration & Tech Talk',
    date: '8 DEC 2025',
    wing: 'SPS',
    description:
      'Formal inauguration welcoming the newly introduced Signal Processing Society (SPS) wing to IEEE-SJCE. Chief Guest Dr. Jayasudha BSK (Vice Chairperson, IEEE SPS Bangalore Section & Senior DSP Engineer, Harman) delivered an insightful technical talk on "Deep Dive into Audio Signal Processing" and real-world automotive DSP applications.',
    icon: <AudioWaveform size={22} />,
    accent: '#8B5CF6',
    image: '/photos/events/sps_inauguration_2025.jpg',
    imageAlt: 'SPS Wing Inauguration and Technical Talk poster, December 2025',
    imagePosition: 'center center',
  },
  {
    title: 'Wave Lab',
    date: '6 DEC 2025',
    wing: 'SPS',
    description:
      'The debut event of the SPS Wing. Students used MATLAB to explore the basics of signal processing with an industry-standard tool, and received a MATLAB license for future work.',
    icon: <Radio size={22} />,
    accent: '#8B5CF6',
    image: '/photos/events/wavelab_2025.jpg',
    imageAlt: 'Wave Lab signal processing workshop poster',
  },
  {
    title: 'IoT 4.0',
    date: '21–23 NOV 2025',
    wing: 'RAS',
    description:
      'The Robotics and Automation Society conducted the IoT 4.0 workshop, giving participants hands-on exposure to building smart, connected systems with embedded platforms.',
    icon: <Wifi size={22} />,
    accent: '#00F5D4',
    image: '/photos/events/iot_4_0_2025.jpg',
    imageAlt: 'IoT 4.0 workshop poster, November 2025',
    imagePosition: 'center 28%',
  },
  {
    title: 'Snap Circuits',
    date: '6–7 NOV 2025',
    wing: 'EDS',
    description:
      'The Electron Devices Society conducted Snap Circuits, giving freshers a hands-on experience of electronic components while building curiosity about circuits and how they work.',
    icon: <Zap size={22} />,
    accent: '#EC4899',
    image: '/photos/events/snap_circuits_2025.jpg',
    imageAlt: 'Snap Circuits event poster, November 2025',
    imagePosition: 'center 28%',
  },
  {
    title: 'Circuitrix',
    date: '25 OCT 2025',
    wing: 'IEEE-SJCE',
    description:
      'A hands-on session designed to help students explore, create and simulate both analog and digital circuits using powerful circuit simulation tools.',
    icon: <CircuitBoard size={22} />,
    accent: '#3B82F6',
    image: '/photos/events/circuitrix_2025.jpg',
    imageAlt: 'Circuitrix circuit simulation event poster',
  },
  {
    title: 'Electroclues',
    date: '13 OCT 2025',
    wing: 'IEEE-SJCE',
    description:
      'Organized under the IEEE Illuminate series for IEEE Day 2025, Electroclues featured "Wire and Win" rapid-fire circuit debugging with a 90-second buzzer round, followed by deductive electronics riddles and technical problem-solving challenges at NPS-001.',
    icon: <Zap size={22} />,
    accent: '#EC4899',
    image: '/photos/events/electroclues_2025.jpg',
    imageAlt: 'Electroclues IEEE Illuminate event poster, October 2025',
  },
  {
    title: 'Pre-Conference Workshop (AI & Digital Twins - ICETEG 2025)',
    date: '9 OCT 2025',
    wing: 'IEEE-SJCE',
    description:
      'Pre-conference workshop for ICETEG 2025 in association with MathWorks and Hub Energy. Explored AI and digital twins in energy systems, battery life prediction, and automated VLSI design with Dr. Puneeth S.B. and Anand Mukhopadhyay at IS Seminar Hall.',
    icon: <Brain size={22} />,
    accent: '#3B82F6',
    image: '/photos/events/pre_conference_iceteg_2025.jpg',
    imageAlt: 'Pre-Conference Workshop AI & Digital Twins ICETEG 2025 poster',
  },
  {
    title: "Robotics'16",
    date: '26–29 JUN 2025',
    wing: 'RAS · EDS',
    description:
      'The four-day annual flagship robotics event introducing the innovative "Two-Bot Concept", where participants engineered dual distinct robot architectures and tackled advanced autonomous navigation arenas with hands-on mentoring.',
    icon: <Bot size={22} />,
    accent: '#8B5CF6',
    image: '/photos/events/robotics_16_2025.jpg',
    imageAlt: 'Robotics 16 annual flagship event poster, June 2025',
  },
  {
    title: 'Tech Tour 2025 (ISRO ISTRAC & CeNSE IISc)',
    date: '20 JUN 2025',
    wing: 'IEEE-SJCE',
    description:
      'An exclusive technical tour for IEEE-SJCE members visiting ISRO’s Telemetry, Tracking and Command Network (ISTRAC) and the Centre for Nano Science and Engineering (CeNSE) at IISc Bangalore, gaining firsthand exposure to mission control and semiconductor cleanrooms.',
    icon: <Rocket size={22} />,
    accent: '#00F5D4',
    image: '/photos/events/techtour_2026.jpg',
    imageAlt: 'Tech Tour to ISRO ISTRAC and CeNSE IISc, June 2025',
  },
  {
    title: 'SQL Bootcamp',
    date: '10–11 MAY 2025',
    wing: 'WIE',
    description:
      'The Women in Engineering wing conducted an intensive two-day online SQL Bootcamp on Google Meet. Students explored relational DBMS concepts, mastered queries from basic SELECT filters to multi-table joins and aggregation, and tackled interactive Slido quizzes and mini-projects.',
    icon: <Database size={22} />,
    accent: '#EC4899',
    image: '/photos/events/sql_bootcamp_2025.jpg',
    imageAlt: 'WIE SQL Bootcamp May 2025 event poster',
    imagePosition: 'center 20%',
  },
  {
    title: 'Techkshetra 2025',
    date: '3 MAY 2025',
    wing: 'RAS',
    description:
      'State-level inter-college technical project exposition organized by RAS in association with IEEE Mysuru Subsection. Showcased hardware and software innovations across Category I (1st/2nd years) and Category II (3rd/4th years) spanning AI, robotics, IoT, and drones.',
    icon: <Trophy size={22} />,
    accent: '#00E5FF',
    image: '/photos/events/techkshetra_2025.jpg',
    imageAlt: 'Techkshetra 2025 project exposition poster',
  },
  {
    title: 'AI Expert Talk and Ideathon',
    date: '11 FEB 2025',
    wing: 'WIE',
    description:
      'STRONG – Scientific Research for NextGen GirlGeeks was organised by the MCAA India Chapter, funded by the European Union, and supported by the MCAA-Mednight Project, IEEE Mysore Subsection and IEEE-SJCE. The event aimed to inspire young women to pursue careers in science and research.',
    icon: <Brain size={22} />,
    accent: '#F59E0B',
    image: '/photos/events/ai_expert_talk_2025.png',
    imageAlt: 'AI Expert Talk and Ideathon event poster, February 2025',
  },
  {
    title: 'Soldering and Etching Workshop',
    date: '10–12 JAN 2025',
    wing: 'EDS',
    description:
      'The Electron Devices Society conducted the Soldering and Etching Workshop, a three-day flagship event giving students practical exposure to soldering and etching.',
    icon: <Wrench size={22} />,
    accent: '#22D3EE',
    image: '/photos/events/soldering_etching_jan_2025.png',
    imageAlt: 'Soldering and Etching workshop poster, January 2025',
    imagePosition: 'center 28%',
  },
  {
    title: 'Tech Talk: Control and Guidance Systems in Space',
    date: '16 DEC 2024',
    wing: 'RAS',
    description:
      'Distinguished lecture by Dr. Ravikumar Lagisetty, Group Director of Mission Simulation Group at URSC (ISRO), exploring satellite orbit mechanics, control and guidance architectures, and Chandrayaan-3 and space docking mission case studies at CMS Seminar Hall.',
    icon: <Rocket size={22} />,
    accent: '#3B82F6',
    image: '/photos/events/control_guidance_space_2024.png',
    imageAlt: 'Tech Talk Control and Guidance Systems in Space poster, December 2024',
  },
  {
    title: 'IoT-3.0 Workshop',
    date: '29 NOV – 1 DEC 2024',
    wing: 'RAS',
    description:
      'A three-day workshop covering IoT protocols and core theory before moving on to hands-on simulations with Raspberry Pi and NodeMCU.',
    icon: <Wifi size={22} />,
    accent: '#60A5FA',
    image: '/photos/events/iot_3_0_poster_2024.png',
    imageAlt: 'IoT 3.0 workshop session, 2024',
  },
  {
    title: 'Snap Circuits',
    date: '13–14 NOV 2024',
    wing: 'EDS',
    description:
      'Hands-on electronics workshop at NPS-001 Polymer Science Block. Participants explored breadboard fundamentals, transistors as switches, logic gates, 7-segment displays, capacitor charging/discharging, and photoelectric circuits using modular Snap Circuits kits.',
    icon: <Zap size={22} />,
    accent: '#EC4899',
    image: '/photos/events/snap_circuits_2024.png',
    imageAlt: 'Snap Circuits event poster, November 2024',
  },
  {
    title: 'Fun-Finity',
    date: '24 OCT 2024',
    wing: 'IEEE-SJCE',
    description:
      'A vibrant freshers welcome social gathering in IS Seminar Hall designed for newcomers to bond with Executive Committee members through icebreakers, team building games, and insights into technical initiatives.',
    icon: <PartyPopper size={22} />,
    accent: '#F59E0B',
    image: '/photos/events/fun_finity_2024.jpg',
    imageAlt: 'Fun-Finity freshers social gathering poster, October 2024',
  },
  {
    title: 'SpiceLab',
    date: '5 OCT 2024',
    wing: 'EDS · RAS · WIE',
    description:
      'A hands-on circuit simulation workshop under the IEEE Illuminate series for IEEE Day 2024. Covered LTspice circuit design, simulation, and analysis across analog rectifiers and digital logic gates and adders in IS Seminar Hall.',
    icon: <CircuitBoard size={22} />,
    accent: '#10B981',
    image: '/photos/events/spicelab_2024.jpg',
    imageAlt: 'SpiceLab LTspice simulation workshop poster, October 2024',
  },
  {
    title: 'Quiz Quake',
    date: '10 AUG 2024',
    wing: 'EDS · RAS · WIE',
    description:
      'A four-round technical and aptitude quiz competition for first- and second-year students organized jointly by EDS, RAS, and WIE. Featured aptitude challenges, riddles, logo identification, and engineering puzzles at NPS-001.',
    icon: <Trophy size={22} />,
    accent: '#F97316',
    image: '/photos/events/quiz_quake_2024.jpg',
    imageAlt: 'Quiz Quake competition poster, August 2024',
  },
  {
    title: "TUXEDO'23",
    date: '28 NOV – 4 DEC 2023',
    wing: 'IEEE-SJCE',
    description:
      "IEEE-SJCE's odd-semester technical fest brought a week of workshops, contests and events, including Snap Circuits, Web Dev Bootcamp and Scribble.",
    icon: <Trophy size={22} />,
    accent: '#00E5FF',
    image: '/photos/events/tuxedo_2023.jpg',
    imageAlt: "TUXEDO'23 technical fest poster",
  },
  {
    title: 'Web Dev Bootcamp',
    date: '30 NOV & 2–3 DEC 2023',
    wing: 'WIE & RAS',
    description:
      'The WIE and RAS wings presented a hands-on bootcamp on building and designing interactive websites, with online sessions on 30 November and 2 December and an offline session on 3 December.',
    icon: <Code size={22} />,
    accent: '#8B5CF6',
    image: '/photos/events/web_dev_bootcamp_2023.jpg',
    imageAlt: "Web Dev Bootcamp poster from TUXEDO'23",
  },
  {
    title: 'Snap Circuits',
    date: '28–29 NOV 2023',
    wing: 'EDS',
    description:
      "The EDS wing's TUXEDO'23 event gave students a hands-on introduction to electronic components and circuit building, with no prior electronics knowledge required.",
    icon: <Zap size={22} />,
    accent: '#EC4899',
    image: '/photos/events/snap_circuits_2023.jpg',
    imageAlt: "Snap Circuits poster from TUXEDO'23",
  },
]

export default function EventsSection() {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const trackRef = useRef(null)
  const cardsRef = useRef([])
  const [activeIndex, setActiveIndex] = useState(0) // newest event

  useEffect(() => {
    // GSAP ScrollTrigger header entrance animation on both mobile & desktop
    if (titleRef.current?.children) {
      gsap.fromTo(titleRef.current.children,
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: titleRef.current, start: 'top 92%', toggleActions: 'play none none none' },
        }
      )
    }

    // GSAP ScrollTrigger cards entrance animation
    gsap.fromTo('.evt-card',
      { y: 50, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: '.evt-timeline-track', start: 'top 88%', toggleActions: 'play none none none' },
      }
    )

    // Animate the timeline line drawing
    gsap.fromTo('.evt-timeline-line-fill',
      { scaleX: 0 },
      {
        scaleX: 1, duration: 1.5, ease: 'power2.out',
        scrollTrigger: { trigger: '.evt-timeline-track', start: 'top 80%', toggleActions: 'play none none none' },
      }
    )

    // Animate timeline dots
    gsap.fromTo('.evt-node',
      { scale: 0 },
      {
        scale: 1, duration: 0.4, stagger: 0.1, ease: 'back.out(2)',
        scrollTrigger: { trigger: '.evt-timeline-track', start: 'top 75%', toggleActions: 'play none none none' },
        delay: 0.6,
      }
    )
  }, [])

  const scrollToCard = (dir) => {
    const next = activeIndex + dir
    if (next < 0 || next >= EVENTS.length) return
    setActiveIndex(next)
  }

  // Center the active card in the viewport
  useEffect(() => {
    if (trackRef.current && cardsRef.current[activeIndex]) {
      const card = cardsRef.current[activeIndex]
      const track = trackRef.current
      const trackRect = track.getBoundingClientRect()
      const cardRect = card.getBoundingClientRect()
      const scrollLeft = track.scrollLeft
      const targetScroll = scrollLeft + cardRect.left - trackRect.left - (trackRect.width / 2) + (cardRect.width / 2)
      track.scrollTo({ left: targetScroll, behavior: 'smooth' })
    }
  }, [activeIndex])

  return (
    <section id="events-section" ref={sectionRef} className="evt-section">
      {/* Circuit board SVG background */}
      <div className="evt-circuit-bg">
        <svg viewBox="0 0 1440 900" xmlns="http://www.w3.org/2000/svg" className="evt-circuit-svg">
          {/* Left circuit traces */}
          <g className="evt-circuit-group" opacity="0.12">
            {/* Left side traces */}
            <path d="M0 200 H80 L120 240 H200" stroke="var(--blue)" strokeWidth="1.5" fill="none" />
            <path d="M0 240 H60 L90 270 H160" stroke="var(--accent)" strokeWidth="1" fill="none" />
            <path d="M0 300 H120" stroke="var(--blue)" strokeWidth="1" fill="none" />
            <path d="M0 340 H40 L70 370 H130" stroke="var(--cyan)" strokeWidth="1.5" fill="none" />
            <circle cx="200" cy="240" r="3" fill="var(--blue)" />
            <circle cx="160" cy="270" r="2.5" fill="var(--accent)" />
            <circle cx="120" cy="300" r="3" fill="var(--blue)" />
            <circle cx="130" cy="370" r="2.5" fill="var(--cyan)" />

            <path d="M0 500 H100 L130 470 H220" stroke="var(--blue)" strokeWidth="1" fill="none" />
            <path d="M0 540 H70 L110 580 H180" stroke="var(--accent)" strokeWidth="1.5" fill="none" />
            <path d="M0 620 H90" stroke="var(--cyan)" strokeWidth="1" fill="none" />
            <circle cx="220" cy="470" r="3" fill="var(--blue)" />
            <circle cx="180" cy="580" r="2.5" fill="var(--accent)" />
            <circle cx="90" cy="620" r="2.5" fill="var(--cyan)" />

            {/* Right side traces */}
            <path d="M1440 200 H1360 L1320 240 H1240" stroke="var(--blue)" strokeWidth="1.5" fill="none" />
            <path d="M1440 250 H1380 L1350 280 H1280" stroke="var(--accent)" strokeWidth="1" fill="none" />
            <path d="M1440 310 H1320" stroke="var(--cyan)" strokeWidth="1" fill="none" />
            <path d="M1440 360 H1400 L1370 390 H1310" stroke="var(--blue)" strokeWidth="1.5" fill="none" />
            <circle cx="1240" cy="240" r="3" fill="var(--blue)" />
            <circle cx="1280" cy="280" r="2.5" fill="var(--accent)" />
            <circle cx="1320" cy="310" r="3" fill="var(--cyan)" />
            <circle cx="1310" cy="390" r="2.5" fill="var(--blue)" />

            <path d="M1440 500 H1340 L1310 470 H1220" stroke="var(--accent)" strokeWidth="1" fill="none" />
            <path d="M1440 550 H1370 L1330 590 H1260" stroke="var(--blue)" strokeWidth="1.5" fill="none" />
            <path d="M1440 630 H1350" stroke="var(--cyan)" strokeWidth="1" fill="none" />
            <circle cx="1220" cy="470" r="2.5" fill="var(--accent)" />
            <circle cx="1260" cy="590" r="3" fill="var(--blue)" />
            <circle cx="1350" cy="630" r="2.5" fill="var(--cyan)" />

            {/* Top traces */}
            <path d="M500 0 V60 L530 90 V150" stroke="var(--blue)" strokeWidth="1" fill="none" />
            <path d="M700 0 V80" stroke="var(--accent)" strokeWidth="1.5" fill="none" />
            <path d="M900 0 V50 L870 80 V130" stroke="var(--cyan)" strokeWidth="1" fill="none" />
            <circle cx="530" cy="150" r="2.5" fill="var(--blue)" />
            <circle cx="700" cy="80" r="3" fill="var(--accent)" />
            <circle cx="870" cy="130" r="2.5" fill="var(--cyan)" />

            {/* Bottom traces */}
            <path d="M400 900 V820 L430 790 V730" stroke="var(--accent)" strokeWidth="1" fill="none" />
            <path d="M600 900 V840" stroke="var(--blue)" strokeWidth="1.5" fill="none" />
            <path d="M1000 900 V830 L970 800 V750" stroke="var(--blue)" strokeWidth="1" fill="none" />
            <circle cx="430" cy="730" r="2.5" fill="var(--accent)" />
            <circle cx="600" cy="840" r="3" fill="var(--blue)" />
            <circle cx="970" cy="750" r="2.5" fill="var(--blue)" />
          </g>
        </svg>
      </div>

      <div className="evt-inner">
        {/* ─── Header ─── */}
        <div ref={titleRef} className="evt-header">
          <span className="evt-overline">OUR JOURNEY</span>
          <h2 className="evt-title">
            Events <span className="evt-title-accent">Timeline</span>
          </h2>
          <p className="evt-subtitle">
            Milestones that define our passion for technology, innovation and impact.
          </p>
        </div>

        {/* ─── Timeline ─── */}
        <div className="evt-timeline-wrapper">
          {/* Nav arrows */}
          <button
            type="button"
            className={`evt-nav evt-nav-left ${activeIndex === 0 ? 'evt-nav-disabled' : ''}`}
            onClick={() => scrollToCard(-1)}
            aria-label="Previous event"
          >
            <ChevronLeft size={28} />
          </button>
          <button
            type="button"
            className={`evt-nav evt-nav-right ${activeIndex === EVENTS.length - 1 ? 'evt-nav-disabled' : ''}`}
            onClick={() => scrollToCard(1)}
            aria-label="Next event"
          >
            <ChevronRight size={28} />
          </button>

          {/* Scrollable track */}
          <div className="evt-timeline-track" ref={trackRef}>
            {/* Cards row */}
            <div className="evt-cards-row">
              {/* Timeline line — inside cards-row so it scrolls with content */}
              <div className="evt-timeline-line">
                <div className="evt-timeline-line-fill" />
              </div>
              {EVENTS.map((evt, i) => (
                <div
                  key={i}
                  className={`evt-card-wrapper ${i === activeIndex ? 'evt-card-active' : ''}`}
                  ref={el => cardsRef.current[i] = el}
                  onClick={() => setActiveIndex(i)}
                >
                  {/* Date */}
                  <div className="evt-date" style={{ color: evt.accent }}>{evt.date}</div>

                  {/* Card */}
                  <div
                    className={`evt-card ${evt.featured ? 'evt-card-featured' : ''}`}
                    style={{ '--card-accent': evt.accent }}
                  >
                    {/* Icon hexagon */}
                    <div className="evt-icon-hex" style={{ background: `${evt.accent}18` }}>
                      <div className="evt-icon-inner" style={{ color: evt.accent }}>
                        {evt.icon}
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="evt-card-title">{evt.title}</h3>

                    {/* Description */}
                    <p className="evt-card-desc">{evt.description}</p>

                    {/* Event image or Neo-Brutalist poster placeholder */}
                    <div className="evt-card-image">
                      {evt.image ? (
                        <>
                          <img
                            src={evt.image}
                            alt={evt.imageAlt || evt.title}
                            loading="lazy"
                            style={evt.imagePosition ? { objectPosition: evt.imagePosition } : undefined}
                          />
                          <div className="evt-card-image-overlay" />
                        </>
                      ) : (
                        <div className="evt-poster-placeholder" style={{ '--poster-accent': evt.accent }}>
                          <div className="evt-poster-grid" aria-hidden="true" />
                          <div className="evt-poster-center">
                            <div className="evt-poster-badge">
                              <ImageIcon size={14} />
                              <span>POSTER PENDING</span>
                            </div>
                            <span className="evt-poster-callout">OFFICIAL ASSET PENDING</span>
                          </div>
                          <div className="evt-poster-footer">
                            <span className="evt-poster-wing">IEEE-SJCE</span>
                            <span className="evt-poster-code">EVT//{i + 1 < 10 ? `0${i + 1}` : i + 1}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Timeline node */}
                  <div className="evt-node" style={{ '--node-color': evt.accent }}>
                    <div className="evt-node-dot" />
                    <div className="evt-node-glow" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <p className="evt-scroll-hint">← Click arrows or swipe to explore all events →</p>

        {/* ─── Footer CTA ─── */}
        <div className="evt-footer">
          <div className="evt-footer-icon">
            <Calendar size={24} />
          </div>
          <div className="evt-footer-text">
            <span className="evt-footer-heading">And many more to come...</span>
            <span className="evt-footer-sub">Stay tuned for exciting events ahead!</span>
          </div>
        </div>
      </div>
    </section>
  )
}
