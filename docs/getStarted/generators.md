# Generadores

**Didor Docs** cuanto con algunos generadores que te ayudarán a iniciar tu proyecto de forma más rápida.

## PWA

Genera el favicon, los iconos de la aplicación y las páginas de bienvenida (splash screen) de forma automática a partir de una imagen.

Permite utilizar images en formato **svg**, **png** y **jpeg**. Si la imagen utilizada está en formato **png** o **jpeg**, es recomendable que su tamaño sea al menos de 512x512 píxeles.

![](/assets/appIcon.png){{.no-style}}

::: collapse title="Área segura"

Recuerda que cada sistema operativo redondea las esquinas en mayor o menor medida, llegando incluso a ser completamente circular. Puedes comprobar como se verán tus iconos en el caso más desfavorable con las herramientas para desarrolladores [[alt command I]]:

![](/assets/iconSafeArea.png)

:::

### Utilización

```sh
npx didor pwa <source-file> <output-folder> [options]
```

:::remark
Aprende más sobre npx [aquí](https://blog.npmjs.org/post/162869356040/introducing-npx-an-npm-package-runner).
:::

### Opciones

| Opción              | Descripción               |
|---------------------|---------------------------|
| `source-file`       | Ruta de la imagen.        |
| `output-folder`     | Directorio donde se guardarán los splash screen.<br>La ruta de destino debe estar dentro de una de las carpetas de documentación configuradas en [folders](/comenzar/configuracion#folders), o no se verá. |
| `--appIcon`    | Permite especificar una imagen diferente para generar los iconos. |
| `--splashIcon` | Permite especificar una imagen diferente para generar las splash screen. |
| `-b` `--background` | Color del fondo del icono y splash screen. |
| `-c` `--bgSplash`   | Permite especificar un color de fondo diferente para los splash screen. |
| `-p` `--padding`       | Margen interno del icono y splash screen. |
| `-s` `--paddingSplash` | Permite especificar un margen interno diferente para los splash screen. |

### Ejemplos

::: tree(open)

- miProyecto
  - docs
    - img
      - icon.svg
      - splashIcon.svg
  - package.json
  - didor.config.js

:::

#### Ejemplo 1

![](/assets/pwa1.png){{.no-style}}

- Genera todos los recursos con la misma imagen.
- Utiliza el color de fondo y el padding por defecto.

```sh
npx didor pwa /docs/img/icon.svg /docs/img
```

#### Ejemplo 2

![](/assets/pwa2.png){{.no-style}}

- Genera el favicon y los iconos con la misma imagen.
- Genera los splash screen con otra imagen.
- Define un fondo personalizado para los iconos y las splash screen.

```sh
npx didor pwa /docs/img/icon.svg /docs/img --splashIcon /docs/img/splashIcon.svg -b "#E6E6E6"
```

#### Ejemplo 3

![](/assets/pwa3.png){{.no-style}}

- Genera el favicon y los iconos con la misma imagen.
- Genera los splash screen con otra imagen.
- Define un fondo personalizado para los iconos.
- Define un fondo personalizado para las splash screen.
- Define un padding personalizado para los iconos.
- Define un padding personalizado para las splash screen.

```sh
npx didor pwa /docs/img/splashIcon_white.svg /docs/img --splashIcon /docs/img/splashIcon.svg -b "#E6E6E6" -c "linear-gradient(135deg, #F2385D 0%, #760630 100%)" -p "25%" -s "20% 30%"
```

::: tip
Obtendrás un mejor resultado, si la imagen ocupa todo el archivo y no dejas espacios internos.
:::
