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

El archivo de configuración debe exportar un objeto javascript:

```js[didor.config.js]

module.exports = {
  devServer: {
    port: 3001,
    open: true,
  },
  content: {
    folders: ['/docs'],
    defaultPath: '/home.md',
  },
}

```

También puedes modificar el nombre y la ubicación del archivo de configuración al declarar los scripts:

```json[package.json]
{
  "scripts": {
    "docs:serve": "didor serve /docs/config.js",ç
    "docs:build": "didor build /docs/config.js",
  }
}
```

## Servidor Desarrollo

### port

Permite configurar el puerto en el que se abrirá el servidor de desarrollo.

- Tipo: `Integer`
- Defecto: `3001`

```js[didor.config.js]

module.exports = {
  devServer: {
    port: 3001,
  }
}

```

### open

Indica si al levantar el servidor de desarrollo debe abrirse una ventana en el navegador y mostrarse automáticamente.

- Tipo: `Boolean`
- Defecto: `true`

```js[didor.config.js]

module.exports = {
  devServer: {
    open: true,
  }
}

```

## Contenido

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
      - componentA
        - componentA.vue
        - componentA.md
      - componentB
        - componentB.vue
        - componentB.md
      - componentC
        - componentC.vue
        - componentC.md
  - package.json
  - didor.config.js

:::

```js[didor.config.js]

module.exports = {
  content: {
    folders: ['/docs'],
  }
}

```

```js[didor.config.js]

module.exports = {
  content: {
    folders: ['/docs', '/src/components'],
  }
}

```

### navbar

Permite modificar el nombre del archivo utilizado para generar la barra de navegación entre secciones.

- Tipo: `String`
- Defecto: `_navbar.md`

```js[didor.config.js]

module.exports = {
  content: {
    navbar: 'myNavbar.md',
  }
}

```

### sidebar

Permite modificar el nombre del archivo utilizado para generar la barra de navegación dentro de una sección.

- Tipo: `String`
- Defecto: `_sidebar.md`

```js[didor.config.js]

module.exports = {
  content: {
    sidebar: 'mySidebar.md',
  }
}

```

### defaultPath

Permite modificar la ruta del archivo utilizado para generar la página de inicio.

- Tipo: `String`
- Defecto: `/home.md`

```js[didor.config.js]

module.exports = {
  content: {
    defaultPath: '/inicio.md',
  }
}

```

### didorDocs

Permite añadir la sección **markdown** de didorDocs en tu propia documentación para facilitar su uso.

- Tipo: `Boolean`
- Defecto: `false`

```js[didor.config.js]

module.exports = {
  content: {
    didorDocs: false,
  }
}

```

Si lo configuras a `true` solo tendrás que añadir en el **/_navbar.md** el link a **/didorDocs**.

```markdown[/docs/_navbar.md]

- [Markdown](/didorDocs)
```

### didorStyles

Permite añadir la sección **estilos** de didor-Styles en tu propia documentación para facilitar su uso si quieres utilizarlo en tu proyecto.

- Tipo: `Boolean`
- Defecto: `false`

```js[didor.config.js]

module.exports = {
  content: {
    didorStyles: false,
  }
}

```

Si lo configuras a `true` solo tendrás que añadir en el **/_navbar.md** el link a **/didorDocs**.

```markdown[/docs/_navbar.md]

- [Estilos](/didorStyles)
```

## Personalizar

### logo

Indica la localización del logotipo, puedes cambiar su tamaño mediante css. Sino se especifica ninguno, se muestra el título en su lugar.

- Tipo: `String`
- Defecto: `undefined`

```js[didor.config.js]

module.exports = {
  customize: {
    logo: 'docs/assets/didorLogo.svg',
  }
}

```

### title

Permite modificar el título por defecto de la página.

- Tipo: `String`
- Defecto: `Didor Docs`

```js[didor.config.js]

module.exports = {
  customize: {
    title: 'Mi Proyecto',
  }
}

```

### description

Permite modificar la descripción por defecto de la página.

- Tipo: `String`
- Defecto: `undefined`

```js[didor.config.js]

module.exports = {
  customize: {
    description: 'Herramienta para documentar proyectos',
  }
}

```

### mode

