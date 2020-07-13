module.exports = {
  preset: 'jest-puppeteer',
  transform: {
    '\\.js$': 'react-scripts/config/jest/babelTransform'
  },
  testMatch: ['<rootDir>/e2e/*.test.js'],
  verbose: true
}
