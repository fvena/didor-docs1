# Bloques de Código

Los bloques de código en Markdown están envueltos dentro de 3 comillas tipográficas.

## Lenguajes

Para que el código se resalte según su lenguaje, debes indicarlo tras las tres comillas. Los lenguajes definidos son:

- `js` `javascript`
- `bash` `sh` `shell`
- `json`
- `pug`
- `scss`
- `markdown`
- `markup` `html`

````markdown
```js
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

```js
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

- `[filename.js]` - Muestra una barra superios con el nombre del archivo

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

En ocasiones puede ser útil agrupar mediante pestañas varios archivos, para ello rodearemos las pestañas con la etiqueta `codegroup`. Es importante indicar siempre el nombre del fichero, sino, no aparecerá como pestaña.

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