Permite seleccionar el modo de visualización por defecto de la página **light** o **dark**. El modo **auto** obtiene el modo de la configuración del navegador cuando sea posible, sino la encuentra, muestra el modo **light**.

- Tipo: `String`
- Defecto: `auto`
- Valores:
  - `light` Modo claro
  - `dark` Modo oscuro
  - `auto` Modo del navegador

```js[didor.config.js]

module.exports = {
  customize: {
    mode: 'light',
  }
}

```

### toggleMode

Muestra/oculta el selector de cambio de cambio de modo.

- Tipo: `Boolean`
- Defecto: `false`

```js[didor.config.js]

module.exports = {
  customize: {
    toggleMode: false,
  }
}


```

### social

Permite añadir links con sus respectivos iconos en la barra de navegación. Actualmente se han habilitado las siguientes redes sociales: twitter, facebook, linkedin, instagram, slack, github, gitlab.

- Tipo: `String`
- Defecto: `undefined`

```js[didor.config.js]

module.exports = {
  customize: {
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
}

```

### style

Permite añadir uno o varios archivos css, para modificar el diseño de la documentación. Puedes añadir una archivo local o una librería externa, con su link de CDN.

Actualmente solo pueden utilizarse archivos css.

- Tipo: `Array`
- Defecto: `[]`

```js[didor.config.js]

module.exports = {
  customize: {
    style: [
      '/docs/style/myStyle.css',
      'https://cdn.jsdelivr.net/npm/animate.css@3.5.2/animate.min.css'
    ],
  }
}

```

### scripts

Permite añadir uno o varios archivos javascript, para añadir nueva funcionalidad. Puedes añadir una archivo local o una librería externa, con su link de CDN.

- Tipo: `Array`
- Defecto: `[]`

```js[didor.config.js]

module.exports = {
  customize: {
    scripts: ['https://cdnjs.com/libraries/Chart.js'],
  }
}

```

## Demo

Uno de los puntos fuertes de **Didor Docs** es su flexibilidad a la hora de documentar y desarrollar librerías.

Las demos, se muestran en un iframe donde unicamente se cargan las librería configuradas a continuación, de forma que las demos están totalmente aisladas de la documentación, y no le afectan ni sus estilos ni su funcionalidad.

### cssLib

Permite añadir una o varias librerías javascript a tus demos. Puedes añadir una archivo local o una librería externa, con su link de CDN.

Actualmente solo pueden utilizarse archivos css.

- Tipo: `Array`
- Defecto: `[]`

```js[didor.config.js]

module.exports = {
  demo: {
    cssLib: ['https://cdn.jsdelivr.net/npm/@didor/styles@0.1.0/dist/didor.min.css'],
  }
}

```

### jsLib

Permite añadir una o varias librerías javascript a tus demos. Puedes añadir una archivo local o una librería externa, con su link de CDN.

- Tipo: `Array`
- Defecto: `[]`

```js[didor.config.js]

module.exports = {
  demo: {
    jsLib: ['https://cdnjs.com/libraries/Chart.js'],
  }
}

```

### components

Si estás desarrollando tu propia librería de componentes, puedes importarlos directamente como un plugin, indicando el nombre del fichero donde está configurado:

Ejemplo de una librería de componentes:

::: tree

- miProyecto [open]
  - docs
    - home.md
  - packages [open]
    - Avatar
      - Avatar.vue
      - Avatar.md
      - index.js
    - Button
      - Button.vue
      - Button.md
      - index.js
    - Popup
      - Popup.vue
      - Popup.md
      - index.js
    - Styles
      - _base.scss
      - _mixins.scss
      - _var.scss
    - index.js [select]
    - styles.scss
  - package.json
  - didor.config.js

:::

```js[/packages/index.js]
import Avatar from './Avatar';
import Button from './Button';
import Popup from './Popup';

const Components = {
  Avatar,
  Button,
  Popup,
};

const install = (Vue, opts = {}) => {
  const prefix = 'dd';

  Object.keys(Components).forEach(name => {
    const componentName = `${prefix}${name}`;
    Vue.component(componentName, Components[name]);
  });
};

// Automatically install Didor UI if Vue is available globally
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default { install, ...Components };
```

