# Árbol de Archivos

## Uso básico

La etiqueta `tree` permite convertir una lista en un árbol de archivos. Si un elemento de la lista tiene otra lista dentro, se mostrará como una carpeta.

::: tree

- components
  - typography
    - paragraph.js
    - code.js
    - heading.js
  - button.js
  - avatar.js
- pages
  - dashboard.js
  - about.js
  - index.js
- README.md
- .gitignore

:::

```markdown
::: tree
- components
  - typography
    - paragraph.js
    - code.js
    - heading.js
  - button.js
  - avatar.js
- pages
  - dashboard.js
  - about.js
  - index.js
- README.md
- .gitignore
:::
```

## Árbol desplegado por defecto

Por defecto, todas las carpetas aparecen cerradas, pero añadiendo la propiedad **open** a la etiqueta **tree** se muestran todas las carpetas abiertas.

::: tree(open)

- components
  - typography
    - paragraph.js
    - code.js
    - heading.js
  - button.js
  - avatar.js
- pages
  - dashboard.js
  - about.js
  - index.js
- README.md
- .gitignore

:::

```markdown
::: tree(open)
- components
  - typography
    - paragraph.js
    - code.js
    - heading.js
  - button.js
  - avatar.js
- pages
  - dashboard.js
  - about.js
  - index.js
- README.md
- .gitignore
:::
```

## Carpeta abierta por defecto

También es posible especificar que carpetas deben mostrarse inicialmente abiertas mediante el modificador `open`.

::: tree

- components
  - typography
    - paragraph.js
    - code.js
    - heading.js
  - button.js
  - avatar.js
- pages [open]
  - dashboard.js
  - about.js
  - index.js
- README.md
- .gitignore

:::

```markdown
::: tree
- components
  - typography
    - paragraph.js
    - code.js
    - heading.js
  - button.js
  - avatar.js
- pages [open]
  - dashboard.js
  - about.js
  - index.js
- README.md
- .gitignore
:::
```

## Texto informativo

Mediante los paréntesis, podemos añadir texto informativo de cada archivo/directorio.

::: tree

- components (texto informativo)
  - typography
    - paragraph.js
    - code.js
    - heading.js
  - button.js
  - avatar.js
- pages (texto informativo)
  - dashboard.js (texto informativo)
  - about.js (texto informativo)
  - index.js (texto informativo)
- README.md
- .gitignore (texto informativo)

:::

```markdown
::: tree
- components (texto informativo)
  - typography
    - paragraph.js
    - code.js
    - heading.js
  - button.js
  - avatar.js
- pages (texto informativo)
  - dashboard.js (texto informativo)
  - about.js (texto informativo)
  - index.js (texto informativo)
- README.md
- .gitignore (texto informativo)
:::
```

## Seleccionar archivo o carpeta

Con el modificador **select** podemos resaltar uno o varios archivos y carpetas.

::: tree

- components
  - typography
    - paragraph.js
    - code.js
    - heading.js
  - button.js
  - avatar.js
- pages [open, select]
  - dashboard.js
  - about.js
  - index.js
- README.md [select]
- .gitignore

:::

```markdown
::: tree
- components
  - typography
    - paragraph.js
    - code.js
    - heading.js
  - button.js
  - avatar.js
- pages [open, select]
  - dashboard.js
  - about.js
  - index.js
- README.md [select]
- .gitignore
:::
```

## Directorio vacío

Si necesitamos mostrar un directorio vacio, utilizaremos el modificador **folder**.

::: tree

- components
  - typography
    - paragraph.js
    - code.js
    - heading.js
  - button.js
  - avatar.js
- pages
  - dashboard.js
  - about.js
  - index.js
- dist [folder]
- README.md
- .gitignore

:::

```markdown
::: tree
- components
  - typography
    - paragraph.js
    - code.js
    - heading.js
  - button.js
  - avatar.js
- pages
  - dashboard.js
  - about.js
  - index.js
- dist [folder]
- README.md
- .gitignore
:::
```
