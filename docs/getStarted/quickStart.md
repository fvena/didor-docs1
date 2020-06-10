# Inicio Rápido

## Instalación

Aunque **Didor docs** se puede instalar de forma global, es recomendable instalarla como dependencia local dentro del proyecto:

::: codegroup

```shell[yarn]
yarn add -D @didor/docs
```

```shell[npm]
npm install -D @didor/docs
```

:::

## Añadir scripts

Luego, añade los script en el archivo **/package.json** para poder ver la documentación y publicarla.

```json[package.json]
{
  "scripts": {
    "docs:serve": "didor serve",
    "docs:build": "didor build",
  }
}
```

## Escribir contenido

Por defecto la documentación debe estar en el directorio **/docs** y toma el archivo **home.md** como página de inicio.

```shell
# Crea un directorio docs
mkdir docs

# Crea un archivo markdown
echo '# Hola Mundo' > docs/home.md
```

## Visualizar la documentación

Muestra la documentación en un servidor local con recarga automática cuando realizamos cambios (hot-reloading). Por defecto el servido se levanta en [http://localhost:8080](http://localhost:8080).

::: codegroup

```sh[yarn]
yarn docs:serve
```

```sh[npm]
npm run docs:serve
```

:::

## Publicar la documentación

Generar una versión para publicar en el directorio por defecto **/public**:

::: codegroup

```shell[yarn]
yarn docs:build
```

```shell[npm]
npm run docs:build
```

:::
