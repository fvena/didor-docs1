# Configuración

**Didor Docs** no necesita ninguna configuración para visualizar y publicar la documentación. Pero tiene disponibles algunas opciones para poder personalizarlo.

## Archivo de configuración

Para configurar **Didor Docs** debes crear el archivo **\didor.config.js** en el directorio raíz de tu aplicación:

::: tree

- miProyecto [open]
  - docs
    - home.md
  - package.json
  - didor.config.js [select]

:::

También puedes modificar su nombre y ubicación al ejecutar los scripts:

```json[package.json]
{
  "scripts": {
    "docs:serve": "didor serve /docs/config.js",
    "docs:build": "didor build /docs/config.js",
  }
}
```

El archivo de configuración debe exportar un objeto javascript:

```js[didor.config.js]

module.exports = {
  logo: '/didorLogo.svg',
  title: 'Didor Docs',
  description: 'Herramienta para documentar tus proyectos',
  }

```

## Servidor

### port

Permite configurar el puerto en el que se abrirá el servidor de desarrollo.

- Tipo: `Integer`
- Defecto: `3001`

```js[didor.config.js]

module.exports = {
    port: 3001,
  }

```

### open

Indica si al levantar el servidor de desarrollo debe abrirse una ventana en el navegador y mostrarse automaticamente.

- Tipo: `Boolean`
- Defecto: `true`

```js[didor.config.js]

module.exports = {
    open: true,
  }

```

## Contenidos

### folders

Especifica los directorios que contendrán la documentación. La ruta se especifica desde el directorio raíz del proyecto.

**Tienes que tener en cuenta, que todos los directorios indicados, serán tomados como la raíz del proyecto a la hora de enlazar documentos, imágenes, ...** Esto también implica que a la hora de publicar tu documentación, todos los archivos de estos directorios serán copiados y unificados en un solo directorio, aunque se mantendrá la estructura interna de carpetas y archivos de cada directorio indicado.

- Tipo: `Array`
- Defecto: `['/docs']`

::: tree

- miProyecto [open]
  - docs
    - home.md
  - src [open]
    - components [open]
      - componentA [close]
        - componentA.vue
        - componentA.md
      - componentB [close]
        - componentB.vue
        - componentB.md
      - componentC [close]
        - componentC.vue
        - componentC.md
  - package.json
  - didor.config.js

:::

```js[didor.config.js]

module.exports = {
    folders: ['/docs'],
  }

```

```js[didor.config.js]

module.exports = {
    folders: ['/docs', '/src/components'],
  }

```

### navbar

Permite modificar el nombre del archivo utilizado para generar la barra de navegación entre secciones.

- Tipo: `String`
- Defecto: `_navbar.md`

```js[didor.config.js]

module.exports = {
    navbar: 'myNavbar.md',
  }

```

### sidebar

Permite modificar el nombre del archivo utilizado para generar la barra de navegación dentro de una sección.

- Tipo: `String`
- Defecto: `_sidebar.md`

```js[didor.config.js]

module.exports = {
    sidebar: 'mySidebar.md',
  }

```

### defaultPath

Permite modificar la ruta del archivo utilizado para generar la página de inicio.

- Tipo: `String`
- Defecto: `/home.md`

```js[didor.config.js]

module.exports = {
    defaultPath: '/inicio.md',
  }

```

### didorDocs

Permite añadir la sección **markdown** de didorDocs en tu propia documentación para facilitar su uso.

- Tipo: `Boolean`
- Defecto: `false`

```js[didor.config.js]

module.exports = {
    didorDocs: false,
  }

```

Si lo configuras a `true` solo tendrás que añadir en el **/_navbar.md** el link a **/didorDocs**.

```markdown[/docs/_navbar.md]

- [Markdown](/didorDocs)
```

### didorFramework

Permite añadir la sección **estilos** de didor-Framework en tu propia documentación para facilitar su uso si quieres utilizarlo en tu proyecto.

- Tipo: `Boolean`
- Defecto: `false`

```js[didor.config.js]

module.exports = {
  didorFramework: false,
}

```

Si lo configuras a `true` solo tendrás que añadir en el **/_navbar.md** el link a **/didorDocs**.

```markdown[/docs/_navbar.md]

- [Estilos](/didorFramework)
```

## Personalización

### logo

Indica la localización del logotipo. Sino se especifica ninguno, se muestra el título en su lugar.

- Tipo: `String`
- Defecto: `undefined`

```js[didor.config.js]

module.exports = {
  logo: 'docs/assets/didorLogo.svg',
}

```

### title

Permite modificar el título por defecto de la página.

- Tipo: `String`
- Defecto: `Didor Docs`

```js[didor.config.js]

module.exports = {
  title: 'Didor Docs',
}

```

### description

Permite modificar la descripción por defecto de la página.

- Tipo: `String`
- Defecto: `undefined`

```js[didor.config.js]

module.exports = {
  description: 'Herramienta para documentar proyectos',
}

```

### social

Permite añadir links con sus respectivos iconos en la barra de navegación. Actualmente se han habilitado las siguientes redes sociales: twitter, facebook, linkedin, instagram, slack, github, gitlab.

- Tipo: `String`
- Defecto: `undefined`

```js[didor.config.js]

module.exports = {
  social: {
    twitter: 'https://twitter.com/fvena',
    facebook: '',
    linkedin: '',
    instagram: '',
    slack: '',
    github: 'https://github.com/fvena/didor-docs',
    gitlab: '',
  },
}

```

### style

Permite añadir un archivo o varios css, para modificar el diseño de la página o añadir nuevos diseños. Pueden utilizar cualquier librería, indicando el link de su CDN, o poner la ruta de un archivo local.

Actualmente solo pueden utilizarse archivos css. No pueden utilizarse ningún preprocesador.

- Tipo: `Array`
- Defecto: `[]`

```js[didor.config.js]

module.exports = {
  style: ['/docs/style/myStyle.css', 'https://cdn.jsdelivr.net/npm/animate.css@3.5.2/animate.min.css'],
}

```

### scripts

Permite añadir un archivo o varios javascript, para añadir nueva funcionalidad. Pueden utilizar cualquier librería, indicando el link de su CDN, o poner la ruta de un archivo local.

- Tipo: `Array`
- Defecto: `[]`

```js[didor.config.js]

module.exports = {
  scripts: ['https://cdnjs.com/libraries/Chart.js'],
}

```

## Demo

### jsLib

### cssLib

### components


### styles


### shareStyles
