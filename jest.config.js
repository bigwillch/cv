module.exports = {
  setupFiles: [
    './config/jest.setup.js',
    'jest-useragent-mock'
  ],
  moduleNameMapper: {
  '^Components(.*)$': '<rootDir>/src/components$1',
  '^Contexts(.*)$': '<rootDir>/src/contexts$1',
  },
  globals: {
    ENV: {}
  }
};
