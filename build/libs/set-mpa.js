const glob = require('glob');
const { resolveSrcPages } = require('./path-resolve');

module.exports = function setMpa({ isServerSide }) {
  const destFileName = isServerSide ? 'index' : 'index-client';
  const entry = {};
  const htmlWebpackPluginOptions = [];
  const entryFiles = glob.sync(resolveSrcPages(`./*/${destFileName}.js`));

  entryFiles.forEach((entryFile) => {
    const match = entryFile.match(new RegExp(`src\\/pages\\/(.*)\\/${destFileName}\\.js`));
    const pageName = match && match[1];
    if (pageName) {
      entry[pageName] = entryFile;
      if (isServerSide) {
        // 如果是构建 ssr 模式，则还需要加上客户端渲染的入口文件
        entry[`${pageName}-client`] = entryFile.replace(`${destFileName}.js`, `${destFileName}-client.js`);
      }
      htmlWebpackPluginOptions.push(
        {
          inlineSource: '.css$',
          template: resolveSrcPages(`./${pageName}/index.html`),
          filename: `${pageName}.html`,
          chunks: [ `${pageName}-client` ],
          inject: true,
          minify: {
            html5: true,
            collapseWhitespace: true,
            preserveLineBreaks: false,
            minifyCSS: true,
            minifyJS: true,
            removeComments: false,
          },
        }
      );
    }
  });

  return {
    entry,
    htmlWebpackPluginOptions,
  };
};