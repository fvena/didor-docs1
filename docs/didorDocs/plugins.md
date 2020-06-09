# Plugins para VS Code

En el siguiente listado te indico algunas extensiones útiles para escribir Markdown en VS Code.

## Linter

Markdown está diseñado para que sea fácil de leer, escribir y comprender. Pero su flexibilidad es un beneficio y un inconveniente. Utilizar un linter que ayude a mantener un formato consistente a lo largo de toda la documentación o entre varios participantes, garantizaría su coherencia.

* [Markdownlint](https://marketplace.visualstudio.com/items?itemName=DavidAnson.vscode-markdownlint).

Inicialmente, como siempre que añades un linter, es posible que tu código se ilumine como una feria. Siempre puedes modificar que reglas aplicar mediante un fichero `.markdownlint.json` y los códigos que quieras deshabilitar. Además de esta manera te aseguras que todos los miembros del equipo tienen la misma configuración.

```json[.markdownlint.json]
{
  "MD013": false,
  "MD026": { "punctuation": ".,;:。，；：" },
  "MD033": false
}
```

## Atajos de teclado

Si quieres escribir más rápido y eres bueno recordando atajos de teclado, te recomiendo utilizar esta extensión:

* [Markdown Shortcuts](https://marketplace.visualstudio.com/items?itemName=mdickin.markdown-shortcuts)

También puedes utilizarla con el botón secundario de tu ratón o trackpad.

## Corrector ortográfico

Si quieres asegurarte de no cometer errores ortográficos en tus documentos, te sugiero que añadas las extensiones:

* [Code Spell Checker](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker).
* [Spanish - Code Spell Checker](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker-spanish).

Te recomiendo que desactives todos los lenguajes de programación menos `markdown` y que actives tanto el inglés como el español, sino quieres que tener tu código lleno de notificaciones de error.

![Code Spell Checker - Configuración](/img/codeSpellChecker.png)
