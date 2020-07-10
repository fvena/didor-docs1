# Añadir clases y atributos

Puede añadir una clase o un atributo a cualquier elemento mediante llaves dobles `{{` `}}`.

## Añadir clases o Id

En ocasiones puede necesitar modificar el estilo concreto de un elemento, con su propia clase o con alguna clase de didor styles. Para ello basta añadir una o varias clases dentro de las dobles llaves:

**Ejemplos**

```markdown

# Título {{#mainTitle .customTitle}}

Esto es un párrafo personalizado. {{.color-brand}}

Párrafo con texto **resaltado**{{.color-brand}}.

```

**Resultado**

```demoCode[markdown]

# Título {{#mainTitle .customTitle}}

Esto es un párrafo personalizado. {{.color-brand}}

Párrafo con texto **resaltado**{{.color-brand}}.

```

```html

<h1 id="mainTitle" class="customTitle">Título</h1>

<p class="color-brand">Esto es un párrafo</p>

<p>Párrafo con texto <strong class="color-brand">resaltado</strong></p>

```

## Añadir atributos

Si quiere implementar sus propios scripts, o si quiere añadir contenido a un elemento mediante un pseudo-elemento `:after` o `:before` y su propiedad content. Puede serle útil añadir atributos personalizados. Solo se pueden añadir atributos que comiencen por `data-`.

**Ejemplos**

```markdown

Soy un párrafo. {{data-tooltip="Soy un mensaje informativo"}}

```

Soy un párrafo. {{data-tooltip="Soy un mensaje informativo"}}

**Resultado**

```html

<p data-tooltip="Soy un mensaje de informativo">Soy un párrafo</p>

```
