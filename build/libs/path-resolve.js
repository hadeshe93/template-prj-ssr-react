const path = require('path');
const resolve = path.resolve.bind(path);
const ROOT = resolve(__dirname, '../../');

function resolveRoot(path) {
  return resolve(ROOT, path);
}

function resolveSrc(path) {
  return resolve(ROOT, 'src', path);
}

function resolveSrcPages(path) {
  return resolve(ROOT, 'src/pages', path);
}

module.exports = {
  resolveRoot,
  resolveSrc,
  resolveSrcPages
};