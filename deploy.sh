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
  social: {
    twitter: 'https://github.com/fvena/didor-docs',
    github: 'https://github.com/fvena/didor-docs',
  },
  jsLib: config.jsLib,
  cssLib: config.cssLib,
};

const configFilePath = path.join(process.cwd(), './dist/didor.config.js');
const configFile = 'window.\$didor = ' + JSON.stringify(appConfig);
fs.writeFileSync(configFilePath, configFile);
EOF

# Publica el proyecto en github
# cd dist

# git init
# git add -A
# git commit -m 'deploy'

# git push -f https://github.com/fvena/didor-docs.git master:gh-pages
