module.exports = {
  componentPaths: ['src/components/'],
  hostname: 'localhost',
  port: 8989,
  hot: true,
  ignore: [
    /all-view-nav/,
  ],
  webpackConfigPath: './build/webpack.dev.conf.js',
};
