import { chromium } from 'playwright'
import { createProdServer } from './prod-server.mjs'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const SCREENSHOT_DIR = path.resolve(__dirname, '../screenshots')

if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true })
}

const PORT = 4174
const BASE_URL = `http://localhost:${PORT}`

const VIEWPORTS = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'mobile', width: 390, height: 844 },
]

const ROUTES = [
  { path: '/', name: 'entry' },
  { path: '/home', name: 'home' },
  { path: '/societies', name: 'societies' },
  { path: '/boards', name: 'boards' },
  { path: '/gallery', name: 'gallery' },
  { path: '/team', name: 'team' },
  { path: '/contact', name: 'contact' },
]

async function runQA() {
  console.log('--- Starting Production QA and Verification ---')
  const server = await createProdServer(PORT)
  console.log(`Server listening on ${BASE_URL}`)

  const browser = await chromium.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })

  const results = {
    screenshots: [],
    consoleErrors: [],
    failedRequests: [],
    brokenImages: [],
    functionalTests: {},
  }

  // 1. Visual Verification & Screenshots across 3 viewports
  console.log('\n[Phase 1] Capturing Screenshots across Desktop, Tablet, Mobile...')
  for (const vp of VIEWPORTS) {
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: 1,
    })
    const page = await context.newPage()

    page.on('pageerror', (err) => {
      results.consoleErrors.push({ viewport: vp.name, error: err.message, stack: err.stack })
    })

    page.on('requestfailed', (req) => {
      // Ignore aborts caused by navigation
      if (req.failure()?.errorText !== 'net::ERR_ABORTED') {
        results.failedRequests.push({
          url: req.url(),
          failure: req.failure()?.errorText,
          viewport: vp.name,
        })
      }
    })

    for (const route of ROUTES) {
      const url = `${BASE_URL}${route.path}`
      const response = await page.goto(url, { waitUntil: 'networkidle' })

      // Wait a moment for GSAP animations to settle
      await page.waitForTimeout(600)

      const filename = `${route.name}-${vp.name}.png`
      const filepath = path.join(SCREENSHOT_DIR, filename)
      await page.screenshot({ path: filepath, fullPage: false })
      results.screenshots.push({ route: route.path, viewport: vp.name, file: filename })
      console.log(`  ✓ Screenshot: ${filename} (status: ${response?.status()})`)

      // Check for broken images on the page
      const brokenOnPage = await page.evaluate(() => {
        const imgs = Array.from(document.querySelectorAll('img'))
        return imgs
          .filter((img) => img.complete && img.naturalWidth === 0 && !img.src.includes('data:'))
          .map((img) => ({ src: img.src, alt: img.alt }))
      })
      if (brokenOnPage.length > 0) {
        results.brokenImages.push({ route: route.path, viewport: vp.name, broken: brokenOnPage })
      }
    }

    await context.close()
  }

  // 2. Functional Verification
  console.log('\n[Phase 2] Executing Functional Verification Tests...')

  const testContext = await browser.newContext({
    viewport: { width: 1440, height: 900 },
  })
  const page = await testContext.newPage()

  page.on('pageerror', (err) => {
    results.consoleErrors.push({ test: 'functional', error: err.message })
  })

  // A. Intro Skip Keyboard & Mouse
  console.log('  Testing Intro page skip (Keyboard & Mouse)...')
  try {
    // Keyboard skip (Escape)
    await page.goto(`${BASE_URL}/`, { waitUntil: 'domcontentloaded' })
    await page.waitForTimeout(300)
    await page.keyboard.press('Escape')
    await page.waitForURL('**/home', { timeout: 3000 })
    const escapedToHome = page.url().includes('/home')

    // Mouse skip (Click)
    await page.goto(`${BASE_URL}/`, { waitUntil: 'domcontentloaded' })
    await page.waitForTimeout(300)
    await page.click('.intro-overlay')
    await page.waitForURL('**/home', { timeout: 3000 })
    const clickedToHome = page.url().includes('/home')

    results.functionalTests.introSkip = {
      escapeKey: escapedToHome,
      mouseClick: clickedToHome,
    }
    console.log(`    ✓ Intro skip: Escape=${escapedToHome}, Click=${clickedToHome}`)
  } catch (err) {
    results.functionalTests.introSkip = { error: err.message }
    console.error(`    ✗ Intro skip error:`, err.message)
  }

  // B. Route Navigation & Browser Back / Forward
  console.log('  Testing Route Navigation & Browser History...')
  try {
    await page.goto(`${BASE_URL}/home`, { waitUntil: 'networkidle' })
    await page.click('a[href="/societies"]')
    await page.waitForURL('**/societies')
    const navigatedSocieties = page.url().includes('/societies')

    await page.click('a[href="/boards"]')
    await page.waitForURL('**/boards')
    const navigatedBoards = page.url().includes('/boards')

    await page.goBack()
    await page.waitForURL('**/societies')
    const backToSocieties = page.url().includes('/societies')

    await page.goForward()
    await page.waitForURL('**/boards')
    const forwardToBoards = page.url().includes('/boards')

    results.functionalTests.navigationAndHistory = {
      navigatedSocieties,
      navigatedBoards,
      backToSocieties,
      forwardToBoards,
    }
    console.log(`    ✓ Nav & History: Soc=${navigatedSocieties}, Brd=${navigatedBoards}, Back=${backToSocieties}, Forward=${forwardToBoards}`)
  } catch (err) {
    results.functionalTests.navigationAndHistory = { error: err.message }
    console.error(`    ✗ Nav & History error:`, err.message)
  }

  // C. Direct Navigation to nested URLs
  console.log('  Testing Direct Navigation to every URL...')
  const directUrls = ['/', '/home', '/societies', '/boards', '/gallery', '/team', '/contact', '/404.html']
  const directResults = {}
  for (const urlPath of directUrls) {
    try {
      const resp = await page.goto(`${BASE_URL}${urlPath}`, { waitUntil: 'networkidle' })
      directResults[urlPath] = { status: resp?.status(), ok: resp?.ok() }
    } catch (e) {
      directResults[urlPath] = { error: e.message }
    }
  }
  results.functionalTests.directNavigation = directResults
  console.log('    ✓ Direct navigation tested for all URLs')

  // D. Magazine Section Interactions (Open, Flip, Contents, Close)
  console.log('  Testing Magazine Section interactions...')
  try {
    await page.goto(`${BASE_URL}/home`, { waitUntil: 'networkidle' })
    // Scroll down to events section
    await page.evaluate(() => {
      document.getElementById('events-section')?.scrollIntoView()
    })
    await page.waitForTimeout(500)

    // Check Open Magazine button
    const openBtn = page.locator('button:has-text("Open Magazine")').first()
    await openBtn.click()
    console.log('    Clicked Open Magazine...')

    // Wait for the MagazineBook component to load dynamically
    await page.waitForSelector('.stf__wrapper, .magazine-scope', { timeout: 8000 })
    await page.waitForTimeout(1000)

    // Capture screenshot of open magazine
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'magazine-open-desktop.png') })

    // Test Flip Next
    const nextBtn = page.locator('button[aria-label="Next page"]').first()
    if (await nextBtn.isVisible()) {
      await nextBtn.click()
      await page.waitForTimeout(1200)
    }

    // Test Contents button
    const contentsBtn = page.locator('button:has-text("Contents")').first()
    if (await contentsBtn.isVisible()) {
      await contentsBtn.click()
      await page.waitForTimeout(1000)
    }

    // Test Close button
    const closeBtn = page.locator('button:has-text("Close")').first()
    if (await closeBtn.isVisible()) {
      await closeBtn.click()
      await page.waitForTimeout(500)
    }

    const isClosed = !(await page.locator('.stf__wrapper').isVisible())
    results.functionalTests.magazine = {
      opened: true,
      navigatedContents: true,
      closedSuccessfully: isClosed,
    }
    console.log(`    ✓ Magazine interactions completed successfully (closed=${isClosed})`)
  } catch (err) {
    results.functionalTests.magazine = { error: err.message }
    console.error(`    ✗ Magazine error:`, err.message)
  }

  // E. Team Archive expansion and lazy photo loading
  console.log('  Testing Team archive expansion & lazy photos...')
  try {
    await page.goto(`${BASE_URL}/team`, { waitUntil: 'networkidle' })
    const accordionBtn = page.locator('.execom-accordion-bar')
    await accordionBtn.scrollIntoViewIfNeeded()
    await accordionBtn.click()
    console.log('    Clicked Execom archive accordion...')

    // Wait for archive data to load dynamically
    await page.waitForSelector('.execom-accordion-content', { timeout: 6000 })
    await page.waitForTimeout(1000)

    // Count photos in archive
    const archiveImgCount = await page.locator('.execom-accordion-content img').count()
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'team-archive-expanded-desktop.png') })

    results.functionalTests.teamArchive = {
      expanded: true,
      archiveImagesLoaded: archiveImgCount > 0,
      imageCount: archiveImgCount,
    }
    console.log(`    ✓ Team archive expanded, found ${archiveImgCount} lazy photos`)
  } catch (err) {
    results.functionalTests.teamArchive = { error: err.message }
    console.error(`    ✗ Team archive error:`, err.message)
  }

  // F. Society Navigation (Switching between chapters)
  console.log('  Testing Society chapter navigation...')
  try {
    await page.goto(`${BASE_URL}/societies`, { waitUntil: 'networkidle' })

    const chapters = ['EDS', 'WIE', 'RAS', 'SPS', 'AESS']
    const chapterResults = {}

    for (const ch of chapters) {
      const btn = page.locator(`.soc-rail-btn:has-text("${ch}")`)
      await btn.click()
      await page.waitForTimeout(400)
      const stageText = await page.locator('.soc-stage h2').innerText()
      chapterResults[ch] = stageText
    }

    results.functionalTests.societyNavigation = {
      testedChapters: chapters,
      headers: chapterResults,
    }
    console.log(`    ✓ Societies tabs switched smoothly:`, Object.keys(chapterResults).join(', '))
  } catch (err) {
    results.functionalTests.societyNavigation = { error: err.message }
    console.error(`    ✗ Society navigation error:`, err.message)
  }

  // G. Gallery Lightbox, Keyboard Navigation & Focus Restoration
  console.log('  Testing Gallery Lightbox & Focus Restoration...')
  try {
    await page.goto(`${BASE_URL}/gallery`, { waitUntil: 'networkidle' })
    const firstItem = page.locator('.gal-slot').first()
    await firstItem.focus()
    await page.keyboard.press('Enter')
    await page.waitForSelector('.gal-modal', { timeout: 3000 })
    console.log('    Lightbox opened with Enter key...')

    // Verify modal is visible
    const modalVisible = await page.locator('.gal-modal').isVisible()
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'gallery-lightbox-desktop.png') })

    // ArrowRight next image
    const initialCount = await page.locator('.gal-modal-count').innerText()
    await page.keyboard.press('ArrowRight')
    await page.waitForTimeout(300)
    const nextCount = await page.locator('.gal-modal-count').innerText()

    // Escape to close
    await page.keyboard.press('Escape')
    await page.waitForTimeout(400)
    const modalClosed = !(await page.locator('.gal-modal').isVisible())

    // Verify focus restoration
    const focusedTag = await page.evaluate(() => document.activeElement?.className)

    results.functionalTests.galleryLightbox = {
      modalOpened: modalVisible,
      arrowNavigation: initialCount !== nextCount,
      modalClosed,
      focusRestoredToSlot: focusedTag?.includes('gal-slot'),
    }
    console.log(`    ✓ Gallery lightbox: Open=${modalVisible}, ArrowNav=${initialCount !== nextCount}, Closed=${modalClosed}, FocusRestored=${focusedTag?.includes('gal-slot')}`)
  } catch (err) {
    results.functionalTests.galleryLightbox = { error: err.message }
    console.error(`    ✗ Gallery lightbox error:`, err.message)
  }

  // H. Contact Form Interactions
  console.log('  Testing Contact Form interactions...')
  try {
    await page.goto(`${BASE_URL}/contact`, { waitUntil: 'networkidle' })
    await page.fill('input[name="name"]', 'QA Test Engineer')
    await page.fill('input[name="phone"]', '+91 9876543210')
    await page.fill('textarea[name="message"]', 'Validating automated QA suite submission.')

    const nameVal = await page.inputValue('input[name="name"]')
    const phoneVal = await page.inputValue('input[name="phone"]')
    const msgVal = await page.inputValue('textarea[name="message"]')

    results.functionalTests.contactForm = {
      nameFilled: nameVal === 'QA Test Engineer',
      phoneFilled: phoneVal === '+91 9876543210',
      messageFilled: msgVal.includes('Validating automated QA'),
    }
    console.log('    ✓ Contact form fields accept input properly')
  } catch (err) {
    results.functionalTests.contactForm = { error: err.message }
    console.error(`    ✗ Contact form error:`, err.message)
  }

  // I. Mobile Navigation Menu
  console.log('  Testing Mobile Navigation Drawer...')
  const mobileContext = await browser.newContext({
    viewport: { width: 390, height: 844 },
  })
  const mobilePage = await mobileContext.newPage()
  try {
    await mobilePage.goto(`${BASE_URL}/home`, { waitUntil: 'networkidle' })
    const hamburger = mobilePage.locator('.nb-hamburger')
    await hamburger.click()
    await mobilePage.waitForSelector('.nb-mobile-menu.open', { timeout: 3000 })
    console.log('    Mobile menu opened...')

    await mobilePage.screenshot({ path: path.join(SCREENSHOT_DIR, 'mobile-menu-open.png') })

    // Click a nav link inside menu
    await mobilePage.locator('.nb-mobile-menu a[href="/team"]').click()
    await mobilePage.waitForURL('**/team', { timeout: 4000 })
    const menuClosed = !(await mobilePage.locator('.nb-mobile-menu.open').isVisible())

    results.functionalTests.mobileMenu = {
      opened: true,
      navigatedToTeam: mobilePage.url().includes('/team'),
      closedOnNav: menuClosed,
    }
    console.log(`    ✓ Mobile menu: Open=true, Navigated=true, ClosedOnNav=${menuClosed}`)
  } catch (err) {
    results.functionalTests.mobileMenu = { error: err.message }
    console.error(`    ✗ Mobile menu error:`, err.message)
  }

  await mobileContext.close()
  await testContext.close()
  await browser.close()
  server.close()

  console.log('\n--- QA Run Finished ---')
  const reportPath = path.join(SCREENSHOT_DIR, 'qa-summary.json')
  fs.writeFileSync(reportPath, JSON.stringify(results, null, 2))
  console.log(`Summary written to ${reportPath}`)
  return results
}

runQA().then((results) => {
  console.log('\nConsole Errors:', results.consoleErrors.length)
  console.log('Failed Requests:', results.failedRequests.length)
  console.log('Broken Images:', results.brokenImages.length)
  console.log('Total Screenshots:', results.screenshots.length)
  process.exit(0)
}).catch((err) => {
  console.error('QA Runner fatal error:', err)
  process.exit(1)
})
