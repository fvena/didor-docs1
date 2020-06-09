# Inicio Rápido

**Didor docs** es un generador de documentación basado en documentos markdown. No solo permite renderizar tus archivos markdown y navegar entre ellos, también incluye muchos componentes y opciones que permitirán llevar tu documentación a otro nivel.

## Instalación

Aunque **Didor docs** se puede instalar de forma global, siempre recomiendo instalarlo dentro del propio proyecto como una dependecia local:

::: codegroup

```shell[yarn]
yarn add -D @didor/docs
```

```shell[npm]
npm install -D @didor/docs
```

:::

```shell
# Crea un directorio docs
$ mkdir docs

# Crea un archivo markdown
$ echo '# Hola Mundo' > docs/README.md
```

Luego, añade los script en el archivo `package.json`.

```json[package.json]
{
  "scripts": {
    "docs": "didor docs serve",
    "docs:build": "didor docs build"
  }
}
```

Para iniciar la documentación, solo tienes que escribir:

::: codegroup

```sh[yarn]
yarn docs
```

```sh[npm]
npm run docs
```

:::

Para generar una versión que puedas publicar, ejecuta:

::: codegroup

```shell[yarn]
yarn docs:build
```

```shell[npm]
npm run docs:build
```

:::
