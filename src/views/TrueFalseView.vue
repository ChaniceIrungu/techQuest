<template>
  <div class="flex flex-col mx-auto px-4 md:px-8 py-2 md:py-8 text-center">
    <div
      v-if="!menuOpen"
      class="flex flex-col justify-center items-center mx-auto"
    >
      <div class="max-w-md">
        <p class="text-center text-white text-base md:text-xl font-semibold">
          Impressive skills! Now, let's put your memory to the test. Engage in
          this Memory Game pay attention to the statements and unleash your
          memory prowess now!
        </p>
      </div>
      <div class="pt-4 md:pt-8">
        <img src="/memory-logo.png" class="" />
      </div>
      <div class="pt-4 md:pt-8">
        <h1
          class="md:px-2 pt-2 text-center text-white text-lg md:text-2xl font-semibold"
        >
          Choose if statement is True or False
        </h1>
      </div>

      <div class="pt-4 md:pt-8 text-center">
        <cButton :buttonText="' Continue'" @click="startShapesGame" />
      </div>
    </div>

    <ShapesMemory v-if="shapeMemoryOpen" />
  </div>
</template>
<script setup>
import { ref, reactive, computed } from "vue";
import ShapesMemory from "../components/ShapesMemory.vue";
import cButton from "../components/Button.vue";
const menuOpen = ref(false);
const shapeMemoryOpen = ref(false);

const startShapesGame = () => {
  shapeMemoryOpen.value = true;
  menuOpen.value = !menuOpen.value;
};
</script>
