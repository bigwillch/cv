module.exports = {
  setupFiles: [
    './config/jest.setup.js'
  ],
  snapshotSerializers: [
    'enzyme-to-json/serializer'
  ],
  transform: {
    "^.+\\.js?$": "babel-jest"
  }
};
