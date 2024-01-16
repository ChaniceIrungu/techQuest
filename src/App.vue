<script setup>
import { RouterLink, RouterView } from "vue-router";
import Navbar from "./components/Navbar.vue";
import contacts from "./components/Footer.vue";
</script>

<template
  class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 relative min-h-screen flex flex-col"
>
  <div class="md:h-screen z-40">
    <!-- <header class="w-full">
      <div class="wrapper"><Navbar /></div>
    </header> -->

    <RouterView
      class="welcomePage font-sans md:bg-white relative flex-1 min-h-screen w-full"
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

.welcomePage {
  /* height: 100vh; */
  animation: gradient 15s ease infinite;
  background: linear-gradient(
    -135deg,
    rgba(26, 114, 139, 0.7),
    rgba(18, 28, 53, 0.7),
    rgba(44, 56, 88, 0.7),
    rgba(32, 142, 116, 0.7)
  );

  /* background: linear-gradient(
    -45deg,
    rgba(35, 166, 213, 0.7),
    rgba(35, 213, 171, 0.7)
    rgba(62, 59, 58, 0.7),
    rgba(183, 121, 145, 0.7),
  ); */

  background-size: 400% 400%;
  transition-duration: 0.5s;
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>
