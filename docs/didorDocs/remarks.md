# Anotaciones

Las anotaciones permiten añadir y referenciar información extra sobre una palabra, párrafo o elemento.

## Funcionamiento básico

Una anotación se compone de dos partes, una indica el origen de la anotación, normalmente un símbolo o un número si hay varios. La otra parte es la propia anotación, y suele estar justo debajo o al final de la página.

- Para **añadir una referencia**, debemos envolver el número o el símbolo entre las etiquetas HTML de superíndice `<sup>`.

- Para **añadir una anotación** tenemos que envolver el texto dentro de la etiqueta `remark`, y entre paréntesis podemos escribir la referencia de origen.

```demoCode[markdown]

Este es un párrafo con una anotación <sup>1</sup>.
Este es otro párrafo con una anotación <sup>2</sup>.

::: remark(1)
Información del párrafo 1
:::

::: remark(2)
Información del párrafo 2
:::

```

```demoCode[markdown]

Este es un párrafo con una anotación<sup>*</sup> en su interior.

::: remark(*)
Información referente a la anotación.
:::

```

## Píe de imagen

Por defecto las imágenes, permiten añadir un pie de foto, pero solo puede ser una cadena de texto. Mientras que una anotación permite párrafos, listas, ...

![](/assets/lion2.jpg)

::: remark
Información sobre la imagen con un listado.
  - Item de la lista
  - Otro item de la list
:::

```markdown

![](/assets/lion2.jpg)

::: remark
Información sobre la imagen
:::

```


## Anotaciones sobre el código

También puede ser útil añadir una anotación a un bloque de código.

```sh
npx didor pwa <source-file> <output-folder> [options]
```

:::remark
Aprende más sobre npx [aquí](https://blog.npmjs.org/post/162869356040/introducing-npx-an-npm-package-runner).
:::

````markdown
```sh
npx didor pwa <source-file> <output-folder> [options]
```

:::remark
Aprende más sobre npx [aquí](https://blog.npmjs.org/post/162869356040/introducing-npx-an-npm-package-runner).
:::
````
