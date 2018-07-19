// Css require hook
require('css-modules-require-hook')({
  extensions: ['.scss'],
  preprocessCss: (data, filename) => {
    return require('node-sass').renderSync({
      data,
      file: filename
    }).css
  },
  camelCase: true,
  generateScopedName: '[name]__[local]__[hash:base64:8]'
})

// Image require hook
require('asset-require-hook')({
  name: '/[hash].[ext]',
  extensions: ['jpg', 'png', 'gif', 'webp'],
  limit: 8000
})