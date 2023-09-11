<script setup>
import { RouterLink, RouterView } from "vue-router";
import Navbar from "./components/Navbar.vue";
</script>

<template class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
  <header>
    <div class="wrapper"><Navbar /></div>
  </header>

  <RouterView class="font-serif md:bg-white" />
</template>

<style scoped>
@media (min-width: 1024px) {
  header {
    /* display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2); */
  }
}
</style>
