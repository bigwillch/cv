module.exports = (api) => {
  api.cache(true)
  return {
    'presets': [
      '@babel/preset-react',
      'airbnb',
    ],
    'plugins': [
      '@babel/plugin-proposal-class-properties',
    ]
  }
};
