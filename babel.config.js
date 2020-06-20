module.exports = (api) => {
  api.cache(true);
  return {
    presets: [
      '@babel/preset-react',
    ],
    plugins: [
      '@babel/plugin-proposal-class-properties',
    ],
  };
};
