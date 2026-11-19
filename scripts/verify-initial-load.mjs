import { chromium } from 'playwright'
import { createProdServer } from './prod-server.mjs'

async function verifyInitialLoad() {
  console.log('--- Verifying Initial Loading Behavior ---')
  const server = await createProdServer(4174)
  const browser = await chromium.launch({ headless: true })

  // 1. Check Homepage initial load
  console.log('\n1. Testing Homepage (/home) initial loading...')
  const pageHome = await browser.newPage({ viewport: { width: 1440, height: 900 } })
  const homeRequests = []
  pageHome.on('request', (req) => homeRequests.push(req.url()))

  await pageHome.goto('http://127.0.0.1:4174/home', { waitUntil: 'networkidle' })

  const loadedMagazineBookInitial = homeRequests.some((u) => u.includes('MagazineBook') || u.includes('vendor-pageflip'))
  console.log(`  - MagazineBook requested initially? ${loadedMagazineBookInitial ? 'YES (FAILURE)' : 'NO (CORRECT: lazy-loaded)'}`)

  const heroImageAttrs = await pageHome.evaluate(() => {
    const heroImg = document.querySelector('.nb-bg-image')
    return heroImg
      ? {
          src: heroImg.src,
          fetchpriority: heroImg.getAttribute('fetchpriority'),
          loading: heroImg.getAttribute('loading'),
        }
      : null
  })
  console.log(`  - Hero image prioritized? fetchpriority=${heroImageAttrs?.fetchpriority}, loading=${heroImageAttrs?.loading}`)

  const fontOrigins = homeRequests
    .filter((u) => u.endsWith('.woff2') || u.endsWith('.woff'))
    .map((u) => new URL(u).pathname)
  console.log(`  - Local fonts loaded:`, fontOrigins.join(', '))

  // Now click Open Magazine and verify MagazineBook loads only on demand
  console.log('  - Clicking "Open Magazine" to verify on-demand chunk download...')
  await pageHome.evaluate(() => document.getElementById('events-section')?.scrollIntoView())
  await pageHome.waitForTimeout(400)
  const openBtn = pageHome.locator('button:has-text("Open Magazine")').first()
  await openBtn.click()
  await pageHome.waitForTimeout(1000)

  const loadedMagazineBookAfterClick = homeRequests.some((u) => u.includes('MagazineBook') || u.includes('vendor-pageflip'))
  console.log(`  - MagazineBook requested after click? ${loadedMagazineBookAfterClick ? 'YES (CORRECT: loaded on demand)' : 'NO'}`)

  await pageHome.close()

  // 2. Check Team Page initial load
  console.log('\n2. Testing Team page (/team) initial loading...')
  const pageTeam = await browser.newPage({ viewport: { width: 1440, height: 900 } })
  const teamRequests = []
  pageTeam.on('request', (req) => teamRequests.push(req.url()))

  await pageTeam.goto('http://127.0.0.1:4174/team', { waitUntil: 'networkidle' })

  const loadedTeamArchiveInitial = teamRequests.some((u) => u.includes('team_photo'))
  console.log(`  - Archived team data requested initially? ${loadedTeamArchiveInitial ? 'YES (FAILURE)' : 'NO (CORRECT: lazy-loaded)'}`)

  // Click Execom archive accordion and verify chunk loads on demand
  console.log('  - Clicking Execom archive accordion to verify on-demand chunk download...')
  const accordion = pageTeam.locator('.execom-accordion-bar')
  await accordion.scrollIntoViewIfNeeded()
  await accordion.click()
  await pageTeam.waitForTimeout(1000)

  const loadedTeamArchiveAfterClick = teamRequests.some((u) => u.includes('team_photo'))
  console.log(`  - Archived team data requested after click? ${loadedTeamArchiveAfterClick ? 'YES (CORRECT: loaded on demand)' : 'NO'}`)

  await pageTeam.close()
  await browser.close()
  server.close()

  console.log('\n--- Initial Loading Verification Complete ---')
}

verifyInitialLoad().catch((e) => {
  console.error(e)
  process.exit(1)
})