Para utilizar los componentes de nuestra librería, solo tenemos que indicar la ruta a nuestro archivo de instalación.

- Tipo: `String`
- Defecto: `''`

```js[didor.config.js]

module.exports = {
  demo: {
    components: '/packages/index.js,
  }
}

```

### styles

Puede que nuestra librería cuente con unos estilos comunes, o simplemente estamos desarrollando nuestro propio framework de estilos.

Podemos indicar directamente el archivo principal **scss** que importa todos nuestros archivos de estilos para que sea procesado y utilizado en las demos.

::: tree

- miProyecto [open]
  - docs
    - home.md
  - packages [open]
    - Avatar
      - Avatar.vue
      - Avatar.md
      - index.js
    - Button
      - Button.vue
      - Button.md
      - index.js
    - Popup
      - Popup.vue
      - Popup.md
      - index.js
    - Styles [open]
      - _base.scss
      - _mixins.scss
      - _var.scss
    - index.js
    - styles.scss [select]
  - package.json
  - didor.config.js

:::

```js[/packages/styles.scss]
@import '/Styles/var';
@import '/Styles/mixins';
@import '/Styles/base';
```

Configurando nuestros estilos por defecto:

- Tipo: `String`
- Defecto: `''`

```js[didor.config.js]

module.exports = {
  demo: {
    styles: '/packages/styles.scss,
  }
}
```


### shareStyles

En ocasiones, cuando desarrollamos una librería de componentes, y necesitamos compartir variables, mixins o funciones de scss, tenemos que importarlos en cada componente.

Existe una forma de importarlos por defecto en todos los componentes mediante el archivo de configuración de vue:

::: tree

- miProyecto [open]
  - docs
    - home.md
  - packages [open]
    - Avatar
      - Avatar.vue
      - Avatar.md
      - index.js
    - Button
      - Button.vue
      - Button.md
      - index.js
    - Popup
      - Popup.vue
      - Popup.md
      - index.js
    - Styles [open]
      - _base.scss
      - _mixins.scss
      - _var.scss
    - index.js
    - styles.scss
  - package.json
  - didor.config.js
  - vue.config.js

:::

```js[vue.config.js]
module.exports = {
  css: {
    sourceMap: true,
    loaderOptions: {
      sass: {
        prependData: `
          @import "./packages/Styles/_var.scss";
          @import "./packages/Styles/_mixins.scss";
        `,
      },
    },
  },
};
```

Si hemos aplicado esta configuración, también tenemos que configurarlos para la demo, sino los componentes cargados dentro de la demo fallarán al no encontrar las variables, mixins, funciones, ...

- Tipo: `Array`
- Defecto: `[]`

```js[didor.config.js]

module.exports = {
  demo: {
    shareStyles: [
      '/packages/Styles/_var.scss',
      '/packages/Styles/_mixins.scss'
    ]
  }
}
```

## Publicar

Cuando ejecutamos el comando `didor build`, crea una carpeta `publish` donde genera la documentación lista para ser publicada en un servidor web.

por defecto se copian todos los archivos contenidos en las carpetas de la documentación (propiedad **folders**) en el directorio `/build`, y se generan los archivos necesarios para que se pueda publicar la documentación en un servidor web.

### buildPath

Permite modificar el directorio donde se generará la documentación.

- Tipo: `String`
- Defecto: `/publish`

```js[didor.config.js]

module.exports = {
  build: {
    path: '/publish',
  }
}
```

### onlyMarkdown

Por defecto, **didor** copia todos los archivos contenidos en las carpetas configuradas en la propiedad `folders`. Si solo queremos que se copien los archivos markdown, podemos indicarlo con la propiedad **onlyMarkdown**.

- Tipo: `Boolean`
- Defecto: `false`

```js[didor.config.js]

module.exports = {
  build: {
    onlyMarkdown: false,
  }
}
```

### assets

Si necesitamos copiar otras carpetas a la carpeta de publicación, podemos añadirlos con la propiedad `assets`.

- Tipo: `Array`
- Defecto: `[]`

```js[didor.config.js]

module.exports = {
  build: {
    assets: [
      '/packages/assets',
      '/packages/icons'
    ],
  }
}
```
