/**
 * @typedef {'DETAILED' | 'BRIEF'} EventTemplate
 *
 * @typedef {Object} MagazineStat
 * @property {string} label
 * @property {string} value
 *
 * @typedef {Object} MagazineEvent
 * @property {string} id
 * @property {number} order
 * @property {EventTemplate} template
 * @property {string} title
 * @property {string} category
 * @property {string} wing
 * @property {string} date
 * @property {string} venue
 * @property {string} poster
 * @property {string} description
 * @property {string} recap
 * @property {string[]} highlights
 * @property {string[]} photos
 * @property {MagazineStat[]} stats
 * @property {string} [pullQuote]
 * @property {string} [takeaway]
 */

export const MAGAZINE_META = {
  title: 'THE IEEE CHRONICLE',
  edition: 'IEEE-SJCE',
  tagline: 'WHERE IDEAS BECOME STORIES.',
  volume: 'VOL. 01',
  issue: 'ISSUE 01',
  year: 'ACADEMIC YEAR 2025–26',
  span: 'A COLLECTION OF IEEE-SJCE EVENTS · 2023–2026',
  website: 'ieeesjce.com',
}

export const ARCHIVE_PHOTOS = [
  { src: '/photos/gallery/gall11.jpg', alt: 'IEEE-SJCE flagship gathering in the auditorium' },
  { src: '/photos/gallery/gall2.jpg', alt: 'IEEE-SJCE technical workshop in progress' },
  { src: '/photos/gallery/gall3.jpg', alt: 'IEEE-SJCE student community group photograph' },
  { src: '/photos/gallery/gall4.jpg', alt: 'IEEE-SJCE prototyping and hardware session' },
  { src: '/photos/gallery/gall5.jpg', alt: 'IEEE-SJCE student leaders and members' },
  { src: '/photos/gallery/gall6.jpg', alt: 'IEEE-SJCE event evening and celebration' },
  { src: '/photos/gallery/gall8.jpg', alt: 'IEEE-SJCE interactive discussion and mentorship' },
  { src: '/photos/gallery/gall9.jpg', alt: 'IEEE-SJCE project showcase and demonstrations' },
]

const archiveSet = (start) =>
  [0, 1, 2].map((offset) => ARCHIVE_PHOTOS[(start + offset) % ARCHIVE_PHOTOS.length].src)

/**
 * The magazine data is adapted from the homepage Events Timeline and the
 * Milestone Events archive. Descriptions, dates and poster assets are kept
 * from the original data; recaps and highlights are editorial summaries.
 *
 * @type {MagazineEvent[]}
 */
