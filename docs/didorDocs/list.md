# Listas

Puedes organizar elementos en listas ordenadas y no ordenadas.

## Listas ordenadas

Para crear listas ordenadas, añada un número delante de cada elemento seguido de un punto. Los números no tienen que estar ordenados, pero la lista debe comenzar con el número 1.

```demo[markdown]

1. Primer punto.
2. Segundo punto.
3. Tercer punto.
4. Cuarto punto.

```

```markdown

1. Primer punto.
2. Segundo punto.
3. Tercer punto.
4. Cuarto punto.

```

## Listas no ordenadas

Para crear listas no ordenadas, añada un guión [[-]], asterisco [[*]] o el símbolo más [[+]] delante de cada elemento.

```demo[markdown]

- Primer punto.
- Segundo punto.
- Tercer punto.
- Cuarto punto.

```

```markdown

- Primer punto.
- Segundo punto.
- Tercer punto.
- Cuarto punto.

```

## Listas anidadas

Para crear una lista anidada, añada cuatro espacios delante de los elementos tabulados. Puede mezclar distintos tipos de listas:

```demo[markdown]

1. Primer punto.
2. Segundo punto.
3. Tercer punto.
    - Punto anidado.
    - Punto anidado.
    - Punto anidado.
4. Cuarto punto.

```

```markdown

1. Primer punto.
2. Segundo punto.
3. Tercer punto.
    - Punto anidado.
    - Punto anidado.
    - Punto anidado.
4. Cuarto punto.

```

## Añadir párrafos dentro de una lista

Para añadir otros elementos dentro de una lista, preservando su continuidad, añade dos espacios al elemento:

### Párrafos

```demo[markdown]

1. Primer punto.
2. Segundo punto.
3. Tercer punto.
  Este es un párrafo dentro de una lista.
4. Cuarto punto.

```

```markdown

1. Primer punto.
2. Segundo punto.
3. Tercer punto.
  Este es un párrafo dentro de una lista.
4. Cuarto punto.

```

### Bloques de código

Para añadir código debes añadir 8 espacios delante de tu código y una línea en blanco delante y detrás.

```demo[markdown]

1. Primer punto.
2. Segundo punto.
3. Tercer punto.

        <html>
          <head>
            <title>Mi Página</title>
          </head>
          <body>
            ...
          </body>
        </html>

4. Cuarto punto.

```

```markdown

1. Primer punto.
2. Segundo punto.
3. Tercer punto.

        <html>
          <head>
            <title>Mi Página</title>
          </head>
          <body>
            ...
          </body>
        </html>

4. Cuarto punto.

```

### Imágenes

```demo[markdown]

1. Primer punto.
2. Segundo punto.
3. Tercer punto.
  ![Pie de foto](/assets/lion1.jpg)
4. Cuarto punto.

```

```markdown

1. Primer punto.
2. Segundo punto.
3. Tercer punto.
  ![alt text](/assets/lion1.jpg)
4. Cuarto punto.

```
