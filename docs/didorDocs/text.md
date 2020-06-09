# Texto

Didor Docs se basa en la sintaxis básica descrita en el documento de diseño original de John Gruber.

## Títulos

Para crear un título, agregue el símbolo [[#]] delante una palabra o frase. El número de símbolos corresponde al nivel del título. Por ejemplo, para crear un título de nivel tres, debería usar tres símbolos `### Mi título`.

```demoCode[markdown]

# Título 1
## Título 2
### Título 3
#### Título 4
##### Título 5
###### Título 6

```

Para evitar problemas y mejorar la legibilidad del código, se recomienda separar el títulos del párrafo con al menos un línea en blanco:

```markdown

Esto es un párrafo

# Esto es un título

Esto es otro párrafo

```

## Párrafos

Para crear un nuevo párrafo, utilice un línea en blanco para separar el texto. No añada espacios o tabulaciones antes de un párrafo o podría tener resultados inesperados.


```demoCode[markdown]
Esto es un párrafo

Esto es otro párrafo
```

## Saltos de línea

Para crear un salto de línea, no deje líneas en blanco.

```demoCode[markdown]

Esta es la primera línea.
Esta es la segunda línea.

Esto es otro párrafo.

```

## Resaltar textos

### Negrita

Para poner un texto en negrita, añada dos asteriscos o guiones bajos antes y después de una palabra o frase. Si quiere resaltar solo algunos caracteres de una palabra, añada dos asteríscos alrededor de las letras sin añadir espacios en blanco.

```demoCode[markdown]

Esto en un **texto en negrita**.
Esto es otro __texto en negrita__.
Esto también es un texto**en**negrita.

```

### Cursiva

Para poner un texto en cursiva, añada un asterisco o guión bajo antes y después de una palabra o frase. Si quiere resaltar solo algunos caracteres de una palabra, añada un asterísco alrededor de las letras sin añadir espacios en blanco.

```demoCode[markdown]

Esto en un *texto en cursiva*.
Esto es otro _texto en cursiva_.
Esto también es un texto*en*cursiva.

```

### Negrita y Cursiva

Para resaltar un texto en negrita y cursiva a la misma vez, añada tres asteriscos o guiones bajos antes y después de una palabra o frase. Igualmente si quiere resaltar solo algunos caracteres de una palabra, añada tres asteriscos alrededor de las letras sin añadir espacios en blanco.

```demoCode[markdown]

Esto texto es ***muy importante***.
Esto es otro texto ___muy importante___.
Esto es un texto***muy***importante.

```

### Tachado

Para que un texto aparezca tachado, añada dos símbolos [[~]] antes y después de una palabra o frase.

```demoCode[markdown]

~~Esto texto está tachado~~.

```


## Líneas de separación

Para crear un línea de separación, utiliza tres asteriscos [[***]], guiones [[---]] o guiones bajos [[___]] en una línea, separada con un línea en blanco antes y después.

```demoCode[markdown]

Esto es un párrafo.

---

Esto es otro párrafo.

```


## Escapar caracteres

Algunos caracteres por su simbología a la hora de escribir markdown, pueden dar problemas a la hora de renderizar el markdown. Puede utilizar la barra invertida para escaparlos:

```demoCode[markdown]

\\ Barra invertida
\* Asterisco
\_ Barra baja
\{ \} LLaves
\[ \] Corchetes
\( \) Paréntesis
\# Símbolo numérico
\+ Signo suma
\- Signo resta
\. Signo de puntuación
\! Signo exclamación
\| Pipe

```
