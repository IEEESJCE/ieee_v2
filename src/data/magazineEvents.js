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
  year: 'ACADEMIC YEAR 2026–27',
  span: 'A COLLECTION OF IEEE-SJCE EVENTS · 2023–2026',
  website: 'ieeesjce.org',
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
 * The magazine data follows the updated homepage Events Timeline. Descriptions,
 * dates, wings and poster assets are kept from that source; recaps and
 * highlights are editorial summaries.
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
      "Over two days, freshers moved from identifying components to assembling working circuits and learning how to trace a fault when a build refused to behave.",
    highlights: [
      "Hands-on electronic components",
      "Circuit prototyping",
      "Hardware debugging basics",
    ],
    photos: [
      "/photos/events/snap_circuits_2025_recap_1.jpg",
      "/photos/events/snap_circuits_2025_recap_2.jpg",
    ],
    stats: [
      { label: "Wing", value: "EDS" },
      { label: "Format", value: "Workshop" },
      { label: "Duration", value: "2 days" },
    ],
    pullQuote: "Where Curiosity Snaps into Existence.",
  },
  {
    id: 'matlab-2026',
    order: 2,
    template: 'DETAILED',
    title: "MATLAB Workshop",
    category: "Workshop",
    wing: "SPS · RAS · AESS",
    date: "4–5 November 2026",
    venue: "SJCE, Mysuru",
    poster: "/photos/events/matlab.png",
    description:
      "A joint initiative organized collaboratively by SPS, RAS, and AESS in association with the ECE Department. An intensive two-day hands-on workshop covering computational mathematics, matrix manipulation, algorithm development, and practical signal processing and control systems workflows.",
    recap:
      "A two-day studio in the computing lab where matrices became tools, algorithms became habits, and signal processing and control workflows became something students could run themselves.",
    highlights: [
      "Matrix manipulation & computation",
      "Algorithm development",
      "Signal processing & control workflows",
    ],
    photos: [
      "/photos/events/matlab_workshop_recap_1.jpg",
      "/photos/events/matlab_workshop_recap_2.jpg",
    ],
    stats: [
      { label: "Wings", value: "SPS · RAS · AESS" },
      { label: "Format", value: "Workshop" },
      { label: "Duration", value: "2 days" },
    ],
    pullQuote: "Turning signals into stories.",
  },
  {
    id: 'tech-detective-2026',
    order: 3,
    template: 'DETAILED',
    title: "Tech Detective",
    category: "Quiz",
    wing: "IEEE Day",
    date: "16 October 2026",
    venue: "SJCE, Mysuru",
    poster: "/photos/events/tech_detective.jpeg",
    description:
      "Held on the occasion of IEEE Day, an online quiz that put participants' knowledge of electronics and their mental ability to the test. With brains running at full speed through tricky technical and logical questions, the top scorer walked away with the winner's prize.",
    recap:
      "An IEEE Day online quiz that kept participants' brains running: rounds of electronics and mental ability questions, a race against the clock, and a prize for the top scorer.",
    highlights: [
      "Online electronics quiz",
      "Mental ability challenges",
      "Prize for the winner",
    ],
    photos: [
      "/photos/events/tech_detective_recap.jpg",
    ],
    stats: [
      { label: "Wing", value: "IEEE Day" },
      { label: "Format", value: "Quiz" },
      { label: "Duration", value: "1 day" },
    ],
    pullQuote: "Every question is a circuit waiting to close.",
  },
  {
    id: 'radioverse-2026',
    order: 4,
    template: 'DETAILED',
    title: "Radioverse",
    category: "Workshop",
    wing: "IEEE-SJCE",
    date: "8–9 October 2026",
    venue: "SJCE, Mysuru",
    poster: "/photos/events/radio.jpeg",
    description:
      "The workshop offered participants a hands-on experience with the GNU Radio Companion and Software Defined Radio, helping them explore radio signal processing and understand how theoretical concepts translate into real-world applications. The sessions brimmed with curiosity, collaboration, and learning as participants set up the software, experimented with SDR, and worked with signals.",
    recap:
      "Radioverse put GNU Radio Companion and Software Defined Radio in participants' hands, turning radio signal processing theory into hands-on experiments with real signals.",
    highlights: [
      "GNU Radio Companion",
      "Software Defined Radio",
      "Hands-on signal processing",
    ],
    photos: [
      "/photos/events/radioverse_recap_2.jpg",
      "/photos/events/radioverse_recap_1.jpg",
    ],
    stats: [
      { label: "Wing", value: "IEEE-SJCE" },
      { label: "Format", value: "Workshop" },
      { label: "Duration", value: "2 days" },
    ],
    pullQuote: "Discover a different way to tune in.",
  },
  {
    id: 'orientation-day-2026',
    order: 5,
    template: 'DETAILED',
    title: "Orientation Day",
    category: "Induction",
    wing: "IEEE-SJCE",
    date: "26 September 2026",
    venue: "SJCE, Mysuru",
    poster: "/photos/events/orientation_day_2026.jpg",
    description:
      "The premier induction welcoming new engineering students to IEEE-SJCE. Freshers explored our societies, interacted with seniors and Execom members, and discovered the technical, leadership, and professional opportunities ahead.",
    recap:
      "The first doorway into IEEE-SJCE: freshers met the societies, the Execom and the seniors who make the branch feel like a community.",
    highlights: [
      "Welcome to IEEE-SJCE",
      "Meet the societies & Execom",
      "Technical and leadership pathways",
    ],
    photos: [
      "/photos/events/orientation_day_recap_1.jpg",
      "/photos/events/orientation_day_recap_2.jpg",
    ],
    stats: [
      { label: "Wing", value: "IEEE-SJCE" },
      { label: "Format", value: "Induction" },
      { label: "Duration", value: "1 day" },
    ],
    pullQuote: "Every journey starts with a welcome.",
  },
  {
    id: 'funsane-2026',
    order: 6,
    template: 'DETAILED',
    title: "FUNsane",
    category: "Fun Day",
    wing: "IEEE-SJCE",
    date: "25 September 2026",
    venue: "SJCE, Mysuru",
    poster: "/photos/events/funsane_2026.jpg",
    description:
      "An unforgettable evening dedicated to breaking away from routine, unwinding, and celebrating community spirit. Students immersed themselves in energetic team challenges, interactive games, lively music, and memorable moments filled with laughter and camaraderie.",
    recap:
      "An evening of team challenges, games and music that gave the branch a chance to unwind and celebrate the community behind the circuits.",
    highlights: [
      "Team challenges & games",
      "Music and celebration",
      "Community bonding",
    ],
    photos: [
      "/photos/events/funsane_recap_1.jpg",
      "/photos/events/funsane_recap_2.jpg",
    ],
    stats: [
      { label: "Wing", value: "IEEE-SJCE" },
      { label: "Format", value: "Fun Day" },
      { label: "Duration", value: "1 day" },
    ],
    pullQuote: "The best circuits are the people around you.",
  },
  {
    id: 'aess-2026',
    order: 7,
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
      "/photos/events/aess_recap_2.jpg",
      "/photos/events/aess_recap_1.jpg",
    ],
    stats: [
      { label: "Wing", value: "AESS" },
      { label: "Format", value: "Inauguration" },
      { label: "Duration", value: "1 day" },
    ],
    pullQuote: "A new chapter takes flight.",
  },
  {
    id: 'the-wave-2026',
    order: 8,
    template: 'DETAILED',
    title: "THE WAVE: Speech as a Window to the Brain",
    category: "Lecture Series",
    wing: "SPS",
    date: "4 July 2026",
    venue: "SJCE, Mysuru",
    poster: "/photos/events/the_wave_2026.jpg",
    description:
      "Lecture series session with Dr. Radha Kodali (Univ. of Tennessee & Le Bonheur Children's Hospital, USA) exploring speech signal biomarkers, AI in neurological diagnosis, pediatric epilepsy, and clinical brain data analysis.",
    recap:
      "Dr. Radha Kodali connected speech signals to neurological health, showing how AI and clinical data can open a window into the brain.",
    highlights: [
      "Speech signal biomarkers",
      "AI in neurological diagnosis",
      "Clinical brain data analysis",
    ],
    photos: [
      "/photos/events/the_wave_recap_1.jpg",
    ],
    stats: [
      { label: "Wing", value: "SPS" },
      { label: "Format", value: "Lecture" },
      { label: "Duration", value: "1 day" },
    ],
    pullQuote: "Every voice carries a signal.",
  },
  {
    id: 'techtour-2026',
    order: 9,
    template: 'DETAILED',
    title: "Tech Tour",
    category: "Industrial Visit",
    wing: "IEEE-SJCE",
    date: "3 July 2026",
    venue: "CeNSE, IISc Bengaluru",
    poster: "/photos/events/techtour_2026_team.jpg",
    description:
      "An educational industrial visit to the Centre for Nanoscience and Engineering (CeNSE), IISc Bengaluru. Students explored cutting-edge semiconductor fabrication facilities, advanced molecular laboratories, and networked with leading nanotechnology researchers.",
    recap:
      "A day at CeNSE, IISc Bengaluru, where students stepped inside semiconductor fabrication facilities and met researchers working at the nanoscale.",
    highlights: [
      "CeNSE, IISc Bengaluru",
      "Semiconductor fabrication facilities",
      "Nanotechnology research",
    ],
    photos: [
      "/photos/events/techtour_recap_1.jpg",
      "/photos/events/techtour_recap_2.jpg",
    ],
    stats: [
      { label: "Wing", value: "IEEE-SJCE" },
      { label: "Format", value: "Industrial visit" },
      { label: "Duration", value: "1 day" },
    ],
    pullQuote: "From campus to the cleanroom.",
  },
  {
    id: 'kalpana-chawla-2026',
    order: 10,
    template: 'BRIEF',
    title: "Kalpana Chawla Memorial Lecture",
    category: "Memorial Lecture",
    wing: "WIE",
    date: "15 June 2026",
    venue: "SJCE, Mysuru",
    poster: "/photos/events/kalpana_chawla_2026.jpeg",
    description:
      "A prestigious memorial lecture organized by IEEE-SJCE WIE exploring the evolution, achievements, and future horizons of the Indian Space Programme and its transformative role in national progress.",
    recap:
      "IEEE-SJCE WIE hosted a memorial lecture that traced the Indian Space Programme from its early years to its current ambitions, with a focus on the people and ideas behind the milestones.",
    highlights: [
      "Indian Space Programme",
      "Achievements & future horizons",
      "Inspiration for future explorers",
    ],
    photos: [],
    stats: [
      { label: "Wing", value: "WIE" },
      { label: "Format", value: "Lecture" },
      { label: "Duration", value: "1 day" },
    ],
    takeaway: "Looking up, thinking forward.",
  },
  {
    id: 'motion-planning-2026',
    order: 11,
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
    id: 'cadence-2026',
    order: 12,
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
      "/photos/events/cadence_recap_1.jpg",
      "/photos/events/cadence_recap_2.jpg",
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
    order: 13,
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
      "Participants took machine learning off the laptop and onto the edge, using an ESP32 and an MPU6050 motion sensor to build an air calculator.",
    highlights: [
      "Machine-learning fundamentals",
      "Modeling in Python",
      "Edge AI on ESP32 & MPU6050",
    ],
    photos: [
      "/photos/events/ml_workshop_recap_1.jpg",
      "/photos/events/ml_workshop_recap_2.jpg",
    ],
    stats: [
      { label: "Wing", value: "SPS" },
      { label: "Format", value: "Flagship workshop" },
      { label: "Duration", value: "3 days" },
    ],
    pullQuote: "Teaching machines, one model at a time.",
  },
  {
    id: 'tcl-workshop-2026',
    order: 14,
    template: 'DETAILED',
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
    photos: [
      "/photos/events/tcl_workshop_recap_1.jpg",
      "/photos/events/tcl_workshop_recap_2.jpg",
    ],
    stats: [
      { label: "Wing", value: "WIE" },
      { label: "Format", value: "Workshop" },
      { label: "Duration", value: "1 day" },
    ],
    pullQuote: "Script once, automate forever.",
  },
  {
    id: 'prayas-2025',
    order: 15,
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
      "/photos/events/prayas_recap_2.jpg",
    ],
    stats: [
      { label: "Wing", value: "WIE" },
      { label: "Format", value: "Outreach" },
      { label: "Duration", value: "1 day" },
    ],
    pullQuote: "Curiosity belongs to everyone.",
  },
  {
    id: 'soldering-dec-2025',
    order: 16,
    template: 'DETAILED',
    title: "Soldering and Etching Workshop",
    category: "Flagship Workshop",
    wing: "EDS",
    date: "19–21 December 2025",
    venue: "",
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
    photos: [
      "/photos/events/soldering_recap_1.jpg",
      "/photos/events/soldering_recap_2.jpg",
    ],
    stats: [
      { label: "Wing", value: "EDS" },
      { label: "Format", value: "Flagship workshop" },
      { label: "Duration", value: "3 days" },
    ],
    pullQuote: "Learn it. Build it. Solder it.",
  },
  {
    id: 'sps-inauguration-2025',
    order: 17,
    template: 'DETAILED',
    title: "SPS Wing Inauguration & Tech Talk",
    category: "Chapter Launch",
    wing: "SPS",
    date: "8 December 2025",
    venue: "SJCE, Mysuru",
    poster: "/photos/events/sps_inauguration_2025.jpg",
    description:
      'Formal inauguration welcoming the newly introduced Signal Processing Society (SPS) wing to IEEE-SJCE. Chief Guest Dr. Jayasudha BSK (Vice Chairperson, IEEE SPS Bangalore Section & Senior DSP Engineer, Harman) delivered an insightful technical talk on "Deep Dive into Audio Signal Processing" and real-world automotive DSP applications.',
    recap:
      "The Signal Processing Society wing arrived with a formal inauguration and a deep dive into audio signal processing, connecting classroom DSP to real automotive systems.",
    highlights: [
      "IEEE SPS wing launch",
      "Audio signal processing talk",
      "Automotive DSP applications",
    ],
    photos: [
      "/photos/events/sps_inauguration_recap_1.jpg",
      "/photos/events/sps_inauguration_recap_2.jpg",
    ],
    stats: [
      { label: "Wing", value: "SPS" },
      { label: "Format", value: "Inauguration" },
      { label: "Duration", value: "1 day" },
    ],
    pullQuote: "Hear the signal, build the future.",
  },
  {
    id: 'wave-lab-2025',
    order: 18,
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
    id: 'iot-4-2025',
    order: 19,
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
    takeaway: "Connecting the everyday.",
  },
  {
    id: 'snap-circuits-2025',
    order: 20,
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
    order: 21,
    template: 'BRIEF',
    title: "Circuitrix",
    category: "Workshop",
    wing: "IEEE-SJCE",
    date: "25 October 2025",
    venue: "",
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
    id: 'electroclues-2025',
    order: 22,
    template: 'BRIEF',
    title: "Electroclues",
    category: "Competition",
    wing: "IEEE-SJCE",
    date: "13 October 2025",
    venue: "SJCE, Mysuru",
    poster: "/photos/events/electroclues_2025.jpg",
    description:
      'Organized under the IEEE Illuminate series for IEEE Day 2025, Electroclues featured "Wire and Win" rapid-fire circuit debugging with a 90-second buzzer round, followed by deductive electronics riddles and technical problem-solving challenges.',
    recap:
      "Part of the IEEE Illuminate series, Electroclues mixed rapid-fire circuit debugging with deductive electronics riddles and technical problem-solving.",
    highlights: [
      "Rapid-fire circuit debugging",
      "Electronics riddles",
      "IEEE Illuminate series",
    ],
    photos: [],
    stats: [
      { label: "Wing", value: "IEEE-SJCE" },
      { label: "Format", value: "Competition" },
      { label: "Duration", value: "1 day" },
    ],
    takeaway: "Debug the clue, solve the circuit.",
  },
  {
    id: 'pre-conference-iceteg-2025',
    order: 23,
    template: 'BRIEF',
    title: "Pre-Conference Workshop (AI & Digital Twins - ICETEG 2025)",
    category: "Workshop",
    wing: "IEEE-SJCE",
    date: "9 October 2025",
    venue: "",
    poster: "/photos/events/pre_conference_iceteg_2025.jpg",
    description:
      "Pre-conference workshop for ICETEG 2025 in association with MathWorks and Hub Energy. Explored AI and digital twins in energy systems, battery life prediction, and automated VLSI design with Dr. Puneeth S.B. and Anand Mukhopadhyay at IS Seminar Hall.",
    recap:
      "A pre-conference workshop that connected AI, digital twins and energy systems to the tools engineers use to model, predict and design.",
    highlights: [
      "AI & digital twins",
      "Energy systems",
      "Automated VLSI design",
    ],
    photos: [],
    stats: [
      { label: "Wing", value: "IEEE-SJCE" },
      { label: "Format", value: "Workshop" },
      { label: "Duration", value: "1 day" },
    ],
    takeaway: "Model the future.",
  },
  {
    id: 'robotics-16-2025',
    order: 24,
    template: 'DETAILED',
    title: "Robotics'16",
    category: "Flagship Event",
    wing: "RAS · EDS",
    date: "26–29 June 2025",
    venue: "SJCE, Mysuru",
    poster: "/photos/events/robotics_16_2025.jpg",
    description:
      "A four-day flagship robotics event featuring hands-on builds that introduced participants to wireless robot control and autonomous navigation. From Bluetooth-controlled bots to IR-based and PID-controlled line followers, participants explored robotics through practical implementation.",
    recap:
      "Across four days of hands-on builds, participants progressed from Bluetooth app control to dual-IR and PID line-following bots, turning theory into autonomous motion.",
    highlights: [
      "Bluetooth App-Controlled Bot: Built using an HC-05 Bluetooth module and MIT App Inventor for wireless control.",
      "Dual-IR Line Follower: Uses two IR sensors positioned on either side of the front wheel to detect and follow a line.",
      "PID Line Follower: Implements PID control for improved accuracy and smoother path tracking.",
    ],
    photos: [
      "/photos/events/robotics_16_recap_1.jpg",
      "/photos/events/robotics_16_recap_2.jpg",
    ],
    stats: [
      { label: "Wings", value: "RAS · EDS" },
      { label: "Format", value: "Flagship event" },
      { label: "Duration", value: "4 days" },
    ],
    pullQuote: "From wireless app control to PID precision—building smart bots, step by step.",
  },
  {
    id: 'tech-tour-2025',
    order: 25,
    template: 'BRIEF',
    title: "Tech Tour 2025 (ISRO ISTRAC & CeNSE IISc)",
    category: "Industrial Visit",
    wing: "IEEE-SJCE",
    date: "20 June 2025",
    venue: "ISRO ISTRAC & CeNSE IISc, Bengaluru",
    poster: "/photos/events/techtour_2025.jpg",
    description:
      "An exclusive technical tour for IEEE-SJCE members visiting ISRO’s Telemetry, Tracking and Command Network (ISTRAC) and the Centre for Nano Science and Engineering (CeNSE) at IISc Bangalore, gaining firsthand exposure to mission control and semiconductor cleanrooms.",
    recap:
      "An exclusive tour that took members inside ISRO’s ISTRAC mission control and the CeNSE cleanrooms at IISc Bangalore.",
    highlights: [
      "ISRO ISTRAC visit",
      "CeNSE, IISc cleanrooms",
      "Mission control exposure",
    ],
    photos: [],
    stats: [
      { label: "Wing", value: "IEEE-SJCE" },
      { label: "Format", value: "Industrial visit" },
      { label: "Duration", value: "1 day" },
    ],
    takeaway: "Step inside the mission.",
  },
  {
    id: 'sql-bootcamp-2025',
    order: 26,
    template: 'BRIEF',
    title: "SQL Bootcamp",
    category: "Bootcamp",
    wing: "WIE",
    date: "10–11 May 2025",
    venue: "Online · Google Meet",
    poster: "/photos/events/sql_bootcamp_2025.jpg",
    description:
      "The Women in Engineering wing conducted an intensive two-day online SQL Bootcamp on Google Meet. Students explored relational DBMS concepts, mastered queries from basic SELECT filters to multi-table joins and aggregation, and tackled interactive Slido quizzes and mini-projects.",
    recap:
      "WIE’s online SQL Bootcamp moved students from basic SELECT filters to multi-table joins and aggregation, with interactive quizzes and mini-projects along the way.",
    highlights: [
      "Relational DBMS concepts",
      "Queries & multi-table joins",
      "Interactive quizzes & projects",
    ],
    photos: [],
    stats: [
      { label: "Wing", value: "WIE" },
      { label: "Format", value: "Bootcamp" },
      { label: "Duration", value: "2 days" },
    ],
    takeaway: "Query your curiosity.",
  },
  {
    id: 'techkshetra-2025',
    order: 27,
    template: 'BRIEF',
    title: "Techkshetra 2025",
    category: "Competition",
    wing: "RAS",
    date: "3 May 2025",
    venue: "SJCE, Mysuru",
    poster: "/photos/events/techkshetra_2025.jpg",
    description:
      "State-level inter-college technical project exposition organized by RAS in association with IEEE Mysuru Subsection. Showcased hardware and software innovations across Category I (1st/2nd years) and Category II (3rd/4th years) spanning AI, robotics, IoT, and drones.",
    recap:
      "Techkshetra brought together student innovators from across the state to showcase hardware and software projects spanning AI, robotics, IoT and drones.",
    highlights: [
      "State-level project exposition",
      "AI, robotics, IoT & drones",
      "Two competition categories",
    ],
    photos: [],
    stats: [
      { label: "Wing", value: "RAS" },
      { label: "Format", value: "Competition" },
      { label: "Duration", value: "1 day" },
    ],
    takeaway: "Build beyond the classroom.",
  },
  {
    id: 'ai-expert-talk-2025',
    order: 28,
    template: 'BRIEF',
    title: "AI Expert Talk and Ideathon",
    category: "Expert Talk",
    wing: "WIE",
    date: "11 February 2025",
    venue: "SJCE, Mysuru",
    poster: "/photos/events/ai_expert_talk_2025.png",
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
    takeaway: "Ideas worth amplifying.",
  },
  {
    id: 'soldering-jan-2025',
    order: 29,
    template: 'BRIEF',
    title: "Soldering and Etching Workshop",
    category: "Workshop",
    wing: "EDS",
    date: "10–12 January 2025",
    venue: "Seminar Hall, 1st Floor CMS Block",
    poster: "/photos/events/soldering_etching_jan_2025.png",
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
    id: 'control-guidance-2024',
    order: 30,
    template: 'BRIEF',
    title: "Tech Talk: Control and Guidance Systems in Space",
    category: "Technical Talk",
    wing: "RAS",
    date: "16 December 2024",
    venue: "CMS Seminar Hall, SJCE",
    poster: "/photos/events/control_guidance_space_2024.png",
    description:
      "Distinguished lecture by Dr. Ravikumar Lagisetty, Group Director of Mission Simulation Group at URSC (ISRO), exploring satellite orbit mechanics, control and guidance architectures, and Chandrayaan-3 and space docking mission case studies at CMS Seminar Hall.",
    recap:
      "A distinguished lecture on satellite orbit mechanics, control and guidance architectures, and the mission stories behind Chandrayaan-3 and space docking.",
    highlights: [
      "Satellite orbit mechanics",
      "Control & guidance systems",
      "Chandrayaan-3 case studies",
    ],
    photos: [],
    stats: [
      { label: "Wing", value: "RAS" },
      { label: "Format", value: "Technical talk" },
      { label: "Duration", value: "1 day" },
    ],
    takeaway: "Guidance begins with a question.",
  },
  {
    id: 'iot-3-2024',
    order: 31,
    template: 'BRIEF',
    title: "IoT-3.0 Workshop",
    category: "Workshop",
    wing: "RAS",
    date: "29 November – 1 December 2024",
    venue: "SJCE, Mysuru",
    poster: "/photos/events/iot_3_0_poster_2024.png",
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
    id: 'snap-circuits-2024',
    order: 32,
    template: 'BRIEF',
    title: "Snap Circuits",
    category: "Workshop",
    wing: "EDS",
    date: "13–14 November 2024",
    venue: "SJCE, Mysuru",
    poster: "/photos/events/snap_circuits_2024.png",
    description:
      "Hands-on electronics workshop. Participants explored breadboard fundamentals, transistors as switches, logic gates, 7-segment displays, capacitor charging/discharging, and photoelectric circuits using modular Snap Circuits kits.",
    recap:
      "Hands-on sessions introduced breadboards, transistors, logic gates, displays and photoelectric circuits through modular Snap Circuits kits.",
    highlights: [
      "Breadboard fundamentals",
      "Transistors & logic gates",
      "Photoelectric circuits",
    ],
    photos: [],
    stats: [
      { label: "Wing", value: "EDS" },
      { label: "Format", value: "Workshop" },
      { label: "Duration", value: "2 days" },
    ],
    takeaway: "Snap, learn, repeat.",
  },
  {
    id: 'fun-finity-2024',
    order: 33,
    template: 'BRIEF',
    title: "Fun-Finity",
    category: "Fun Day",
    wing: "IEEE-SJCE",
    date: "24 October 2024",
    venue: "IS Seminar Hall, SJCE",
    poster: "/photos/events/fun_finity_2024.jpg",
    description:
      "A vibrant freshers welcome social gathering in IS Seminar Hall designed for newcomers to bond with Executive Committee members through icebreakers, team building games, and insights into technical initiatives.",
    recap:
      "A freshers welcome social that broke the ice with games, team building and a first look at the technical initiatives waiting ahead.",
    highlights: [
      "Freshers welcome social",
      "Icebreakers & team games",
      "Meet the Execom",
    ],
    photos: [],
    stats: [
      { label: "Wing", value: "IEEE-SJCE" },
      { label: "Format", value: "Fun Day" },
      { label: "Duration", value: "1 day" },
    ],
    takeaway: "Community starts with hello.",
  },
  {
    id: 'spicelab-2024',
    order: 34,
    template: 'BRIEF',
    title: "SpiceLab",
    category: "Workshop",
    wing: "EDS · RAS · WIE",
    date: "5 October 2024",
    venue: "IS Seminar Hall, SJCE",
    poster: "/photos/events/spicelab_2024.jpg",
    description:
      "A hands-on circuit simulation workshop under the IEEE Illuminate series for IEEE Day 2024. Covered LTspice circuit design, simulation, and analysis across analog rectifiers and digital logic gates and adders in IS Seminar Hall.",
    recap:
      "SpiceLab made LTspice approachable, taking students from analog rectifiers to digital logic gates and adders through simulation.",
    highlights: [
      "LTspice circuit design",
      "Analog rectifiers",
      "Digital logic gates & adders",
    ],
    photos: [],
    stats: [
      { label: "Wings", value: "EDS · RAS · WIE" },
      { label: "Format", value: "Workshop" },
      { label: "Duration", value: "1 day" },
    ],
    takeaway: "Simulate the idea first.",
  },
  {
    id: 'quiz-quake-2024',
    order: 35,
    template: 'DETAILED',
    title: "Quiz Quake",
    category: "Competition",
    wing: "EDS · RAS · WIE",
    date: "10 August 2024",
    venue: "SJCE, Mysuru",
    poster: "/photos/events/quiz_quake_2024.jpg",
    description:
      "A four-round technical and aptitude quiz competition for first- and second-year students organized jointly by EDS, RAS, and WIE. Featured aptitude challenges, riddles, logo identification, and engineering puzzles.",
    recap:
      "A four-round technical and aptitude quiz that tested riddles, logo identification and engineering puzzles across the first and second years.",
    highlights: [
      "Four-round quiz",
      "Aptitude & riddles",
      "Engineering puzzles",
    ],
    photos: [
      "/photos/events/quiz_quake_recap_1.jpg",
    ],
    stats: [
      { label: "Wings", value: "EDS · RAS · WIE" },
      { label: "Format", value: "Competition" },
      { label: "Duration", value: "1 day" },
    ],
    pullQuote: "A quick mind is the best circuit.",
  },
  {
    id: 'tuxedo-2023',
    order: 36,
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
    order: 37,
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
    id: 'snap-circuits-2023',
    order: 38,
    template: 'BRIEF',
    title: "Snap Circuits",
    category: "Workshop",
    wing: "EDS",
    date: "28–29 November 2023",
    venue: "SJCE, Mysuru",
    poster: "/photos/events/snap_circuits_2023.jpg",
    description:
      "The EDS wing's TUXEDO'23 event gave students a hands-on introduction to electronic components and circuit building, with no prior electronics knowledge required.",
    recap:
      "The EDS wing's TUXEDO'23 event gave students a hands-on introduction to electronic components and circuit building, with no prior electronics knowledge required.",
    highlights: [
      "Introduction to components",
      "Circuit building",
      "No prior knowledge needed",
    ],
    photos: [],
    stats: [
      { label: "Wing", value: "EDS" },
      { label: "Format", value: "Workshop" },
      { label: "Duration", value: "2 days" },
    ],
    takeaway: "Start with a snap.",
  },
]

export const MAGAZINE_SUMMARY = (() => {
  const years = new Set(MAGAZINE_EVENTS.map((event) => event.date.match(/\d{4}/)?.[0]).filter(Boolean))
  const wings = new Set(
    MAGAZINE_EVENTS.flatMap((event) => event.wing.split(/[&·]/).map((wing) => wing.trim()))
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
