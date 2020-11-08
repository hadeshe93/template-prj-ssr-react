'use strict';

const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');
const { mergeWithCustomize } = require('webpack-merge');
const commonConfig = require('./webpack.common');
const { resolveRoot, resolveSrc } = require('./libs/path-resolve');
const { entry, htmlWebpackPluginOptions } = require('./libs/set-mpa')({
  isServerSide: false,
});

const isProdMode = process.env.NODE_ENV === 'production';
const clientConfig = {
  mode: 'development',
  entry: entry,
  output: {
    path: resolveRoot('dist/client'),
    filename: '[name].[hash:8].js',
  },
  plugins: [
    ...htmlWebpackPluginOptions.map(
      (options) => new HtmlWebpackPlugin(options)
    ),
    new HtmlWebpackExternalsPlugin({
      externals: [
        {
          module: 'react',
          entry: 'https://11.url.cn/now/lib/16.2.0/react.min.js',
          global: 'React',
        },
        {
          module: 'react-dom',
          entry: 'https://11.url.cn/now/lib/16.2.0/react-dom.min.js',
          global: 'ReactDOM',
        },
      ],
    }),
  ],
};
const extraConfig = isProdMode
  ? {
      mode: 'production',
    }
  : {
      devServer: {
        contentBase: './dist/client',
        hot: true,
        // stats: 'errors-only',
      },
      devtool: 'cheap-source-map',
    };
const config = mergeWithCustomize({
  customizeArray(former, latter, key) {
    if (key === 'plugins') {
      return [...(former || []), ...(latter || [])];
    }
    // fallback to default merging
    return undefined;
  },
})(commonConfig, clientConfig, extraConfig);
console.log('config: ', config);
module.exports = config;
