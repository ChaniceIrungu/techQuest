<script setup>
import { RouterLink, RouterView } from "vue-router";
import Navbar from "./components/Navbar.vue";
import contacts from "./components/Footer.vue";
</script>

<template
  class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 relative min-h-screen flex flex-col"
>
  <div class="md:h-screen z-40">
    <header class="w-full">
      <div class="wrapper"><Navbar /></div>
    </header>

    <RouterView
      class="font-serif md:bg-white relative flex-1 min-h-screen w-full"
    />
  </div>
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
