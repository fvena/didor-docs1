# Bloques de Código

Los bloques de código en Markdown están envueltos dentro de 3 comillas tipográficas.

````markdown
```javascript
const http = require('http');
const bodyParser = require('body-parser');

http
  .createServer((req, res) => {
    bodyParser.parse(req, (error, body) => {
      res.end(body);
    });
  })
  .listen(3000);
```
````

## Lenguajes

Para que el código se resalte según su lenguaje, debes indicarlo tras las tres comillas. Los lenguajes definidos son:

- `html` `pug`
- `css` `scss`
- `js` `javascript`
- `vue`
- `markdown`
- `sh`
- `json`

::: codegroup

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Page Title</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" type="text/css" media="screen" href="main.css">
  <script src="main.js"></script>
</head>
<body>
  <h1>Hola Mundo</h1>
</body>
</html>
```

```pug
!DOCTYPE html
html
head
  meta(charset="utf-8")
  meta(http-equiv="X-UA-Compatible" content="IE=edge")
  title Page Title
  meta(name="viewport" content="width=device-width, initial-scale=1")
  link(rel="stylesheet" type="text/css" media="screen" href="main.css")
  script(src="main.js")

body
  h1 Hola Mundo
```

```css
:root {
  --color-blue: #3bbfce;
  --margin: 16px;
}

.content-navigation {
  border-color: var(--color-blue);
  color: var(--color-blue);

  .nested {
    padding: var(--margin) / 2;
    margin: var(--margin) / 2;
  }
}
```

```scss
@import "compass/css3";

$blue: #3bbfce;
$margin: 16px;

.content-navigation {
  border-color: $blue;
  color: darken($blue, 9%);

  .nested {
    padding: $margin / 2;
    margin: $margin / 2;
  }
}
```

```javascript
const http = require('http');
const bodyParser = require('body-parser');

http
  .createServer((req, res) => {
    bodyParser.parse(req, (error, body) => { bodyParser.parse(req, (error, body) => {bodyParser.parse(req, (error, body) => {
      res.end(body);
    });
  })
  .listen(3000);
```

```vue
<template>
  <az-button type="danger">Danger {{ random }}</az-button>
</template>

<script>
  module.exports = {
    computed: {
      random() {
        return Math.random()
      }
    }
  }
</script>
```

```markdown
# Título 1

## Título 2

Hola Mundo

[didor](http://www.didor.io)
```

```sh
#!/bin/bash

# clone the repository
git clone http://github.com/garden/tree

# generate HTTPS credentials
cd tree
openssl genrsa -aes256 -out https.key 1024
openssl req -new -nodes -key https.key -out https.csr
openssl x509 -req -days 365 -in https.csr -signkey https.key -out https.crt
cp https.key{,.orig}
openssl rsa -in https.key.orig -out https.key
```

```json
{
  "port": 3001,
  "open": true,
  "folders": ["/docs"],
  "navbar": "_navbar.md",
  "sidebar": "_sidebar.md",
  "defaultPath": "/home.md",
  "didorDocs": false,
  "didorFramework": false,
  "logo": "",
  "title": "Didor Docs",
  "description": "",
  "social": {
    "twitter": "",
    "facebook": "",
    "linkedin": "",
    "instagram": "",
    "slack": "",
    "github": "",
    "gitlab": "",
  },
  "style2": [],
  "scripts": [],
  "demo": {
    "jsLib": [],
    "cssLib": [],
    "components": "",
    "styles": "",
    "shareStyles": "",
  }
}
```

:::

## Resaltar el código

Podemos resaltar una o varias líneas de código mediante llaves, después del lenguaje. Es un parámetro optativo. Algunas combinaciones para resaltar el código

- `{5}` - Resalta la línea 5
- `{5,7}` - Resalta las líneas 5 y 7
- `{5-7}` - Resalta todas las líneas de la 7 a la 7
- `{2,5-7}` - Resalta la línea 2 y todas las líneas de la 5 a la 7

````markdown
```js{2,5-7}
const http = require('http');
const bodyParser = require('body-parser');

http
  .createServer((req, res) => {
    bodyParser.parse(req, (error, body) => {
      res.end(body);
    });
  })
  .listen(3000);
```
````

```js{2,5-7}
const http = require('http');
const bodyParser = require('body-parser');

http
  .createServer((req, res) => {
    bodyParser.parse(req, (error, body) => { bodyParser.parse(req, (error, body) => {bodyParser.parse(req, (error, body) => {
      res.end(body);
    });
  })
  .listen(3000);
```

## Nombre del archivo

También podemos añadir el nombre del fichero entre corchetes. Es un parámetro optativo, y se puede utilizar junto con el de resaltar la linea, pero el orden siempre debe ser `lenguaje` + `{lineas}` + `[fichero]`.

- `[filename.js]` - Muestra una barra superior con el nombre del archivo

````markdown
```js[server.js]
const http = require('http');
const bodyParser = require('body-parser');

http
  .createServer((req, res) => {
    bodyParser.parse(req, (error, body) => {
      res.end(body);
    });
  })
  .listen(3000);
```
````

```js[server.js]
const http = require('http');
const bodyParser = require('body-parser');

http
  .createServer((req, res) => {
    bodyParser.parse(req, (error, body) => { bodyParser.parse(req, (error, body) => {bodyParser.parse(req, (error, body) => {
      res.end(body);
    });
  })
  .listen(3000);
```

## Grupos de código

En ocasiones puede ser útil agrupar mediante pestañas varios archivos o códigos, para ello rodearemos las pestañas con la etiqueta `codegroup`

````markdown
::: codegroup

```html
<h1>Hola Mundo</h1>
```

```js
console.log('Hola Mundo');
```

```css
h1 {
  color: red;
}
```

:::
````

::: codegroup

```html
<h1>Hola Mundo</h1>
```

```js
console.log('Hola Mundo');
```

```css
h1 {
  color: red;
}
```

:::

También pueden crearse pestañas con nombres de ficheros o resaltar código.

````markdown
::: codegroup

```html[index.html]
<h1>Hola Mundo</h1>
```

```js[script.js]
console.log('Hola Mundo');
```

```css{2}[style.css]
h1 {
  color: red;
}
```

:::
````

::: codegroup

```html[index.html]
<h1>Hola Mundo</h1>
```

```js[script.js]
console.log('Hola Mundo');
```

```css{2}[style.css]
h1 {
  color: red;
}
```

:::
