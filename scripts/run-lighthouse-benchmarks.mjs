import { execSync, spawn } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const ARTIFACTS_DIR = path.join(ROOT, 'screenshots')

const CHROME_PATH =
  process.env.CHROME_PATH ||
  '/home/rajath-r-prasad/.cache/ms-playwright/chromium-1255/chrome-linux64/chrome'

const ROUTES_TO_BENCHMARK = [
  { name: 'Homepage', path: '/home' },
  { name: 'Team', path: '/team' },
  { name: 'Societies', path: '/societies' },
  { name: 'Gallery', path: '/gallery' },
]

async function main() {
  console.log('--- Starting Lighthouse Benchmarks ---')

  // Spawn production server
  const server = spawn('node', [path.join(ROOT, 'scripts/prod-server.mjs')], {
    stdio: 'ignore',
    detached: false,
  })

  // Wait 1.5s for server ready
  await new Promise((r) => setTimeout(r, 1500))

  const benchmarkResults = []

  for (const item of ROUTES_TO_BENCHMARK) {
    const url = `http://127.0.0.1:4174${item.path}`
    const outJsonPath = path.join(ARTIFACTS_DIR, `lh-${item.name.toLowerCase()}.json`)

    console.log(`\nBenchmarking ${item.name} (${item.path})...`)

    const cmd = `CHROME_PATH="${CHROME_PATH}" npx lighthouse "${url}" \
      --preset=desktop \
      --throttling-method=provided \
      --chrome-flags="--headless=new --no-sandbox" \
      --output=json \
      --output-path="${outJsonPath}" \
      --only-categories=performance,accessibility,best-practices,seo`

    try {
      execSync(cmd, { stdio: 'pipe' })
      const data = JSON.parse(fs.readFileSync(outJsonPath, 'utf8'))

      const perfScore = Math.round((data.categories.performance?.score || 0) * 100)
      const a11yScore = Math.round((data.categories.accessibility?.score || 0) * 100)
      const bpScore = Math.round((data.categories['best-practices']?.score || 0) * 100)
      const seoScore = Math.round((data.categories.seo?.score || 0) * 100)

      const fcp = data.audits['first-contentful-paint']?.displayValue || 'N/A'
      const lcp = data.audits['largest-contentful-paint']?.displayValue || 'N/A'
      const tbt = data.audits['total-blocking-time']?.displayValue || 'N/A'
      const cls = data.audits['cumulative-layout-shift']?.displayValue || 'N/A'
      const si = data.audits['speed-index']?.displayValue || 'N/A'

      // Network Resource Summary
      const networkItems = data.audits['network-requests']?.details?.items || []
      let totalTransferred = 0
      let jsTransferred = 0
      const imageRequests = []

      for (const req of networkItems) {
        const transferSize = req.transferSize || 0
        totalTransferred += transferSize
        if (req.resourceType === 'Script') {
          jsTransferred += transferSize
        } else if (req.resourceType === 'Image') {
          imageRequests.push({
            url: req.url.split('/').pop(),
            sizeKb: Math.round(transferSize / 1024),
          })
        }
      }

      imageRequests.sort((a, b) => b.sizeKb - a.sizeKb)
      const topImages = imageRequests.slice(0, 3)

      benchmarkResults.push({
        route: item.name,
        path: item.path,
        performance: perfScore,
        accessibility: a11yScore,
        bestPractices: bpScore,
        seo: seoScore,
        fcp,
        lcp,
        tbt,
        cls,
        speedIndex: si,
        totalTransferredKb: Math.round(totalTransferred / 1024),
        jsTransferredKb: Math.round(jsTransferred / 1024),
        largestImages: topImages,
      })

      console.log(`  ✓ ${item.name} completed: Perf=${perfScore}, A11y=${a11yScore}, BP=${bpScore}, SEO=${seoScore}`)
      console.log(`    FCP: ${fcp}, LCP: ${lcp}, TBT: ${tbt}, CLS: ${cls}, SI: ${si}`)
    } catch (err) {
      console.error(`  ✗ Failed to benchmark ${item.name}:`, err.message)
    }
  }

  server.kill()

  const summaryFile = path.join(ARTIFACTS_DIR, 'lighthouse-benchmarks.json')
  fs.writeFileSync(summaryFile, JSON.stringify(benchmarkResults, null, 2))
  console.log(`\nAll benchmarks saved to ${summaryFile}`)
  console.table(
    benchmarkResults.map((r) => ({
      Route: r.route,
      'Perf (%)': r.performance,
      'A11y (%)': r.accessibility,
      'BP (%)': r.bestPractices,
      'SEO (%)': r.seo,
      FCP: r.fcp,
      LCP: r.lcp,
      TBT: r.tbt,
      CLS: r.cls,
      'Total KB': r.totalTransferredKb,
      'JS KB': r.jsTransferredKb,
    }))
  )
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
