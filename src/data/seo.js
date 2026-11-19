export const SITE_URL = 'https://ieeesjce.org'
export const SITE_NAME = 'IEEE SJCE Student Branch'
export const OG_IMAGE = '/og-ieee-sjce.jpg'

const ORGANIZATION = {
  '@type': 'Organization',
  '@id': `${SITE_URL}/#organization`,
  name: SITE_NAME,
  alternateName: ['IEEE SJCE', 'SJCE IEEE', 'IEEE-SJCE', 'IEEE Student Branch SJCE'],
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  description:
    'The IEEE Student Branch at Sri Jayachamarajendra College of Engineering (SJCE), JSS Science and Technology University, Mysuru, connecting students with technology, research, and professional communities.',
  parentOrganization: {
    '@type': 'Organization',
    name: 'IEEE',
    url: 'https://www.ieee.org',
  },
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Sri Jayachamarajendra College of Engineering, JSS TI Campus',
    addressLocality: 'Mysuru',
    postalCode: '570006',
    addressRegion: 'Karnataka',
    addressCountry: 'IN',
  },
  sameAs: [
    'https://www.instagram.com/ieee_sjce/',
    'https://www.linkedin.com/company/ieee-sjce/',
    'https://www.facebook.com/ieeesjce/',
    'https://www.youtube.com/user/IEEESJCE',
  ],
}

const WEBSITE = {
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  url: SITE_URL,
  name: SITE_NAME,
  publisher: { '@id': `${SITE_URL}/#organization` },
  inLanguage: 'en',
}

export const ROUTES = {
  '/': {
    title: 'IEEE SJCE | IEEE Student Branch at SJCE Mysuru',
    description:
      'Official website of the IEEE Student Branch at Sri Jayachamarajendra College of Engineering (SJCE), JSS Science and Technology University, Mysuru. Discover technical events, student societies, and innovation.',
    h1: 'IEEE SJCE Student Branch',
    intro:
      'Official website of the IEEE Student Branch at Sri Jayachamarajendra College of Engineering (SJCE), JSS Science and Technology University, Mysuru. Explore our student societies, flagship events, boards, achievements, and team.',
    canonical: `${SITE_URL}/`,
    ogTitle: 'IEEE SJCE | IEEE Student Branch at SJCE Mysuru',
  },
  '/home': {
    title: 'IEEE SJCE | Events, Student Societies & Technical Innovation at SJCE Mysuru',
    description:
      'Discover IEEE SJCE technical events, flagship conferences, student chapters (EDS, RAS, SPS, AESS, WIE), awards, and student projects at Sri Jayachamarajendra College of Engineering, Mysuru.',
    h1: 'IEEE SJCE — Innovate, Inspire, Engineer',
    intro:
      'Discover IEEE SJCE technical events, flagship conferences, student chapters, awards, and the community at Sri Jayachamarajendra College of Engineering (SJCE), Mysuru.',
    canonical: `${SITE_URL}/home`,
    ogTitle: 'IEEE SJCE | Events, Societies & Technical Innovation',
  },
  '/societies': {
    title: 'IEEE SJCE Chapters & Societies | EDS, RAS, SPS, AESS, WIE',
    description:
      'Explore technical societies and chapters at IEEE SJCE: Electron Devices Society, Robotics & Automation Society, Signal Processing Society, Aerospace & Electronic Systems Society, and Women in Engineering.',
    h1: 'IEEE SJCE Societies and Chapters',
    intro:
      'Explore IEEE SJCE societies and technical chapters (EDS, RAS, SPS, AESS, WIE), hands-on workshops, and student engineering communities at SJCE Mysuru.',
    canonical: `${SITE_URL}/societies`,
    ogTitle: 'IEEE SJCE Chapters & Societies | EDS, RAS, SPS, AESS, WIE',
  },
  '/boards': {
    title: 'IEEE SJCE Boards | Web Development, Editorial & Creative Initiatives',
    description:
      'Meet the creative boards powering IEEE SJCE: Web Development Board and Editorial Board, publishing the annual IEEE Interface magazine and building digital platforms.',
    h1: 'IEEE SJCE Boards',
    intro:
      'Meet the creative boards powering IEEE SJCE: Web Development Board and Editorial Board, publishing the annual IEEE Interface magazine and building digital platforms.',
    canonical: `${SITE_URL}/boards`,
    ogTitle: 'IEEE SJCE Boards | Editorial & Web Development',
  },
  '/gallery': {
    title: 'IEEE SJCE Gallery | Moments, Technical Workshops & Student Life',
    description:
      'Explore photographs and memories from IEEE SJCE technical workshops, hackathons, conferences, and student activities at Sri Jayachamarajendra College of Engineering, Mysuru.',
    h1: 'IEEE SJCE Gallery',
    intro:
      'Explore photographs and memories from IEEE SJCE technical workshops, hackathons, conferences, and student activities at Sri Jayachamarajendra College of Engineering, Mysuru.',
    canonical: `${SITE_URL}/gallery`,
    ogTitle: 'IEEE SJCE Gallery | Moments & Memories',
  },
  '/contact': {
    title: 'Contact IEEE SJCE | Sri Jayachamarajendra College of Engineering, Mysuru',
    description:
      'Get in touch with the IEEE SJCE Student Branch at Sri Jayachamarajendra College of Engineering, JSS STU, Mysuru for collaborations, sponsorships, event queries, and membership.',
    h1: 'Contact IEEE SJCE',
    intro:
      'Get in touch with the IEEE SJCE Student Branch at Sri Jayachamarajendra College of Engineering, JSS STU, Mysuru for collaborations, sponsorships, event queries, and membership.',
    canonical: `${SITE_URL}/contact`,
    ogTitle: 'Contact IEEE SJCE',
  },
  '/team': {
    title: 'IEEE SJCE Team | Executive Committee & Office Bearers 2025–26',
    description:
      'Meet the student leaders and office bearers of IEEE SJCE for 2025–26, including the Executive Committee, MDC, EDS, RAS, SPS, AESS, WIE, and board chairs.',
    h1: 'The IEEE SJCE Team',
    intro:
      'Meet the student leaders and office bearers of IEEE SJCE for 2025–26, including the Executive Committee, MDC, EDS, RAS, SPS, AESS, WIE, and board chairs.',
    canonical: `${SITE_URL}/team`,
    ogTitle: 'IEEE SJCE Team | Executive Committee 2025–26',
  },
}

