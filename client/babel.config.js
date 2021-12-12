const NODE_ENV = process.env.NODE_ENV;
const isProduction = NODE_ENV === 'production';
module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        corejs: '3',
        useBuiltIns: 'usage',
        targets: '> 2%',
      },
    ],
    [
      '@babel/preset-react',
      {
        development: !isProduction,
      },
    ],
  ],
};
