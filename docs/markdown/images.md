# Imágenes

## Uso básico

Para añadir una imagen, utiliza el símbolo de exclamación [[!]], seguido por el texto alternativo entre corchetes y el link de la imagen entre paréntesis. Es recomendable dejar una línea en blanco antes y después de la imagen

```demo[markdown]

![Pie de foto](/images/lion1.jpg)

```

```markdown

![Pie de foto](/images/lion1.jpg)

```

## Pie de foto

Por defecto, al añadir un texto alternativo, este se muestra como pie de foto, sino quiere que aparezca, no escriba nada dentro de los corchetes.

```demo[markdown]

![](/images/lion1.jpg)

```

```markdown

![](/images/lion1.jpg)

```

## Imagen con enlace

Puede utilizar una imagen como un enlace, introduciendo todo el código de una imagen, en el título del link:

```demo[markdown]

[![National Geographic](/images/lion1.jpg)](https://www.nationalgeographic.com.es/animales/leones)

```

```markdown

[![National Geographic](/images/lion1.jpg)](https://www.nationalgeographic.com.es/animales/leones)

```
