<!-- markdownlint-disable MD031 MD033-->

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

Puedes añadir una demo mediante el tag `demo`.

````markdown
```demoCode
<az-button type="danger">Danger Button</az-button>
```
````

```demoCode
<az-button type="danger">Danger Button</az-button>
```
