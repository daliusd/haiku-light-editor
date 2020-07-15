module.exports = {
  preset: 'jest-puppeteer',
  transform: {
    '\\.js$': 'react-scripts/config/jest/babelTransform'
  },
  testMatch: ['<rootDir>/e2e/*.test.js'],
  testTimeout: 30000,
  verbose: true
}
