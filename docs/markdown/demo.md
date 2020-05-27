# Demo

Puedes añadir una demo mediante el tag `demo`.

````markdown
```demo
<template>
  <az-button type="danger">Danger {{ random }}</az-button>
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
  <az-button type="danger">Danger {{ random }}</az-button>
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
  <az-button type="danger">Danger Button</az-button>
</template>
```
````

```demoCode
<template>
  <az-button type="danger">Danger Button</az-button>
</template>
```

Solo html sin la etiqueta template y abierto por defecto

````markdown
```demoCode(open)
<az-button type="danger">Danger Button</az-button>
```
````

```demoCode(open)
<az-button type="danger">Danger Button</az-button>
```
