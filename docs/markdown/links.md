# Enlaces

## Uso básico

Para crear un link envuelve entre corchetes el título del link, seguido por la url envuelta entre paréntesis. También si no queremos que tenga un título, podemos envolver el link entre los símbolos [[<]] y [[>]].

```demo[markdown]

Mi framework favorito es [Didor](http://www.didor.io).

Mi framework favorito es <http://www.didor.io>.

Ir al [home](/).

Ver el componente [demo](/markdown/demo).

Mi email es <fvena32@gmail.com>.

```

```markdown

Mi framework favorito es [Didor](http://www.didor.io).

Mi framework favorito es <http://www.didor.io>.

Ir al [home](/).

Ver el componente [demo](/markdown/demo).

Mi email es <fvena32@gmail.com>.

```

## Texto alternativo

Podemos añadir una descripción del link añadiéndolo dentro de los paréntesis de la url rodeado por comillas. Los textos alternativos aparecen como un tooltip cuando el usuario mantiene el ratón sobre el link. Son útiles tanto para buscadores como para la accesibilidad.

```demo[markdown]

Mi framework favorito es [Didor](http://www.didor.io "El mejor framework del mundo").

```

```markdown

Mi framework favorito es [Didor](http://www.didor.io "El mejor framework del mundo").

```
