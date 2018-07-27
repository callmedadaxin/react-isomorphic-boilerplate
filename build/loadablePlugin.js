const url = require('url')
const fs = require('fs')
const path = require('path')

function buildManifest(compiler, compilation, loadPath) {
  let context = compiler.options.context;
  let manifest = {};

  compilation.chunks.forEach(chunk => {
    chunk.files.forEach(file => {
      chunk.forEachModule(module => {
        let id = module.id;
        let name = typeof module.libIdent === 'function' ? module.libIdent({ context }) : null;
        let publicPath = url.resolve(compilation.outputOptions.publicPath || '', file);
        
        let currentModule = module;
        if (module.constructor.name === 'ConcatenatedModule') {
          currentModule = module.rootModule;
        }
        const cname = currentModule.userRequest
          ? path.relative(loadPath, currentModule.userRequest)
          : currentModule.userRequest
        if (!manifest[cname]) {
          manifest[cname] = [];
        }

        manifest[cname].push({ id, name, file, publicPath });
      });
    });
  });

  return manifest;
}

module.exports = class ReactLoadablePlugin {
  constructor(opts = {}) {
    this.filename = opts.filename;
    this.loadPath = opts.loadPath
  }

  apply(compiler) {
    compiler.plugin('emit', (compilation, callback) => {
      const manifest = buildManifest(compiler, compilation, this.loadPath);
      var json = JSON.stringify(manifest, null, 2);
      const outputDirectory = path.dirname(this.filename);
      try {
        fs.mkdirSync(outputDirectory);
      } catch (err) {
        if (err.code !== 'EEXIST') {
          throw err;
        }
      }
      fs.writeFileSync(this.filename, json);
      callback();
    });
  }
}