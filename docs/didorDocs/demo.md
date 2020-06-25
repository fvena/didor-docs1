# Demo

El componente demo carga en un iframe las librerías indicadas en la configuración y el código del usuario para que no pueda verse afectado por los estilos o configuración de la propia documentación.

## Uso Básico

Puedes añadir una demo mediante el tag `demo`. Actualmente permite utilizar Vue como lo haríamos al escribir un componente en un único fichero, es decir, con las etiquetas **template**, **script**, **style**.

````markdown{2-9,11-27,29-34}
```demo
<template>
  <div>
    <h1 class="randomNumber">{{ random }}</h1>
    <div class="button button--success" @click="newRandom">
      Número Aleatorio
    </div>
  </div>
</template>

<script>
  module.exports = {
    data() {
      return {
        random: 0,
      };
    },
    methods: {
      newRandom() {
        this.random = Math.floor(Math.random() * 100);
      }
    },
    created() {
      this.newRandom();
    }
  }
</script>

<style>
  .randomNumber {
    text-align: center;
    margin: 1.6rem;
 }
</style>
```
````

```demo
<template>
  <div>
    <h1 class="randomNumber">{{ random }}</h1>
    <div class="button button--success" @click="newRandom">Número Aleatorio</div>
  </div>
</template>

<script>
  module.exports = {
    data() {
      return {
        random: 0,
      };
    },
    methods: {
      newRandom() {
        this.random = Math.floor(Math.random() * 100);
      }
    },
    created() {
      this.newRandom();
    }
  }
</script>

<style>
  .randomNumber {
    text-align: center;
    margin: 1.6rem;
 }
</style>
```

## Editor

Mediante el tag `demoCode`, se muestra un editor de código que permite realizar cambios y pruebas en vivo.

````markdown
```demoCode
<template>
  <div class="button button--success">Success Button</div>
</template>
```
````

```demoCode
<template>
  <div class="button button--success">Success Button</div>
</template>
```

Por defecto el editor aparece oculto, pero con la propidad `open` puedes configurarlo para que aparezca abierto.

````markdown
```demoCode(open)
<template>
  <div>
    <div class="button margin">Default Button</div>
    <div class="button button--brand margin">Brand Button</div>
    <div class="button button--success margin">Success Button</div>
    <div class="button button--warning margin">Warning Button</div>
    <div class="button button--danger margin">Danger Button</div>
  </div>
</template>
```
````

```demoCode(open)
<template>
  <div>
    <div class="button margin">Default Button</div>
    <div class="button button--brand margin">Brand Button</div>
    <div class="button button--success margin">Success Button</div>
    <div class="button button--warning margin">Warning Button</div>
    <div class="button button--danger margin">Danger Button</div>
  </div>
</template>
```

::: note

Recuerda que dentro de la etiqueta template, solo puede haber un hijo, si quieres añadir varios elementos, envuelvelos en un `div`.

:::

## Solo template

Si solo queremos utilizar el template, no es necesario escribir la etiqueta template, podemos añadir directamente el html. En este caso, por defecto ya tiene un div contenedor, por lo que no tendrás problemas al añadir varios elementos directamente.

````markdown
```demoCode(open)
<div class="button margin">Default Button</div>
<div class="button button--brand margin">Brand Button</div>
<div class="button button--success margin">Success Button</div>
<div class="button button--warning margin">Warning Button</div>
<div class="button button--danger margin">Danger Button</div>
```
````

```demoCode(open)
<div class="button margin">Default Button</div>
<div class="button button--brand margin">Brand Button</div>
<div class="button button--success margin">Success Button</div>
<div class="button button--warning margin">Warning Button</div>
<div class="button button--danger margin">Danger Button</div>
```