export const NOT_FOUND = {
  title: 'Page Not Found | IEEE SJCE',
  description: 'The requested page could not be found on the IEEE SJCE website.',
  h1: 'Page Not Found',
  intro: 'The requested page could not be found. Return to the IEEE SJCE homepage.',
  canonical: `${SITE_URL}/404`,
  noindex: true,
}

export const SEO_ROUTES = [
  '/',
  '/home',
  '/societies',
  '/boards',
  '/gallery',
  '/contact',
  '/team',
]

export function normalizePath(pathname = '/') {
  const clean = pathname.split('?')[0].split('#')[0]
  if (!clean || clean === '/') return '/'
  return clean.replace(/\/+$/, '')
}

export function getRouteMeta(pathname = '/') {
  return ROUTES[normalizePath(pathname)] ?? NOT_FOUND
}

export function absoluteUrl(path = '/') {
  if (/^https?:\/\//i.test(path)) return path
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`
}

export function buildStructuredData(meta) {
  const graph = [ORGANIZATION, WEBSITE]

  if (meta.canonical) {
    graph.push({
      '@type': 'WebPage',
      '@id': `${meta.canonical}#webpage`,
      url: meta.canonical,
      name: meta.title,
      description: meta.description,
      isPartOf: { '@id': `${SITE_URL}/#website` },
      about: { '@id': `${SITE_URL}/#organization` },
      inLanguage: 'en',
    })

    if (meta.canonical !== `${SITE_URL}/`) {
      graph.push({
        '@type': 'BreadcrumbList',
        '@id': `${meta.canonical}#breadcrumb`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: `${SITE_URL}/home`,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: meta.h1,
            item: meta.canonical,
          },
        ],
      })
    }
  }

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  }
}
