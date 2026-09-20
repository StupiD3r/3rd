import { spawn } from 'node:child_process'
import { chromium } from 'playwright-core'

const PORT = Math.floor(4170 + Math.random() * 8)
const ROOT = 'C:\\Users\\NiFer\\Documents\\CodeBase\\Perso\\3rd'
const vite = spawn(process.execPath, ['node_modules/vite/bin/vite.js', 'preview', '--port', String(PORT), '--strictPort'], {
  cwd: ROOT,
  stdio: 'pipe',
})
const wait = (ms) => new Promise((r) => setTimeout(r, ms))

try {
  for (let i = 0; i < 60; i++) {
    try { if ((await fetch(`http://localhost:${PORT}`)).ok) break } catch {}
    await wait(300)
  }
  const browser = await chromium.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--disable-gpu', '--mute-audio', '--no-sandbox'],
  })
  const page = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true })
  const errors = []
  page.on('pageerror', (e) => errors.push(e.message.slice(0, 160)))
  page.on('console', (m) => { if (m.type() === 'error') errors.push('console: ' + m.text().slice(0, 160)) })

  const rel = (sel) => page.evaluate((sel) => {
    const el = document.querySelector(sel)
    if (!el) return null
    const r = el.getBoundingClientRect()
    const cx = window.innerWidth / 2
    return { cxd: Math.round(r.x + r.width / 2 - cx), w: Math.round(r.width), h: Math.round(r.height) }
  }, sel)

  await page.goto(`http://localhost:${PORT}`, { waitUntil: 'domcontentloaded' })
  await page.locator('text=click to open').first().waitFor({ state: 'visible', timeout: 15000 })
  await wait(500)
  console.log('MOBILE CLOSED coverCenter:', JSON.stringify(await rel('.cover')))

  await page.locator('.cover').first().click({ force: true })
  await page.waitForTimeout(2800)
  console.log('MOBILE LETTER leftCenter:', JSON.stringify(await rel('.page--left')))

  await page.locator('text=turn the page').first().click({ force: true })
  await page.waitForTimeout(2800)
  console.log('MOBILE MEMORIES rightCenter:', JSON.stringify(await rel('.page--right')))
  const scrolls = await page.evaluate(() => {
    const right = document.querySelector('.page--right')
    const inner = right?.children[1]
    return inner ? { scrollH: inner.scrollHeight, clientH: inner.clientHeight, ov: getComputedStyle(inner).overflowY } : null
  })
  console.log('right page scroll:', JSON.stringify(scrolls))

  await page.locator('text=close the book').first().click({ force: true })
  await page.locator('text=/HAPPY 3RD MONTHSARY/').first().waitFor({ state: 'visible', timeout: 8000 })
  console.log('MOBILE ending OK')

  if (errors.length) { console.log('MOBILE ERRORS:', errors) } else { console.log('MOBILE no errors ✅') }
  await browser.close()
} catch (e) {
  console.log('ERR', e.message)
} finally {
  vite.kill()
}