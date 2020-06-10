#!/usr/bin/env sh

# Aborta cuando hay un error
set -e

# build
npm run build

# Copia la documentación
cp -R ./docs ./dist/docs

# Actualiza el archivo de configuración
node <<EOF
const fs = require('fs');
const path = require('path');
const configFilePath = path.join(process.cwd(), './dist/didor.config.js');

fs.readFile(configFilePath, 'utf8', function (err,data) {
  if (err) return console.log(err);

  const result = data.replace(/buildPath\: \'\'/g, "buildPath: '/docs'");

  fs.writeFile(configFilePath, result, 'utf8', function (err) {
     if (err) return console.log(err);
  });
});
EOF
