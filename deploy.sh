#!/usr/bin/env sh

# Aborta cuando hay un error
set -e

# pwa-asset-generator ./public/img/appIcon.svg ./public/img --index ./public/index.html --favicon --icon-only --type png --opaque false --padding 0
# pwa-asset-generator ./public/img/appIcon.svg ./public/img --index ./public/index.html --icon-only --manifest ./public/manifest.json --type png --background "linear-gradient(135deg, #F2F2F2 0%, #E6E6E6 100%)" --padding "25%"
# pwa-asset-generator ./public/img/didorLogo.svg ./public/img --index ./public/index.html --splash-only --type png --background "linear-gradient(135deg, #F2F2F2 0%, #E6E6E6 100%)" --padding "calc(50vh - 20%) calc(50vw - 30%)"

# build
npm run build

# Copia la documentación
cp -R ./docs ./dist/docs
mv ./dist/docs/assets ./dist/assets

# Actualiza el archivo de configuración
node <<EOF
const fs = require('fs');
const path = require('path');
const configFilePath = path.join(process.cwd(), './dist/didor.config.js');

fs.readFile(configFilePath, 'utf8', function (err,data) {
  if (err) return console.log(err);

  const result = data.replace(/path\: \'\'/g, "path: '/docs'");

  fs.writeFile(configFilePath, result, 'utf8', function (err) {
     if (err) return console.log(err);
  });
});
EOF
