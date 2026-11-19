import { readFile, writeFile, rm } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import {
  NOT_FOUND,
  OG_IMAGE,
  ROUTES,
  SEO_ROUTES,
  SITE_NAME,
  SITE_URL,
  absoluteUrl,
  buildStructuredData,
} from '../src/data/seo.js'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(root, 'dist')
const templatePath = join(dist, 'index.html')

const escapeHtml = (value = '') =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')

const escapeJson = (value) => JSON.stringify(value).replaceAll('<', '\\u003c')

const routeTagPatterns = [
  /<title>[\s\S]*?<\/title>/gi,
  /<meta\s+name="description"[^>]*>/gi,
  /<meta\s+name="robots"[^>]*>/gi,
  /<link\s+rel="canonical"[^>]*>/gi,
  /<meta\s+property="og:[^"]+"[^>]*>/gi,
  /<meta\s+name="twitter:[^"]+"[^>]*>/gi,
  /<script\s+id="page-structured-data"[^>]*>[\s\S]*?<\/script>/gi,
]

const NAV_LABELS = {
  '/home': 'Home',
  '/societies': 'Societies',
  '/boards': 'Boards',
  '/gallery': 'Gallery',
  '/contact': 'Contact',
  '/team': 'Team',
}

const ROUTE_SOURCES = {
  '/': 'src/pages/EntryPage.jsx',
  '/home': 'src/pages/HomePage.jsx',
  '/societies': 'src/pages/SocietiesPage.jsx',
  '/boards': 'src/pages/BoardsPage.jsx',
  '/gallery': 'src/pages/GalleryPage.jsx',
  '/contact': 'src/pages/ContactPage.jsx',
  '/team': 'src/pages/TeamPage.jsx',
}

function preloadMarkup(manifest, source) {
  if (!source) return ''

  const entryKey =
    manifest[source] !== undefined
      ? source
      : Object.keys(manifest).find(
          (key) =>
            manifest[key]?.src === source ||
            (manifest[key]?.name && source.endsWith(`/${manifest[key].name}.jsx`)),
        )
  if (!entryKey) return ''

  const seen = new Set()
  const files = new Set()
  const styles = new Set()

  const visit = (key) => {
    if (key === 'index.html' || seen.has(key)) return
    seen.add(key)
    const item = manifest[key]
    if (!item) return
    if (item.file && !item.file.includes('vendor-react-')) files.add(item.file)
    for (const css of item.css || []) styles.add(css)
    for (const imported of item.imports || []) visit(imported)
  }

  visit(entryKey)

  return [
    ...styles,
    ...files,
  ]
    .map((file) =>
      file.endsWith('.css')
        ? `    <link rel="stylesheet" crossorigin href="/${file}">`
        : `    <link rel="modulepreload" crossorigin href="/${file}">`,
    )
    .join('\n')
}

function fallbackMarkup(meta) {
  const links = SEO_ROUTES.filter((route) => route !== '/')
    .map((route) => `<a href="${route}">${escapeHtml(NAV_LABELS[route])}</a>`)
    .join('')

  return `<div id="root"><main class="seo-fallback"><img src="/logo.png" alt="" width="56" height="56" /><h1>${escapeHtml(
    meta.h1,
  )}</h1><p>${escapeHtml(meta.intro)}</p><nav aria-label="Primary">${links}</nav></main></div>`
}

function renderPage(template, meta, preloads = '') {
  let html = template
  for (const pattern of routeTagPatterns) {
    html = html.replace(pattern, '')
  }

  const image = absoluteUrl(OG_IMAGE)
  const tags = `
    <title>${escapeHtml(meta.title)}</title>
    <meta name="description" content="${escapeHtml(meta.description)}" />
    <meta name="robots" content="${meta.noindex ? 'noindex, nofollow' : 'index, follow'}" />
    <link rel="canonical" href="${meta.canonical}" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="${escapeHtml(SITE_NAME)}" />
    <meta property="og:title" content="${escapeHtml(meta.ogTitle ?? meta.title)}" />
    <meta property="og:description" content="${escapeHtml(meta.description)}" />
    <meta property="og:url" content="${meta.canonical}" />
    <meta property="og:image" content="${image}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="${escapeHtml(meta.h1)}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(meta.ogTitle ?? meta.title)}" />
    <meta name="twitter:description" content="${escapeHtml(meta.description)}" />
    <meta name="twitter:image" content="${image}" />
    <script id="page-structured-data" type="application/ld+json">${escapeJson(
      buildStructuredData(meta),
    )}</script>`

  html = html.replace('</head>', `${preloads}\n${tags}\n  </head>`)
  html = html.replace(/<div id="root"><\/div>/, fallbackMarkup(meta))
  return html.replace(/^[ \t]+$/gm, '').replace(/\n{3,}/g, '\n\n')
}

const template = await readFile(templatePath, 'utf8')
const manifestPath = join(dist, '.vite', 'manifest.json')
let manifest = {}
try {
  manifest = JSON.parse(await readFile(manifestPath, 'utf8'))
} catch {
  console.warn('Vite manifest not found; route-specific preloads were skipped.')
}

for (const route of SEO_ROUTES) {
  const meta = ROUTES[route]
  const preloads = preloadMarkup(manifest, ROUTE_SOURCES[route])
  const html = renderPage(template, meta, preloads)
  const output = route === '/' ? templatePath : join(dist, `${route.slice(1)}.html`)
  await writeFile(output, html)
}

// Generate static 404.html for Vercel and edge web servers
const notFoundHtml = renderPage(template, NOT_FOUND)
await writeFile(join(dist, '404.html'), notFoundHtml)

const today = new Date().toISOString().split('T')[0]
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${SEO_ROUTES.map(
  (route) => `  <url>
    <loc>${ROUTES[route].canonical}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${route === '/' || route === '/home' ? 'weekly' : 'monthly'}</changefreq>
    <priority>${route === '/home' ? '1.0' : route === '/' ? '0.9' : '0.8'}</priority>
  </url>`,
).join('\n')}
</urlset>
`

await writeFile(join(dist, 'sitemap.xml'), sitemap)
await rm(join(dist, '.vite'), { recursive: true, force: true })
console.log(`Generated SEO HTML for ${SEO_ROUTES.length} routes, 404.html and sitemap.xml`)
