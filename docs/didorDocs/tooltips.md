# Toolstip

Añade texto informativo a un elemento que solo se muestra al pasar sobre el.

## Funcionamiento básico

Simplemente hay que añadir al elemento el atributo `data-tooltip` y el texto que queremos utilizar. Para añadir atributos a un elemento utilizamos `{{` `}}`.

Soy un párrafo con un tooltip. {{data-tooltip="Soy un mensaje informativo"}}

```markdown

Soy un párrafo con un tooltip. {{data-tooltip="Soy un mensaje informativo"}}

```

Por defecto se está aplicando a todo el párrafo, pero si queremos que solo aplique a una parte podemos envolverla entre corchetes.

Soy un párrafo con un [tooltip]{{data-tooltip="Soy un mensaje informativo"}}.

```markdown

Soy un párrafo con un [tooltip]{{data-tooltip="Soy un mensaje informativo"}}.

```

## Posición

Mediante el atributo `data-placement` puedes especificar la posición del tooltip, por defecto se muestra en la parte superior, pero también se puede mostrar a los lados o abajo.

- `data-placement="top"` Por encima.
- `data-placement="right"` A la derecha.
- `data-placement="bottom"` Por debajo.
- `data-placement="left"` A la izquierda.

[Tooltip]{{data-tooltip="Soy un mensaje informativo" data-placement="top"}} por encima.

[Tooltip]{{data-tooltip="Soy un mensaje informativo" data-placement="right"}} a la derecha.

[Tooltip]{{data-tooltip="Soy un mensaje informativo" data-placement="bottom"}} por debajo.

[Tooltip]{{data-tooltip="Soy un mensaje informativo" data-placement="left"}} a la izquierda.


```markdown

Tooltip por encima. {{data-tooltip="Soy un mensaje informativo" data-placement="top"}}

Tooltip a la derecha. {{data-tooltip="Soy un mensaje informativo" data-placement="right"}}

Tooltip por debajo. {{data-tooltip="Soy un mensaje informativo" data-placement="bottom"}}

Tooltip a la izquierda. {{data-tooltip="Soy un mensaje informativo" data-placement="left"}}

```
