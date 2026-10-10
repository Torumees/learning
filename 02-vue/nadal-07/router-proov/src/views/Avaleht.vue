<script setup>
import { ref } from 'vue';

const loendur = ref(0)
</script>

<template>
  <h1>Avaleht</h1>
  <p>{{ loendur }}</p>
  <button @click="loendur++">Lisa</button>
</template>