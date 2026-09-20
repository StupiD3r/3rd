import { spawn } from 'node:child_process'
import { mkdir } from 'node:fs/promises'
import { chromium } from 'playwright-core'

const PORT = 4199
const ROOT = new URL('../', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1')
const SHOTS = ROOT + '.test-shots'

const vite = spawn(process.execPath, ['node_modules/vite/bin/vite.js', 'preview', '--port', String(PORT), '--strictPort'], {
  cwd: ROOT,
  stdio: 'pipe',
})

const wait = (ms) => new Promise((r) => setTimeout(r, ms))

async function waitForServer() {
  for (let i = 0; i < 60; i++) {
    try {
      const res = await fetch(`http://localhost:${PORT}`)
      if (res.ok) return
    } catch {}
    await wait(400)
  }
  throw new Error('preview server did not start')
}

function fail(msg) {
  console.log('❌ ' + msg)
  vite.kill()
  process.exit(1)
}

let browser
try {
  await mkdir(SHOTS, { recursive: true })
  await waitForServer()
  console.log('✓ preview server up')

  browser = await chromium.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--disable-gpu', '--mute-audio', '--no-sandbox'],
  })

  const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 })
  const errors = []
  page.on('pageerror', (e) => errors.push('pageerror: ' + e.message))
  page.on('console', (m) => {
    if (m.type() === 'error') errors.push('console: ' + m.text())
  })

  await page.goto(`http://localhost:${PORT}#smoke`, { waitUntil: 'networkidle' })
  await page.waitForTimeout(500)

  // ---- INTRO ----
  await page.locator('text=For my favorite person').first().waitFor({ state: 'visible', timeout: 6000 })
  console.log('✓ intro shown')
  await page.waitForTimeout(2600)
  await page.screenshot({ path: `${SHOTS}/01-intro.png` })

  // let intro finish (skippable by click) -> click to speed up
  await page.mouse.click(720, 300)
  await page.waitForTimeout(400)

  // ---- CLOSED BOOKLET ----
  await page.locator('text=click to open').first().waitFor({ state: 'visible', timeout: 5000 })
  const coverText = await page.locator('text=/For Aly/').first().isVisible().catch(() => false)
  if (!coverText) fail('cover title not visible')
  console.log('✓ closed booklet shown')
  await page.waitForTimeout(600)
  await page.screenshot({ path: `${SHOTS}/02-book-closed.png` })

  // click the cover
  const cover = page.locator('.cover').first()
  await cover.click({ force: true })
  await page.waitForTimeout(1800)

  // ---- LOVE LETTER ----
  await page.locator('text=/A Letter For You/').first().waitFor({ state: 'visible', timeout: 4000 })
  console.log('✓ book opened, left page in focus')
  await page.waitForTimeout(250)
  await page.screenshot({ path: `${SHOTS}/03-letter-typing.png` })

  // wait for typing to finish + turn-page button
  await page.locator('text=turn the page').first().waitFor({ state: 'visible', timeout: 12000 })
  console.log('✓ letter typed out, turn-page button shown')
  await page.screenshot({ path: `${SHOTS}/04-letter-done.png` })

  // click turn the page -> RIGHT PAGE
  await page.locator('text=turn the page').first().click()
  await page.locator('text=Our Little Moments').first().waitFor({ state: 'visible', timeout: 4000 })
  await page.waitForTimeout(1200)
  console.log('✓ right page in focus (memories)')
  await page.screenshot({ path: `${SHOTS}/05-right-memories.png` })

  await page.locator('text=My Wishes For Us').first().waitFor({ state: 'visible', timeout: 3000 })
  await page.waitForTimeout(800)
  await page.screenshot({ path: `${SHOTS}/06-right-wishes.png` })

  // ---- close the book ----
  await page.locator('text=close the book').first().click()
  await page.locator('text=/HAPPY 3RD MONTHSARY/').first().waitFor({ state: 'visible', timeout: 8000 })
  await page.waitForTimeout(1200)
  console.log('✓ ending screen shown')
  await page.screenshot({ path: `${SHOTS}/07-ending.png` })

  if (errors.length) {
    console.log('\nErrors observed:')
    errors.forEach((e) => console.log('  ' + e))
    fail('runtime errors present')
  }

  console.log('✓ no runtime errors')
  console.log('\nAll good ✅')
} catch (e) {
  fail('exception: ' + (e && e.message))
} finally {
  await browser?.close().catch(() => {})
  vite.kill()
}