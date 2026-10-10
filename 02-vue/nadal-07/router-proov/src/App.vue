<script setup>
</script>

<template>
  <nav>
    <RouterLink to="/">Avaleht</RouterLink>
    <RouterLink to="/info">Info</RouterLink>
  </nav>

  <main>
    <RouterView/>
    <p>{{ loendur }}</p>
  </main>
</template>
