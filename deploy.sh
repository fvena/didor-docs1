#!/usr/bin/env sh

# Aborta cuando hay un error
set -e

# build
npm run build

# Copiar archivos
cp -R ./docs ./dist/docs

# Genera el archivo de configuración
node <<EOF
const fs = require('fs');
const path = require('path');
const config = require('./lib/build/default.js');

const appConfig = {
  logo: config.logo,
  title: config.title,
  description: 'Herramienta para documentar tus proyectos',
  navbar: config.navbar,
  sidebar: config.sidebar,
  defaultPath: config.defaultPath,
  buildPath: 'docs',
  gitRepoLink: 'https://github.com/fvena/didor-docs',
  jsLib: config.jsLib,
  cssLib: config.cssLib,
};

const configFilePath = path.join(process.cwd(), './dist/didor.config.js');
const configFile = '<div id=app><\/div>\<script type="text\/javascript"\>window.\$didor = ' + JSON.stringify(appConfig) + '\<\/script\>';

const indexFilePath = path.join(process.cwd(), './dist/index.html');
fs.readFile(indexFilePath, 'utf8', function (err,data) {
  if (err) return console.log(err);

  const result = data.replace(/\<div id=app\>\<\/div\>/g, configFile);

  fs.writeFile(indexFilePath, result, 'utf8', function (err) {
     if (err) return console.log(err);
  });
});
EOF

# Publica el proyecto en github
# cd dist

# git init
# git add -A
# git commit -m 'deploy'

# git push -f https://github.com/fvena/didor-docs.git master:gh-pages
