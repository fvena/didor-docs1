<!-- markdownlint-disable MD031 MD033-->

# Demo

Puedes añadir una demo mediante el tag `demo`.

````markdown
```demo
<az-button type="danger">Danger Button</az-button>
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
```demoCode[./button.vue]
<az-button type="danger">Danger Button</az-button>
```
````

```demoCode[./button.vue]
<template>
  <az-button type="danger">Danger Button</az-button>
</template>
```
