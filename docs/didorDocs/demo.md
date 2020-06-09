# Demo

Puedes añadir una demo mediante el tag `demo`.

````markdown
```demo
<template>
  <dd-button>Danger {{ random }}</dd-button>
</template>

<script>
  module.exports = {
    computed: {
      random() {
        return Math.random()
      }
    }
  }
</script>
```
````

```demo
<template>
  <div class="button button--success">Danger {{ random }}</demo>
</template>

<script>
  module.exports = {
    computed: {
      random() {
        return Math.random()
      }
    }
  }
</script>
```

Puedes añadir una demo mediante el tag `demo`.

````markdown
```demoCode
<template>
  <div class="button button--success">Danger Button</demo>
</template>
```
````

```demoCode
<template>
  <div class="button button--success">Danger Button</demo>
</template>
```

Solo html sin la etiqueta template y abierto por defecto

````markdown
```demoCode(open)
<div class="button button--success">Danger Buttondemo>
```
````

```demoCode(open)
<div class="button button--success">Danger Buttondemo>
```
