# Imágenes

## Uso básico

Para añadir una imagen, utiliza el símbolo de exclamación [[!]], seguido por el texto alternativo entre corchetes y el link de la imagen entre paréntesis. Es recomendable dejar una línea en blanco antes y después de la imagen

![Pie de foto](/assets/lion1.jpg)

```markdown

![Pie de foto](/assets/lion1.jpg)

```

## Sin pie de foto

Por defecto, al añadir un texto alternativo, este se muestra como pie de foto, sino quiere que aparezca, no escriba nada dentro de los corchetes.

![](/assets/lion2.jpg)

```markdown

![](/assets/lion2.jpg)

```

## Imagen con enlace

Puede utilizar una imagen como un enlace, introduciendo todo el código de una imagen, en el título del link:

[![National Geographic](/assets/lion3.jpg)](https://www.nationalgeographic.com.es/animales/leones)

```markdown

[![National Geographic](/assets/lion3.jpg)](https://www.nationalgeographic.com.es/animales/leones)

```

## Imagen sin estilo

Si quiere deshabilitar el estilo por defecto de una imagen, y que no se muestre el sombreado y el borde, puede añadirle la clase `.no-style`.

![National Geographic](/assets/lion3.jpg){{.no-style}}

```markdown

![National Geographic](/assets/lion3.jpg){{.no-style}}

```
