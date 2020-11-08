if (typeof window === 'undefined') {
  global.window = {};
}

const fs = require('fs');
const path = require('path');
const express = require('express');
const { renderToString } = require('react-dom/server');
const server = (port) => {
  const app = express();

  app.use(express.static('dist/ssr'));
  app.get('/index', (req, res) => {
    const ssrFilePath = path.resolve(__dirname, `../dist/ssr/${req.path}.js`);
    delete require.cache[ssrFilePath];
    const SSR = require(ssrFilePath);
    const tplPath = path.resolve(__dirname, `../dist/ssr/${req.path}.html`);
    const html = renderMarkup(tplPath, renderToString(SSR));
    res.status(200).send(html);
  });

  app.listen(port, () => {
    console.log('Server is running on port:' + port);
  });
};

server(process.env.PORT || 3000);

const renderMarkup = (tplPath, str) => {
  const data = '';
  const dataStr = JSON.stringify(data);
  const template = fs.readFileSync(tplPath, 'utf-8');
  return template
    .replace('<!--HTML_PLACEHOLDER-->', str)
    .replace(
      '<!--INITIAL_DATA_PLACEHOLDER-->',
      `<script>window.__initial_data=${dataStr}</script>`
    );
};
