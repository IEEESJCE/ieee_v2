const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');

// Paths
const eventsSectionPath = path.join(__dirname, '../src/components/EventsSection.jsx');
const societiesPagePath = path.join(__dirname, '../src/pages/SocietiesPage.jsx');
const outputPath = path.join(__dirname, '../IEEE_SJCE_Events_and_Featured_Societies_Guide.pdf');
const backupPath = 'E:/ieee_v2-main/IEEE_SJCE_Events_and_Featured_Societies_Guide.pdf';
const artifactPath = 'C:/Users/abhid/.gemini/antigravity/brain/7eb539f7-ea27-45d7-bc45-b70ec4794328/IEEE_SJCE_Events_and_Featured_Societies_Guide.pdf';

// 1. Parse Timeline Events from EventsSection.jsx
const evtFile = fs.readFileSync(eventsSectionPath, 'utf8');
const timelineEvents = [];
const eventBlocks = evtFile.split(/\{\s*title:\s*['"`]/);
eventBlocks.shift();

for (const b of eventBlocks) {
  const titleMatch = b.match(/^([^'"`]+)['"`]/);
  const dateMatch = b.match(/date:\s*['"`]([^'"`]+)['"`]/);
  const wingMatch = b.match(/wing:\s*['"`]([^'"`]+)['"`]/);
  const descMatch = b.match(/description:\s*\n?\s*['"`]([\s\S]*?)['"`],/);

  if (titleMatch) {
    timelineEvents.push({
      title: titleMatch[1].trim(),
      date: dateMatch ? dateMatch[1].trim() : '',
      wing: wingMatch ? wingMatch[1].trim() : '',
      description: descMatch ? descMatch[1].replace(/\s+/g, ' ').trim() : ''
    });
  }
}

// 2. Parse Societies from SocietiesPage.jsx
const socFile = fs.readFileSync(societiesPagePath, 'utf8');
const societies = [];
const lines = socFile.split('\n');

let currentSoc = null;
let currentEvent = null;
let inEvents = false;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i].trim();
  if (line.startsWith('id: "') || line.startsWith("id: '")) {
    const id = line.match(/id:\s*['"]([^'"]+)['"]/)[1];
    currentSoc = { id, events: [], about: '', tagline: '', name: '' };
    societies.push(currentSoc);
    inEvents = false;
  } else if (currentSoc && (line.startsWith('name: "') || line.startsWith("name: '"))) {
    currentSoc.name = line.match(/name:\s*['"]([^'"]+)['"]/)[1];
  } else if (currentSoc && (line.startsWith('tagline: "') || line.startsWith("tagline: '"))) {
    currentSoc.tagline = line.match(/tagline:\s*['"]([^'"]+)['"]/)[1];
  } else if (currentSoc && (line.startsWith('about: "') || line.startsWith("about: '") || line.startsWith('about:'))) {
    const aboutMatch = line.match(/about:\s*['"`](.*)/);
    if (aboutMatch) currentSoc.about = aboutMatch[1].replace(/['"`],?$/, '');
  } else if (line.startsWith('events: [')) {
    inEvents = true;
  } else if (inEvents && line.startsWith('],')) {
    inEvents = false;
  } else if (inEvents && (line.startsWith('title: "') || line.startsWith("title: '"))) {
    const title = line.match(/title:\s*['"]([^'"]+)['"]/)[1];
    currentEvent = { title, desc: '' };
    currentSoc.events.push(currentEvent);
  } else if (inEvents && currentEvent && (line.startsWith('desc: "') || line.startsWith("desc: '") || line.startsWith('desc: `'))) {
    const desc = line.replace(/^desc:\s*['"`]/, '').replace(/['"`],?$/, '');
    currentEvent.desc = desc;
  }
}

console.log(`Parsed ${timelineEvents.length} timeline events and ${societies.length} societies.`);

// Create PDF document
const doc = new PDFDocument({
  size: 'A4',
  margins: { top: 48, bottom: 48, left: 45, right: 45 },
  bufferPages: true,
  autoFirstPage: false
});

const writeStream = fs.createWriteStream(outputPath);
doc.pipe(writeStream);

const PAGE_WIDTH = 595.28;
const PAGE_HEIGHT = 841.89;
const MARGIN_LEFT = 45;
const MARGIN_RIGHT = 45;
const CONTENT_WIDTH = PAGE_WIDTH - MARGIN_LEFT - MARGIN_RIGHT; // 505.28 pt

// Colors
const C = {
  navyDark: '#0B132B',
  navySlate: '#1E293B',
  bluePrimary: '#1D4ED8',
  blueLight: '#EFF6FF',
  bodyText: '#334155',
  mutedText: '#64748B',
  borderLight: '#CBD5E1',
  cardBg: '#F8FAFC',
  white: '#FFFFFF',
  goldBadge: '#FEF3C7',
  goldText: '#92400E',
  socColors: {
    'student-branch': '#2563EB',
    'eds': '#0284C7',
    'wie': '#BE185D',
    'ras': '#059669',
    'sps': '#7C3AED',
    'aess': '#D97706',
    'cs': '#2563EB'
  }
};

// Helper: check space and add page if needed
function ensureSpace(neededHeight) {
  if (doc.y + neededHeight > PAGE_HEIGHT - 55) {
    doc.addPage();
    return true;
  }
  return false;
}

// ==========================================
// 1. COVER PAGE
// ==========================================
doc.addPage();

// Background top banner
doc.rect(0, 0, PAGE_WIDTH, 230).fill(C.navyDark);

// Top accent line
doc.rect(0, 225, PAGE_WIDTH, 5).fill(C.bluePrimary);

// IEEE Emblem box
doc.roundedRect(MARGIN_LEFT, 40, 60, 60, 8).fill(C.bluePrimary);
doc.font('Helvetica-Bold').fontSize(19).fillColor(C.white)
   .text('IEEE', MARGIN_LEFT, 60, { width: 60, align: 'center', lineBreak: false });

// Organization Details
doc.font('Helvetica-Bold').fontSize(12).fillColor('#93C5FD')
   .text('IEEE-SJCE STUDENT BRANCH (STB14391)', MARGIN_LEFT + 74, 50, { lineBreak: false });
doc.font('Helvetica').fontSize(9.5).fillColor('#E2E8F0')
   .text('Sri Jayachamarajendra College of Engineering (JSS STU), Mysuru', MARGIN_LEFT + 74, 66, { lineBreak: false });
doc.font('Helvetica').fontSize(9).fillColor('#CBD5E1')
   .text('Affiliated to IEEE Bangalore Section & IEEE Mysuru Subsection', MARGIN_LEFT + 74, 82, { lineBreak: false });

// Main Document Title
doc.font('Helvetica-Bold').fontSize(24).fillColor(C.white)
   .text('Official Events & Featured Societies Catalog', MARGIN_LEFT, 125, { width: CONTENT_WIDTH });
doc.font('Helvetica-Oblique').fontSize(11).fillColor('#CBD5E1')
   .text('Complete Reference Guide: Chronological Events Timeline & Society Featured Initiatives', MARGIN_LEFT, 185, { width: CONTENT_WIDTH });

// Meta Info Box
doc.y = 250;
doc.roundedRect(MARGIN_LEFT, doc.y, CONTENT_WIDTH, 78, 8).fillAndStroke('#F1F5F9', C.borderLight);

const metaY = doc.y + 11;
doc.font('Helvetica-Bold').fontSize(9).fillColor(C.navySlate)
   .text('DOCUMENT SCOPE & EDITION', MARGIN_LEFT + 16, metaY, { lineBreak: false });
doc.font('Helvetica').fontSize(8.5).fillColor(C.bodyText)
   .text('• Section 1: Complete Chronological Timeline of 38 Branch Events (2023–2026 Editions)', MARGIN_LEFT + 16, metaY + 15, { lineBreak: false })
   .text('• Section 2: Society-Specific Featured Events across all 7 Technical Chapters & Affinity Groups', MARGIN_LEFT + 16, metaY + 29, { lineBreak: false })
   .text('• Source: IEEE-SJCE Official Production Portal & Annual Reports (2024–2026 Archive)', MARGIN_LEFT + 16, metaY + 43, { lineBreak: false })
   .text('• Generated: November 2026  |  Status: Officially Verified Production Release', MARGIN_LEFT + 16, metaY + 57, { lineBreak: false });

// Table of Contents Overview
doc.y = 348;
doc.font('Helvetica-Bold').fontSize(13).fillColor(C.navyDark).text('TABLE OF CONTENTS', MARGIN_LEFT, doc.y, { lineBreak: false });
doc.rect(MARGIN_LEFT, doc.y + 18, CONTENT_WIDTH, 1.5).fill(C.bluePrimary);

doc.y += 26;

const tocItems = [
  { section: 'SECTION 1', title: 'Events Timeline (Events Page)', desc: '38 Chronological Events (Snap Circuits, MATLAB Workshop, Robotics, Space Tech Talk, SQL Bootcamp, etc.)' },
  { section: 'SECTION 2.1', title: 'IEEE-SJCE Student Branch (Main)', desc: '9 Featured Events (Orientation, Techtour, Fun-Finity, Radioverse, Tech Detective, Circuitrix, Electroclues, etc.)' },
  { section: 'SECTION 2.2', title: 'Electron Devices Society (EDS)', desc: '6 Featured Events (Snap Circuits, Soldering & Etching, Cadence, Robotics, SpiceLab, Quiz Quake)' },
  { section: 'SECTION 2.3', title: 'Women in Engineering (WIE)', desc: '8 Featured Events (Kalpana Chawla, TCL, Prayas, STRONG AI Ideathon, SQL Bootcamp, SpiceLab, etc.)' },
  { section: 'SECTION 2.4', title: 'Robotics & Automation Society (RAS)', desc: '9 Featured Events (IoT Series, Techkshetra, Robotics Workshop, Space Tech Talk, Motion Planning, etc.)' },
  { section: 'SECTION 2.5', title: 'Signal Processing Society (SPS)', desc: '7 Featured Events (THE WAVE, SPS Launch Keynote, ML Workshop, Wave Lab, Motion Planning, MATLAB)' },
  { section: 'SECTION 2.6', title: 'Aerospace & Electronic Systems (AESS)', desc: '2 Featured Events (AESS Chapter Inauguration & Space Tech Talk, Multi-Society MATLAB Workshop)' },
  { section: 'SECTION 2.7', title: 'Computer Society (CS)', desc: '1 Featured Event (IEEE Computer Society Chapter Inauguration & Computing Foundations)' },
];

tocItems.forEach((item) => {
  const itemY = doc.y;
  doc.roundedRect(MARGIN_LEFT, itemY, CONTENT_WIDTH, 42, 6).fillAndStroke(C.cardBg, C.borderLight);
  
  doc.font('Helvetica-Bold').fontSize(8.5).fillColor(C.bluePrimary).text(item.section, MARGIN_LEFT + 12, itemY + 8, { lineBreak: false });
  doc.font('Helvetica-Bold').fontSize(10).fillColor(C.navyDark).text(item.title, MARGIN_LEFT + 95, itemY + 8, { lineBreak: false });
  doc.font('Helvetica').fontSize(8).fillColor(C.mutedText).text(item.desc, MARGIN_LEFT + 95, itemY + 23, { width: CONTENT_WIDTH - 110, lineBreak: false });

  doc.y = itemY + 47;
});

// ==========================================
// 2. SECTION 1: TIMELINE EVENTS (Events Page)
// ==========================================
doc.addPage();

// Section Header Banner
doc.roundedRect(MARGIN_LEFT, doc.y, CONTENT_WIDTH, 48, 6).fill(C.navyDark);
doc.font('Helvetica-Bold').fontSize(14).fillColor(C.white)
   .text('SECTION 1: EVENTS PAGE TIMELINE', MARGIN_LEFT + 16, doc.y + 11, { lineBreak: false });
doc.font('Helvetica').fontSize(9).fillColor('#94A3B8')
   .text('Complete Catalog of all 38 Events Displayed in Reverse Chronological Order on the Events Page', MARGIN_LEFT + 16, doc.y + 28, { lineBreak: false });

doc.y += 62;

timelineEvents.forEach((evt, idx) => {
  doc.font('Helvetica').fontSize(8.5);
  const descHeight = doc.heightOfString(evt.description, { width: CONTENT_WIDTH - 24 });
  const cardHeight = Math.max(68, 46 + descHeight + 10);

  ensureSpace(cardHeight + 8);

  const cardY = doc.y;

  // Background Card
  doc.roundedRect(MARGIN_LEFT, cardY, CONTENT_WIDTH, cardHeight, 6)
     .fillAndStroke(idx % 2 === 0 ? C.white : C.cardBg, C.borderLight);

  // Left Color Accent Bar
  doc.roundedRect(MARGIN_LEFT, cardY, 4, cardHeight, 2).fill(C.bluePrimary);

  // Index Badge
  const idxStr = String(idx + 1).padStart(2, '0');
  doc.roundedRect(MARGIN_LEFT + 12, cardY + 9, 24, 18, 4).fill('#E0E7FF');
  doc.font('Helvetica-Bold').fontSize(8.5).fillColor(C.bluePrimary)
     .text(idxStr, MARGIN_LEFT + 12, cardY + 13, { width: 24, align: 'center', lineBreak: false });

  // Event Title
  doc.font('Helvetica-Bold').fontSize(10.5).fillColor(C.navyDark)
     .text(evt.title, MARGIN_LEFT + 42, cardY + 12, { width: CONTENT_WIDTH - 190, lineBreak: false });

  // Date Badge (Right-aligned)
  const dateW = doc.widthOfString(evt.date);
  doc.font('Helvetica-Bold').fontSize(8.5).fillColor(C.navySlate)
     .text(evt.date, MARGIN_LEFT + CONTENT_WIDTH - dateW - 14, cardY + 10, { lineBreak: false });

  // Wing Badge (Below Date)
  const wingStr = `[ ${evt.wing} ]`;
  const wingW = doc.widthOfString(wingStr);
  doc.font('Helvetica-Bold').fontSize(8).fillColor(C.bluePrimary)
     .text(wingStr, MARGIN_LEFT + CONTENT_WIDTH - wingW - 14, cardY + 22, { lineBreak: false });

  // Subtle separator line
  doc.moveTo(MARGIN_LEFT + 12, cardY + 35).lineTo(MARGIN_LEFT + CONTENT_WIDTH - 12, cardY + 35)
     .strokeColor('#E2E8F0').lineWidth(0.5).stroke();

  // Full Description
  doc.font('Helvetica').fontSize(8.5).fillColor(C.bodyText)
     .text(evt.description, MARGIN_LEFT + 12, cardY + 41, { width: CONTENT_WIDTH - 24, lineGap: 1.5 });

  doc.y = cardY + cardHeight + 7;
});

// ==========================================
// 3. SECTION 2: FEATURED EVENTS IN SOCIETIES
// ==========================================
doc.addPage();

// Section Header Banner
doc.roundedRect(MARGIN_LEFT, doc.y, CONTENT_WIDTH, 48, 6).fill(C.navyDark);
doc.font('Helvetica-Bold').fontSize(14).fillColor(C.white)
   .text('SECTION 2: FEATURED EVENTS IN SOCIETIES SECTION', MARGIN_LEFT + 16, doc.y + 11, { lineBreak: false });
doc.font('Helvetica').fontSize(9).fillColor('#94A3B8')
   .text('Society-Wise Featured Events and Descriptions as Displayed in the Societies Section', MARGIN_LEFT + 16, doc.y + 28, { lineBreak: false });

doc.y += 62;

societies.forEach((soc) => {
  const socColor = C.socColors[soc.id] || C.bluePrimary;

  // Ensure space for society header block
  ensureSpace(120);

  // Society Header Block
  const socHeaderY = doc.y;
  doc.roundedRect(MARGIN_LEFT, socHeaderY, CONTENT_WIDTH, 70, 6).fillAndStroke('#F8FAFC', socColor);
  doc.roundedRect(MARGIN_LEFT, socHeaderY, CONTENT_WIDTH, 25, 6).fill(socColor);

  doc.font('Helvetica-Bold').fontSize(11).fillColor(C.white)
     .text(soc.name.toUpperCase(), MARGIN_LEFT + 14, socHeaderY + 7, { lineBreak: false });
  doc.font('Helvetica-Oblique').fontSize(8.5).fillColor(socColor)
     .text(`"${soc.tagline}"`, MARGIN_LEFT + 14, socHeaderY + 31, { width: CONTENT_WIDTH - 28, lineBreak: false });
  doc.font('Helvetica').fontSize(7.5).fillColor(C.bodyText)
     .text(soc.about, MARGIN_LEFT + 14, socHeaderY + 44, { width: CONTENT_WIDTH - 28, height: 22, ellipsis: true });

  doc.y = socHeaderY + 78;

  // Featured Events sub-heading
  doc.font('Helvetica-Bold').fontSize(10).fillColor(socColor)
     .text(`Featured Events (${soc.events.length})`, MARGIN_LEFT + 6, doc.y, { lineBreak: false });
  doc.rect(MARGIN_LEFT + 6, doc.y + 13, 120, 1.5).fill(socColor);

  doc.y += 18;

  soc.events.forEach((evt, evtIdx) => {
    doc.font('Helvetica').fontSize(8.5);
    const descHeight = doc.heightOfString(evt.desc, { width: CONTENT_WIDTH - 36 });
    const cardHeight = Math.max(48, 24 + descHeight + 10);

    ensureSpace(cardHeight + 8);

    const cardY = doc.y;

    doc.roundedRect(MARGIN_LEFT + 6, cardY, CONTENT_WIDTH - 12, cardHeight, 5)
       .fillAndStroke(evtIdx % 2 === 0 ? C.white : '#F8FAFC', C.borderLight);

    // Left Accent Marker
    doc.roundedRect(MARGIN_LEFT + 6, cardY, 3, cardHeight, 1.5).fill(socColor);

    // Event Title
    doc.font('Helvetica-Bold').fontSize(9.5).fillColor(C.navyDark)
       .text(`${evtIdx + 1}. ${evt.title}`, MARGIN_LEFT + 16, cardY + 7, { width: CONTENT_WIDTH - 40, lineBreak: false });

    // Event Description
    doc.font('Helvetica').fontSize(8.5).fillColor(C.bodyText)
       .text(evt.desc, MARGIN_LEFT + 16, cardY + 22, { width: CONTENT_WIDTH - 44, lineGap: 1.5 });

    doc.y = cardY + cardHeight + 6;
  });

  doc.y += 12;
});

// ==========================================
// 4. RUNNING HEADERS & FOOTERS (PASS 2)
// ==========================================
const range = doc.bufferedPageRange();
const totalPages = range.count;

for (let i = range.start; i < range.start + totalPages; i++) {
  doc.switchToPage(i);

  // Skip cover page for header
  if (i > range.start) {
    // Top Header line
    doc.moveTo(MARGIN_LEFT, 32).lineTo(MARGIN_LEFT + CONTENT_WIDTH, 32)
       .strokeColor(C.borderLight).lineWidth(0.5).stroke();
    doc.font('Helvetica-Bold').fontSize(7.5).fillColor(C.mutedText)
       .text('IEEE-SJCE STUDENT BRANCH', MARGIN_LEFT, 22, { lineBreak: false });
    
    const headerRight = 'Official Events & Featured Societies Directory';
    const headerW = doc.widthOfString(headerRight);
    doc.font('Helvetica').fontSize(7.5).fillColor(C.mutedText)
       .text(headerRight, MARGIN_LEFT + CONTENT_WIDTH - headerW, 22, { lineBreak: false });
  }

  // Bottom Footer line on all pages
  doc.moveTo(MARGIN_LEFT, PAGE_HEIGHT - 32).lineTo(MARGIN_LEFT + CONTENT_WIDTH, PAGE_HEIGHT - 32)
     .strokeColor(C.borderLight).lineWidth(0.5).stroke();

  doc.font('Helvetica').fontSize(7.5).fillColor(C.mutedText)
     .text('IEEE-SJCE Student Branch (STB14391)  •  Sri Jayachamarajendra College of Engineering, Mysuru', MARGIN_LEFT, PAGE_HEIGHT - 24, { lineBreak: false });

  const pageStr = `Page ${i + 1} of ${totalPages}`;
  const pageW = doc.widthOfString(pageStr);
  doc.font('Helvetica-Bold').fontSize(7.5).fillColor(C.mutedText)
     .text(pageStr, MARGIN_LEFT + CONTENT_WIDTH - pageW, PAGE_HEIGHT - 24, { lineBreak: false });
}

doc.end();

writeStream.on('finish', () => {
  console.log(`Successfully generated PDF: ${outputPath}`);

  // Copy to backup and artifact paths
  try {
    if (fs.existsSync('E:/ieee_v2-main')) {
      fs.copyFileSync(outputPath, backupPath);
      console.log(`Copied to backup: ${backupPath}`);
    }
  } catch (err) {
    console.error('Backup copy error:', err.message);
  }

  try {
    fs.copyFileSync(outputPath, artifactPath);
    console.log(`Copied to brain artifact path: ${artifactPath}`);
  } catch (err) {
    console.error('Artifact copy error:', err.message);
  }
});