export const MAGAZINE_EVENTS = [
  {
    id: 'snap-circuits-2026',
    order: 1,
    template: 'DETAILED',
    title: "Snap Circuits",
    category: "Workshop",
    wing: "EDS",
    date: "5–6 November 2026",
    venue: "SJCE, Mysuru",
    poster: "/photos/events/anap_circuits_2026.jpeg",
    description:
      "The Electron Devices Society conducted Snap Circuits, giving freshers a hands-on experience with electronic components, circuit prototyping, and basic hardware debugging.",
    recap:
      "Over two days, first-year students moved from identifying components to assembling working circuits and learning how to trace a fault when a build refused to behave.",
    highlights: [
      "Hands-on electronic components",
      "Circuit prototyping",
      "Hardware debugging basics",
    ],
    photos: [
      "/photos/gallery/gall2.jpg",
      "/photos/gallery/gall4.jpg",
    ],
    stats: [
      { label: "Wing", value: "EDS" },
      { label: "Format", value: "Workshop" },
      { label: "Duration", value: "2 days" },
    ],
    pullQuote: "Where curiosity meets a breadboard.",
  },
  {
    id: 'matlab-2026',
    order: 2,
    template: 'DETAILED',
    title: "MATLAB Workshop",
    category: "Workshop",
    wing: "SPS",
    date: "4–5 November 2026",
    venue: "SJCE, Mysuru",
    poster: "/photos/events/matlab.png",
    description:
      "The Signal Processing Society conducted an intensive hands-on workshop on MATLAB, covering computational mathematics, matrix manipulation, algorithm development, and practical signal processing workflows.",
    recap:
      "A two-day studio in the computing lab where matrices became tools, algorithms became habits, and signal processing became something students could run themselves.",
    highlights: [
      "Matrix manipulation & computation",
      "Algorithm development",
      "Practical signal-processing workflows",
    ],
    photos: [
      "/photos/gallery/gall11.jpg",
      "/photos/gallery/gall8.jpg",
    ],
    stats: [
      { label: "Wing", value: "SPS" },
      { label: "Format", value: "Workshop" },
      { label: "Duration", value: "2 days" },
    ],
    pullQuote: "Turning signals into stories.",
  },
  {
    id: 'tech-detective-2026',
    order: 3,
    template: 'BRIEF',
    title: "Tech Detective",
    category: "Competition",
    wing: "IEEE Day",
    date: "16 October 2026",
    venue: "SJCE, Mysuru",
    poster: "/photos/events/tech_detective.jpeg",
    description:
      "Celebrated as part of IEEE Day, an exhilarating technical deduction contest challenging participants to crack cryptic hardware puzzles, decipher signals, and solve engineering mysteries.",
    recap:
      "An IEEE Day contest built around deduction: teams inspected clues, reasoned through hardware puzzles, and raced to identify the fault before the clock ran out.",
    highlights: [
      "Cryptic hardware puzzles",
      "Signal deciphering",
      "Engineering mystery-solving",
    ],
    photos: [],
    stats: [
      { label: "Wing", value: "IEEE Day" },
      { label: "Format", value: "Competition" },
      { label: "Duration", value: "1 day" },
    ],
    takeaway: "Deduction meets engineering.",
  },
  {
    id: 'motion-planning-2026',
    order: 4,
    template: 'BRIEF',
    title: "Motion Planning in Robotics",
    category: "Technical Talk",
    wing: "SPS & RAS",
    date: "4 June 2026",
    venue: "SJCE, Mysuru",
    poster: "/photos/events/motion_planning.jpeg",
    description:
      "Joint technical session by SPS and RAS exploring search-based, sampling-based, and visual motion planning algorithms for mobile robotics and autonomous navigation using ROS 2.",
    recap:
      "A joint SPS and RAS session on how robots decide where to go next, covering search-based, sampling-based and visual planning approaches with ROS 2.",
    highlights: [
      "Search & sampling-based planning",
      "Visual motion planning",
      "ROS 2 for autonomous navigation",
    ],
    photos: [],
    stats: [
      { label: "Wings", value: "SPS & RAS" },
      { label: "Format", value: "Technical talk" },
      { label: "Duration", value: "1 day" },
    ],
    takeaway: "Planning is the first step to motion.",
  },
  {
    id: 'radioverse-2026',
    order: 5,
    template: 'DETAILED',
    title: "Radioverse",
    category: "Technical Series",
    wing: "IEEE-SJCE",
    date: "8–9 October 2026",
    venue: "SJCE, Mysuru",
    poster: "/photos/events/radio.jpeg",
    description:
      "A two-day immersive exploration into radio frequency engineering, wireless telemetry, antenna design, and radar applications with live demonstrations and simulation sessions.",
    recap:
      "Radioverse opened a window into the invisible spectrum — from antenna theory and telemetry to live demonstrations that made radio frequency engineering tangible.",
    highlights: [
      "RF engineering fundamentals",
      "Antenna design & radar applications",
      "Live demonstrations & simulations",
    ],
    photos: [
      "/photos/gallery/gall9.jpg",
      "/photos/standfor/seminars.jpeg",
    ],
    stats: [
      { label: "Wing", value: "IEEE-SJCE" },
      { label: "Format", value: "Technical series" },
      { label: "Duration", value: "2 days" },
    ],
    pullQuote: "A two-day trip through the radio spectrum.",
  },
  {
    id: 'aess-2026',
    order: 6,
    template: 'DETAILED',
    title: "AESS Chapter Inauguration & Space Tech Talk",
    category: "Chapter Launch",
    wing: "AESS",
    date: "23 July 2026",
    venue: "SJCE, Mysuru",
    poster: "/photos/events/aess inaugaration.jpeg",
    description:
      "Formal inauguration of the IEEE AESS student chapter featuring chief guest Dr. Braham Himed (President, IEEE AESS) and Sri Puneeth Kumar Mishra (ISRO), accompanied by an insightful technical session on radar systems and satellite technology.",
    recap:
      "The Aerospace and Electronic Systems Society chapter began with a formal inauguration and a technical session that connected student curiosity to radar systems and satellite technology.",
    highlights: [
      "IEEE AESS student chapter launch",
      "Guests from IEEE AESS & ISRO",
      "Radar & satellite technology talk",
    ],
    photos: [
      "/photos/gallery/gall3.jpg",
      "/photos/gallery/gall5.jpg",
    ],
    stats: [
      { label: "Wing", value: "AESS" },
      { label: "Format", value: "Inauguration" },
      { label: "Duration", value: "1 day" },
    ],
    pullQuote: "A new chapter takes flight.",
  },
  {
    id: 'kalpana-chawla-2026',
    order: 7,
    template: 'BRIEF',
    title: "Kalpana Chawla Memorial Lecture",
    category: "Memorial Lecture",
    wing: "WIE",
    date: "15 June 2026",
    venue: "SJCE, Mysuru",
    poster: "/photos/events/kalpana_chawla_2026.jpeg",
    description:
      "A prestigious memorial lecture organized by IEEE WIE exploring the evolution, achievements, and future horizons of the Indian Space Programme and its transformative role in national progress.",
    recap:
      "IEEE WIE hosted a memorial lecture that traced the Indian Space Programme from its early years to its current ambitions, with a focus on the people and ideas behind the milestones.",
    highlights: [
      "Indian Space Programme",
      "Achievements & future horizons",
      "Organised by IEEE WIE",
    ],
    photos: [],
    stats: [
      { label: "Wing", value: "WIE" },
      { label: "Format", value: "Lecture" },
      { label: "Duration", value: "1 day" },
    ],
    pullQuote: "Looking up, thinking forward.",
    takeaway: "Looking up, thinking forward.",
  },
  {
    id: 'tcl-workshop-2026',
    order: 8,
    template: 'BRIEF',
    title: "TCL Workshop",
    category: "Workshop",
    wing: "WIE",
    date: "14 March 2026",
    venue: "SJCE, Mysuru",
    poster: "/photos/events/tcl.jpeg",
    description:
      "Conducted by Women in Engineering, focusing on Tool Command Language (TCL) scripting for automating digital design flows, synthesis constraints, and simulation regression suites.",
    recap:
      "IEEE WIE introduced TCL scripting as a practical automation tool for digital design flows, synthesis constraints and simulation regression suites.",
    highlights: [
      "TCL scripting",
      "Digital design automation",
      "Simulation regression suites",
    ],
    photos: [],
    stats: [
      { label: "Wing", value: "WIE" },
      { label: "Format", value: "Workshop" },
      { label: "Duration", value: "1 day" },
    ],
    takeaway: "Automate the repetitive.",
  },
  {
    id: 'cadence-2026',
    order: 9,
    template: 'DETAILED',
    title: "Cadence Workshop",
    category: "Workshop",
    wing: "EDS",
    date: "28 May 2026",
    venue: "SJCE, Mysuru",
    poster: "/photos/events/cadence.jpeg",
    description:
      "An intensive hands-on workshop by the Electron Devices Society delving into industry-standard Cadence EDA tools, schematic entry, layout verification, and physical semiconductor design.",
    recap:
      "A focused day inside industry-standard Cadence tools, where students moved from schematic entry to layout verification and saw how physical semiconductor design comes together.",
    highlights: [
      "Cadence EDA toolchain",
      "Schematic entry & layout verification",
      "Physical semiconductor design",
    ],
    photos: [
      "/photos/standfor/robotics_workshop.jpeg",
      "/photos/gallery/gall6.jpg",
    ],
    stats: [
      { label: "Wing", value: "EDS" },
      { label: "Format", value: "Workshop" },
      { label: "Duration", value: "1 day" },
    ],
    pullQuote: "From schematic to silicon.",
  },
  {
    id: 'ml-workshop-2026',
    order: 10,
    template: 'DETAILED',
    title: "ML Workshop",
    category: "Flagship Workshop",
    wing: "SPS",
    date: "27–29 March 2026",
    venue: "SJCE, Mysuru",
    poster: "/photos/events/ml_workshop.jpeg",
    description:
      "A 3-day flagship workshop by the Signal Processing Society covering machine learning fundamentals, modeling in Python, and building local edge-AI inference on ESP32 & MPU6050.",
    recap:
      "Across three days, participants built a working understanding of machine learning in Python, then carried their models to the edge with ESP32 and MPU6050 hardware.",
    highlights: [
      "Machine-learning fundamentals",
      "Modeling in Python",
      "Edge AI on ESP32 & MPU6050",
    ],
    photos: [
      "/photos/standfor/seminars.jpeg",
      "/photos/gallery/gall2.jpg",
    ],
    stats: [
      { label: "Wing", value: "SPS" },
      { label: "Format", value: "Flagship workshop" },
      { label: "Duration", value: "3 days" },
    ],
    pullQuote: "Teaching machines, one model at a time.",
  },
  {
    id: 'soldering-dec-2025',
    order: 11,
    template: 'BRIEF',
    title: "Soldering and Etching Workshop",
    category: "Flagship Workshop",
    wing: "EDS",
    date: "19–21 December 2025",
    venue: "IS Seminar Hall, First Floor",
    poster: "/photos/events/soldering.jpeg",
    description:
      "A three-day flagship workshop from the Electron Devices Society, giving students hands-on experience of soldering and etching through theoretical and practical sessions.",
    recap:
      "Three days of theory and practice brought students face-to-face with the physical craft of electronics: soldering joints, etching boards and learning why precision matters.",
    highlights: [
      "Soldering fundamentals",
      "PCB etching",
      "Three days of theory & practice",
    ],
    photos: [],
    stats: [
      { label: "Wing", value: "EDS" },
      { label: "Format", value: "Flagship workshop" },
      { label: "Duration", value: "3 days" },
    ],
    pullQuote: "Learn it. Build it. Solder it.",
    takeaway: "Learn it. Build it. Solder it.",
  },
  {
    id: 'wave-lab-2025',
    order: 12,
    template: 'BRIEF',
    title: "Wave Lab",
    category: "Workshop",
    wing: "SPS",
    date: "6 December 2025",
    venue: "SJCE, Mysuru",
    poster: "/photos/events/wavelab_2025.jpg",
    description:
      "The debut event of the SPS Wing. Students used MATLAB to explore the basics of signal processing with an industry-standard tool, and received a MATLAB license for future work.",
    recap:
      "The debut of the SPS Wing used MATLAB to make signal processing approachable, giving participants a professional tool and a license to keep exploring.",
    highlights: [
      "Signal-processing basics",
      "MATLAB workflows",
      "MATLAB license for participants",
    ],
    photos: [],
    stats: [
      { label: "Wing", value: "SPS" },
      { label: "Format", value: "Workshop" },
      { label: "Duration", value: "1 day" },
    ],
    takeaway: "See the signal, not the noise.",
  },
  {
    id: 'prayas-2025',
    order: 13,
    template: 'DETAILED',
    title: "Prayas",
    category: "Outreach",
    wing: "WIE",
    date: "25 December 2025",
    venue: "Outreach schools, Mysuru",
    poster: "/photos/events/prayas.jpeg",
    description:
      "IEEE WIE's flagship humanitarian outreach initiative, visiting educational institutions to foster curiosity in science and engineering through joyful, hands-on learning sessions.",
    recap:
      "Prayas carried IEEE-SJCE beyond campus, visiting schools to turn science and engineering into something students could touch, try and enjoy.",
    highlights: [
      "Flagship humanitarian outreach",
      "School visits",
      "Curiosity through hands-on learning",
    ],
    photos: [
      "/photos/standfor/activities.jpeg",
      "/photos/gallery/gall11.jpg",
    ],
    stats: [
      { label: "Wing", value: "WIE" },
      { label: "Format", value: "Outreach" },
      { label: "Duration", value: "1 day" },
    ],
    pullQuote: "Curiosity belongs to everyone.",
  },
  {
    id: 'iot-4-2025',
    order: 14,
    template: 'BRIEF',
    title: "IoT 4.0",
    category: "Flagship Workshop",
    wing: "RAS",
    date: "21–23 November 2025",
    venue: "IS Seminar Hall, First Floor",
    poster: "/photos/events/iot_4_0_2025.jpg",
    description:
      "The Robotics and Automation Society conducted the IoT 4.0 workshop, giving participants hands-on exposure to building smart, connected systems with embedded platforms.",
    recap:
      "IoT 4.0 gave participants three days to build smart, connected systems from the ground up, moving from embedded fundamentals to working prototypes.",
    highlights: [
      "Smart connected systems",
      "Embedded platforms",
      "Hands-on IoT building",
    ],
    photos: [],
    stats: [
      { label: "Wing", value: "RAS" },
      { label: "Format", value: "Flagship workshop" },
      { label: "Duration", value: "3 days" },
    ],
    pullQuote: "Connecting the everyday.",
    takeaway: "Connecting the everyday.",
  },
  {
    id: 'snap-circuits-2025',
    order: 15,
    template: 'BRIEF',
    title: "Snap Circuits",
    category: "Workshop",
    wing: "EDS",
    date: "6–7 November 2025",
    venue: "SJCE, Mysuru",
    poster: "/photos/events/snap_circuits_2025.jpg",
    description:
      "The Electron Devices Society conducted Snap Circuits, giving freshers a hands-on experience of electronic components while building curiosity about circuits and how they work.",
    recap:
      "A two-day introduction to electronic components that gave freshers their first hands-on circuits and a reason to keep asking how things work.",
    highlights: [
      "Introduction to components",
      "Circuit building",
      "Designed for freshers",
    ],
    photos: [],
    stats: [
      { label: "Wing", value: "EDS" },
      { label: "Format", value: "Workshop" },
      { label: "Duration", value: "2 days" },
    ],
    takeaway: "Start with a snap.",
  },
  {
    id: 'circuitrix-2025',
    order: 16,
    template: 'BRIEF',
    title: "Circuitrix",
    category: "Workshop",
    wing: "IEEE-SJCE",
    date: "25 October 2025",
    venue: "IS Seminar Hall, Golden Jubilee Bhavan",
    poster: "/photos/events/circuitrix_2025.jpg",
    description:
      "A hands-on session designed to help students explore, create and simulate both analog and digital circuits using powerful circuit simulation tools.",
    recap:
      "Circuitrix turned simulation into a playground, helping students explore, create and test analog and digital circuits before committing anything to hardware.",
    highlights: [
      "Analog & digital circuits",
      "Circuit simulation tools",
      "Explore, create, simulate",
    ],
    photos: [],
    stats: [
      { label: "Wing", value: "IEEE-SJCE" },
      { label: "Format", value: "Workshop" },
      { label: "Duration", value: "1 day" },
    ],
    takeaway: "Simulate before you solder.",
  },
  {
    id: 'ai-expert-talk-2025',
    order: 17,
    template: 'BRIEF',
    title: "AI Expert Talk and Ideathon",
    category: "Expert Talk",
    wing: "WIE",
    date: "11 February 2025",
    venue: "SJCE, Mysuru",
    poster: "/photos/events/ai_expert_talk_ideathon_2025.png",
    description:
      "STRONG – Scientific Research for NextGen GirlGeeks was organised by the MCAA India Chapter, funded by the European Union, and supported by the MCAA-Mednight Project, IEEE Mysore Subsection and IEEE-SJCE. The event aimed to inspire young women to pursue careers in science and research.",
    recap:
      "An expert talk and ideathon designed to encourage young women to pursue science and research, bringing together IEEE-SJCE and partner organisations for a day of ideas.",
    highlights: [
      "Expert talks & ideathon",
      "Women in science & research",
      "Supported by IEEE & MCAA",
    ],
    photos: [],
    stats: [
      { label: "Wing", value: "WIE" },
      { label: "Format", value: "Talk & ideathon" },
      { label: "Duration", value: "1 day" },
    ],
    pullQuote: "Ideas worth amplifying.",
    takeaway: "Ideas worth amplifying.",
  },
  {
    id: 'soldering-jan-2025',
    order: 18,
    template: 'BRIEF',
    title: "Soldering and Etching Workshop",
    category: "Workshop",
    wing: "EDS",
    date: "10–12 January 2025",
    venue: "Seminar Hall, 1st Floor CMS Block",
    poster: "/photos/events/soldering_etching_jan_2025.jpeg",
    description:
      "The Electron Devices Society conducted the Soldering and Etching Workshop, a three-day flagship event giving students practical exposure to soldering and etching.",
    recap:
      "A three-day flagship workshop that gave students practical time with soldering irons and etching baths, turning theory into steady hands.",
    highlights: [
      "Three-day flagship workshop",
      "Practical soldering",
      "PCB etching exposure",
    ],
    photos: [],
    stats: [
      { label: "Wing", value: "EDS" },
      { label: "Format", value: "Workshop" },
      { label: "Duration", value: "3 days" },
    ],
    takeaway: "Practice makes precision.",
  },
  {
    id: 'iot-3-2024',
    order: 19,
    template: 'BRIEF',
    title: "IoT-3.0 Workshop",
    category: "Workshop",
    wing: "RAS",
    date: "29 November – 1 December 2024",
    venue: "SJCE, Mysuru",
    poster: "/photos/events/iot_workshop_2024.jpeg",
    description:
      "A three-day workshop covering IoT protocols and core theory before moving on to hands-on simulations with Raspberry Pi and NodeMCU.",
    recap:
      "IoT-3.0 paired protocol theory with hands-on simulations on Raspberry Pi and NodeMCU, giving participants a practical route into connected systems.",
    highlights: [
      "IoT protocols & theory",
      "Raspberry Pi & NodeMCU",
      "Hands-on simulations",
    ],
    photos: [],
    stats: [
      { label: "Wing", value: "RAS" },
      { label: "Format", value: "Workshop" },
      { label: "Duration", value: "3 days" },
    ],
    takeaway: "Build the connected world.",
  },
  {
    id: 'tuxedo-2023',
    order: 20,
    template: 'DETAILED',
    title: "TUXEDO'23",
    category: "Technical Fest",
    wing: "IEEE-SJCE",
    date: "28 November – 4 December 2023",
    venue: "SJCE, Mysuru",
    poster: "/photos/events/tuxedo_2023.jpg",
    description:
      "IEEE-SJCE's odd-semester technical fest brought a week of workshops, contests and events, including Snap Circuits, Web Dev Bootcamp and Scribble.",
    recap:
      "A week-long technical festival that filled the calendar with workshops, contests and hands-on events — a snapshot of IEEE-SJCE at its most energetic.",
    highlights: [
      "Week-long technical fest",
      "Workshops & contests",
      "Snap Circuits, Web Dev & more",
    ],
    photos: [
      "/photos/standfor/magazine_launch.jpeg",
      "/photos/gallery/gall3.jpg",
    ],
    stats: [
      { label: "Wing", value: "IEEE-SJCE" },
      { label: "Format", value: "Technical fest" },
      { label: "Duration", value: "7 days" },
    ],
    pullQuote: "A week of making, breaking, and building.",
  },
  {
    id: 'web-dev-2023',
    order: 21,
    template: 'BRIEF',
    title: "Web Dev Bootcamp",
    category: "Bootcamp",
    wing: "WIE & RAS",
    date: "30 November & 2–3 December 2023",
    venue: "Online & SJCE, Mysuru",
    poster: "/photos/events/web_dev_bootcamp_2023.jpg",
    description:
      "The WIE and RAS wings presented a hands-on bootcamp on building and designing interactive websites, with online sessions on 30 November and 2 December and an offline session on 3 December.",
    recap:
      "A hybrid bootcamp from WIE and RAS that took students from static pages to interactive websites across three sessions.",
    highlights: [
      "Build interactive websites",
      "Online & offline sessions",
      "WIE & RAS collaboration",
    ],
    photos: [],
    stats: [
      { label: "Wings", value: "WIE & RAS" },
      { label: "Format", value: "Bootcamp" },
      { label: "Duration", value: "3 sessions" },
    ],
    takeaway: "Ship your first website.",
  },
  {
    id: 'latex-workshop-2023',
    order: 22,
    template: 'BRIEF',
    title: "LaTeX Workshop",
    category: "Workshop",
    wing: "IEEE-SJCE",
    date: "28–29 November 2023",
    venue: "SJCE, Mysuru",
    poster: "/photos/events/latex_workshop.jpeg",
    description:
      "Professional typesetting software workshop teaching students to structure, format, and render publication-grade IEEE papers, mathematical equations, and technical documentation.",
    recap:
      "Participants mastered the craft of publication-grade typesetting in LaTeX, creating structured research reports with professional mathematical notation and citation management.",
    highlights: [
      "Document structure & syntax",
      "Mathematical typesetting",
      "IEEE paper templates",
    ],
    photos: [],
    stats: [
      { label: "Wing", value: "IEEE-SJCE" },
      { label: "Format", value: "Workshop" },
      { label: "Duration", value: "2 days" },
    ],
    takeaway: "Structure your research with precision.",
  },
]

export const MAGAZINE_SUMMARY = (() => {
  const years = new Set(MAGAZINE_EVENTS.map((event) => event.date.match(/\d{4}/)?.[0]).filter(Boolean))
  const wings = new Set(
    MAGAZINE_EVENTS.flatMap((event) => event.wing.split('&').map((wing) => wing.trim()))
  )
  return {
    stories: MAGAZINE_EVENTS.length,
    features: MAGAZINE_EVENTS.filter((event) => event.template === 'DETAILED').length,
    standards: MAGAZINE_EVENTS.filter((event) => event.template === 'STANDARD').length,
    years: years.size,
    wings: wings.size,
  }
})()

export const eventsByYear = (() => {
  /** @type {Record<string, number>} */
  const counts = {}
  MAGAZINE_EVENTS.forEach((event) => {
    const year = event.date.match(/\d{4}/)?.[0]
    if (!year) return
    counts[year] = (counts[year] ?? 0) + 1
  })
  return Object.entries(counts).sort(([a], [b]) => a.localeCompare(b))
})()
