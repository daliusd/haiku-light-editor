const fs = require('fs')
const pixelmatch = require('pixelmatch')
const PNG = require('pngjs').PNG

const testDir = './e2e/screenshots'
const goldenDir = './e2e/golden'

function compareScreenshots(fileName) {
  let testFileName = `${testDir}/${fileName}.png`
  let goldenFileName = `${goldenDir}/${fileName}.png`
  const img1 = PNG.sync.read(fs.readFileSync(testFileName))
  if (!fs.existsSync(goldenFileName)) {
    fs.copyFileSync(testFileName, goldenFileName)
    return 0
  }
  const img2 = PNG.sync.read(fs.readFileSync(goldenFileName))

  expect(img1.width).toEqual(img2.width)
  expect(img1.height).toEqual(img2.height)

  const diff = new PNG({ width: img1.width, height: img2.height })
  const numDiffPixels = pixelmatch(
    img1.data,
    img2.data,
    diff.data,
    img1.width,
    img1.height,
    { threshold: 0.05 }
  )

  expect(numDiffPixels).toEqual(0)
}

async function takeAndCompareScreenshot(route, filePrefix) {
  let fileName = filePrefix + '/' + (route ? route : 'index')

  await page.goto(`http://127.0.0.1:4000/${route}`)
  await page.screenshot({ path: `${testDir}/${fileName}.png` })

  return compareScreenshots(fileName)
}

describe('👀 screenshots are correct', function () {
  beforeAll(async function () {
    if (!fs.existsSync(testDir)) fs.mkdirSync(testDir)
    if (!fs.existsSync(goldenDir)) fs.mkdirSync(goldenDir)

    if (!fs.existsSync(`${testDir}/wide`)) fs.mkdirSync(`${testDir}/wide`)
    if (!fs.existsSync(`${testDir}/narrow`)) fs.mkdirSync(`${testDir}/narrow`)
    if (!fs.existsSync(`${goldenDir}/wide`)) fs.mkdirSync(`${goldenDir}/wide`)
    if (!fs.existsSync(`${goldenDir}/narrow`))
      fs.mkdirSync(`${goldenDir}/narrow`)
  })

  describe('wide screen', function () {
    beforeEach(async function () {
      return page.setViewport({ width: 800, height: 600 })
    })
    it('/simple', async function () {
      return await takeAndCompareScreenshot('simple', 'wide')
    })
    it('/black', async function () {
      return await takeAndCompareScreenshot('black', 'wide')
    })
    it('/image', async function () {
      return await takeAndCompareScreenshot('image', 'wide')
    })
  })

  describe('narrow screen', function () {
    beforeEach(async function () {
      return page.setViewport({ width: 375, height: 667 })
    })
    it('/simple', async function () {
      return await takeAndCompareScreenshot('simple', 'narrow')
    })
    it('/black', async function () {
      return await takeAndCompareScreenshot('black', 'narrow')
    })
    it('/image', async function () {
      return await takeAndCompareScreenshot('image', 'narrow')
    })
  })
})
